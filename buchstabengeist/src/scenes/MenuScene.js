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
    this.add.text(W/2, 48, s.title, {
      fontFamily: 'monospace', fontSize: '26px', color: '#ff6b9d',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5);

    // Ghost decoration
    this.add.text(W/2, 95, '👻', { fontSize: '40px' }).setOrigin(0.5);

    // ── Mode selection ───────────────────────────────────────────────
    // Two boxes side-by-side: 210 px wide each, 20 px gap, 15 px outer margin
    var BOX_W = 210, BOX_H = 126, BOX_Y = 222;
    var modes = [
      { key: 'challenge', label: s.modeChallenge, desc: s.descChallenge, x: W/4 + 2 },
      { key: 'guided',    label: s.modeGuided,    desc: s.descGuided,    x: 3*W/4 - 2 }
    ];

    this._modeBoxes = {};

    modes.forEach(function(m) {
      var boxTop = BOX_Y - BOX_H / 2;

      var box = self.add.rectangle(m.x, BOX_Y, BOX_W, BOX_H, 0x1a1a3a)
        .setStrokeStyle(2, 0x6bc5ff)
        .setInteractive({ useHandCursor: true });

      // Mode name
      self.add.text(m.x, boxTop + 10, m.label, {
        fontFamily: 'monospace', fontSize: '14px', color: '#f5e642'
      }).setOrigin(0.5, 0);

      // Mode description — left-aligned bullet list inside box
      self.add.text(m.x - BOX_W / 2 + 12, boxTop + 34, m.desc, {
        fontFamily: 'monospace', fontSize: '12px', color: '#aaaacc',
        lineSpacing: 4
      }).setOrigin(0, 0);

      self._modeBoxes[m.key] = box;

      box.on('pointerdown', function() {
        self._selectedMode = m.key;
        self._updateModeHighlight();
      });
    });

    this._updateModeHighlight();

    // ── How to play ──────────────────────────────────────────────────
    this.add.text(W/2, 300, s.howToPlayTitle, {
      fontFamily: 'monospace', fontSize: '13px', color: '#6bc5ff'
    }).setOrigin(0.5);

    this.add.text(W/2, 320, s.howToPlay, {
      fontFamily: 'monospace', fontSize: '12px', color: '#888899',
      wordWrap: { width: 430 }, align: 'center', lineSpacing: 3
    }).setOrigin(0.5, 0);

    // ── Play button ──────────────────────────────────────────────────
    var playBtn = this.add.text(W/2, 460, s.playBtn, {
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
    this.add.text(W/2, 520, s.controls, {
      fontFamily: 'monospace', fontSize: '12px', color: '#555577'
    }).setOrigin(0.5);

    // Language badge
    this.add.text(W - 10, 10, LANG.toUpperCase(), {
      fontFamily: 'monospace', fontSize: '12px', color: '#444466'
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
