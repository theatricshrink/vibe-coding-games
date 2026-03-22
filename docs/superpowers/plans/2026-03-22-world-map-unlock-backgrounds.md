# World Map Redesign, Continent Unlock Animation & Landmark Backgrounds — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder world map with an SNES Mario World–style visual, add a continent unlock celebration animation when a continent is beaten, and draw landmark art (Colosseum for Italy, Eiffel Tower for France) in the game backgrounds.

**Architecture:** All graphics are drawn programmatically with Phaser 3 Graphics + generateTexture() — no external assets. The four changed files are: `progress.js` (progression order), `WinScene.js` (continent completion routing), `WorldMapScene.js` (full visual rework + unlock animation), `GameScene.js` (landmark backgrounds). Each task is independent and touches exactly one file, except Task 1 which touches two.

**Tech Stack:** Phaser 3.60, vanilla JS (var globals, no ES modules). Canvas 960×720. Progress stored in localStorage via Progress utility. Global `LANG` variable ('de'|'en').

---

## Important Implementation Notes

**Progress flow:** `GameScene.update()` calls `Progress.completeLevel(countryId)` at line 737 before transitioning to `WinScene`. By the time `WinScene.create()` runs, progress is already updated. WinScene must NOT call completeLevel again — instead it reads progress state to check if the continent was completed.

**makeCountryBg context:** `makeCountryBg(key, id)` uses `self.make.graphics({ add: false })` and `generateTexture()`. It produces a static texture — no tweens inside it. Animated overlays (e.g., Eiffel Tower tip sparkle) must be added in `GameScene.create()` as separate live graphics objects after the background image is placed.

**Variable naming in loops:** The existing `makeCountryBg` function uses `var i` in several loops. Use distinct variable names (e.g., `ai`, `li`) in the new landmark code to avoid shadowing.

---

## File Map

| File | Role | Change |
|------|------|--------|
| `src/utils/progress.js` | Unlock progression order | Update CONTINENT_ORDER array |
| `src/scenes/WinScene.js` | Win / continent-complete routing | Replace Continue button with conditional routing |
| `src/scenes/WorldMapScene.js` | World map visual + unlock animation | Full create() rewrite + add init() |
| `src/scenes/GameScene.js` | Country backgrounds | Add Colosseum (Italy) + Eiffel Tower (France) in makeCountryBg() + tween overlay |

---

## Task 1: Update Progression Order

**Files:**
- Modify: `src/utils/progress.js` (line 2)
- Modify: `src/scenes/WorldMapScene.js` (line 42)

- [ ] **Step 1: Update CONTINENT_ORDER in progress.js**

In `src/utils/progress.js`, line 2, change:
```javascript
var CONTINENT_ORDER = ['europe', 'africa', 'asia', 'americas', 'oceania'];
```
to:
```javascript
var CONTINENT_ORDER = ['europe', 'americas', 'africa', 'asia', 'oceania'];
```

- [ ] **Step 2: Update pathOrder in WorldMapScene.js**

In `src/scenes/WorldMapScene.js`, line 42, change:
```javascript
var pathOrder = ['europe', 'africa', 'asia', 'americas', 'oceania'];
```
to:
```javascript
var pathOrder = ['europe', 'americas', 'africa', 'asia', 'oceania'];
```

- [ ] **Step 3: Verify the arrays match**

Both arrays must be identical. Check that `progress.js` line 2 and `WorldMapScene.js` pathOrder are:
```
['europe', 'americas', 'africa', 'asia', 'oceania']
```

- [ ] **Step 4: Commit**
```bash
git add src/utils/progress.js src/scenes/WorldMapScene.js
git commit -m "feat: change continent progression order to europe→americas→africa→asia→oceania"
```

---

## Task 2: WinScene Continent Unlock Routing

**Files:**
- Modify: `src/scenes/WinScene.js` (replace create() body's makeMarioBtn call)

**Context:** `GameScene.update()` calls `Progress.completeLevel(countryId)` at line 737 before calling `this.scene.start('WinScene', ...)`. By the time `WinScene.create()` runs, the progress is already updated — `completedLevels` already contains the just-beaten country, and `unlockedContinent` has already advanced if all countries are done.

**Why NOT call completeLevel again in WinScene:** The spec describes a before/after snapshot approach. That approach would fail here because GameScene already ran completeLevel — the before and after values would be identical in WinScene. Instead, we detect continent completion by directly checking whether all of the current continent's countries are in `completedLevels`. This produces identical behaviour to the spec's intent while correctly handling the actual progress state.

**Note on existing saved progress:** If a player has saved progress under the old continent order (e.g., `unlockedContinent: 'africa'` which was index 1), after this change Africa is at index 2. The `unlockedIdx` calculation may place them back by one continent. For a game in development this is acceptable — players can reset progress via `Progress.reset()` in the browser console if needed.

- [ ] **Step 1: Replace WinScene.create() from the makeMarioBtn call onward**

Replace lines 44–49 in `src/scenes/WinScene.js` (the existing hardcoded `makeMarioBtn` call) with:

```javascript
    // Determine if entire continent was just completed
    var progress = Progress.load();
    var continentOrder = Progress.CONTINENT_ORDER;
    var myIdx = continentOrder.indexOf(self.continentId);
    var allDone = false;
    if (continent) {
      allDone = continent.countries.every(function(c) {
        return progress.completedLevels.indexOf(c.id) !== -1;
      });
    }
    var continentJustFinished = allDone && myIdx >= 0 && myIdx < continentOrder.length - 1;
    var nextContinentId = continentJustFinished ? continentOrder[myIdx + 1] : null;

    // Continue button — routes to WorldMapScene (unlock anim) or LevelSelectScene
    var continueLabel = LANG === 'de' ? '▶  Weiter' : '▶  Continue';
    var continueCallback = continentJustFinished
      ? function() { self.scene.start('WorldMapScene', { unlockAnim: nextContinentId }); }
      : function() { self.scene.start('LevelSelectScene', { continentId: self.continentId }); };
    makeMarioBtn(self, 480, 460, continueLabel, continueCallback,
      { w: 260, h: 62, fontSize: '26px', color: 0x1a8a1a }
    );
```

Note: `continent` is already defined earlier in create() (line 14). `self` is already defined (use `var self = this;` at top of create — check it exists, add if missing).

- [ ] **Step 2: Verify WinScene.create() reads correctly**

The full `WinScene.create()` function should:
1. Set `var self = this;` (add if missing)
2. Build `continentMap` and find `countryName` (existing, unchanged)
3. Add dark background (existing, unchanged)
4. Add "Level Complete" title (existing, unchanged)
5. Add countryName text (existing, unchanged)
6. Add 5 stars text (existing, unchanged)
7. NEW: load progress, detect continent completion, set routing
8. NEW: `makeMarioBtn` with conditional callback

- [ ] **Step 3: Commit**
```bash
git add src/scenes/WinScene.js
git commit -m "feat: route WinScene Continue to WorldMapScene with unlock animation when continent completed"
```

---

## Task 3: WorldMapScene Full Visual Rework + Unlock Animation

**Files:**
- Modify: `src/scenes/WorldMapScene.js` (full rewrite of the class body)

This replaces the entire WorldMapScene. The new version has an `init()` method and a fully rewritten `create()` with SNES-style visuals and the unlock animation sequence.

- [ ] **Step 1: Replace WorldMapScene entirely**

Replace the full contents of `src/scenes/WorldMapScene.js` with:

```javascript
var WorldMapScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function WorldMapScene() {
    Phaser.Scene.call(this, { key: 'WorldMapScene' });
  },

  init: function(data) {
    this.unlockAnimContinent = (data && data.unlockAnim) ? data.unlockAnim : null;
  },

  create: function() {
    var self = this;
    var progress = Progress.load();
    var unlockedIdx = Progress.CONTINENT_ORDER.indexOf(progress.unlockedContinent);

    var CONTINENTS = [
      { id: 'europe',   de: 'Europa',   en: 'Europe',   x: 490, y: 210 },
      { id: 'americas', de: 'Amerika',  en: 'Americas', x: 175, y: 290 },
      { id: 'africa',   de: 'Afrika',   en: 'Africa',   x: 500, y: 400 },
      { id: 'asia',     de: 'Asien',    en: 'Asia',     x: 695, y: 200 },
      { id: 'oceania',  de: 'Ozeanien', en: 'Oceania',  x: 800, y: 480 }
    ];

    var nodeMap = {};
    CONTINENTS.forEach(function(c) { nodeMap[c.id] = c; });

    // ── Ocean background ──────────────────────────────────────────────────
    this.add.rectangle(480, 360, 960, 720, 0x1a7fa8);
    var waveG = this.add.graphics();
    waveG.fillStyle(0x2090bb, 0.4);
    for (var wi = 0; wi < 7; wi++) {
      waveG.fillRect(0, 80 + wi * 88, 960, 4);
    }

    // ── Continent terrain blobs ───────────────────────────────────────────
    var bg = this.add.graphics();

    function drawBlob(borderColor, fillColor, rects) {
      bg.fillStyle(borderColor, 1);
      rects.forEach(function(r) { bg.fillRoundedRect(r[0] - 3, r[1] - 3, r[2] + 6, r[3] + 6, r[4] + 2); });
      bg.fillStyle(fillColor, 1);
      rects.forEach(function(r) { bg.fillRoundedRect(r[0], r[1], r[2], r[3], r[4]); });
    }

    // Europe
    drawBlob(0x3a6e1a, 0x5a9e3a, [
      [385, 130, 210, 150, 20],
      [365, 190, 100, 80,  16]
    ]);
    // Americas
    drawBlob(0x1d5a1d, 0x3d7a3d, [
      [85,  190, 180, 220, 24],
      [115, 370, 130, 80,  18]
    ]);
    // Africa
    drawBlob(0xa8721a, 0xc8923a, [
      [395, 310, 200, 195, 22],
      [430, 465, 100, 55,  16]
    ]);
    // Asia
    drawBlob(0x5a7e1a, 0x7a9e3a, [
      [565, 120, 270, 240, 22],
      [590, 90,  180, 70,  16]
    ]);
    // Oceania
    drawBlob(0xa8801a, 0xc8a03a, [
      [728, 412, 165, 120, 18],
      [752, 540, 80,  38,  12]
    ]);

    // ── Decorations ───────────────────────────────────────────────────────
    var dg = this.add.graphics();

    // Europe: 2 castle towers
    [[430, 200], [520, 195]].forEach(function(pos) {
      dg.fillStyle(0x8888aa, 1);
      dg.fillRect(pos[0] - 5, pos[1], 10, 16);
      dg.fillStyle(0x6666aa, 1);
      dg.fillTriangle(pos[0] - 7, pos[1], pos[0] + 7, pos[1], pos[0], pos[1] - 8);
    });

    // Americas: 2 pine trees
    [[130, 320], [222, 338]].forEach(function(pos) {
      dg.fillStyle(0x2a6a18, 1);
      dg.fillTriangle(pos[0] - 9,  pos[1],      pos[0] + 9,  pos[1],      pos[0], pos[1] - 18);
      dg.fillTriangle(pos[0] - 6,  pos[1] - 10, pos[0] + 6,  pos[1] - 10, pos[0], pos[1] - 24);
    });

    // Africa: 2 acacia trees
    [[442, 395], [558, 408]].forEach(function(pos) {
      dg.fillStyle(0x6a4018, 1);
      dg.fillRect(pos[0] - 3, pos[1] - 16, 6, 16);
      dg.fillStyle(0x4a7018, 1);
      dg.fillEllipse(pos[0], pos[1] - 20, 32, 10);
    });

    // Asia: pagoda
    var pgx = 680, pgy = 228;
    dg.fillStyle(0xcc4422, 1);
    dg.fillRect(pgx - 12, pgy,       24, 8);
    dg.fillRect(pgx - 8,  pgy - 8,   16, 8);
    dg.fillRect(pgx - 5,  pgy - 16,  10, 8);
    dg.fillTriangle(pgx - 6, pgy - 16, pgx + 6, pgy - 16, pgx, pgy - 24);

    // Oceania: palm tree
    var palmX = 778, palmY = 458;
    dg.fillStyle(0x8a5820, 1);
    dg.fillRect(palmX - 3, palmY - 30, 5, 30);
    dg.fillStyle(0x2a8a18, 1);
    dg.fillEllipse(palmX - 16, palmY - 32, 28, 8);
    dg.fillEllipse(palmX + 14, palmY - 28, 28, 8);
    dg.fillEllipse(palmX,      palmY - 36, 24, 8);

    // ── Double-track paths ────────────────────────────────────────────────
    var pathOrder = ['europe', 'americas', 'africa', 'asia', 'oceania'];
    var pathG = this.add.graphics();

    for (var pi = 0; pi < pathOrder.length - 1; pi++) {
      var fromC = nodeMap[pathOrder[pi]];
      var toC   = nodeMap[pathOrder[pi + 1]];
      var traveled = (pi < unlockedIdx);

      var pdx = toC.x - fromC.x;
      var pdy = toC.y - fromC.y;
      var dist = Math.sqrt(pdx * pdx + pdy * pdy);
      var perpX = (-pdy / dist) * 4;
      var perpY = ( pdx / dist) * 4;

      var railColor  = traveled ? 0xffcc00 : 0x888888;
      var railAlpha  = traveled ? 1.0 : 0.5;
      var crossColor = traveled ? 0xe8a000 : 0x888888;

      // Rail 1
      pathG.lineStyle(2, railColor, railAlpha);
      pathG.beginPath();
      pathG.moveTo(fromC.x + perpX, fromC.y + perpY);
      pathG.lineTo(toC.x   + perpX, toC.y   + perpY);
      pathG.strokePath();

      // Rail 2
      pathG.beginPath();
      pathG.moveTo(fromC.x - perpX, fromC.y - perpY);
      pathG.lineTo(toC.x   - perpX, toC.y   - perpY);
      pathG.strokePath();

      // Crossbars every 20px
      var steps = Math.floor(dist / 20);
      for (var si = 1; si < steps; si++) {
        var t = (si * 20) / dist;
        var cx = fromC.x + pdx * t;
        var cy = fromC.y + pdy * t;
        pathG.lineStyle(2, crossColor, railAlpha);
        pathG.beginPath();
        pathG.moveTo(cx + perpX, cy + perpY);
        pathG.lineTo(cx - perpX, cy - perpY);
        pathG.strokePath();
      }
    }

    // ── Continent nodes (coin style) ──────────────────────────────────────
    var nodeGMap = {};

    CONTINENTS.forEach(function(continent) {
      var cIdx       = Progress.CONTINENT_ORDER.indexOf(continent.id);
      var isUnlocked = cIdx <= unlockedIdx;
      var isCompleted= cIdx < unlockedIdx;
      var isCurrent  = cIdx === unlockedIdx;

      var nodeColor = isCompleted ? 0xffdd44 : (isUnlocked ? 0xe8a000 : 0x444444);
      var ringColor = isUnlocked  ? 0xffcc00 : 0x777777;
      var radius    = isCurrent   ? 34 : 28;

      var nodeG = self.add.graphics();
      nodeGMap[continent.id] = nodeG;

      function drawNode(rExtra) {
        var r = rExtra || 0;
        nodeG.clear();
        nodeG.fillStyle(ringColor, 1);
        nodeG.fillCircle(continent.x, continent.y, radius + 4 + r);
        nodeG.fillStyle(nodeColor, 1);
        nodeG.fillCircle(continent.x, continent.y, radius + r);
      }
      drawNode(0);

      // Star inside completed nodes
      if (isCompleted) {
        self.add.text(continent.x, continent.y, '★', {
          fontFamily: 'Arial', fontSize: '18px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);
      }

      // Pulse tween for current continent node
      if (isCurrent) {
        self.tweens.add({
          targets: nodeG,
          scaleX: 1.08, scaleY: 1.08,
          duration: 900,
          ease: 'Sine.easeInOut',
          yoyo: true,
          repeat: -1
        });
      }

      // Name label below node
      var label = (LANG === 'de') ? continent.de : continent.en;
      if (!isUnlocked) label = '🔒 ' + label;
      self.add.text(continent.x, continent.y + radius + 14, label, {
        fontFamily: 'Arial', fontSize: '15px',
        color: isUnlocked ? '#ffffff' : '#888888',
        stroke: '#000000', strokeThickness: 3
      }).setOrigin(0.5);

      // Hover / click zones for unlocked continents
      if (isUnlocked) {
        var continentId = continent.id;
        var zone = self.add.zone(continent.x, continent.y, (radius + 4) * 2, (radius + 4) * 2).setInteractive();
        zone.on('pointerover', function() {
          nodeG.clear();
          nodeG.fillStyle(0xffcc00, 1);
          nodeG.fillCircle(continent.x, continent.y, radius + 8);
          nodeG.fillStyle(0xffd740, 1);
          nodeG.fillCircle(continent.x, continent.y, radius + 2);
        });
        zone.on('pointerout', function() { drawNode(0); });
        zone.on('pointerdown', function() {
          self.scene.start('LevelSelectScene', { continentId: continentId });
        });
      }
    });

    // ── Flashing ▼ marker on current continent ────────────────────────────
    var cur = nodeMap[progress.unlockedContinent];
    var marker = this.add.text(cur.x, cur.y - 52, '▼', {
      fontFamily: 'Arial', fontSize: '22px', color: '#ffff00',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);
    this.tweens.add({ targets: marker, y: cur.y - 46, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    // ── Title ─────────────────────────────────────────────────────────────
    var titleText = (LANG === 'de') ? 'Weltkarte' : 'World Map';
    this.add.text(480, 18, titleText, {
      fontFamily: 'Arial', fontSize: '26px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5, 0);

    // ── Back button ───────────────────────────────────────────────────────
    var backLabel = (LANG === 'de') ? '← Menü' : '← Menu';
    makeMarioBtn(self, 72, 26, backLabel,
      function() { self.scene.start('MenuScene'); },
      { w: 118, h: 34, fontSize: '14px', color: 0xcc1111 }
    );

    // ── Unlock animation ──────────────────────────────────────────────────
    if (this.unlockAnimContinent) {
      var newC = nodeMap[this.unlockAnimContinent];
      var newContData = null;
      for (var ci = 0; ci < CONTINENTS.length; ci++) {
        if (CONTINENTS[ci].id === self.unlockAnimContinent) { newContData = CONTINENTS[ci]; break; }
      }

      self.time.delayedCall(600, function() {

        // 1. Flash ring (expands from node centre)
        var ring = self.add.graphics();
        ring.setPosition(newC.x, newC.y);
        ring.fillStyle(0xffffff, 0.8);
        ring.fillCircle(0, 0, 36);
        self.tweens.add({ targets: ring, scaleX: 2.5, scaleY: 2.5, alpha: 0, duration: 500, ease: 'Power2' });

        // 2. Pop tween on the new continent's node graphics
        var newNodeG = nodeGMap[self.unlockAnimContinent];
        if (newNodeG) {
          self.tweens.add({
            targets: newNodeG,
            scaleX: 1.5, scaleY: 1.5,
            duration: 300,
            ease: 'Sine.easeOut',
            yoyo: true
          });
        }

        // 3. Star burst (8 directions)
        for (var si = 0; si < 8; si++) {
          var angle = si * Math.PI / 4;
          var star = self.add.text(newC.x, newC.y, '★', {
            fontFamily: 'Arial', fontSize: '20px', color: '#ffcc00'
          }).setOrigin(0.5);
          self.tweens.add({
            targets: star,
            x: newC.x + Math.cos(angle) * 80,
            y: newC.y + Math.sin(angle) * 80,
            alpha: 0,
            duration: 700,
            ease: 'Power2'
          });
        }

        // 4. Banner text
        if (newContData) {
          var bannerText = (LANG === 'de')
            ? (newContData.de + ' freigeschaltet!')
            : (newContData.en + ' unlocked!');
          var banner = self.add.text(newC.x, newC.y + 50, bannerText, {
            fontFamily: 'Arial Black, Arial', fontSize: '24px', fontStyle: 'bold',
            color: '#ffcc00', stroke: '#000000', strokeThickness: 4
          }).setOrigin(0.5).setAlpha(0);
          self.tweens.add({
            targets: banner,
            y: newC.y + 20,
            alpha: 1,
            duration: 400,
            onComplete: function() {
              self.time.delayedCall(2000, function() {
                self.tweens.add({ targets: banner, alpha: 0, duration: 400 });
              });
            }
          });
        }
      });
    }
  }
});
```

- [ ] **Step 2: Manual verify (open game in browser)**

Navigate to WorldMapScene. Check:
- Ocean is blue with visible wave stripes
- Continents are organic green/tan blobs (not plain rectangles)
- Small decorations visible on each continent (castle, pine, acacia, pagoda, palm)
- Paths between continents look like railway tracks (double lines + crossbars)
- Locked continents show grey tracks, unlocked show gold
- Continent nodes are coin-style (thick ring, filled centre)
- Current continent node pulses gently
- Completed continents show ★ inside node
- Clicking a continent goes to LevelSelectScene
- Back button returns to MenuScene

- [ ] **Step 3: Test unlock animation**

In browser console, force a continent unlock scenario and navigate to WorldMapScene with the unlock flag:
```javascript
// In browser console, on the WorldMapScene:
scene.scene.start('WorldMapScene', { unlockAnim: 'americas' });
```
Check:
- 600ms after load: white ring expands from Americas node
- Americas node briefly pops/scales up then returns
- 8 gold ★ fly outward from node
- Banner "Amerika freigeschaltet!" / "Americas unlocked!" fades in, holds, fades out

- [ ] **Step 4: Commit**
```bash
git add src/scenes/WorldMapScene.js
git commit -m "feat: SNES Mario World-style world map with terrain blobs, railway paths, coin nodes, unlock animation"
```

---

## Task 4: Italy Colosseum and France Eiffel Tower Backgrounds

**Files:**
- Modify: `src/scenes/GameScene.js`
  - `makeCountryBg()` function: add Italy and France landmark art blocks
  - After background image placement: add France tip sparkle tween

### Part A — Colosseum (Italy)

- [ ] **Step 1: Add Colosseum block inside makeCountryBg()**

In `GameScene.js`, find the `else if (type === 'med')` block. It currently ends with a closing `}`. Add the following INSIDE that block, after the existing cypress tree drawing, before the closing `}`:

```javascript
      // Italy — Colosseum silhouette (centre-right, anchor x=680, ground y=486)
      if (id === 'italy') {
        var colX = 680;
        // Base oval shadow
        g.fillStyle(0xb09060, 1);
        g.fillEllipse(colX, 486, 200, 30);
        // Main wall body
        g.fillStyle(0xc8a870, 1);
        g.fillRect(colX - 100, 340, 200, 146);
        // Lower arcade (y 420–442): 9 dark arch openings
        g.fillStyle(0x3a2a10, 1);
        for (var ai = 0; ai < 9; ai++) {
          g.fillRect(colX - 96 + ai * 22, 420, 14, 22);
        }
        // Middle arcade (y 370–390): 8 openings
        for (var ai = 0; ai < 8; ai++) {
          g.fillRect(colX - 88 + ai * 24, 370, 12, 20);
        }
        // Upper attic wall (y 340–368): 160px wide (right 40px missing = ruin)
        g.fillStyle(0xc8a870, 1);
        g.fillRect(colX - 100, 340, 160, 28);
        // Attic windows: 5 small
        g.fillStyle(0x3a2a10, 1);
        for (var ai = 0; ai < 5; ai++) {
          g.fillRect(colX - 90 + ai * 34, 346, 8, 12);
        }
        // Ruin break: paint sky colour over top-right corner
        g.fillStyle(sky1, 1);
        g.fillRect(colX + 60, 340, 40, 28);
      }
```

Note: `sky1`, `g`, `id` are all in scope inside `makeCountryBg()`. The variable `ai` is used as the loop counter — make sure it doesn't conflict with any existing variable in that block (the outer block uses `var i` for cypress trees; `ai` is distinct).

### Part B — Eiffel Tower (France)

- [ ] **Step 2: Add Eiffel Tower block inside makeCountryBg()**

Find the `else if (type === 'fields')` block (France). It currently draws lavender/purple field rectangles and ends with `}`. Add INSIDE that block, after the existing field drawing:

```javascript
      // France — Eiffel Tower silhouette (centred at x=480, ground y=488)
      if (id === 'france') {
        g.fillStyle(0x4a4a5a, 1);
        // Base legs — two wide triangles splaying outward
        g.fillTriangle(400, 488, 455, 420, 470, 488);
        g.fillTriangle(510, 488, 525, 420, 580, 488);
        // First platform
        g.fillStyle(0x5a5a6a, 1);
        g.fillRect(442, 416, 96, 10);
        // Mid body — two narrowing triangles
        g.fillStyle(0x4a4a5a, 1);
        g.fillTriangle(442, 416, 462, 310, 468, 416);
        g.fillTriangle(492, 416, 518, 416, 498, 310);
        // Second platform
        g.fillStyle(0x5a5a6a, 1);
        g.fillRect(458, 306, 64, 8);
        // Upper spire
        g.fillStyle(0x4a4a5a, 1);
        g.fillTriangle(458, 306, 480, 195, 522, 306);
        // Horizontal lattice lines
        g.fillStyle(0x5a5a5a, 1);
        g.fillRect(428, 380, 104, 2);
        g.fillRect(436, 360, 88,  2);
        g.fillRect(444, 340, 72,  2);
        // Static gold tip dot (tween added separately in create())
        g.fillStyle(0xffdd44, 1);
        g.fillCircle(480, 195, 4);
      }
```

### Part C — Eiffel Tower tip sparkle tween

The background is a static texture — tweens must be added as a live overlay in `GameScene.create()`.

- [ ] **Step 3: Add France tip sparkle tween in GameScene.create()**

Find this line in `GameScene.create()`:
```javascript
    this.add.image(0, 0, this.countryId + '_bg').setOrigin(0, 0).setScrollFactor(0);
```

Add IMMEDIATELY after it:
```javascript
    // France: animated tip sparkle over static background
    if (this.countryId === 'france') {
      var tipG = this.add.graphics().setScrollFactor(0);
      tipG.fillStyle(0xffdd44, 1);
      tipG.fillCircle(480, 195, 4);
      this.tweens.add({ targets: tipG, alpha: 0.3, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
```

- [ ] **Step 4: Manual verify Italy background**

Open the game, start Italy. Check:
- Mediterranean background with cypresses is present
- Colosseum silhouette appears center-right: stone wall with three rows of arched openings
- Top-right corner of the upper level is "broken off" (sky colour showing through)
- Base oval shadow at ground level

- [ ] **Step 5: Manual verify France background**

Open the game, start France. Check:
- Lavender/purple field background is present
- Eiffel Tower silhouette visible: wide base legs, two mid-body sections, tapering spire
- Gold tip sparkle pulsing at the top of the tower
- Horizontal grey lattice lines visible across the tower body

- [ ] **Step 6: Commit**
```bash
git add src/scenes/GameScene.js
git commit -m "feat: add Colosseum background for Italy and Eiffel Tower background for France"
```

---

## Task 5: Deploy and End-to-End Verify

- [ ] **Step 1: Push to deploy**
```bash
git push
```

- [ ] **Step 2: End-to-end continent unlock test**

Complete all countries of Europe (or use console to set progress):
```javascript
// Browser console shortcut to simulate Europe complete
var p = JSON.parse(localStorage.getItem('weltreise_progress') || '{}');
p.completedLevels = ['austria','germany','france','italy','spain'];
p.unlockedContinent = 'americas';
localStorage.setItem('weltreise_progress', JSON.stringify(p));
location.reload();
```
Then beat any remaining country in Europe → WinScene → Continue → should go to WorldMapScene → unlock animation fires on Americas node.

- [ ] **Step 3: Verify progression order**

Confirm the path drawn on the world map goes Europe → Americas → Africa → Asia → Oceania (left→right path should go: Europe centre-right → Americas left → Africa centre → Asia right → Oceania far-right).
