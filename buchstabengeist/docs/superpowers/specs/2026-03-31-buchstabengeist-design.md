# Buchstabengeist — Design Spec

Date: 2026-03-31

## Overview

A Phaser 3 Pac-Man-style browser game. Ghosts carry letters of a target word; the player eats them in the correct order to spell the word. Target audience: 10–13 year olds. Supports English and German.

Follows the same project conventions as `agentenfunk` and `weltreise`.

---

## File Structure

```
buchstabengeist/
├── index.html
├── manifest.json
├── service-worker.js
└── src/
    ├── i18n/
    │   ├── lang.js         # reads localStorage pgame_lang, defaults 'de'
    │   └── strings.js      # all UI strings keyed en/de
    ├── data/
    │   └── words.js        # WORDS_EN and WORDS_DE (30 words each)
    ├── scenes/
    │   ├── BootScene.js
    │   ├── MenuScene.js
    │   ├── GameScene.js
    │   └── GameOverScene.js
    └── main.js
```

---

## Phaser Config

- **Version:** Phaser 3.60.0 via CDN
- **Canvas:** `480 × 660`, `type: Phaser.AUTO`
- **Scale:** `Phaser.Scale.FIT`, `autoCenter: Phaser.Scale.CENTER_BOTH`
- **Background:** `#080818`
- **Scenes:** `[BootScene, MenuScene, GameScene, GameOverScene]`

---

## Canvas Layout

```
┌─────────────────────────────┐  y=0
│  HUD  (55px)                │    title | score | level | lives | shield
├─────────────────────────────┤  y=55
│  Word Bar  (55px)           │    "Spell: _ _ _ _ _"   hint text
├─────────────────────────────┤  y=110
│                             │
│  Maze  (475 × 525)          │    19 cols × 21 rows, tile = 25px
│                             │
└─────────────────────────────┘  y=635
```

Maze is horizontally centred in the 480px canvas (2.5px padding each side).

---

## i18n

**`src/i18n/lang.js`** — loaded first, before any other script:

```js
var LANG = localStorage.getItem('pgame_lang') === 'en' ? 'en' : 'de';
```

**`src/i18n/strings.js`** — all user-visible strings:

```js
var STRINGS = {
  en: {
    title:         'BUCHSTABENGEIST',
    spell:         'Spell:',
    score:         'Score',
    level:         'Level',
    lives:         'Lives',
    modeChallenge: 'CHALLENGE',
    modeGuided:    'GUIDED',
    descChallenge: 'Guess the word. Power pellets save your life.',
    descGuided:    'Word shown. Focus on the chase.',
    controls:      'Arrow keys · WASD · Swipe on mobile',
    playBtn:       'PLAY',
    playAgain:     'PLAY AGAIN',
    gameOver:      'GAME OVER',
    wordComplete:  '✓ WORD!',
    livesOut:      'You ran out of lives!',
  },
  de: {
    title:         'BUCHSTABENGEIST',
    spell:         'Buchstabiere:',
    score:         'Punkte',
    level:         'Level',
    lives:         'Leben',
    modeChallenge: 'PROFI',
    modeGuided:    'LERNMODUS',
    descChallenge: 'Errate das Wort. Power-Pillen retten dein Leben.',
    descGuided:    'Wort wird angezeigt. Fang die Geister!',
    controls:      'Pfeiltasten · WASD · Wischen auf Mobilgerät',
    playBtn:       'SPIELEN',
    playAgain:     'NOCHMAL',
    gameOver:      'SPIEL VORBEI',
    wordComplete:  '✓ WORT!',
    livesOut:      'Du hast keine Leben mehr!',
  },
};
```

Back button text set at page load: `LANG === 'en' ? '← Overview' : '← Übersicht'`.

---

## Scenes

### BootScene
No assets to preload (all rendering is procedural). Immediately transitions to `MenuScene`.

### MenuScene
- Title text (`STRINGS[LANG].title`), large, centred
- Two mode buttons side by side: Challenge / Guided
  - Each shows mode name + description string
- Play button below (starts `GameScene` with `{ mode }`)
- Controls hint at bottom
- Language badge (small, muted, non-interactive) top-right

### GameScene

Receives `{ mode: 'challenge' | 'guided' }` from scene data.

**Rendering — all Phaser Graphics + Text, no image assets:**

- **Maze:** `Graphics` object drawn once at scene create. Wall fill `#090920`, inner border stroke `#2424aa`, faint second inner stroke `rgba(60,60,200,0.18)`. Redrawn only when pellets change.
- **Pac-Man:** `Graphics` arc redrawn each frame. Radial gradient approximated as yellow circle (`#ffe066`). Mouth angle animates `0 → 0.42` rad while moving; frozen open when stunned.
- **Ghosts:** `Graphics` (rounded-top arc + 3-segment scalloped bottom) + `Text` for letter, redrawn each frame. Six colours from spec by word index. Eyes follow movement direction.
- **Power pellets** (Challenge only): `Graphics` pulsing circles, radius modulated by `Math.sin(time * 4) * 2 + 7`.
- **HUD:** Phaser `Text` objects for title, score, level, lives (❤ symbols), shield indicator (🛡, shown only when active in Challenge mode).
- **Word bar:** Row of Phaser `Text` slot objects. Challenge = underscores, Guided = transparent letters (`alpha 0.25`) with collected letters filled solid. Wrong-eat triggers x-oscillation tween on the next slot. Correct-eat triggers scale `0 → 1` tween on filled slot.
- **Flash text:** Centred `Text` (`STRINGS[LANG].wordComplete`) scales in then fades, ~1.1s, on word completion.

**Movement & Input:**

- Positions stored as float tile coordinates (centre of entity).
- Queued direction: new direction applied on next valid tile boundary.
- Desktop: `this.input.keyboard.createCursorKeys()` + WASD via `addKey`.
- Mobile: `pointerdown` records origin, `pointerup` calculates delta → queued direction if delta > 10px. 
- Tunnel wrap: row 9, col −0.5 ↔ col 18.5.
- Pac speed: `0.09` tiles/frame.

**Ghost AI:**

- Speed: `0.038 + wordIdx * 0.003 + level * 0.004` tiles/frame.
- Default: 70% chase pac (closest valid direction), 30% random at each wall decision.
- Scared mode (2000ms after wrong eat): flee + random, speed × 0.45. Flash last 600ms (white / `#3333bb`).
- Guided mode ghosts move at 85% of calculated speed.
- Next-target highlight: ghost with lowest un-eaten `wordIdx`. Challenge: subtle yellow halo `rgba(255,224,102,0.22)`. Guided: bright pulsing halo `rgba(255,224,102,0.5)`.

**Collision** (checked every `update()`):

- `|pac.r − g.r| < 0.58` AND `|pac.c − g.c| < 0.58` for each living ghost.
- Correct eat: fill word slot, score `+= 100 + level * 20`, play ascending tone. Word complete if all eaten.
- Wrong eat (Challenge, no shield): `lives--`, scatter, stun pac (~55 frames), shake slot tween. If `lives === 0` → `GameOverScene`.
- Wrong eat (Challenge, shield active): consume shield, scatter, no life lost.
- Wrong eat (Guided): scatter, stun pac briefly, no life change.
- Ghost catches pac (ghost not scared, pac not stunned): `lives--`, reset pac to start, stun. If `lives === 0` → `GameOverScene`.

**Power Pellets** (Challenge only):

- 4 pellets, one per quadrant, on open cells away from pac start.
- Pac collects on proximity < 0.55 tiles.
- Arms one-use shield. Second pellet while shielded: `+50` points.
- Respawn each new word.

**Word Completion:**

1. `score += 300 + level * 50`
2. Flash text shown (~1.1s)
3. After 1300ms: `level++`, pick new word (random, no immediate repeat), respawn ghosts, reset `wordProgress`, respawn power pellets (Challenge)

**Scoring:**

| Event | Points |
|---|---|
| Correct ghost eaten | `100 + level×20` |
| Word completed | `300 + level×50` |
| Wrong ghost (no shield) | `−50` (min 0) |
| Power pellet collected (spare) | `+50` |

**Game state:** `menu → playing → gameover`. No pause state needed.

### GameOverScene

- Title: `STRINGS[LANG].gameOver`
- Subtitle: `STRINGS[LANG].livesOut`
- Final score
- Play Again button → `MenuScene`

---

## Audio

Thin `AudioManager` wrapper around Web Audio API (not Phaser's sound system — tone generation required). Singleton, lazily creates `AudioContext` on first pointer/key event to satisfy browser autoplay policy.

```js
AudioManager.playTone(freq, type, durationMs)  // type: 'sine' | 'sawtooth'
AudioManager.playSequence([{freq, type, dur, delay}, ...])
AudioManager.unlock()  // called on first user gesture
```

Sounds:
- Correct eat: sine, `400 + wordProgress * 100` Hz, 80ms
- Word complete: sine sequence 600 → 800 → 1000 Hz
- Wrong eat (no shield): sawtooth, 120 Hz, 200ms
- Shield used: sine sequence 300 Hz then 500 Hz, 80ms each
- Power pellet collected: sine sequence, 4 ascending notes

---

## Word Banks

In `src/data/words.js`. Active bank: `var WORDS = LANG === 'de' ? WORDS_DE : WORDS_EN`.

- **WORDS_EN**: 30 entries `{ word, hint }`, words 3–6 letters, uppercase A–Z
- **WORDS_DE**: 30 entries `{ word, hint }`, no Umlauts — expanded forms (AE, OE, UE, SS)

Full lists from the game spec (`buchstabengeist.md`).

---

## Maze Layout

19 columns × 21 rows. Row 9 is the tunnel row (all 0s).

```js
var MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,1],
  [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
  [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
```

Pac-Man start: row 15.5, col 9.5.

---

## PWA

- `manifest.json`: name "Buchstabengeist", `theme_color: "#080818"`, `background_color: "#080818"`, `display: "standalone"`, ghost emoji SVG icons
- `service-worker.js`: cache-first, caches all JS src files + index.html

---

## Deviations from Original Spec

| Original spec | This implementation |
|---|---|
| Single `buchstabengeist.html` file | `index.html` + `src/` multi-file (matches project pattern) |
| `?lang=` query param | `localStorage['pgame_lang']` (matches portal pattern) |
| HTML `<div>` word bar slots | Phaser `Text` objects on canvas |
| CSS animations for slot pop/shake | Phaser tweens |
