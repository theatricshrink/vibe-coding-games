# Multilanguage Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add DE/EN language switching to the Pflanzenwelt game and the portal overview page.

**Architecture:** A global `LANG` variable (set from `localStorage` by `lang.js`, loaded first) controls which strings and questions are used. All UI text lives in `strings.js`. The portal has inline `PORTAL_STRINGS` and `data-i18n` attributes for in-place re-rendering. No build tools, no frameworks — pure ES5 globals.

**Tech Stack:** Vanilla ES5, Phaser 3, localStorage, static HTML/CSS.

---

### Task 1: Create `lang.js` — global language initialiser

**Files:**
- Create: `pflanzenwelt/src/i18n/lang.js`

- [ ] **Step 1: Create the file**

```js
// pflanzenwelt/src/i18n/lang.js
var LANG = (localStorage.getItem('pgame_lang') === 'en') ? 'en' : 'de';
```

- [ ] **Step 2: Verify manually**

Open browser console on any page that loads this script and run:
```js
localStorage.setItem('pgame_lang', 'en');
location.reload();
console.log(LANG); // expected: "en"
localStorage.setItem('pgame_lang', 'de');
location.reload();
console.log(LANG); // expected: "de"
```

- [ ] **Step 3: Commit**

```bash
git add pflanzenwelt/src/i18n/lang.js
git commit -m "feat: add lang.js global language initialiser"
```

---

### Task 2: Create `strings.js` — all game UI strings

**Files:**
- Create: `pflanzenwelt/src/i18n/strings.js`

- [ ] **Step 1: Create the file**

```js
// pflanzenwelt/src/i18n/strings.js
var STRINGS = {
  de: {
    // StartScene
    title:       '🌿 Pflanzenwelt 🌿',
    subtitle:    'Fange alle 8 Kreaturen!',
    howToPlay:   'Wie spielt man?',
    startPrompt: 'Drücke eine Taste oder klicke zum Starten',
    instructions: [
      ['⬆⬇⬅➡', 'Bewege dich mit den Pfeiltasten oder WASD'],
      ['🌿',    'Laufe durch das hohe Gras um Kreaturen zu treffen'],
      ['❓',    'Beantworte die Frage richtig um sie zu fangen'],
      ['✖',    'Falsche Antwort? Die Kreatur flieht!'],
      ['⭐',    'Seltene Kreaturen brauchen 2 richtige Antworten'],
      ['📖',   'Drücke C um deine Sammlung anzusehen']
    ],
    // GameScene
    categories: ['Mathe', 'Deutsch', 'Allgemeinwissen'],
    // QuizScene
    caught:  'Gefangen! 🎉',
    correct: '✓ Richtig!',
    bye:     'Tschüss! 👋',
    // CollectionScene
    caughtHeader: 'Gefangen',
    closeHint:    '[C] oder [Esc] zum Schließen',
    caughtLabel:  'Gefangen!',
    // WinScene
    winTitle:    '🏆 Du hast gewonnen! 🏆',
    winSubtitle: 'Alle 8 Kreaturen gefangen — Pflanzenwelt-Meister!',
    playAgain:   '🔄 Nochmal spielen',
    // Rarity labels
    rarity: { common: 'häufig', uncommon: 'ungewöhnlich', rare: 'selten' }
  },
  en: {
    // StartScene
    title:       '🌿 Plant World 🌿',
    subtitle:    'Catch all 8 creatures!',
    howToPlay:   'How to play?',
    startPrompt: 'Press any key or click to start',
    instructions: [
      ['⬆⬇⬅➡', 'Move with arrow keys or WASD'],
      ['🌿',    'Walk through tall grass to meet creatures'],
      ['❓',    'Answer the question correctly to catch them'],
      ['✖',    'Wrong answer? The creature runs away!'],
      ['⭐',    'Rare creatures need 2 correct answers'],
      ['📖',   'Press C to view your collection']
    ],
    // GameScene
    categories: ['Maths', 'English', 'General Knowledge'],
    // QuizScene
    caught:  'Caught! 🎉',
    correct: '✓ Correct!',
    bye:     'Bye! 👋',
    // CollectionScene
    caughtHeader: 'Caught',
    closeHint:    '[C] or [Esc] to close',
    caughtLabel:  'Caught!',
    // WinScene
    winTitle:    '🏆 You won! 🏆',
    winSubtitle: 'All 8 creatures caught — Plant World Master!',
    playAgain:   '🔄 Play again',
    // Rarity labels
    rarity: { common: 'common', uncommon: 'uncommon', rare: 'rare' }
  }
};
```

- [ ] **Step 2: Commit**

```bash
git add pflanzenwelt/src/i18n/strings.js
git commit -m "feat: add strings.js with DE/EN UI translations"
```

---

### Task 3: Add English creature names to `creatures.js`

**Files:**
- Modify: `pflanzenwelt/src/data/creatures.js`

- [ ] **Step 1: Add `nameEn` to every creature**

Replace the entire file content:

```js
var CREATURES = [
  { id: 'blaettchen', name: 'Blättchen', nameEn: 'Leafling',   emoji: '🍃', color: 0x4CAF50, rarity: 'common',   weight: 40 },
  { id: 'mooskind',   name: 'Mooskind',  nameEn: 'Mossy',      emoji: '🟢', color: 0x2E7D32, rarity: 'common',   weight: 40 },
  { id: 'dornika',    name: 'Dornika',   nameEn: 'Thornia',    emoji: '🌵', color: 0x66BB6A, rarity: 'common',   weight: 40 },
  { id: 'blumsel',    name: 'Blumsel',   nameEn: 'Bloomlet',   emoji: '🌸', color: 0xF48FB1, rarity: 'uncommon', weight: 15 },
  { id: 'rankbert',   name: 'Rankbert',  nameEn: 'Tangleton',  emoji: '🐍', color: 0x558B2F, rarity: 'uncommon', weight: 15 },
  { id: 'pilzling',   name: 'Pilzling',  nameEn: 'Shroomling', emoji: '🍄', color: 0xE53935, rarity: 'uncommon', weight: 15 },
  { id: 'baumgeist',  name: 'Baumgeist', nameEn: 'Treespirit', emoji: '🌳', color: 0x8D6E63, rarity: 'rare',     weight: 5  },
  { id: 'bisaknosp',  name: 'Bisaknosp', nameEn: 'Budling',    emoji: '🌱', color: 0x26A69A, rarity: 'rare',     weight: 5  }
];
```

- [ ] **Step 2: Commit**

```bash
git add pflanzenwelt/src/data/creatures.js
git commit -m "feat: add English creature names (nameEn)"
```

---

### Task 4: Add English questions to `questions.js`

**Files:**
- Modify: `pflanzenwelt/src/data/questions.js`

- [ ] **Step 1: Rename existing array to `QUESTIONS_DE` at the top of the file**

Change the opening line from:
```js
var QUESTIONS = [
```
to:
```js
var QUESTIONS_DE = [
```

And the closing bracket stays the same. The existing 45 questions are now `QUESTIONS_DE`.

- [ ] **Step 2: Add `QUESTIONS_EN` after `QUESTIONS_DE`**

Append after the `QUESTIONS_DE` closing `];`:

```js
var QUESTIONS_EN = [
  // Maths (15)
  { id: 'e_m1',  category: 'Maths', frage: 'What is 7 × 8?',
    optionen: ['48', '56', '63', '49'], antwort: 'B' },
  { id: 'e_m2',  category: 'Maths', frage: 'What is 144 ÷ 12?',
    optionen: ['10', '11', '13', '12'], antwort: 'D' },
  { id: 'e_m3',  category: 'Maths', frage: 'What is 25% of 80?',
    optionen: ['20', '15', '25', '30'], antwort: 'A' },
  { id: 'e_m4',  category: 'Maths', frage: 'What is 15 + 28?',
    optionen: ['41', '42', '43', '44'], antwort: 'C' },
  { id: 'e_m5',  category: 'Maths', frage: 'What is 9²?',
    optionen: ['18', '81', '72', '90'], antwort: 'B' },
  { id: 'e_m6',  category: 'Maths', frage: 'Round 347 to the nearest hundred.',
    optionen: ['350', '400', '340', '300'], antwort: 'D' },
  { id: 'e_m7',  category: 'Maths', frage: 'What is ¾ of 20?',
    optionen: ['15', '12', '16', '18'], antwort: 'A' },
  { id: 'e_m8',  category: 'Maths', frage: 'What is 56 ÷ 7?',
    optionen: ['6', '7', '8', '9'], antwort: 'C' },
  { id: 'e_m9',  category: 'Maths', frage: 'How many cm are in 1.5 m?',
    optionen: ['15', '150', '105', '1500'], antwort: 'B' },
  { id: 'e_m10', category: 'Maths', frage: 'What is 4 × 9 + 3?',
    optionen: ['48', '51', '36', '39'], antwort: 'D' },
  { id: 'e_m11', category: 'Maths', frage: 'What is 1000 − 387?',
    optionen: ['613', '623', '603', '633'], antwort: 'A' },
  { id: 'e_m12', category: 'Maths', frage: 'What is ⅖ of 50?',
    optionen: ['10', '25', '20', '15'], antwort: 'C' },
  { id: 'e_m13', category: 'Maths', frage: 'Which number is the largest?',
    optionen: ['0.49', '0.505', '0.5', '0.45'], antwort: 'B' },
  { id: 'e_m14', category: 'Maths', frage: 'What is 6²?',
    optionen: ['12', '30', '42', '36'], antwort: 'D' },
  { id: 'e_m15', category: 'Maths', frage: 'How many minutes are in 2.5 hours?',
    optionen: ['150', '120', '180', '135'], antwort: 'A' },

  // English (15)
  { id: 'e_e1',  category: 'English', frage: 'Which word is a noun?',
    optionen: ['run', 'quickly', 'happiness', 'green'], antwort: 'C' },
  { id: 'e_e2',  category: 'English', frage: 'How many syllables does "elephant" have?',
    optionen: ['2', '3', '4', '1'], antwort: 'B' },
  { id: 'e_e3',  category: 'English', frage: 'What is the plural of "mouse"?',
    optionen: ['mouses', 'mices', 'mousies', 'mice'], antwort: 'D' },
  { id: 'e_e4',  category: 'English', frage: 'Which sentence is correct?',
    optionen: ['She goes to school.', 'She go to school.', 'She goed to school.', 'She going to school.'], antwort: 'A' },
  { id: 'e_e5',  category: 'English', frage: 'What is the opposite of "ancient"?',
    optionen: ['old', 'heavy', 'modern', 'small'], antwort: 'C' },
  { id: 'e_e6',  category: 'English', frage: 'Which word rhymes with "flight"?',
    optionen: ['flit', 'fright', 'fling', 'flick'], antwort: 'B' },
  { id: 'e_e7',  category: 'English', frage: 'What type of word is "quickly"?',
    optionen: ['noun', 'verb', 'adjective', 'adverb'], antwort: 'D' },
  { id: 'e_e8',  category: 'English', frage: 'Which word is spelled correctly?',
    optionen: ['receive', 'recieve', 'receve', 'receieve'], antwort: 'A' },
  { id: 'e_e9',  category: 'English', frage: 'What is the past tense of "swim"?',
    optionen: ['swimmed', 'swimed', 'swam', 'swum'], antwort: 'C' },
  { id: 'e_e10', category: 'English', frage: 'How many syllables does "butterfly" have?',
    optionen: ['2', '3', '4', '1'], antwort: 'B' },
  { id: 'e_e11', category: 'English', frage: 'Which word is an adjective?',
    optionen: ['run', 'slowly', 'think', 'beautiful'], antwort: 'D' },
  { id: 'e_e12', category: 'English', frage: 'What does the prefix "un-" mean?',
    optionen: ['not', 'again', 'before', 'after'], antwort: 'A' },
  { id: 'e_e13', category: 'English', frage: 'Which word is a verb?',
    optionen: ['table', 'red', 'jump', 'quickly'], antwort: 'C' },
  { id: 'e_e14', category: 'English', frage: 'What is a synonym for "big"?',
    optionen: ['tiny', 'large', 'quick', 'cold'], antwort: 'B' },
  { id: 'e_e15', category: 'English', frage: 'What punctuation mark ends a question?',
    optionen: ['.', '!', ',', '?'], antwort: 'D' },

  // General Knowledge (15)
  { id: 'e_g1',  category: 'General Knowledge', frage: 'How many legs does a spider have?',
    optionen: ['6', '8', '10', '4'], antwort: 'B' },
  { id: 'e_g2',  category: 'General Knowledge', frage: 'What is the capital of France?',
    optionen: ['London', 'Berlin', 'Rome', 'Paris'], antwort: 'D' },
  { id: 'e_g3',  category: 'General Knowledge', frage: 'Which planet is closest to the Sun?',
    optionen: ['Mercury', 'Venus', 'Earth', 'Mars'], antwort: 'A' },
  { id: 'e_g4',  category: 'General Knowledge', frage: 'How many sides does a hexagon have?',
    optionen: ['5', '7', '6', '8'], antwort: 'C' },
  { id: 'e_g5',  category: 'General Knowledge', frage: 'What do plants need to make food (photosynthesis)?',
    optionen: ['water and soil', 'sunlight, water and CO₂', 'soil and air', 'water and CO₂ only'], antwort: 'B' },
  { id: 'e_g6',  category: 'General Knowledge', frage: 'Which animal lays the largest eggs?',
    optionen: ['eagle', 'crocodile', 'shark', 'ostrich'], antwort: 'D' },
  { id: 'e_g7',  category: 'General Knowledge', frage: 'How many continents are there on Earth?',
    optionen: ['7', '5', '6', '8'], antwort: 'A' },
  { id: 'e_g8',  category: 'General Knowledge', frage: 'What is the hardest natural material?',
    optionen: ['gold', 'iron', 'diamond', 'granite'], antwort: 'C' },
  { id: 'e_g9',  category: 'General Knowledge', frage: 'Which organ pumps blood around the body?',
    optionen: ['lungs', 'heart', 'liver', 'brain'], antwort: 'B' },
  { id: 'e_g10', category: 'General Knowledge', frage: 'How many bones does an adult human have?',
    optionen: ['106', '306', '406', '206'], antwort: 'D' },
  { id: 'e_g11', category: 'General Knowledge', frage: 'What gas do plants release during photosynthesis?',
    optionen: ['oxygen', 'carbon dioxide', 'nitrogen', 'hydrogen'], antwort: 'A' },
  { id: 'e_g12', category: 'General Knowledge', frage: 'Which is the largest ocean?',
    optionen: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], antwort: 'C' },
  { id: 'e_g13', category: 'General Knowledge', frage: 'How many planets are in our solar system?',
    optionen: ['7', '8', '9', '10'], antwort: 'B' },
  { id: 'e_g14', category: 'General Knowledge', frage: 'What is the fastest land animal?',
    optionen: ['lion', 'horse', 'leopard', 'cheetah'], antwort: 'D' },
  { id: 'e_g15', category: 'General Knowledge', frage: 'Which country is home to the kangaroo?',
    optionen: ['Australia', 'New Zealand', 'Brazil', 'South Africa'], antwort: 'A' }
];

var QUESTIONS = LANG === 'en' ? QUESTIONS_EN : QUESTIONS_DE;
```

- [ ] **Step 3: Verify the question count**

Open browser console after loading the game and run:
```js
console.log(QUESTIONS_DE.length); // expected: 45
console.log(QUESTIONS_EN.length); // expected: 45
console.log(QUESTIONS.length);    // expected: 45 (whichever language is active)
```

- [ ] **Step 4: Commit**

```bash
git add pflanzenwelt/src/data/questions.js
git commit -m "feat: add 45 English questions and LANG-based selector"
```

---

### Task 5: Update `pflanzenwelt/index.html` — load order and lang attribute

**Files:**
- Modify: `pflanzenwelt/index.html`

- [ ] **Step 1: Update the script load order and set lang attribute dynamically**

Replace the entire `<body>` section (keep `<head>` unchanged except add the dynamic lang script):

```html
<!DOCTYPE html>
<html lang="de" id="html-root">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pflanzenwelt</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
    #back-btn {
      position: fixed; top: 10px; left: 12px; z-index: 100;
      color: #52b788; font-family: sans-serif; font-size: 13px;
      text-decoration: none; opacity: 0.7;
    }
    #back-btn:hover { opacity: 1; color: #f5e642; }
  </style>
</head>
<body>
  <a id="back-btn" href="../index.html"></a>
  <!-- Phaser MUST load first — scene files call Phaser.Class at parse time -->
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
  <!-- lang.js MUST come before creatures.js, questions.js, strings.js -->
  <script src="src/i18n/lang.js"></script>
  <script>
    document.getElementById('html-root').lang = LANG;
    document.getElementById('back-btn').textContent = LANG === 'en' ? '← Overview' : '← Übersicht';
  </script>
  <script src="src/data/creatures.js"></script>
  <script src="src/data/questions.js"></script>
  <script src="src/i18n/strings.js"></script>
  <script src="src/utils/weightedRandom.js"></script>
  <script src="src/utils/questionPool.js"></script>
  <script src="src/scenes/StartScene.js"></script>
  <script src="src/scenes/GameScene.js"></script>
  <script src="src/scenes/QuizScene.js"></script>
  <script src="src/scenes/CollectionScene.js"></script>
  <script src="src/scenes/WinScene.js"></script>
  <script src="src/main.js"></script>
</body>
</html>
```

**Important load order rules:**
- Phaser CDN must be first — scene files call `Phaser.Class` at parse time, so `Phaser` must exist
- `lang.js` must come before `creatures.js`, `questions.js`, and `strings.js` — they depend on `LANG`

- [ ] **Step 2: Commit**

```bash
git add pflanzenwelt/index.html
git commit -m "feat: update load order for i18n, set dynamic lang attribute"
```

---

### Task 6: Update scenes to use `STRINGS[LANG]`

**Files:**
- Modify: `pflanzenwelt/src/scenes/StartScene.js`
- Modify: `pflanzenwelt/src/scenes/GameScene.js`
- Modify: `pflanzenwelt/src/scenes/QuizScene.js`
- Modify: `pflanzenwelt/src/scenes/CollectionScene.js`
- Modify: `pflanzenwelt/src/scenes/WinScene.js`

#### StartScene.js

- [ ] **Step 1: Replace hardcoded strings**

Find and replace these lines in `StartScene.js`:

```js
// OLD line 20-22
this.add.text(W / 2, 75, '🌿 Pflanzenwelt 🌿', {
this.add.text(W / 2, 138, 'Fange alle 8 Kreaturen!', {
// OLD line 32
this.add.text(W / 2, 210, 'Wie spielt man?', {
// OLD line 36 (instructions array)
var lines = [
  ['⬆⬇⬅➡', 'Bewege dich mit den Pfeiltasten oder WASD'],
  ...
];
// OLD line 55
var prompt = this.add.text(W / 2, 658, 'Drücke eine Taste oder klicke zum Starten', {
```

Replace with:

```js
this.add.text(W / 2, 75, STRINGS[LANG].title, {
  fontSize: '50px', color: '#f5e642', fontStyle: 'bold'
}).setOrigin(0.5);

this.add.text(W / 2, 138, STRINGS[LANG].subtitle, {
  fontSize: '22px', color: '#52b788'
}).setOrigin(0.5);

// ...

this.add.text(W / 2, 210, STRINGS[LANG].howToPlay, {
  fontSize: '26px', color: '#ffffff', fontStyle: 'bold'
}).setOrigin(0.5);

var lines = STRINGS[LANG].instructions;

// ...

var prompt = this.add.text(W / 2, 658, STRINGS[LANG].startPrompt, {
  fontSize: '22px', color: '#f5e642'
}).setOrigin(0.5);
```

#### GameScene.js

- [ ] **Step 2: Replace hardcoded category array**

Find in `GameScene._startEncounter`:
```js
var categories = ['Mathe', 'Deutsch', 'Allgemeinwissen'];
```

Replace with:
```js
var categories = STRINGS[LANG].categories;
```

#### QuizScene.js

- [ ] **Step 3: Replace creature name and feedback strings**

Find in `create()`:
```js
this._creatureName = this.add.text(W / 2, 230, this._creature.name, {
```
Replace with:
```js
this._creatureName = this.add.text(W / 2, 230, LANG === 'en' ? this._creature.nameEn : this._creature.name, {
```

Find in `_correct()`:
```js
var feedbackText = isLast ? 'Gefangen! 🎉' : '✓ Richtig!';
```
Replace with:
```js
var feedbackText = isLast ? STRINGS[LANG].caught : STRINGS[LANG].correct;
```

Find in `_wrong()`:
```js
this.add.text(480, 610, 'Tschüss! 👋', {
```
Replace with:
```js
this.add.text(480, 610, STRINGS[LANG].bye, {
```

#### CollectionScene.js

- [ ] **Step 4: Replace hardcoded strings**

Find:
```js
this.add.text(W / 2, 40, 'Gefangen: ' + caught + ' / ' + CREATURES.length, {
```
Replace with:
```js
this.add.text(W / 2, 40, STRINGS[LANG].caughtHeader + ': ' + caught + ' / ' + CREATURES.length, {
```

Find:
```js
this.add.text(W / 2, 80, '[C] oder [Esc] zum Schließen', {
```
Replace with:
```js
this.add.text(W / 2, 80, STRINGS[LANG].closeHint, {
```

Find (inside the caught card block):
```js
this.add.text(cx + cardW / 2, cy + 120, c.name, {
```
Replace with:
```js
this.add.text(cx + cardW / 2, cy + 120, LANG === 'en' ? c.nameEn : c.name, {
```

Find:
```js
this.add.text(cx + cardW / 2, cy + 155, 'Gefangen!', {
```
Replace with:
```js
this.add.text(cx + cardW / 2, cy + 155, STRINGS[LANG].caughtLabel, {
```

Find:
```js
this.add.text(cx + cardW / 2, cy + 178, c.rarity, {
```
Replace with:
```js
this.add.text(cx + cardW / 2, cy + 178, STRINGS[LANG].rarity[c.rarity], {
```

#### WinScene.js

- [ ] **Step 5: Replace hardcoded strings**

Find:
```js
var title = this.add.text(W / 2, 62, '🏆 Du hast gewonnen! 🏆', {
```
Replace with:
```js
var title = this.add.text(W / 2, 62, STRINGS[LANG].winTitle, {
```

Find:
```js
this.add.text(W / 2, 122, 'Alle 8 Kreaturen gefangen — Pflanzenwelt-Meister!', {
```
Replace with:
```js
this.add.text(W / 2, 122, STRINGS[LANG].winSubtitle, {
```

Find (creature name in card):
```js
var name  = self.add.text(0, 20, cr.name, {
```
Replace with:
```js
var name  = self.add.text(0, 20, LANG === 'en' ? cr.nameEn : cr.name, {
```

Find (rarity label in card):
```js
var rarity = self.add.text(0, 44, cr.rarity, {
```
Replace with:
```js
var rarity = self.add.text(0, 44, STRINGS[LANG].rarity[cr.rarity], {
```

Find:
```js
var btnLabel = this.add.text(W / 2, 658, '🔄 Nochmal spielen', {
```
Replace with:
```js
var btnLabel = this.add.text(W / 2, 658, STRINGS[LANG].playAgain, {
```

- [ ] **Step 6: Verify in browser**

1. Set `localStorage.setItem('pgame_lang', 'de')`, open `pflanzenwelt/index.html` — all text should be German
2. Set `localStorage.setItem('pgame_lang', 'en')`, reload — all text should be English, encounters should work and show English questions

- [ ] **Step 7: Commit**

```bash
git add pflanzenwelt/src/scenes/StartScene.js pflanzenwelt/src/scenes/GameScene.js pflanzenwelt/src/scenes/QuizScene.js pflanzenwelt/src/scenes/CollectionScene.js pflanzenwelt/src/scenes/WinScene.js
git commit -m "feat: replace hardcoded strings in all scenes with STRINGS[LANG]"
```

---

### Task 7: Add DE/EN language toggle to portal `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the entire `index.html` with the translated version**

```html
<!DOCTYPE html>
<html lang="de" id="html-root">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wilmas Vibe Coding Spielesammlung</title>
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
    .lang-toggle {
      position: fixed;
      top: 14px;
      right: 16px;
      display: flex;
      gap: 6px;
    }
    .lang-btn {
      background: #1b4332;
      border: 1px solid #52b788;
      border-radius: 5px;
      color: #aed9b8;
      font-size: 0.85rem;
      padding: 4px 10px;
      cursor: pointer;
    }
    .lang-btn.active {
      background: #2c5f2e;
      border-color: #f5e642;
      color: #f5e642;
      font-weight: bold;
    }
    .lang-btn:hover { border-color: #f5e642; color: #f5e642; }
  </style>
</head>
<body>

  <div class="lang-toggle">
    <button class="lang-btn" id="btn-de" onclick="setLang('de')">🇩🇪 DE</button>
    <button class="lang-btn" id="btn-en" onclick="setLang('en')">🇬🇧 EN</button>
  </div>

  <h1 id="portal-heading"></h1>
  <p class="subtitle" id="portal-subtitle"></p>

  <div class="grid">
    <a class="card" href="./pflanzenwelt/index.html">
      <div class="card-emoji">🌿</div>
      <div class="card-title" id="card-pf-title"></div>
      <div class="card-desc"  id="card-pf-desc"></div>
      <div class="card-btn"   id="card-pf-btn"></div>
    </a>
    <!-- add more cards here -->
  </div>

  <script>
    var PORTAL_STRINGS = {
      de: {
        heading:     '🎮 Wilmas Vibe Coding Spielesammlung',
        subtitle:    'Wähle ein Spiel!',
        pfTitle:     'Pflanzenwelt',
        pfDesc:      'Fange alle 8 Pflanzen-Kreaturen!',
        play:        'Spielen →'
      },
      en: {
        heading:     '🎮 Wilma\'s Vibe Coding Game Collection',
        subtitle:    'Choose a game!',
        pfTitle:     'Plant World',
        pfDesc:      'Catch all 8 plant creatures!',
        play:        'Play →'
      }
    };

    function setLang(lang) {
      localStorage.setItem('pgame_lang', lang);
      render(lang);
    }

    function render(lang) {
      var s = PORTAL_STRINGS[lang];
      document.getElementById('html-root').lang         = lang;
      document.getElementById('portal-heading').textContent = s.heading;
      document.getElementById('portal-subtitle').textContent = s.subtitle;
      document.getElementById('card-pf-title').textContent  = s.pfTitle;
      document.getElementById('card-pf-desc').textContent   = s.pfDesc;
      document.getElementById('card-pf-btn').textContent    = s.play;
      document.getElementById('btn-de').className = 'lang-btn' + (lang === 'de' ? ' active' : '');
      document.getElementById('btn-en').className = 'lang-btn' + (lang === 'en' ? ' active' : '');
    }

    var currentLang = (localStorage.getItem('pgame_lang') === 'en') ? 'en' : 'de';
    render(currentLang);
  </script>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

1. Open `index.html` — should render in the saved language with the correct button highlighted
2. Click 🇬🇧 EN — heading, subtitle, card text and button all switch to English instantly
3. Click 🇩🇪 DE — switches back to German
4. Click "Spielen →" / "Play →" — game opens and text matches chosen language throughout

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add DE/EN language toggle to portal with PORTAL_STRINGS"
```

---

### Task 8: Push to GitHub

- [ ] **Step 1: Push all commits**

```bash
git push origin master
```
