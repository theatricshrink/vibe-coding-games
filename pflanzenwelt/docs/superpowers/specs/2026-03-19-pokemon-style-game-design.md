# Pokemon-Style Browser Game — Design Spec

**Date:** 2026-03-19
**Audience:** 9-year-old German-speaking player
**Platform:** Desktop browser (no install, no mobile optimization)

---

## Overview

A Pokemon-inspired browser game focused on **exploring a small map** and **catching creatures** by answering German-language quiz questions. Built with Phaser.js, playable by opening a single HTML file.

---

## Architecture

```
game/
├── index.html                  # Entry point, loads Phaser via CDN
├── src/
│   ├── main.js                 # Phaser game config, scene registry
│   ├── scenes/
│   │   ├── GameScene.js        # Map, player movement, creature encounters
│   │   ├── QuizScene.js        # German quiz overlay for catching creatures
│   │   └── CollectionScene.js  # Pokédex-style collection viewer
│   └── data/
│       ├── creatures.js        # Creature definitions (name, emoji, rarity)
│       └── questions.js        # German quiz questions by category
└── assets/
    └── (no external art required — see Map section)
```

**Tech stack:**
- Phaser.js loaded via CDN — no npm, no build step
- localStorage for save data
- Pure JS, no framework

**Scene management:** QuizScene and CollectionScene are launched as **overlays** using `scene.launch()` with GameScene paused via `scene.pause()`, not replaced. This preserves all GameScene state across encounters.

---

## Map & Player

- **Size:** 20×15 tile grid, 48px per tile (960×720px total)
- **Theme:** Cozy forest meadow — grass ground, trees/bushes as obstacles, small decorative pond
- **Tiles:** Grass (walkable), tall grass (encounter zone), trees/bushes (impassable), water (impassable)
- **Tile rendering:** Tiles are drawn programmatically using Phaser `Graphics` objects with colored rectangles — no external tileset PNG required. This removes any art-production dependency for v1.
- **Player:** Simple colored rectangle sprite with an emoji label. Moves with arrow keys or WASD.
- **Movement:** Grid-based, tile-by-tile. One keypress moves the player exactly one tile. Held keys do not auto-repeat (debounced per keypress).
- **Encounter trigger:** Each time the player steps onto a tall grass tile, there is a 1-in-5 chance of triggering a creature encounter.
- **Collection shortcut:** Press C to open the collection. On-screen button is out of scope for v1. The C key is disabled while QuizScene is active — stacking CollectionScene on top of QuizScene is not supported.

---

## Creatures

8 original plant-themed creatures. All names are German-sounding. Rarity controls spawn probability via weighted random sampling.

| Name | Theme | Appearance | Rarity | Relative Weight |
|------|-------|------------|--------|-----------------|
| Blättchen | Tiny leaf sprite | 🍃 green | Common | 40 |
| Mooskind | Mossy blob | 🟢 dark green | Common | 40 |
| Dornika | Little cactus | 🌵 spiky green | Common | 40 |
| Blumsel | Flower fairy | 🌸 pink | Uncommon | 15 |
| Rankbert | Vine snake | 🐍 vine-green | Uncommon | 15 |
| Pilzling | Mushroom sprite | 🍄 red/white | Uncommon | 15 |
| Baumgeist | Tree spirit | 🌳 brown/gold | Rare | 5 |
| Bisaknosp | Fan favorite | 🌱 blue-green | Rare | 5 |

**Spawn selection:** Weighted random sampling using the Relative Weight column (not literal percentages — these are ratios). A Common creature is 8× more likely to appear per draw than a Rare creature. Approximate per-creature probabilities: Common ≈ 22%, Uncommon ≈ 8%, Rare ≈ 3%.

**Re-encounter after failed catch:** Creatures that flee can re-trigger in the same session from any subsequent tall grass encounter with normal spawn probability. There is no cooldown or blacklist.

**Catch data stored:** name and caught timestamp, saved to localStorage.

---

## Quiz (Catching Mechanic)

When an encounter triggers, a quiz panel overlays the game (GameScene is paused).

**Format:** Multiple choice, 4 options (A/B/C/D), all text in German.

**Categories (mixed randomly):**

| Kategorie | Beispielsfrage |
|-----------|---------------|
| Mathe | „Was ist 7 × 8?" → 54 / **56** / 58 / 64 |
| Deutsch | „Welches Wort ist ein Nomen?" → laufen / schön / **Hund** / aber |
| Allgemeinwissen | „Was ist die Hauptstadt von Frankreich?" → Berlin / **Paris** / Wien / Rom |

**Difficulty:** Grade 3–4 level (age 9). Multiplication tables up to 10×10, basic grammar (word types, spelling), simple geography and nature facts.

**Question bank:** `questions.js` must contain at least **15 questions per category (45 total minimum)**. Questions are drawn without replacement within a session (page load to page close). Each category maintains its own used-ID pool. When all questions in a category are exhausted, that category's pool resets and repeats from the beginning.

**Rarity rules:**
- Common & Uncommon creatures: 1 question to catch
- Rare creatures: 2 questions shown sequentially — a wrong answer on either question ends the encounter immediately (fail-fast). The player does not advance to Q2 if Q1 is answered incorrectly.

**Feedback:**
- Correct → green flash, "Gefangen!" message, creature added to collection, QuizScene closes
- Wrong → red flash, "Tschüss!" message, creature bounces away animation, QuizScene closes

**Animations:** All feedback effects use Phaser tweens (color flashes, position tweens). No spritesheets required.

---

## Collection Screen

Opened by pressing C. GameScene pauses via scene overlay.

- Grid showing all 8 creature slots
- Caught creatures: emoji, name, "Gefangen!" badge (same word intentionally reused from catch feedback)
- Uncaught creatures: dark silhouette, "???" label
- Counter at top: e.g. "Gefangen: 3 / 8"
- Close with C or Escape to return to map (GameScene resumes)

**Persistence:** Collection saved in `localStorage` under the key `"pgame_collection"` — survives browser close/reopen. Assumes minimum browser viewport of 960×720px.

---

## Out of Scope (v1)

- Battling other trainers
- Multiple map areas
- Sound / music
- Trainer customization
- Online/multiplayer
- Spritesheet animations (Phaser tweens only)
- Mobile layout or touch support (desktop browser only)
- Win/completion screen when all 8 creatures are caught
- Save reset / new game UI
- Difficulty selection
