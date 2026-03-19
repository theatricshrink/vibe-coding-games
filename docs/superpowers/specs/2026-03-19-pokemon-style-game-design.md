# Pokemon-Style Browser Game — Design Spec

**Date:** 2026-03-19
**Audience:** 9-year-old German-speaking player
**Platform:** Browser (no install)

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
    └── tileset.png             # Grass/tree tiles for the map
```

**Tech stack:**
- Phaser.js loaded via CDN — no npm, no build step
- localStorage for save data
- Pure JS, no framework

---

## Map & Player

- **Size:** 20×15 tile grid, 48px per tile (960×720px total)
- **Theme:** Cozy forest meadow — grass ground, trees/bushes as obstacles, small decorative pond
- **Tiles:** Grass (walkable), tall grass (encounter zone), trees/bushes (impassable), water (impassable)
- **Player:** Simple colored sprite, moves with arrow keys or WASD
- **Encounter trigger:** Walking into a tall grass tile has a 1-in-5 chance per step of triggering a creature encounter
- **Collection shortcut:** Press C or tap an on-screen button to open the collection

---

## Creatures

8 original plant-themed creatures. All names are German-sounding. Rarity controls spawn probability.

| Name | Theme | Appearance | Rarity |
|------|-------|------------|--------|
| Blättchen | Tiny leaf sprite | 🍃 green | Common |
| Mooskind | Mossy blob | 🟢 dark green | Common |
| Dornika | Little cactus | 🌵 spiky green | Common |
| Blumsel | Flower fairy | 🌸 pink | Uncommon |
| Rankbert | Vine snake | 🐍 vine-green | Uncommon |
| Pilzling | Mushroom sprite | 🍄 red/white | Uncommon |
| Baumgeist | Tree spirit | 🌳 brown/gold | Rare |
| Bisaknosp | Fan favorite | 🌱 blue-green | Rare |

**Spawn weights:** Common = 40% each slot, Uncommon = 15%, Rare = 5%
**Catch data stored:** name, caught timestamp, displayed in collection

---

## Quiz (Catching Mechanic)

When an encounter triggers, a quiz panel overlays the game.

**Format:** Multiple choice, 4 options (A/B/C/D), all text in German.

**Categories (mixed randomly):**

| Kategorie | Beispielsfrage |
|-----------|---------------|
| Mathe | „Was ist 7 × 8?" → 54 / **56** / 58 / 64 |
| Deutsch | „Welches Wort ist ein Nomen?" → laufen / schön / **Hund** / aber |
| Allgemeinwissen | „Was ist die Hauptstadt von Frankreich?" → Berlin / **Paris** / Wien / Rom |

**Difficulty:** Grade 3–4 level (age 9). Multiplication tables up to 10×10, basic grammar (word types, spelling), simple geography and nature facts.

**Rarity rules:**
- Common & Uncommon creatures: 1 question to catch
- Rare creatures: 2 questions — both must be correct

**Feedback:**
- Correct → green flash, "Gefangen!" message, creature added to collection
- Wrong → red flash, "Tschüss!" message, creature bounces away (can reappear later)

---

## Collection Screen

Opened by pressing C or tapping the on-screen button.

- Grid showing all 8 creature slots
- Caught creatures: emoji, name, "Gefangen!" badge
- Uncaught creatures: dark silhouette, "???" label
- Counter at top: e.g. "Gefangen: 3 / 8"
- Close with C or Escape to return to map

**Persistence:** Collection saved in `localStorage` — survives browser close/reopen.

---

## Out of Scope (v1)

- Battling other trainers
- Multiple map areas
- Sound / music
- Trainer customization
- Online/multiplayer
