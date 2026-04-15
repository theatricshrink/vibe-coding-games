# Player Figure Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the ugly orange-rectangle-plus-emoji player with a directional pixel-art explorer character drawn entirely via Phaser 3 Graphics.

**Architecture:** All changes are confined to `GameScene.js`. Two new constants (`PLAYER_PALETTE`, `PLAYER_PIXELS`) are added at the top of the file. `_drawPlayer()` is rewritten to iterate the active directional pixel grid. `_tryMove()` updates `_playerDir` before redrawing. The emoji Text object is removed.

**Tech Stack:** Phaser 3.60, plain ES5 JavaScript (no modules, no build step), `Phaser.GameObjects.Graphics`

---

### Task 1: Add palette and pixel-grid constants to GameScene.js

**Files:**
- Modify: `pflanzenwelt/src/scenes/GameScene.js` (top of file, after line 29)

This task adds the data only — no behaviour changes yet.

- [ ] **Step 1: Open the file and locate the insertion point**

The constants go after the existing `TILE_COLORS` block (ends at line 29). Add them immediately after line 29.

- [ ] **Step 2: Insert `PLAYER_PALETTE` and `PLAYER_PIXELS`**

Add the following block after `TILE_COLORS`:

```javascript
var PLAYER_PALETTE = {
  'H': 0x5c3317,  // hat / hair
  'S': 0xf5c58a,  // skin
  'E': 0x333333,  // eyes
  'J': 0x52b788,  // jacket
  'P': 0x3a7bd5   // pants
};

var PLAYER_PIXELS = {
  down: [
    ['.','H','H','H','H','H','H','.'],
    ['H','H','H','H','H','H','H','H'],
    ['.','.',  'S','S','S','S','.','.'],
    ['.','.',  'S','E','S','E','.','.'],
    ['.','.',  'S','S','S','S','.','.'],
    ['.','J',  'J','J','J','J','J','.'],
    ['J','J',  'J','J','J','J','J','J'],
    ['.','J',  'J','J','J','J','J','.'],
    ['.','.','P','P','.','P','P','.'],
    ['.','.','P','P','.','P','P','.']
  ],
  up: [
    ['.','H','H','H','H','H','H','.'],
    ['H','H','H','H','H','H','H','H'],
    ['.','.',  'H','H','H','H','.','.'],
    ['.','.',  'H','H','H','H','.','.'],
    ['.','.',  'S','S','S','S','.','.'],
    ['.','J',  'J','J','J','J','J','.'],
    ['J','J',  'J','J','J','J','J','J'],
    ['.','J',  'J','J','J','J','J','.'],
    ['.','.','P','P','.','P','P','.'],
    ['.','.','P','P','.','P','P','.']
  ],
  left: [
    ['.','.','H','H','H','H','.','.'],
    ['.','H','H','H','H','H','H','.'],
    ['.','.',  'S','S','S','.','.', '.'],
    ['.','.',  'E','S','S','.','.', '.'],
    ['.','.',  'S','S','S','.','.', '.'],
    ['.','J',  'J','J','J','J','.','.'],
    ['.','J',  'J','J','J','J','J','.'],
    ['.','J',  'J','J','J','J','.','.'],
    ['.','.','P','P','P','.','.', '.'],
    ['.','.','P','.','P','.','.', '.']
  ],
  right: [
    ['.','.','H','H','H','H','.','.'],
    ['.','H','H','H','H','H','H','.'],
    ['.','.','.',  'S','S','S','.','.'],
    ['.','.','.',  'S','S','E','.','.'],
    ['.','.','.',  'S','S','S','.','.'],
    ['.','.','J',  'J','J','J','J','.'],
    ['.','J','J',  'J','J','J','J','.'],
    ['.','.','J',  'J','J','J','J','.'],
    ['.','.','.',  'P','P','P','.','.'],
    ['.','.','.',  'P','.','P','.','.']
  ]
};
```

- [ ] **Step 3: Verify the file parses without errors**

Open the game in a browser (or run `node -e "var src = require('fs').readFileSync('pflanzenwelt/src/scenes/GameScene.js','utf8'); eval(src); console.log('ok')"` if Node is available). No syntax errors expected.

- [ ] **Step 4: Commit**

```bash
git add pflanzenwelt/src/scenes/GameScene.js
git commit -m "feat(pflanzenwelt): add player pixel-art data constants"
```

---

### Task 2: Update `create()` — add direction state, remove emoji Text

**Files:**
- Modify: `pflanzenwelt/src/scenes/GameScene.js` — `create()` method (currently lines 38–57)

- [ ] **Step 1: Add `_playerDir` initialisation**

In `create()`, after `this._moving = false;`, add:

```javascript
this._playerDir = 'down';
```

- [ ] **Step 2: Remove the emoji Text object**

Delete these two lines from `create()`:

```javascript
this._playerText = this.add.text(0, 0, '🧒', {
  fontSize: '28px'
}).setDepth(1);
```

- [ ] **Step 3: Verify `create()` now looks like this**

```javascript
create: function() {
  this._drawMap();

  this._questionPool = new QuestionPool(QUESTIONS);
  this._quizActive = false;
  this._collectionActive = false;

  this._playerCol = 10;
  this._playerRow = 7;
  this._moving = false;
  this._playerDir = 'down';

  this._playerGfx = this.add.graphics();

  this._drawPlayer();
  this._setupKeys();
  this._setupDpad();
},
```

- [ ] **Step 4: Commit**

```bash
git add pflanzenwelt/src/scenes/GameScene.js
git commit -m "feat(pflanzenwelt): add _playerDir state, remove emoji text object"
```

---

### Task 3: Update `_tryMove()` to set direction

**Files:**
- Modify: `pflanzenwelt/src/scenes/GameScene.js` — `_tryMove()` method (currently lines 189–203)

- [ ] **Step 1: Add direction-setting logic**

Inside `_tryMove(dc, dr)`, after the boundary/collision checks and before `this._playerCol = newCol;`, add:

```javascript
if (dr < 0) this._playerDir = 'up';
else if (dr > 0) this._playerDir = 'down';
else if (dc < 0) this._playerDir = 'left';
else if (dc > 0) this._playerDir = 'right';
```

- [ ] **Step 2: Verify the full `_tryMove` looks like this**

```javascript
_tryMove: function(dc, dr) {
  if (this._moving) return;
  var newCol = this._playerCol + dc;
  var newRow = this._playerRow + dr;
  if (newCol < 0 || newCol >= COLS || newRow < 0 || newRow >= ROWS) return;
  var tile = MAP[newRow][newCol];
  if (tile === 2 || tile === 3) return;

  if (dr < 0) this._playerDir = 'up';
  else if (dr > 0) this._playerDir = 'down';
  else if (dc < 0) this._playerDir = 'left';
  else if (dc > 0) this._playerDir = 'right';

  this._playerCol = newCol;
  this._playerRow = newRow;
  this._drawPlayer();
  this._moving = true;
  var self = this;
  this.time.delayedCall(150, function() { self._moving = false; });
  this._onStep(tile);
},
```

- [ ] **Step 3: Commit**

```bash
git add pflanzenwelt/src/scenes/GameScene.js
git commit -m "feat(pflanzenwelt): update _tryMove to track facing direction"
```

---

### Task 4: Rewrite `_drawPlayer()` to render pixel-art grid

**Files:**
- Modify: `pflanzenwelt/src/scenes/GameScene.js` — `_drawPlayer()` method (currently lines 70–83)

- [ ] **Step 1: Replace the method body**

Replace the entire `_drawPlayer` method with:

```javascript
_drawPlayer: function() {
  this._playerGfx.clear();
  var grid = PLAYER_PIXELS[this._playerDir];
  // Character is 32×40px (8 cols × 4px, 10 rows × 4px).
  // Centre it in the 48×48 tile: 8px left margin, 4px top margin.
  var ox = this._playerCol * TILE_SIZE + 8;
  var oy = this._playerRow * TILE_SIZE + 4;
  for (var r = 0; r < grid.length; r++) {
    for (var c = 0; c < grid[r].length; c++) {
      var code = grid[r][c];
      if (code === '.') continue;
      this._playerGfx.fillStyle(PLAYER_PALETTE[code], 1);
      this._playerGfx.fillRect(ox + c * 4, oy + r * 4, 4, 4);
    }
  }
},
```

- [ ] **Step 2: Load the game and verify visually**

Open `pflanzenwelt/index.html` in a browser. You should see the pixel-art explorer on the map, facing down. Move in all four directions and confirm the sprite changes facing. No orange rectangle, no emoji.

- [ ] **Step 3: Commit**

```bash
git add pflanzenwelt/src/scenes/GameScene.js
git commit -m "feat(pflanzenwelt): rewrite _drawPlayer with directional pixel-art character"
```
