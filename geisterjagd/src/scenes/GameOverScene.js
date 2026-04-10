var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameOverScene' }); },

  init: function(data) {
    this.score      = data.score      || 0;
    this.level      = data.level      || 1;
    this.difficulty = data.difficulty || 'easy';
  },

  create: function() {
    var W = 960, H = 560, cx = W / 2;

    // Save high score
    var key = 'geisterjagd_best_' + this.difficulty;
    var prev = parseInt(localStorage.getItem(key) || '0', 10);
    var best = Math.max(prev, this.score);
    localStorage.setItem(key, best);

    this.add.rectangle(cx, H / 2, W, H, 0x000000);
    var grid = this.add.graphics();
    grid.lineStyle(1, 0x0a0a20, 1);
    for (var x = 0; x < W; x += 40) grid.lineBetween(x, 0, x, H);
    for (var y = 0; y < H; y += 40) grid.lineBetween(0, y, W, y);

    // Ghost burst
    var glow = this.add.circle(cx, 130, 40, 0xcc44ff, 0.5);
    this.tweens.add({ targets: glow, scaleX: 3, scaleY: 3, alpha: 0, duration: 1200, ease: 'Quad.out' });
    this.add.circle(cx, 130, 16, 0xcc44ff);

    this.add.text(cx, 180, t('gameOver'), {
      fontFamily: 'monospace', fontSize: '48px', color: '#cc44ff', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(cx, 250, t('level') + ': ' + this.level, {
      fontFamily: 'monospace', fontSize: '22px', color: '#996699'
    }).setOrigin(0.5);

    this.add.text(cx, 295, t('finalScore') + ': ' + this.score, {
      fontFamily: 'monospace', fontSize: '36px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(cx, 345, t('bestScore') + ': ' + best, {
      fontFamily: 'monospace', fontSize: '20px', color: '#888877'
    }).setOrigin(0.5);

    var self = this;
    this._makeBtn(cx - 110, 450, t('playAgain'), 0x1a001a, 0xcc44ff, function() {
      self.scene.start('GameScene', { difficulty: self.difficulty, score: 0, level: 1 });
    });
    this._makeBtn(cx + 110, 450, t('toMenu'), 0x1a1a00, 0xffcc00, function() {
      self.scene.start('MenuScene');
    });
  },

  _makeBtn: function(x, y, label, bgColor, borderColor, cb) {
    var bg = this.add.rectangle(x, y, 190, 48, bgColor)
      .setStrokeStyle(2, borderColor)
      .setInteractive({ useHandCursor: true });
    this.add.text(x, y, label, {
      fontFamily: 'monospace', fontSize: '18px',
      color: '#' + borderColor.toString(16).padStart(6, '0')
    }).setOrigin(0.5);
    bg.on('pointerover', function() { bg.setAlpha(0.75); });
    bg.on('pointerout',  function() { bg.setAlpha(1); });
    bg.on('pointerup', cb);
  }
});
