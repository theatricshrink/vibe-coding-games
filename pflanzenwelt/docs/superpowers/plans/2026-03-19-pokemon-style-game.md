# Pokemon-Style Browser Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a playable browser game where a 9-year-old explores a meadow map, encounters plant creatures, and catches them by answering German quiz questions.

**Architecture:** Three Phaser scenes (GameScene, QuizScene, CollectionScene) launched as overlays over each other. All tiles drawn programmatically with Phaser Graphics — no art assets required. Pure JS data files for creatures and questions are tested independently using Node.js before being integrated.

**Tech Stack:** Phaser 3 (CDN), vanilla JS (ES5-compatible), localStorage, Node.js for unit tests of pure logic

---

## File Map

```
game/
├── index.html                    # Game entry point — loads Phaser + all src files
├── src/
│   ├── main.js                   # Phaser.Game config, scene registry
│   ├── utils/
│   │   ├── weightedRandom.js     # Weighted random creature selection (testable in Node)
│   │   └── questionPool.js       # Per-category draw-without-replacement pool (testable in Node)
│   ├── scenes/
│   │   ├── GameScene.js          # Tile map, player movement, encounter trigger, C-key handler
│   │   ├── QuizScene.js          # Quiz overlay: question display, answer buttons, feedback tweens
│   │   └── CollectionScene.js    # Collection grid: caught/uncaught display, counter
│   └── data/
│       ├── creatures.js          # 8 creature definitions: name, emoji, color, rarity, weight
│       └── questions.js          # 45 German questions across 3 categories
└── tests/
    ├── weightedRandom.test.js    # Node.js tests for weighted random sampler
    └── questionPool.test.js      # Node.js tests for question pool de-duplication
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `src/main.js`

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p game/src/utils game/src/scenes game/src/data game/tests
```

- [ ] **Step 2: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Pflanzenwelt</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; height: 100vh; }
  </style>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
  <script src="src/data/creatures.js"></script>
  <script src="src/data/questions.js"></script>
  <script src="src/utils/weightedRandom.js"></script>
  <script src="src/utils/questionPool.js"></script>
  <script src="src/scenes/GameScene.js"></script>
  <script src="src/scenes/QuizScene.js"></script>
  <script src="src/scenes/CollectionScene.js"></script>
  <script src="src/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Write `src/main.js`**

```js
var config = {
  type: Phaser.AUTO,
  width: 960,
  height: 720,
  backgroundColor: '#2d5a27',
  scene: [GameScene, QuizScene, CollectionScene]
};

var game = new Phaser.Game(config);
```

- [ ] **Step 4: Open `index.html` in browser and verify Phaser loads**

Expected: black/dark canvas with no console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html src/main.js
git commit -m "feat: scaffold project with Phaser config"
```

---

## Task 2: Creature Data

**Files:**
- Create: `src/data/creatures.js`

- [ ] **Step 1: Write `src/data/creatures.js`**

```js
var CREATURES = [
  { id: 'blaettchen', name: 'Blättchen', emoji: '🍃', color: 0x4CAF50, rarity: 'common',   weight: 40 },
  { id: 'mooskind',   name: 'Mooskind',  emoji: '🟢', color: 0x2E7D32, rarity: 'common',   weight: 40 },
  { id: 'dornika',    name: 'Dornika',   emoji: '🌵', color: 0x66BB6A, rarity: 'common',   weight: 40 },
  { id: 'blumsel',    name: 'Blumsel',   emoji: '🌸', color: 0xF48FB1, rarity: 'uncommon', weight: 15 },
  { id: 'rankbert',   name: 'Rankbert',  emoji: '🐍', color: 0x558B2F, rarity: 'uncommon', weight: 15 },
  { id: 'pilzling',   name: 'Pilzling',  emoji: '🍄', color: 0xE53935, rarity: 'uncommon', weight: 15 },
  { id: 'baumgeist',  name: 'Baumgeist', emoji: '🌳', color: 0x8D6E63, rarity: 'rare',     weight: 5  },
  { id: 'bisaknosp',  name: 'Bisaknosp', emoji: '🌱', color: 0x26A69A, rarity: 'rare',     weight: 5  }
];
```

- [ ] **Step 2: Verify in browser console**

Open browser console and type `CREATURES.length`. Expected: `8`.

- [ ] **Step 3: Commit**

```bash
git add src/data/creatures.js
git commit -m "feat: add creature definitions"
```

---

## Task 3: Question Bank

**Files:**
- Create: `src/data/questions.js`

- [ ] **Step 1: Write `src/data/questions.js`**

Each question: `{ id, category, frage, optionen: [A,B,C,D], antwort: 'A'|'B'|'C'|'D' }`

```js
var QUESTIONS = [
  // --- Mathe (15) ---
  { id: 'm01', category: 'Mathe', frage: 'Was ist 7 × 8?',          optionen: ['54','56','58','64'],              antwort: 'B' },
  { id: 'm02', category: 'Mathe', frage: 'Was ist 9 × 6?',          optionen: ['45','52','54','56'],              antwort: 'C' },
  { id: 'm03', category: 'Mathe', frage: 'Was ist 6 × 7?',          optionen: ['36','40','42','48'],              antwort: 'C' },
  { id: 'm04', category: 'Mathe', frage: 'Was ist 8 × 8?',          optionen: ['56','60','64','72'],              antwort: 'C' },
  { id: 'm05', category: 'Mathe', frage: 'Was ist 4 × 9?',          optionen: ['32','34','36','38'],              antwort: 'C' },
  { id: 'm06', category: 'Mathe', frage: 'Was ist 7 × 7?',          optionen: ['42','47','49','51'],              antwort: 'C' },
  { id: 'm07', category: 'Mathe', frage: 'Was ist 5 × 8?',          optionen: ['35','38','40','45'],              antwort: 'C' },
  { id: 'm08', category: 'Mathe', frage: 'Was ist 3 × 9?',          optionen: ['21','24','27','30'],              antwort: 'C' },
  { id: 'm09', category: 'Mathe', frage: 'Was ist 6 × 6?',          optionen: ['30','34','36','40'],              antwort: 'C' },
  { id: 'm10', category: 'Mathe', frage: 'Was ist 9 × 9?',          optionen: ['72','81','84','90'],              antwort: 'B' },
  { id: 'm11', category: 'Mathe', frage: 'Was ist 8 × 7?',          optionen: ['48','54','56','60'],              antwort: 'C' },
  { id: 'm12', category: 'Mathe', frage: 'Was ist 10 × 6?',         optionen: ['54','60','66','70'],              antwort: 'B' },
  { id: 'm13', category: 'Mathe', frage: 'Was ist 25 + 37?',        optionen: ['52','60','62','65'],              antwort: 'C' },
  { id: 'm14', category: 'Mathe', frage: 'Was ist 100 − 43?',       optionen: ['47','57','63','67'],              antwort: 'B' },
  { id: 'm15', category: 'Mathe', frage: 'Was ist die Hälfte von 48?', optionen: ['22','24','26','28'],           antwort: 'B' },

  // --- Deutsch (15) ---
  { id: 'd01', category: 'Deutsch', frage: 'Welches Wort ist ein Nomen?',       optionen: ['laufen','schön','Hund','aber'],       antwort: 'C' },
  { id: 'd02', category: 'Deutsch', frage: 'Welches Wort ist ein Verb?',         optionen: ['Baum','grün','springen','weil'],      antwort: 'C' },
  { id: 'd03', category: 'Deutsch', frage: 'Welches Wort ist ein Adjektiv?',     optionen: ['Haus','rennen','klein','und'],        antwort: 'C' },
  { id: 'd04', category: 'Deutsch', frage: 'Wie schreibt man es richtig?',       optionen: ['das Mädchen','Das mädchen','das mädchen','Das Mädchen'], antwort: 'A' },
  { id: 'd05', category: 'Deutsch', frage: 'Was ist der Plural von „das Kind"?', optionen: ['die Kinds','die Kinder','die Kinde','die Kindere'], antwort: 'B' },
  { id: 'd06', category: 'Deutsch', frage: 'Welcher Artikel gehört zu „Sonne"?', optionen: ['der','die','das','den'],              antwort: 'B' },
  { id: 'd07', category: 'Deutsch', frage: 'Welcher Artikel gehört zu „Hund"?',  optionen: ['der','die','das','den'],              antwort: 'A' },
  { id: 'd08', category: 'Deutsch', frage: 'Welcher Artikel gehört zu „Haus"?',  optionen: ['der','die','das','den'],              antwort: 'C' },
  { id: 'd09', category: 'Deutsch', frage: 'Was ist der Plural von „die Blume"?',optionen: ['die Blumes','die Blumens','die Blumen','die Blümen'], antwort: 'C' },
  { id: 'd10', category: 'Deutsch', frage: 'Welches Wort reimt sich auf „Haus"?',optionen: ['Baum','Maus','Buch','Hund'],          antwort: 'B' },
  { id: 'd11', category: 'Deutsch', frage: 'Wie viele Silben hat „Schmetterling"?', optionen: ['2','3','4','5'],                   antwort: 'C' },
  { id: 'd12', category: 'Deutsch', frage: 'Was ist das Gegenteil von „groß"?',  optionen: ['lang','breit','klein','alt'],         antwort: 'C' },
  { id: 'd13', category: 'Deutsch', frage: 'Welches Wort ist falsch geschrieben?',optionen: ['Apfel','Schule','Freund','blüme'],   antwort: 'D' },
  { id: 'd14', category: 'Deutsch', frage: 'Was ist der Plural von „der Mann"?', optionen: ['die Manns','die Männer','die Männ','die Manne'], antwort: 'B' },
  { id: 'd15', category: 'Deutsch', frage: 'Welches Satzzeichen kommt ans Ende einer Frage?', optionen: ['.','!','?',','],        antwort: 'C' },

  // --- Allgemeinwissen (15) ---
  { id: 'a01', category: 'Allgemeinwissen', frage: 'Was ist die Hauptstadt von Frankreich?',    optionen: ['Berlin','Paris','Wien','Rom'],          antwort: 'B' },
  { id: 'a02', category: 'Allgemeinwissen', frage: 'Was ist die Hauptstadt von Deutschland?',   optionen: ['München','Hamburg','Frankfurt','Berlin'],antwort: 'D' },
  { id: 'a03', category: 'Allgemeinwissen', frage: 'Wie viele Farben hat ein Regenbogen?',      optionen: ['5','6','7','8'],                        antwort: 'C' },
  { id: 'a04', category: 'Allgemeinwissen', frage: 'Welches Tier ist das größte Landtier?',     optionen: ['Nilpferd','Elefant','Nashorn','Giraffe'],antwort: 'B' },
  { id: 'a05', category: 'Allgemeinwissen', frage: 'Wie viele Jahreszeiten gibt es?',           optionen: ['2','3','4','5'],                        antwort: 'C' },
  { id: 'a06', category: 'Allgemeinwissen', frage: 'Was macht Photosynthese?',                  optionen: ['Tiere atmen','Pflanzen machen Zucker aus Licht','Wasser fließt bergauf','Steine wachsen'], antwort: 'B' },
  { id: 'a07', category: 'Allgemeinwissen', frage: 'Wie viele Beine hat eine Spinne?',          optionen: ['6','7','8','10'],                       antwort: 'C' },
  { id: 'a08', category: 'Allgemeinwissen', frage: 'Was ist die Hauptstadt von Österreich?',    optionen: ['Salzburg','Graz','Wien','Innsbruck'],    antwort: 'C' },
  { id: 'a09', category: 'Allgemeinwissen', frage: 'Welcher Planet ist der Sonne am nächsten?', optionen: ['Venus','Erde','Mars','Merkur'],          antwort: 'D' },
  { id: 'a10', category: 'Allgemeinwissen', frage: 'Wie viele Kontinente hat die Erde?',        optionen: ['5','6','7','8'],                        antwort: 'C' },
  { id: 'a11', category: 'Allgemeinwissen', frage: 'Was ist der längste Fluss der Welt?',       optionen: ['Amazonas','Nil','Rhein','Donau'],        antwort: 'B' },
  { id: 'a12', category: 'Allgemeinwissen', frage: 'Welches Tier legt Eier und ist kein Vogel?',optionen: ['Hund','Fisch','Kuh','Krokodil'],        antwort: 'D' },
  { id: 'a13', category: 'Allgemeinwissen', frage: 'Wie viele Minuten hat eine Stunde?',        optionen: ['30','45','60','100'],                   antwort: 'C' },
  { id: 'a14', category: 'Allgemeinwissen', frage: 'Was ist die Landesfarbe der Schweiz?',      optionen: ['Blau-Weiß','Rot-Weiß','Grün-Weiß','Schwarz-Rot'], antwort: 'B' },
  { id: 'a15', category: 'Allgemeinwissen', frage: 'Welches ist das schnellste Landtier?',      optionen: ['Löwe','Gepard','Pferd','Strauß'],        antwort: 'B' }
];
```

- [ ] **Step 2: Verify in browser console**

Open console, type `QUESTIONS.length`. Expected: `45`.
Also verify: `QUESTIONS.filter(q => q.category === 'Mathe').length` → `15`.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions.js
git commit -m "feat: add German quiz question bank (45 questions)"
```

---

## Task 4: Utility Functions (with Tests)

**Files:**
- Create: `src/utils/weightedRandom.js`
- Create: `src/utils/questionPool.js`
- Create: `tests/weightedRandom.test.js`
- Create: `tests/questionPool.test.js`

### weightedRandom

- [ ] **Step 1: Write the failing test for `weightedRandom`**

```js
// tests/weightedRandom.test.js
// Minimal test runner — throws on failure
function assert(condition, message) {
  if (!condition) throw new Error('FAIL: ' + message);
  console.log('PASS: ' + message);
}

// Load the module
var weightedRandom = require('../src/utils/weightedRandom');

// Test 1: Always picks from items
var items = [
  { id: 'a', weight: 1 },
  { id: 'b', weight: 1 },
  { id: 'c', weight: 1 }
];
for (var i = 0; i < 20; i++) {
  var result = weightedRandom(items);
  assert(['a','b','c'].indexOf(result.id) !== -1, 'result is always a valid item (run ' + i + ')');
}

// Test 2: Zero-weight items are never picked
var skewed = [
  { id: 'x', weight: 0 },
  { id: 'y', weight: 100 }
];
for (var j = 0; j < 50; j++) {
  assert(weightedRandom(skewed).id === 'y', 'zero-weight item never picked (run ' + j + ')');
}

// Test 3: Single item always returned
assert(weightedRandom([{ id: 'solo', weight: 10 }]).id === 'solo', 'single item always returned');

console.log('\nAll weightedRandom tests passed.');
```

- [ ] **Step 2: Run test and verify it fails**

```bash
node tests/weightedRandom.test.js
```

Expected: Error — `Cannot find module '../src/utils/weightedRandom'`

- [ ] **Step 3: Implement `src/utils/weightedRandom.js`**

```js
// Works in both browser (global) and Node.js (module.exports)
function weightedRandom(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) total += items[i].weight;
  var roll = Math.random() * total;
  var cumulative = 0;
  for (var j = 0; j < items.length; j++) {
    cumulative += items[j].weight;
    if (roll < cumulative) return items[j];
  }
  return items[items.length - 1]; // fallback for floating point edge
}

if (typeof module !== 'undefined') module.exports = weightedRandom;
```

- [ ] **Step 4: Run test and verify it passes**

```bash
node tests/weightedRandom.test.js
```

Expected: All lines print `PASS:` and final line `All weightedRandom tests passed.`

### questionPool

- [ ] **Step 5: Write the failing test for `questionPool`**

```js
// tests/questionPool.test.js
function assert(condition, message) {
  if (!condition) throw new Error('FAIL: ' + message);
  console.log('PASS: ' + message);
}

var QuestionPool = require('../src/utils/questionPool');

var sampleQuestions = [
  { id: 'q1', category: 'Mathe' },
  { id: 'q2', category: 'Mathe' },
  { id: 'q3', category: 'Mathe' },
  { id: 'q4', category: 'Deutsch' },
  { id: 'q5', category: 'Deutsch' }
];

var pool = new QuestionPool(sampleQuestions);

// Test 1: draw returns a question from correct category
var q = pool.draw('Mathe');
assert(q.category === 'Mathe', 'draw returns Mathe question');

// Test 2: draw without replacement — all 3 unique before reset
var seen = {};
seen[q.id] = true;
var q2 = pool.draw('Mathe'); seen[q2.id] = true;
var q3 = pool.draw('Mathe'); seen[q3.id] = true;
assert(Object.keys(seen).length === 3, 'all 3 Mathe questions drawn before reset');

// Test 3: after exhausting pool, resets (draw returns a valid question again)
var q4 = pool.draw('Mathe');
assert(q4.category === 'Mathe', 'pool resets after exhaustion and draws again');

// Test 4: categories are independent
var dq = pool.draw('Deutsch');
assert(dq.category === 'Deutsch', 'Deutsch pool is independent');

console.log('\nAll questionPool tests passed.');
```

- [ ] **Step 6: Run test and verify it fails**

```bash
node tests/questionPool.test.js
```

Expected: Error — `Cannot find module '../src/utils/questionPool'`

- [ ] **Step 7: Implement `src/utils/questionPool.js`**

```js
function QuestionPool(allQuestions) {
  this._all = allQuestions;
  this._used = {}; // keyed by category
}

QuestionPool.prototype.draw = function(category) {
  var categoryQuestions = this._all.filter(function(q) { return q.category === category; });
  if (!this._used[category]) this._used[category] = [];

  // If all used, reset
  if (this._used[category].length >= categoryQuestions.length) {
    this._used[category] = [];
  }

  var used = this._used[category];
  var available = categoryQuestions.filter(function(q) { return used.indexOf(q.id) === -1; });
  var picked = available[Math.floor(Math.random() * available.length)];
  used.push(picked.id);
  return picked;
};

if (typeof module !== 'undefined') module.exports = QuestionPool;
```

- [ ] **Step 8: Run test and verify it passes**

```bash
node tests/questionPool.test.js
```

Expected: All `PASS:` lines, then `All questionPool tests passed.`

- [ ] **Step 9: Commit**

```bash
git add src/utils/weightedRandom.js src/utils/questionPool.js tests/
git commit -m "feat: add weighted random and question pool utilities with tests"
```

---

## Task 5: GameScene — Map Rendering

**Files:**
- Create: `src/scenes/GameScene.js`

The map is a 20-column × 15-row grid. Tile types:
- `0` = grass (walkable, light green)
- `1` = tall grass (walkable, encounter zone, darker green)
- `2` = tree/bush (impassable, dark green block)
- `3` = water (impassable, blue)

- [ ] **Step 1: Define the tilemap layout and render it**

Write `src/scenes/GameScene.js` with just the map (no player yet):

```js
var TILE_SIZE = 48;
var COLS = 20;
var ROWS = 15;

// 0=grass, 1=tall grass, 2=tree, 3=water
var MAP = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,2],
  [2,0,0,1,1,1,1,0,0,2,0,0,1,1,1,1,0,0,0,2],
  [2,0,1,1,0,0,1,1,0,2,0,1,1,0,0,1,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2],
  [2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2],
  [2,0,0,2,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,2],
  [2,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,2],
  [2,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,2,0,0,2],
  [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2],
  [2,0,2,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,2],
  [2,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var TILE_COLORS = {
  0: 0x5a9e3a,  // grass — medium green
  1: 0x3d7a25,  // tall grass — darker green
  2: 0x1b4a10,  // tree — very dark green
  3: 0x2980b9   // water — blue
};

var GameScene = {
  key: 'GameScene',

  create: function() {
    this._drawMap();
  },

  _drawMap: function() {
    var gfx = this.add.graphics();
    for (var row = 0; row < ROWS; row++) {
      for (var col = 0; col < COLS; col++) {
        var tile = MAP[row][col];
        gfx.fillStyle(TILE_COLORS[tile], 1);
        gfx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE - 1, TILE_SIZE - 1);
      }
    }
  }
};
```

- [ ] **Step 2: Open `index.html` in browser**

Expected: A colored tile grid fills the canvas — dark border trees, blue pond, green meadow with darker tall-grass patches. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/scenes/GameScene.js
git commit -m "feat: render tile map programmatically in GameScene"
```

---

## Task 6: GameScene — Player Movement

**Files:**
- Modify: `src/scenes/GameScene.js`

- [ ] **Step 1: Add player state and render to `GameScene`**

Add player initialization inside `create`, and a `_drawPlayer` helper. The player is a colored rectangle with an emoji centered on it.

```js
// Inside create(), after _drawMap():
this._playerCol = 10;
this._playerRow = 7;
this._moving = false;

this._playerGfx = this.add.graphics();
this._playerText = this.add.text(0, 0, '🧒', {
  fontSize: '28px'
}).setDepth(1);

this._drawPlayer();
this._setupKeys();
```

```js
// New methods on GameScene:
_drawPlayer: function() {
  this._playerGfx.clear();
  this._playerGfx.fillStyle(0xf5a623, 1);
  this._playerGfx.fillRect(
    this._playerCol * TILE_SIZE + 6,
    this._playerRow * TILE_SIZE + 6,
    TILE_SIZE - 12,
    TILE_SIZE - 12
  );
  this._playerText.setPosition(
    this._playerCol * TILE_SIZE + 10,
    this._playerRow * TILE_SIZE + 6
  );
},

_setupKeys: function() {
  var self = this;
  var directions = {
    UP:    { dc: 0,  dr: -1 },
    DOWN:  { dc: 0,  dr:  1 },
    LEFT:  { dc: -1, dr:  0 },
    RIGHT: { dc: 1,  dr:  0 }
  };

  var keys = this.input.keyboard.addKeys({
    UP:    Phaser.Input.Keyboard.KeyCodes.UP,
    DOWN:  Phaser.Input.Keyboard.KeyCodes.DOWN,
    LEFT:  Phaser.Input.Keyboard.KeyCodes.LEFT,
    RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    W:     Phaser.Input.Keyboard.KeyCodes.W,
    S:     Phaser.Input.Keyboard.KeyCodes.S,
    A:     Phaser.Input.Keyboard.KeyCodes.A,
    D:     Phaser.Input.Keyboard.KeyCodes.D
  });

  function tryMove(dc, dr) {
    if (self._moving) return;
    var newCol = self._playerCol + dc;
    var newRow = self._playerRow + dr;
    if (newCol < 0 || newCol >= COLS || newRow < 0 || newRow >= ROWS) return;
    var tile = MAP[newRow][newCol];
    if (tile === 2 || tile === 3) return; // impassable
    self._playerCol = newCol;
    self._playerRow = newRow;
    self._drawPlayer();
    self._moving = true;
    self.time.delayedCall(150, function() { self._moving = false; });
    self._onStep(tile);
  }

  this.input.keyboard.on('keydown-UP',    function() { tryMove( 0, -1); });
  this.input.keyboard.on('keydown-DOWN',  function() { tryMove( 0,  1); });
  this.input.keyboard.on('keydown-LEFT',  function() { tryMove(-1,  0); });
  this.input.keyboard.on('keydown-RIGHT', function() { tryMove( 1,  0); });
  this.input.keyboard.on('keydown-W',     function() { tryMove( 0, -1); });
  this.input.keyboard.on('keydown-S',     function() { tryMove( 0,  1); });
  this.input.keyboard.on('keydown-A',     function() { tryMove(-1,  0); });
  this.input.keyboard.on('keydown-D',     function() { tryMove( 1,  0); });
},

_onStep: function(tile) {
  // placeholder — encounter logic comes in Task 7
}
```

- [ ] **Step 2: Verify movement in browser**

Open `index.html`. Use arrow keys and WASD. Expected:
- Player moves tile-by-tile
- Cannot walk into dark green (trees) or blue (water) tiles
- Movement feels snappy with no key-hold auto-repeat issues

- [ ] **Step 3: Commit**

```bash
git add src/scenes/GameScene.js
git commit -m "feat: add grid-based player movement with collision"
```

---

## Task 7: GameScene — Encounter System + C Key

**Files:**
- Modify: `src/scenes/GameScene.js`

- [ ] **Step 1: Initialize the question pool and C key in `create()`**

Add to the top of `create()`, before `_drawMap()`:

```js
this._questionPool = new QuestionPool(QUESTIONS);
this._quizActive = false;
this._collectionActive = false;
```

Add to `_setupKeys()`, after the movement key setup:

```js
var cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
cKey.on('down', function() {
  if (self._quizActive) return; // C disabled during quiz
  if (self._collectionActive) return;
  self._collectionActive = true;
  self.scene.launch('CollectionScene');
  self.scene.pause();
});
this._cKey = cKey;
```

- [ ] **Step 2: Replace the `_onStep` placeholder with encounter logic**

```js
_onStep: function(tile) {
  if (tile !== 1) return; // only tall grass triggers encounters
  if (Math.random() > 0.2) return; // 1-in-5 chance
  var creature = weightedRandom(CREATURES);
  this._startEncounter(creature);
},

_startEncounter: function(creature) {
  this._quizActive = true;
  var questionsNeeded = (creature.rarity === 'rare') ? 2 : 1;
  var self = this;

  // Pick questions up-front so QuizScene has them
  var questions = [];
  var categories = ['Mathe', 'Deutsch', 'Allgemeinwissen'];
  for (var i = 0; i < questionsNeeded; i++) {
    var cat = categories[Math.floor(Math.random() * categories.length)];
    questions.push(this._questionPool.draw(cat));
  }

  this.scene.launch('QuizScene', {
    creature: creature,
    questions: questions,
    onComplete: function(caught) {
      self._quizActive = false;
      if (caught) {
        self._saveToCollection(creature);
      }
    }
  });
  this.scene.pause();
},

_saveToCollection: function(creature) {
  var raw = localStorage.getItem('pgame_collection');
  var collection = raw ? JSON.parse(raw) : {};
  if (!collection[creature.id]) {
    collection[creature.id] = { caughtAt: Date.now() };
    localStorage.setItem('pgame_collection', JSON.stringify(collection));
  }
}
```

- [ ] **Step 3: Verify in browser (stub test)**

Open `index.html`. Walk into a dark-grass patch repeatedly. Open console. Expected: After a few steps, no JS errors (QuizScene will fail to launch gracefully since it doesn't exist yet — that's fine for now).

- [ ] **Step 4: Commit**

```bash
git add src/scenes/GameScene.js
git commit -m "feat: add encounter trigger, question selection, C-key guard"
```

---

## Task 8: QuizScene

**Files:**
- Create: `src/scenes/QuizScene.js`

QuizScene is launched as an overlay. It receives `{ creature, questions, onComplete }` via `scene.launch()` data. It handles 1 or 2 sequential questions (fail-fast for rare creatures).

- [ ] **Step 1: Write `src/scenes/QuizScene.js`**

```js
var QuizScene = {
  key: 'QuizScene',

  init: function(data) {
    this._creature = data.creature;
    this._questions = data.questions;
    this._onComplete = data.onComplete;
    this._currentQ = 0;
  },

  create: function() {
    var W = 960, H = 720;

    // Semi-transparent overlay background
    this._bg = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.65);

    // Creature display
    this._creatureText = this.add.text(W / 2, 140, this._creature.emoji, {
      fontSize: '80px'
    }).setOrigin(0.5);

    this._creatureName = this.add.text(W / 2, 230, this._creature.name, {
      fontSize: '32px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Flash panel (for feedback color)
    this._panel = this.add.rectangle(W / 2, 420, 760, 380, 0x1a1a2e, 1);

    // Question text
    this._questionText = this.add.text(W / 2, 295, '', {
      fontSize: '26px', color: '#ffffff', wordWrap: { width: 700 }, align: 'center'
    }).setOrigin(0.5);

    // Answer buttons
    this._buttons = [];
    this._buttonLabels = ['A', 'B', 'C', 'D'];
    var positions = [
      { x: 310, y: 390 }, { x: 650, y: 390 },
      { x: 310, y: 480 }, { x: 650, y: 480 }
    ];
    var self = this;
    for (var i = 0; i < 4; i++) {
      (function(idx) {
        var btn = self.add.rectangle(positions[idx].x, positions[idx].y, 300, 70, 0x2c5f2e)
          .setInteractive();
        var label = self.add.text(positions[idx].x, positions[idx].y, '', {
          fontSize: '22px', color: '#ffffff', wordWrap: { width: 270 }, align: 'center'
        }).setOrigin(0.5);
        btn.on('pointerover', function() { btn.setFillStyle(0x3d7a25); });
        btn.on('pointerout',  function() { btn.setFillStyle(0x2c5f2e); });
        btn.on('pointerdown', function() { self._onAnswer(self._buttonLabels[idx]); });
        self._buttons.push({ rect: btn, label: label });
      })(i);
    }

    // Keyboard answer shortcuts
    var self2 = this;
    this.input.keyboard.on('keydown-A', function() { self2._onAnswer('A'); });
    this.input.keyboard.on('keydown-B', function() { self2._onAnswer('B'); });
    this.input.keyboard.on('keydown-C', function() { self2._onAnswer('C'); });
    this.input.keyboard.on('keydown-D', function() { self2._onAnswer('D'); });

    this._showQuestion();
  },

  _showQuestion: function() {
    var q = this._questions[this._currentQ];
    this._questionText.setText(q.frage);
    for (var i = 0; i < 4; i++) {
      this._buttons[i].label.setText(this._buttonLabels[i] + ') ' + q.optionen[i]);
    }
  },

  _onAnswer: function(letter) {
    var q = this._questions[this._currentQ];
    if (letter === q.antwort) {
      this._correct();
    } else {
      this._wrong();
    }
  },

  _correct: function() {
    var self = this;
    // Green flash
    this._panel.setFillStyle(0x1e7e34);
    var feedback = this._currentQ < this._questions.length - 1
      ? '✓ Richtig!'
      : 'Gefangen! 🎉';
    var txt = this.add.text(480, 580, feedback, {
      fontSize: '36px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: txt,
      y: 550,
      alpha: { from: 0, to: 1 },
      duration: 300,
      onComplete: function() {
        self.time.delayedCall(900, function() {
          self._currentQ++;
          if (self._currentQ < self._questions.length) {
            // More questions (rare creature Q2)
            txt.destroy();
            self._panel.setFillStyle(0x1a1a2e);
            self._showQuestion();
          } else {
            self._close(true);
          }
        });
      }
    });
  },

  _wrong: function() {
    var self = this;
    // Red flash + creature bounces
    this._panel.setFillStyle(0x7b1e1e);
    var txt = this.add.text(480, 580, 'Tschüss! 👋', {
      fontSize: '36px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this._creatureText,
      x: '+=30',
      yoyo: true,
      repeat: 2,
      duration: 80,
      onComplete: function() {
        self.tweens.add({
          targets: self._creatureText,
          alpha: 0,
          duration: 400,
          onComplete: function() {
            self.time.delayedCall(600, function() {
              self._close(false);
            });
          }
        });
      }
    });
  },

  _close: function(caught) {
    // Disable keyboard listeners before stopping scene
    this.input.keyboard.removeAllListeners();
    this.scene.stop();
    this.scene.resume('GameScene');
    this._onComplete(caught);
  }
};
```

- [ ] **Step 2: Verify in browser**

Walk into tall grass until an encounter triggers. Expected:
- Dark overlay appears with creature emoji, name, question, and 4 answer buttons
- Correct answer: green flash, "Gefangen!" message after 0.9s, returns to map
- Wrong answer: red flash, "Tschüss!", creature bounces and fades, returns to map
- Rare creature: two questions shown sequentially; wrong answer on either closes immediately

- [ ] **Step 3: Commit**

```bash
git add src/scenes/QuizScene.js
git commit -m "feat: add QuizScene with German questions and tween feedback"
```

---

## Task 9: CollectionScene

**Files:**
- Create: `src/scenes/CollectionScene.js`

- [ ] **Step 1: Write `src/scenes/CollectionScene.js`**

```js
var CollectionScene = {
  key: 'CollectionScene',

  create: function() {
    var W = 960, H = 720;
    var self = this;

    // Load collection from localStorage
    var raw = localStorage.getItem('pgame_collection');
    var collection = raw ? JSON.parse(raw) : {};

    // Background overlay
    this.add.rectangle(W / 2, H / 2, W, H, 0x0d0d1a, 0.92);

    // Title
    var caught = Object.keys(collection).length;
    this.add.text(W / 2, 40, 'Gefangen: ' + caught + ' / ' + CREATURES.length, {
      fontSize: '30px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(W / 2, 80, '[C] oder [Esc] zum Schließen', {
      fontSize: '16px', color: '#aaaaaa'
    }).setOrigin(0.5);

    // Grid: 4 columns × 2 rows
    var cols = 4;
    var cardW = 190, cardH = 210;
    var startX = 95, startY = 140;

    for (var i = 0; i < CREATURES.length; i++) {
      var c = CREATURES[i];
      var col = i % cols;
      var row = Math.floor(i / cols);
      var cx = startX + col * (cardW + 20);
      var cy = startY + row * (cardH + 20);
      var isCaught = !!collection[c.id];

      // Card background
      var cardColor = isCaught ? 0x1b4332 : 0x1a1a2e;
      this.add.rectangle(cx + cardW / 2, cy + cardH / 2, cardW, cardH, cardColor)
        .setStrokeStyle(2, isCaught ? 0x52b788 : 0x444444);

      if (isCaught) {
        // Emoji
        this.add.text(cx + cardW / 2, cy + 60, c.emoji, {
          fontSize: '52px'
        }).setOrigin(0.5);
        // Name
        this.add.text(cx + cardW / 2, cy + 120, c.name, {
          fontSize: '18px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);
        // Badge
        this.add.text(cx + cardW / 2, cy + 155, 'Gefangen!', {
          fontSize: '13px', color: '#52b788'
        }).setOrigin(0.5);
        // Rarity
        var rarityColor = c.rarity === 'rare' ? '#f5e642' : c.rarity === 'uncommon' ? '#b0c4de' : '#aaaaaa';
        this.add.text(cx + cardW / 2, cy + 178, c.rarity, {
          fontSize: '12px', color: rarityColor
        }).setOrigin(0.5);
      } else {
        // Silhouette
        this.add.text(cx + cardW / 2, cy + 60, '❓', {
          fontSize: '52px', alpha: 0.4
        }).setOrigin(0.5);
        this.add.text(cx + cardW / 2, cy + 120, '???', {
          fontSize: '20px', color: '#555555'
        }).setOrigin(0.5);
      }
    }

    // Close keys
    var closeKeys = this.input.keyboard.addKeys({
      C: Phaser.Input.Keyboard.KeyCodes.C,
      ESC: Phaser.Input.Keyboard.KeyCodes.ESC
    });
    var closed = false;
    function close() {
      if (closed) return;
      closed = true;
      self.scene.stop();
      self.scene.resume('GameScene');
      // Signal GameScene that collection is closed
      self.scene.get('GameScene')._collectionActive = false;
    }
    closeKeys.C.on('down', close);
    closeKeys.ESC.on('down', close);
  }
};
```

- [ ] **Step 2: Verify in browser**

Press C while in the game map. Expected:
- Dark overlay shows grid of 8 cards
- Uncaught creatures show ❓ and ???
- After catching a creature and pressing C: that card shows emoji, name, "Gefangen!" badge
- Counter at top updates correctly
- C or Escape returns to the map

- [ ] **Step 3: Commit**

```bash
git add src/scenes/CollectionScene.js
git commit -m "feat: add CollectionScene with caught/uncaught grid display"
```

---

## Task 10: End-to-End Verification

- [ ] **Step 1: Run unit tests one final time**

```bash
node tests/weightedRandom.test.js
node tests/questionPool.test.js
```

Expected: Both print all `PASS:` lines.

- [ ] **Step 2: Full game playthrough**

Open `index.html` and verify these scenarios:

| Scenario | Expected |
|----------|----------|
| Walk into trees/water | Player does not move |
| Walk in grass | No encounter triggers |
| Walk in tall grass repeatedly | Encounter triggers eventually |
| Answer correctly (common) | "Gefangen!", returned to map |
| Answer wrongly | "Tschüss!", returned to map |
| Press C during quiz | Nothing happens |
| Press C on map | Collection opens |
| Press Escape/C in collection | Returns to map |
| Close and reopen browser | Caught creatures still shown in collection |
| Answer both questions correctly (rare) | Rare creature caught |
| Answer Q1 wrong (rare) | Encounter ends, no Q2 shown |

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete v1 Pokemon-style browser game

- Meadow map with grass, tall grass, trees, pond
- 8 plant creatures with weighted spawn rates
- German quiz (Mathe, Deutsch, Allgemeinwissen) to catch creatures
- Rare creatures require 2 correct answers
- Collection screen with caught/uncaught display
- localStorage persistence under pgame_collection"
```
