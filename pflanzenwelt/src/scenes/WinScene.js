var WinScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function WinScene() {
    Phaser.Scene.call(this, { key: 'WinScene' });
  },

  create: function() {
    var W = 960, H = 720;
    var self = this;

    // Deep background
    this.add.rectangle(W / 2, H / 2, W, H, 0x05100a);

    // Confetti — 60 colored rectangles raining down
    var confettiColors = [0xf5e642, 0x52b788, 0xff6b9d, 0x74c0fc, 0xffa94d, 0xa9e34b, 0xda77f2];
    for (var c = 0; c < 60; c++) {
      (function() {
        var x = Phaser.Math.Between(0, W);
        var startY = Phaser.Math.Between(-200, -10);
        var color = confettiColors[Phaser.Math.Between(0, confettiColors.length - 1)];
        var w = Phaser.Math.Between(6, 14);
        var h = Phaser.Math.Between(6, 14);
        var piece = self.add.rectangle(x, startY, w, h, color).setAlpha(0.85);
        var duration = Phaser.Math.Between(2000, 5000);
        var delay = Phaser.Math.Between(0, 3000);
        self.tweens.add({
          targets: piece,
          y: H + 20,
          x: x + Phaser.Math.Between(-60, 60),
          angle: Phaser.Math.Between(-360, 360),
          duration: duration,
          delay: delay,
          repeat: -1,
          repeatDelay: Phaser.Math.Between(0, 2000)
        });
      })();
    }

    // Title — pulsing
    var title = this.add.text(W / 2, 62, STRINGS[LANG].winTitle, {
      fontSize: '48px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      scaleX: 1.06, scaleY: 1.06,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.add.text(W / 2, 122, STRINGS[LANG].winSubtitle, {
      fontSize: '20px', color: '#52b788'
    }).setOrigin(0.5);

    // Creature cards — staggered pop-in
    var cardW = 180, cardH = 152;
    var startX = 90, startY = 168;
    var cols = 4;

    for (var i = 0; i < CREATURES.length; i++) {
      (function(idx) {
        var cr = CREATURES[idx];
        var col = idx % cols;
        var row = Math.floor(idx / cols);
        var cx = startX + col * (cardW + 16) + cardW / 2;
        var cy = startY + row * (cardH + 12) + cardH / 2;

        var card = self.add.container(cx, cy).setScale(0).setAlpha(0);

        var bg = self.add.rectangle(0, 0, cardW, cardH, 0x1b4332)
          .setStrokeStyle(2, 0x52b788);
        var emoji = self.add.text(0, -28, cr.emoji, { fontSize: '38px' }).setOrigin(0.5);
        var name  = self.add.text(0, 20, LANG === 'en' ? cr.nameEn : cr.name, {
          fontSize: '15px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);
        var rarityColor = cr.rarity === 'rare' ? '#f5e642' : cr.rarity === 'uncommon' ? '#b0c4de' : '#aaaaaa';
        var rarity = self.add.text(0, 44, STRINGS[LANG].rarity[cr.rarity], {
          fontSize: '12px', color: rarityColor
        }).setOrigin(0.5);

        card.add([bg, emoji, name, rarity]);

        self.tweens.add({
          targets: card,
          scaleX: 1, scaleY: 1, alpha: 1,
          duration: 350,
          delay: 400 + idx * 120,
          ease: 'Back.easeOut'
        });

        // Rare cards get a gold shimmer after popping in
        if (cr.rarity === 'rare') {
          self.tweens.add({
            targets: bg,
            strokeColor: 0xf5e642,
            duration: 600,
            delay: 400 + idx * 120 + 400,
            yoyo: true,
            repeat: -1
          });
        }
      })(i);
    }

    // Play again button — appears after all cards have popped in
    var btn = this.add.rectangle(W / 2, 658, 320, 56, 0x2c5f2e)
      .setInteractive()
      .setStrokeStyle(2, 0x52b788)
      .setAlpha(0);
    var btnLabel = this.add.text(W / 2, 658, STRINGS[LANG].playAgain, {
      fontSize: '23px', color: '#ffffff'
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: [btn, btnLabel],
      alpha: 1,
      duration: 400,
      delay: 400 + CREATURES.length * 120 + 200
    });

    btn.on('pointerover', function() { btn.setFillStyle(0x3d7a25); });
    btn.on('pointerout',  function() { btn.setFillStyle(0x2c5f2e); });
    btn.on('pointerdown', function() {
      localStorage.removeItem('pgame_collection');
      self.scene.start('StartScene');
    });
  }
});
