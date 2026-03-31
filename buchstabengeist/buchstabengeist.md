# Buchstabengeist — Game Spec

A single-file HTML5 canvas game. Pac-Man maze gameplay with a vocabulary/spelling educational layer. Target audience: 10–13 year olds.

---

## Language & i18n

The game supports **English** and **German**. Language is passed in from the selection screen via a URL query parameter — the same pattern used by the other games on the platform:

```
buchstabengeist.html?lang=en   ← English (default)
buchstabengeist.html?lang=de   ← German
```

### Reading the parameter

Read on page load, before any rendering:

```js
const params = new URLSearchParams(window.location.search);
const lang = params.get('lang') === 'de' ? 'de' : 'en'; // default: en
```

### Applying the language

A single `T` translation object holds all user-visible strings. Every string rendered in the UI (HUD labels, overlay text, hints, button labels, mode descriptions) must come from `T[lang]`. No hardcoded English strings anywhere in the HTML or JS.

```js
const T = {
  en: {
    title:           "BUCHSTABENGEIST",
    spell:           "Spell:",
    score:           "Score",
    level:           "Level",
    lives:           "Lives",
    modeChallenge:   "CHALLENGE",
    modeGuided:      "GUIDED",
    descChallenge:   "Guess the word. Power pellets save your life.",
    descGuided:      "Word shown. Focus on the chase.",
    controls:        "Arrow keys · WASD · Swipe on mobile",
    playBtn:         "PLAY",
    playAgain:       "PLAY AGAIN",
    gameOver:        "GAME OVER",
    wordComplete:    "✓ WORD!",     // flash text
    livesOut:        "You ran out of lives!",
  },
  de: {
    title:           "BUCHSTABENGEIST",
    spell:           "Buchstabiere:",
    score:           "Punkte",
    level:           "Level",
    lives:           "Leben",
    modeChallenge:   "PROFI",
    modeGuided:      "LERNMODUS",
    descChallenge:   "Errate das Wort. Power-Pillen retten dein Leben.",
    descGuided:      "Wort wird angezeigt. Fang die Geister!",
    controls:        "Pfeiltasten · WASD · Wischen auf Mobilgerät",
    playBtn:         "SPIELEN",
    playAgain:       "NOCHMAL",
    gameOver:        "SPIEL VORBEI",
    wordComplete:    "✓ WORT!",
    livesOut:        "Du hast keine Leben mehr!",
  },
};
```

### Language indicator in HUD

Display a small non-interactive language badge in the top-right corner of the HUD:

- English: `EN` badge
- German: `DE` badge
- Style: small caps, muted colour (`#555`), `10px Nunito`, no interaction

---

## Core Concept

Each ghost carries one letter of a target word. The player must eat the ghosts **in the correct order** to spell the word. Completing a word scores bonus points and advances the level. The maze contains no regular pellets — ghosts are the only interactive elements.

---

## File Structure

Single self-contained `buchstabengeist.html`. No external dependencies except Google Fonts. All game logic, styles, and assets inline.

**Fonts:** `Fredoka One` (headings, scores, letters) + `Nunito` (body, hints)  
**Canvas:** HTML5 Canvas, `image-rendering: pixelated`  
**Audio:** Web Audio API (tones only, no files)

---

## Layout

```
┌─────────────────────────────────────┐
│  HUD: title | score | level | lives  │
│  WORD BAR: Spell: _ _ _ _ _  💬hint  │
├─────────────────────────────────────┤
│                                     │
│           MAZE CANVAS               │
│                                     │
└─────────────────────────────────────┘
```

- Max width: 720px, centered
- HUD is fixed height, canvas fills remaining viewport height
- TILE size calculated at runtime: `min(floor(wrapW / COLS), floor(wrapH / ROWS))`
- Responsive: recalculate on `window resize`

---

## Maze

19 columns × 21 rows. Value `0` = open path, `1` = wall.

```
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
```

Row 9 (`[0,0,0,0,...]`) is the tunnel row — pac and ghosts wrap from col -0.5 to col COLS-0.5.

**Wall rendering:** dark fill `#090920`, inner border stroke `#2424aa`, faint second inner stroke `rgba(60,60,200,0.18)`.

---

## Game Modes

Two modes selectable from the start screen. Mode persists for the whole session (no mid-game switching).

### Mode A — CHALLENGE (default / harder)

- The **word is hidden**. Only blank underscores shown in the word bar.
- The hint is visible at all times.
- All ghost letters are equally visible — player must figure out the correct order.
- The **next correct ghost is subtly highlighted** with a yellow glow halo (so the game stays fair, not a pure memory test).
- **Wrong ghost eaten → lose a life.** All ghosts scatter (scared mode) briefly.
- **Power pellets** are placed in the 4 maze quadrant areas. Eating a power pellet arms a one-use shield:
  - If shielded and wrong ghost eaten: no life lost, ghosts scatter, shield consumed.
  - Shield is indicated in the HUD (shield icon, e.g. `🛡`).
  - Max 1 shield active at a time. Picking up another power pellet while shielded has no effect (or gives bonus points instead, e.g. +50).
  - Power pellets respawn each new word.

### Mode B — GUIDED (easier)

- The **full word is displayed** in the word bar in transparent/ghost letters (opacity ~0.25), with already-collected letters filling in solid.
- The **next ghost to eat is very clearly highlighted** — bright yellow glow, slightly larger, plus a subtle animated pulse.
- Wrong ghost eaten → ghosts scatter briefly, but **no life lost** (lives still shown but only decrease if a ghost catches pac).
- No power pellets — the whole maze is open path.
- Ghosts move slightly slower than Challenge mode.

---

## HUD

```
[ BUCHSTABENGEIST ]  [ Score: 0 ]  [ Level: 1 ]  [ Lives: ❤❤❤ ]  [ 🛡 ]  [ EN/DE ]
[ Spell:  _ _ _ _ _      💬 hint text here                                       ]
```

- All labels (`Score`, `Level`, `Lives`, `Spell:`) use `T[lang].*` — never hardcoded
- Title uses `T[lang].title` — "BUCHSTABENGEIST" in both EN and DE
- Stats: Fredoka One numerals
- Word bar: underscores (Challenge) or transparent letters (Guided), filled letters animate in with a `pop` keyframe on fill
- Hint always visible (from active word bank, already in the correct language)
- Lives as ❤ symbols
- Shield indicator `🛡` only in Challenge mode, only when shield is active
- Language badge `EN` or `DE` top-right, muted style, non-interactive

---

## Pac-Man

- Start position: row 15.5, col 9.5
- Speed: `0.09` tiles/frame base
- Direction input: queued — new direction applied on next valid tile
- Mouth angle animates open/closed (`0` to `0.42` radians) while moving
- Stunned (grey, mouth frozen open) for ~55 frames after wrong eat or losing a life
- Tunnel wrap on row 9

**Controls:**
- Arrow keys or WASD
- Touch swipe (touchstart → touchend delta)

---

## Ghosts

- One ghost per letter in the target word (3–6 ghosts)
- Each ghost carries its letter rendered on its body (Fredoka One, centred)
- Spawned on random open cells, away from pac start area and away from each other
- Speed: `0.038 + wordIdx * 0.003 + level * 0.004` tiles/frame
- Ghost body: rounded top arc + scalloped bottom (3 segments)
- Eyes follow movement direction

**Palette (by word index):**

| Index | Colour  | Hex       |
|-------|---------|-----------|
| 0     | Pink    | `#ff6b9d` |
| 1     | Blue    | `#6bc5ff` |
| 2     | Orange  | `#ffa94d` |
| 3     | Green   | `#a8ff78` |
| 4     | Purple  | `#d4a0ff` |
| 5     | Red     | `#ff6b6b` |

**Ghost AI:**
- Default: 70% chance to chase pac (closest direction), 30% random
- Scared mode (after wrong eat): flee (reverse + random), speed × 0.45
- Scared flash (last ~600ms of scared): alternate white / `#3333bb`
- Scared duration: 2000ms

**Next-target highlight:**
- The ghost with the lowest un-eaten `wordIdx` is the current target
- Challenge mode: subtle yellow circular halo behind letter, `rgba(255,224,102,0.22)`
- Guided mode: bright pulsing halo, larger radius, `rgba(255,224,102,0.5)` + CSS pulse animation

---

## Power Pellets (Challenge Mode Only)

- 4 pellets, one in each quadrant of the maze, placed on open cells
- Rendered as a larger pulsing circle (radius ~`TILE * 0.28`), yellow-white glow
- Pac collects on proximity (`< 0.55` tile distance)
- Effect: arms shield for one wrong-ghost-eat
- On collection: play ascending tone sequence
- Respawn each new word round

---

## Collision Detection

Check every frame: for each living ghost, if `|pac.r - g.r| < 0.58` AND `|pac.c - g.c| < 0.58`:

1. Find `nextIdx` = lowest `wordIdx` among un-eaten ghosts
2. If `g.wordIdx === nextIdx` → **correct eat**
3. Else → **wrong eat**

**Correct eat:**
- Mark ghost eaten (`g.eaten = true`)
- Increment `wordProgress`
- Fill slot in word bar (animate)
- `score += 100 + level * 20`
- Play ascending tone
- If `wordProgress === word.length` → word complete (see below)

**Wrong eat — Challenge:**
- If shield active: consume shield, scatter ghosts, no life lost, play shield-used sound
- If no shield: `lives--`, scatter ghosts, stun pac, flash word slot red, lose-life sound
- If `lives === 0` → game over

**Wrong eat — Guided:**
- Scatter ghosts, stun pac briefly, no life change
- Flash word slot red

**Ghost catches pac (ghost is NOT scared, pac is NOT stunned):**
- Both modes: `lives--`, reset pac to start, stun pac
- If `lives === 0` → game over

---

## Word Completion

1. `score += 300 + level * 50`
2. Show centred flash text `✓ WORD!` (animate in/out, ~1.1s)
3. After 1300ms: `level++`, pick new word, respawn ghosts, reset `wordProgress`
4. Power pellets respawn (Challenge mode)

---

## Scoring Summary

| Event                        | Points            |
|------------------------------|-------------------|
| Correct ghost eaten          | `100 + level×20`  |
| Word completed               | `300 + level×50`  |
| Wrong ghost (no shield)      | `-50`             |
| Power pellet collected (spare)| `+50`            |

Score never goes below 0.

---

## Word Banks

Two separate word banks, one per language. Active bank is selected at game start based on `lang`. Each entry: `{ word, hint }`. Words are uppercase (letters displayed on ghosts). Hints are in the same language as the word.

Word selection: random, no immediate repeat of previous word.

### English — 30 words

```js
const WORDS_EN = [
  {word:"CAT",   hint:"a common household pet"},
  {word:"DOG",   hint:"man's best friend"},
  {word:"FOX",   hint:"a sly woodland animal"},
  {word:"NET",   hint:"used to catch fish"},
  {word:"JET",   hint:"a very fast plane"},
  {word:"BRAVE", hint:"courageous, not afraid"},
  {word:"CLOUD", hint:"floats in the sky"},
  {word:"DREAM", hint:"what you see while sleeping"},
  {word:"FLAME", hint:"fire's dancing light"},
  {word:"GLOBE", hint:"a sphere-shaped map"},
  {word:"QUEST", hint:"a search or adventure"},
  {word:"REALM", hint:"a kingdom or domain"},
  {word:"SWIFT", hint:"moving very fast"},
  {word:"VIVID", hint:"bright and striking"},
  {word:"WALTZ", hint:"an elegant ballroom dance"},
  {word:"BLURT", hint:"say something suddenly"},
  {word:"CRISP", hint:"firm and fresh"},
  {word:"EVOKE", hint:"bring a memory to mind"},
  {word:"FLAIR", hint:"natural talent or style"},
  {word:"HAVOC", hint:"chaos and destruction"},
  {word:"OPAQUE",hint:"not see-through"},
  {word:"PLAGUE",hint:"a widespread disease"},
  {word:"QUIVER",hint:"tremble slightly"},
  {word:"RAVINE",hint:"a narrow deep valley"},
  {word:"MINGLE",hint:"mix socially with others"},
  {word:"SOMBRE",hint:"dark and gloomy in mood"},
  {word:"LAMENT",hint:"express grief or sorrow"},
  {word:"FRIGID",hint:"very cold"},
  {word:"CLAMOR",hint:"a loud continuous noise"},
  {word:"ZENITH",hint:"the highest point"},
];
```

### German — 30 words

German words use only standard Latin A–Z uppercase letters — no Umlauts (Ä, Ö, Ü) or ß, since these cannot appear on ghosts. Where the natural word contains an Umlaut, use the common expanded form (AE, OE, UE, SS).

```js
const WORDS_DE = [
  {word:"HUND",    hint:"bester Freund des Menschen"},
  {word:"KATZE",   hint:"ein beliebtes Haustier"},
  {word:"HAUS",    hint:"dort wohnst du"},
  {word:"BAUM",    hint:"wächst im Wald oder Garten"},
  {word:"TIER",    hint:"lebt in der Natur"},
  {word:"FLUSS",   hint:"fließt ins Meer"},
  {word:"STERN",   hint:"leuchtet nachts am Himmel"},
  {word:"FEUER",   hint:"heiß und leuchtend"},
  {word:"WASSER",  hint:"zum Trinken und Schwimmen"},
  {word:"WOLKE",   hint:"schwimmt am Himmel"},
  {word:"TAPFER",  hint:"mutig und furchtlos"},
  {word:"RUHIG",   hint:"still und friedlich"},
  {word:"SCHNELL", hint:"sehr hohe Geschwindigkeit"},
  {word:"DUNKEL",  hint:"ohne Licht"},
  {word:"FRISCH",  hint:"neu und sauber"},
  {word:"KLUG",    hint:"intelligent und schlau"},
  {word:"TRAUM",   hint:"was du beim Schlafen siehst"},
  {word:"KRAFT",   hint:"körperliche Stärke"},
  {word:"WUESTE",  hint:"heißes, sandiges Gebiet"},
  {word:"INSEL",   hint:"Land, umgeben von Wasser"},
  {word:"SCHATZ",  hint:"versteckte Kostbarkeit"},
  {word:"FALKE",   hint:"ein schneller Greifvogel"},
  {word:"BODEN",   hint:"unter deinen Füßen"},
  {word:"STURM",   hint:"starker Wind mit Regen"},
  {word:"GEIST",   hint:"übernatürliches Wesen"},
  {word:"FROSCH",  hint:"springt und quakt"},
  {word:"ERNTE",   hint:"wenn Bauern Früchte sammeln"},
  {word:"HAFEN",   hint:"wo Schiffe ankern"},
  {word:"NEBEL",   hint:"dicker Dunst, kaum Sicht"},
  {word:"ZAUBER",  hint:"magische Kraft"},
];
```

### Selecting the active bank

```js
const WORDS = lang === 'de' ? WORDS_DE : WORDS_EN;
```

---

## Game States

| State      | Description                                              |
|------------|----------------------------------------------------------|
| `menu`     | Mode selection screen + instructions                     |
| `playing`  | Active gameplay                                          |
| `gameover` | Game over overlay, show final score, play again button   |

### Menu / Start Screen

- Title: `T[lang].title`, large, centred
- Two mode buttons side by side:
  - **`T[lang].modeChallenge`** — ghost icon, description: `T[lang].descChallenge`
  - **`T[lang].modeGuided`** — star icon, description: `T[lang].descGuided`
- Play button label: `T[lang].playBtn`
- Controls hint: `T[lang].controls`
- Language badge visible on menu screen too (same top-right position)

### Game Over Screen

- Title: `T[lang].gameOver`
- Subtitle: `T[lang].livesOut`
- Final score with `T[lang].score` label
- Button: `T[lang].playAgain` (returns to menu / mode selection, preserves `?lang=` param)

### Word Complete Flash

- Centred flash text: `T[lang].wordComplete`

---

## Visual Style

- Background: `#080818` (near black, dark blue tint)
- Walls: `#090920` fill, `#2424aa` border
- Pac-Man: radial gradient `#fffbb0 → #ffe066 → #bb8800`, circular arc with animated mouth
- Ghost body: flat colour fill per palette, scalloped bottom, white eyes with coloured irises
- Word bar background: `rgba(255,255,255,0.04)`, `1px solid rgba(255,255,255,0.08)`, `border-radius: 10px`
- All overlays: `rgba(8,8,24,0.9)` backdrop

---

## Animations & Sound

**CSS animations (keyframes):**
- `pop`: slot fills in with a quick scale-up bounce
- `shake`: slot shakes horizontally on wrong eat
- `wordpop`: centred completion text scales in then fades out (~1.1s)
- `pulse`: guided-mode next-ghost halo pulses opacity

**Web Audio tones (no files):**
- Correct eat: sine wave, rising pitch per letter (`400 + wordProgress * 100` Hz), 80ms
- Word complete: 3-note ascending sequence (600, 800, 1000 Hz)
- Wrong eat (no shield): sawtooth, 120 Hz, 200ms
- Shield used: two-tone blip (300 Hz then 500 Hz), sine, 80ms each
- Power pellet collected: ascending 4-note sequence

---

## Implementation Notes

- No build step. Single HTML file, open in browser.
- `lang` resolved from `?lang=` query param on page load, defaults to `en`. All strings go through `T[lang]`.
- Ghost and pac positions stored as float tile coordinates (centre of entity).
- Movement: attempt queued direction first each frame; fall back to current direction.
- Ghost pathfinding: simple — at each wall collision, pick best available direction (chase or random based on mode/state). No A*.
- `requestAnimationFrame` loop, no fixed timestep needed at this scale.
- Touch input: `touchstart` records origin, `touchend` calculates delta, sets queued direction.
- Audio context created lazily on first keydown/touch to satisfy browser autoplay policy.
- Canvas cleared and fully redrawn every frame.
- Slots in word bar are individual `<div>` elements updated via JS (not drawn on canvas).
- "Play Again" / back-to-menu navigation preserves the `?lang=` query param so language is not reset mid-session.
- German words use only A–Z (no Umlauts) — Umlauts expanded to two-letter forms (AE, OE, UE) in the word bank so all ghost letters are single standard characters.


