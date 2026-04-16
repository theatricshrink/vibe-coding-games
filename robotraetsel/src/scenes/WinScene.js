// robotraetsel/src/scenes/WinScene.js
var WinScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function WinScene() {
    Phaser.Scene.call(this, { key: 'WinScene' });
  },

  init: function(data) {
    this._best = (data && data.best !== undefined) ? data.best : 0;
  },

  create: function() {
    var W = 960, H = 720;
    var self = this;
    var s = STRINGS[LANG];

    this.add.rectangle(W / 2, H / 2, W, H, 0x05100a);

    // Confetti
    var colors = [0xf5e642, 0x52b788, 0xff6b9d, 0x74c0fc, 0xffa94d, 0xa9e34b];
    for (var c = 0; c < 70; c++) {
      (function() {
        var x  = Phaser.Math.Between(0, W);
        var y0 = Phaser.Math.Between(-200, -10);
        var color = colors[Phaser.Math.Between(0, colors.length - 1)];
        var piece = self.add.rectangle(x, y0,
          Phaser.Math.Between(6, 14), Phaser.Math.Between(6, 14), color).setAlpha(0.9);
        self.tweens.add({
          targets: piece,
          y: H + 20,
          x: x + Phaser.Math.Between(-80, 80),
          angle: Phaser.Math.Between(-360, 360),
          duration: Phaser.Math.Between(2000, 5000),
          delay: Phaser.Math.Between(0, 3000),
          repeat: -1,
          repeatDelay: Phaser.Math.Between(0, 2000)
        });
      })();
    }

    // Title
    var title = this.add.text(W / 2, 100, s.winTitle, {
      fontSize: '56px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0.5);
    this.tweens.add({
      targets: title, scaleX: 1.06, scaleY: 1.06,
      duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    this.add.text(W / 2, 170, s.winSubtitle, {
      fontSize: '22px', color: '#52b788'
    }).setOrigin(0.5);

    // Defeated robot — draw full assembled robot in centre of screen
    var gfx = this.add.graphics();
    var cx = W / 2 - 32, cy = H / 2 - 80;
    for (var p = 0; p < ROBOT_PARTS.length; p++) {
      var part = ROBOT_PARTS[p];
      var grid = part.pixels;
      for (var r = 0; r < grid.length; r++) {
        for (var col = 0; col < grid[r].length; col++) {
          var code = grid[r][col];
          if (code === '.') continue;
          gfx.fillStyle(ROBOT_PALETTE[code], 1);
          gfx.fillRect(
            cx + part.ox + col * ROBOT_CELL,
            cy + part.oy + r  * ROBOT_CELL,
            ROBOT_CELL, ROBOT_CELL
          );
        }
      }
    }
    // White flag (simple pixel art on flag pole extending from right arm)
    gfx.fillStyle(0xffffff, 1);
    gfx.fillRect(cx + 68, cy + 80, 4, 24); // flag pole
    gfx.fillRect(cx + 72, cy + 80, 16, 10); // flag rectangle

    // Best chain
    this.add.text(W / 2, H / 2 + 130, s.bestChain + ' ' + this._best, {
      fontSize: '28px', color: '#aed9b8'
    }).setOrigin(0.5);

    // Play again button
    var btn = this.add.rectangle(W / 2, 640, 280, 54, 0x2c5f2e)
      .setInteractive()
      .setStrokeStyle(2, 0x52b788)
      .setAlpha(0);
    var btnLbl = this.add.text(W / 2, 640, s.playAgain, {
      fontSize: '22px', color: '#ffffff'
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({ targets: [btn, btnLbl], alpha: 1, duration: 500, delay: 600 });

    btn.on('pointerover', function() { btn.setFillStyle(0x3d7a25); });
    btn.on('pointerout',  function() { btn.setFillStyle(0x2c5f2e); });
    btn.on('pointerdown', function() { self.scene.start('GameScene'); });
    this.input.keyboard.once('keydown', function() { self.scene.start('GameScene'); });
  }
});
