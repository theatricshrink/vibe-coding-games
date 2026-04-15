# Player Figure Redesign

**Date:** 2026-04-15
**Status:** Approved

## Problem

The current player figure is an orange 36×36 rectangle with a 🧒 emoji on top. The rectangle creates a flat, jarring square behind the emoji, and the overall look is inconsistent with what a polished game character should feel like.

## Goal

Replace the player figure with a pixel-art explorer character that faces the direction of movement. No external assets — everything drawn via Phaser 3 Graphics API.

## Design

### Pixel grid

8 columns × 10 rows. Each pixel is drawn as a 4×4px `fillRect`, producing a 32×40px character centred on the 48×48 tile (8px horizontal margin, 4px vertical margin top, 4px bottom).

### Colour palette

| Code | Hex       | Used for          |
|------|-----------|-------------------|
| `H`  | `#5c3317` | Hat / hair        |
| `S`  | `#f5c58a` | Skin              |
| `E`  | `#333333` | Eyes              |
| `J`  | `#52b788` | Green jacket      |
| `P`  | `#3a7bd5` | Blue pants        |
| `.`  | —         | Transparent (skip)|

### 4-directional pixel grids

**Down (front-facing)**
```
. H H H H H H .
H H H H H H H H
. . S S S S . .
. . S E S E . .
. . S S S S . .
. J J J J J J .
J J J J J J J J
. J J J J J J .
. . P P . P P .
. . P P . P P .
```

**Up (back-facing)**
```
. H H H H H H .
H H H H H H H H
. . H H H H . .
. . H H H H . .
. . S S S S . .
. J J J J J J .
J J J J J J J J
. J J J J J J .
. . P P . P P .
. . P P . P P .
```

**Left**
```
. . H H H H . .
. H H H H H H .
. . S S S . . .
. . E S S . . .
. . S S S . . .
. J J J J J . .
. J J J J J J .
. J J J J J . .
. . P P P . . .
. . P . P . . .
```

**Right** (mirror of Left)
```
. . H H H H . .
. H H H H H H .
. . . S S S . .
. . . S S E . .
. . . S S S . .
. . J J J J J .
. J J J J J J .
. . J J J J J .
. . . P P P . .
. . . P . P . .
```

### Direction tracking

`_playerDir` (string, default `'down'`) is set in `_tryMove(dc, dr)` before the move executes:

| dc | dr | direction |
|----|----|-----------|
|  0 | -1 | `'up'`    |
|  0 | +1 | `'down'`  |
| -1 |  0 | `'left'`  |
| +1 |  0 | `'right'` |

### Changes to GameScene.js

1. **Add constants** — `PLAYER_PALETTE` (code → hex number) and `PLAYER_PIXELS` (direction → 8×10 array) at the top of the file.
2. **`create()`** — initialise `this._playerDir = 'down'`; remove `this._playerText` (the emoji Text object).
3. **`_tryMove()`** — set `this._playerDir` from `dc`/`dr` before calling `_drawPlayer()`.
4. **`_drawPlayer()`** — replace the orange `fillRect` + emoji positioning with a pixel-grid loop: iterate rows/cols of `PLAYER_PIXELS[this._playerDir]`, skip `'.'`, otherwise set `fillStyle` from palette and draw a 4×4 rect at `(col * TILE_SIZE + offsetX + c*4, row * TILE_SIZE + offsetY + r*4)`.

No other files change.
