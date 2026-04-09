# Geisterjagd Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Qix-style ghost-trapping game for Wilma's Game Collection using Phaser 3.

**Architecture:** Grid-based (16px cells, 60×35), pure-logic utilities (BoardGrid, GhostAI) tested with Node.js, Phaser scenes for rendering/input. No bundler — vanilla JS loaded via script tags.

**Tech Stack:** Phaser 3.60 (CDN), vanilla JS, Node.js for tests, WebAudio synthesis for sound.

---

## File Map

| File | Responsibility |
|---|---|
| `geisterjagd/index.html` | Entry point, script loading order |
| `geisterjagd/manifest.json` | PWA manifest |
| `geisterjagd/service-worker.js` | Offline cache |
| `geisterjagd/src/main.js` | Phaser config, game init |
| `geisterjagd/src/i18n/lang.js` | LANG global (copy from irrlichter) |
| `geisterjagd/src/i18n/strings.js` | All DE/EN strings + `t()` helper |
| `geisterjagd/src/utils/BoardGrid.js` | Grid state, flood fill, area scoring |
| `geisterjagd/src/utils/GhostAI.js` | Ghost creation + movement step logic |
| `geisterjagd/src/utils/Audio.js` | WebAudio synthesis for all 6 sounds |
| `geisterjagd/src/scenes/BootScene.js` | → MenuScene |
| `geisterjagd/src/scenes/MenuScene.js` | Title + difficulty select |
| `geisterjagd/src/scenes/GameScene.js` | Main game loop |
| `geisterjagd/src/scenes/GameOverScene.js` | Score + replay |
| `geisterjagd/tests/assert.js` | Minimal test helper |
| `geisterjagd/tests/boardgrid.test.js` | Unit tests for BoardGrid |
| `geisterjagd/tests/ghostai.test.js` | Unit tests for GhostAI |

---

## Task 1: Scaffold

**Files:**
- Create: `geisterjagd/index.html`
- Create: `geisterjagd/manifest.json`
- Create: `geisterjagd/service-worker.js`
- Create: `geisterjagd/src/main.js`
- Create: `geisterjagd/src/i18n/lang.js`

- [ ] **Step 1: Create `geisterjagd/index.html`**

```html
<!DOCTYPE html>
<html lang="de" id="html-root">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Geisterjagd</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000000; }
    #game-container {
      position: fixed;
      top:    env(safe-area-inset-top,    0px);
      right:  env(safe-area-inset-right,  0px);
      bottom: env(safe-area-inset-bottom, 0px);
      left:   env(safe-area-inset-left,   0px);
    }
    #back-btn {
      position: fixed; top: 10px; left: 12px; z-index: 100;
      color: #52b788; font-family: sans-serif; font-size: 13px;
      text-decoration: none; opacity: 0.7;
    }
    #back-btn:hover { opacity: 1; color: #f5e642; }
  </style>
</head>
<body>
  <div id="game-container"></div>
  <a id="back-btn" href="../index.html"></a>

  <script src="src/i18n/lang.js"></script>
  <script>
    document.getElementById('html-root').lang = LANG;
    document.getElementById('back-btn').textContent = LANG === 'en' ? '← Overview' : '← Übersicht';
  </script>

  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
  <script src="src/i18n/strings.js"></script>
  <script src="src/utils/BoardGrid.js"></script>
  <script src="src/utils/GhostAI.js"></script>
  <script src="src/utils/Audio.js"></script>
  <script src="src/scenes/BootScene.js"></script>
  <script src="src/scenes/MenuScene.js"></script>
  <script src="src/scenes/GameScene.js"></script>
  <script src="src/scenes/GameOverScene.js"></script>
  <script src="src/main.js"></script>

  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js');
    }
    function unlockAudio() {
      if (typeof game !== 'undefined' && game.sound && game.sound.context &&
          game.sound.context.state === 'suspended') {
        game.sound.context.resume();
      }
      document.removeEventListener('pointerdown', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    }
    document.addEventListener('pointerdown', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
  </script>
</body>
</html>
```

- [ ] **Step 2: Create `geisterjagd/manifest.json`**

```json
{
  "name": "Geisterjagd",
  "short_name": "Geisterjagd",
  "description": "Trap the ghosts — but only matching colors score big!",
  "start_url": "/geisterjagd/",
  "display": "standalone",
  "orientation": "landscape",
  "background_color": "#000000",
  "theme_color": "#cc44ff",
  "icons": [
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect width='192' height='192' fill='%23000000'/><circle cx='96' cy='96' r='40' fill='%23cc44ff' opacity='0.9'/><circle cx='80' cy='88' r='8' fill='%23ffffff'/><circle cx='112' cy='88' r='8' fill='%23ffffff'/></svg>",
      "sizes": "192x192",
      "type": "image/svg+xml"
    }
  ]
}
```

- [ ] **Step 3: Create `geisterjagd/service-worker.js`** (placeholder — updated in Task 18)

```js
var CACHE_NAME = 'geisterjagd-v1';
var CACHE_URLS = [
  '/geisterjagd/index.html',
  'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(CACHE_URLS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.mode === 'navigate') return;
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached && !cached.redirected) return cached;
      return fetch(e.request);
    })
  );
});
```

- [ ] **Step 4: Create `geisterjagd/src/main.js`**

```js
var config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 560
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene]
};

var game = new Phaser.Game(config);
```

- [ ] **Step 5: Create `geisterjagd/src/i18n/lang.js`**

```js
// geisterjagd/src/i18n/lang.js — must load first
var LANG = (localStorage.getItem('pgame_lang') === 'en') ? 'en' : 'de';
```

- [ ] **Step 6: Commit**

```bash
git add geisterjagd/
git commit -m "feat(geisterjagd): scaffold project structure"
```

---

## Task 2: Strings

**Files:**
- Create: `geisterjagd/src/i18n/strings.js`

- [ ] **Step 1: Create `geisterjagd/src/i18n/strings.js`**

```js
var STRINGS = {
  de: {
    title:         'Geisterjagd',
    subtitle:      'Fange die Geister ein!',
    easy:          'LEICHT',
    hard:          'SCHWER',
    easyDesc:      '3 Leben',
    hardDesc:      'Kein Fehler',
    start:         'SPIELEN',
    score:         'Punkte',
    level:         'Level',
    lives:         'Leben',
    levelComplete: 'Level geschafft!',
    gameOver:      'Game Over',
    finalScore:    'Punkte',
    bestScore:     'Bestleistung',
    playAgain:     'NOCHMAL',
    toMenu:        'MENÜ',
    backLabel:     '← Übersicht',
    bonus:         'BONUS!',
    fail:          'Gemischt!'
  },
  en: {
    title:         'Ghost Hunt',
    subtitle:      'Trap the ghosts!',
    easy:          'EASY',
    hard:          'HARD',
    easyDesc:      '3 lives',
    hardDesc:      'No mistakes',
    start:         'PLAY',
    score:         'Score',
    level:         'Level',
    lives:         'Lives',
    levelComplete: 'Level clear!',
    gameOver:      'Game Over',
    finalScore:    'Score',
    bestScore:     'Best',
    playAgain:     'PLAY AGAIN',
    toMenu:        'MENU',
    backLabel:     '← Overview',
    bonus:         'BONUS!',
    fail:          'Mixed!'
  }
};

function t(key) {
  return (STRINGS[LANG] && STRINGS[LANG][key]) || STRINGS['en'][key] || key;
}
```

- [ ] **Step 2: Commit**

```bash
git add geisterjagd/src/i18n/strings.js
git commit -m "feat(geisterjagd): add i18n strings"
```

---

## Task 3: BoardGrid tests

**Files:**
- Create: `geisterjagd/tests/assert.js`
- Create: `geisterjagd/tests/boardgrid.test.js`

- [ ] **Step 1: Create `geisterjagd/tests/assert.js`**

```js
module.exports = function assert(condition, message) {
  if (!condition) throw new Error('FAIL: ' + message);
  console.log('PASS: ' + message);
};
```

- [ ] **Step 2: Create `geisterjagd/tests/boardgrid.test.js`**

```js
var assert = require('./assert');
var fs = require('fs');
var path = require('path');

// Load BoardGrid into global scope
var src = fs.readFileSync(path.join(__dirname, '../src/utils/BoardGrid.js'), 'utf8');
eval(src);

// --- Init ---
var g = new BoardGrid(10, 8);
assert(g.cols === 10, 'BoardGrid cols = 10');
assert(g.rows === 8,  'BoardGrid rows = 8');

// Border cells are CLAIMED
assert(g.get(0, 0) === CELL_CLAIMED, 'top-left corner is claimed');
assert(g.get(9, 7) === CELL_CLAIMED, 'bottom-right corner is claimed');
assert(g.get(5, 0) === CELL_CLAIMED, 'top border cell is claimed');
assert(g.get(0, 4) === CELL_CLAIMED, 'left border cell is claimed');

// Interior is UNCLAIMED
assert(g.get(1, 1) === CELL_UNCLAIMED, 'interior cell starts unclaimed');
assert(g.get(5, 4) === CELL_UNCLAIMED, 'center cell starts unclaimed');

// isClaimed
assert(g.isClaimed(0, 0) === true,  'isClaimed border = true');
assert(g.isClaimed(1, 1) === false, 'isClaimed interior = false');

// isInBounds
assert(g.isInBounds(0, 0)  === true,  'isInBounds (0,0) = true');
assert(g.isInBounds(9, 7)  === true,  'isInBounds (9,7) = true');
assert(g.isInBounds(-1, 0) === false, 'isInBounds (-1,0) = false');
assert(g.isInBounds(10, 0) === false, 'isInBounds (10,0) = false');

// startDrawing / addDrawing
g.startDrawing(1, 1);
assert(g.get(1, 1) === CELL_DRAWING, 'startDrawing sets DRAWING');
assert(g.drawingCells.length === 1, 'drawingCells has 1 entry');

g.addDrawing(2, 1);
g.addDrawing(3, 1);
assert(g.drawingCells.length === 3, 'drawingCells has 3 entries after addDrawing');

// --- closeArea: no ghosts ---
// Setup a small 6×5 grid, draw a line that encloses a 2×1 region
var g2 = new BoardGrid(6, 5);
// Draw a simple closed shape: (1,1)→(1,2)→(2,2)→(2,1) — connects back to border via (1,1) which is next to border col 0
// Actually: start on border (0,2), draw into interior, close back to border
// path: (1,2) (2,2) (2,1) — then (2,1) is adjacent to (2,0) which is border → close
g2.startDrawing(1, 2);
g2.addDrawing(2, 2);
g2.addDrawing(2, 1);
// (2,1) is adjacent to border row 0 at (2,0)? No, (2,1) is not border.
// closeArea is called when player moves to a claimed/border cell.
// Let's just set it up and call closeArea:
var result2 = g2.closeArea([]);
assert(Array.isArray(result2.regions), 'closeArea returns regions array');
// 3 drawing cells became claimed, no ghosts → some enclosed cells may exist
assert(g2.get(1, 2) === CELL_CLAIMED, 'drawing cells become claimed after closeArea');
assert(g2.get(2, 2) === CELL_CLAIMED, 'drawing cells become claimed after closeArea');

// --- closeArea: bonus — 2 same-color ghosts enclosed ---
var g3 = new BoardGrid(10, 8);
// Draw a line from border to border enclosing column 1, rows 1-6
// Left wall is col 0 (claimed), right of our line (col 2+) is open
// Draw path: (1,1),(1,2),(1,3),(1,4),(1,5),(1,6) — connects top border (row 0) to bottom border (row 7)
g3.startDrawing(1, 1);
g3.addDrawing(1, 2);
g3.addDrawing(1, 3);
g3.addDrawing(1, 4);
g3.addDrawing(1, 5);
g3.addDrawing(1, 6);
// Ghosts at (col 0 is border, so interior left of line would be... 
// Actually col 1 IS the drawing line. Left of it is col 0 (border/claimed).
// There is no enclosed region to the left. The region to the right is the open area.
// Let's use a different setup: draw across the top interior
var g4 = new BoardGrid(8, 6);
// Enclose a 2×2 box: draw (1,1)(2,1)(3,1)(3,2)(3,3)(2,3)(1,3)(1,2) — forms a loop touching border
// Simpler: draw from (0,2)[border] through (1,2)(2,2)(3,2)(4,2)(5,2)(6,2) to (7,2)[border]
// This splits the board horizontally. Top half rows 1 = enclosed strip.
g4.startDrawing(1, 2);
g4.addDrawing(2, 2);
g4.addDrawing(3, 2);
g4.addDrawing(4, 2);
g4.addDrawing(5, 2);
g4.addDrawing(6, 2);
// Two red ghosts in top strip (row 1)
var ghosts4 = [{col:2, row:1, color:'red'}, {col:4, row:1, color:'red'}];
var result4 = g4.closeArea(ghosts4);
assert(result4.regions.length >= 1, 'closeArea finds at least 1 enclosed region');
var bonusRegion = result4.regions.find(function(r) { return r.bonusType === 'bonus'; });
assert(bonusRegion !== undefined, 'same-color 2+ ghosts → bonusType = bonus');
assert(bonusRegion.score === bonusRegion.cells.length * 3, 'bonus score = cells × 3');

// --- closeArea: fail — mixed colors ---
var g5 = new BoardGrid(8, 6);
g5.startDrawing(1, 2);
g5.addDrawing(2, 2);
g5.addDrawing(3, 2);
g5.addDrawing(4, 2);
g5.addDrawing(5, 2);
g5.addDrawing(6, 2);
var ghosts5 = [{col:2, row:1, color:'red'}, {col:4, row:1, color:'blue'}];
var result5 = g5.closeArea(ghosts5);
var failRegion = result5.regions.find(function(r) { return r.bonusType === 'fail'; });
assert(failRegion !== undefined, 'mixed colors → bonusType = fail');
assert(failRegion.score === failRegion.cells.length * 1, 'fail score = cells × 1');

// --- closeArea: neutral — 1 ghost ---
var g6 = new BoardGrid(8, 6);
g6.startDrawing(1, 2);
g6.addDrawing(2, 2);
g6.addDrawing(3, 2);
g6.addDrawing(4, 2);
g6.addDrawing(5, 2);
g6.addDrawing(6, 2);
var ghosts6 = [{col:2, row:1, color:'red'}];
var result6 = g6.closeArea(ghosts6);
var neutralRegion = result6.regions.find(function(r) { return r.bonusType === 'none'; });
assert(neutralRegion !== undefined, '1 ghost → bonusType = none');

// --- clearDrawing ---
var g7 = new BoardGrid(6, 5);
g7.startDrawing(1, 1);
g7.addDrawing(2, 1);
g7.clearDrawing();
assert(g7.get(1, 1) === CELL_UNCLAIMED, 'clearDrawing resets DRAWING → UNCLAIMED');
assert(g7.get(2, 1) === CELL_UNCLAIMED, 'clearDrawing resets all drawing cells');
assert(g7.drawingCells.length === 0, 'drawingCells empty after clearDrawing');

console.log('\nAll BoardGrid tests passed!');
```

- [ ] **Step 3: Run tests (expect failure — BoardGrid not yet implemented)**

```bash
cd /home/dev/vibe-coding-games
node geisterjagd/tests/boardgrid.test.js 2>&1 | head -5
```

Expected: error like `BoardGrid is not defined`

- [ ] **Step 4: Commit**

```bash
git add geisterjagd/tests/
git commit -m "test(geisterjagd): add BoardGrid tests"
```

---

## Task 4: BoardGrid implementation

**Files:**
- Create: `geisterjagd/src/utils/BoardGrid.js`

- [ ] **Step 1: Create `geisterjagd/src/utils/BoardGrid.js`**

```js
var CELL_UNCLAIMED = 0;
var CELL_CLAIMED   = 1;
var CELL_DRAWING   = 2;

function BoardGrid(cols, rows) {
  this.cols = cols;
  this.rows = rows;
  this.cells = new Array(cols * rows).fill(CELL_UNCLAIMED);
  this.drawingCells = [];
  // Mark border as claimed
  for (var c = 0; c < cols; c++) {
    this._set(c, 0,        CELL_CLAIMED);
    this._set(c, rows - 1, CELL_CLAIMED);
  }
  for (var r = 1; r < rows - 1; r++) {
    this._set(0,        r, CELL_CLAIMED);
    this._set(cols - 1, r, CELL_CLAIMED);
  }
}

BoardGrid.prototype._idx = function(c, r) { return r * this.cols + c; };
BoardGrid.prototype.get  = function(c, r) { return this.cells[this._idx(c, r)]; };
BoardGrid.prototype._set = function(c, r, state) { this.cells[this._idx(c, r)] = state; };

BoardGrid.prototype.isClaimed  = function(c, r) { return this.get(c, r) === CELL_CLAIMED; };
BoardGrid.prototype.isDrawing  = function(c, r) { return this.get(c, r) === CELL_DRAWING; };
BoardGrid.prototype.isInBounds = function(c, r) {
  return c >= 0 && r >= 0 && c < this.cols && r < this.rows;
};

BoardGrid.prototype.startDrawing = function(c, r) {
  this._set(c, r, CELL_DRAWING);
  this.drawingCells = [{col: c, row: r}];
};

BoardGrid.prototype.addDrawing = function(c, r) {
  this._set(c, r, CELL_DRAWING);
  this.drawingCells.push({col: c, row: r});
};

BoardGrid.prototype.clearDrawing = function() {
  for (var i = 0; i < this.drawingCells.length; i++) {
    this._set(this.drawingCells[i].col, this.drawingCells[i].row, CELL_UNCLAIMED);
  }
  this.drawingCells = [];
};

// Flood fill from (startC, startR), only visiting cells that match targetState.
// Returns array of {col, row}.
BoardGrid.prototype._fill = function(startC, startR, targetState) {
  if (!this.isInBounds(startC, startR)) return [];
  if (this.get(startC, startR) !== targetState) return [];
  var visited = new Array(this.cols * this.rows).fill(false);
  var queue = [{col: startC, row: startR}];
  var result = [];
  visited[this._idx(startC, startR)] = true;
  var dirs = [{dc:1,dr:0},{dc:-1,dr:0},{dc:0,dr:1},{dc:0,dr:-1}];
  while (queue.length > 0) {
    var cur = queue.shift();
    result.push(cur);
    for (var d = 0; d < dirs.length; d++) {
      var nc = cur.col + dirs[d].dc;
      var nr = cur.row + dirs[d].dr;
      if (this.isInBounds(nc, nr) && !visited[this._idx(nc, nr)] && this.get(nc, nr) === targetState) {
        visited[this._idx(nc, nr)] = true;
        queue.push({col: nc, row: nr});
      }
    }
  }
  return result;
};

// Close the current drawing line.
// ghostPositions: [{col, row, color}]
// Returns { regions: [{cells, ghosts, bonusType, score, color}] }
BoardGrid.prototype.closeArea = function(ghostPositions) {
  // 1. Convert all drawing cells to claimed
  for (var i = 0; i < this.drawingCells.length; i++) {
    this._set(this.drawingCells[i].col, this.drawingCells[i].row, CELL_CLAIMED);
  }
  this.drawingCells = [];

  // 2. Find connected components of unclaimed cells using flood fill.
  //    Components NOT touching the border are enclosed.
  var visited = new Array(this.cols * this.rows).fill(false);
  // Mark all border-adjacent unclaimed cells as "open" (connected to border)
  var regions = [];

  for (var c = 0; c < this.cols; c++) {
    for (var r = 0; r < this.rows; r++) {
      if (this.get(c, r) === CELL_UNCLAIMED && !visited[this._idx(c, r)]) {
        var component = this._fillVisited(c, r, visited);
        // Check if any cell in component touches the actual border (col 0, col last, row 0, row last)
        var touchesBorder = false;
        for (var j = 0; j < component.length; j++) {
          var cell = component[j];
          if (cell.col === 0 || cell.col === this.cols - 1 ||
              cell.row === 0 || cell.row === this.rows - 1) {
            touchesBorder = true;
            break;
          }
        }
        if (!touchesBorder) {
          regions.push(component);
        }
      }
    }
  }

  // 3. For each enclosed region, find trapped ghosts, score it, claim it
  var result = { regions: [] };
  for (var ri = 0; ri < regions.length; ri++) {
    var cells = regions[ri];
    var cellSet = {};
    for (var ci = 0; ci < cells.length; ci++) {
      cellSet[cells[ci].col + ',' + cells[ci].row] = true;
    }
    // Claim these cells
    for (var ci2 = 0; ci2 < cells.length; ci2++) {
      this._set(cells[ci2].col, cells[ci2].row, CELL_CLAIMED);
    }
    // Find ghosts inside
    var trapped = [];
    for (var gi = 0; gi < ghostPositions.length; gi++) {
      var gp = ghostPositions[gi];
      if (cellSet[gp.col + ',' + gp.row]) {
        trapped.push(gp);
      }
    }
    // Determine bonus type
    var bonusType = 'none';
    var bonusColor = null;
    var score = cells.length;
    if (trapped.length >= 2) {
      var allSame = true;
      var firstColor = trapped[0].color;
      for (var ti = 1; ti < trapped.length; ti++) {
        if (trapped[ti].color !== firstColor) { allSame = false; break; }
      }
      if (allSame) {
        bonusType = 'bonus';
        bonusColor = firstColor;
        score = cells.length * 3;
      } else {
        bonusType = 'fail';
        score = cells.length;
      }
    }
    result.regions.push({ cells: cells, ghosts: trapped, bonusType: bonusType, color: bonusColor, score: score });
  }
  return result;
};

// Internal fill that marks cells in a shared visited array
BoardGrid.prototype._fillVisited = function(startC, startR, visited) {
  var queue = [{col: startC, row: startR}];
  var result = [];
  visited[this._idx(startC, startR)] = true;
  var dirs = [{dc:1,dr:0},{dc:-1,dr:0},{dc:0,dr:1},{dc:0,dr:-1}];
  while (queue.length > 0) {
    var cur = queue.shift();
    result.push(cur);
    for (var d = 0; d < dirs.length; d++) {
      var nc = cur.col + dirs[d].dc;
      var nr = cur.row + dirs[d].dr;
      if (this.isInBounds(nc, nr) && !visited[this._idx(nc, nr)] &&
          this.get(nc, nr) === CELL_UNCLAIMED) {
        visited[this._idx(nc, nr)] = true;
        queue.push({col: nc, row: nr});
      }
    }
  }
  return result;
};
```

- [ ] **Step 2: Run tests**

```bash
cd /home/dev/vibe-coding-games
node geisterjagd/tests/boardgrid.test.js
```

Expected: All PASS lines, then `All BoardGrid tests passed!`

- [ ] **Step 3: Commit**

```bash
git add geisterjagd/src/utils/BoardGrid.js
git commit -m "feat(geisterjagd): implement BoardGrid utility"
```

---

## Task 5: GhostAI tests

**Files:**
- Create: `geisterjagd/tests/ghostai.test.js`

- [ ] **Step 1: Create `geisterjagd/tests/ghostai.test.js`**

```js
var assert = require('./assert');
var fs = require('fs');
var path = require('path');

// Load BoardGrid first (GhostAI depends on CELL_* constants)
eval(fs.readFileSync(path.join(__dirname, '../src/utils/BoardGrid.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../src/utils/GhostAI.js'), 'utf8'));

// --- Creation ---
var g = new BoardGrid(10, 8);
var ghost = new GhostAI(5, 4, 'red');
assert(ghost.col === 5,     'GhostAI col set');
assert(ghost.row === 4,     'GhostAI row set');
assert(ghost.color === 'red', 'GhostAI color set');
assert(ghost.dx !== undefined && ghost.dy !== undefined, 'GhostAI has direction');
assert(Math.abs(ghost.dx) + Math.abs(ghost.dy) === 1, 'Initial direction is axis-aligned unit');

// --- Step: normal move ---
// Place ghost in open interior, point it right (dx=1, dy=0)
var g2 = new BoardGrid(10, 8);
var ghost2 = new GhostAI(3, 3, 'blue');
ghost2.dx = 1; ghost2.dy = 0;
var result2 = ghost2.step(g2);
assert(ghost2.col === 4, 'Ghost moves right');
assert(ghost2.row === 3, 'Ghost stays on same row');
assert(result2.hitDrawing === false, 'No drawing cell hit');

// --- Step: blocked by claimed cell, picks new direction ---
var g3 = new BoardGrid(10, 8);
var ghost3 = new GhostAI(5, 3, 'green');
ghost3.dx = 1; ghost3.dy = 0;
// Block right side by marking (6,3) as claimed
g3._set(6, 3, CELL_CLAIMED);
var prevCol = ghost3.col;
ghost3.step(g3);
// Ghost should not have moved to (6,3)
assert(ghost3.col !== 6 || ghost3.row !== 3, 'Ghost did not enter claimed cell');

// --- Step: ghost touches drawing cell → hitDrawing = true ---
var g4 = new BoardGrid(10, 8);
var ghost4 = new GhostAI(3, 3, 'red');
ghost4.dx = 1; ghost4.dy = 0;
g4._set(4, 3, CELL_DRAWING);
var result4 = ghost4.step(g4);
assert(result4.hitDrawing === true, 'Ghost touching drawing cell returns hitDrawing=true');

console.log('\nAll GhostAI tests passed!');
```

- [ ] **Step 2: Run tests (expect failure)**

```bash
node geisterjagd/tests/ghostai.test.js 2>&1 | head -5
```

Expected: `GhostAI is not defined`

- [ ] **Step 3: Commit**

```bash
git add geisterjagd/tests/ghostai.test.js
git commit -m "test(geisterjagd): add GhostAI tests"
```

---

## Task 6: GhostAI implementation

**Files:**
- Create: `geisterjagd/src/utils/GhostAI.js`

- [ ] **Step 1: Create `geisterjagd/src/utils/GhostAI.js`**

```js
var GHOST_DIRS = [
  {dc:  1, dr:  0},
  {dc: -1, dr:  0},
  {dc:  0, dr:  1},
  {dc:  0, dr: -1}
];

function GhostAI(col, row, color) {
  this.col   = col;
  this.row   = row;
  this.color = color;
  this.dx    = 0;
  this.dy    = 0;
  this._pickDir();
}

GhostAI.prototype._pickDir = function() {
  var d = GHOST_DIRS[Math.floor(Math.random() * 4)];
  this.dx = d.dc;
  this.dy = d.dr;
};

// Move one step on the board.
// Returns { hitDrawing: bool }
GhostAI.prototype.step = function(board) {
  var nc = this.col + this.dx;
  var nr = this.row + this.dy;

  // Check if next cell is drawing — death condition
  if (board.isInBounds(nc, nr) && board.get(nc, nr) === CELL_DRAWING) {
    this.col = nc;
    this.row = nr;
    return { hitDrawing: true };
  }

  // If blocked (out of bounds or claimed), try other directions
  if (!board.isInBounds(nc, nr) || board.get(nc, nr) === CELL_CLAIMED) {
    // Shuffle directions and pick first unblocked one
    var dirs = GHOST_DIRS.slice().sort(function() { return Math.random() - 0.5; });
    var moved = false;
    for (var i = 0; i < dirs.length; i++) {
      var tc = this.col + dirs[i].dc;
      var tr = this.row + dirs[i].dr;
      if (board.isInBounds(tc, tr) && board.get(tc, tr) === CELL_UNCLAIMED) {
        this.dx = dirs[i].dc;
        this.dy = dirs[i].dr;
        this.col = tc;
        this.row = tr;
        moved = true;
        break;
      }
    }
    // If all directions blocked (fully enclosed), stay put
    return { hitDrawing: false };
  }

  this.col = nc;
  this.row = nr;
  return { hitDrawing: false };
};
```

- [ ] **Step 2: Run tests**

```bash
node geisterjagd/tests/ghostai.test.js
```

Expected: All PASS, `All GhostAI tests passed!`

- [ ] **Step 3: Commit**

```bash
git add geisterjagd/src/utils/GhostAI.js
git commit -m "feat(geisterjagd): implement GhostAI utility"
```

---

## Task 7: Audio utility

**Files:**
- Create: `geisterjagd/src/utils/Audio.js`

- [ ] **Step 1: Create `geisterjagd/src/utils/Audio.js`**

```js
var Audio = {
  ctx: null,

  init: function() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  _tone: function(freq, startTime, duration, type, vol, fadeOut) {
    var ctx = this.ctx;
    if (!ctx) return;
    var osc  = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(vol || 0.3, startTime);
    if (fadeOut) gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration);
  },

  // Faint blip on player movement
  playTick: function() {
    this.init();
    this._tone(220, this.ctx.currentTime, 0.04, 'square', 0.05, true);
  },

  // Short success chime on neutral area close
  playClose: function() {
    this.init();
    var t = this.ctx.currentTime;
    this._tone(440, t,        0.1,  'sine', 0.2, true);
    this._tone(660, t + 0.08, 0.12, 'sine', 0.2, true);
  },

  // Ascending sparkle arpeggio on bonus
  playBonus: function() {
    this.init();
    var t = this.ctx.currentTime;
    var notes = [523, 659, 784, 1047];
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], t + i * 0.07, 0.12, 'sine', 0.25, true);
    }
  },

  // Descending wah-wah on fail (mixed colors)
  playFail: function() {
    this.init();
    var t = this.ctx.currentTime;
    var notes = [330, 262, 196, 147];
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], t + i * 0.1, 0.15, 'sawtooth', 0.2, true);
    }
  },

  // Low thud + descending sting on death
  playDeath: function() {
    this.init();
    var t   = this.ctx.currentTime;
    var ctx = this.ctx;
    // Thud
    this._tone(80,  t,       0.15, 'sine',     0.4, true);
    // Descending sting
    var osc  = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.6);
    gain.gain.setValueAtTime(0.25, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.start(t + 0.1);
    osc.stop(t + 0.65);
  },

  // Short upbeat fanfare on level complete
  playLevelComplete: function() {
    this.init();
    var t = this.ctx.currentTime;
    var notes = [523, 659, 784, 659, 1047];
    var durs  = [0.1, 0.1, 0.1, 0.05, 0.3];
    var offset = 0;
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], t + offset, durs[i], 'sine', 0.3, true);
      offset += durs[i] + 0.02;
    }
  }
};
```

- [ ] **Step 2: Commit**

```bash
git add geisterjagd/src/utils/Audio.js
git commit -m "feat(geisterjagd): add WebAudio synthesis utility"
```

---

## Task 8: BootScene + MenuScene

**Files:**
- Create: `geisterjagd/src/scenes/BootScene.js`
- Create: `geisterjagd/src/scenes/MenuScene.js`

- [ ] **Step 1: Create `geisterjagd/src/scenes/BootScene.js`**

```js
var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'BootScene' }); },
  create: function() { this.scene.start('MenuScene'); }
});
```

- [ ] **Step 2: Create `geisterjagd/src/scenes/MenuScene.js`**

```js
var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'MenuScene' }); },

  create: function() {
    var W = 960, H = 560, cx = W / 2;

    this.add.rectangle(cx, H / 2, W, H, 0x000000);

    // Subtle grid
    var grid = this.add.graphics();
    grid.lineStyle(1, 0x0a0a20, 1);
    for (var x = 0; x < W; x += 40) grid.lineBetween(x, 0, x, H);
    for (var y = 0; y < H; y += 40) grid.lineBetween(0, y, W, y);

    // Title
    this.add.text(cx, 70, t('title'), {
      fontFamily: 'monospace', fontSize: '60px', color: '#cc44ff',
      stroke: '#220033', strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(cx, 140, t('subtitle'), {
      fontFamily: 'monospace', fontSize: '20px', color: '#996699'
    }).setOrigin(0.5);

    // Animated ghost decoration
    var ghost = this.add.circle(cx, 210, 18, 0xcc44ff, 0.9);
    var glow  = this.add.circle(cx, 210, 30, 0xcc44ff, 0.25);
    this.tweens.add({ targets: glow, scaleX: 2.2, scaleY: 2.2, alpha: 0, duration: 1400, repeat: -1, ease: 'Sine.out' });
    this.tweens.add({ targets: ghost, y: 205, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    // Difficulty heading
    this.add.text(cx, 265, LANG === 'de' ? 'Schwierigkeit:' : 'Difficulty:', {
      fontFamily: 'monospace', fontSize: '18px', color: '#888899'
    }).setOrigin(0.5);

    // Easy button
    var self = this;
    this._selectedDifficulty = 'easy';
    var easyBg = this._makeBtn(cx - 110, 320, t('easy') + '\n' + t('easyDesc'), 0x003322, 0x44ff88, function() {
      self._selectedDifficulty = 'easy';
      easyBg.setStrokeStyle(3, 0x44ff88);
      hardBg.setStrokeStyle(2, 0xff4444);
    });

    // Hard button
    var hardBg = this._makeBtn(cx + 110, 320, t('hard') + '\n' + t('hardDesc'), 0x220000, 0xff4444, function() {
      self._selectedDifficulty = 'hard';
      hardBg.setStrokeStyle(3, 0xff4444);
      easyBg.setStrokeStyle(2, 0x44ff88);
    });

    // Start button
    var startBg = this.add.rectangle(cx, 430, 220, 52, 0x1a001a)
      .setStrokeStyle(2, 0xcc44ff)
      .setInteractive({ useHandCursor: true });
    var startText = this.add.text(cx, 430, t('start'), {
      fontFamily: 'monospace', fontSize: '28px', color: '#cc44ff', fontStyle: 'bold'
    }).setOrigin(0.5);

    startBg.on('pointerover', function() { startBg.setFillColor(0x330044); });
    startBg.on('pointerout',  function() { startBg.setFillColor(0x1a001a); });
    startBg.on('pointerup',   function() { self._startGame(); });

    this.input.keyboard.once('keydown-ENTER', function() { self._startGame(); });
    this.input.keyboard.once('keydown-SPACE', function() { self._startGame(); });

    this.tweens.add({ targets: startText, alpha: 0.4, duration: 900, yoyo: true, repeat: -1 });
  },

  _makeBtn: function(x, y, label, bgColor, borderColor, cb) {
    var bg = this.add.rectangle(x, y, 180, 56, bgColor)
      .setStrokeStyle(2, borderColor)
      .setInteractive({ useHandCursor: true });
    this.add.text(x, y, label, {
      fontFamily: 'monospace', fontSize: '15px',
      color: '#' + borderColor.toString(16).padStart(6, '0'),
      align: 'center'
    }).setOrigin(0.5);
    bg.on('pointerup', cb);
    return bg;
  },

  _startGame: function() {
    this.scene.start('GameScene', { difficulty: this._selectedDifficulty, score: 0, level: 1 });
  }
});
```

- [ ] **Step 3: Commit**

```bash
git add geisterjagd/src/scenes/BootScene.js geisterjagd/src/scenes/MenuScene.js
git commit -m "feat(geisterjagd): add BootScene and MenuScene"
```

---

## Task 9: GameOverScene

**Files:**
- Create: `geisterjagd/src/scenes/GameOverScene.js`

- [ ] **Step 1: Create `geisterjagd/src/scenes/GameOverScene.js`**

```js
var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameOverScene' }); },

  init: function(data) {
    this.score      = data.score      || 0;
    this.level      = data.level      || 1;
    this.difficulty = data.difficulty || 'easy';
  },

  create: function() {
    var W = 960, H = 560, cx = W / 2;

    // Save high score
    var key = 'geisterjagd_best_' + this.difficulty;
    var prev = parseInt(localStorage.getItem(key) || '0', 10);
    var best = Math.max(prev, this.score);
    localStorage.setItem(key, best);

    this.add.rectangle(cx, H / 2, W, H, 0x000000);
    var grid = this.add.graphics();
    grid.lineStyle(1, 0x0a0a20, 1);
    for (var x = 0; x < W; x += 40) grid.lineBetween(x, 0, x, H);
    for (var y = 0; y < H; y += 40) grid.lineBetween(0, y, W, y);

    // Ghost burst
    var glow = this.add.circle(cx, 130, 40, 0xcc44ff, 0.5);
    this.tweens.add({ targets: glow, scaleX: 3, scaleY: 3, alpha: 0, duration: 1200, ease: 'Quad.out' });
    this.add.circle(cx, 130, 16, 0xcc44ff);

    this.add.text(cx, 180, t('gameOver'), {
      fontFamily: 'monospace', fontSize: '48px', color: '#cc44ff', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(cx, 250, t('level') + ': ' + this.level, {
      fontFamily: 'monospace', fontSize: '22px', color: '#996699'
    }).setOrigin(0.5);

    this.add.text(cx, 295, t('finalScore') + ': ' + this.score, {
      fontFamily: 'monospace', fontSize: '36px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(cx, 345, t('bestScore') + ': ' + best, {
      fontFamily: 'monospace', fontSize: '20px', color: '#888877'
    }).setOrigin(0.5);

    var self = this;
    this._makeBtn(cx - 110, 450, t('playAgain'), 0x1a001a, 0xcc44ff, function() {
      self.scene.start('GameScene', { difficulty: self.difficulty, score: 0, level: 1 });
    });
    this._makeBtn(cx + 110, 450, t('toMenu'), 0x1a1a00, 0xffcc00, function() {
      self.scene.start('MenuScene');
    });
  },

  _makeBtn: function(x, y, label, bgColor, borderColor, cb) {
    var bg = this.add.rectangle(x, y, 190, 48, bgColor)
      .setStrokeStyle(2, borderColor)
      .setInteractive({ useHandCursor: true });
    this.add.text(x, y, label, {
      fontFamily: 'monospace', fontSize: '18px',
      color: '#' + borderColor.toString(16).padStart(6, '0')
    }).setOrigin(0.5);
    bg.on('pointerover', function() { bg.setAlpha(0.75); });
    bg.on('pointerout',  function() { bg.setAlpha(1); });
    bg.on('pointerup', cb);
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add geisterjagd/src/scenes/GameOverScene.js
git commit -m "feat(geisterjagd): add GameOverScene"
```

---

## Task 10: GameScene — board + player

**Files:**
- Create: `geisterjagd/src/scenes/GameScene.js` (initial version, extended in Tasks 11–15)

Level config used throughout GameScene:

```js
var LEVEL_CONFIG = [
  // { ghosts, speed (steps/sec), colors }
  { ghosts: 3, speed: 1.5, colors: ['red',   'blue'] },                        // L1
  { ghosts: 4, speed: 1.8, colors: ['red',   'blue'] },                        // L2
  { ghosts: 5, speed: 2.0, colors: ['red',   'blue'] },                        // L3
  { ghosts: 5, speed: 2.2, colors: ['red',   'blue',  'green'] },              // L4
  { ghosts: 6, speed: 2.5, colors: ['red',   'blue',  'green'] },              // L5
  { ghosts: 7, speed: 2.8, colors: ['red',   'blue',  'green'] },              // L6
  { ghosts: 8, speed: 3.0, colors: ['red',   'blue',  'green', 'orange'] },    // L7
  { ghosts: 9, speed: 3.3, colors: ['red',   'blue',  'green', 'orange'] },    // L8
  { ghosts:10, speed: 3.6, colors: ['red',   'blue',  'green', 'orange'] },    // L9
  { ghosts:12, speed: 4.0, colors: ['red',   'blue',  'green', 'orange'] },    // L10+
];

var GHOST_COLORS_HEX = { red: 0xff4444, blue: 0x44aaff, green: 0x44ff88, orange: 0xffaa22 };
var GHOST_COLORS_CSS = { red: '#ff4444', blue: '#44aaff', green: '#44ff88', orange: '#ffaa22' };

var CELL = 16; // px per grid cell
var COLS = 60;
var ROWS = 35;
```

- [ ] **Step 1: Create `geisterjagd/src/scenes/GameScene.js`** with board init and player movement:

```js
var LEVEL_CONFIG = [
  { ghosts: 3, speed: 1.5, colors: ['red', 'blue'] },
  { ghosts: 4, speed: 1.8, colors: ['red', 'blue'] },
  { ghosts: 5, speed: 2.0, colors: ['red', 'blue'] },
  { ghosts: 5, speed: 2.2, colors: ['red', 'blue', 'green'] },
  { ghosts: 6, speed: 2.5, colors: ['red', 'blue', 'green'] },
  { ghosts: 7, speed: 2.8, colors: ['red', 'blue', 'green'] },
  { ghosts: 8, speed: 3.0, colors: ['red', 'blue', 'green', 'orange'] },
  { ghosts: 9, speed: 3.3, colors: ['red', 'blue', 'green', 'orange'] },
  { ghosts:10, speed: 3.6, colors: ['red', 'blue', 'green', 'orange'] },
  { ghosts:12, speed: 4.0, colors: ['red', 'blue', 'green', 'orange'] }
];
var GHOST_HEX = { red: 0xff4444, blue: 0x44aaff, green: 0x44ff88, orange: 0xffaa22 };
var CELL_SIZE = 16;
var GCOLS = 60;
var GROWS = 35;

var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameScene' }); },

  init: function(data) {
    this.difficulty = data.difficulty || 'easy';
    this.score      = data.score      || 0;
    this.levelNum   = data.level      || 1;
    this.lives      = (this.difficulty === 'easy') ? 3 : 1;
  },

  create: function() {
    Audio.init();
    this.board = new BoardGrid(GCOLS, GROWS);

    // Graphics layers
    this.bgGraphics    = this.add.graphics(); // claimed cells fill
    this.drawGraphics  = this.add.graphics(); // live drawing line
    this.ghostGraphics = this.add.graphics(); // ghost circles
    this.overlayGfx    = this.add.graphics(); // flash overlays

    this._drawBoard();

    // Player starts at top-left corner of interior (on border)
    this.player = { col: 0, row: 1 };
    this.playerSprite = this.add.circle(
      this.player.col * CELL_SIZE + CELL_SIZE / 2,
      this.player.row * CELL_SIZE + CELL_SIZE / 2,
      5, 0xffffff
    );
    this.playerGlow = this.add.circle(
      this.playerSprite.x, this.playerSprite.y, 9, 0xffffff, 0.3
    );

    this.isDrawing = false;

    // Movement timing
    this.moveTimer    = 0;
    this.moveInterval = 1 / 8; // seconds between moves (keyboard repeat speed)

    // Cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Ghosts
    this.ghosts      = [];
    this.ghostSprites = [];
    this.ghostTimer  = 0;
    this._spawnGhosts();

    // HUD
    this._createHUD();

    // Mobile D-pad
    this._createDpad();

    // Input direction from d-pad
    this.dpadDir = { dx: 0, dy: 0 };
  },

  _getLevelConfig: function() {
    var idx = Math.min(this.levelNum - 1, LEVEL_CONFIG.length - 1);
    return LEVEL_CONFIG[idx];
  },

  _drawBoard: function() {
    var gfx = this.bgGraphics;
    gfx.clear();
    // Border
    gfx.fillStyle(0x334433, 1);
    for (var c = 0; c < GCOLS; c++) {
      gfx.fillRect(c * CELL_SIZE, 0,                   CELL_SIZE, CELL_SIZE);
      gfx.fillRect(c * CELL_SIZE, (GROWS-1) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    for (var r = 1; r < GROWS - 1; r++) {
      gfx.fillRect(0,                    r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      gfx.fillRect((GCOLS-1) * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    // Interior claimed cells (initially none beyond border)
    gfx.fillStyle(0x223322, 1);
    for (var cc = 1; cc < GCOLS - 1; cc++) {
      for (var rr = 1; rr < GROWS - 1; rr++) {
        if (this.board.isClaimed(cc, rr)) {
          gfx.fillRect(cc * CELL_SIZE, rr * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
  },

  _spawnGhosts: function() {
    var cfg    = this._getLevelConfig();
    var colors = cfg.colors;
    this.ghosts       = [];
    this.ghostSprites = [];
    this.ghostTimers  = [];
    var ghostSpeed = cfg.speed; // steps per second
    for (var i = 0; i < cfg.ghosts; i++) {
      // Random interior unclaimed position
      var col, row, attempts = 0;
      do {
        col = 2 + Math.floor(Math.random() * (GCOLS - 4));
        row = 2 + Math.floor(Math.random() * (GROWS - 4));
        attempts++;
      } while (this.board.get(col, row) !== CELL_UNCLAIMED && attempts < 200);

      var color = colors[i % colors.length];
      var ghost = new GhostAI(col, row, color);
      this.ghosts.push(ghost);
      this.ghostTimers.push(0);

      var px = col * CELL_SIZE + CELL_SIZE / 2;
      var py = row * CELL_SIZE + CELL_SIZE / 2;
      var circle = this.add.circle(px, py, 6, GHOST_HEX[color] || 0xffffff);
      var glow   = this.add.circle(px, py, 10, GHOST_HEX[color] || 0xffffff, 0.3);
      this.tweens.add({ targets: glow, scaleX: 1.8, scaleY: 1.8, alpha: 0, duration: 900 + i * 100, repeat: -1, ease: 'Sine.out' });
      this.ghostSprites.push({ circle: circle, glow: glow });
    }
  },

  _createHUD: function() {
    // HUD rendered on top of game area (960×560). Use a semi-transparent strip at top.
    // Score (top-left), Level (top-center), Lives (top-right)
    this.hudScore = this.add.text(8, 4, t('score') + ': 0', {
      fontFamily: 'monospace', fontSize: '13px', color: '#cccccc'
    });
    this.hudLevel = this.add.text(480, 4, t('level') + ': ' + this.levelNum, {
      fontFamily: 'monospace', fontSize: '13px', color: '#cccccc'
    }).setOrigin(0.5, 0);
    this.hudLives = this.add.text(952, 4, '', {
      fontFamily: 'monospace', fontSize: '13px', color: '#ff8888'
    }).setOrigin(1, 0);
    this._updateHUD();
  },

  _updateHUD: function() {
    this.hudScore.setText(t('score') + ': ' + this.score);
    this.hudLevel.setText(t('level') + ': ' + this.levelNum);
    if (this.difficulty === 'easy') {
      this.hudLives.setText('👻'.repeat(this.lives));
    } else {
      this.hudLives.setText(t('hard'));
    }
  },

  _createDpad: function() {
    var self  = this;
    var bSize = 44;
    var cx    = 480;
    var cy    = 530;

    function makeBtn(x, y, label, dx, dy) {
      var btn = self.add.rectangle(x, y, bSize, bSize, 0x222233)
        .setStrokeStyle(1, 0x666688)
        .setAlpha(0.7)
        .setInteractive({ useHandCursor: true });
      self.add.text(x, y, label, {
        fontFamily: 'monospace', fontSize: '18px', color: '#aaaacc'
      }).setOrigin(0.5);
      btn.on('pointerdown', function() { self.dpadDir = { dx: dx, dy: dy }; });
      btn.on('pointerup',   function() { self.dpadDir = { dx: 0,  dy: 0  }; });
      btn.on('pointerout',  function() { self.dpadDir = { dx: 0,  dy: 0  }; });
    }

    makeBtn(cx,           cy - bSize - 4, '▲', 0, -1);
    makeBtn(cx,           cy + bSize + 4, '▼', 0,  1);
    makeBtn(cx - bSize - 4, cy,           '◀',-1,  0);
    makeBtn(cx + bSize + 4, cy,           '▶', 1,  0);
  },

  _getInputDir: function() {
    if (this.cursors.left.isDown)  return { dx: -1, dy:  0 };
    if (this.cursors.right.isDown) return { dx:  1, dy:  0 };
    if (this.cursors.up.isDown)    return { dx:  0, dy: -1 };
    if (this.cursors.down.isDown)  return { dx:  0, dy:  1 };
    if (this.dpadDir.dx !== 0 || this.dpadDir.dy !== 0) return this.dpadDir;
    return null;
  },

  _movePlayer: function(dx, dy) {
    var nc = this.player.col + dx;
    var nr = this.player.row + dy;
    if (!this.board.isInBounds(nc, nr)) return;
    var cellState = this.board.get(nc, nr);

    // Cannot move into claimed cells (except border when not drawing)
    if (cellState === CELL_CLAIMED) {
      if (this.isDrawing) {
        // Close area
        this._closeArea();
      }
      // Stay on border — allow movement along claimed edge
      // Let player move to claimed cell (border/claimed territory is walkable)
      this.player.col = nc;
      this.player.row = nr;
      Audio.playTick();
      return;
    }

    // Cannot cross own drawing line
    if (cellState === CELL_DRAWING) return;

    if (!this.isDrawing && cellState === CELL_UNCLAIMED) {
      // Start drawing
      this.isDrawing = true;
      this.board.startDrawing(nc, nr);
    } else if (this.isDrawing && cellState === CELL_UNCLAIMED) {
      this.board.addDrawing(nc, nr);
    }

    this.player.col = nc;
    this.player.row = nr;
    Audio.playTick();
    this._redrawDrawLine();
  },

  _redrawDrawLine: function() {
    var gfx = this.drawGraphics;
    gfx.clear();
    gfx.fillStyle(0xffffff, 0.9);
    for (var i = 0; i < this.board.drawingCells.length; i++) {
      var cell = this.board.drawingCells[i];
      gfx.fillRect(cell.col * CELL_SIZE + 4, cell.row * CELL_SIZE + 4, CELL_SIZE - 8, CELL_SIZE - 8);
    }
  },

  _updatePlayerSprite: function() {
    var px = this.player.col * CELL_SIZE + CELL_SIZE / 2;
    var py = this.player.row * CELL_SIZE + CELL_SIZE / 2;
    this.playerSprite.setPosition(px, py);
    this.playerGlow.setPosition(px, py);
  },

  _closeArea: function() {
    var ghostPositions = this.ghosts.map(function(g) {
      return { col: g.col, row: g.row, color: g.color };
    });
    var result = this.board.closeArea(ghostPositions);
    this.isDrawing = false;

    // Remove trapped ghosts
    for (var ri = 0; ri < result.regions.length; ri++) {
      var region = result.regions[ri];
      this.score += region.score;

      // Collect trapped ghost indices
      var trappedIds = [];
      for (var gi = 0; gi < this.ghosts.length; gi++) {
        for (var ti = 0; ti < region.ghosts.length; ti++) {
          if (this.ghosts[gi].col === region.ghosts[ti].col &&
              this.ghosts[gi].row === region.ghosts[ti].row) {
            trappedIds.push(gi);
          }
        }
      }
      // Remove sprites for trapped ghosts (in reverse to preserve indices)
      trappedIds.sort(function(a, b) { return b - a; });
      for (var ti2 = 0; ti2 < trappedIds.length; ti2++) {
        var idx = trappedIds[ti2];
        this.ghostSprites[idx].circle.destroy();
        this.ghostSprites[idx].glow.destroy();
        this.ghosts.splice(idx, 1);
        this.ghostSprites.splice(idx, 1);
        this.ghostTimers.splice(idx, 1);
      }

      // Visual + audio feedback
      this._flashRegion(region);

      if (region.bonusType === 'bonus') {
        Audio.playBonus();
      } else if (region.bonusType === 'fail') {
        Audio.playFail();
      } else {
        Audio.playClose();
      }
    }

    this._redrawBoard();
    this._redrawDrawLine();
    this._updateHUD();

    // Win check
    if (this.ghosts.length === 0) {
      this._levelComplete();
    }
  },

  _flashRegion: function(region) {
    var gfx    = this.overlayGfx;
    var color  = 0x888888;
    if (region.bonusType === 'bonus') {
      color = GHOST_HEX[region.color] || 0xcc44ff;
    }
    gfx.fillStyle(color, 0.6);
    for (var i = 0; i < region.cells.length; i++) {
      gfx.fillRect(
        region.cells[i].col * CELL_SIZE,
        region.cells[i].row * CELL_SIZE,
        CELL_SIZE, CELL_SIZE
      );
    }
    var self = this;
    this.time.delayedCall(500, function() {
      gfx.clear();
      self._redrawBoard();
    });

    // Bonus shimmer: extra pulse overlay
    if (region.bonusType === 'bonus') {
      this.time.delayedCall(100, function() {
        gfx.fillStyle(0xffffff, 0.35);
        for (var j = 0; j < region.cells.length; j++) {
          gfx.fillRect(
            region.cells[j].col * CELL_SIZE,
            region.cells[j].row * CELL_SIZE,
            CELL_SIZE, CELL_SIZE
          );
        }
      });
    }
  },

  _redrawBoard: function() {
    var gfx = this.bgGraphics;
    gfx.clear();
    // Border (always green-ish)
    gfx.fillStyle(0x334433, 1);
    for (var c = 0; c < GCOLS; c++) {
      gfx.fillRect(c * CELL_SIZE, 0,                   CELL_SIZE, CELL_SIZE);
      gfx.fillRect(c * CELL_SIZE, (GROWS-1) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    for (var r = 1; r < GROWS - 1; r++) {
      gfx.fillRect(0,                     r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      gfx.fillRect((GCOLS-1) * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    // Claimed interior cells
    gfx.fillStyle(0x223322, 1);
    for (var cc = 1; cc < GCOLS - 1; cc++) {
      for (var rr = 1; rr < GROWS - 1; rr++) {
        if (this.board.isClaimed(cc, rr)) {
          gfx.fillRect(cc * CELL_SIZE, rr * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
  },

  _levelComplete: function() {
    Audio.playLevelComplete();
    var self = this;
    // Brief flash
    var flash = this.add.rectangle(480, 280, 960, 560, 0xffffff, 0.3);
    this.tweens.add({ targets: flash, alpha: 0, duration: 600 });

    this.add.text(480, 260, t('levelComplete'), {
      fontFamily: 'monospace', fontSize: '36px', color: '#cc44ff', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5);

    this.time.delayedCall(1500, function() {
      self.scene.start('GameScene', {
        difficulty: self.difficulty,
        score: self.score,
        level: self.levelNum + 1
      });
    });
  },

  _die: function() {
    Audio.playDeath();
    this.board.clearDrawing();
    this.isDrawing = false;
    this._redrawDrawLine();
    this.lives--;
    this._updateHUD();

    if (this.lives <= 0) {
      this.time.delayedCall(600, function() {
        this.scene.start('GameOverScene', {
          difficulty: this.difficulty,
          score: this.score,
          level: this.levelNum
        });
      }, [], this);
    } else {
      // Flash player red
      var self = this;
      this.playerSprite.setFillStyle(0xff0000);
      this.time.delayedCall(400, function() {
        self.playerSprite.setFillStyle(0xffffff);
      });
    }
  },

  update: function(time, delta) {
    var dt = delta / 1000;

    // Player movement
    this.moveTimer += dt;
    if (this.moveTimer >= this.moveInterval) {
      this.moveTimer = 0;
      var dir = this._getInputDir();
      if (dir) {
        this._movePlayer(dir.dx, dir.dy);
        this._updatePlayerSprite();
      }
    }

    // Ghost movement
    var cfg = this._getLevelConfig();
    var ghostInterval = 1 / cfg.speed;
    for (var i = 0; i < this.ghosts.length; i++) {
      this.ghostTimers[i] += dt;
      if (this.ghostTimers[i] >= ghostInterval) {
        this.ghostTimers[i] = 0;
        var result = this.ghosts[i].step(this.board);
        // Update sprite position
        var px = this.ghosts[i].col * CELL_SIZE + CELL_SIZE / 2;
        var py = this.ghosts[i].row * CELL_SIZE + CELL_SIZE / 2;
        this.ghostSprites[i].circle.setPosition(px, py);
        this.ghostSprites[i].glow.setPosition(px, py);

        if (result.hitDrawing) {
          this._die();
          return;
        }
      }
    }
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add geisterjagd/src/scenes/GameScene.js
git commit -m "feat(geisterjagd): implement GameScene"
```

---

## Task 11: Portal card

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Geisterjagd card to `/home/dev/vibe-coding-games/index.html`**

Find the line `<!-- add more cards here -->` and replace it with:

```html
    <a class="card" href="./geisterjagd/index.html" data-supports-browser="true" data-supports-mobile="true">
      <div class="card-emoji">🕸️</div>
      <div class="card-title" id="card-gj-title"></div>
      <div class="card-desc"  id="card-gj-desc"></div>
      <div class="card-btn"   id="card-gj-btn"></div>
      <div class="card-platforms">
        <span class="platform-badge supported" id="gj-badge-browser">🖥️ Browser</span>
        <span class="platform-badge supported" id="gj-badge-mobile">📱 Mobile</span>
      </div>
      <div class="platform-unavailable" id="card-gj-unavail" style="display:none;"></div>
    </a>
    <!-- add more cards here -->
```

- [ ] **Step 2: Add strings for Geisterjagd to portal `PORTAL_STRINGS` in `index.html`**

In the `de:` block, after the `ilDesc` line, add:
```js
        gjTitle:    'Geisterjagd',
        gjDesc:     'Fange die Geister ein — aber nur gleiche Farben zählen!',
```

In the `en:` block, after the `ilDesc` line, add:
```js
        gjTitle:    'Ghost Hunt',
        gjDesc:     'Trap the ghosts — but only matching colors score big!',
```

- [ ] **Step 3: Wire up strings in `render()` function in `index.html`**

After the `ilDesc` line in `render()`, add:
```js
      document.getElementById('card-gj-title').textContent   = s.gjTitle;
      document.getElementById('card-gj-desc').textContent    = s.gjDesc;
      document.getElementById('card-gj-btn').textContent     = s.play;
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(geisterjagd): add portal card"
```

---

## Task 12: Service worker — finalize cache list

**Files:**
- Modify: `geisterjagd/service-worker.js`

- [ ] **Step 1: Replace contents of `geisterjagd/service-worker.js`**

```js
var CACHE_NAME = 'geisterjagd-v1';
var CACHE_URLS = [
  '/geisterjagd/index.html',
  '/geisterjagd/src/i18n/lang.js',
  '/geisterjagd/src/i18n/strings.js',
  '/geisterjagd/src/utils/BoardGrid.js',
  '/geisterjagd/src/utils/GhostAI.js',
  '/geisterjagd/src/utils/Audio.js',
  '/geisterjagd/src/scenes/BootScene.js',
  '/geisterjagd/src/scenes/MenuScene.js',
  '/geisterjagd/src/scenes/GameScene.js',
  '/geisterjagd/src/scenes/GameOverScene.js',
  '/geisterjagd/src/main.js',
  'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(CACHE_URLS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.mode === 'navigate') return;
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached && !cached.redirected) return cached;
      return fetch(e.request);
    })
  );
});
```

- [ ] **Step 2: Commit**

```bash
git add geisterjagd/service-worker.js
git commit -m "feat(geisterjagd): finalize service worker cache"
```

---

## Self-Review

**Spec coverage check:**
- [x] Grid-based 60×35, 16px cells — Task 10
- [x] Border permanently claimed — Task 4 (BoardGrid.init)
- [x] Player draws from border into unclaimed territory — Task 10 (`_movePlayer`)
- [x] Death: ghost touches drawing line — Task 10 (`GhostAI.step` returns `hitDrawing`, `_die()`)
- [x] Death: self-intersection (can't move to DRAWING cell) — Task 10 (`_movePlayer` returns if `CELL_DRAWING`)
- [x] Easy 3 lives / Hard 1 hit — Task 10 (`init`, `_die`)
- [x] Flood fill, enclosed regions claimed — Task 4
- [x] Bonus: 2+ same color → color fill + shimmer + bonus sound — Tasks 4, 10
- [x] Fail: mixed colors → grey + wah-wah — Tasks 4, 10
- [x] Neutral: 0–1 ghost → neutral fill — Tasks 4, 10
- [x] Score = cells × multiplier — Task 4
- [x] Level progression: ghost count, speed, colors — Task 10 (`LEVEL_CONFIG`)
- [x] Win: all ghosts trapped → level complete — Task 10 (`_levelComplete`)
- [x] GameOverScene with high score (localStorage) — Task 9
- [x] MenuScene with difficulty select — Task 8
- [x] Mobile D-pad — Task 10 (`_createDpad`)
- [x] Keyboard arrow keys — Task 10 (`_createDpad` + cursor keys)
- [x] Audio: all 6 sounds — Task 7
- [x] i18n DE/EN — Tasks 1, 2
- [x] Portal card — Task 11
- [x] Service worker — Tasks 1, 12

**No placeholders found.**

**Type consistency:** `CELL_UNCLAIMED/CELL_CLAIMED/CELL_DRAWING` defined in BoardGrid.js and used consistently. `GhostAI.step(board)` returns `{hitDrawing}`. `BoardGrid.closeArea(ghostPositions)` returns `{regions}`. All match across tasks.
