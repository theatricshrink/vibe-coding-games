# Geisterjagd / Ghost Hunt — Design Spec
**Date:** 2026-04-09
**Framework:** Phaser 3.60 (CDN), vanilla JS, no bundler
**Collection:** Wilma's Game Collection (`vibe-coding-games`)

---

## Overview

A Qix-style territory-claiming game. The player draws lines across a grid board to enclose areas. The twist: roaming colored ghosts must be trapped inside enclosed areas to complete each level. All ghosts trapped = level complete.

**Name:** Geisterjagd (DE) / Ghost Hunt (EN)
**Portal emoji:** 🕸️
**Platform:** browser + mobile

---

## Board & Grid

- Canvas: 960×560 (standard collection size)
- Grid cell: 16×16px → 60 columns × 35 rows = 2100 interior cells
- Border cells: permanently claimed (outer wall, always drawn)
- Interior cells: one of three states — `unclaimed`, `claimed`, `drawing` (live fuse)
- Board layout is fixed every game (same dimensions, same starting border)

---

## Player Movement

- Player token sits on a grid cell and moves one cell per input tick
- On the border or a claimed cell: free movement in 4 directions (up/down/left/right)
- Stepping onto an unclaimed cell from a claimed cell: begins the drawing line (fuse mode)
- In fuse mode: player leaves a trail of `drawing` cells behind them
- Reconnecting to any claimed cell or border while in fuse mode: closes the area → triggers flood fill
- Player cannot cross their own live drawing line (would cause self-intersection death — treated as a death condition same as ghost collision)

---

## Area Closure & Flood Fill

When the player closes an area:
1. Run flood fill from both sides of the closed line
2. Identify which region(s) contain ghosts
3. Claim the region(s) **without** ghosts (classic Qix rule)
4. If ghosts are on both sides: claim the **smaller** region
5. Count ghosts inside the claimed region — they are now trapped
6. Apply scoring/visual rules (see Scoring section)
7. All `drawing` cells become `claimed`

---

## Ghosts

- Ghosts roam freely inside unclaimed territory only
- Movement: random walk AI — pick a random direction, move until hitting a claimed cell or border, then pick a new random direction. Slight randomness on each step to avoid pure straight-line bouncing.
- Ghosts cannot enter claimed cells
- Each ghost has one color (see Progression for color count per level)
- Ghost speed increases with level progression

### Death Condition
- Any ghost touches a `drawing` cell (live fuse) → player dies
- Easy mode: lose 1 life, fuse cancelled, player returns to nearest border point, ghosts continue roaming
- Hard mode: immediate game over
- Player also dies if they cross their own drawing line

---

## Scoring

Applied when an area is closed and ghosts are counted inside:

| Trapped ghosts | Result |
|---|---|
| 0 ghosts | Area fills neutral (light grey-blue), score = area_cells × 1 |
| 1 ghost, any color | Area fills neutral, score = area_cells × 1 |
| 2+ ghosts, all same color | **Bonus:** area fills with ghost color + shimmer/sparkle effect + bonus sound, score = area_cells × 3 |
| 2+ ghosts, mixed colors | **Fail:** area fills grey + "wah-wah" Mario-style fail sound, score = area_cells × 1 |

Score shown live on HUD. High score tracked in `localStorage` per difficulty.

---

## Difficulty Modes

Selected on the Menu screen before starting.

| | Easy | Hard |
|---|---|---|
| Lives | 3 | 0 (one hit = game over) |
| Lives display | 3 ghost icons in HUD | — |

---

## Level Progression

| Level range | Ghost count | Ghost speed | Colors |
|---|---|---|---|
| 1–3 | 3–5 | slow | 2 |
| 4–6 | 5–8 | medium | 3 |
| 7–9 | 8–12 | fast | 4 |
| 10+ | 12+ | fast+ | 4 |

Ghost count and speed increase gradually within each range. Level number displayed in HUD.

Level complete when all ghosts are trapped (zero free ghosts remaining on board). Brief level-complete fanfare, then next level loads with same board but reset claimed area and new ghost set.

---

## Controls

### Keyboard
- Arrow keys: move player

### Mobile
- Virtual D-pad overlay: 4 directional buttons, bottom-center of screen
- Same implementation pattern as other games in the collection

---

## Scenes

1. **BootScene** — preload assets (none; all procedural), set up audio context
2. **MenuScene** — title, difficulty selection (Easy / Hard buttons), start button, lang already applied
3. **GameScene** — main game loop: board, player, ghosts, HUD (score, level, lives)
4. **GameOverScene** — show final score, level reached, high score, play again / back to menu buttons

Scene data passed: `{ difficulty, score, level }`

---

## Audio (WebAudio synthesis only, no files)

| Event | Sound |
|---|---|
| Player movement tick | Faint short blip |
| Area closed (neutral) | Short success chime |
| Bonus trap (same color) | Bright ascending sparkle arpeggio |
| Fail trap (mixed colors) | Descending "wah-wah" (Mario-style) |
| Player death | Low thud + descending sting |
| Level complete | Short upbeat fanfare |

All sounds generated via `Phaser.Sound` WebAudio tone synthesis.

---

## i18n

Follows existing pattern: `src/i18n/lang.js` (detects language) + `src/i18n/strings.js` (all UI strings in DE/EN).

Key strings needed: title, subtitle, difficulty labels (easy/hard), HUD labels (score, level, lives), game over screen, level complete message.

---

## File Structure

```
geisterjagd/
  index.html
  manifest.json
  service-worker.js
  src/
    i18n/
      lang.js
      strings.js
    scenes/
      BootScene.js
      MenuScene.js
      GameScene.js
      GameOverScene.js
    utils/
      BoardGrid.js     — grid state, flood fill, cell management
      GhostAI.js       — ghost random-walk logic
    main.js
```

---

## Portal Integration

Add card to `/index.html`:
- `data-supports-browser="true"` `data-supports-mobile="true"`
- Emoji: 🕸️
- DE desc: "Fange die Geister ein — aber nur die gleiche Farbe zählt!"
- EN desc: "Trap the ghosts — but only matching colors score big!"
