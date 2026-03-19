# Game Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move Pflanzenwelt into a `pflanzenwelt/` subfolder and create a root portal page with game selection cards.

**Architecture:** Root `index.html` becomes a static game portal with one card per game. Each game lives in its own subfolder with its own `index.html`. No build tools, no dependencies — pure HTML/CSS, works with `file://`.

**Tech Stack:** HTML, inline CSS, no frameworks.

---

### Task 1: Move Pflanzenwelt into its subfolder

**Files:**
- Create: `pflanzenwelt/index.html` (move from `index.html`)
- Move: `src/` → `pflanzenwelt/src/`

- [ ] **Step 1: Create the subfolder and move files**

```bash
mkdir -p /mnt/e/dev/game/pflanzenwelt
cp /mnt/e/dev/game/index.html /mnt/e/dev/game/pflanzenwelt/index.html
cp -r /mnt/e/dev/game/src /mnt/e/dev/game/pflanzenwelt/src
```

- [ ] **Step 2: Verify the moved files look correct**

```bash
ls /mnt/e/dev/game/pflanzenwelt/
ls /mnt/e/dev/game/pflanzenwelt/src/scenes/
ls /mnt/e/dev/game/pflanzenwelt/src/data/
ls /mnt/e/dev/game/pflanzenwelt/src/utils/
```

Expected: `index.html  src/`, all 5 scene files, data files (creatures.js, questions.js), and utils files present. If any directory is missing or empty, do not proceed to Step 4.

- [ ] **Step 3: Open `pflanzenwelt/index.html` in a browser and confirm the game loads**

Open `file:///mnt/e/dev/game/pflanzenwelt/index.html` — start screen should appear, game should be playable.

- [ ] **Step 4: Delete the old root files that were moved**

```bash
rm /mnt/e/dev/game/index.html
rm -rf /mnt/e/dev/game/src
```

- [ ] **Step 5: Commit**

```bash
cd /mnt/e/dev/game
git add -A
git commit -m "refactor: move Pflanzenwelt into pflanzenwelt/ subfolder"
```

---

### Task 2: Create the root portal page

**Files:**
- Create: `index.html` (new portal, replaces deleted one)

- [ ] **Step 1: Create `index.html` with portal content**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Spielesammlung</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0d1b0d;
      color: #ffffff;
      font-family: sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 24px;
    }
    h1 {
      font-size: 2.4rem;
      color: #f5e642;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    .subtitle {
      font-size: 1rem;
      color: #52b788;
      margin-bottom: 48px;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      justify-content: center;
      max-width: 960px;
      width: 100%;
    }
    .card {
      background: #1b4332;
      border: 2px solid #52b788;
      border-radius: 12px;
      width: 260px;
      padding: 28px 24px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: inherit;
      transition: background 0.15s, border-color 0.15s, transform 0.1s;
    }
    .card:hover {
      background: #2c5f2e;
      border-color: #f5e642;
      transform: translateY(-3px);
    }
    .card-emoji { font-size: 3rem; line-height: 1; }
    .card-title { font-size: 1.25rem; font-weight: bold; color: #f5e642; }
    .card-desc  { font-size: 0.9rem; color: #aed9b8; text-align: center; }
    .card-btn {
      margin-top: 8px;
      background: #2c5f2e;
      border: 1px solid #52b788;
      border-radius: 6px;
      color: #ffffff;
      font-size: 0.95rem;
      padding: 7px 22px;
      cursor: pointer;
    }
    .card:hover .card-btn {
      background: #3d7a25;
      border-color: #f5e642;
    }
  </style>
</head>
<body>
  <h1>🎮 Spielesammlung</h1>
  <p class="subtitle">Wähle ein Spiel!</p>

  <div class="grid">

    <a class="card" href="./pflanzenwelt/">
      <div class="card-emoji">🌿</div>
      <div class="card-title">Pflanzenwelt</div>
      <div class="card-desc">Fange alle 8 Pflanzen-Kreaturen!</div>
      <div class="card-btn">Spielen →</div>
    </a>

    <!-- add more cards here -->

  </div>
</body>
</html>
```

- [ ] **Step 2: Open `index.html` in a browser and verify**

Open `file:///mnt/e/dev/game/index.html` — should show the portal with the Pflanzenwelt card. Clicking "Spielen →" should navigate to the game.

- [ ] **Step 3: Commit**

```bash
cd /mnt/e/dev/game
git add index.html
git commit -m "feat: add game portal with Pflanzenwelt card"
```
