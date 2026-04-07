var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function MenuScene() {
    Phaser.Scene.call(this, { key: 'MenuScene' });
  },

  create: function() {
    var self = this;

    // Sky-blue Mario-style background
    this.add.rectangle(480, 360, 960, 720, 0x5c94fc);
    // Ground strip
    this.add.rectangle(480, 660, 960, 120, 0x8b5e3c);
    this.add.rectangle(480, 605, 960, 14, 0x4a8c3f);

    // Title with Mario-style stroke
    var titleText = (LANG === 'de') ? 'Weltreise' : 'World Tour';
    this.add.text(480, 162, titleText, {
      fontFamily: 'Arial Black, Arial',
      fontSize: '72px',
      fontStyle: 'bold',
      color: '#ffcc00',
      stroke: '#1a0900',
      strokeThickness: 8
    }).setOrigin(0.5);

    var subtitleText = (LANG === 'de') ? 'Ein Geografie-Abenteuer' : 'A Geography Adventure';
    this.add.text(480, 248, subtitleText, {
      fontFamily: 'Arial Black, Arial',
      fontSize: '22px',
      color: '#ffffff',
      stroke: '#1a0900',
      strokeThickness: 4
    }).setOrigin(0.5);

    // ── Globe ─────────────────────────────────────────────────────────
    var gx = 480, gy = 318, gr = 40;
    var globeG = this.add.graphics();

    // Drop shadow
    globeG.fillStyle(0x000000, 0.18);
    globeG.fillCircle(gx + 5, gy + 5, gr);
    // Ocean
    globeG.fillStyle(0x1565c0, 1);
    globeG.fillCircle(gx, gy, gr);
    // Latitude lines
    globeG.lineStyle(1, 0x64b5f6, 0.5);
    [-22, -11, 0, 11, 22].forEach(function(dy) {
      var hw = Math.sqrt(Math.max(0, gr * gr - dy * dy));
      if (hw > 4) globeG.strokeEllipse(gx, gy + dy, hw * 2, 7);
    });
    // Longitude arcs
    globeG.lineStyle(1, 0x64b5f6, 0.5);
    [-20, 0, 20].forEach(function(dx) {
      var hw = Math.sqrt(Math.max(0, gr * gr - dx * dx));
      if (hw > 4) globeG.strokeEllipse(gx + dx * 0.25, gy, hw * 0.5, gr * 2);
    });
    // Continent land blobs (always visible, dimmed until completed)
    var blobDefs = [
      // Americas
      { x: gx - 24, y: gy - 10, w: 11, h: 14, id: 'americas' },
      { x: gx - 22, y: gy + 9,  w: 9,  h: 12, id: 'americas' },
      // Europe
      { x: gx + 4,  y: gy - 16, w: 9,  h: 7,  id: 'europe'   },
      // Africa
      { x: gx + 4,  y: gy - 2,  w: 10, h: 18, id: 'africa'   },
      // Asia
      { x: gx + 18, y: gy - 13, w: 18, h: 11, id: 'asia'     },
      // Australia/Oceania
      { x: gx + 24, y: gy + 10, w: 10, h: 8,  id: 'oceania'  }
    ];

    // Highlight sheen
    globeG.fillStyle(0xffffff, 0.13);
    globeG.fillEllipse(gx - 14, gy - 18, 20, 14);
    // Globe outline
    globeG.lineStyle(3, 0x0d47a1, 1);
    globeG.strokeCircle(gx, gy, gr);

    // ── Progress check ────────────────────────────────────────────────
    var progress = Progress.load();
    var completedLevels = progress.completedLevels;

    var continentDefs = [
      { data: EUROPE,   id: 'europe',   label: LANG === 'de' ? 'Europa'    : 'Europe',   bx: 364, by: 280 },
      { data: AMERICAS, id: 'americas', label: LANG === 'de' ? 'Amerika'   : 'Americas', bx: 338, by: 323 },
      { data: ASIA,     id: 'asia',     label: LANG === 'de' ? 'Asien'     : 'Asia',     bx: 598, by: 284 },
      { data: AFRICA,   id: 'africa',   label: LANG === 'de' ? 'Afrika'    : 'Africa',   bx: 598, by: 332 },
      { data: OCEANIA,  id: 'oceania',  label: LANG === 'de' ? 'Ozeanien'  : 'Oceania',  bx: 592, by: 354 }
    ];

    // Draw dimmed continent blobs first (always)
    blobDefs.forEach(function(b) {
      var done = continentDefs.find(function(c) { return c.id === b.id; });
      var complete = done && done.data.countries.every(function(c) {
        return completedLevels.indexOf(c.id) !== -1;
      });
      globeG.fillStyle(complete ? 0x2e7d32 : 0x1b5e20, complete ? 1 : 0.55);
      globeG.fillEllipse(b.x, b.y, b.w, b.h);
    });

    // ── Mario star badge helper ────────────────────────────────────────
    function drawStarShape(g, cx, cy, ro, ri, fill) {
      var pts = [];
      for (var i = 0; i < 10; i++) {
        var a = (i * Math.PI / 5) - Math.PI / 2;
        var r = (i % 2 === 0) ? ro : ri;
        pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
      }
      g.fillStyle(fill, 1);
      g.fillPoints(pts, true);
      g.lineStyle(1.5, 0x1a0900, 1);
      g.strokePoints(pts, true);
      // Inner highlight
      var hPts = [];
      for (var j = 0; j < 10; j++) {
        var ha = (j * Math.PI / 5) - Math.PI / 2;
        var hr = (j % 2 === 0) ? ro * 0.55 : ri * 0.55;
        hPts.push({ x: cx + hr * Math.cos(ha) - 1, y: cy + hr * Math.sin(ha) - 2 });
      }
      g.fillStyle(0xffe566, 0.5);
      g.fillPoints(hPts, true);
    }

    function addStarBadge(bx, by, label) {
      var bw = 110, bh = 26;
      var bg = self.add.graphics();
      // Shadow
      bg.fillStyle(0x1a0900, 0.7);
      bg.fillRoundedRect(bx - bw / 2 + 3, by - bh / 2 + 3, bw, bh, 7);
      // Gold body
      bg.fillStyle(0xffcc00, 1);
      bg.fillRoundedRect(bx - bw / 2, by - bh / 2, bw, bh, 7);
      // Highlight strip
      bg.fillStyle(0xffe566, 1);
      bg.fillRoundedRect(bx - bw / 2 + 4, by - bh / 2 + 4, bw - 8, 6, 2);
      // Outline
      bg.lineStyle(2, 0x1a0900, 1);
      bg.strokeRoundedRect(bx - bw / 2, by - bh / 2, bw, bh, 7);
      // Star icon on left
      drawStarShape(bg, bx - bw / 2 + 16, by, 11, 4, 0xffd700);
      // Label
      self.add.text(bx + 14, by, label, {
        fontFamily: 'Arial Black, Arial',
        fontSize: '11px',
        color: '#1a0900',
        stroke: '#ffe566',
        strokeThickness: 1
      }).setOrigin(0.5);
    }

    // Draw badges only for completed continents
    continentDefs.forEach(function(c) {
      var complete = c.data.countries.every(function(country) {
        return completedLevels.indexOf(country.id) !== -1;
      });
      if (complete) {
        addStarBadge(c.bx, c.by, c.label);
      }
    });

    // ── Play button ───────────────────────────────────────────────────
    makeMarioBtn(self, 480, 400, (LANG === 'de') ? '▶  Spielen' : '▶  Play',
      function() { self.scene.start('WorldMapScene'); },
      { w: 240, h: 60, fontSize: '26px', color: 0x1a8a1a }
    );

    // ── Difficulty toggle ─────────────────────────────────────────────
    var isEasy = localStorage.getItem('weltreise_easy') === 'true';
    var lblNormal = LANG === 'de' ? 'Normal' : 'Normal';
    var lblEasy   = LANG === 'de' ? 'Einfach' : 'Easy';

    function makeToggleBtn(scene, x, y, label, active, onClick) {
      var bw = 110, bh = 34;
      var bg = scene.add.graphics();
      bg.fillStyle(0x1a0900, 1);
      bg.fillRoundedRect(x - bw / 2 + 3, y - bh / 2 + 3, bw, bh, 7);
      if (active) {
        bg.fillStyle(0xffcc00, 1);
        bg.fillRoundedRect(x - bw / 2, y - bh / 2, bw, bh, 7);
        bg.fillStyle(0xffe566, 1);
        bg.fillRoundedRect(x - bw / 2 + 4, y - bh / 2 + 4, bw - 8, 5, 2);
        bg.lineStyle(2, 0x1a0900, 1);
        bg.strokeRoundedRect(x - bw / 2, y - bh / 2, bw, bh, 7);
      } else {
        bg.fillStyle(0x334466, 1);
        bg.fillRoundedRect(x - bw / 2, y - bh / 2, bw, bh, 7);
        bg.lineStyle(2, 0x1a0900, 1);
        bg.strokeRoundedRect(x - bw / 2, y - bh / 2, bw, bh, 7);
      }
      var txt = scene.add.text(x, y, label, {
        fontFamily: 'Arial Black, Arial',
        fontSize: '14px',
        color: active ? '#1a0900' : '#aabbcc',
        stroke: active ? '#ffe566' : '#000000',
        strokeThickness: active ? 1 : 2
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      txt.on('pointerdown', onClick);
      return { bg: bg, txt: txt };
    }

    var toggleY = 452;

    makeToggleBtn(self, 418, toggleY, lblNormal, !isEasy, function() {
      localStorage.setItem('weltreise_easy', 'false');
      self.scene.restart();
    });
    makeToggleBtn(self, 542, toggleY, lblEasy, isEasy, function() {
      localStorage.setItem('weltreise_easy', 'true');
      self.scene.restart();
    });

    // ── Progress stats ────────────────────────────────────────────────
    var allCountries = [].concat(
      EUROPE.countries, AFRICA.countries, ASIA.countries,
      AMERICAS.countries, OCEANIA.countries
    );
    var total = allCountries.length;
    var completed = completedLevels.length;
    var pct = total > 0 ? Math.round(completed / total * 100) : 0;

    var progressLabel = (LANG === 'de')
      ? (completed + ' / ' + total + ' Länder  •  ' + pct + '%')
      : (completed + ' / ' + total + ' countries  •  ' + pct + '%');
    this.add.text(480, 508, progressLabel, {
      fontFamily: 'Arial', fontSize: '16px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);

    var barG = this.add.graphics();
    barG.fillStyle(0x000000, 0.45);
    barG.fillRoundedRect(280, 524, 400, 14, 7);
    barG.fillStyle(0x44dd44, 1);
    barG.fillRoundedRect(280, 524, Math.max(4, 400 * pct / 100), 14, 7);

    // ── Reset button (Mario red style) ────────────────────────────────
    var resetLabel   = (LANG === 'de') ? '↺ Zurücksetzen' : '↺ Reset Progress';
    var confirmLabel = (LANG === 'de') ? 'Wirklich zurücksetzen?' : 'Really reset?';
    var yesLabel     = (LANG === 'de') ? 'Ja' : 'Yes';
    var noLabel      = (LANG === 'de') ? 'Nein' : 'No';

    var resetBg = self.add.graphics();
    var resetY = 578;
    function drawResetBg(hover) {
      resetBg.clear();
      var col = hover ? 0xcc2222 : 0xaa1111;
      resetBg.fillStyle(0x1a0900, 1);
      resetBg.fillRoundedRect(480 - 105, resetY - 20 + 4, 210, 40, 7);
      resetBg.fillStyle(col, 1);
      resetBg.fillRoundedRect(480 - 105, resetY - 20, 210, 40, 7);
      resetBg.fillStyle(hover ? 0xdd4444 : 0xcc2222, 1);
      resetBg.fillRoundedRect(480 - 100, resetY - 16, 200, 7, 3);
      resetBg.lineStyle(2, 0x1a0900, 1);
      resetBg.strokeRoundedRect(480 - 105, resetY - 20, 210, 40, 7);
    }
    drawResetBg(false);

    var resetText = self.add.text(480, resetY, resetLabel, {
      fontFamily: 'Arial Black, Arial', fontSize: '16px',
      color: '#ffffff', stroke: '#1a0900', strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    resetText.on('pointerover', function() { drawResetBg(true); });
    resetText.on('pointerout',  function() { drawResetBg(false); });
    resetText.on('pointerdown', function() {
      resetBg.destroy();
      resetText.destroy();

      self.add.text(480, resetY - 18, confirmLabel, {
        fontFamily: 'Arial', fontSize: '14px', color: '#ffffff',
        stroke: '#000000', strokeThickness: 3
      }).setOrigin(0.5);

      makeMarioBtn(self, 420, resetY + 14, yesLabel,
        function() { Progress.reset(); self.scene.restart(); },
        { w: 90, h: 38, fontSize: '18px', color: 0xcc1111 }
      );
      makeMarioBtn(self, 540, resetY + 14, noLabel,
        function() { self.scene.restart(); },
        { w: 90, h: 38, fontSize: '18px', color: 0x555555 }
      );
    });
  }
});
