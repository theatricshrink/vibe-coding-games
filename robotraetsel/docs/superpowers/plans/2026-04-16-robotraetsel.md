# Roboträtsel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hangman-style word guessing game where wrong guesses assemble a pixel-art robot that threatens world domination, with a word-chain mechanic and category hints.

**Architecture:** Single Phaser 3 GameScene (960×720) — all game logic lives there. Robot drawing uses the same pixel-art Graphics technique as pflanzenwelt's `_drawPlayer`. WordPool utility extracted to its own file for testability.

**Tech Stack:** Vanilla JS (ES5), Phaser 3.60, no bundler; tests run via `node tests/wordPool.test.js`

---

## File Map

| File | Create / Modify | Responsibility |
|---|---|---|
| `robotraetsel/index.html` | Create | Script loading order, back button |
| `robotraetsel/main.js` | Create | Phaser config |
| `robotraetsel/src/i18n/lang.js` | Create | Read `pgame_lang` from localStorage |
| `robotraetsel/src/i18n/strings.js` | Create | All UI strings in DE + EN |
| `robotraetsel/src/data/words.js` | Create | Full word pool (DE + EN) |
| `robotraetsel/src/utils/wordPool.js` | Create | Draw words with bucket + chain constraint logic |
| `robotraetsel/src/scenes/StartScene.js` | Create | Title screen |
| `robotraetsel/src/scenes/GameScene.js` | Create | All game logic |
| `robotraetsel/src/scenes/WinScene.js` | Create | Win celebration screen |
| `robotraetsel/tests/wordPool.test.js` | Create | Unit tests for WordPool |
| `index.html` (repo root) | Modify | Add 🤖 Roboträtsel portal card |

---

## Task 1: Project Scaffold

**Files:**
- Create: `robotraetsel/index.html`
- Create: `robotraetsel/main.js`
- Create: `robotraetsel/src/i18n/lang.js`

- [ ] **Step 1: Create `robotraetsel/src/i18n/lang.js`**

```js
// robotraetsel/src/i18n/lang.js
var LANG = (localStorage.getItem('pgame_lang') === 'en') ? 'en' : 'de';
```

- [ ] **Step 2: Create `robotraetsel/main.js`**

```js
// robotraetsel/main.js
var config = {
  type: Phaser.AUTO,
  backgroundColor: '#1a1a2e',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 720
  },
  scene: [StartScene, GameScene, WinScene]
};

var game = new Phaser.Game(config);
```

- [ ] **Step 3: Create `robotraetsel/index.html`**

```html
<!DOCTYPE html>
<html lang="de" id="html-root">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Roboträtsel</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #1a1a2e; }
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
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
  <script src="src/i18n/lang.js"></script>
  <script>
    document.getElementById('html-root').lang = LANG;
    document.getElementById('back-btn').textContent = LANG === 'en' ? '← Overview' : '← Übersicht';
  </script>
  <script src="src/data/words.js"></script>
  <script src="src/i18n/strings.js"></script>
  <script src="src/utils/wordPool.js"></script>
  <script src="src/scenes/StartScene.js"></script>
  <script src="src/scenes/GameScene.js"></script>
  <script src="src/scenes/WinScene.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Commit**

```bash
git add robotraetsel/index.html robotraetsel/main.js robotraetsel/src/i18n/lang.js
git commit -m "feat(robotraetsel): scaffold project structure"
```

---

## Task 2: WordPool Utility + Tests

**Files:**
- Create: `robotraetsel/src/utils/wordPool.js`
- Create: `robotraetsel/tests/wordPool.test.js`

- [ ] **Step 1: Write the failing tests**

Create `robotraetsel/tests/wordPool.test.js`:

```js
// robotraetsel/tests/wordPool.test.js
function assert(condition, message) {
  if (!condition) throw new Error('FAIL: ' + message);
  console.log('PASS: ' + message);
}

var WordPool = require('../src/utils/wordPool');

var testWords = [
  { word: 'HUND',    category: 'animal', lang: 'de' }, // 4
  { word: 'KATZE',   category: 'animal', lang: 'de' }, // 5
  { word: 'VOGEL',   category: 'animal', lang: 'de' }, // 5
  { word: 'ELEFANT', category: 'animal', lang: 'de' }, // 7
  { word: 'PINGUIN', category: 'animal', lang: 'de' }, // 7
  { word: 'KROKODIL',category: 'animal', lang: 'de' }, // 8
  { word: 'SCHMETTERLING', category: 'animal', lang: 'de' }, // 13
  { word: 'SCHILDKRÖTE',   category: 'animal', lang: 'de' }, // 11
  { word: 'BEAR',    category: 'animal', lang: 'en' }, // 4
  { word: 'LION',    category: 'animal', lang: 'en' }, // 4
  { word: 'DOLPHIN', category: 'animal', lang: 'en' }, // 7
  { word: 'CHIMPANZEE', category: 'animal', lang: 'en' }, // 10
];

// Test 1: only returns words matching lang
var pool = new WordPool(testWords, 'de');
var w = pool.draw(0, null);
assert(w.lang === 'de', 'draw returns only de words');

// Test 2: chain 0 → 4-6 letter word
pool = new WordPool(testWords, 'de');
w = pool.draw(0, null);
assert(w.word.length >= 4 && w.word.length <= 6, 'chain 0 returns 4-6 letter word');

// Test 3: chain 3 → 7-9 letter word
pool = new WordPool(testWords, 'de');
w = pool.draw(3, null);
assert(w.word.length >= 7 && w.word.length <= 9, 'chain 3 returns 7-9 letter word');

// Test 4: chain 6 → 10+ letter word
pool = new WordPool(testWords, 'de');
w = pool.draw(6, null);
assert(w.word.length >= 10, 'chain 6 returns 10+ letter word');

// Test 5: chain constraint filters by starting letter
pool = new WordPool(testWords, 'de');
w = pool.draw(0, 'K'); // KATZE is the only 4-6 letter word starting with K
assert(w.word[0] === 'K', 'chain constraint returns word starting with K');

// Test 6: chain constraint fallback when no matching word
pool = new WordPool(testWords, 'de');
w = pool.draw(0, 'Z'); // no 4-6 letter de word starts with Z → falls back
assert(w.lang === 'de' && w.word.length >= 4 && w.word.length <= 6,
  'chain constraint fallback: returns valid word when no match');

// Test 7: no replacement within a session
pool = new WordPool(testWords, 'de');
var drawn = {};
drawn[pool.draw(0, null).word] = true;
drawn[pool.draw(0, null).word] = true;
drawn[pool.draw(0, null).word] = true;
assert(Object.keys(drawn).length === 3, 'no replacement: 3 unique words before reset');

// Test 8: pool resets after exhaustion and continues drawing
pool = new WordPool(testWords, 'de');
pool.draw(0, null); pool.draw(0, null); pool.draw(0, null); // exhaust short bucket
var wAfterReset = pool.draw(0, null);
assert(wAfterReset && wAfterReset.lang === 'de', 'pool resets after exhaustion');

console.log('\nAll wordPool tests passed.');
```

- [ ] **Step 2: Run — verify tests fail**

```bash
cd /home/dev/vibe-coding-games
node robotraetsel/tests/wordPool.test.js
```

Expected: `Error: Cannot find module '../src/utils/wordPool'`

- [ ] **Step 3: Implement `robotraetsel/src/utils/wordPool.js`**

```js
// robotraetsel/src/utils/wordPool.js
function WordPool(words, lang) {
  this._all       = words.filter(function(w) { return w.lang === lang; });
  this._remaining = this._all.slice();
}

WordPool.prototype._getBucket = function(chainLength) {
  if (chainLength <= 2) return { min: 4, max: 6 };
  if (chainLength <= 5) return { min: 7, max: 9 };
  return { min: 10, max: 99 };
};

WordPool.prototype.draw = function(chainLength, startLetter) {
  var bucket = this._getBucket(chainLength);

  function inBucket(w) {
    return w.word.length >= bucket.min && w.word.length <= bucket.max;
  }

  var pool = this._remaining.filter(function(w) {
    return inBucket(w) && (!startLetter || w.word[0] === startLetter);
  });

  // Fallback 1: drop chain constraint if no matching word
  if (pool.length === 0 && startLetter) {
    pool = this._remaining.filter(inBucket);
  }

  // Fallback 2: reset pool when bucket is fully exhausted
  if (pool.length === 0) {
    this._remaining = this._all.slice();
    pool = this._remaining.filter(inBucket);
  }

  var word = pool[Math.floor(Math.random() * pool.length)];
  this._remaining.splice(this._remaining.indexOf(word), 1);
  return word;
};

if (typeof module !== 'undefined') module.exports = WordPool;
```

- [ ] **Step 4: Run — verify tests pass**

```bash
node robotraetsel/tests/wordPool.test.js
```

Expected: all 8 `PASS:` lines, then `All wordPool tests passed.`

- [ ] **Step 5: Commit**

```bash
git add robotraetsel/src/utils/wordPool.js robotraetsel/tests/wordPool.test.js
git commit -m "feat(robotraetsel): add WordPool utility with tests"
```

---

## Task 3: Word Data

**Files:**
- Create: `robotraetsel/src/data/words.js`

- [ ] **Step 1: Create `robotraetsel/src/data/words.js`**

Each entry: `{ word: 'UPPERCASE', category: 'animal|country|profession|plant|food|sport', lang: 'de'|'en' }`. All DE words use actual umlauts (Ä, Ö, Ü).

```js
// robotraetsel/src/data/words.js
var WORDS = [
  // ── DE ANIMALS ─────────────────────────────────────────────────────────────
  { word: 'HUND',          category: 'animal', lang: 'de' }, // 4
  { word: 'MAUS',          category: 'animal', lang: 'de' }, // 4
  { word: 'BUCH',          category: 'animal', lang: 'de' }, // 4
  { word: 'ADLER',         category: 'animal', lang: 'de' }, // 5
  { word: 'KATZE',         category: 'animal', lang: 'de' }, // 5
  { word: 'PFERD',         category: 'animal', lang: 'de' }, // 5
  { word: 'VOGEL',         category: 'animal', lang: 'de' }, // 5
  { word: 'OTTER',         category: 'animal', lang: 'de' }, // 5
  { word: 'LUCHS',         category: 'animal', lang: 'de' }, // 5
  { word: 'ELEFANT',       category: 'animal', lang: 'de' }, // 7
  { word: 'PINGUIN',       category: 'animal', lang: 'de' }, // 7
  { word: 'DELPHIN',       category: 'animal', lang: 'de' }, // 7
  { word: 'GORILLA',       category: 'animal', lang: 'de' }, // 7
  { word: 'LEOPARD',       category: 'animal', lang: 'de' }, // 7
  { word: 'FLAMINGO',      category: 'animal', lang: 'de' }, // 8
  { word: 'KROKODIL',      category: 'animal', lang: 'de' }, // 8
  { word: 'SCHMETTERLING', category: 'animal', lang: 'de' }, // 13
  { word: 'SCHILDKRÖTE',   category: 'animal', lang: 'de' }, // 11
  { word: 'NASHORNKÄFER',  category: 'animal', lang: 'de' }, // 12
  { word: 'ZITRONENFALTER',category: 'animal', lang: 'de' }, // 14
  // ── DE COUNTRIES ──────────────────────────────────────────────────────────
  { word: 'IRAN',          category: 'country', lang: 'de' }, // 4
  { word: 'PERU',          category: 'country', lang: 'de' }, // 4
  { word: 'KUBA',          category: 'country', lang: 'de' }, // 4
  { word: 'CHINA',         category: 'country', lang: 'de' }, // 5
  { word: 'JAPAN',         category: 'country', lang: 'de' }, // 5
  { word: 'CHILE',         category: 'country', lang: 'de' }, // 5
  { word: 'INDIEN',        category: 'country', lang: 'de' }, // 6
  { word: 'TÜRKEI',        category: 'country', lang: 'de' }, // 6
  { word: 'SPANIEN',       category: 'country', lang: 'de' }, // 7
  { word: 'ITALIEN',       category: 'country', lang: 'de' }, // 7
  { word: 'ENGLAND',       category: 'country', lang: 'de' }, // 7
  { word: 'BELGIEN',       category: 'country', lang: 'de' }, // 7
  { word: 'PORTUGAL',      category: 'country', lang: 'de' }, // 8
  { word: 'SCHWEDEN',      category: 'country', lang: 'de' }, // 8
  { word: 'NORWEGEN',      category: 'country', lang: 'de' }, // 8
  { word: 'BRASILIEN',     category: 'country', lang: 'de' }, // 9
  { word: 'SÜDAFRIKA',     category: 'country', lang: 'de' }, // 9
  { word: 'NIEDERLANDE',   category: 'country', lang: 'de' }, // 11
  { word: 'NEUSEELAND',    category: 'country', lang: 'de' }, // 10
  { word: 'GROSSBRITANNIEN',category: 'country', lang: 'de' }, // 14
  // ── DE PROFESSIONS ────────────────────────────────────────────────────────
  { word: 'ARZT',          category: 'profession', lang: 'de' }, // 4
  { word: 'PILOT',         category: 'profession', lang: 'de' }, // 5
  { word: 'BÄCKER',        category: 'profession', lang: 'de' }, // 6
  { word: 'LEHRER',        category: 'profession', lang: 'de' }, // 6
  { word: 'MAURER',        category: 'profession', lang: 'de' }, // 6
  { word: 'LEHRERIN',      category: 'profession', lang: 'de' }, // 8
  { word: 'INGENIEUR',     category: 'profession', lang: 'de' }, // 9
  { word: 'APOTHEKER',     category: 'profession', lang: 'de' }, // 9
  { word: 'ARCHITEKT',     category: 'profession', lang: 'de' }, // 9
  { word: 'SCHREINER',     category: 'profession', lang: 'de' }, // 9
  { word: 'BUCHHALTER',    category: 'profession', lang: 'de' }, // 10
  { word: 'RECHTSANWALT',  category: 'profession', lang: 'de' }, // 12
  { word: 'FEUERWEHRMANN', category: 'profession', lang: 'de' }, // 13
  { word: 'STEUERBERATER', category: 'profession', lang: 'de' }, // 13
  // ── DE PLANTS ─────────────────────────────────────────────────────────────
  { word: 'ROSE',          category: 'plant', lang: 'de' }, // 4
  { word: 'MOHN',          category: 'plant', lang: 'de' }, // 4
  { word: 'EFEU',          category: 'plant', lang: 'de' }, // 4
  { word: 'BIRKE',         category: 'plant', lang: 'de' }, // 5
  { word: 'EICHE',         category: 'plant', lang: 'de' }, // 5
  { word: 'TULPE',         category: 'plant', lang: 'de' }, // 5
  { word: 'KAKTUS',        category: 'plant', lang: 'de' }, // 6
  { word: 'FICHTE',        category: 'plant', lang: 'de' }, // 6
  { word: 'FLIEDER',       category: 'plant', lang: 'de' }, // 7
  { word: 'LAVENDEL',      category: 'plant', lang: 'de' }, // 8
  { word: 'ORCHIDEE',      category: 'plant', lang: 'de' }, // 8
  { word: 'FORSYTHIE',     category: 'plant', lang: 'de' }, // 9
  { word: 'SONNENBLUME',   category: 'plant', lang: 'de' }, // 11
  { word: 'MAIGLÖCKCHEN',  category: 'plant', lang: 'de' }, // 12
  { word: 'VERGISSMEINNICHT', category: 'plant', lang: 'de' }, // 16
  // ── DE FOOD ───────────────────────────────────────────────────────────────
  { word: 'BROT',          category: 'food', lang: 'de' }, // 4
  { word: 'KÄSE',          category: 'food', lang: 'de' }, // 4
  { word: 'APFEL',         category: 'food', lang: 'de' }, // 5
  { word: 'SUPPE',         category: 'food', lang: 'de' }, // 5
  { word: 'PIZZA',         category: 'food', lang: 'de' }, // 5
  { word: 'NUDELN',        category: 'food', lang: 'de' }, // 6
  { word: 'ZWIEBEL',       category: 'food', lang: 'de' }, // 7
  { word: 'ERDBEERE',      category: 'food', lang: 'de' }, // 8
  { word: 'BROKKOLI',      category: 'food', lang: 'de' }, // 8
  { word: 'KARTOFFEL',     category: 'food', lang: 'de' }, // 9
  { word: 'AVOCADO',       category: 'food', lang: 'de' }, // 7
  { word: 'SCHOKOLADE',    category: 'food', lang: 'de' }, // 10
  { word: 'BLUMENKOHL',    category: 'food', lang: 'de' }, // 10
  { word: 'ERDBEERMARMELADE', category: 'food', lang: 'de' }, // 17
  // ── DE SPORT ──────────────────────────────────────────────────────────────
  { word: 'GOLF',          category: 'sport', lang: 'de' }, // 4
  { word: 'JUDO',          category: 'sport', lang: 'de' }, // 4
  { word: 'POLO',          category: 'sport', lang: 'de' }, // 4
  { word: 'YOGA',          category: 'sport', lang: 'de' }, // 4
  { word: 'BOXEN',         category: 'sport', lang: 'de' }, // 5
  { word: 'SURFEN',        category: 'sport', lang: 'de' }, // 6
  { word: 'FECHTEN',       category: 'sport', lang: 'de' }, // 7
  { word: 'BOWLING',       category: 'sport', lang: 'de' }, // 7
  { word: 'TURNEN',        category: 'sport', lang: 'de' }, // 6
  { word: 'KLETTERN',      category: 'sport', lang: 'de' }, // 8
  { word: 'SCHWIMMEN',     category: 'sport', lang: 'de' }, // 9
  { word: 'RADFAHREN',     category: 'sport', lang: 'de' }, // 9
  { word: 'SKIFAHREN',     category: 'sport', lang: 'de' }, // 9
  { word: 'TISCHTENNIS',   category: 'sport', lang: 'de' }, // 11
  { word: 'VOLLEYBALL',    category: 'sport', lang: 'de' }, // 10
  { word: 'WASSERPOLO',    category: 'sport', lang: 'de' }, // 10
  { word: 'LEICHTATHLETIK',category: 'sport', lang: 'de' }, // 14

  // ── EN ANIMALS ─────────────────────────────────────────────────────────────
  { word: 'BEAR',          category: 'animal', lang: 'en' }, // 4
  { word: 'LION',          category: 'animal', lang: 'en' }, // 4
  { word: 'WOLF',          category: 'animal', lang: 'en' }, // 4
  { word: 'DUCK',          category: 'animal', lang: 'en' }, // 4
  { word: 'FROG',          category: 'animal', lang: 'en' }, // 4
  { word: 'CROW',          category: 'animal', lang: 'en' }, // 4
  { word: 'DOLPHIN',       category: 'animal', lang: 'en' }, // 7
  { word: 'PENGUIN',       category: 'animal', lang: 'en' }, // 7
  { word: 'LEOPARD',       category: 'animal', lang: 'en' }, // 7
  { word: 'GORILLA',       category: 'animal', lang: 'en' }, // 7
  { word: 'FLAMINGO',      category: 'animal', lang: 'en' }, // 8
  { word: 'CROCODILE',     category: 'animal', lang: 'en' }, // 9
  { word: 'CHIMPANZEE',    category: 'animal', lang: 'en' }, // 10
  { word: 'RHINOCEROS',    category: 'animal', lang: 'en' }, // 10
  { word: 'SALAMANDER',    category: 'animal', lang: 'en' }, // 10
  { word: 'GRASSHOPPER',   category: 'animal', lang: 'en' }, // 11
  // ── EN COUNTRIES ──────────────────────────────────────────────────────────
  { word: 'CUBA',          category: 'country', lang: 'en' }, // 4
  { word: 'IRAN',          category: 'country', lang: 'en' }, // 4
  { word: 'PERU',          category: 'country', lang: 'en' }, // 4
  { word: 'INDIA',         category: 'country', lang: 'en' }, // 5
  { word: 'CHINA',         category: 'country', lang: 'en' }, // 5
  { word: 'SPAIN',         category: 'country', lang: 'en' }, // 5
  { word: 'JAPAN',         category: 'country', lang: 'en' }, // 5
  { word: 'FRANCE',        category: 'country', lang: 'en' }, // 6
  { word: 'GERMANY',       category: 'country', lang: 'en' }, // 7
  { word: 'ENGLAND',       category: 'country', lang: 'en' }, // 7
  { word: 'BELGIUM',       category: 'country', lang: 'en' }, // 7
  { word: 'DENMARK',       category: 'country', lang: 'en' }, // 7
  { word: 'AUSTRIA',       category: 'country', lang: 'en' }, // 7
  { word: 'NIGERIA',       category: 'country', lang: 'en' }, // 7
  { word: 'PORTUGAL',      category: 'country', lang: 'en' }, // 8
  { word: 'TANZANIA',      category: 'country', lang: 'en' }, // 8
  { word: 'BANGLADESH',    category: 'country', lang: 'en' }, // 10
  { word: 'MOZAMBIQUE',    category: 'country', lang: 'en' }, // 10
  { word: 'NETHERLANDS',   category: 'country', lang: 'en' }, // 11
  { word: 'SWITZERLAND',   category: 'country', lang: 'en' }, // 11
  // ── EN PROFESSIONS ────────────────────────────────────────────────────────
  { word: 'CHEF',          category: 'profession', lang: 'en' }, // 4
  { word: 'NURSE',         category: 'profession', lang: 'en' }, // 5
  { word: 'PILOT',         category: 'profession', lang: 'en' }, // 5
  { word: 'JUDGE',         category: 'profession', lang: 'en' }, // 5
  { word: 'COACH',         category: 'profession', lang: 'en' }, // 5
  { word: 'TEACHER',       category: 'profession', lang: 'en' }, // 7
  { word: 'PLUMBER',       category: 'profession', lang: 'en' }, // 7
  { word: 'DENTIST',       category: 'profession', lang: 'en' }, // 7
  { word: 'SURGEON',       category: 'profession', lang: 'en' }, // 7
  { word: 'PAINTER',       category: 'profession', lang: 'en' }, // 7
  { word: 'SOLDIER',       category: 'profession', lang: 'en' }, // 7
  { word: 'LIBRARIAN',     category: 'profession', lang: 'en' }, // 9
  { word: 'ACCOUNTANT',    category: 'profession', lang: 'en' }, // 10
  { word: 'PHARMACIST',    category: 'profession', lang: 'en' }, // 10
  { word: 'JOURNALIST',    category: 'profession', lang: 'en' }, // 10
  { word: 'FIREFIGHTER',   category: 'profession', lang: 'en' }, // 11
  { word: 'ELECTRICIAN',   category: 'profession', lang: 'en' }, // 11
  // ── EN PLANTS ─────────────────────────────────────────────────────────────
  { word: 'ROSE',          category: 'plant', lang: 'en' }, // 4
  { word: 'PALM',          category: 'plant', lang: 'en' }, // 4
  { word: 'FERN',          category: 'plant', lang: 'en' }, // 4
  { word: 'LILY',          category: 'plant', lang: 'en' }, // 4
  { word: 'TULIP',         category: 'plant', lang: 'en' }, // 5
  { word: 'CACTUS',        category: 'plant', lang: 'en' }, // 6
  { word: 'NETTLE',        category: 'plant', lang: 'en' }, // 6
  { word: 'JASMINE',       category: 'plant', lang: 'en' }, // 7
  { word: 'HEATHER',       category: 'plant', lang: 'en' }, // 7
  { word: 'FUCHSIA',       category: 'plant', lang: 'en' }, // 7
  { word: 'LAVENDER',      category: 'plant', lang: 'en' }, // 8
  { word: 'ROSEMARY',      category: 'plant', lang: 'en' }, // 8
  { word: 'DANDELION',     category: 'plant', lang: 'en' }, // 9
  { word: 'BUTTERCUP',     category: 'plant', lang: 'en' }, // 9
  { word: 'SNAPDRAGON',    category: 'plant', lang: 'en' }, // 10
  { word: 'CHRYSANTHEMUM', category: 'plant', lang: 'en' }, // 13
  // ── EN FOOD ───────────────────────────────────────────────────────────────
  { word: 'RICE',          category: 'food', lang: 'en' }, // 4
  { word: 'SOUP',          category: 'food', lang: 'en' }, // 4
  { word: 'MILK',          category: 'food', lang: 'en' }, // 4
  { word: 'BREAD',         category: 'food', lang: 'en' }, // 5
  { word: 'PASTA',         category: 'food', lang: 'en' }, // 5
  { word: 'HONEY',         category: 'food', lang: 'en' }, // 5
  { word: 'AVOCADO',       category: 'food', lang: 'en' }, // 7
  { word: 'SPINACH',       category: 'food', lang: 'en' }, // 7
  { word: 'CHICKEN',       category: 'food', lang: 'en' }, // 7
  { word: 'NOODLES',       category: 'food', lang: 'en' }, // 7
  { word: 'PANCAKE',       category: 'food', lang: 'en' }, // 7
  { word: 'BROCCOLI',      category: 'food', lang: 'en' }, // 8
  { word: 'BLUEBERRY',     category: 'food', lang: 'en' }, // 9
  { word: 'PINEAPPLE',     category: 'food', lang: 'en' }, // 9
  { word: 'STRAWBERRY',    category: 'food', lang: 'en' }, // 10
  { word: 'WATERMELON',    category: 'food', lang: 'en' }, // 10
  { word: 'CHEESECAKE',    category: 'food', lang: 'en' }, // 10
  { word: 'CAULIFLOWER',   category: 'food', lang: 'en' }, // 11
  // ── EN SPORT ──────────────────────────────────────────────────────────────
  { word: 'GOLF',          category: 'sport', lang: 'en' }, // 4
  { word: 'JUDO',          category: 'sport', lang: 'en' }, // 4
  { word: 'POLO',          category: 'sport', lang: 'en' }, // 4
  { word: 'YOGA',          category: 'sport', lang: 'en' }, // 4
  { word: 'SURF',          category: 'sport', lang: 'en' }, // 4
  { word: 'SAILING',       category: 'sport', lang: 'en' }, // 7
  { word: 'CYCLING',       category: 'sport', lang: 'en' }, // 7
  { word: 'BOWLING',       category: 'sport', lang: 'en' }, // 7
  { word: 'FENCING',       category: 'sport', lang: 'en' }, // 7
  { word: 'ARCHERY',       category: 'sport', lang: 'en' }, // 7
  { word: 'SKATING',       category: 'sport', lang: 'en' }, // 7
  { word: 'SWIMMING',      category: 'sport', lang: 'en' }, // 8
  { word: 'WRESTLING',     category: 'sport', lang: 'en' }, // 9
  { word: 'WATERPOLO',     category: 'sport', lang: 'en' }, // 9
  { word: 'VOLLEYBALL',    category: 'sport', lang: 'en' }, // 10
  { word: 'GYMNASTICS',    category: 'sport', lang: 'en' }, // 10
  { word: 'BASKETBALL',    category: 'sport', lang: 'en' }, // 10
];
```

- [ ] **Step 2: Verify node can require it without errors**

```bash
node -e "var WORDS = require('./robotraetsel/src/data/words.js'); console.log('WORDS count:', WORDS.length);"
```

Wait — `words.js` uses `var WORDS` (not `module.exports`) so require won't work directly. That's fine; it's loaded via `<script>` in the browser. Just verify the file has no syntax errors:

```bash
node -e "$(cat robotraetsel/src/data/words.js); console.log('WORDS count:', WORDS.length);"
```

Expected: `WORDS count: 183` (approx — depends on exact entries above)

- [ ] **Step 3: Commit**

```bash
git add robotraetsel/src/data/words.js
git commit -m "feat(robotraetsel): add word pool data (DE + EN)"
```

---

## Task 4: i18n Strings

**Files:**
- Create: `robotraetsel/src/i18n/strings.js`

- [ ] **Step 1: Create `robotraetsel/src/i18n/strings.js`**

```js
// robotraetsel/src/i18n/strings.js
var STRINGS = {
  de: {
    // StartScene
    title:       '🤖 Roboträtsel',
    subtitle:    'Rate Wörter, bevor der Roboter die Welt übernimmt!',
    howToPlay:   'Wie spielt man?',
    startPrompt: 'Drücke eine Taste oder klicke zum Starten',
    instructions: [
      ['🔡', 'Rate Buchstaben um das versteckte Wort zu finden'],
      ['🤖', 'Jeder Fehler baut ein Roboterteil zusammen (6 Teile)'],
      ['💥', 'Vollständiger Roboter = WELTÜBERNAHME!'],
      ['💡', 'Hinweis zeigt die Kategorie — kostet 1 Roboterteil'],
      ['🔗', 'Löse Wörter in einer Kette: jedes beginnt mit dem letzten Buchstaben'],
      ['🏆', 'Kette von 10 Wörtern = Sieg!']
    ],
    // GameScene top bar
    chainLabel:  '🔗',
    bestLabel:   '⭐',
    nextLabel:   'Nächstes Wort beginnt mit',
    // GameScene hint
    hintBtn:     '💡 Hinweis',
    hintUsed:    'Kategorie:',
    // GameScene category names
    categories: {
      animal:     'Tier',
      country:    'Land',
      profession: 'Beruf',
      plant:      'Pflanze',
      food:       'Essen',
      sport:      'Sport'
    },
    // GameScene game over
    takeover:    'WELTÜBERNAHME! 🤖',
    takeoverSub: 'Der Roboter übernimmt kurz die Macht...',
    // WinScene
    winTitle:    '🏆 Du hast gewonnen!',
    winSubtitle: 'Kette von 10 — Roboter besiegt!',
    bestChain:   'Beste Kette:',
    playAgain:   '🔄 Nochmal spielen'
  },
  en: {
    // StartScene
    title:       '🤖 Robot Riddle',
    subtitle:    'Guess the word before the robot takes over the world!',
    howToPlay:   'How to play?',
    startPrompt: 'Press any key or click to start',
    instructions: [
      ['🔡', 'Guess letters to reveal the hidden word'],
      ['🤖', 'Each wrong guess adds a robot part (6 parts total)'],
      ['💥', 'Complete robot = WORLD DOMINATION!'],
      ['💡', 'Hint reveals the category — costs 1 robot part'],
      ['🔗', 'Solve words in a chain: each starts with the last letter'],
      ['🏆', 'Chain of 10 words = victory!']
    ],
    // GameScene top bar
    chainLabel:  '🔗',
    bestLabel:   '⭐',
    nextLabel:   'Next word starts with',
    // GameScene hint
    hintBtn:     '💡 Hint',
    hintUsed:    'Category:',
    // GameScene category names
    categories: {
      animal:     'Animal',
      country:    'Country',
      profession: 'Profession',
      plant:      'Plant',
      food:       'Food',
      sport:      'Sport'
    },
    // GameScene game over
    takeover:    'WORLD DOMINATION! 🤖',
    takeoverSub: 'The robot takes over momentarily...',
    // WinScene
    winTitle:    '🏆 You won!',
    winSubtitle: 'Chain of 10 — robot defeated!',
    bestChain:   'Best chain:',
    playAgain:   '🔄 Play again'
  }
};
```

- [ ] **Step 2: Commit**

```bash
git add robotraetsel/src/i18n/strings.js
git commit -m "feat(robotraetsel): add i18n strings DE + EN"
```

---

## Task 5: StartScene

**Files:**
- Create: `robotraetsel/src/scenes/StartScene.js`

- [ ] **Step 1: Create `robotraetsel/src/scenes/StartScene.js`**

```js
// robotraetsel/src/scenes/StartScene.js
var StartScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function StartScene() {
    Phaser.Scene.call(this, { key: 'StartScene' });
  },

  create: function() {
    var W = 960, H = 720;
    var self = this;

    this.add.rectangle(W / 2, H / 2, W, H, 0x1a1a2e);
    this.add.rectangle(W / 2, H / 2, W - 20, H - 20, 0x000000, 0)
      .setStrokeStyle(3, 0x3d7a25);

    this.add.text(W / 2, 80, STRINGS[LANG].title, {
      fontSize: '52px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(W / 2, 145, STRINGS[LANG].subtitle, {
      fontSize: '20px', color: '#52b788', wordWrap: { width: 800 }, align: 'center'
    }).setOrigin(0.5);

    // Instructions panel
    this.add.rectangle(W / 2, 420, 840, 440, 0x0d1a0d, 0.85)
      .setStrokeStyle(2, 0x2c5f2e);

    this.add.text(W / 2, 215, STRINGS[LANG].howToPlay, {
      fontSize: '26px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    var lines = STRINGS[LANG].instructions;
    for (var i = 0; i < lines.length; i++) {
      this.add.text(230, 268 + i * 52, lines[i][0], {
        fontSize: '24px'
      }).setOrigin(0.5);
      this.add.text(272, 268 + i * 52, lines[i][1], {
        fontSize: '18px', color: '#dddddd'
      }).setOrigin(0, 0.5);
    }

    var prompt = this.add.text(W / 2, 662, STRINGS[LANG].startPrompt, {
      fontSize: '22px', color: '#f5e642'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: prompt, alpha: 0.1, duration: 700, yoyo: true, repeat: -1
    });

    function startGame() {
      self.scene.start('GameScene');
    }

    this.input.keyboard.once('keydown', startGame);
    this.input.once('pointerdown', startGame);
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add robotraetsel/src/scenes/StartScene.js
git commit -m "feat(robotraetsel): add StartScene"
```

---

## Task 6: GameScene — Robot Data + Skeleton

**Files:**
- Create: `robotraetsel/src/scenes/GameScene.js`

This task creates the full GameScene file with robot pixel-art constants and the `_drawRobot` helper. The scene starts, draws the background and top bar, but does not yet handle words or input.

- [ ] **Step 1: Create `robotraetsel/src/scenes/GameScene.js`**

```js
// robotraetsel/src/scenes/GameScene.js

// ─── Robot pixel-art constants ────────────────────────────────────────────────
var ROBOT_CELL = 8;
var ROBOT_X    = 100;  // game-coord left edge of head/body columns
var ROBOT_Y    = 110;  // game-coord top of robot

var ROBOT_PALETTE = {
  'M': 0x8e9aaf,  // main metal (grey-blue)
  'D': 0x4a5568,  // dark accents
  'L': 0xe2e8f0,  // light/shine
  'E': 0x63b3ed,  // glowing eyes (blue)
  'R': 0xe53e3e   // red indicator lights
};

// 6 parts, assembled in order on wrong guesses.
// ox/oy = pixel offset from (ROBOT_X, ROBOT_Y). Each pixel = ROBOT_CELL × ROBOT_CELL.
var ROBOT_PARTS = [
  { id: 'antenna', ox: 28, oy: 0, pixels: [
    ['.','R','.'],
    ['.','D','.'],
    ['.','D','.']
  ]},
  { id: 'head', ox: 0, oy: 24, pixels: [
    ['D','M','M','M','M','M','M','D'],
    ['M','M','M','M','M','M','M','M'],
    ['M','E','E','M','M','E','E','M'],
    ['M','M','M','M','M','M','M','M'],
    ['M','D','L','L','L','L','D','M'],
    ['D','M','M','M','M','M','M','D']
  ]},
  { id: 'body', ox: 0, oy: 72, pixels: [
    ['D','M','M','M','M','M','M','D'],
    ['M','R','M','M','M','M','R','M'],
    ['M','M','M','M','M','M','M','M'],
    ['M','M','M','M','M','M','M','M'],
    ['M','R','M','M','M','M','R','M'],
    ['D','M','M','M','M','M','M','D']
  ]},
  { id: 'left_arm', ox: -24, oy: 72, pixels: [
    ['D','M','M'],
    ['M','M','M'],
    ['M','M','M'],
    ['M','M','M'],
    ['D','M','L']
  ]},
  { id: 'right_arm', ox: 64, oy: 72, pixels: [
    ['M','M','D'],
    ['M','M','M'],
    ['M','M','M'],
    ['M','M','M'],
    ['L','M','D']
  ]},
  { id: 'legs', ox: 0, oy: 120, pixels: [
    ['D','M','M','D','D','M','M','D'],
    ['M','M','M','.','.','M','M','M'],
    ['M','M','M','.','.','M','M','M'],
    ['M','L','M','.','.','M','L','M'],
    ['D','M','D','.','.','D','M','D']
  ]}
];

// ─── Letter rows for on-screen keyboard ───────────────────────────────────────
var LETTERS_DE = [
  ['A','B','C','D','E','F','G','H','I','J'],
  ['K','L','M','N','O','P','Q','R','S','T'],
  ['U','V','W','X','Y','Z','Ä','Ö','Ü']
];
var LETTERS_EN = [
  ['A','B','C','D','E','F','G','H','I','J'],
  ['K','L','M','N','O','P','Q','R','S','T'],
  ['U','V','W','X','Y','Z']
];

// ─── Scene ────────────────────────────────────────────────────────────────────
var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'GameScene' });
  },

  create: function() {
    var W = 960, H = 720;

    // Retrieve persisted best chain
    this._bestChain   = parseInt(localStorage.getItem('robotraetsel_best') || '0', 10);
    this._chainLength = 0;
    this._wrongCount  = 0;
    this._guessed     = {};
    this._hintUsed    = false;
    this._nextLetter  = null;
    this._slotTexts   = [];
    this._slotRects   = [];
    this._keyButtons  = {};

    // ── Static background ──
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a1a2e);
    // Divider between robot area and word area
    this.add.rectangle(308, H / 2, 2, H, 0x2c4a2c);

    // ── Top bar ──
    this.add.rectangle(W / 2, 32, W, 64, 0x0d1a0d);

    var s = STRINGS[LANG];
    this.add.text(20, 32, s.chainLabel, { fontSize: '22px' }).setOrigin(0, 0.5);
    this._chainValueText = this.add.text(44, 32, '0', {
      fontSize: '22px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.add.text(130, 32, s.bestLabel, { fontSize: '22px' }).setOrigin(0, 0.5);
    this._bestValueText = this.add.text(154, 32, String(this._bestChain), {
      fontSize: '22px', color: '#aed9b8'
    }).setOrigin(0, 0.5);

    this._constraintText = this.add.text(W / 2, 32, '', {
      fontSize: '18px', color: '#f5e642'
    }).setOrigin(0.5, 0.5);

    // ── Robot graphics object ──
    this._robotGfx = this.add.graphics();

    // ── "Wrong guesses" label ──
    this._wrongLabel = this.add.text(154, 320, '', {
      fontSize: '16px', color: '#e53e3e'
    }).setOrigin(0.5);

    // ── Category reveal text (shown after hint used) ──
    this._categoryText = this.add.text(630, 95, '', {
      fontSize: '20px', color: '#f5e642', fontStyle: 'italic'
    }).setOrigin(0.5);

    // ── Build keyboard and hint button ──
    this._buildKeyboard();
    this._buildHintButton();

    // ── Start first word ──
    this._wordPool = new WordPool(WORDS, LANG);
    this._startWord();
  },

  // ── Draw robot with numParts assembled ──────────────────────────────────────
  _drawRobot: function(numParts) {
    this._robotGfx.clear();
    for (var p = 0; p < numParts; p++) {
      var part = ROBOT_PARTS[p];
      var grid = part.pixels;
      for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
          var code = grid[r][c];
          if (code === '.') continue;
          this._robotGfx.fillStyle(ROBOT_PALETTE[code], 1);
          this._robotGfx.fillRect(
            ROBOT_X + part.ox + c * ROBOT_CELL,
            ROBOT_Y + part.oy + r * ROBOT_CELL,
            ROBOT_CELL, ROBOT_CELL
          );
        }
      }
    }
    var s = STRINGS[LANG];
    this._wrongLabel.setText(this._wrongCount > 0
      ? this._wrongCount + ' / 6'
      : '');
  },

  // ── Update top-bar dynamic text ─────────────────────────────────────────────
  _updateTopBar: function() {
    var s = STRINGS[LANG];
    this._chainValueText.setText(String(this._chainLength));
    this._bestValueText.setText(String(this._bestChain));
    if (this._nextLetter) {
      this._constraintText.setText(
        s.nextLabel + ': ' + this._nextLetter
      );
    } else {
      this._constraintText.setText('');
    }
  }
});
```

- [ ] **Step 2: Verify the file loads without syntax errors**

Open `robotraetsel/index.html` in a browser — the page should show a dark background and top bar. There will be a JS error about `_buildKeyboard` being undefined, which is expected at this step.

Alternatively run:
```bash
node -e "
var Phaser = { Class: function(def) { return def; }, Scene: function(){} };
eval(require('fs').readFileSync('robotraetsel/src/i18n/lang.js','utf8').replace('localStorage','{}') );
eval(require('fs').readFileSync('robotraetsel/src/scenes/GameScene.js','utf8'));
console.log('GameScene loads OK, ROBOT_PARTS count:', ROBOT_PARTS.length);
"
```

Expected: `GameScene loads OK, ROBOT_PARTS count: 6`

- [ ] **Step 3: Commit**

```bash
git add robotraetsel/src/scenes/GameScene.js
git commit -m "feat(robotraetsel): add GameScene skeleton with robot pixel-art data"
```

---

## Task 7: GameScene — Word Display, Keyboard, Guessing Logic

**Files:**
- Modify: `robotraetsel/src/scenes/GameScene.js` — add `_startWord`, `_buildWordSlots`, `_updateWordSlots`, `_buildKeyboard`, `_resetKeyboard`, `_onGuess`, `_isWordSolved`

- [ ] **Step 1: Add word-display and guessing methods to GameScene.js**

Inside the `Phaser.Class({...})` definition, add the following methods after `_updateTopBar`:

```js
  // ── Start a new word ────────────────────────────────────────────────────────
  _startWord: function() {
    this._currentWord = this._wordPool.draw(this._chainLength, this._nextLetter);
    this._wrongCount  = 0;
    this._guessed     = {};
    this._hintUsed    = false;
    this._nextLetter  = null;

    this._robotGfx.clear();
    this._wrongLabel.setText('');
    this._categoryText.setText('');
    this._resetHintButton();
    this._buildWordSlots();
    this._resetKeyboard();
    this._updateTopBar();
  },

  // ── Build letter slots for the current word ─────────────────────────────────
  _buildWordSlots: function() {
    var i;
    for (i = 0; i < this._slotTexts.length; i++) { this._slotTexts[i].destroy(); }
    for (i = 0; i < this._slotRects.length; i++) { this._slotRects[i].destroy(); }
    this._slotTexts = [];
    this._slotRects = [];

    var word = this._currentWord.word;
    var n    = word.length;
    var slotW = n <= 8 ? 50 : 38;
    var gap   = n <= 8 ? 8  : 4;
    var totalW = n * slotW + (n - 1) * gap;
    var startX = 630 - totalW / 2;  // 630 = centre of right panel (310-950)
    var slotY  = 220;
    var fontSize = n <= 8 ? '30px' : '22px';

    for (i = 0; i < n; i++) {
      var cx = startX + i * (slotW + gap) + slotW / 2;
      // underline bar
      var rect = this.add.rectangle(cx, slotY + 28, slotW - 4, 3, 0x8888aa);
      // letter text (hidden until guessed)
      var txt = this.add.text(cx, slotY, '', {
        fontSize: fontSize, color: '#ffffff', fontStyle: 'bold'
      }).setOrigin(0.5, 0);
      this._slotTexts.push(txt);
      this._slotRects.push(rect);
    }
  },

  // ── Reveal all correctly-guessed letters in slots ───────────────────────────
  _updateWordSlots: function() {
    var word = this._currentWord.word;
    for (var i = 0; i < word.length; i++) {
      if (this._guessed[word[i]]) {
        this._slotTexts[i].setText(word[i]);
      }
    }
  },

  // ── Reveal ALL letters (called on game over so player sees the word) ─────────
  _revealWord: function() {
    var word = this._currentWord.word;
    for (var i = 0; i < word.length; i++) {
      this._slotTexts[i].setText(word[i]).setColor('#ff9999');
    }
  },

  // ── Check if every letter in the word has been guessed ──────────────────────
  _isWordSolved: function() {
    var word = this._currentWord.word;
    for (var i = 0; i < word.length; i++) {
      if (!this._guessed[word[i]]) return false;
    }
    return true;
  },

  // ── Build on-screen A-Z (+ ÄÖÜ in DE) keyboard ─────────────────────────────
  _buildKeyboard: function() {
    var self  = this;
    var rows  = LANG === 'de' ? LETTERS_DE : LETTERS_EN;
    var BW    = 48, BH = 44, GAP = 4;
    var panelCX = 630;  // horizontal centre of right panel
    var startY  = 330;

    for (var ri = 0; ri < rows.length; ri++) {
      var row    = rows[ri];
      var rowW   = row.length * BW + (row.length - 1) * GAP;
      var startX = panelCX - rowW / 2;

      for (var ci = 0; ci < row.length; ci++) {
        (function(letter, x, y) {
          var bg = self.add.rectangle(x + BW / 2, y + BH / 2, BW - 2, BH - 2, 0x2c5f2e)
            .setInteractive()
            .setStrokeStyle(1, 0x52b788);
          var lbl = self.add.text(x + BW / 2, y + BH / 2, letter, {
            fontSize: '18px', color: '#ffffff'
          }).setOrigin(0.5);

          bg.on('pointerover', function() { bg.setFillStyle(0x3d7a25); });
          bg.on('pointerout',  function() { bg.setFillStyle(0x2c5f2e); });
          bg.on('pointerdown', function() { self._onGuess(letter); });

          self._keyButtons[letter] = { bg: bg, lbl: lbl };
        })(row[ci], startX + ci * (BW + GAP), startY + ri * (BH + GAP));
      }
    }

    // Physical keyboard — A-Z only (umlauts via on-screen buttons)
    this.input.keyboard.on('keydown', function(event) {
      var letter = event.key.toUpperCase();
      if (/^[A-ZÄÖÜ]$/.test(letter)) self._onGuess(letter);
    });
  },

  // ── Re-enable all keyboard buttons and reset colours ────────────────────────
  _resetKeyboard: function() {
    for (var letter in this._keyButtons) {
      var btn = this._keyButtons[letter];
      btn.bg.setFillStyle(0x2c5f2e).setInteractive().setAlpha(1);
      btn.lbl.setColor('#ffffff');
    }
  },

  // ── Process a letter guess ──────────────────────────────────────────────────
  _onGuess: function(letter) {
    if (this._guessed[letter]) return;
    if (!this._keyButtons[letter]) return;  // ignore letters not in our alphabet
    this._guessed[letter] = true;

    // Grey out keyboard button
    var btn = this._keyButtons[letter];
    btn.bg.removeInteractive().setFillStyle(0x555555).setAlpha(0.5);
    btn.lbl.setColor('#888888');

    if (this._currentWord.word.indexOf(letter) !== -1) {
      // ── Correct guess ──
      this._updateWordSlots();
      if (this._isWordSolved()) {
        this._onWordSolved();
      }
    } else {
      // ── Wrong guess ──
      this._wrongCount++;
      this._drawRobot(this._wrongCount);
      this._updateHintButtonState();
      if (this._wrongCount >= 6) {
        this._onGameOver();
      }
    }
  }
```

- [ ] **Step 2: Verify in browser**

Open `robotraetsel/index.html`. After clicking Start, GameScene should display: a word as blank slots on the right, an A–Z keyboard below, and an empty robot area on the left. Clicking letters should fill in correct guesses or add robot parts.

- [ ] **Step 3: Commit**

```bash
git add robotraetsel/src/scenes/GameScene.js
git commit -m "feat(robotraetsel): add word display, keyboard, and guessing logic"
```

---

## Task 8: GameScene — Hint Button, World Domination, Chain + Win

**Files:**
- Modify: `robotraetsel/src/scenes/GameScene.js` — add hint, game-over, chain, win methods

- [ ] **Step 1: Add hint, takeover, chain, and win methods to GameScene.js**

Add these methods inside the `Phaser.Class({...})` definition, after `_onGuess`:

```js
  // ── Build the hint button ───────────────────────────────────────────────────
  _buildHintButton: function() {
    var self = this;
    var W    = 960;
    var bx   = 630, by = 570;
    this._hintBg = this.add.rectangle(bx, by, 200, 48, 0x1b3a5c)
      .setInteractive()
      .setStrokeStyle(2, 0x63b3ed);
    this._hintLbl = this.add.text(bx, by, STRINGS[LANG].hintBtn, {
      fontSize: '20px', color: '#63b3ed'
    }).setOrigin(0.5);

    this._hintBg.on('pointerover', function() {
      if (self._hintBg.input && self._hintBg.input.enabled) {
        self._hintBg.setFillStyle(0x2a5480);
      }
    });
    this._hintBg.on('pointerout', function() {
      if (self._hintBg.input && self._hintBg.input.enabled) {
        self._hintBg.setFillStyle(0x1b3a5c);
      }
    });
    this._hintBg.on('pointerdown', function() { self._useHint(); });
  },

  // ── Enable/disable hint button based on state ────────────────────────────────
  _resetHintButton: function() {
    this._hintBg.setInteractive().setFillStyle(0x1b3a5c).setAlpha(1);
    this._hintLbl.setColor('#63b3ed');
  },

  _updateHintButtonState: function() {
    // Disable if already used this word, or if using it would trigger game over
    if (this._hintUsed || this._wrongCount >= 5) {
      this._hintBg.removeInteractive().setAlpha(0.35);
      this._hintLbl.setColor('#445566');
    }
  },

  // ── Use the hint: reveal category, add one wrong guess ──────────────────────
  _useHint: function() {
    if (this._hintUsed || this._wrongCount >= 5) return;
    this._hintUsed = true;

    var cat = STRINGS[LANG].categories[this._currentWord.category];
    this._categoryText.setText(STRINGS[LANG].hintUsed + ' ' + cat);

    // Cost: one robot part
    this._wrongCount++;
    this._drawRobot(this._wrongCount);
    this._updateHintButtonState();

    if (this._wrongCount >= 6) {
      this._onGameOver();
    }
  },

  // ── Called when the word is fully guessed ───────────────────────────────────
  _onWordSolved: function() {
    var self = this;
    var word = this._currentWord.word;

    // Flash slots green
    for (var i = 0; i < this._slotTexts.length; i++) {
      this._slotTexts[i].setColor('#52e888');
    }

    // Increment chain and persist best
    this._chainLength++;
    if (this._chainLength > this._bestChain) {
      this._bestChain = this._chainLength;
      localStorage.setItem('robotraetsel_best', String(this._bestChain));
    }

    // Set chain constraint: next word starts with last letter of solved word
    this._nextLetter = word[word.length - 1];

    // Win condition: chain of 10
    if (this._chainLength >= 10) {
      this.time.delayedCall(800, function() {
        self.scene.start('WinScene', { best: self._bestChain });
      });
      return;
    }

    this._updateTopBar();
    this.time.delayedCall(1200, function() { self._startWord(); });
  },

  // ── Called when the 6th wrong guess is made ─────────────────────────────────
  _onGameOver: function() {
    var self = this;
    // Disable all input
    for (var letter in this._keyButtons) {
      this._keyButtons[letter].bg.removeInteractive();
    }
    this._hintBg.removeInteractive();

    this._revealWord();

    // Shake the robot graphics
    this.tweens.add({
      targets: this._robotGfx,
      x: '+=12',
      yoyo: true,
      repeat: 4,
      duration: 60,
      onComplete: function() {
        self._robotGfx.setPosition(0, 0); // reset after shake
        self._showTakeover();
      }
    });
  },

  // ── World domination overlay ─────────────────────────────────────────────────
  _showTakeover: function() {
    var self = this;
    var W = 960, H = 720;
    var s = STRINGS[LANG];

    var overlay = this.add.rectangle(W / 2, H / 2, W, H, 0xcc0000, 0.92).setDepth(20);
    var title   = this.add.text(W / 2, H / 2 - 60, s.takeover, {
      fontSize: '58px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(21).setAlpha(0);
    var sub = this.add.text(W / 2, H / 2 + 40, s.takeoverSub, {
      fontSize: '26px', color: '#ffcccc'
    }).setOrigin(0.5).setDepth(21).setAlpha(0);

    this.tweens.add({
      targets: [title, sub], alpha: 1, duration: 300
    });

    this.time.delayedCall(2200, function() {
      overlay.destroy();
      title.destroy();
      sub.destroy();

      // Reset chain
      self._chainLength = 0;
      self._nextLetter  = null;
      self._updateTopBar();
      self._startWord();
    });
  }
```

- [ ] **Step 2: Verify full game flow in browser**

- Start game in DE and EN
- Guess wrong letters 6 times → robot assembles part by part → world domination overlay appears → resets to new word
- Guess correct letters → word solved → chain increments → next word starts
- Use hint → category shown → one robot part added → hint button disables
- Solve 10 words → WinScene should transition (will error because WinScene not yet created — that's expected)

- [ ] **Step 3: Commit**

```bash
git add robotraetsel/src/scenes/GameScene.js
git commit -m "feat(robotraetsel): add hint, world domination, chain tracking, win trigger"
```

---

## Task 9: WinScene

**Files:**
- Create: `robotraetsel/src/scenes/WinScene.js`

- [ ] **Step 1: Create `robotraetsel/src/scenes/WinScene.js`**

```js
// robotraetsel/src/scenes/WinScene.js
var WinScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function WinScene() {
    Phaser.Scene.call(this, { key: 'WinScene' });
  },

  init: function(data) {
    this._best = data && data.best ? data.best : 0;
  },

  create: function() {
    var W = 960, H = 720;
    var self = this;
    var s = STRINGS[LANG];

    this.add.rectangle(W / 2, H / 2, W, H, 0x05100a);

    // Confetti
    var colors = [0xf5e642, 0x52b788, 0xff6b9d, 0x74c0fc, 0xffa94d, 0xa9e34b];
    for (var c = 0; c < 70; c++) {
      (function() {
        var x  = Phaser.Math.Between(0, W);
        var y0 = Phaser.Math.Between(-200, -10);
        var color = colors[Phaser.Math.Between(0, colors.length - 1)];
        var piece = self.add.rectangle(x, y0,
          Phaser.Math.Between(6, 14), Phaser.Math.Between(6, 14), color).setAlpha(0.9);
        self.tweens.add({
          targets: piece,
          y: H + 20,
          x: x + Phaser.Math.Between(-80, 80),
          angle: Phaser.Math.Between(-360, 360),
          duration: Phaser.Math.Between(2000, 5000),
          delay: Phaser.Math.Between(0, 3000),
          repeat: -1,
          repeatDelay: Phaser.Math.Between(0, 2000)
        });
      })();
    }

    // Title
    var title = this.add.text(W / 2, 100, s.winTitle, {
      fontSize: '56px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0.5);
    this.tweens.add({
      targets: title, scaleX: 1.06, scaleY: 1.06,
      duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    this.add.text(W / 2, 170, s.winSubtitle, {
      fontSize: '22px', color: '#52b788'
    }).setOrigin(0.5);

    // Defeated robot — draw full assembled robot in centre of screen
    var gfx = this.add.graphics();
    var cx = W / 2 - 32, cy = H / 2 - 80;
    for (var p = 0; p < ROBOT_PARTS.length; p++) {
      var part = ROBOT_PARTS[p];
      var grid = part.pixels;
      for (var r = 0; r < grid.length; r++) {
        for (var col = 0; col < grid[r].length; col++) {
          var code = grid[r][col];
          if (code === '.') continue;
          gfx.fillStyle(ROBOT_PALETTE[code], 1);
          gfx.fillRect(
            cx + part.ox + col * ROBOT_CELL,
            cy + part.oy + r  * ROBOT_CELL,
            ROBOT_CELL, ROBOT_CELL
          );
        }
      }
    }
    // White flag (simple pixel)
    gfx.fillStyle(0xffffff, 1);
    gfx.fillRect(cx + 68, cy + 80, 4, 24); // flag pole (right of right_arm)
    gfx.fillRect(cx + 72, cy + 80, 16, 10); // flag rectangle

    // Best chain
    this.add.text(W / 2, H / 2 + 130, s.bestChain + ' ' + this._best, {
      fontSize: '28px', color: '#aed9b8'
    }).setOrigin(0.5);

    // Play again button
    var btn = this.add.rectangle(W / 2, 640, 280, 54, 0x2c5f2e)
      .setInteractive()
      .setStrokeStyle(2, 0x52b788)
      .setAlpha(0);
    var btnLbl = this.add.text(W / 2, 640, s.playAgain, {
      fontSize: '22px', color: '#ffffff'
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({ targets: [btn, btnLbl], alpha: 1, duration: 500, delay: 600 });

    btn.on('pointerover', function() { btn.setFillStyle(0x3d7a25); });
    btn.on('pointerout',  function() { btn.setFillStyle(0x2c5f2e); });
    btn.on('pointerdown', function() { self.scene.start('GameScene'); });
    this.input.keyboard.once('keydown', function() { self.scene.start('GameScene'); });
  }
});
```

- [ ] **Step 2: Test full win flow in browser**

Play until chain reaches 10 (or temporarily lower the win threshold in GameScene `_onWordSolved` to `>= 2` for quick testing, then restore it).

Expected: confetti, pulsing title, defeated robot with white flag, best chain score, play-again button.

- [ ] **Step 3: Commit**

```bash
git add robotraetsel/src/scenes/WinScene.js
git commit -m "feat(robotraetsel): add WinScene with confetti and defeated robot"
```

---

## Task 10: Portal Integration

**Files:**
- Modify: `index.html` (repo root) — add Roboträtsel card

- [ ] **Step 1: Add card HTML to `index.html`**

Inside the `<div class="grid">` element, after the last existing `<a class="card">` block and before `<!-- add more cards here -->`:

```html
    <a class="card" href="./robotraetsel/index.html" data-supports-browser="true" data-supports-mobile="true">
      <div class="card-emoji">🤖</div>
      <div class="card-title" id="card-rr-title"></div>
      <div class="card-desc"  id="card-rr-desc"></div>
      <div class="card-btn"   id="card-rr-btn"></div>
      <div class="card-platforms">
        <span class="platform-badge supported" id="rr-badge-browser">🖥️ Browser</span>
        <span class="platform-badge supported" id="rr-badge-mobile">📱 Mobile</span>
      </div>
      <div class="platform-unavailable" id="card-rr-unavail" style="display:none;"></div>
    </a>
```

- [ ] **Step 2: Add strings to `PORTAL_STRINGS` in `index.html`**

In the `PORTAL_STRINGS` object, inside the `de: { ... }` block, add after the last entry (before `}`):

```js
        rrTitle: 'Roboträtsel',
        rrDesc:  'Rate Wörter, bevor der Roboter die Welt übernimmt!',
```

In the `en: { ... }` block, add:

```js
        rrTitle: 'Robot Riddle',
        rrDesc:  'Guess the word before the robot takes over the world!',
```

- [ ] **Step 3: Wire strings in the `render` function in `index.html`**

Inside the `render(lang)` function, after the last `getElementById` block, add:

```js
      document.getElementById('card-rr-title').textContent   = s.rrTitle;
      document.getElementById('card-rr-desc').textContent    = s.rrDesc;
      document.getElementById('card-rr-btn').textContent     = s.play;
```

- [ ] **Step 4: Verify portal in browser**

Open `index.html`. The 🤖 Roboträtsel card should appear, toggle DE/EN updates its title and description, clicking the card opens the game.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat(portal): add Roboträtsel card to Wilma's game collection"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Hangman-style word guessing | Task 7 `_onGuess` |
| 6-part robot assembled on wrong guesses | Task 6 `ROBOT_PARTS` + `_drawRobot` |
| Robot "world domination" on 6th part | Task 8 `_showTakeover` |
| Word chain: next word starts with last letter | Task 8 `_onWordSolved` sets `_nextLetter` |
| Chain constraint fallback | Task 2 `WordPool.draw` fallback logic |
| Chain resets to 0 on game over | Task 8 `_showTakeover` |
| Win at chain of 10 | Task 8 `_onWordSolved` checks `>= 10` |
| Category hint costs 1 robot part | Task 8 `_useHint` |
| Hint disabled at wrongCount ≥ 5 | Task 8 `_updateHintButtonState` |
| Difficulty ramp (bucket by chain length) | Task 2 `WordPool._getBucket` |
| DE + EN word pool with umlauts | Task 3 `words.js` |
| DE keyboard includes Ä Ö Ü | Task 7 `LETTERS_DE` |
| `pgame_lang` shared localStorage key | Task 1 `lang.js` |
| Best chain persisted to `robotraetsel_best` | Task 8 `_onWordSolved` |
| Portal card (browser + mobile) | Task 10 |
| Back button to portal | Task 1 `index.html` |
| StartScene how-to-play | Task 5 |
| WinScene with defeated robot + white flag | Task 9 |
| Physical keyboard input | Task 7 `_buildKeyboard` keydown handler |
| Mobile touch input via on-screen keyboard | Task 7 `_buildKeyboard` pointerdown |

No gaps found.

**Placeholder scan:** No TBDs, no "implement later" text.

**Type consistency:** `_nextLetter` is `null` or a single uppercase string throughout. `_chainLength` is always an integer. `_wrongCount` is 0–6. `WordPool.draw(chainLength, startLetter)` signature used consistently.
