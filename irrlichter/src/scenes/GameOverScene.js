var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameOverScene' }); },

  init: function(data) {
    this.winner  = data.winner  || 1;
    this.p1Score = data.p1Score || 0;
    this.p2Score = data.p2Score || 0;
  },

  create: function() {
    var W = 960, H = 560;
    var cx = W / 2, cy = H / 2;

    this.add.rectangle(cx, cy, W, H, 0x000000);

    // Subtle grid
    var grid = this.add.graphics();
    grid.lineStyle(1, 0x0a0a20, 1);
    for (var x = 0; x < W; x += 40) grid.lineBetween(x, 0, x, H);
    for (var y = 0; y < H; y += 40) grid.lineBetween(0, y, W, y);

    var winnerColor = this.winner === 1 ? '#ff8822' : '#44aaff';
    var winnerStr   = this.winner === 1 ? t('winnerP1') : t('winnerP2');

    // Irrlicht burst particles
    var irrGlow = this.add.circle(cx, 140, 40, 0x00ffcc, 0.6);
    this.tweens.add({ targets: irrGlow, scaleX: 3, scaleY: 3, alpha: 0, duration: 1200, ease: 'Quad.out' });
    this.add.circle(cx, 140, 14, 0x00ffcc);

    // Winner text
    this.add.text(cx, 185, winnerStr, {
      fontFamily: 'monospace', fontSize: '40px', color: winnerColor,
      align: 'center', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5, 0);

    // Final score
    this.add.text(cx, 305, t('finalScore'), {
      fontFamily: 'monospace', fontSize: '18px', color: '#667788'
    }).setOrigin(0.5);

    this.add.text(cx, 335, this.p1Score + '  –  ' + this.p2Score, {
      fontFamily: 'monospace', fontSize: '44px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // P1/P2 labels below score
    this.add.text(cx - 54, 380, t('player1'), {
      fontFamily: 'monospace', fontSize: '14px', color: '#ff8822'
    }).setOrigin(0.5, 0);
    this.add.text(cx + 54, 380, t('player2'), {
      fontFamily: 'monospace', fontSize: '14px', color: '#44aaff'
    }).setOrigin(0.5, 0);

    // Buttons
    this._makeBtn(cx - 110, 460, t('playAgain'), 0x003322, 0x00ffcc, this._playAgain, this);
    this._makeBtn(cx + 110, 460, t('toMenu'),    0x1a1a00, 0xffcc00, this._toMenu,    this);
  },

  _makeBtn: function(x, y, label, bgColor, borderColor, cb, ctx) {
    var bg = this.add.rectangle(x, y, 190, 48, bgColor)
      .setStrokeStyle(2, borderColor)
      .setInteractive({ useHandCursor: true });
    this.add.text(x, y, label, {
      fontFamily: 'monospace', fontSize: '18px',
      color: '#' + borderColor.toString(16).padStart(6, '0')
    }).setOrigin(0.5);
    bg.on('pointerover',  function() { bg.setAlpha(0.75); });
    bg.on('pointerout',   function() { bg.setAlpha(1); });
    bg.on('pointerup',    cb, ctx);
  },

  _playAgain: function() {
    this.scene.start('GameScene', { round: 0, p1Score: 0, p2Score: 0 });
  },

  _toMenu: function() {
    this.scene.start('MenuScene');
  }
});
