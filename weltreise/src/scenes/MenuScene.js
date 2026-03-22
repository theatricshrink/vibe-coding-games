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

    // Geography decoration — globe with continents
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

    // Longitude arcs (3 vertical ellipses)
    globeG.lineStyle(1, 0x64b5f6, 0.5);
    [-20, 0, 20].forEach(function(dx) {
      var hw = Math.sqrt(Math.max(0, gr * gr - dx * dx));
      if (hw > 4) globeG.strokeEllipse(gx + dx * 0.25, gy, hw * 0.5, gr * 2);
    });

    // Continent blobs
    globeG.fillStyle(0x2e7d32, 1);
    // Americas
    globeG.fillEllipse(gx - 24, gy - 10, 11, 14);
    globeG.fillEllipse(gx - 22, gy + 9, 9, 12);
    // Europe
    globeG.fillEllipse(gx + 4, gy - 16, 9, 7);
    // Africa
    globeG.fillEllipse(gx + 4, gy - 2, 10, 18);
    // Asia
    globeG.fillEllipse(gx + 18, gy - 13, 18, 11);
    // Australia
    globeG.fillEllipse(gx + 24, gy + 10, 10, 8);

    // Highlight sheen (top-left)
    globeG.fillStyle(0xffffff, 0.13);
    globeG.fillEllipse(gx - 14, gy - 18, 20, 14);

    // Outline
    globeG.lineStyle(3, 0x0d47a1, 1);
    globeG.strokeCircle(gx, gy, gr);

    // Continent name labels flanking the globe (Mario brick style)
    var labelData = [
      { x: gx - 130, y: gy - 10, text: LANG === 'de' ? 'Amerika' : 'Americas', color: 0xcc6600 },
      { x: gx + 130, y: gy - 16, text: LANG === 'de' ? 'Asien' : 'Asia',      color: 0x6a0dad },
      { x: gx + 130, y: gy + 12, text: LANG === 'de' ? 'Afrika' : 'Africa',   color: 0x8a6200 }
    ];
    labelData.forEach(function(d) {
      var bg = self.add.graphics();
      bg.fillStyle(0x1a0900, 1);
      bg.fillRoundedRect(d.x - 46, d.y - 11, 92, 22, 5);
      bg.fillStyle(d.color, 1);
      bg.fillRoundedRect(d.x - 48, d.y - 13, 96, 22, 5);
      self.add.text(d.x, d.y, d.text, {
        fontFamily: 'Arial Black, Arial', fontSize: '12px',
        color: '#ffffff', stroke: '#1a0900', strokeThickness: 2
      }).setOrigin(0.5);
    });

    // Play button — green Mario-style
    makeMarioBtn(self, 480, 398, (LANG === 'de') ? '▶  Spielen' : '▶  Play',
      function() { self.scene.start('WorldMapScene'); },
      { w: 240, h: 60, fontSize: '26px', color: 0x1a8a1a }
    );

    // Progress stats
    var progress = Progress.load();
    var allCountries = [].concat(
      EUROPE.countries, AFRICA.countries, ASIA.countries,
      AMERICAS.countries, OCEANIA.countries
    );
    var total = allCountries.length;
    var completed = progress.completedLevels.length;
    var pct = total > 0 ? Math.round(completed / total * 100) : 0;

    var progressLabel = (LANG === 'de')
      ? (completed + ' / ' + total + ' Länder  •  ' + pct + '%')
      : (completed + ' / ' + total + ' countries  •  ' + pct + '%');
    this.add.text(480, 468, progressLabel, {
      fontFamily: 'Arial', fontSize: '16px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);

    // Progress bar (400px wide)
    var barG = this.add.graphics();
    barG.fillStyle(0x000000, 0.45);
    barG.fillRoundedRect(280, 484, 400, 14, 7);
    barG.fillStyle(0x44dd44, 1);
    barG.fillRoundedRect(280, 484, Math.max(4, 400 * pct / 100), 14, 7);

    // Reset button — Mario-style red button
    var resetLabel   = (LANG === 'de') ? '↺ Zurücksetzen' : '↺ Reset Progress';
    var confirmLabel = (LANG === 'de') ? 'Wirklich zurücksetzen?' : 'Really reset?';
    var yesLabel     = (LANG === 'de') ? 'Ja' : 'Yes';
    var noLabel      = (LANG === 'de') ? 'Nein' : 'No';

    var resetBg = self.add.graphics();
    function drawResetBg(hover) {
      resetBg.clear();
      var col = hover ? 0xcc2222 : 0xaa1111;
      resetBg.fillStyle(0x1a0900, 1);
      resetBg.fillRoundedRect(480 - 105, 541 - 20 + 4, 210, 40, 7);
      resetBg.fillStyle(col, 1);
      resetBg.fillRoundedRect(480 - 105, 541 - 20, 210, 40, 7);
      resetBg.fillStyle(hover ? 0xdd4444 : 0xcc2222, 1);
      resetBg.fillRoundedRect(480 - 100, 541 - 16, 200, 7, 3);
      resetBg.lineStyle(2, 0x1a0900, 1);
      resetBg.strokeRoundedRect(480 - 105, 541 - 20, 210, 40, 7);
    }
    drawResetBg(false);

    var resetText = self.add.text(480, 541, resetLabel, {
      fontFamily: 'Arial Black, Arial', fontSize: '16px',
      color: '#ffffff', stroke: '#1a0900', strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    resetText.on('pointerover', function() { drawResetBg(true); });
    resetText.on('pointerout',  function() { drawResetBg(false); });
    resetText.on('pointerdown', function() {
      resetBg.destroy();
      resetText.destroy();

      self.add.text(480, 524, confirmLabel, {
        fontFamily: 'Arial', fontSize: '14px', color: '#ffffff',
        stroke: '#000000', strokeThickness: 3
      }).setOrigin(0.5);

      makeMarioBtn(self, 420, 554, yesLabel,
        function() { Progress.reset(); self.scene.restart(); },
        { w: 90, h: 38, fontSize: '18px', color: 0xcc1111 }
      );
      makeMarioBtn(self, 540, 554, noLabel,
        function() { self.scene.restart(); },
        { w: 90, h: 38, fontSize: '18px', color: 0x555555 }
      );
    });
  }
});
