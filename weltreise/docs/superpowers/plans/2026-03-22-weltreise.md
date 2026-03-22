# Weltreise Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Mario-style 2D geography platformer using Phaser 3.60, covering 23 countries across 5 continents, with bilingual DE/EN support, PWA offline capability, and a question-based stomp mechanic.

**Architecture:** Phaser 3.60 scene stack (Boot → Menu → WorldMap → LevelSelect → Game ↔ Question/GameOver/Win). Vanilla JS with `var` globals, no ES modules, no build tools. Progress persisted in localStorage under `weltreise_` namespace.

**Tech Stack:** Phaser 3.60 (CDN), Vanilla JS, Web Audio API (SFX), localStorage, Service Worker (PWA)

**Spec:** `/mnt/e/dev/game/weltreise/docs/superpowers/specs/2026-03-21-weltreise-design.md`

**Reference implementations:** `/mnt/e/dev/game/pflanzenwelt/` (Phaser scenes pattern), `/mnt/e/dev/game/agentenfunk/` (PWA/service-worker pattern)

---

<!-- SECTION 1: SCAFFOLD -->

### Task 1: Folder scaffold & index.html

**Files:**
- Create: `weltreise/index.html`
- Create: `weltreise/src/i18n/lang.js`
- Create: `weltreise/src/main.js`

- [ ] Create `weltreise/index.html` — full HTML file matching pflanzenwelt pattern: charset UTF-8, viewport, back-btn link to `../index.html`, loads scripts in order: lang.js → Phaser 3.60 CDN → data files (5 continent files: europe.js, africa.js, asia.js, americas.js, oceania.js) → `src/utils/progress.js` → scene files (BootScene, MenuScene, WorldMapScene, LevelSelectScene, GameScene, QuestionScene, GameOverScene, WinScene) → main.js. Include inline script after lang.js that sets `document.getElementById('html-root').lang = LANG` and back-btn text. Style: body centered, dark background `#0d1b2a`, canvas centered.

- [ ] Create `weltreise/src/i18n/lang.js` — reads `localStorage.getItem('pgame_lang')`, sets `var LANG = ... 'de' or 'en'`.

- [ ] Create `weltreise/src/main.js` — creates Phaser.Game with config: type AUTO, width 960, height 720, backgroundColor '#0d1b2a', physics arcade gravity 800, scene array [BootScene, MenuScene, WorldMapScene, LevelSelectScene, GameScene, QuestionScene, GameOverScene, WinScene]. Registers service worker on DOMContentLoaded. **iOS audio unlock:** add a one-time `click`/`touchstart` listener on `document` that calls `game.sound.context.resume()` then removes itself — identical to the pattern in `/mnt/e/dev/game/agentenfunk/src/main.js`.

- [ ] Commit: `git add weltreise/index.html weltreise/src/i18n/lang.js weltreise/src/main.js && git commit -m "feat(weltreise): scaffold index.html, lang.js, main.js"`

### Task 2: manifest.json & service-worker.js

**Files:**
- Create: `weltreise/manifest.json`
- Create: `weltreise/service-worker.js`

- [ ] Create `weltreise/manifest.json` — PWA manifest: name "Weltreise", short_name "Weltreise", start_url "/weltreise/", display "standalone", background_color "#0d1b2a", theme_color "#2196F3", icons array with placeholder path.

- [ ] Create `weltreise/service-worker.js` — follows agentenfunk pattern: CACHE_NAME versioned, CACHE_URLS list includes index.html, lang.js, main.js, all 5 data files, all 8 scene files, Phaser CDN, 23 background PNGs (assets/backgrounds/{country}.png), 23 anthem MP3s (assets/audio/anthems/{country}.mp3). Install event caches all. Fetch event serves cache-first. Write the full list of all 23 country IDs inline (austria, france, germany, italy, spain, egypt, kenya, morocco, nigeria, south_africa, china, india, japan, saudi_arabia, thailand, argentina, brazil, canada, mexico, usa, australia, fiji, new_zealand).

- [ ] Commit: `git add weltreise/manifest.json weltreise/service-worker.js && git commit -m "feat(weltreise): add PWA manifest and service worker"`

### Task 3: Portal card integration

**Files:**
- Modify: `index.html` (root portal)

- [ ] Read `/mnt/e/dev/game/index.html` to understand the existing card pattern (how pflanzenwelt and agentenfunk cards are structured, how the strings object and render() function work).

- [ ] Add `wtTitle` and `wtDesc` keys to both `de` and `en` strings objects: DE title `'Weltreise'`, DE desc `'Bereise die Welt und lerne Geografie!'`, EN title `'World Tour'`, EN desc `'Travel the world and learn geography!'`.

- [ ] Add HTML card for Weltreise to the game grid — same structure as existing cards, with `id="card-wt-title"` and `id="card-wt-desc"`, href to `./weltreise/`, browser + mobile support badges.

- [ ] Add `document.getElementById('card-wt-title').textContent = strings[LANG].wtTitle` and similar for wtDesc inside the render() function.

- [ ] Commit: `git add index.html && git commit -m "feat: add Weltreise portal card"`

---

<!-- SECTION 2: DATA FILES -->

### Task 4: Data files — all 5 continents

**Files:**
- Create: `weltreise/src/data/europe.js`
- Create: `weltreise/src/data/africa.js`
- Create: `weltreise/src/data/asia.js`
- Create: `weltreise/src/data/americas.js`
- Create: `weltreise/src/data/oceania.js`

Steps:

- [ ] Create `weltreise/src/data/europe.js` — exports `var EUROPE` with id, bilingual name, and 5 countries: austria, france, germany, italy, spain. Each country has: id, bilingual name, anthem path (`assets/audio/anthems/{id}.mp3`), background path (`assets/backgrounds/{id}.png`), enemyType string, and questions array of exactly 5 questions. Each question has `de` and `en` keys, each with `q` (string), `options` (array of 4 strings), `answer` (0-based index). Write culturally appropriate geography questions about capital cities, flags, landmarks, currencies, populations. Include complete question data for all 5 countries.

Austria questions (de/en): capital Wien/Vienna; flag colors red-white-red; Mozart birthplace Salzburg; longest river Danube; currency before Euro Schilling.
France questions: capital Paris; Eiffel Tower city Paris; longest river Loire; national motto Liberté Égalité Fraternité; number of overseas departments 5.
Germany questions: capital Berlin; largest city Berlin; river through Cologne Rhine; currency before Euro Deutsche Mark; reunification year 1990.
Italy questions: capital Rome; famous leaning tower Pisa; longest river Po; active volcano Etna; ancient empire Roman.
Spain questions: capital Madrid; largest city Madrid; famous painter Picasso; traditional dance flamenco; currency before Euro Peseta.

- [ ] Create `weltreise/src/data/africa.js` — `var AFRICA` with 5 countries: egypt, kenya, morocco, nigeria, south_africa.

Egypt questions: capital Cairo; famous monument Pyramids of Giza; river Nile; currency Egyptian Pound; ancient writing Hieroglyphics.
Kenya questions: capital Nairobi; famous wildlife reserve Maasai Mara; highest mountain Mount Kenya; currency Kenyan Shilling; official languages English and Swahili.
Morocco questions: capital Rabat; famous desert Sahara; currency Moroccan Dirham; largest city Casablanca; strait Gibraltar borders which country Morocco.
Nigeria questions: capital Abuja; largest city Lagos; currency Naira; most populous African country Nigeria; official language English.
South Africa questions: capital cities (Pretoria/Cape Town/Bloemfontein — answer Pretoria for executive); currency Rand; famous leader Mandela; continent tip Cape of Good Hope; number of official languages 11.

- [ ] Create `weltreise/src/data/asia.js` — `var ASIA` with 5 countries: china, india, japan, saudi_arabia, thailand.

China questions: capital Beijing; Great Wall continent Asia; currency Yuan/Renminbi; most populous country China; river Yangtze.
India questions: capital New Delhi; famous monument Taj Mahal city Agra; currency Rupee; river Ganges sacred; independence year 1947.
Japan questions: capital Tokyo; famous mountain Fuji; currency Yen; traditional theater Kabuki; island count approximately 6800.
Saudi Arabia questions: capital Riyadh; holy city Mecca; currency Riyal; largest desert Rub' al Khali; main export Oil.
Thailand questions: capital Bangkok; currency Baht; famous temple Wat Phra Kaew; national animal elephant; official language Thai.

- [ ] Create `weltreise/src/data/americas.js` — `var AMERICAS` with 5 countries: argentina, brazil, canada, mexico, usa.

Argentina questions: capital Buenos Aires; currency Peso; famous dance Tango; longest river Paraná; famous waterfall Iguazú.
Brazil questions: capital Brasília; largest city São Paulo; currency Real; famous carnival city Rio de Janeiro; Amazon river in which country Brazil.
Canada questions: capital Ottawa; largest city Toronto; currency Canadian Dollar; official languages English and French; national animal Beaver.
Mexico questions: capital Mexico City; currency Peso; ancient civilization Aztec; famous pyramid Chichen Itza; official language Spanish.
USA questions: capital Washington D.C.; currency Dollar; independence year 1776; national bird Bald Eagle; largest state Alaska.

- [ ] Create `weltreise/src/data/oceania.js` — `var OCEANIA` with 3 countries: australia, fiji, new_zealand.

Australia questions: capital Canberra; largest city Sydney; currency Australian Dollar; famous rock Uluru; national animal Kangaroo.
Fiji questions: capital Suva; currency Fijian Dollar; ocean Pacific; official languages English Fijian Hindi; famous for coral reefs.
New Zealand questions: capital Wellington; largest city Auckland; currency NZD; indigenous people Māori; famous for Lord of the Rings filming.

- [ ] Commit: `git add weltreise/src/data/ && git commit -m "feat(weltreise): add all 5 continent data files with questions"`

---

### Task 5: Test framework & data validation tests

**Files:**
- Create: `weltreise/tests/assert.js`
- Create: `weltreise/tests/data.test.js`

Steps:

- [ ] Create `weltreise/tests/assert.js` — copy the assert helper from agentenfunk: `module.exports = function assert(condition, message) { if (!condition) throw new Error('FAIL: ' + message); console.log('PASS: ' + message); };`

- [ ] Create `weltreise/tests/data.test.js` — loads all 5 continent data files using require() with path manipulation (since they use `var` globals, use a wrapper: `const fs = require('fs'); eval(fs.readFileSync(..., 'utf8'))`). Write tests that assert:
  - Each continent var exists (EUROPE, AFRICA, ASIA, AMERICAS, OCEANIA)
  - Each continent has a countries array
  - Total country count equals 23
  - Every country has id, name.de, name.en, anthem, background, enemyType, questions
  - Every country has exactly 5 questions
  - Every question has de.q, de.options (length 4), de.answer (0-3), en.q, en.options (length 4), en.answer (0-3)
  - No question has answer index out of bounds

- [ ] Run tests: `node weltreise/tests/data.test.js` — expect all PASS

- [ ] Commit: `git add weltreise/tests/ && git commit -m "test(weltreise): add data validation tests"`

---

<!-- SECTION 3: SCENES PART 1 -->

### Task 6: BootScene & MenuScene

**Files:**
- Create: `weltreise/src/scenes/BootScene.js`
- Create: `weltreise/src/scenes/MenuScene.js`

Steps:

- [ ] Create `weltreise/src/scenes/BootScene.js` — Phaser.Class extending Phaser.Scene, key 'BootScene'. In `preload()`: load placeholder assets using `this.load.image('placeholder_bg', 'assets/backgrounds/placeholder.png')` (fails silently if missing). In `create()`: go to MenuScene via `this.scene.start('MenuScene')`. Note: real background and anthem assets are loaded per-level in GameScene.preload() to avoid loading all 23 backgrounds upfront.

- [ ] Create `weltreise/src/scenes/MenuScene.js` — Phaser.Class extending Phaser.Scene, key 'MenuScene'. In `create()`:
  - Dark background rectangle filling canvas
  - Title text "Weltreise" (DE) or "World Tour" (EN) — reads global `LANG`
  - Subtitle: "Ein Geografie-Abenteuer" / "A Geography Adventure"
  - "Spielen" / "Play" button → starts WorldMapScene
  - "Sprache" / "Language" toggle button → toggles LANG between de/en, saves to `localStorage.setItem('pgame_lang', newLang)`, restarts MenuScene
  - All text via `this.add.text()` with Phaser text config (fontFamily 'Arial', color '#ffffff')
  - Buttons as Phaser rectangles + text, interactive with pointerover highlight and pointerdown action

- [ ] Commit: `git add weltreise/src/scenes/BootScene.js weltreise/src/scenes/MenuScene.js && git commit -m "feat(weltreise): add BootScene and MenuScene"`

---

### Task 7: WorldMapScene, LevelSelectScene & progress helpers

**Files:**
- Create: `weltreise/src/scenes/WorldMapScene.js`
- Create: `weltreise/src/scenes/LevelSelectScene.js`
- Create: `weltreise/src/utils/progress.js`

Steps:

- [ ] Create `weltreise/src/utils/progress.js` — plain `var` global object `Progress` with methods:
  - `Progress.load()` → reads `localStorage.getItem('weltreise_progress')`, parses JSON, returns object `{ unlockedContinent, completedLevels }`. Default if missing: `{ unlockedContinent: 'europe', completedLevels: [] }`
  - `Progress.save(data)` → `localStorage.setItem('weltreise_progress', JSON.stringify(data))`
  - `Progress.isLevelComplete(countryId)` → returns true if countryId is in completedLevels
  - `Progress.completeLevel(countryId)` → loads, adds countryId to completedLevels (if not present), checks if all countries in current continent are done and if so advances unlockedContinent to next, saves
  - `Progress.reset()` → removes `weltreise_progress` from localStorage
  - Continent order array: `['europe', 'africa', 'asia', 'americas', 'oceania']`
  - Map from continent ID to its data var: `{ europe: EUROPE, africa: AFRICA, asia: ASIA, americas: AMERICAS, oceania: OCEANIA }` (globals already loaded)

- [ ] Create `weltreise/src/scenes/WorldMapScene.js` — Phaser.Class, key 'WorldMapScene'. In `create()`:
  - Dark background
  - Title: "Weltkarte" / "World Map"
  - Back button → MenuScene
  - Load progress via `Progress.load()`
  - For each continent in order ['europe','africa','asia','americas','oceania']:
    - Show continent button with name in current LANG
    - If continent is unlocked (index ≤ unlockedContinent index): clickable, normal color
    - If locked: greyed out, not interactive, shows lock icon (🔒 text or simple rectangle)
    - Click → `this.scene.start('LevelSelectScene', { continentId: id })`

- [ ] Create `weltreise/src/scenes/LevelSelectScene.js` — Phaser.Class, key 'LevelSelectScene'. In `init(data)`: store `this.continentId = data.continentId`. In `create()`:
  - Load continent data from matching global (EUROPE, AFRICA etc.) by looking up `{ europe: EUROPE, ... }[this.continentId]`
  - Load progress via `Progress.load()`
  - Back button → WorldMapScene
  - Title: continent name in current LANG
  - For each country in continent.countries:
    - Determine locked status: country[0] always unlocked; country[N] unlocked if country[N-1] is completed
    - Show country button: name in LANG, completion star if completed, greyed if locked
    - Click (if unlocked) → `this.scene.start('GameScene', { countryId: country.id, continentId: this.continentId })`

- [ ] Add `weltreise/src/utils/progress.js` to script load order in `weltreise/index.html` (before scene files, after data files).

- [ ] Commit: `git add weltreise/src/utils/progress.js weltreise/src/scenes/WorldMapScene.js weltreise/src/scenes/LevelSelectScene.js weltreise/index.html && git commit -m "feat(weltreise): add WorldMapScene, LevelSelectScene, progress helpers"`

---

<!-- SECTION 4: GAMESCENE -->

### Task 8: GameScene — player, platforms, camera, HUD

**Files:**
- Create: `weltreise/src/scenes/GameScene.js`

Steps:

- [ ] Create `weltreise/src/scenes/GameScene.js` skeleton — Phaser.Class, key 'GameScene'. Add `init(data)` storing `this.countryId = data.countryId; this.continentId = data.continentId`. Add `preload()` to load the country background image and anthem: `this.load.image(this.countryId + '_bg', 'assets/backgrounds/' + this.countryId + '.png')` and `this.load.audio(this.countryId + '_anthem', 'assets/audio/anthems/' + this.countryId + '.mp3')`. Handle load errors silently (Phaser emits 'loaderror' event; listen and continue).

- [ ] In `create()` — set up world bounds, background, physics groups, HUD, stars, lives:
  - `this.cameras.main.setBounds(0, 0, 3840, 720)` (level is 4× canvas wide)
  - Add background image: `this.add.image(0, 0, this.countryId + '_bg').setOrigin(0,0).setScrollFactor(0)` — if texture missing Phaser will show transparent; acceptable
  - Create static platform group: `this.platforms = this.physics.add.staticGroup()`
  - Build level layout: ground across full width (3840px), plus 8–10 floating platforms at varied x/y positions — hardcode one layout reused for all levels (geometry only; background/anthem differentiate countries visually/aurally)
  - Player: `this.player = this.physics.add.sprite(100, 600, null)` — use `this.add.rectangle()` as placeholder graphic (32×48, color 0x00aaff), add physics body. Set `player.setBounce(0.1)`, `player.setCollideWorldBounds(true)`
  - `this.physics.add.collider(this.player, this.platforms)`
  - Stars HUD: `this.starsGroup = []`, draw 5 empty star symbols at top-left using `this.add.text()` with ☆, fixed to camera via `setScrollFactor(0)`
  - Lives HUD: `this.livesCount = 3`, display `this.livesText = this.add.text(...)` top-right, `setScrollFactor(0)`
  - State: `this.starsEarned = 0; this.isBig = false; this.pendingResult = null`
  - Play anthem: `this.anthem = this.sound.add(this.countryId + '_anthem', {loop: true, volume: 0.4})` — wrapped in try/catch; call `this.anthem.play()` only if sound loaded
  - Camera follow: `this.cameras.main.startFollow(this.player)`

- [ ] In `create()` — also call `this.cursors = this.input.keyboard.createCursorKeys()` once here (NOT in update — re-creating cursors every frame wastes memory).

- [ ] In `update()` — player movement and jump:
  - Left/right: set `player.setVelocityX(±200)` based on `this.cursors`, 0 when neither pressed
  - Jump: if cursors.up or cursors.space pressed AND player on ground (`player.body.blocked.down`): `player.setVelocityY(-550)`
  - Call `this.checkEnemyStomp()` each update frame

- [ ] Commit: `git add weltreise/src/scenes/GameScene.js && git commit -m "feat(weltreise): GameScene skeleton with player, platforms, HUD"`

---

### Task 9: GameScene — enemies, stomp, question launch, win/loss, virtual d-pad

**Files:**
- Modify: `weltreise/src/scenes/GameScene.js`

Steps:

- [ ] Add enemy creation in `create()` — after platforms setup:
  - `this.enemies = this.physics.add.group()`
  - Place 7 enemies at hardcoded positions spread across the level (x: 400, 700, 1000, 1400, 1800, 2400, 3000; y: ground or platform surface). **Unavoidable blockers (spec requirement):** place enemies at x=700 and x=1400 on narrow platforms (width ≤ 96px) where there is no room to jump past — the player must stomp them. All other enemies are optional stomps.
  - Each enemy: `var e = this.physics.add.sprite(x, y, null)` with `this.add.rectangle()` placeholder (32×32, color 0xff4444). Set physics body, `e.setBounce(0)`, `e.setVelocityX(80)`, `e.setCollideWorldBounds(true)`
  - `e.enemyId = 'enemy_' + i; e.isStunned = false; e.hasGivenStar = false; e.direction = 1`
  - Add collider: `this.physics.add.collider(this.enemies, this.platforms)`
  - Each enemy reverses direction when `body.blocked.right` or `body.blocked.left` (check in update loop)

- [ ] Add `checkEnemyStomp()` method — iterates `this.enemies.getChildren()`:
  - Skip if `enemy.isStunned || enemy.hasGivenStar`
  - Stomp condition: `this.physics.overlap(this.player, enemy)` AND `this.player.body.velocity.y > 0` AND `this.player.y < enemy.y`
  - On stomp: `enemy.isStunned = true; enemy.setVelocityX(0)` — pick next question from shuffled pool (`this.questionPool`), launch QuestionScene, pause GameScene
  - Question pool setup in `create()`: get country data `this.countryData`, shuffle questions array (Fisher-Yates), store as `this.questionPool = shuffled; this.questionIndex = 0`
  - **Bounds check (required):** before launching QuestionScene, check `if (this.questionIndex >= this.questionPool.length) { this.questionIndex = 0; /* re-shuffle */ }` so recovered enemies after the 5th question still get a valid question.
  - `this.scene.launch('QuestionScene', { question: this.questionPool[this.questionIndex++], enemyId: enemy.enemyId, onResult: fn })`
  - `this.scene.pause('GameScene')`

- [ ] Add `onResult(correct, enemyId)` handler — called by QuestionScene after resume:
  - Find enemy by enemyId in `this.enemies.getChildren()`
  - If correct: `enemy.hasGivenStar = true; enemy.destroy(); this.starsEarned++; this.updateStarHUD(); if (this.starsEarned >= 5) this.unlockExit()`
  - If wrong: `enemy.isStunned = false; enemy.setVelocityX(80 * enemy.direction)` (enemy recovers); shrink/life-loss: if `this.isBig` then `this.isBig = false` (shrink visual); else `this.livesCount--; this.livesText.setText(...)` — if livesCount ≤ 0: `this.anthem.stop(); this.scene.start('GameOverScene', { countryId: this.countryId, continentId: this.continentId })`
  - `updateStarHUD()`: update star text objects ☆→★ for each earned star (setScrollFactor(0))

- [ ] Add exit door — in `create()`: place a rectangle at x=3780, y=600 (right end). Store as `this.exitDoor`. In `create()` set `this.exitLocked = true; this.exitDoor.setAlpha(0.3)`. `unlockExit()`: `this.exitLocked = false; this.exitDoor.setAlpha(1)`. In `update()`: if `!this.exitLocked && this.physics.overlap(this.player, this.exitDoor)`: `this.anthem.stop(); Progress.completeLevel(this.countryId); this.scene.start('WinScene', { countryId: this.countryId, continentId: this.continentId })`

- [ ] Add virtual d-pad in `create()` — detect mobile via `this.sys.game.device.os.android || this.sys.game.device.os.iOS`. If mobile:
  - Left button: rectangle at (60, 660), label '◀', setScrollFactor(0), interactive
  - Right button: rectangle at (140, 660), label '▶', setScrollFactor(0)
  - Jump button: rectangle at (880, 660), label '▲', setScrollFactor(0)
  - Store `this.dpadLeft`, `this.dpadRight`, `this.dpadJump` booleans; set true on pointerdown, false on pointerup
  - In `update()`: check dpad booleans alongside cursor keys for movement and jump
  - Hide d-pad when QuestionScene is visible: set all d-pad objects `visible = false` before launching QuestionScene; restore `visible = true` in onResult

- [ ] Add question block (mushroom) — in `create()`: add 3 question blocks as static rectangles (color 0xffcc00) at mid-level positions. Add overlap with player: if player moving up (`velocity.y < 0`) and head hits block bottom, spawn mushroom power-up at block location. Mushroom: moving sprite that player can walk into. On collect: `this.isBig = true` (scale player to 1.5×).

- [ ] Commit: `git add weltreise/src/scenes/GameScene.js && git commit -m "feat(weltreise): add enemies, stomp, question launch, exit, d-pad, power-up"`

---

<!-- SECTION 5: REMAINING SCENES -->

### Task 10: QuestionScene

**Files:**
- Create: `weltreise/src/scenes/QuestionScene.js`

Steps:

- [ ] Create `weltreise/src/scenes/QuestionScene.js` — Phaser.Class, key 'QuestionScene'. In `init(data)`: `this.question = data.question; this.enemyId = data.enemyId; this.onResult = data.onResult`.

- [ ] In `create()`: render fullscreen semi-transparent overlay:
  - Dark rect: `this.add.rectangle(480, 360, 960, 720, 0x000000, 0.75)`
  - Question text: `this.add.text(480, 180, this.question[LANG].q, { fontFamily:'Arial', fontSize:'28px', color:'#ffffff', wordWrap:{width:800}, align:'center' }).setOrigin(0.5)`
  - Four answer buttons at y positions 300, 380, 460, 540 — each a rectangle + text overlay, centered at x=480. Text from `this.question[LANG].options[i]`
  - On button click: determine `var correct = (i === this.question[LANG].answer)`. Then: `this.scene.stop(); this.scene.resume('GameScene'); this.onResult(correct);`
  - Highlight button on pointerover (color change), reset on pointerout

- [ ] Commit: `git add weltreise/src/scenes/QuestionScene.js && git commit -m "feat(weltreise): add QuestionScene overlay"`

---

### Task 11: GameOverScene & WinScene

**Files:**
- Create: `weltreise/src/scenes/GameOverScene.js`
- Create: `weltreise/src/scenes/WinScene.js`

Steps:

- [ ] Create `weltreise/src/scenes/GameOverScene.js` — Phaser.Class, key 'GameOverScene'. In `init(data)`: store countryId, continentId. In `create()`:
  - Dark background
  - "Game Over" / "Spiel vorbei" text (large, red, centered)
  - Retry button → `this.scene.start('GameScene', { countryId: this.countryId, continentId: this.continentId })`
  - Level Select button → `this.scene.start('LevelSelectScene', { continentId: this.continentId })`

- [ ] Create `weltreise/src/scenes/WinScene.js` — Phaser.Class, key 'WinScene'. In `init(data)`: store countryId, continentId. In `create()`:
  - Look up country name from data globals: find country in the right continent var
  - "Level geschafft!" / "Level Complete!" text (large, gold, centered)
  - Country name display below
  - ★★★★★ stars shown
  - Continue button → `this.scene.start('LevelSelectScene', { continentId: this.continentId })`

- [ ] Commit: `git add weltreise/src/scenes/GameOverScene.js weltreise/src/scenes/WinScene.js && git commit -m "feat(weltreise): add GameOverScene and WinScene"`

---

### Task 12: Web Audio SFX

**Files:**
- Create: `weltreise/src/audio/sfx.js`
- Modify: `weltreise/index.html` (add script tag)
- Modify: `weltreise/src/scenes/GameScene.js` (call SFX on stomp, correct, wrong, power-up)
- Modify: `weltreise/src/scenes/QuestionScene.js` (call SFX on answer)

Steps:

- [ ] Create `weltreise/src/audio/sfx.js` — var global `SFX` using Web Audio API (`new AudioContext()`). Implement four functions:
  - `SFX.stomp()` — short descending tone (220Hz → 110Hz, 0.1s, triangle wave)
  - `SFX.correct()` — ascending arpeggio (C5→E5→G5, 0.05s each, sine wave)
  - `SFX.wrong()` — low buzz (80Hz, 0.3s, sawtooth wave)
  - `SFX.powerUp()` — rising sweep (200Hz → 800Hz, 0.2s, sine wave)
  Each function: create OscillatorNode + GainNode, connect to `AudioContext.destination`, start, stop after duration. Wrap in try/catch (audio may be locked on iOS until first gesture — silent fail is acceptable; the iOS unlock in main.js will unblock subsequent calls).

- [ ] Add `<script src="src/audio/sfx.js"></script>` to `weltreise/index.html` after lang.js and before scene files.

- [ ] In `GameScene.js` `checkEnemyStomp()`: call `SFX.stomp()` immediately on stomp detection (before launching QuestionScene).

- [ ] In `QuestionScene.js` on button click: call `SFX.correct()` if correct, `SFX.wrong()` if wrong, before `this.scene.stop()`.

- [ ] In `GameScene.js` mushroom collect handler: call `SFX.powerUp()`.

- [ ] Commit: `git add weltreise/src/audio/sfx.js weltreise/index.html weltreise/src/scenes/GameScene.js weltreise/src/scenes/QuestionScene.js && git commit -m "feat(weltreise): add Web Audio SFX"`

---

### Task 13: Smoke test & asset placeholders

**Files:**
- Create: `weltreise/assets/backgrounds/placeholder.png` (note: this is a binary — instruct implementer to copy any 960×720 PNG from another game or create a solid-color placeholder)
- Create: `weltreise/assets/audio/anthems/.gitkeep`

Steps:

- [ ] Create asset directories: `mkdir -p weltreise/assets/backgrounds weltreise/assets/audio/anthems`

- [ ] Add a placeholder background: copy any existing PNG to `weltreise/assets/backgrounds/austria.png` (and repeat for each of the 23 country IDs) — or use a solid-color 960×720 PNG generated with: `convert -size 960x720 xc:#1a3a6e weltreise/assets/backgrounds/austria.png` (requires ImageMagick). The game handles missing backgrounds silently, so this step is optional for initial testing.

- [ ] Create `.gitkeep` in anthem dir so the directory is tracked: `touch weltreise/assets/audio/anthems/.gitkeep`

- [ ] Open `weltreise/index.html` in a browser. Verify:
  - Page loads without JS errors
  - Phaser canvas appears
  - MenuScene shows title and buttons
  - Language toggle switches DE/EN
  - Play → WorldMapScene shows continents (Europe unlocked, others greyed)
  - Click Europe → LevelSelectScene shows 5 countries (Austria unlocked)
  - Click Austria → GameScene loads (background may be missing/transparent, that's ok)
  - Player can move left/right and jump
  - Enemy placeholder rectangles walk back and forth
  - Stomp enemy → QuestionScene overlay appears
  - Answer question → GameScene resumes, star fills
  - Fill 5 stars → exit door unlocks
  - Walk to exit → WinScene appears
  - WinScene → back to LevelSelectScene → Austria shows completion star

- [ ] Commit: `git add weltreise/assets/ && git commit -m "chore(weltreise): add asset directories and placeholders"`

---

## Summary

| Task | Deliverable | Commit |
|------|-------------|--------|
| 1 | index.html, lang.js, main.js | feat(weltreise): scaffold |
| 2 | manifest.json, service-worker.js | feat(weltreise): PWA |
| 3 | Portal card in root index.html | feat: Weltreise portal card |
| 4 | 5 continent data files, 23 countries, 115 questions | feat(weltreise): data |
| 5 | Test framework, data validation tests | test(weltreise): data tests |
| 6 | BootScene, MenuScene | feat(weltreise): Boot/Menu |
| 7 | WorldMapScene, LevelSelectScene, progress.js | feat(weltreise): map/select/progress |
| 8 | GameScene skeleton (player, platforms, HUD) | feat(weltreise): GameScene skeleton |
| 9 | GameScene complete (enemies, stomp, question, exit, d-pad) | feat(weltreise): GameScene complete |
| 10 | QuestionScene | feat(weltreise): QuestionScene |
| 11 | GameOverScene, WinScene | feat(weltreise): end screens |
| 12 | Web Audio SFX (stomp, correct, wrong, power-up) | feat(weltreise): SFX |
| 13 | Asset dirs, smoke test | chore(weltreise): assets |
