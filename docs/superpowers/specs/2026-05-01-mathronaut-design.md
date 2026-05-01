# Mathronaut — Design Spec

**Date:** 2026-05-01  
**Game folder:** `mathronaut/`  
**Target age:** 8–12 (solidifying multiplication, starting division, dipping into fractions)

---

## Overview

Mathronaut is a Doodle Jump-style vertical scrolling platformer where an astronaut climbs into space by landing on the correct math answer. Platforms appear in rows of three — one correct answer, two plausible distractors. Landing on the wrong platform crumbles it. The math difficulty ramps as altitude increases, moving through four tiers: addition/subtraction → multiplication → division → fractions. Two modes give younger/casual players a forgiving entry point (3 lives) and confident players a challenge (instant game over).

---

## Scene Structure

**Canvas:** 480×854 portrait, `Phaser.Scale.FIT` + `Phaser.Scale.CENTER_BOTH`  
**Phaser version:** 3.60.0 via CDN (`https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js`)

**Scene flow:** `StartScene` → `GameScene` → `GameOverScene`

### StartScene
- Game title ("Mathronaut"), astronaut graphic centred
- Mode selector: Normal (3 lives) / Hard (instant game over)
- Best height display per mode, loaded from localStorage
- Language-respecting strings via `t(key)` helper
- Start button launches `GameScene` with `{ mode }` in scene data

### GameScene
- Full climb loop: platform spawning, physics, math logic, HUD, camera
- Receives `mode` from scene data
- On game over: transitions to `GameOverScene` with `{ mode, height, tier }`

### GameOverScene
- Astronaut floating graphic, final height, personal best, tier reached
- Two buttons: Retry (back to `StartScene`) / Back to Portal (`../index.html`)
- Updates localStorage best if new record

---

## Core Gameplay Mechanics

**Movement:** Auto-jump on platform contact (no jump button). Player steers left/right only.  
**Controls:**
- Desktop: left/right arrow keys
- Mobile: touch and hold left half of screen = go left, touch and hold right half = go right

**Camera:** Follows astronaut upward only — never scrolls down. Height measured in metres, displayed as `🚀 142m`.

**Platform clusters:** Platforms spawn in rows of 3. One correct answer, two distractors. All three platforms in a row are reachable from a normal jump arc. Correct answer platform position within the row is randomised each spawn.

**Vertical spacing:** Rows ~130px apart. Platform width: ~120px (readable on mobile).

**Landing outcomes:**
- Correct platform → bounce + star-burst particle effect + brief green flash
- Wrong platform → crumble + fall animation; Normal mode: lose a heart, respawn on safe platform above; Hard mode: immediate transition to `GameOverScene`
- Fall below screen bottom → treated identically to wrong landing

---

## Math Engine (`MathEngine.js`)

Single exported method: `generate(tier)` → `{ question: string, correct: number|string, distractors: [number|string, number|string] }`

### Difficulty Tiers

| Tier | Altitude | Topic | Example |
|------|----------|-------|---------|
| 1 | 0–300 m | Addition & Subtraction | `14 + 7 = ?` |
| 2 | 300–700 m | Multiplication | `6 × 8 = ?` |
| 3 | 700–1200 m | Division | `56 ÷ 7 = ?` |
| 4 | 1200 m+ | Fractions | `1/2 + 1/4 = ?` |

### Distractor Strategy
Distractors are plausible near-misses, not random values:
- Addition/subtraction: ±1 or ±2 off the correct answer, or a common carry mistake
- Multiplication: adjacent multiples (e.g. for `6×8=48` → distractors: `42`, `54`)
- Division: result ±1 or a wrong divisor result (e.g. for `56÷7=8` → `7`, `9`)
- Fractions: wrong denominator sums (e.g. for `1/2+1/4=3/4` → `1/2`, `2/4`)

### Fraction Display
Fractions rendered as plain text with slash notation: `"1/2 + 1/4 = ?"`. Font size tuned for legibility on 120px-wide platforms.

---

## Difficulty Manager (`DifficultyManager.js`)

Tracks astronaut's max altitude and returns current tier. Fires a one-time zone announcement on tier entry.

```
getTier(altitudeMetres) → 1 | 2 | 3 | 4
onTierChange(callback)  → called with new tier when altitude crosses a threshold
```

Zone announcement: brief localised banner (`"🚀 Multiplication Zone!"` / `"Multiplikations-Zone!"`) fades in for 2s below the question HUD band, without pausing gameplay.

Altitude thresholds: 300 m, 700 m, 1200 m.

---

## Platform Pool (`PlatformPool.js`)

Fixed pool of ~15 row-groups (each group = 3 Phaser GameObjects). As platforms scroll below the visible area, they are recycled and repositioned above with a fresh question from `MathEngine`. Keeps memory and draw calls constant regardless of play duration — important for mobile performance.

```
init(scene)
getNextRow(yPosition, tier) → positions and labels 3 platforms, marks one correct
recycle(row)                → called when row exits bottom of visible area
```

---

## Game Modes

### Normal Mode
- 3 hearts shown in HUD top-right
- Wrong landing: remove one heart, crumble animation, astronaut respawns on a freshly spawned neutral platform (no answer label) positioned ~200px above the failed row
- Game over when all hearts gone
- localStorage key: `mathronaut_best_normal`

### Hard Mode
- No hearts in HUD
- Wrong landing: crumble animation → immediate `GameOverScene`
- localStorage key: `mathronaut_best_hard`

Mode passed from `StartScene` to `GameScene` via Phaser scene data: `this.scene.start('GameScene', { mode: 'normal' | 'hard' })`.

---

## Visual Theme

### Space Zones (background shifts gradually with altitude)

| Tier | Zone | Background colour | Platform style |
|------|------|-------------------|----------------|
| 1 | Low atmosphere | `#0d1b2a` deep blue | Grey rock / earth |
| 2 | Upper atmosphere | `#1a0a2e` purple-navy | Metallic steel |
| 3 | Near space | `#050510` dark void | Asteroid rock |
| 4 | Deep space | `#000005` black + star field | Crystal/ice |

Background tint transitions are gradual (lerp over ~50 m of altitude), not hard cuts.

### Astronaut
Simple white-suit sprite with visor and thruster puff. 2-frame bounce cycle (idle / squash on land). Small thruster particle trail while airborne.

### Feedback Effects
- **Correct:** Star-burst particle effect at landing point, platform briefly flashes green
- **Wrong:** Platform cracks then falls offscreen, astronaut flashes red
- **Zone transition:** Banner text + gradual background tint shift

---

## HUD Layout (fixed overlay)

```
┌─────────────────────────────────────┐
│  [Question: 6 × 8 = ?             ] │  ← full-width semi-transparent dark band
│  🚀 142m              ❤️ ❤️ ❤️     │  ← height left, hearts right
│  [Zone banner fades in here]         │  ← tier transition only, auto-fades
└─────────────────────────────────────┘
```

Question band: always visible, large font (~32px), high contrast.  
Height label: smaller font (~20px), left-aligned.  
Hearts: 24px emoji, right-aligned (Normal mode only).

---

## i18n

Pattern: identical to existing games.

`src/i18n/lang.js` — reads `pgame_lang` from localStorage, sets `LANG = 'de' | 'en'`  
`src/i18n/strings.js` — `STRINGS = { de: {...}, en: {...} }` + `t(key)` helper

Key string groups: UI labels, mode names, zone banners (×4), game over screen, back button, portal card.

---

## Portal Integration

Add card to main `index.html`:
```html
<a class="card" href="./mathronaut/index.html"
   data-supports-browser="true" data-supports-mobile="true">
  <div class="card-emoji">🚀</div>
  <div class="card-title" id="card-mn-title"></div>
  <div class="card-desc"  id="card-mn-desc"></div>
  <div class="card-btn"   id="card-mn-btn"></div>
  <div class="card-platforms">
    <span class="platform-badge supported" id="mn-badge-browser">🖥️ Browser</span>
    <span class="platform-badge supported" id="mn-badge-mobile">📱 Mobile</span>
  </div>
  <div class="platform-unavailable" id="card-mn-unavail" style="display:none;"></div>
</a>
```

Portal strings added to `PORTAL_STRINGS` in main `index.html`:
- `mnTitle` — de: `"Mathronaut"` / en: `"Mathronaut"`
- `mnDesc` — de: `"Mathe trifft Weltraum! Spring auf die richtige Antwort und klettere zu den Sternen."` / en: `"Math meets space! Jump on the right answer and climb to the stars."`
- `mnBtn` — de: `"Spielen"` / en: `"Play"`

---

## File Structure

```
mathronaut/
├── index.html                   ← game shell, back button, script loader
├── main.js                      ← Phaser config + new Phaser.Game(config)
└── src/
    ├── i18n/
    │   ├── lang.js
    │   └── strings.js
    ├── data/
    │   └── mathProblems.js      ← static fallback problem pools per tier
    ├── scenes/
    │   ├── StartScene.js
    │   ├── GameScene.js
    │   └── GameOverScene.js
    └── utils/
        ├── MathEngine.js
        ├── DifficultyManager.js
        └── PlatformPool.js
```

---

## localStorage Keys

| Key | Value | Description |
|-----|-------|-------------|
| `pgame_lang` | `'de'` \| `'en'` | Shared portal language (read-only within game) |
| `mathronaut_best_normal` | number (metres) | Normal mode personal best |
| `mathronaut_best_hard` | number (metres) | Hard mode personal best |
