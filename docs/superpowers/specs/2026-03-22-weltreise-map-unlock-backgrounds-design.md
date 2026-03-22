# Weltreise: World Map Redesign, Continent Unlock Animation & Landmark Backgrounds

**Date:** 2026-03-22
**Status:** Approved by user

---

## Overview

Three improvements to the Weltreise geography platformer:

1. **Continent unlock celebration** — when the last country in a continent is beaten, the Continue button navigates to WorldMapScene with an animated unlock sequence for the newly accessible continent.
2. **SNES Mario World–style world map** — replace the plain coloured rectangles with organic terrain blobs, track-style paths, and decorative pixel-art elements.
3. **Landmark backgrounds** — Italy gets a Colosseum silhouette, France gets an Eiffel Tower, drawn programmatically in `makeCountryBg()`.

---

## Feature 1 – Continent Unlock Celebration

### Progression order change

Change `CONTINENT_ORDER` in `progress.js` from:
```
['europe', 'africa', 'asia', 'americas', 'oceania']
```
to:
```
['europe', 'americas', 'africa', 'asia', 'oceania']
```

Update `pathOrder` in `WorldMapScene.js` to match.

### WinScene changes

`WinScene.create()` calls `Progress.completeLevel(this.countryId)` to record the win. After that call, compare the continent before and after:
- Load progress before the call, capture `unlockedContinent` (before).
- After the call, load again and capture new `unlockedContinent`.
- If they differ → continent was just completed → set the Continue button callback to navigate to `WorldMapScene` with `{ unlockAnim: newContinentId }`.
- If unchanged → normal flow → Continue goes to `LevelSelectScene`.

### WorldMapScene unlock animation

`WorldMapScene.init(data)` stores `data.unlockAnim` (the newly unlocked continent id, or null).

After the scene finishes drawing, if `unlockAnim` is set, play this sequence on the target continent node:
1. **600ms delay** (let map render fully)
2. **Flash ring**: expanding circle (radius 36→90, alpha 1→0, duration 500ms) in white
3. **Pop tween**: node graphics scale 1→1.5→1 (duration 400ms, ease Bounce)
4. **Star burst**: 8 small gold star text objects (`★`) fly outward in 8 directions (radius 80px, alpha 1→0, duration 700ms)
5. **Banner text**: e.g. `"Americas freigeschaltet!"` / `"Americas unlocked!"` slides in from y+40, fades in (duration 400ms), holds 2s, fades out (duration 400ms)

All implemented with Phaser tweens (`this.tweens.add`) — no external dependencies.

---

## Feature 2 – SNES Mario World–style World Map

### Continent node positions

Keep existing approximate positions. Ensure they make visual sense for the new path order (europe → americas → africa → asia → oceania). Americas node moves slightly to form a clear left-to-right or curved path.

Suggested positions (x, y on 960×720 canvas):
- Europe:   490, 210
- Americas: 175, 290
- Africa:   500, 400
- Asia:     695, 200
- Oceania:  800, 480

### Ocean background

Replace `0x1a6b9a` solid fill with:
- Base fill `0x1a7fa8`
- 6–8 horizontal wave stripes (lighter blue `0x2090bb`, height 4px, opacity 0.4, evenly spaced)

### Continent terrain blobs

Replace `fillRoundedRect` with `fillTriangle` / `fillRect` combos forming organic multi-polygon shapes. Each continent uses 2–3 overlapping rounded rects or polygons to create an irregular silhouette.

Palette (SNES-inspired):
- Europe: `0x5a9e3a` (mid green)
- Americas: `0x3d7a3d` (dark green)
- Africa: `0xc8923a` (warm tan/orange)
- Asia: `0x7a9e3a` (olive green)
- Oceania: `0xc8a03a` (sandy tan)

Each blob also has a slightly darker border (filled polygon behind, 4px larger) and a subtle lighter highlight strip on the top-left edge.

### Path style

Replace simple lines with double-track style:
- Draw two parallel lines (offset ±4px perpendicular to path direction)
- Every 20px along the path: a short crossbar connecting them (like a railway track)
- Travelled segments: gold (`0xffcc00`)
- Locked segments: grey (`0x888888`, alpha 0.5)

### Decorations

Small pixel-art details scattered on continent blobs:
- **Europe**: 2–3 small castle towers (rectangle + triangle roof, 12px tall)
- **Americas**: 2–3 pine trees (stacked triangles)
- **Africa**: 2 acacia trees (trunk + flat ellipse canopy)
- **Asia**: 1 small pagoda (layered rectangles narrowing upward)
- **Oceania**: 1–2 palm trees (trunk + ellipse fronds)

### Node style

Replace plain circles with "coin" style:
- Outer ring: gold `0xffcc00`, thickness 4px, radius 32px
- Inner fill: darker gold `0xe8a000` (unlocked/current) or `0x444444` (locked)
- Completed: bright gold `0xffdd44` fill, star icon
- Current: pulsing scale tween (1.0→1.08→1.0, repeat -1, duration 900ms)

---

## Feature 3 – Landmark Backgrounds

Changes made inside `makeCountryBg()` in `GameScene.js`, added as special cases after the base terrain is drawn.

### Italy – Colosseum

Drawn in the `'med'` type block for `id === 'italy'`. Placed center-right (x ~620–820, ground level y ~486).

Structure:
- **Base oval**: wide flat ellipse `0xd4b483` (stone colour), width 200, height 40, at ground level
- **Lower arcade row** (y ~400–486): 9 arched openings represented as dark rectangles `0x3a2a10` (14×22px each) evenly spaced across the wall face `0xc8a870`
- **Middle arcade row** (y ~350–400): 8 arched openings, slightly narrower total width
- **Upper row / attic** (y ~320–350): solid wall with 6 small rectangular windows
- **Partial ruin**: right third of the upper row is absent (broken silhouette)

### France – Eiffel Tower

Added as a special case in the `'fields'` type block for `id === 'france'`. Placed centre (x ~440–520), rising from ground (y ~488) to y ~200.

Structure:
- **Base legs** (y 480–430): two wide triangular legs splaying outward, dark steel `0x4a4a5a`
- **First platform** (y ~430): horizontal rectangle `0x5a5a6a`, width 80
- **Mid section** (y 430–320): narrower triangular body converging upward
- **Second platform** (y ~320): horizontal rectangle, width 40
- **Upper spire** (y 320–200): thin rectangle narrowing to point
- **Lattice detail**: small cross-hatched lines (`0x5a5a5a`) across the body sections
- **Tip sparkle**: gold dot `0xffdd44` at very top (y ~200), with a small tween pulse

---

## Files Changed

| File | Change |
|------|--------|
| `src/utils/progress.js` | Update `CONTINENT_ORDER` array |
| `src/scenes/WinScene.js` | Detect continent completion, change Continue destination |
| `src/scenes/WorldMapScene.js` | Full visual rework + unlock animation |
| `src/scenes/GameScene.js` | Add Colosseum (Italy) and Eiffel Tower (France) to `makeCountryBg()` |

---

## Out of Scope

- Audio/fanfare for continent unlock (already have anthem system — not adding new SFX)
- New continent order affects only `CONTINENT_ORDER` and `pathOrder`; question content, enemy sprites, and anthems are unaffected
