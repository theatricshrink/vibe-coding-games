# Weltreise: World Map Redesign, Continent Unlock Animation & Landmark Backgrounds

**Date:** 2026-03-22
**Status:** Approved by user

---

## Overview

Three improvements to the Weltreise geography platformer:

1. **Continent unlock celebration** — when the last country in a continent is beaten, the Continue button navigates to WorldMapScene with an animated unlock sequence for the newly accessible continent.
2. **SNES Mario World–style world map** — replace the plain coloured rectangles with organic terrain blobs, double-track paths, and decorative pixel-art elements.
3. **Landmark backgrounds** — Italy gets a Colosseum silhouette, France gets an Eiffel Tower, drawn programmatically in `makeCountryBg()`.

---

## Feature 1 – Continent Unlock Celebration

### Progression order change

Change `CONTINENT_ORDER` in **both** of the following locations to `['europe', 'americas', 'africa', 'asia', 'oceania']`:

1. `progress.js` line 2: `var CONTINENT_ORDER = [...]` — this controls the unlock advancement logic.
2. `WorldMapScene.js`: the local `var pathOrder = [...]` array inside `create()` — this controls path drawing. It is a standalone array, not read from `Progress.CONTINENT_ORDER`, and must be updated separately.

Both arrays must stay in sync or the unlock sequence will not match the drawn path.

### WinScene changes

`WinScene` already receives `this.countryId` and `this.continentId` via `init(data)`.

In `WinScene.create()`, **replace** the existing `makeMarioBtn` continue button entirely with the following logic:

1. Read `Progress.load().unlockedContinent` → `var beforeContinent`.
2. Call `Progress.completeLevel(this.countryId)`.
3. Read `Progress.load().unlockedContinent` again → `var afterContinent`.
4. If `beforeContinent !== afterContinent` → continent was just completed → create the Continue button with callback: `self.scene.start('WorldMapScene', { unlockAnim: afterContinent })`.
5. If equal → normal flow → create the Continue button with callback: `self.scene.start('LevelSelectScene', { continentId: self.continentId })`.

The button style (`makeMarioBtn`, green, 260×62, 26px) stays the same in both cases — only the callback destination differs. The existing hardcoded `makeMarioBtn` call on line 46 must be removed.

Note: `Progress.completeLevel()` is also called in `GameScene` — that is fine. `WinScene` calling it again is safe because `completeLevel` is idempotent.

### WorldMapScene unlock animation

`WorldMapScene` currently has no `init` method. Add one before `create`:
```javascript
init: function(data) {
  this.unlockAnimContinent = (data && data.unlockAnim) ? data.unlockAnim : null;
},
```

The continent node positions are stored in a `nodeMap` object keyed by continent id (already present in `WorldMapScene.create()`). Use `nodeMap[this.unlockAnimContinent]` to get `{ x, y }` for the animation target.

After the scene finishes drawing all static elements, if `this.unlockAnimContinent` is set, play this sequence:

1. **600ms delay** — `this.time.delayedCall(600, function() { ... })`
2. **Flash ring** — `var ring = this.add.graphics()`. Call `ring.setPosition(node.x, node.y)` so the origin is at the node centre. Draw `ring.fillCircle(0, 0, 36)` (at local 0,0 — not node.x, node.y). Then tween `ring.scaleX`/`ring.scaleY` from 1→2.5 and `ring.alpha` from 1→0 over 500ms. This ensures the scale expansion radiates from the node centre.
3. **Pop tween** — the continent's `nodeG` graphics object: tween `scaleX`/`scaleY` from 1→1.5, duration 300ms, ease `'Sine.easeOut'`, `yoyo: true`. Using `Sine.easeOut` (not Bounce) avoids an awkward bouncing-down effect on the yoyo return leg.
4. **Star burst** — create 8 `this.add.text()` objects with `★`, fontFamily `'Arial'`, fontSize `'20px'`, color `'#ffcc00'`. Place all 8 at (node.x, node.y). Tween each one outward in its direction (angle = i * 45°, radius 80px target), with `alpha` 1→0, duration 700ms.
5. **Banner text** — `this.add.text(node.x, node.y + 40, bannerText, ...)` using the global `LANG` variable: `LANG === 'de' ? (continentName.de + ' freigeschaltet!') : (continentName.en + ' unlocked!')`. Continent display names are available from the same `CONTINENTS` array already in `WorldMapScene`. Tween `y` from `node.y + 40` → `node.y + 10` and `alpha` 0→1 over 400ms. Then hold 2000ms via `delayedCall`, then tween `alpha` 1→0 over 400ms.

All via Phaser tweens (`this.tweens.add`) — no external dependencies.

---

## Feature 2 – SNES Mario World–style World Map

### Continent node positions (960×720 canvas)

- Europe:   490, 210
- Americas: 175, 290
- Africa:   500, 400
- Asia:     695, 200
- Oceania:  800, 480

These positions are stored in the `CONTINENTS` array inside `WorldMapScene.create()`. The `nodeMap` object is built from this array (keyed by `id`).

### Ocean background

Replace solid `0x1a6b9a` fill with:
- Base fill: `0x1a7fa8`
- 6 horizontal wave stripes: `0x2090bb`, height 4px, alpha 0.4, spaced every ~100px vertically

### Continent terrain blobs

Replace each `fillRoundedRect` with 2–3 overlapping `fillRoundedRect` calls at slightly offset positions/sizes to create an organic multi-lobe silhouette. Draw a slightly larger version in a darker shade first (4px bigger on each side) as a border/shadow, then draw the main colour on top.

Colours (SNES-inspired):
- Europe: `0x5a9e3a` (border `0x3a6e1a`)
- Americas: `0x3d7a3d` (border `0x1d5a1d`)
- Africa: `0xc8923a` (border `0xa8721a`)
- Asia: `0x7a9e3a` (border `0x5a7e1a`)
- Oceania: `0xc8a03a` (border `0xa8801a`)

### Path style (double-track)

Replace the existing dashed-line path drawing with double-track style. For each segment from continent A to continent B:

```
dx = B.x - A.x
dy = B.y - A.y
dist = sqrt(dx*dx + dy*dy)
// Perpendicular unit vector
px = -dy/dist * 4
py =  dx/dist * 4
// Rail 1: A + perp  →  B + perp
// Rail 2: A - perp  →  B - perp
// Crossbars: every 20px along the path, draw a 9px line perpendicular to the path
```

Travelled segments: rail color `0xffcc00`, crossbar `0xe8a000`. Locked segments: rail color `0x888888`, alpha 0.5.

### Decorations

Small pixel-art elements scattered on continent blobs (drawn with Graphics, fixed positions):

- **Europe** (x ~385–605, y ~120–290): 2 castle towers — each is a 10×16px rectangle + 10×8px triangle on top, color `0x8888aa`, at approx (430, 200) and (520, 190).
- **Americas** (x ~80–290, y ~180–450): 2 pine trees — 3 stacked isoceles triangles (bottom 18px wide → top 8px wide), green `0x2a6a18`, at approx (130, 320) and (220, 340).
- **Africa** (x ~390–600, y ~300–510): 2 acacia trees — 6px wide trunk 16px tall + flat ellipse canopy 32×10px, colors trunk `0x6a4018` canopy `0x4a7018`, at approx (440, 400) and (560, 420).
- **Asia** (x ~560–850, y ~110–380): 1 pagoda — 3 layered rectangles, each 4px shorter and 6px narrower than the one below, capped with a small triangle, color `0xcc4422`, at approx (680, 230).
- **Oceania** (x ~725–895, y ~405–545): 1 palm tree — 5px trunk 30px tall + two 28×8px ellipses for fronds at angle, colors trunk `0x8a5820` fronds `0x2a8a18`, at approx (780, 460).

### Node style

Replace plain filled circles with coin-style nodes:

- **Locked**: inner fill `0x444444`, ring `0x777777`, radius 28px
- **Unlocked/current**: inner fill `0xe8a000`, ring `0xffcc00` (thickness 4px), radius 32px. **Note:** the existing code uses `0x2196F3` (blue) for unlocked-but-not-completed nodes — this replaces it with gold `0xe8a000`.
- **Completed**: inner fill `0xffdd44`, ring `0xffcc00`, radius 28px, star `★` text (Arial, 18px, white)
- **Current continent** (the one at `unlockedIdx`): radius 34px, and add a pulse tween `scaleX`/`scaleY` 1.0→1.08→1.0, `yoyo: true`, `repeat: -1`, duration 900ms, ease `'Sine.easeInOut'`

The existing emoji label inside nodes can remain or be replaced by the star icon for completed nodes.

---

## Feature 3 – Landmark Backgrounds

All changes are inside `makeCountryBg()` in `GameScene.js`. The base sky/ground layer for each country type is already drawn before these special cases execute. The Colosseum and Eiffel Tower are drawn on top of the base layer.

### Italy – Colosseum

Added as a special case `if (id === 'italy')` inside the `else if (type === 'med')` block (Italy already uses `type: 'med'` — confirmed in CFG table). The ground level in the `'med'` type is drawn at y=486.

Colosseum is placed center-right: anchor x=680, ground y=486.

```
wall face colour: 0xc8a870
arch opening colour (dark): 0x3a2a10
shadow/base colour: 0xb09060
```

Draw order (back to front):

1. **Base oval**: `fillEllipse(680, 486, 200, 30)` in `0xb09060` — ground shadow
2. **Wall body** (lower+mid section): `fillRect(580, 340, 200, 146)` in `0xc8a870`
3. **Lower arcade** (y 420–442): 9 arch openings — `fillRect(x, 420, 14, 22)` in `0x3a2a10`, x positions evenly spaced from 587 to 767, step ~22px
4. **Middle arcade** (y 370–392): 8 arch openings — `fillRect(x, 370, 12, 20)` in `0x3a2a10`, x positions evenly spaced from 592 to 758, step ~24px
5. **Upper attic** (y 340–368): `fillRect(580, 340, 160, 28)` in `0xc8a870` (only 160px wide — right 40px broken off)
6. **Attic windows**: 5 small `fillRect(x, 346, 8, 12)` in `0x3a2a10`, evenly spaced from 590 to 726
7. **Ruin break**: draw `fillRect(742, 340, 38, 28)` in `0x1a7fa8` (sky colour) to erase top-right corner, creating the ruined/broken appearance. Use the sky colour matching `type === 'med'`: `sky1` variable (`0x3a88d5` for Italy).

### France – Eiffel Tower

Added as a special case `if (id === 'france')` inside the `else if (type === 'fields')` block (France already uses `type: 'fields'` — confirmed in CFG table). The ground level in the `'fields'` type is at y≈558.

Tower is centred at x=480, ground y=488 (the lavender field layer, above the green ground).

All tower parts drawn in dark steel `0x4a4a5a`:

1. **Left base leg**: `fillTriangle(400, 488, 455, 420, 470, 488)`
2. **Right base leg**: `fillTriangle(510, 488, 525, 420, 580, 488)`
3. **First platform**: `fillRect(442, 416, 96, 10)` in `0x5a5a6a`
4. **Mid body left**: `fillTriangle(442, 416, 462, 310, 468, 416)`
5. **Mid body right**: `fillTriangle(492, 416, 518, 416, 498, 310)`
6. **Second platform**: `fillRect(458, 306, 64, 8)` in `0x5a5a6a`
7. **Upper spire**: `fillTriangle(458, 306, 480, 195, 522, 306)`
8. **Lattice lines** (decorative): 3 horizontal lines in `0x5a5a5a`: at y=380 from x=430 to x=530 (width 100), at y=360 from x=438 to x=522, at y=340 from x=446 to x=514
9. **Tip sparkle**: `fillCircle(480, 195, 4)` in `0xffdd44`, plus a small tween `alpha` 1→0.3→1, `yoyo: true`, `repeat: -1`, duration 1200ms on a separate graphics object

---

## Files Changed

| File | Change |
|------|--------|
| `src/utils/progress.js` | Update `CONTINENT_ORDER` array |
| `src/scenes/WinScene.js` | Capture continent before/after `completeLevel`, route Continue to WorldMapScene with `unlockAnim` flag when continent changes |
| `src/scenes/WorldMapScene.js` | Full visual rework (ocean, blobs, double-track paths, decorations, coin nodes) + unlock animation sequence |
| `src/scenes/GameScene.js` | Add Colosseum (Italy) and Eiffel Tower (France) landmark art in `makeCountryBg()` |

---

## Out of Scope

- Audio/fanfare for continent unlock
- Changes to question data, enemy sprites, or anthems
- Any continent other than Italy and France getting landmark art in this iteration
