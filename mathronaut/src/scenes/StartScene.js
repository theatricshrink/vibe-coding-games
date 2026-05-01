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
