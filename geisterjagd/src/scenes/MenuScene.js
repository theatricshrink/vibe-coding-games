var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'MenuScene' }); },

  create: function() {
    var W = 960, H = 560, cx = W / 2;

    this.add.rectangle(cx, H / 2, W, H, 0x000000);

    // Subtle grid
    var grid = this.add.graphics();
    grid.lineStyle(1, 0x0a0a20, 1);
    for (var x = 0; x < W; x += 40) grid.lineBetween(x, 0, x, H);
    for (var y = 0; y < H; y += 40) grid.lineBetween(0, y, W, y);

    // Title
    this.add.text(cx, 70, t('title'), {
      fontFamily: 'monospace', fontSize: '60px', color: '#cc44ff',
      stroke: '#220033', strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(cx, 140, t('subtitle'), {
      fontFamily: 'monospace', fontSize: '20px', color: '#996699'
    }).setOrigin(0.5);

    // Animated ghost decoration
    var ghost = this.add.circle(cx, 210, 18, 0xcc44ff, 0.9);
    var glow  = this.add.circle(cx, 210, 30, 0xcc44ff, 0.25);
    this.tweens.add({ targets: glow, scaleX: 2.2, scaleY: 2.2, alpha: 0, duration: 1400, repeat: -1, ease: 'Sine.out' });
    this.tweens.add({ targets: ghost, y: 205, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    // Difficulty heading
    this.add.text(cx, 265, LANG === 'de' ? 'Schwierigkeit:' : 'Difficulty:', {
      fontFamily: 'monospace', fontSize: '18px', color: '#888899'
    }).setOrigin(0.5);

    // Easy button
    var self = this;
    this._selectedDifficulty = 'easy';
    var easyBg = this._makeBtn(cx - 110, 320, t('easy') + '\n' + t('easyDesc'), 0x003322, 0x44ff88, function() {
      self._selectedDifficulty = 'easy';
      easyBg.setStrokeStyle(3, 0x44ff88);
      hardBg.setStrokeStyle(2, 0xff4444);
    });

    // Hard button
    var hardBg = this._makeBtn(cx + 110, 320, t('hard') + '\n' + t('hardDesc'), 0x220000, 0xff4444, function() {
      self._selectedDifficulty = 'hard';
      hardBg.setStrokeStyle(3, 0xff4444);
      easyBg.setStrokeStyle(2, 0x44ff88);
    });

    // Start button
    var startBg = this.add.rectangle(cx, 430, 220, 52, 0x1a001a)
      .setStrokeStyle(2, 0xcc44ff)
      .setInteractive({ useHandCursor: true });
    var startText = this.add.text(cx, 430, t('start'), {
      fontFamily: 'monospace', fontSize: '28px', color: '#cc44ff', fontStyle: 'bold'
    }).setOrigin(0.5);

    startBg.on('pointerover', function() { startBg.setFillColor(0x330044); });
    startBg.on('pointerout',  function() { startBg.setFillColor(0x1a001a); });
    startBg.on('pointerup',   function() { self._startGame(); });

    this.input.keyboard.once('keydown-ENTER', function() { self._startGame(); });
    this.input.keyboard.once('keydown-SPACE', function() { self._startGame(); });

    this.tweens.add({ targets: startText, alpha: 0.4, duration: 900, yoyo: true, repeat: -1 });
  },

  _makeBtn: function(x, y, label, bgColor, borderColor, cb) {
    var bg = this.add.rectangle(x, y, 180, 56, bgColor)
      .setStrokeStyle(2, borderColor)
      .setInteractive({ useHandCursor: true });
    this.add.text(x, y, label, {
      fontFamily: 'monospace', fontSize: '15px',
      color: '#' + borderColor.toString(16).padStart(6, '0'),
      align: 'center'
    }).setOrigin(0.5);
    bg.on('pointerup', cb);
    return bg;
  },

  _startGame: function() {
    this.scene.start('GameScene', { difficulty: this._selectedDifficulty, score: 0, level: 1 });
  }
});
