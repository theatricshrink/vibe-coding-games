var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameOverScene' }); },

  init: function(data) {
    this._score = data.score || 0;
  },

  create: function() {
    var W = 480, H = 660;
    var s = STRINGS[LANG];

    this.add.rectangle(W/2, H/2, W, H, 0x080818);

    this.add.text(W/2, 200, s.gameOver, {
      fontFamily: 'monospace', fontSize: '32px', color: '#ff6b6b',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(W/2, 255, s.livesOut, {
      fontFamily: 'monospace', fontSize: '14px', color: '#aaaacc'
    }).setOrigin(0.5);

    this.add.text(W/2, 310, s.score + ': ' + this._score, {
      fontFamily: 'monospace', fontSize: '22px', color: '#f5e642'
    }).setOrigin(0.5);

    var btn = this.add.text(W/2, 390, s.playAgain, {
      fontFamily: 'monospace', fontSize: '20px', color: '#ffffff',
      backgroundColor: '#2c2c5a', padding: { x: 24, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', function() { btn.setColor('#f5e642'); });
    btn.on('pointerout',  function() { btn.setColor('#ffffff'); });
    btn.on('pointerdown', function() { this.scene.start('MenuScene'); }, this);

    this.add.text(W/2, 460, '👻', { fontSize: '48px' }).setOrigin(0.5);
  }
});
