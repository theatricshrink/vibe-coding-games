# Mathronaut Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Mathronaut — a Doodle Jump-style portrait platformer where an astronaut climbs into space by landing on correct math answers, with four difficulty tiers tied to altitude.

**Architecture:** Vanilla JS + Phaser 3.60 (CDN, no bundler). GameScene orchestrates gameplay via three utility modules: MathEngine (problem generation), DifficultyManager (altitude→tier mapping), and PlatformPool (object-pool of 15 row-groups). Two game modes (Normal/Hard) are passed as Phaser scene data. All text is i18n'd via the shared `pgame_lang` localStorage pattern.

**Tech Stack:** Phaser 3.60.0 (CDN), vanilla JS (var globals, no modules), Node.js for utility unit tests, localStorage for persistence.

---

## File Map

| File | Purpose |
|------|---------|
| `mathronaut/index.html` | Game shell: Phaser CDN, script load order, back button |
| `mathronaut/main.js` | Phaser config (480×854 portrait, FIT+CENTER_BOTH) + `new Phaser.Game` |
| `mathronaut/src/i18n/lang.js` | Sets global `LANG` from `pgame_lang` localStorage |
| `mathronaut/src/i18n/strings.js` | `STRINGS` object + `t(key)` helper — all UI text in de/en |
| `mathronaut/src/data/mathProblems.js` | Static fraction problem pool for tier 4 |
| `mathronaut/src/utils/MathEngine.js` | `generate(tier)` → `{ question, correct, distractors }` |
| `mathronaut/src/utils/DifficultyManager.js` | `getTier(metres)`, `update(metres)`, `onTierChange(cb)` |
| `mathronaut/src/utils/PlatformPool.js` | Row pool: `init(scene)`, `getNextRow(y, tier)`, `recycleRow(row)` |
| `mathronaut/src/scenes/StartScene.js` | Title, mode selector, best heights, start button |
| `mathronaut/src/scenes/GameScene.js` | Full gameplay loop |
| `mathronaut/src/scenes/GameOverScene.js` | Final height, best score, retry/back buttons |
| `mathronaut/tests/mathEngine.test.js` | Node.js unit tests for MathEngine |
| `mathronaut/tests/difficultyManager.test.js` | Node.js unit tests for DifficultyManager |
| `index.html` (repo root) | Add Mathronaut portal card + PORTAL_STRINGS entries |

---

## Task 1: Project Scaffold + Portal Card

**Files:**
- Create: `mathronaut/index.html`
- Create: `mathronaut/main.js`
- Modify: `index.html` (repo root) — add portal card + strings

- [ ] **Step 1: Create `mathronaut/index.html`**

```html
<!DOCTYPE html>
<html lang="de" id="html-root">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Mathronaut</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0d1b2a; }
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
  <script src="src/data/mathProblems.js"></script>
  <script src="src/i18n/strings.js"></script>
  <script src="src/utils/MathEngine.js"></script>
  <script src="src/utils/DifficultyManager.js"></script>
  <script src="src/utils/PlatformPool.js"></script>
  <script src="src/scenes/StartScene.js"></script>
  <script src="src/scenes/GameScene.js"></script>
  <script src="src/scenes/GameOverScene.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `mathronaut/main.js`**

```js
var config = {
  type: Phaser.AUTO,
  backgroundColor: '#0d1b2a',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 480,
    height: 854
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 700 }, debug: false }
  },
  scene: [StartScene, GameScene, GameOverScene]
};

var game = new Phaser.Game(config);
```

- [ ] **Step 3: Add portal card to repo-root `index.html`**

In `index.html`, insert before `<!-- add more cards here -->`:
```html
    <a class="card" href="./mathronaut/index.html" data-supports-browser="true" data-supports-mobile="true">
      <div class="card-emoji">🚀</div>
      <div class="card-title" id="card-mn-title"></div>
      <div class="card-desc"  id="card-mn-desc"></div>
      <div class="card-btn"   id="card-mn-btn"></div>
      <div class="card-platforms">
        <span class="platform-badge supported" id="mn-badge-browser">🖥️ Browser</span>
        <span class="platform-badge supported" id="mn-badge-mobile">📱 Mobile</span>
      </div>
      <div class="platform-unavailable" id="card-mn-unavail" style="display:none;"></div>
    </a>
```

- [ ] **Step 4: Add `mnTitle`, `mnDesc` to `PORTAL_STRINGS` in repo-root `index.html`**

In the `de:` block, after `rrDesc: ...`:
```js
        mnTitle:    'Mathronaut',
        mnDesc:     'Mathe trifft Weltraum! Spring auf die richtige Antwort und klettere zu den Sternen.',
```

In the `en:` block, after `rrDesc: ...`:
```js
        mnTitle:    'Mathronaut',
        mnDesc:     'Math meets space! Jump on the right answer and climb to the stars.',
```

- [ ] **Step 5: Wire portal `render()` function in repo-root `index.html`**

After the line `document.getElementById('card-rr-btn').textContent = s.play;`, add:
```js
      document.getElementById('card-mn-title').textContent   = s.mnTitle;
      document.getElementById('card-mn-desc').textContent    = s.mnDesc;
      document.getElementById('card-mn-btn').textContent     = s.play;
```

- [ ] **Step 6: Create stub scene files so the game loads without errors**

Create `mathronaut/src/i18n/lang.js`:
```js
var LANG = (localStorage.getItem('pgame_lang') === 'en') ? 'en' : 'de';
```

Create `mathronaut/src/data/mathProblems.js`:
```js
var MATH_PROBLEMS = {};
```

Create `mathronaut/src/i18n/strings.js`:
```js
var STRINGS = { de: {}, en: {} };
function t(key) { return (STRINGS[LANG] && STRINGS[LANG][key]) || STRINGS['en'][key] || key; }
```

Create `mathronaut/src/utils/MathEngine.js`:
```js
var MathEngine = { generate: function(tier) { return { question: '?', correct: 1, distractors: [2, 3] }; } };
```

Create `mathronaut/src/utils/DifficultyManager.js`:
```js
var DifficultyManager = { getTier: function(m) { return 1; }, update: function(m) {}, onTierChange: function(cb) {} };
```

Create `mathronaut/src/utils/PlatformPool.js`:
```js
var PlatformPool = { init: function(scene) {}, getNextRow: function(y, tier) { return null; }, recycleRow: function(row) {} };
```

Create `mathronaut/src/scenes/StartScene.js`:
```js
var StartScene = new Phaser.Class({ Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'StartScene' }); }, create: function() { this.add.text(240, 427, 'Mathronaut', { fontSize: '32px', color: '#fff' }).setOrigin(0.5); } });
```

Create `mathronaut/src/scenes/GameScene.js`:
```js
var GameScene = new Phaser.Class({ Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'GameScene' }); }, create: function() {}, update: function() {} });
```

Create `mathronaut/src/scenes/GameOverScene.js`:
```js
var GameOverScene = new Phaser.Class({ Extends: Phaser.Scene, initialize: function() { Phaser.Scene.call(this, { key: 'GameOverScene' }); }, create: function() { this.add.text(240, 427, 'Game Over', { fontSize: '32px', color: '#fff' }).setOrigin(0.5); } });
```

- [ ] **Step 7: Open `mathronaut/index.html` in a browser and confirm it loads without console errors**

Expected: white "Mathronaut" text on dark background, no JS errors in console.

- [ ] **Step 8: Open repo-root `index.html` and confirm the Mathronaut card appears with correct text in de and en**

Toggle language. Expected: card shows "Mathronaut" title and correct descriptions in both languages.

- [ ] **Step 9: Commit**

```bash
git add mathronaut/ index.html
git commit -m "feat(mathronaut): scaffold game shell, portal card, and stub files"
```

---

## Task 2: i18n Strings

**Files:**
- Modify: `mathronaut/src/i18n/strings.js`

- [ ] **Step 1: Replace `strings.js` with full content**

```js
var STRINGS = {
  de: {
    title:        'Mathronaut',
    modeNormal:   'Normal (3 Leben)',
    modeHard:     'Schwer (sofort vorbei)',
    bestNormal:   'Bestweite Normal:',
    bestHard:     'Bestweite Schwer:',
    noRecord:     '—',
    start:        'Starten →',
    metres:       'm',
    lives:        '❤️',
    zoneT1:       '🌍 Atmosphären-Zone',
    zoneT2:       '⭐ Multiplikations-Zone',
    zoneT3:       '🪐 Divisions-Zone',
    zoneT4:       '✨ Fraktions-Zone',
    gameOver:     'Spiel vorbei!',
    height:       'Höhe',
    best:         'Bestweite',
    tierReached:  'Erreichte Zone',
    tierNames:    ['Atmosphäre', 'Oberatmosphäre', 'Nahraum', 'Tiefer Weltraum'],
    retry:        'Nochmal',
    back:         '← Übersicht'
  },
  en: {
    title:        'Mathronaut',
    modeNormal:   'Normal (3 lives)',
    modeHard:     'Hard (instant death)',
    bestNormal:   'Best Normal:',
    bestHard:     'Best Hard:',
    noRecord:     '—',
    start:        'Launch →',
    metres:       'm',
    lives:        '❤️',
    zoneT1:       '🌍 Atmosphere Zone',
    zoneT2:       '⭐ Multiplication Zone',
    zoneT3:       '🪐 Division Zone',
    zoneT4:       '✨ Fractions Zone',
    gameOver:     'Game Over!',
    height:       'Height',
    best:         'Best',
    tierReached:  'Zone Reached',
    tierNames:    ['Atmosphere', 'Upper Atmosphere', 'Near Space', 'Deep Space'],
    retry:        'Try Again',
    back:         '← Overview'
  }
};

function t(key) {
  return (STRINGS[LANG] && STRINGS[LANG][key]) || STRINGS['en'][key] || key;
}
```

- [ ] **Step 2: Commit**

```bash
git add mathronaut/src/i18n/strings.js
git commit -m "feat(mathronaut): add full i18n strings for de and en"
```

---

## Task 3: MathEngine (TDD)

**Files:**
- Create: `mathronaut/tests/mathEngine.test.js`
- Modify: `mathronaut/src/utils/MathEngine.js`

- [ ] **Step 1: Create `mathronaut/tests/mathEngine.test.js`**

```js
// Run with: node mathronaut/tests/mathEngine.test.js
var fs = require('fs');
eval(fs.readFileSync('mathronaut/src/data/mathProblems.js', 'utf8'));
eval(fs.readFileSync('mathronaut/src/utils/MathEngine.js', 'utf8'));

var passed = 0;
function assert(condition, msg) {
  if (!condition) throw new Error('FAIL: ' + msg);
  passed++;
}

// generate() returns correct shape
for (var tier = 1; tier <= 4; tier++) {
  var result = MathEngine.generate(tier);
  assert(typeof result.question === 'string', 'tier ' + tier + ': question is string');
  assert(result.distractors.length === 2, 'tier ' + tier + ': 2 distractors');
  assert(result.distractors[0] !== result.correct, 'tier ' + tier + ': distractor[0] != correct');
  assert(result.distractors[1] !== result.correct, 'tier ' + tier + ': distractor[1] != correct');
  assert(result.distractors[0] !== result.distractors[1], 'tier ' + tier + ': distractors differ');
  assert(result.question.includes('?'), 'tier ' + tier + ': question contains ?');
}

// Tier 1: addition answer is numeric sum
var t1 = MathEngine.generate(1);
assert(typeof t1.correct === 'number', 'tier 1: correct is number');
assert(t1.correct >= 2, 'tier 1: correct answer >= 2');

// Tier 2: multiplication table 2-9
var t2 = MathEngine.generate(2);
assert(typeof t2.correct === 'number', 'tier 2: correct is number');
assert(t2.correct >= 4 && t2.correct <= 81, 'tier 2: result in 2x2..9x9 range');

// Tier 3: division produces whole number
var t3 = MathEngine.generate(3);
assert(Number.isInteger(t3.correct), 'tier 3: division result is integer');
assert(t3.question.includes('÷'), 'tier 3: question contains ÷');

// Tier 4: fractions — correct is a string like "3/4"
var t4 = MathEngine.generate(4);
assert(typeof t4.correct === 'string', 'tier 4: correct is string fraction');
assert(t4.correct.includes('/'), 'tier 4: correct contains /');

// generate() is non-deterministic: 10 calls to tier 2 should not all return same correct answer
var answers = [];
for (var i = 0; i < 10; i++) answers.push(MathEngine.generate(2).correct);
var unique = answers.filter(function(v, i, a) { return a.indexOf(v) === i; });
assert(unique.length > 1, 'tier 2: generate() produces varied answers over 10 calls');

console.log('All ' + passed + ' tests passed.');
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
node mathronaut/tests/mathEngine.test.js
```

Expected: `Error: FAIL: tier 1: correct is number` (or similar — stubs return string `'?'`)

- [ ] **Step 3: Replace `mathronaut/src/data/mathProblems.js` with fraction pool**

```js
var MATH_PROBLEMS = {
  fractions: [
    { question: '1/2 + 1/4 = ?', correct: '3/4',  distractors: ['1/2', '2/4'] },
    { question: '1/3 + 1/6 = ?', correct: '1/2',  distractors: ['2/9', '2/6'] },
    { question: '2/3 + 1/6 = ?', correct: '5/6',  distractors: ['3/6', '3/9'] },
    { question: '3/4 - 1/4 = ?', correct: '1/2',  distractors: ['2/4', '1/4'] },
    { question: '5/6 - 1/3 = ?', correct: '1/2',  distractors: ['4/6', '4/3'] },
    { question: '1/2 + 1/3 = ?', correct: '5/6',  distractors: ['2/5', '2/6'] },
    { question: '3/4 + 1/8 = ?', correct: '7/8',  distractors: ['4/8', '4/12'] },
    { question: '1/2 - 1/4 = ?', correct: '1/4',  distractors: ['1/2', '0/4'] },
    { question: '2/3 - 1/6 = ?', correct: '1/2',  distractors: ['1/6', '3/6'] },
    { question: '3/8 + 1/8 = ?', correct: '1/2',  distractors: ['4/16','3/8'] },
    { question: '1/4 + 3/4 = ?', correct: '1',    distractors: ['3/4', '4/8'] },
    { question: '2/5 + 1/5 = ?', correct: '3/5',  distractors: ['2/5', '3/10'] },
    { question: '4/5 - 2/5 = ?', correct: '2/5',  distractors: ['2/10','6/5'] },
    { question: '1/6 + 2/6 = ?', correct: '1/2',  distractors: ['3/12','2/6'] },
    { question: '5/8 - 1/8 = ?', correct: '1/2',  distractors: ['4/8', '6/8'] }
  ]
};
```

- [ ] **Step 4: Replace `mathronaut/src/utils/MathEngine.js` with full implementation**

```js
var MathEngine = (function() {
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function uniqueDistractors(correct, candidates) {
    var filtered = candidates.filter(function(v) { return v !== correct; });
    var seen = {};
    var unique = [];
    for (var i = 0; i < filtered.length; i++) {
      var v = filtered[i];
      if (!seen[v]) { seen[v] = true; unique.push(v); }
    }
    return unique.slice(0, 2);
  }

  function generateT1() {
    var a = randInt(2, 20), b = randInt(2, 15);
    var op = Math.random() < 0.5 ? '+' : '-';
    if (op === '-' && b > a) { var tmp = a; a = b; b = tmp; }
    var correct = op === '+' ? a + b : a - b;
    var candidates = [correct + 1, correct - 1, correct + 2, correct - 2];
    var distractors = uniqueDistractors(correct, candidates.filter(function(v) { return v > 0; }));
    if (distractors.length < 2) distractors = [correct + 1, correct + 2];
    return { question: a + ' ' + op + ' ' + b + ' = ?', correct: correct, distractors: distractors };
  }

  function generateT2() {
    var a = randInt(2, 9), b = randInt(2, 9);
    var correct = a * b;
    var candidates = [a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b];
    var distractors = uniqueDistractors(correct, candidates.filter(function(v) { return v > 0; }));
    if (distractors.length < 2) distractors = [correct + a, correct - b];
    return { question: a + ' × ' + b + ' = ?', correct: correct, distractors: distractors };
  }

  function generateT3() {
    var divisor = randInt(2, 9), quotient = randInt(2, 9);
    var dividend = divisor * quotient;
    var correct = quotient;
    var candidates = [quotient + 1, quotient - 1, quotient + 2, divisor];
    var distractors = uniqueDistractors(correct, candidates.filter(function(v) { return v > 0 && v !== correct; }));
    if (distractors.length < 2) distractors = [correct + 1, correct + 2];
    return { question: dividend + ' ÷ ' + divisor + ' = ?', correct: correct, distractors: distractors };
  }

  function generateT4() {
    var pool = MATH_PROBLEMS.fractions;
    var item = pool[randInt(0, pool.length - 1)];
    return { question: item.question, correct: item.correct, distractors: item.distractors.slice() };
  }

  var generators = [null, generateT1, generateT2, generateT3, generateT4];

  return {
    generate: function(tier) {
      return generators[tier]();
    }
  };
})();

if (typeof module !== 'undefined') module.exports = { MathEngine: MathEngine };
```

- [ ] **Step 5: Run tests — confirm they all pass**

```bash
node mathronaut/tests/mathEngine.test.js
```

Expected: `All 20 tests passed.`

- [ ] **Step 6: Commit**

```bash
git add mathronaut/src/utils/MathEngine.js mathronaut/src/data/mathProblems.js mathronaut/tests/mathEngine.test.js
git commit -m "feat(mathronaut): implement MathEngine with TDD — tiers 1-4 with near-miss distractors"
```

---

## Task 4: DifficultyManager (TDD)

**Files:**
- Create: `mathronaut/tests/difficultyManager.test.js`
- Modify: `mathronaut/src/utils/DifficultyManager.js`

- [ ] **Step 1: Create `mathronaut/tests/difficultyManager.test.js`**

```js
// Run with: node mathronaut/tests/difficultyManager.test.js
var fs = require('fs');
eval(fs.readFileSync('mathronaut/src/utils/DifficultyManager.js', 'utf8'));

var passed = 0;
function assert(condition, msg) {
  if (!condition) throw new Error('FAIL: ' + msg);
  passed++;
}

var dm;

// getTier returns correct tier for each altitude band
dm = DifficultyManager.create();
assert(dm.getTier(0)    === 1, 'tier 1 at 0m');
assert(dm.getTier(150)  === 1, 'tier 1 at 150m');
assert(dm.getTier(299)  === 1, 'tier 1 at 299m');
assert(dm.getTier(300)  === 2, 'tier 2 at 300m');
assert(dm.getTier(500)  === 2, 'tier 2 at 500m');
assert(dm.getTier(699)  === 2, 'tier 2 at 699m');
assert(dm.getTier(700)  === 3, 'tier 3 at 700m');
assert(dm.getTier(900)  === 3, 'tier 3 at 900m');
assert(dm.getTier(1199) === 3, 'tier 3 at 1199m');
assert(dm.getTier(1200) === 4, 'tier 4 at 1200m');
assert(dm.getTier(9999) === 4, 'tier 4 at 9999m');

// onTierChange fires when crossing threshold, not on same tier
dm = DifficultyManager.create();
var events = [];
dm.onTierChange(function(tier) { events.push(tier); });
dm.update(100);
assert(events.length === 0, 'no event within tier 1');
dm.update(350);
assert(events.length === 1, 'event fires entering tier 2');
assert(events[0] === 2, 'event value is 2');
dm.update(400);
assert(events.length === 1, 'no re-fire within tier 2');
dm.update(750);
assert(events.length === 2, 'event fires entering tier 3');
dm.update(1300);
assert(events.length === 3, 'event fires entering tier 4');

// update() does not fire for altitudes lower than current max
dm = DifficultyManager.create();
var fired = [];
dm.onTierChange(function(t) { fired.push(t); });
dm.update(400);  // enter tier 2
dm.update(200);  // fall back — should NOT re-fire tier 1
assert(fired.length === 1, 'no re-fire when altitude decreases');
assert(fired[0] === 2, 'only tier 2 event fired');

console.log('All ' + passed + ' tests passed.');
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
node mathronaut/tests/difficultyManager.test.js
```

Expected: `TypeError: DifficultyManager.create is not a function`

- [ ] **Step 3: Replace `mathronaut/src/utils/DifficultyManager.js` with full implementation**

```js
var DifficultyManager = (function() {
  var THRESHOLDS = [300, 700, 1200];

  return {
    create: function() {
      var maxAltitude = 0;
      var currentTier = 1;
      var callback = null;

      return {
        getTier: function(metres) {
          if (metres >= 1200) return 4;
          if (metres >= 700)  return 3;
          if (metres >= 300)  return 2;
          return 1;
        },
        update: function(metres) {
          if (metres <= maxAltitude) return;
          maxAltitude = metres;
          var newTier = this.getTier(metres);
          if (newTier !== currentTier) {
            currentTier = newTier;
            if (callback) callback(newTier);
          }
        },
        onTierChange: function(cb) {
          callback = cb;
        }
      };
    }
  };
})();

if (typeof module !== 'undefined') module.exports = { DifficultyManager: DifficultyManager };
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
node mathronaut/tests/difficultyManager.test.js
```

Expected: `All 14 tests passed.`

- [ ] **Step 5: Commit**

```bash
git add mathronaut/src/utils/DifficultyManager.js mathronaut/tests/difficultyManager.test.js
git commit -m "feat(mathronaut): implement DifficultyManager with TDD — altitude-to-tier mapping"
```

---

## Task 5: PlatformPool

**Files:**
- Modify: `mathronaut/src/utils/PlatformPool.js`

No unit tests — Phaser-dependent. Visual verification in Task 8.

- [ ] **Step 1: Replace `mathronaut/src/utils/PlatformPool.js` with full implementation**

```js
var PlatformPool = (function() {
  var PLATFORM_W  = 110;
  var PLATFORM_H  = 18;
  var POOL_SIZE   = 15;

  // X zones: three horizontal bands each ~160px wide
  // Each platform center is picked from within its zone with ±20px jitter
  var ZONE_CENTERS = [80, 240, 400];

  var TIER_COLORS = [0x778899, 0x6a5acd, 0x334455, 0x88ccdd];

  function createPlatformTextures(scene) {
    if (scene.textures.exists('plat_t1')) return;
    TIER_COLORS.forEach(function(color, i) {
      var g = scene.add.graphics();
      g.fillStyle(color);
      g.fillRoundedRect(0, 0, PLATFORM_W, PLATFORM_H, 4);
      g.generateTexture('plat_t' + (i + 1), PLATFORM_W, PLATFORM_H);
      g.destroy();
    });
  }

  return {
    init: function(scene) {
      createPlatformTextures(scene);
      this._scene = scene;
      this._pool = [];

      for (var i = 0; i < POOL_SIZE; i++) {
        var platforms = [];
        var labels = [];
        for (var j = 0; j < 3; j++) {
          var img = scene.physics.add.image(-9999, -9999, 'plat_t1')
            .setImmovable(true)
            .setGravityY(-700);
          img.body.allowGravity = false;
          img.setDepth(1);
          platforms.push(img);

          var lbl = scene.add.text(-9999, -9999, '', {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
          }).setOrigin(0.5, 0.5).setDepth(2);
          labels.push(lbl);
        }
        this._pool.push({ platforms: platforms, labels: labels, active: false, correctIndex: 0 });
      }
    },

    getNextRow: function(yPos, tier) {
      var row = null;
      for (var i = 0; i < this._pool.length; i++) {
        if (!this._pool[i].active) { row = this._pool[i]; break; }
      }
      if (!row) return null;

      var problem = MathEngine.generate(tier);
      var answers = [problem.distractors[0], problem.distractors[1], problem.correct];
      // shuffle answers
      for (var k = answers.length - 1; k > 0; k--) {
        var r = Math.floor(Math.random() * (k + 1));
        var tmp = answers[k]; answers[k] = answers[r]; answers[r] = tmp;
      }
      var correctIndex = answers.indexOf(problem.correct);

      var textureKey = 'plat_t' + tier;
      var jitter = 20;

      for (var j = 0; j < 3; j++) {
        var xPos = ZONE_CENTERS[j] + Math.floor(Math.random() * jitter * 2) - jitter;
        row.platforms[j].setTexture(textureKey);
        row.platforms[j].setPosition(xPos, yPos);
        row.platforms[j].body.reset(xPos, yPos);
        row.platforms[j].isCorrect = (j === correctIndex);
        row.platforms[j].setVisible(true);

        var ansStr = String(answers[j]);
        row.labels[j].setText(ansStr);
        row.labels[j].setFontSize(ansStr.length > 4 ? '13px' : '16px');
        row.labels[j].setPosition(xPos, yPos);
        row.labels[j].setVisible(true);
      }

      row.active = true;
      row.correctIndex = correctIndex;
      row.question = problem.question;
      row.yPos = yPos;
      return row;
    },

    recycleRow: function(row) {
      if (!row) return;
      for (var j = 0; j < 3; j++) {
        row.platforms[j].setPosition(-9999, -9999);
        row.platforms[j].body.reset(-9999, -9999);
        row.platforms[j].setVisible(false);
        row.labels[j].setPosition(-9999, -9999);
        row.labels[j].setVisible(false);
      }
      row.active = false;
    },

    getAllRows: function() {
      return this._pool.filter(function(r) { return r.active; });
    },

    getPlatformGroup: function() {
      var platforms = [];
      this._pool.forEach(function(row) {
        row.platforms.forEach(function(p) { platforms.push(p); });
      });
      return platforms;
    }
  };
})();
```

- [ ] **Step 2: Commit**

```bash
git add mathronaut/src/utils/PlatformPool.js
git commit -m "feat(mathronaut): implement PlatformPool with 15-row object pool"
```

---

## Task 6: StartScene

**Files:**
- Modify: `mathronaut/src/scenes/StartScene.js`

- [ ] **Step 1: Replace `StartScene.js` with full implementation**

```js
var StartScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function() {
    Phaser.Scene.call(this, { key: 'StartScene' });
  },

  create: function() {
    var W = 480, H = 854;
    var self = this;
    this._selectedMode = 'normal';

    // Background
    this.add.rectangle(W / 2, H / 2, W, H, 0x0d1b2a);

    // Stars (decorative)
    for (var i = 0; i < 60; i++) {
      var sx = Phaser.Math.Between(0, W);
      var sy = Phaser.Math.Between(0, H);
      var sz = Phaser.Math.Between(1, 3);
      this.add.circle(sx, sy, sz, 0xffffff, Phaser.Math.FloatBetween(0.3, 0.9));
    }

    // Title
    this.add.text(W / 2, 120, t('title'), {
      fontSize: '52px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Astronaut (circle stand-in)
    this.add.circle(W / 2, 260, 48, 0xffffff);
    this.add.circle(W / 2, 248, 30, 0x87ceeb);

    // Mode buttons
    this._btnNormal = this._makeButton(W / 2, 400, t('modeNormal'), '#52b788', function() {
      self._selectMode('normal');
    });
    this._btnHard = this._makeButton(W / 2, 470, t('modeHard'), '#e07070', function() {
      self._selectMode('hard');
    });
    this._selectMode('normal');

    // Best scores
    var bestNormal = localStorage.getItem('mathronaut_best_normal') || null;
    var bestHard   = localStorage.getItem('mathronaut_best_hard')   || null;
    this.add.text(W / 2, 550, t('bestNormal') + ' ' + (bestNormal ? bestNormal + t('metres') : t('noRecord')), {
      fontSize: '18px', color: '#aed9b8', fontFamily: 'Arial'
    }).setOrigin(0.5);
    this.add.text(W / 2, 582, t('bestHard') + ' ' + (bestHard ? bestHard + t('metres') : t('noRecord')), {
      fontSize: '18px', color: '#e07070', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Start button
    var startBtn = this.add.text(W / 2, 680, t('start'), {
      fontSize: '32px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold',
      backgroundColor: '#1a4d2e', padding: { x: 24, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    startBtn.on('pointerdown', function() {
      self.scene.start('GameScene', { mode: self._selectedMode });
    });
    startBtn.on('pointerover', function() { startBtn.setColor('#ffffff'); });
    startBtn.on('pointerout',  function() { startBtn.setColor('#f5e642'); });
  },

  _makeButton: function(x, y, label, color, onClick) {
    var btn = this.add.text(x, y, label, {
      fontSize: '20px', color: '#ffffff', fontFamily: 'Arial',
      backgroundColor: '#223344', padding: { x: 16, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    btn.on('pointerdown', onClick);
    btn._baseColor = color;
    return btn;
  },

  _selectMode: function(mode) {
    this._selectedMode = mode;
    this._btnNormal.setBackgroundColor(mode === 'normal' ? '#1a5c3a' : '#223344');
    this._btnHard.setBackgroundColor(mode === 'hard'   ? '#5c1a1a' : '#223344');
  }
});
```

- [ ] **Step 2: Open `mathronaut/index.html` in browser and verify StartScene**

Expected: dark starfield background, "Mathronaut" title in yellow, astronaut circle, two mode buttons, best score lines, yellow "Launch →" button. Clicking Normal/Hard highlights the selected button. Language should reflect `pgame_lang`.

- [ ] **Step 3: Commit**

```bash
git add mathronaut/src/scenes/StartScene.js
git commit -m "feat(mathronaut): implement StartScene with mode selection and best scores"
```

---

## Task 7: GameScene — Physics Scaffold

**Files:**
- Modify: `mathronaut/src/scenes/GameScene.js`

- [ ] **Step 1: Replace `GameScene.js` with physics scaffold**

```js
var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function() {
    Phaser.Scene.call(this, { key: 'GameScene' });
  },

  create: function(data) {
    var W = 480, H = 854;
    this._mode = data.mode || 'normal';
    this._lives = 3;
    this._startY = 750;
    this._pixelsPerMetre = 5;
    this._currentHeight = 0;
    this._highestPlatformY = this._startY - 130;
    this._gameActive = true;

    // DifficultyManager instance
    this._difficulty = DifficultyManager.create();
    var self = this;
    this._difficulty.onTierChange(function(tier) {
      self._showZoneBanner(tier);
      self._updateBgColor(tier);
    });

    // Background rectangle (fixed to camera)
    this._bg = this.add.rectangle(W / 2, H / 2, W, H, 0x0d1b2a).setScrollFactor(0).setDepth(0);

    // Astronaut texture
    if (!this.textures.exists('astronaut')) {
      var g = this.add.graphics();
      g.fillStyle(0xffffff);
      g.fillCircle(20, 22, 18);
      g.fillStyle(0x87ceeb);
      g.fillCircle(20, 16, 11);
      g.fillStyle(0x333333);
      g.fillRect(12, 34, 5, 8);
      g.fillRect(23, 34, 5, 8);
      g.generateTexture('astronaut', 40, 44);
      g.destroy();
    }

    // Astronaut physics body
    this._astronaut = this.physics.add.sprite(W / 2, this._startY, 'astronaut');
    this._astronaut.setCollideWorldBounds(false);
    this._astronaut.body.setGravityY(0); // scene gravity handles it via config
    this._astronaut.setDepth(5);

    // Camera: manual control (no startFollow) — only scrolls up
    this._minScrollY = this.cameras.main.scrollY;

    // Keyboard input
    this._cursors = this.input.keyboard.createCursorKeys();

    // Touch input state
    this._touchLeft  = false;
    this._touchRight = false;
    this.input.on('pointerdown', function(ptr) {
      if (ptr.x < W / 2) self._touchLeft  = true;
      else                self._touchRight = true;
    });
    this.input.on('pointerup', function(ptr) {
      if (ptr.x < W / 2) self._touchLeft  = false;
      else                self._touchRight = false;
    });

    // Platform pool
    PlatformPool.init(this);
    this._spawnInitialRows();

    // Physics collider between astronaut and all pool platforms
    this._setupCollider();

    // HUD (all setScrollFactor(0))
    this._buildHUD();

    // Zone banner text (hidden initially)
    this._zoneBanner = this.add.text(W / 2, 110, '', {
      fontSize: '20px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold',
      backgroundColor: '#000000aa', padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20).setAlpha(0);
  },

  _spawnInitialRows: function() {
    var tier = this._difficulty.getTier(0);
    for (var i = 0; i < 12; i++) {
      PlatformPool.getNextRow(this._highestPlatformY, tier);
      this._highestPlatformY -= 130;
    }
  },

  _setupCollider: function() {
    var self = this;
    var allPlatforms = PlatformPool.getPlatformGroup();
    allPlatforms.forEach(function(plat) {
      self.physics.add.collider(
        self._astronaut, plat,
        function(astro, p) { self._onLand(astro, p); },
        function(astro, p) { return astro.body.velocity.y > 0; },
        self
      );
    });
  },

  _onLand: function(astronaut, platform) {
    if (!this._gameActive) return;
    if (platform.isCorrect) {
      astronaut.body.setVelocityY(-750);
      this._flashPlatform(platform, 0x00ff88);
      this._spawnStarBurst(platform.x, platform.y);
      this._advanceQuestion();
    } else {
      this._wrongLanding(platform);
    }
  },

  _advanceQuestion: function() {
    var tier = this._difficulty.getTier(this._currentHeight);
    var rows = PlatformPool.getAllRows();
    // The top question shown is always from the highest unvisited row above the camera
    // After landing correctly, nothing to do here except let the pool generate next row naturally
  },

  _wrongLanding: function(platform) {
    this._crumblePlatform(platform);
    if (this._mode === 'hard') {
      this._triggerGameOver();
    } else {
      this._lives--;
      this._updateHearts();
      if (this._lives <= 0) {
        this._triggerGameOver();
      } else {
        this._respawnAbove(platform.y);
      }
    }
  },

  _crumblePlatform: function(platform) {
    var self = this;
    this.tweens.add({
      targets: platform,
      alpha: 0, y: platform.y + 120,
      duration: 500, ease: 'Power1',
      onComplete: function() {
        platform.setAlpha(1);
        platform.setPosition(-9999, -9999);
        platform.body.reset(-9999, -9999);
        platform.isCorrect = false;
      }
    });
    this.cameras.main.shake(120, 0.005);
    this._astronaut.setTint(0xff4444);
    this.time.delayedCall(300, function() { self._astronaut.clearTint(); });
  },

  _respawnAbove: function(failedY) {
    this._astronaut.setPosition(240, failedY - 200);
    this._astronaut.body.setVelocityY(-600);
  },

  _triggerGameOver: function() {
    if (!this._gameActive) return;
    this._gameActive = false;
    var self = this;
    this.time.delayedCall(600, function() {
      self.scene.start('GameOverScene', {
        mode: self._mode,
        height: self._currentHeight,
        tier: self._difficulty.getTier(self._currentHeight)
      });
    });
  },

  _flashPlatform: function(platform, color) {
    var origTint = platform.tintTopLeft;
    platform.setTint(color);
    this.time.delayedCall(200, function() { platform.clearTint(); });
  },

  _spawnStarBurst: function(x, y) {
    for (var i = 0; i < 6; i++) {
      var angle = (Math.PI * 2 / 6) * i;
      var star = this.add.circle(x, y, 4, 0xf5e642).setDepth(10);
      this.tweens.add({
        targets: star,
        x: x + Math.cos(angle) * 40,
        y: y + Math.sin(angle) * 40,
        alpha: 0, scale: 0,
        duration: 350, ease: 'Power2',
        onComplete: function() { star.destroy(); }
      });
    }
  },

  _buildHUD: function() {
    var W = 480;
    // Question band background
    this.add.rectangle(W / 2, 35, W, 60, 0x000000, 0.65).setScrollFactor(0).setDepth(15);

    // Question text
    this._questionText = this.add.text(W / 2, 35, '', {
      fontSize: '28px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(16);

    // Height display
    this._heightText = this.add.text(12, 70, '🚀 0m', {
      fontSize: '18px', color: '#aed9b8', fontFamily: 'Arial'
    }).setScrollFactor(0).setDepth(16);

    // Hearts (Normal mode only)
    this._heartsText = this.add.text(W - 12, 70, '', {
      fontSize: '20px', fontFamily: 'Arial'
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(16);
    this._updateHearts();

    // Show first question
    this._refreshQuestion();
  },

  _updateHearts: function() {
    if (this._mode === 'normal') {
      this._heartsText.setText('❤️'.repeat(this._lives));
    }
  },

  _refreshQuestion: function() {
    var rows = PlatformPool.getAllRows();
    if (rows.length === 0) return;
    // Find row closest above camera top
    var camTop = this.cameras.main.scrollY;
    var nearest = null;
    var nearestDist = Infinity;
    rows.forEach(function(row) {
      var dist = Math.abs(row.yPos - camTop);
      if (dist < nearestDist) { nearestDist = dist; nearest = row; }
    });
    if (nearest) this._questionText.setText(nearest.question);
  },

  _showZoneBanner: function(tier) {
    var key = 'zoneT' + tier;
    this._zoneBanner.setText(t(key));
    this._zoneBanner.setAlpha(1);
    this.tweens.add({
      targets: this._zoneBanner,
      alpha: 0, duration: 2000, delay: 1500, ease: 'Power1'
    });
  },

  _updateBgColor: function(tier) {
    var colors = [0x0d1b2a, 0x1a0a2e, 0x050510, 0x000005];
    this.tweens.addCounter({
      from: 0, to: 1, duration: 2000,
      onUpdate: (tween) => {
        var t = tween.getValue();
        var from = colors[tier - 2] || colors[0];
        var to   = colors[tier - 1];
        var r = Math.floor(Phaser.Math.Linear((from >> 16) & 0xff, (to >> 16) & 0xff, t));
        var g2 = Math.floor(Phaser.Math.Linear((from >> 8)  & 0xff, (to >> 8)  & 0xff, t));
        var b  = Math.floor(Phaser.Math.Linear( from        & 0xff,  to        & 0xff, t));
        this._bg.setFillStyle((r << 16) | (g2 << 8) | b);
      }
    });
  },

  update: function() {
    if (!this._gameActive) return;

    var HSPEED = 220;
    var vx = 0;
    if (this._cursors.left.isDown  || this._touchLeft)  vx = -HSPEED;
    if (this._cursors.right.isDown || this._touchRight) vx =  HSPEED;
    this._astronaut.body.setVelocityX(vx);

    // Screen wrap
    if (this._astronaut.x < -20)  this._astronaut.x = 500;
    if (this._astronaut.x > 500)  this._astronaut.x = -20;

    // Camera: only scroll up
    var targetScrollY = this._astronaut.y - 680;
    if (targetScrollY < this._minScrollY) {
      this._minScrollY = targetScrollY;
      this.cameras.main.scrollY = this._minScrollY;
    }

    // Update height
    var h = Math.max(0, Math.floor((this._startY - this._astronaut.y) / this._pixelsPerMetre));
    if (h !== this._currentHeight) {
      this._currentHeight = h;
      this._heightText.setText('🚀 ' + h + t('metres'));
      this._difficulty.update(h);
    }

    // Spawn new rows as camera scrolls up
    var camTop = this.cameras.main.scrollY;
    while (this._highestPlatformY > camTop - 400) {
      var tier = this._difficulty.getTier(this._currentHeight);
      PlatformPool.getNextRow(this._highestPlatformY, tier);
      this._highestPlatformY -= 130;
    }

    // Recycle rows below camera
    var camBottom = camTop + 854;
    var self = this;
    PlatformPool.getAllRows().forEach(function(row) {
      if (row.yPos > camBottom + 200) {
        PlatformPool.recycleRow(row);
      }
    });

    // Refresh question display
    this._refreshQuestion();

    // Detect fall off screen bottom
    if (this._astronaut.y > camBottom + 50 && this._gameActive) {
      this._onFallOffScreen();
    }
  },

  _onFallOffScreen: function() {
    if (!this._gameActive) return;
    this.cameras.main.shake(120, 0.005);
    if (this._mode === 'hard') {
      this._triggerGameOver();
    } else {
      this._lives--;
      this._updateHearts();
      if (this._lives <= 0) {
        this._triggerGameOver();
      } else {
        // Respawn near top of current camera view
        this._astronaut.setPosition(240, this.cameras.main.scrollY + 300);
        this._astronaut.body.setVelocityY(-600);
      }
    }
  }
});
```

- [ ] **Step 2: Open `mathronaut/index.html`, click Launch, verify gameplay**

Checks:
- Astronaut appears near bottom, falls with gravity
- Platforms visible with answer labels
- Arrow keys (or screen tap) steer left/right
- Camera scrolls upward as astronaut climbs
- Camera does NOT scroll down when astronaut falls
- Height counter in top-left updates as you climb
- Wrong platform: red flash, crumble animation, life lost (Normal) or game over (Hard)
- Correct platform: green flash, star burst, bounce
- Console has no errors

- [ ] **Step 3: Commit**

```bash
git add mathronaut/src/scenes/GameScene.js
git commit -m "feat(mathronaut): implement GameScene with physics, platform pool, HUD, and game modes"
```

---

## Task 8: GameOverScene

**Files:**
- Modify: `mathronaut/src/scenes/GameOverScene.js`

- [ ] **Step 1: Replace `GameOverScene.js` with full implementation**

```js
var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function() {
    Phaser.Scene.call(this, { key: 'GameOverScene' });
  },

  create: function(data) {
    var W = 480, H = 854;
    var mode      = data.mode   || 'normal';
    var height    = data.height || 0;
    var tier      = data.tier   || 1;

    // Save best score
    var bestKey = 'mathronaut_best_' + mode;
    var prev = parseInt(localStorage.getItem(bestKey)) || 0;
    var isNewBest = height > prev;
    if (isNewBest) localStorage.setItem(bestKey, height);

    // Background
    this.add.rectangle(W / 2, H / 2, W, H, 0x050510);

    // Stars
    for (var i = 0; i < 80; i++) {
      var sx = Phaser.Math.Between(0, W);
      var sy = Phaser.Math.Between(0, H);
      this.add.circle(sx, sy, Phaser.Math.Between(1, 2), 0xffffff,
        Phaser.Math.FloatBetween(0.2, 0.8));
    }

    // Floating astronaut (bouncing tween)
    var astro = this.add.circle(W / 2, 220, 42, 0xffffff);
    this.add.circle(W / 2, 208, 26, 0x87ceeb);
    this.tweens.add({ targets: [astro], y: 230, yoyo: true, repeat: -1, duration: 1200, ease: 'Sine.easeInOut' });

    // Game over title
    this.add.text(W / 2, 310, t('gameOver'), {
      fontSize: '44px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Height
    this.add.text(W / 2, 385, t('height') + ': ' + height + t('metres'), {
      fontSize: '28px', color: '#ffffff', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // New best indicator
    if (isNewBest) {
      this.add.text(W / 2, 425, '★ ' + t('best') + '! ★', {
        fontSize: '22px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5);
    } else {
      var bestVal = Math.max(prev, height);
      this.add.text(W / 2, 425, t('best') + ': ' + bestVal + t('metres'), {
        fontSize: '20px', color: '#aed9b8', fontFamily: 'Arial'
      }).setOrigin(0.5);
    }

    // Zone reached
    var tierNames = t('tierNames');
    var zoneName = tierNames[tier - 1] || tierNames[0];
    this.add.text(W / 2, 468, t('tierReached') + ': ' + zoneName, {
      fontSize: '18px', color: '#aed9b8', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Retry button
    var self = this;
    var retryBtn = this.add.text(W / 2, 570, t('retry'), {
      fontSize: '30px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold',
      backgroundColor: '#1a4d2e', padding: { x: 24, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    retryBtn.on('pointerdown', function() { self.scene.start('StartScene'); });
    retryBtn.on('pointerover', function() { retryBtn.setColor('#ffffff'); });
    retryBtn.on('pointerout',  function() { retryBtn.setColor('#f5e642'); });

    // Back button
    var backBtn = this.add.text(W / 2, 652, t('back'), {
      fontSize: '20px', color: '#52b788', fontFamily: 'Arial',
      padding: { x: 16, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', function() { window.location.href = '../index.html'; });
    backBtn.on('pointerover', function() { backBtn.setColor('#ffffff'); });
    backBtn.on('pointerout',  function() { backBtn.setColor('#52b788'); });
  }
});
```

- [ ] **Step 2: Play through a full round (or let yourself die in Hard mode) and verify GameOverScene**

Checks:
- Game over title, height shown correctly
- Personal best updated in localStorage if new high
- "★ Best! ★" shown when a new record is set
- Zone name shown (e.g. "Atmosphere")
- Retry → back to StartScene
- Back → browser navigates to portal

- [ ] **Step 3: Commit**

```bash
git add mathronaut/src/scenes/GameOverScene.js
git commit -m "feat(mathronaut): implement GameOverScene with best-score tracking and navigation"
```

---

## Task 9: End-to-End Polish & Verification

**Files:**
- Modify: `mathronaut/src/scenes/GameScene.js` (if any issues found)

- [ ] **Step 1: Play a full game in Normal mode — verify tier transitions**

Climb past 300m, 700m, 1200m. Verify:
- Background color shifts gradually (deep blue → purple → dark void → near black)
- Zone banner fades in at each tier threshold with correct text in current language
- Math problems get harder: addition/subtraction → multiplication → division → fractions
- Fraction problems display correctly with "/" notation

- [ ] **Step 2: Play Hard mode — verify instant game over on wrong platform**

Land on a wrong answer. Expected: crumble animation, immediate transition to GameOverScene (no heart loss).

- [ ] **Step 3: Play Normal mode to 0 lives — verify heart loss and respawn**

Land on 3 wrong platforms. Expected: heart removed each time, respawn above failed row, game over on 3rd wrong landing.

- [ ] **Step 4: Test on mobile viewport (or browser devtools 390×844 device)**

Resize browser to portrait mobile dimensions. Verify:
- Canvas scales to fill screen (FIT + CENTER_BOTH)
- Touch left/right half steers correctly
- Question text and answer labels are legible
- HUD doesn't overlap playfield

- [ ] **Step 5: Test language switch**

In portal, toggle to English. Open Mathronaut. Verify all text (mode names, zone banners, game over screen, back button) is in English. Toggle back to German and verify German text.

- [ ] **Step 6: Verify portal card on main index.html**

Open portal (repo-root `index.html`). Verify Mathronaut card appears with 🚀 emoji, correct title/description in both languages, and clicking it opens the game.

- [ ] **Step 7: Final commit**

```bash
git add mathronaut/
git commit -m "feat(mathronaut): complete Mathronaut game — all scenes, i18n, portal integration"
```
