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

    // Decorative coin row
    var coinColors = [0xffcc00, 0xffe566, 0xffcc00];
    for (var ci = 0; ci < 7; ci++) {
      var cg = this.add.graphics();
      var cx = 200 + ci * 95, cy = 520;
      cg.fillStyle(0xffcc00, 1);
      cg.fillEllipse(cx, cy, 28, 34);
      cg.fillStyle(0xffe566, 1);
      cg.fillEllipse(cx - 3, cy - 4, 12, 16);
    }

    // Title with Mario-style stroke
    var titleText = (LANG === 'de') ? 'Weltreise' : 'World Tour';
    this.add.text(480, 180, titleText, {
      fontFamily: 'Arial Black, Arial',
      fontSize: '72px',
      fontStyle: 'bold',
      color: '#ffcc00',
      stroke: '#1a0900',
      strokeThickness: 8
    }).setOrigin(0.5);

    var subtitleText = (LANG === 'de') ? 'Ein Geografie-Abenteuer' : 'A Geography Adventure';
    this.add.text(480, 270, subtitleText, {
      fontFamily: 'Arial Black, Arial',
      fontSize: '22px',
      color: '#ffffff',
      stroke: '#1a0900',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Play button — green Mario-style
    makeMarioBtn(self, 480, 390, (LANG === 'de') ? '▶  Spielen' : '▶  Play',
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
    this.add.text(480, 476, progressLabel, {
      fontFamily: 'Arial', fontSize: '16px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);

    // Progress bar (400px wide)
    var barG = this.add.graphics();
    barG.fillStyle(0x000000, 0.45);
    barG.fillRoundedRect(280, 492, 400, 14, 7);
    barG.fillStyle(0x44dd44, 1);
    barG.fillRoundedRect(280, 492, Math.max(4, 400 * pct / 100), 14, 7);

    // Reset button — small, with inline confirmation
    var resetLabel = (LANG === 'de') ? '↺ Fortschritt zurücksetzen' : '↺ Reset progress';
    var confirmLabel = (LANG === 'de') ? 'Wirklich zurücksetzen?' : 'Really reset?';
    var yesLabel = (LANG === 'de') ? 'Ja' : 'Yes';
    var noLabel  = (LANG === 'de') ? 'Nein' : 'No';

    // We'll manage the reset flow with plain text + zones (avoids nested makeMarioBtn complexity)
    var resetText = self.add.text(480, 548, resetLabel, {
      fontFamily: 'Arial', fontSize: '13px', color: '#ffaaaa',
      stroke: '#000000', strokeThickness: 2
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    resetText.on('pointerover', function() { resetText.setColor('#ff4444'); });
    resetText.on('pointerout',  function() { resetText.setColor('#ffaaaa'); });
    resetText.on('pointerdown', function() {
      // Replace with confirmation
      resetText.setVisible(false);

      self.add.text(480, 534, confirmLabel, {
        fontFamily: 'Arial', fontSize: '14px', color: '#ffffff',
        stroke: '#000000', strokeThickness: 3
      }).setOrigin(0.5);

      makeMarioBtn(self, 420, 560, yesLabel,
        function() { Progress.reset(); self.scene.restart(); },
        { w: 80, h: 34, fontSize: '16px', color: 0xcc1111 }
      );
      makeMarioBtn(self, 540, 560, noLabel,
        function() { self.scene.restart(); },
        { w: 80, h: 34, fontSize: '16px', color: 0x555555 }
      );
    });
  }
});
