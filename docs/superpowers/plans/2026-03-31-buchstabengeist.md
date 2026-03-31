# Buchstabengeist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Phaser 3 Pac-Man-style browser game where players eat letter-carrying ghosts in order to spell words, with EN/DE support and mobile touch controls.

**Architecture:** Phaser 3.60.0, portrait canvas 480×660, four scenes (Boot→Menu→Game→GameOver). All rendering is procedural (Phaser Graphics + Text, no image files). Pure game logic lives in `src/game/logic.js` for testability without Phaser. AudioManager wraps Web Audio API for tone generation.

**Tech Stack:** Phaser 3.60.0 (CDN), vanilla JS (no build step), Web Audio API, Node.js for tests.

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Bootstrap: Phaser CDN, script load order, back button |
| `manifest.json` | PWA metadata |
| `service-worker.js` | Cache-first offline support |
| `src/main.js` | Phaser config + game init |
| `src/i18n/lang.js` | Read `pgame_lang` from localStorage, export `LANG` |
| `src/i18n/strings.js` | All UI strings keyed `en`/`de`, export `STRINGS` |
| `src/data/words.js` | `WORDS_EN`, `WORDS_DE`, active `WORDS` array |
| `src/game/logic.js` | Pure functions: collision, scoring, word pick, ghost AI direction, canMove |
| `src/audio/audio.js` | `AudioManager` singleton: tone + sequence generation |
| `src/scenes/BootScene.js` | Immediate transition to MenuScene |
| `src/scenes/MenuScene.js` | Mode selection (Challenge / Guided) |
| `src/scenes/GameScene.js` | All gameplay: maze, pac, ghosts, HUD, word bar, power pellets |
| `src/scenes/GameOverScene.js` | Score summary, play again |
| `tests/assert.js` | Micro assert helper |
| `tests/strings.test.js` | Verify all STRINGS keys present in both locales |
| `tests/words.test.js` | Verify word bank integrity |
| `tests/logic.test.js` | Unit tests for pure logic functions |

---

## Task 1: Project Scaffold

**Files:**
- Create: `buchstabengeist/index.html`
- Create: `buchstabengeist/manifest.json`
- Create: `buchstabengeist/service-worker.js`
- Create: `buchstabengeist/src/main.js`

- [ ] **Step 1: Create `buchstabengeist/index.html`**

```html
<!DOCTYPE html>
<html lang="de" id="html-root">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Buchstabengeist</title>
  <link rel="manifest" href="manifest.json" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #080818; }
    #game-container {
      position: fixed;
      top: env(safe-area-inset-top, 0px);
      right: env(safe-area-inset-right, 0px);
      bottom: env(safe-area-inset-bottom, 0px);
      left: env(safe-area-inset-left, 0px);
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

  <!-- lang.js MUST come first -->
  <script src="src/i18n/lang.js"></script>
  <script src="src/i18n/strings.js"></script>
  <script>
    document.getElementById('html-root').lang = LANG;
    document.getElementById('back-btn').textContent = LANG === 'en' ? '← Overview' : '← Übersicht';
  </script>

  <!-- Phaser CDN -->
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>

  <!-- Data + logic + audio -->
  <script src="src/data/words.js"></script>
  <script src="src/game/logic.js"></script>
  <script src="src/audio/audio.js"></script>

  <!-- Scenes -->
  <script src="src/scenes/BootScene.js"></script>
  <script src="src/scenes/MenuScene.js"></script>
  <script src="src/scenes/GameScene.js"></script>
  <script src="src/scenes/GameOverScene.js"></script>

  <!-- Entry point -->
  <script src="src/main.js"></script>

  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js');
      });
    }
  </script>
</body>
</html>
```

- [ ] **Step 2: Create `buchstabengeist/manifest.json`**

```json
{
  "name": "Buchstabengeist",
  "short_name": "Buchstabengeist",
  "start_url": "/buchstabengeist/",
  "display": "standalone",
  "background_color": "#080818",
  "theme_color": "#080818",
  "icons": [
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect width='192' height='192' fill='%23080818'/><text y='140' font-size='140' text-anchor='middle' x='96'>👻</text></svg>",
      "sizes": "192x192",
      "type": "image/svg+xml"
    }
  ]
}
```

- [ ] **Step 3: Create `buchstabengeist/service-worker.js`**

```js
var CACHE = 'buchstabengeist-v1';
var ASSETS = [
  '/buchstabengeist/',
  '/buchstabengeist/index.html',
  '/buchstabengeist/src/i18n/lang.js',
  '/buchstabengeist/src/i18n/strings.js',
  '/buchstabengeist/src/data/words.js',
  '/buchstabengeist/src/game/logic.js',
  '/buchstabengeist/src/audio/audio.js',
  '/buchstabengeist/src/scenes/BootScene.js',
  '/buchstabengeist/src/scenes/MenuScene.js',
  '/buchstabengeist/src/scenes/GameScene.js',
  '/buchstabengeist/src/scenes/GameOverScene.js',
  '/buchstabengeist/src/main.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});
```

- [ ] **Step 4: Create `buchstabengeist/src/main.js`**

```js
var config = {
  type: Phaser.AUTO,
  backgroundColor: '#080818',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 480,
    height: 660
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene]
};

var game = new Phaser.Game(config);
```

- [ ] **Step 5: Commit**

```bash
cd /home/dev/vibe-coding-games
git add buchstabengeist/
git commit -m "feat: scaffold buchstabengeist project structure"
```

---

## Task 2: i18n

**Files:**
- Create: `buchstabengeist/src/i18n/lang.js`
- Create: `buchstabengeist/src/i18n/strings.js`
- Create: `buchstabengeist/tests/assert.js`
- Create: `buchstabengeist/tests/strings.test.js`

- [ ] **Step 1: Create `buchstabengeist/src/i18n/lang.js`**

```js
var LANG = localStorage.getItem('pgame_lang') === 'en' ? 'en' : 'de';
```

- [ ] **Step 2: Create `buchstabengeist/src/i18n/strings.js`**

```js
var STRINGS = {
  en: {
    title:         'BUCHSTABENGEIST',
    spell:         'Spell:',
    score:         'Score',
    level:         'Level',
    lives:         'Lives',
    modeChallenge: 'CHALLENGE',
    modeGuided:    'GUIDED',
    descChallenge: 'Guess the word. Power pellets save your life.',
    descGuided:    'Word shown. Focus on the chase.',
    controls:      'Arrow keys / WASD / Swipe',
    playBtn:       'PLAY',
    playAgain:     'PLAY AGAIN',
    gameOver:      'GAME OVER',
    wordComplete:  '✓ WORD!',
    livesOut:      'You ran out of lives!'
  },
  de: {
    title:         'BUCHSTABENGEIST',
    spell:         'Buchstabiere:',
    score:         'Punkte',
    level:         'Level',
    lives:         'Leben',
    modeChallenge: 'PROFI',
    modeGuided:    'LERNMODUS',
    descChallenge: 'Errate das Wort. Power-Pillen retten dein Leben.',
    descGuided:    'Wort wird angezeigt. Fang die Geister!',
    controls:      'Pfeiltasten / WASD / Wischen',
    playBtn:       'SPIELEN',
    playAgain:     'NOCHMAL',
    gameOver:      'SPIEL VORBEI',
    wordComplete:  '✓ WORT!',
    livesOut:      'Du hast keine Leben mehr!'
  }
};
```

- [ ] **Step 3: Create `buchstabengeist/tests/assert.js`**

```js
module.exports = function assert(condition, message) {
  if (!condition) throw new Error('FAIL: ' + message);
  console.log('PASS: ' + message);
};
```

- [ ] **Step 4: Create `buchstabengeist/tests/strings.test.js`**

```js
var assert = require('./assert');

// Load strings without browser globals
global.localStorage = { getItem: function() { return null; } };
eval(require('fs').readFileSync(__dirname + '/../src/i18n/lang.js', 'utf8'));
eval(require('fs').readFileSync(__dirname + '/../src/i18n/strings.js', 'utf8'));

var REQUIRED_KEYS = [
  'title','spell','score','level','lives',
  'modeChallenge','modeGuided','descChallenge','descGuided',
  'controls','playBtn','playAgain','gameOver','wordComplete','livesOut'
];

assert(typeof STRINGS === 'object', 'STRINGS is defined');
assert(typeof STRINGS.en === 'object', 'STRINGS.en exists');
assert(typeof STRINGS.de === 'object', 'STRINGS.de exists');

REQUIRED_KEYS.forEach(function(key) {
  assert(typeof STRINGS.en[key] === 'string' && STRINGS.en[key].length > 0, 'en.' + key + ' is non-empty string');
  assert(typeof STRINGS.de[key] === 'string' && STRINGS.de[key].length > 0, 'de.' + key + ' is non-empty string');
});

assert(Object.keys(STRINGS.en).length === REQUIRED_KEYS.length, 'en has exactly ' + REQUIRED_KEYS.length + ' keys');
assert(Object.keys(STRINGS.de).length === REQUIRED_KEYS.length, 'de has exactly ' + REQUIRED_KEYS.length + ' keys');
```

- [ ] **Step 5: Run test to verify it passes**

```bash
node buchstabengeist/tests/strings.test.js
```

Expected: all PASS lines, no errors.

- [ ] **Step 6: Commit**

```bash
git add buchstabengeist/src/i18n/ buchstabengeist/tests/
git commit -m "feat: add i18n lang + strings with tests"
```

---

## Task 3: Word Data

**Files:**
- Create: `buchstabengeist/src/data/words.js`
- Create: `buchstabengeist/tests/words.test.js`

- [ ] **Step 1: Create `buchstabengeist/src/data/words.js`**

```js
var WORDS_EN = [
  {word:'CAT',    hint:'a common household pet'},
  {word:'DOG',    hint:"man's best friend"},
  {word:'FOX',    hint:'a sly woodland animal'},
  {word:'NET',    hint:'used to catch fish'},
  {word:'JET',    hint:'a very fast plane'},
  {word:'BRAVE',  hint:'courageous, not afraid'},
  {word:'CLOUD',  hint:'floats in the sky'},
  {word:'DREAM',  hint:'what you see while sleeping'},
  {word:'FLAME',  hint:"fire's dancing light"},
  {word:'GLOBE',  hint:'a sphere-shaped map'},
  {word:'QUEST',  hint:'a search or adventure'},
  {word:'REALM',  hint:'a kingdom or domain'},
  {word:'SWIFT',  hint:'moving very fast'},
  {word:'VIVID',  hint:'bright and striking'},
  {word:'WALTZ',  hint:'an elegant ballroom dance'},
  {word:'BLURT',  hint:'say something suddenly'},
  {word:'CRISP',  hint:'firm and fresh'},
  {word:'EVOKE',  hint:'bring a memory to mind'},
  {word:'FLAIR',  hint:'natural talent or style'},
  {word:'HAVOC',  hint:'chaos and destruction'},
  {word:'OPAQUE', hint:'not see-through'},
  {word:'PLAGUE', hint:'a widespread disease'},
  {word:'QUIVER', hint:'tremble slightly'},
  {word:'RAVINE', hint:'a narrow deep valley'},
  {word:'MINGLE', hint:'mix socially with others'},
  {word:'SOMBRE', hint:'dark and gloomy in mood'},
  {word:'LAMENT', hint:'express grief or sorrow'},
  {word:'FRIGID', hint:'very cold'},
  {word:'CLAMOR', hint:'a loud continuous noise'},
  {word:'ZENITH', hint:'the highest point'}
];

var WORDS_DE = [
  {word:'HUND',    hint:'bester Freund des Menschen'},
  {word:'KATZE',   hint:'ein beliebtes Haustier'},
  {word:'HAUS',    hint:'dort wohnst du'},
  {word:'BAUM',    hint:'wächst im Wald oder Garten'},
  {word:'TIER',    hint:'lebt in der Natur'},
  {word:'FLUSS',   hint:'fließt ins Meer'},
  {word:'STERN',   hint:'leuchtet nachts am Himmel'},
  {word:'FEUER',   hint:'heiß und leuchtend'},
  {word:'WASSER',  hint:'zum Trinken und Schwimmen'},
  {word:'WOLKE',   hint:'schwimmt am Himmel'},
  {word:'TAPFER',  hint:'mutig und furchtlos'},
  {word:'RUHIG',   hint:'still und friedlich'},
  {word:'SCHNELL', hint:'sehr hohe Geschwindigkeit'},
  {word:'DUNKEL',  hint:'ohne Licht'},
  {word:'FRISCH',  hint:'neu und sauber'},
  {word:'KLUG',    hint:'intelligent und schlau'},
  {word:'TRAUM',   hint:'was du beim Schlafen siehst'},
  {word:'KRAFT',   hint:'körperliche Stärke'},
  {word:'WUESTE',  hint:'heißes, sandiges Gebiet'},
  {word:'INSEL',   hint:'Land, umgeben von Wasser'},
  {word:'SCHATZ',  hint:'versteckte Kostbarkeit'},
  {word:'FALKE',   hint:'ein schneller Greifvogel'},
  {word:'BODEN',   hint:'unter deinen Füßen'},
  {word:'STURM',   hint:'starker Wind mit Regen'},
  {word:'GEIST',   hint:'übernatürliches Wesen'},
  {word:'FROSCH',  hint:'springt und quakt'},
  {word:'ERNTE',   hint:'wenn Bauern Früchte sammeln'},
  {word:'HAFEN',   hint:'wo Schiffe ankern'},
  {word:'NEBEL',   hint:'dicker Dunst, kaum Sicht'},
  {word:'ZAUBER',  hint:'magische Kraft'}
];

// WORDS is set at game start based on LANG
var WORDS = typeof LANG !== 'undefined' && LANG === 'en' ? WORDS_EN : WORDS_DE;
```

- [ ] **Step 2: Create `buchstabengeist/tests/words.test.js`**

```js
var assert = require('./assert');

global.localStorage = { getItem: function() { return null; } };
eval(require('fs').readFileSync(__dirname + '/../src/i18n/lang.js', 'utf8'));
eval(require('fs').readFileSync(__dirname + '/../src/data/words.js', 'utf8'));

assert(Array.isArray(WORDS_EN), 'WORDS_EN is array');
assert(Array.isArray(WORDS_DE), 'WORDS_DE is array');
assert(WORDS_EN.length === 30, 'WORDS_EN has 30 entries (got ' + WORDS_EN.length + ')');
assert(WORDS_DE.length === 30, 'WORDS_DE has 30 entries (got ' + WORDS_DE.length + ')');

var VALID_CHARS = /^[A-Z]+$/;

WORDS_EN.forEach(function(entry, i) {
  var label = 'EN[' + i + '] ' + entry.word;
  assert(typeof entry.word === 'string', label + ' has word');
  assert(VALID_CHARS.test(entry.word), label + ' word is uppercase A-Z only');
  assert(entry.word.length >= 3 && entry.word.length <= 6, label + ' word length 3-6 (got ' + entry.word.length + ')');
  assert(typeof entry.hint === 'string' && entry.hint.length > 0, label + ' has hint');
});

WORDS_DE.forEach(function(entry, i) {
  var label = 'DE[' + i + '] ' + entry.word;
  assert(typeof entry.word === 'string', label + ' has word');
  assert(VALID_CHARS.test(entry.word), label + ' word is uppercase A-Z only (no Umlauts)');
  assert(entry.word.length >= 3 && entry.word.length <= 8, label + ' word length 3-8 (got ' + entry.word.length + ')');
  assert(typeof entry.hint === 'string' && entry.hint.length > 0, label + ' has hint');
});

// No duplicate words within each bank
var enWords = WORDS_EN.map(function(e) { return e.word; });
var deWords = WORDS_DE.map(function(e) { return e.word; });
var enUniq = enWords.filter(function(w, i) { return enWords.indexOf(w) === i; });
var deUniq = deWords.filter(function(w, i) { return deWords.indexOf(w) === i; });
assert(enUniq.length === WORDS_EN.length, 'WORDS_EN has no duplicates');
assert(deUniq.length === WORDS_DE.length, 'WORDS_DE has no duplicates');
```

- [ ] **Step 3: Run tests**

```bash
node buchstabengeist/tests/words.test.js
```

Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add buchstabengeist/src/data/ buchstabengeist/tests/words.test.js
git commit -m "feat: add word banks EN/DE with tests"
```

---

## Task 4: Pure Game Logic

**Files:**
- Create: `buchstabengeist/src/game/logic.js`
- Create: `buchstabengeist/tests/logic.test.js`

- [ ] **Step 1: Create `buchstabengeist/tests/logic.test.js` (failing)**

```js
var assert = require('./assert');

global.localStorage = { getItem: function() { return null; } };
eval(require('fs').readFileSync(__dirname + '/../src/i18n/lang.js', 'utf8'));
// Stub WORDS so logic.js doesn't break
global.WORDS_EN = []; global.WORDS_DE = [];
eval(require('fs').readFileSync(__dirname + '/../src/data/words.js', 'utf8'));
eval(require('fs').readFileSync(__dirname + '/../src/game/logic.js', 'utf8'));

// canMove
var maze = [
  [1,1,1],
  [1,0,1],
  [1,0,1],
  [1,1,1]
];
assert(canMove(maze, 1, 1, 'down') === true,  'canMove: open cell below');
assert(canMove(maze, 1, 1, 'up')   === false, 'canMove: wall above');
assert(canMove(maze, 1, 1, 'left') === false, 'canMove: wall left');
assert(canMove(maze, 1, 1, 'right')  === false, 'canMove: wall right');

// Tunnel wrap: col -1 wraps to COLS-1
var tunnel = [[0,0,0]];
assert(canMove(tunnel, 0, 0, 'left') === true, 'canMove: tunnel wrap left');
assert(canMove(tunnel, 0, 2, 'right') === true, 'canMove: tunnel wrap right');

// ghostOverlapsPac
assert(ghostOverlapsPac({r:5.0, c:5.0}, {r:5.0, c:5.0}) === true,  'overlap: same tile');
assert(ghostOverlapsPac({r:5.0, c:5.0}, {r:5.5, c:5.5}) === true,  'overlap: within threshold');
assert(ghostOverlapsPac({r:5.0, c:5.0}, {r:6.0, c:5.0}) === false, 'overlap: 1 tile apart');

// pickWord
var words = [{word:'CAT'},{word:'DOG'},{word:'FOX'}];
var picked = pickWord(words, null);
assert(typeof picked === 'object', 'pickWord: returns entry');
var picked2 = pickWord(words, 'CAT');
assert(picked2.word !== 'CAT', 'pickWord: avoids last word');

// calcScoreDelta
assert(calcScoreDelta('correctEat', 1)   === 120, 'score: correctEat level 1 = 120');
assert(calcScoreDelta('correctEat', 3)   === 160, 'score: correctEat level 3 = 160');
assert(calcScoreDelta('wordComplete', 1) === 350, 'score: wordComplete level 1 = 350');
assert(calcScoreDelta('wordComplete', 2) === 400, 'score: wordComplete level 2 = 400');
assert(calcScoreDelta('wrongEat', 1)     === -50, 'score: wrongEat = -50');
assert(calcScoreDelta('sparePellet', 1)  === 50,  'score: sparePellet = +50');

// getNextTargetIdx
var ghosts = [
  {wordIdx:0, eaten:true},
  {wordIdx:1, eaten:false},
  {wordIdx:2, eaten:false}
];
assert(getNextTargetIdx(ghosts) === 1, 'getNextTargetIdx: skips eaten, picks idx 1');
ghosts[1].eaten = true;
assert(getNextTargetIdx(ghosts) === 2, 'getNextTargetIdx: picks idx 2 when 0,1 eaten');
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
node buchstabengeist/tests/logic.test.js
```

Expected: FAIL (logic.js does not exist yet).

- [ ] **Step 3: Create `buchstabengeist/src/game/logic.js`**

```js
var DIR_DELTA = {
  up:    { dr: -1, dc:  0 },
  down:  { dr:  1, dc:  0 },
  left:  { dr:  0, dc: -1 },
  right: { dr:  0, dc:  1 }
};

var DIR_REVERSE = { up: 'down', down: 'up', left: 'right', right: 'left' };

function canMove(maze, r, c, dir) {
  var d = DIR_DELTA[dir];
  var nr = r + d.dr;
  var nc = c + d.dc;
  var cols = maze[0].length;
  if (nc < 0) nc = cols - 1;
  if (nc >= cols) nc = 0;
  if (nr < 0 || nr >= maze.length) return false;
  return maze[nr][nc] === 0;
}

function ghostOverlapsPac(pac, ghost) {
  return Math.abs(pac.r - ghost.r) < 0.58 && Math.abs(pac.c - ghost.c) < 0.58;
}

function pickWord(words, lastWord) {
  var pool = lastWord ? words.filter(function(w) { return w.word !== lastWord; }) : words;
  return pool[Math.floor(Math.random() * pool.length)];
}

function calcScoreDelta(event, level) {
  switch (event) {
    case 'correctEat':   return 100 + level * 20;
    case 'wordComplete': return 300 + level * 50;
    case 'wrongEat':     return -50;
    case 'sparePellet':  return 50;
    default:             return 0;
  }
}

function getNextTargetIdx(ghosts) {
  var min = Infinity, idx = -1;
  for (var i = 0; i < ghosts.length; i++) {
    if (!ghosts[i].eaten && ghosts[i].wordIdx < min) {
      min = ghosts[i].wordIdx;
      idx = i;
    }
  }
  return idx;
}

// Ghost direction AI: called at tile boundary.
// Returns best direction for ghost given pac position, scared state.
function chooseGhostDir(maze, ghost, pac, scared) {
  var r = Math.round(ghost.r);
  var c = Math.round(ghost.c);
  var dirs = ['up', 'down', 'left', 'right'];
  var rev = DIR_REVERSE[ghost.dir];
  var valid = dirs.filter(function(d) {
    return d !== rev && canMove(maze, r, c, d);
  });
  if (valid.length === 0) valid = [rev]; // dead end: reverse

  if (scared) {
    // Flee: maximise distance to pac
    valid.sort(function(a, b) {
      var da = DIR_DELTA[a], db = DIR_DELTA[b];
      var dA = Math.pow(r + da.dr - pac.r, 2) + Math.pow(c + da.dc - pac.c, 2);
      var dB = Math.pow(r + db.dr - pac.r, 2) + Math.pow(c + db.dc - pac.c, 2);
      return dB - dA;
    });
    return valid[0];
  }

  if (Math.random() < 0.7) {
    // Chase: minimise distance to pac
    valid.sort(function(a, b) {
      var da = DIR_DELTA[a], db = DIR_DELTA[b];
      var dA = Math.pow(r + da.dr - pac.r, 2) + Math.pow(c + da.dc - pac.c, 2);
      var dB = Math.pow(r + db.dr - pac.r, 2) + Math.pow(c + db.dc - pac.c, 2);
      return dA - dB;
    });
    return valid[0];
  }

  return valid[Math.floor(Math.random() * valid.length)];
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
node buchstabengeist/tests/logic.test.js
```

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add buchstabengeist/src/game/ buchstabengeist/tests/logic.test.js
git commit -m "feat: add pure game logic with unit tests"
```

---

## Task 5: AudioManager

**Files:**
- Create: `buchstabengeist/src/audio/audio.js`

No Phaser dependency — raw Web Audio API. No test (browser-only API).

- [ ] **Step 1: Create `buchstabengeist/src/audio/audio.js`**

```js
var AudioManager = (function() {
  var ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function playTone(freq, type, durationMs, delayMs) {
    try {
      var c = getCtx();
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      var start = c.currentTime + (delayMs || 0) / 1000;
      var end = start + durationMs / 1000;
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, end);
      osc.start(start);
      osc.stop(end);
    } catch(e) {}
  }

  function playSequence(steps) {
    // steps: [{freq, type, dur, delay}]
    steps.forEach(function(s) {
      playTone(s.freq, s.type || 'sine', s.dur, s.delay || 0);
    });
  }

  return {
    unlock: function() { try { getCtx().resume(); } catch(e) {} },

    correctEat: function(wordProgress) {
      playTone(400 + wordProgress * 100, 'sine', 80);
    },

    wordComplete: function() {
      playSequence([
        {freq: 600, dur: 100, delay:   0},
        {freq: 800, dur: 100, delay: 120},
        {freq:1000, dur: 150, delay: 240}
      ]);
    },

    wrongEat: function() {
      playTone(120, 'sawtooth', 200);
    },

    shieldUsed: function() {
      playSequence([
        {freq: 300, dur: 80, delay:  0},
        {freq: 500, dur: 80, delay: 90}
      ]);
    },

    powerPellet: function() {
      playSequence([
        {freq: 400, dur: 60, delay:   0},
        {freq: 550, dur: 60, delay:  70},
        {freq: 700, dur: 60, delay: 140},
        {freq: 900, dur: 80, delay: 210}
      ]);
    }
  };
})();
```

- [ ] **Step 2: Commit**

```bash
git add buchstabengeist/src/audio/
git commit -m "feat: add AudioManager with Web Audio tone generation"
```

---

## Task 6: BootScene

**Files:**
- Create: `buchstabengeist/src/scenes/BootScene.js`

- [ ] **Step 1: Create `buchstabengeist/src/scenes/BootScene.js`**

```js
var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'BootScene' }); },
  create: function() {
    // Unlock audio on first interaction
    this.input.once('pointerdown', function() { AudioManager.unlock(); });
    this.scene.start('MenuScene');
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add buchstabengeist/src/scenes/BootScene.js
git commit -m "feat: add BootScene"
```

---

## Task 7: MenuScene

**Files:**
- Create: `buchstabengeist/src/scenes/MenuScene.js`

- [ ] **Step 1: Create `buchstabengeist/src/scenes/MenuScene.js`**

```js
var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'MenuScene' }); },

  create: function() {
    var W = 480, H = 660;
    var s = STRINGS[LANG];
    var self = this;
    this._selectedMode = 'challenge';

    // Background
    this.add.rectangle(W/2, H/2, W, H, 0x080818);

    // Title
    this.add.text(W/2, 60, s.title, {
      fontFamily: 'monospace', fontSize: '28px', color: '#ff6b9d',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5);

    // Ghost decoration
    this.add.text(W/2, 115, '👻', { fontSize: '48px' }).setOrigin(0.5);

    // Mode buttons
    var modes = [
      { key: 'challenge', label: s.modeChallenge, desc: s.descChallenge, x: W/4 },
      { key: 'guided',    label: s.modeGuided,    desc: s.descGuided,    x: 3*W/4 }
    ];

    this._modeBoxes = {};
    var self = this;

    modes.forEach(function(m) {
      var box = self.add.rectangle(m.x, 230, 190, 120, 0x1a1a3a)
        .setStrokeStyle(2, 0x6bc5ff)
        .setInteractive({ useHandCursor: true });

      self.add.text(m.x, 195, m.label, {
        fontFamily: 'monospace', fontSize: '14px', color: '#f5e642'
      }).setOrigin(0.5);

      self.add.text(m.x, 225, m.desc, {
        fontFamily: 'monospace', fontSize: '10px', color: '#aaaacc',
        wordWrap: { width: 170 }, align: 'center'
      }).setOrigin(0.5, 0);

      self._modeBoxes[m.key] = box;

      box.on('pointerdown', function() {
        self._selectedMode = m.key;
        self._updateModeHighlight();
      });
    });

    this._updateModeHighlight();

    // Play button
    var playBtn = this.add.text(W/2, 340, s.playBtn, {
      fontFamily: 'monospace', fontSize: '22px', color: '#ffffff',
      backgroundColor: '#2c2c5a', padding: { x: 28, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    playBtn.on('pointerover', function() { playBtn.setColor('#f5e642'); });
    playBtn.on('pointerout',  function() { playBtn.setColor('#ffffff'); });
    playBtn.on('pointerdown', function() {
      AudioManager.unlock();
      self.scene.start('GameScene', { mode: self._selectedMode });
    });

    // Controls hint
    this.add.text(W/2, 400, s.controls, {
      fontFamily: 'monospace', fontSize: '11px', color: '#555577'
    }).setOrigin(0.5);

    // Language badge
    this.add.text(W - 10, 10, LANG.toUpperCase(), {
      fontFamily: 'monospace', fontSize: '11px', color: '#444466'
    }).setOrigin(1, 0);
  },

  _updateModeHighlight: function() {
    var self = this;
    Object.keys(this._modeBoxes).forEach(function(key) {
      var box = self._modeBoxes[key];
      if (key === self._selectedMode) {
        box.setFillStyle(0x2c2c6a).setStrokeStyle(2, 0xf5e642);
      } else {
        box.setFillStyle(0x1a1a3a).setStrokeStyle(2, 0x6bc5ff);
      }
    });
  }
});
```

- [ ] **Step 2: Open `buchstabengeist/index.html` in a browser and verify the menu screen renders with two mode buttons and a play button.**

- [ ] **Step 3: Commit**

```bash
git add buchstabengeist/src/scenes/MenuScene.js
git commit -m "feat: add MenuScene with mode selection"
```

---

## Task 8: GameScene — Foundation, Maze & HUD Skeleton

**Files:**
- Create: `buchstabengeist/src/scenes/GameScene.js`

This task creates the scene shell, draws the maze, and renders a static HUD + word bar. No gameplay yet.

- [ ] **Step 1: Create `buchstabengeist/src/scenes/GameScene.js`**

```js
var MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,1],
  [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
  [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var COLS = 19;
var ROWS = 21;
var TILE = 25;
var MAZE_X = Math.floor((480 - COLS * TILE) / 2);   // 2
var MAZE_Y = 110;                                      // 55 HUD + 55 word bar
var PAC_START_R = 15.5;
var PAC_START_C = 9.5;
var PAC_RADIUS = 10;
var GHOST_RADIUS = 10;
var GHOST_COLORS = [0xff6b9d, 0x6bc5ff, 0xffa94d, 0xa8ff78, 0xd4a0ff, 0xff6b6b];

// Pixel position for an entity at float tile coordinate (r, c).
// Entity coords are in tile-units where 9.5 means "half a tile into row 9".
function entityPixel(r, c) {
  return {
    x: MAZE_X + c * TILE,
    y: MAZE_Y + r * TILE
  };
}

var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameScene' }); },

  init: function(data) {
    this.mode = data.mode || 'challenge';
  },

  create: function() {
    var s = STRINGS[LANG];

    // ── Maze ────────────────────────────────────────────────────────
    this.mazeGfx = this.add.graphics();
    this._drawMaze();

    // ── HUD (y = 0..54) ─────────────────────────────────────────────
    this.titleText = this.add.text(8, 6, s.title, {
      fontFamily: 'monospace', fontSize: '13px', color: '#ff6b9d'
    });
    this.scoreLabel = this.add.text(8, 24, s.score + ': 0', {
      fontFamily: 'monospace', fontSize: '11px', color: '#aaaacc'
    });
    this.levelLabel = this.add.text(8, 38, s.level + ': 1', {
      fontFamily: 'monospace', fontSize: '11px', color: '#aaaacc'
    });
    this.livesText = this.add.text(480 - 8, 6, '❤❤❤', {
      fontFamily: 'monospace', fontSize: '14px', color: '#ff6b6b'
    }).setOrigin(1, 0);
    this.shieldText = this.add.text(480 - 8, 26, '🛡', {
      fontFamily: 'monospace', fontSize: '14px'
    }).setOrigin(1, 0).setVisible(false);

    // ── Word bar (y = 55..109) ───────────────────────────────────────
    this.spellLabel = this.add.text(8, 62, s.spell, {
      fontFamily: 'monospace', fontSize: '12px', color: '#aaaacc'
    });
    this.hintText = this.add.text(8, 92, '', {
      fontFamily: 'monospace', fontSize: '10px', color: '#555577',
      wordWrap: { width: 464 }
    });
    this.wordSlots = [];   // created in _setupWord

    // ── Divider lines ────────────────────────────────────────────────
    var divGfx = this.add.graphics();
    divGfx.lineStyle(1, 0x222244, 1);
    divGfx.lineBetween(0, 54, 480, 54);
    divGfx.lineBetween(0, 109, 480, 109);

    // ── Game state ───────────────────────────────────────────────────
    this.score = 0;
    this.level = 1;
    this.lives = 3;
    this.shield = false;
    this.currentWord = null;
    this.wordProgress = 0;
    this.ghosts = [];
    this.pellets = [];

    // ── Rendering objects (populated in later tasks) ─────────────────
    this.pacGfx   = this.add.graphics();
    this.ghostGfx = this.add.graphics();
    this.pelletGfx = this.add.graphics();
    this.ghostLetters = [];

    // Pac object
    this.pac = {
      r: PAC_START_R, c: PAC_START_C,
      dir: 'left', queuedDir: null,
      stunnedFrames: 0,
      mouthAngle: 0, mouthOpen: true
    };

    // ── Input (keyboard) ────────────────────────────────────────────
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = {
      up:    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    // ── Touch input ─────────────────────────────────────────────────
    this._touchStart = null;
    this.input.on('pointerdown', function(p) {
      this._touchStart = { x: p.x, y: p.y };
    }, this);
    this.input.on('pointerup', function(p) {
      if (!this._touchStart) return;
      var dx = p.x - this._touchStart.x;
      var dy = p.y - this._touchStart.y;
      this._touchStart = null;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        this.pac.queuedDir = dx > 0 ? 'right' : 'left';
      } else {
        this.pac.queuedDir = dy > 0 ? 'down' : 'up';
      }
    }, this);

    // Start first word
    this._startWord();
  },

  _drawMaze: function() {
    var g = this.mazeGfx;
    g.clear();
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        if (MAZE[r][c] === 1) {
          var x = MAZE_X + c * TILE;
          var y = MAZE_Y + r * TILE;
          g.fillStyle(0x090920, 1);
          g.fillRect(x, y, TILE, TILE);
          g.lineStyle(1, 0x2424aa, 1);
          g.strokeRect(x + 1, y + 1, TILE - 2, TILE - 2);
          g.lineStyle(1, 0x3c3cc8, 0.18);
          g.strokeRect(x + 3, y + 3, TILE - 6, TILE - 6);
        }
      }
    }
  },

  _startWord: function() {
    var lastWord = this.currentWord ? this.currentWord.word : null;
    this.currentWord = pickWord(WORDS, lastWord);
    this.wordProgress = 0;
    this._createWordSlots();
    this.hintText.setText(this.currentWord.hint);
    this._spawnGhosts();
    if (this.mode === 'challenge') this._spawnPellets();
    this._updateHUD();
  },

  _createWordSlots: function() {
    // Clear old slots
    this.wordSlots.forEach(function(t) { t.destroy(); });
    this.wordSlots = [];

    var word = this.currentWord.word;
    var slotW = 22;
    var totalW = word.length * slotW;
    var startX = 480 / 2 - totalW / 2;

    for (var i = 0; i < word.length; i++) {
      var ch = this.mode === 'guided'
        ? word[i]      // shown faintly
        : '_';         // hidden
      var slot = this.add.text(startX + i * slotW, 62, ch, {
        fontFamily: 'monospace', fontSize: '18px',
        color: this.mode === 'guided' ? '#444466' : '#aaaacc'
      });
      this.wordSlots.push(slot);
    }
  },

  _updateHUD: function() {
    var s = STRINGS[LANG];
    this.scoreLabel.setText(s.score + ': ' + this.score);
    this.levelLabel.setText(s.level + ': ' + this.level);
    var hearts = '';
    for (var i = 0; i < this.lives; i++) hearts += '❤';
    this.livesText.setText(hearts);
    this.shieldText.setVisible(this.mode === 'challenge' && this.shield);
  },

  update: function() {
    // Filled in Tasks 9-13
  }
});
```

- [ ] **Step 2: Open game in browser, click Play — verify maze draws, HUD shows, word slots appear.**

- [ ] **Step 3: Commit**

```bash
git add buchstabengeist/src/scenes/GameScene.js
git commit -m "feat: GameScene foundation — maze, HUD, word bar skeleton"
```

---

## Task 9: GameScene — Pac-Man Movement & Rendering

**Files:**
- Modify: `buchstabengeist/src/scenes/GameScene.js`

Add pac movement, keyboard/touch input processing, pac rendering, and stun logic. All changes go inside the `GameScene` class body.

- [ ] **Step 1: Add `_updateInput` method to GameScene (insert before the `update` method)**

```js
  _updateInput: function() {
    var dirs = ['up','down','left','right'];
    var keys = {
      up:    this.cursors.up.isDown    || this.wasd.up.isDown,
      down:  this.cursors.down.isDown  || this.wasd.down.isDown,
      left:  this.cursors.left.isDown  || this.wasd.left.isDown,
      right: this.cursors.right.isDown || this.wasd.right.isDown
    };
    for (var i = 0; i < dirs.length; i++) {
      if (keys[dirs[i]]) { this.pac.queuedDir = dirs[i]; break; }
    }
  },
```

- [ ] **Step 2: Add `_updatePac` method (insert before `update`)**

```js
  _updatePac: function() {
    var pac = this.pac;

    if (pac.stunnedFrames > 0) {
      pac.stunnedFrames--;
      return;
    }

    var tileR = Math.round(pac.r);
    var tileC = Math.round(pac.c);
    var aligned = Math.abs(pac.r - tileR) < 0.15 && Math.abs(pac.c - tileC) < 0.15;

    if (aligned) {
      // Snap to tile centre to prevent drift
      pac.r = tileR;
      pac.c = tileC;

      // Apply queued direction if valid
      if (pac.queuedDir && canMove(MAZE, tileR, tileC, pac.queuedDir)) {
        pac.dir = pac.queuedDir;
        pac.queuedDir = null;
      }

      // Stop if wall ahead
      if (!canMove(MAZE, tileR, tileC, pac.dir)) return;
    }

    var d = DIR_DELTA[pac.dir];
    pac.r += d.dr * 0.09;
    pac.c += d.dc * 0.09;

    // Tunnel wrap
    if (pac.c < -0.5) pac.c = COLS - 0.5;
    if (pac.c > COLS - 0.5) pac.c = -0.5;

    // Animate mouth
    if (pac.mouthOpen) {
      pac.mouthAngle += 0.06;
      if (pac.mouthAngle >= 0.42) pac.mouthOpen = false;
    } else {
      pac.mouthAngle -= 0.06;
      if (pac.mouthAngle <= 0) pac.mouthOpen = true;
    }
  },
```

- [ ] **Step 3: Add `_drawPac` method (insert before `update`)**

```js
  _drawPac: function() {
    var pac = this.pac;
    var g = this.pacGfx;
    g.clear();

    var p = entityPixel(pac.r, pac.c);
    var stunned = pac.stunnedFrames > 0;
    var color = stunned ? 0x888888 : 0xffe066;

    // Rotation angle based on direction
    var rot = { right: 0, down: Math.PI/2, left: Math.PI, up: -Math.PI/2 };
    var angle = rot[pac.dir] || 0;
    var mouth = stunned ? 0.42 : pac.mouthAngle;

    g.fillStyle(color, 1);
    g.beginPath();
    g.arc(p.x, p.y, PAC_RADIUS, angle + mouth, angle + Math.PI * 2 - mouth, false);
    g.lineTo(p.x, p.y);
    g.closePath();
    g.fillPath();
  },
```

- [ ] **Step 4: Replace the `update` method body**

```js
  update: function() {
    this._updateInput();
    this._updatePac();
    this._drawPac();
  },
```

- [ ] **Step 5: Open game in browser — pac-man should move through the maze with arrow keys and WASD. Verify mouth animates and tunnel wrap works.**

- [ ] **Step 6: Commit**

```bash
git add buchstabengeist/src/scenes/GameScene.js
git commit -m "feat: pac-man movement, input, rendering"
```

---

## Task 10: GameScene — Ghosts

**Files:**
- Modify: `buchstabengeist/src/scenes/GameScene.js`

Add ghost spawn, rendering (body + letter), and AI movement.

- [ ] **Step 1: Add `_spawnGhosts` method (insert before `update`)**

```js
  _spawnGhosts: function() {
    // Destroy old letter Text objects
    this.ghostLetters.forEach(function(t) { t.destroy(); });
    this.ghostLetters = [];
    this.ghosts = [];

    var word = this.currentWord.word;
    var openCells = [];
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        if (MAZE[r][c] === 0) openCells.push({ r: r, c: c });
      }
    }

    for (var i = 0; i < word.length; i++) {
      // Find cell away from pac start and previous ghosts
      var cell = null;
      for (var attempt = 0; attempt < 200; attempt++) {
        var candidate = openCells[Math.floor(Math.random() * openCells.length)];
        var distPac = Math.abs(candidate.r - PAC_START_R) + Math.abs(candidate.c - PAC_START_C);
        if (distPac < 6) continue;
        var tooClose = false;
        for (var j = 0; j < this.ghosts.length; j++) {
          if (Math.abs(candidate.r - this.ghosts[j].r) + Math.abs(candidate.c - this.ghosts[j].c) < 3) {
            tooClose = true; break;
          }
        }
        if (!tooClose) { cell = candidate; break; }
      }
      if (!cell) cell = openCells[Math.floor(Math.random() * openCells.length)];

      var dirs = ['up','down','left','right'];
      var startDir = dirs[Math.floor(Math.random() * dirs.length)];

      this.ghosts.push({
        r: cell.r + 0.5, c: cell.c + 0.5,
        dir: startDir,
        wordIdx: i,
        eaten: false,
        scared: false,
        scaredUntil: 0,
        baseSpeed: 0.038 + i * 0.003 + (this.level - 1) * 0.004,
        color: GHOST_COLORS[i % GHOST_COLORS.length]
      });

      this.ghostLetters.push(
        this.add.text(0, 0, word[i], {
          fontFamily: 'monospace', fontSize: '13px',
          color: '#ffffff', stroke: '#000000', strokeThickness: 2
        }).setOrigin(0.5)
      );
    }
  },
```

- [ ] **Step 2: Add `_updateGhosts` method (insert before `update`)**

```js
  _updateGhosts: function() {
    var now = this.time.now;
    var pac = this.pac;
    var guided = this.mode === 'guided';

    for (var i = 0; i < this.ghosts.length; i++) {
      var g = this.ghosts[i];
      if (g.eaten) continue;

      // Update scared state
      if (g.scared && now > g.scaredUntil) g.scared = false;

      var tileR = Math.round(g.r);
      var tileC = Math.round(g.c);
      var aligned = Math.abs(g.r - tileR) < 0.12 && Math.abs(g.c - tileC) < 0.12;

      if (aligned) {
        g.r = tileR;
        g.c = tileC;
        g.dir = chooseGhostDir(MAZE, g, pac, g.scared);
      }

      var speed = g.baseSpeed * (g.scared ? 0.45 : 1) * (guided ? 0.85 : 1);
      var d = DIR_DELTA[g.dir];
      g.r += d.dr * speed;
      g.c += d.dc * speed;

      // Tunnel wrap
      if (g.c < -0.5) g.c = COLS - 0.5;
      if (g.c > COLS - 0.5) g.c = -0.5;
    }
  },
```

- [ ] **Step 3: Add `_drawGhosts` method (insert before `update`)**

```js
  _drawGhosts: function() {
    var now = this.time.now;
    var gfx = this.ghostGfx;
    gfx.clear();

    var nextIdx = getNextTargetIdx(this.ghosts);
    var guided = this.mode === 'guided';

    for (var i = 0; i < this.ghosts.length; i++) {
      var gh = this.ghosts[i];
      if (gh.eaten) {
        this.ghostLetters[i].setVisible(false);
        continue;
      }

      var p = entityPixel(gh.r, gh.c);
      var R = GHOST_RADIUS;

      // Next-target halo
      if (i === nextIdx) {
        var haloAlpha = guided
          ? 0.4 + 0.2 * Math.sin(now * 0.006)
          : 0.22;
        gfx.fillStyle(0xffe066, haloAlpha);
        gfx.fillCircle(p.x, p.y, R + 5);
      }

      // Scared flash
      var flash = gh.scared && now > gh.scaredUntil - 600 && Math.floor(now / 100) % 2 === 0;
      var bodyColor = gh.scared ? (flash ? 0xffffff : 0x3333bb) : gh.color;

      // Ghost body: circle top + rect body + cut-out scallops
      gfx.fillStyle(bodyColor, 1);
      gfx.fillCircle(p.x, p.y, R);
      gfx.fillRect(p.x - R, p.y, R * 2, R * 1.3);

      // Scallop cut-outs (background colour)
      gfx.fillStyle(0x080818, 1);
      var scR = R / 3;
      gfx.fillCircle(p.x - R * 0.66, p.y + R * 1.3, scR);
      gfx.fillCircle(p.x,             p.y + R * 1.3, scR);
      gfx.fillCircle(p.x + R * 0.66, p.y + R * 1.3, scR);

      // Eyes (hidden when scared)
      if (!gh.scared) {
        gfx.fillStyle(0xffffff, 1);
        gfx.fillCircle(p.x - R * 0.32, p.y - R * 0.1, R * 0.28);
        gfx.fillCircle(p.x + R * 0.32, p.y - R * 0.1, R * 0.28);
        var eyeShift = { up:[0,-0.18], down:[0,0.18], left:[-0.18,0], right:[0.18,0] };
        var es = eyeShift[gh.dir] || [0,0];
        gfx.fillStyle(0x0033cc, 1);
        gfx.fillCircle(p.x - R*0.32 + es[0]*R, p.y - R*0.1 + es[1]*R, R*0.14);
        gfx.fillCircle(p.x + R*0.32 + es[0]*R, p.y - R*0.1 + es[1]*R, R*0.14);
      }

      // Position letter text
      this.ghostLetters[i].setVisible(!gh.scared);
      this.ghostLetters[i].setPosition(p.x, p.y + 1);
    }
  },
```

- [ ] **Step 4: Update `update` method**

```js
  update: function() {
    this._updateInput();
    this._updatePac();
    this._updateGhosts();
    this._drawPac();
    this._drawGhosts();
  },
```

- [ ] **Step 5: Open game in browser — ghosts should appear, move through the maze, and have letters visible. Next-target ghost should have a yellow halo.**

- [ ] **Step 6: Commit**

```bash
git add buchstabengeist/src/scenes/GameScene.js
git commit -m "feat: ghost spawn, AI movement, rendering"
```

---

## Task 11: GameScene — Collision, Word Logic & HUD Updates

**Files:**
- Modify: `buchstabengeist/src/scenes/GameScene.js`

- [ ] **Step 1: Add `_scatterGhosts` helper (insert before `update`)**

```js
  _scatterGhosts: function() {
    var now = this.time.now;
    for (var i = 0; i < this.ghosts.length; i++) {
      if (!this.ghosts[i].eaten) {
        this.ghosts[i].scared = true;
        this.ghosts[i].scaredUntil = now + 2000;
      }
    }
  },
```

- [ ] **Step 2: Add `_stunPac` helper (insert before `update`)**

```js
  _stunPac: function() {
    this.pac.stunnedFrames = 55;
    this.pac.mouthAngle = 0.42;
  },
```

- [ ] **Step 3: Add `_loseLife` helper (insert before `update`)**

```js
  _loseLife: function() {
    this.lives--;
    this._updateHUD();
    if (this.lives <= 0) {
      this.time.delayedCall(600, function() {
        this.ghostLetters.forEach(function(t) { t.destroy(); });
        this.scene.start('GameOverScene', { score: this.score, lang: LANG });
      }, [], this);
    }
  },
```

- [ ] **Step 4: Add `_handleWordComplete` (insert before `update`)**

```js
  _handleWordComplete: function() {
    this.score = Math.max(0, this.score + calcScoreDelta('wordComplete', this.level));
    AudioManager.wordComplete();
    var self = this;

    // Flash text
    var flash = this.add.text(240, 330, STRINGS[LANG].wordComplete, {
      fontFamily: 'monospace', fontSize: '28px', color: '#f5e642',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(10);
    this.tweens.add({
      targets: flash,
      scaleX: { from: 0, to: 1 }, scaleY: { from: 0, to: 1 },
      alpha: { from: 1, to: 0 },
      duration: 1100, ease: 'Back.Out',
      onComplete: function() { flash.destroy(); }
    });

    this.time.delayedCall(1300, function() {
      self.level++;
      self._startWord();
    });
  },
```

- [ ] **Step 5: Add `_checkCollisions` method (insert before `update`)**

```js
  _checkCollisions: function() {
    if (this.pac.stunnedFrames > 0) return;

    var pac = this.pac;
    var now = this.time.now;
    var nextIdx = getNextTargetIdx(this.ghosts);

    for (var i = 0; i < this.ghosts.length; i++) {
      var gh = this.ghosts[i];
      if (gh.eaten) continue;

      if (!ghostOverlapsPac(pac, gh)) continue;

      // Ghost catches pac (not scared)
      if (!gh.scared) {
        if (gh.wordIdx === nextIdx) {
          // Correct eat
          gh.eaten = true;
          this.wordProgress++;
          this.score = Math.max(0, this.score + calcScoreDelta('correctEat', this.level));
          AudioManager.correctEat(this.wordProgress - 1);
          this._fillWordSlot(gh.wordIdx);
          this._updateHUD();

          if (this.wordProgress >= this.currentWord.word.length) {
            this._handleWordComplete();
          }
        } else {
          // Wrong eat
          if (this.mode === 'challenge') {
            if (this.shield) {
              this.shield = false;
              AudioManager.shieldUsed();
              this._scatterGhosts();
              this._stunPac();
              this._updateHUD();
            } else {
              this.score = Math.max(0, this.score + calcScoreDelta('wrongEat', this.level));
              AudioManager.wrongEat();
              this._scatterGhosts();
              this._stunPac();
              this._shakeSlot(nextIdx);
              this._loseLife();
            }
          } else {
            // Guided: scatter + stun, no life loss
            AudioManager.wrongEat();
            this._scatterGhosts();
            this._stunPac();
            this._shakeSlot(nextIdx);
          }
        }
        return; // one collision per frame
      } else {
        // Pac touches scared ghost — just pass through (scared ghosts not catchable)
      }
    }

    // Ghost catches pac: ghost is NOT scared AND pac is NOT stunned
    // (pac is stunned check is at top — if we reach here pac is not stunned)
    // Ghost-catches-pac means ghost walks into pac, handled above when gh.wordIdx !== nextIdx
    // but for non-word ghosts catching pac, use general proximity above (already handled).
    // If no wrong eat happened above, check if any non-scared ghost is on pac (caught pac):
    // Note: the above loop already handles catch-pac since we check all overlapping ghosts.
    // The distinction "ghost catches pac vs pac eats ghost" is resolved by the scared state:
    // scared ghost = pac eats it (but only if correct order); not scared = collision = eat attempt.
  },
```

- [ ] **Step 6: Add word slot fill/shake tweens (insert before `update`)**

```js
  _fillWordSlot: function(idx) {
    if (idx >= this.wordSlots.length) return;
    var slot = this.wordSlots[idx];
    slot.setText(this.currentWord.word[idx]);
    slot.setColor('#f5e642');
    this.tweens.add({
      targets: slot,
      scaleX: { from: 0, to: 1 }, scaleY: { from: 0, to: 1 },
      duration: 200, ease: 'Back.Out'
    });
  },

  _shakeSlot: function(idx) {
    if (idx >= this.wordSlots.length) return;
    var slot = this.wordSlots[idx];
    var origX = slot.x;
    this.tweens.add({
      targets: slot,
      x: { from: origX - 5, to: origX + 5 },
      duration: 60, yoyo: true, repeat: 3,
      onComplete: function() { slot.setX(origX); }
    });
  },
```

- [ ] **Step 7: Update `update` to call collision check**

```js
  update: function() {
    this._updateInput();
    this._updatePac();
    this._updateGhosts();
    this._checkCollisions();
    this._drawPac();
    this._drawGhosts();
  },
```

- [ ] **Step 8: Open game in browser — eating ghosts in order should fill word slots, wrong eat scatters ghosts and loses a life in Challenge mode. Completing the word should flash and advance the level.**

- [ ] **Step 9: Commit**

```bash
git add buchstabengeist/src/scenes/GameScene.js
git commit -m "feat: collision detection, word logic, HUD updates"
```

---

## Task 12: GameScene — Power Pellets (Challenge Mode)

**Files:**
- Modify: `buchstabengeist/src/scenes/GameScene.js`

- [ ] **Step 1: Add `_spawnPellets` method (insert before `update`)**

```js
  _spawnPellets: function() {
    this.pellets = [];
    // One pellet per quadrant: top-left, top-right, bottom-left, bottom-right
    var quadrants = [
      { rMin: 1, rMax: 9,  cMin: 1, cMax: 8  },
      { rMin: 1, rMax: 9,  cMin: 10, cMax: 17 },
      { rMin: 11, rMax: 19, cMin: 1, cMax: 8  },
      { rMin: 11, rMax: 19, cMin: 10, cMax: 17 }
    ];
    quadrants.forEach(function(q) {
      var candidates = [];
      for (var r = q.rMin; r <= q.rMax; r++) {
        for (var c = q.cMin; c <= q.cMax; c++) {
          if (MAZE[r][c] === 0) candidates.push({ r: r, c: c });
        }
      }
      if (candidates.length > 0) {
        this.pellets.push(candidates[Math.floor(Math.random() * candidates.length)]);
      }
    }, this);
  },
```

- [ ] **Step 2: Add `_drawPellets` method (insert before `update`)**

```js
  _drawPellets: function() {
    var gfx = this.pelletGfx;
    gfx.clear();
    if (this.mode !== 'challenge') return;
    var now = this.time.now;
    var pulse = 7 + 2 * Math.sin(now * 0.004);

    this.pellets.forEach(function(pel) {
      if (pel.collected) return;
      var p = entityPixel(pel.r + 0.5, pel.c + 0.5);
      gfx.fillStyle(0xfffbb0, 0.9);
      gfx.fillCircle(p.x, p.y, pulse);
      gfx.lineStyle(2, 0xffe066, 0.6);
      gfx.strokeCircle(p.x, p.y, pulse + 3);
    });
  },
```

- [ ] **Step 3: Add `_checkPellets` method (insert before `update`)**

```js
  _checkPellets: function() {
    if (this.mode !== 'challenge') return;
    var pac = this.pac;
    for (var i = 0; i < this.pellets.length; i++) {
      var pel = this.pellets[i];
      if (pel.collected) continue;
      var distR = Math.abs(pac.r - (pel.r + 0.5));
      var distC = Math.abs(pac.c - (pel.c + 0.5));
      if (distR < 0.55 && distC < 0.55) {
        pel.collected = true;
        if (this.shield) {
          this.score = Math.max(0, this.score + calcScoreDelta('sparePellet', this.level));
        } else {
          this.shield = true;
        }
        AudioManager.powerPellet();
        this._updateHUD();
      }
    }
  },
```

- [ ] **Step 4: Update `update` method to include pellets**

```js
  update: function() {
    this._updateInput();
    this._updatePac();
    this._updateGhosts();
    this._checkCollisions();
    this._checkPellets();
    this._drawPac();
    this._drawGhosts();
    this._drawPellets();
  },
```

- [ ] **Step 5: Open game in browser in Challenge mode — pulsing pellets should appear in each quadrant. Collecting one should show the shield icon (🛡) in the HUD.**

- [ ] **Step 6: Commit**

```bash
git add buchstabengeist/src/scenes/GameScene.js
git commit -m "feat: power pellets and shield (Challenge mode)"
```

---

## Task 13: GameOverScene

**Files:**
- Create: `buchstabengeist/src/scenes/GameOverScene.js`

- [ ] **Step 1: Create `buchstabengeist/src/scenes/GameOverScene.js`**

```js
var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameOverScene' }); },

  init: function(data) {
    this._score = data.score || 0;
  },

  create: function() {
    var W = 480, H = 660;
    var s = STRINGS[LANG];

    this.add.rectangle(W/2, H/2, W, H, 0x080818);

    this.add.text(W/2, 200, s.gameOver, {
      fontFamily: 'monospace', fontSize: '32px', color: '#ff6b6b',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(W/2, 255, s.livesOut, {
      fontFamily: 'monospace', fontSize: '14px', color: '#aaaacc'
    }).setOrigin(0.5);

    this.add.text(W/2, 310, s.score + ': ' + this._score, {
      fontFamily: 'monospace', fontSize: '22px', color: '#f5e642'
    }).setOrigin(0.5);

    var btn = this.add.text(W/2, 390, s.playAgain, {
      fontFamily: 'monospace', fontSize: '20px', color: '#ffffff',
      backgroundColor: '#2c2c5a', padding: { x: 24, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', function() { btn.setColor('#f5e642'); });
    btn.on('pointerout',  function() { btn.setColor('#ffffff'); });
    btn.on('pointerdown', function() { this.scene.start('MenuScene'); }, this);

    this.add.text(W/2, 460, '👻', { fontSize: '48px' }).setOrigin(0.5);
  }
});
```

- [ ] **Step 2: Verify game over screen appears when lives reach 0, shows score, and Play Again returns to MenuScene.**

- [ ] **Step 3: Commit**

```bash
git add buchstabengeist/src/scenes/GameOverScene.js
git commit -m "feat: GameOverScene with score and play again"
```

---

## Task 14: Run All Tests & Final Polish

**Files:**
- Modify: `buchstabengeist/src/scenes/GameScene.js` (minor fix if needed)

- [ ] **Step 1: Run all tests**

```bash
node buchstabengeist/tests/strings.test.js
node buchstabengeist/tests/words.test.js
node buchstabengeist/tests/logic.test.js
```

Expected: all PASS, no errors.

- [ ] **Step 2: Smoke test — EN locale**

Open `buchstabengeist/index.html` in browser with `localStorage.setItem('pgame_lang','en')` set (run in console). Verify:
- Back button says `← Overview`
- Menu shows CHALLENGE / GUIDED labels in English
- HUD shows Score / Level / Lives labels
- Word hints are English

- [ ] **Step 3: Smoke test — DE locale**

Set `localStorage.setItem('pgame_lang','de')` and reload. Verify:
- Back button says `← Übersicht`
- Menu shows PROFI / LERNMODUS
- HUD shows Punkte / Level / Leben
- Word hints are German

- [ ] **Step 4: Smoke test — mobile**

Open in browser DevTools with a mobile viewport (e.g. iPhone 12 Pro, 390×844). Verify:
- Canvas fills screen with FIT scaling
- Swipe gestures move pac-man

- [ ] **Step 5: Smoke test — Guided mode**

Start a game in Guided mode. Verify:
- Word letters are shown faintly in word bar
- Next target ghost has bright pulsing halo
- Wrong eat does not reduce lives

- [ ] **Step 6: Final commit**

```bash
cd /home/dev/vibe-coding-games
git add buchstabengeist/
git commit -m "feat: buchstabengeist complete — Phaser 3, EN/DE, mobile, PWA"
```
