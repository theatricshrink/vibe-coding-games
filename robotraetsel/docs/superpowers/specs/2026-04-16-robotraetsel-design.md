# Roboträtsel — Design Spec
**Date:** 2026-04-16
**Status:** Approved

## Overview

A hangman-style word-guessing game for Wilma's Spielesammlung. Players guess hidden words letter by letter. Each wrong guess assembles one part of a pixel-art robot. When fully assembled (6 wrong guesses) the robot activates and attempts world domination — the chain resets. Solve words in a chain: each next word must start with the last letter of the previous one. A category hint is available at the cost of one robot part.

Follows the pflanzenwelt architecture: vanilla JS + Phaser 3 (960×720), no bundler, script tags only. Supports DE/EN via the shared `pgame_lang` localStorage key.

---

## Architecture & File Structure

```
robotraetsel/
  index.html
  main.js
  src/
    i18n/
      lang.js          ← identical to pflanzenwelt (reads pgame_lang, defaults 'de')
      strings.js       ← STRINGS = { de: {...}, en: {...} }
    data/
      words.js         ← WORDS array
    scenes/
      StartScene.js
      GameScene.js
      WinScene.js
```

**Phaser config:** `type: Phaser.AUTO`, 960×720, FIT + CENTER_BOTH scale mode, `backgroundColor: '#1a1a2e'`.

**Scene flow:** `StartScene → GameScene → WinScene → GameScene` (loop on win; chain resets on takeover and continues within GameScene).

**localStorage keys:**
- `pgame_lang` — shared with all games; read-only from within the game
- `robotraetsel_best` — best word chain length (integer, default 0)

---

## Game Mechanics

### Word Display
The hidden word is shown as a row of blank letter slots (`_`). Correctly guessed letters fill in immediately. An on-screen A–Z alphabet grid is always visible; guessed letters are greyed out and non-interactive. Physical keyboard input also works (letter keys).

### Robot Assembly — 6 Parts
Parts are added in order on each wrong guess:

1. Antenna
2. Head
3. Body
4. Left arm
5. Right arm
6. Legs

The robot is drawn via Phaser Graphics using the same pixel-art technique as `_drawPlayer` in pflanzenwelt. Only assembled parts are rendered; unassembled slots are empty. The robot is always 6 parts regardless of word length.

### World Domination (Game Over)
On the 6th wrong guess:
1. Robot shakes (brief tween)
2. Screen flashes red
3. Full-screen overlay: **"WELTÜBERNAHME! 🤖"** / **"WORLD DOMINATION! 🤖"** with the completed robot
4. After ~2 seconds: chain resets to 0, robot clears, new word begins

### Word Chain
- A chain counter (`🔗 × N`) is shown in the top bar at all times
- Solving a word: chain increments, robot clears, next word constraint activates
- Next word constraint: "Nächstes Wort beginnt mit **K**" / "Next word starts with **K**" — the first word has no constraint
- Game-over (world domination): chain resets to 0, no constraint on next word
- Chain of 10: triggers WinScene
- Best chain is persisted to `robotraetsel_best` and shown in the top bar

### Category Hint
- Each word has a hidden category (see word pool below)
- A "💡 Hinweis / Hint" button is visible throughout the round
- Pressing it: reveals the category name (e.g. "Tier / Animal") AND immediately adds one robot part
- Can only be used once per word; button disables after use
- If the robot is already on part 5 (one away from game over), the hint button is disabled — using it would trigger immediate world domination

### Difficulty Ramp
Words are drawn from length buckets based on current chain:

| Chain length | Word length |
|---|---|
| 0–2 | 4–6 letters |
| 3–5 | 7–9 letters |
| 6+ | 10+ letters |

---

## Data

### Word Pool (`src/data/words.js`)

```js
var WORDS = [
  { word: 'ELEFANT',    category: 'animal',      lang: 'de' },
  { word: 'FRANKREICH', category: 'country',     lang: 'de' },
  // ...
  { word: 'ELEPHANT',   category: 'animal',      lang: 'en' },
  { word: 'FRANCE',     category: 'country',     lang: 'en' },
  // ...
];
```

**Categories:** `animal`, `country`, `profession`, `plant`, `food`, `sport`

**Targets:** ~20 words per category per language (240 total). Words are uppercase. Umlauts (Ä, Ö, Ü) are supported in DE words; the on-screen keyboard includes them.

Active pool is filtered by `LANG` at game start. Words are drawn without replacement per session; pool resets when exhausted.

**Chain constraint filtering:** When a chain constraint is active (next word must start with letter X), the draw is filtered to words starting with X. If no matching word exists in the current length bucket, the constraint is dropped silently and a free word is drawn.

---

## i18n

`src/i18n/strings.js` — `var STRINGS = { de: {...}, en: {...} }`:

| Key | DE | EN |
|---|---|---|
| `title` | 🤖 Roboträtsel | 🤖 Robot Riddle |
| `subtitle` | Rate Wörter, bevor der Roboter die Welt übernimmt! | Guess words before the robot takes over the world! |
| `chainLabel` | Kette | Chain |
| `bestLabel` | Bestleistung | Best |
| `hintBtn` | 💡 Hinweis | 💡 Hint |
| `hintUsed` | Kategorie: {cat} | Category: {cat} |
| `takeover` | WELTÜBERNAHME! 🤖 | WORLD DOMINATION! 🤖 |
| `nextWord` | Nächstes Wort beginnt mit | Next word starts with |
| `winTitle` | 🏆 Du hast gewonnen! | 🏆 You won! |
| `winSubtitle` | Kette von 10 — Roboter besiegt! | Chain of 10 — robot defeated! |
| `playAgain` | 🔄 Nochmal spielen | 🔄 Play again |
| `startPrompt` | Drücke eine Taste zum Starten | Press any key to start |
| Category names | Tier, Land, Beruf, Pflanze, Essen, Sport | Animal, Country, Profession, Plant, Food, Sport |

---

## Scenes

### StartScene
- Dark background (`#1a1a2e`)
- Title and subtitle text (centred)
- Idle robot graphic (body only, no assembled parts) — subtle bounce tween
- "How to play" summary: wrong guess = robot part, 6 parts = world domination, solve words to build a chain
- Start prompt (key/tap)

### GameScene
Layout (960×720):

```
[ 🔗 × N   Best: N   Next starts with: X ]   ← top bar
[                                          ]
[  Robot area (left)  |  Word + keyboard  ]   ← main area
[                                          ]
[         💡 Hinweis / Hint               ]   ← bottom bar
```

- Robot drawn at left (~300×400px area), parts accumulate top-down
- Word slots centred-right, large font
- Alphabet keyboard below word slots (5 rows of letters, includes Ä/Ö/Ü for DE)
- On correct guess: letter slot fills in, green flash on slot
- On wrong guess: new robot part appears with a brief pop animation
- On word solved: panel flashes green, chain counter increments, constraint label updates, robot clears, new word

### WinScene
- Completed robot with a white flag (pixel-art flag added to hand)
- Win title + subtitle
- Best chain displayed
- "Play again" button → restarts GameScene with chain = 0

---

## Portal Integration

Add a card to `/index.html`:

```html
<a class="card" href="./robotraetsel/index.html"
   data-supports-browser="true" data-supports-mobile="true">
  <div class="card-emoji">🤖</div>
  <div class="card-title" id="card-rr-title"></div>
  <div class="card-desc"  id="card-rr-desc"></div>
  <div class="card-btn"   id="card-rr-btn"></div>
  <div class="card-platforms">
    <span class="platform-badge supported" id="rr-badge-browser">🖥️ Browser</span>
    <span class="platform-badge supported" id="rr-badge-mobile">📱 Mobile</span>
  </div>
  <div class="platform-unavailable" id="card-rr-unavail" style="display:none;"></div>
</a>
```

Portal strings added for both languages:
- DE: title `Roboträtsel`, desc `Rate Wörter, bevor der Roboter die Welt übernimmt!`
- EN: title `Robot Riddle`, desc `Guess the word before the robot takes over the world!`

---

## Testing

- Unit tests (plain JS, same pattern as pflanzenwelt `tests/`) for:
  - Word pool filtering by language and length bucket
  - Chain constraint logic (fallback when no matching word)
  - Best chain persistence
- Manual test: full game flow DE + EN, mobile touch keyboard, hint cost, world domination animation, win condition
