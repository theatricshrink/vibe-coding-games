var WinScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function WinScene() {
    Phaser.Scene.call(this, { key: 'WinScene' });
  },

  create: function() {
    var W = 960, H = 720;
    var self = this;

    // Background
    this.add.rectangle(W / 2, H / 2, W, H, 0x0d1a0d);

    // Decorative border
    this.add.rectangle(W / 2, H / 2, W - 20, H - 20, 0x000000, 0)
      .setStrokeStyle(3, 0xf5e642);

    // Title
    this.add.text(W / 2, 55, '🎉 Glückwunsch! 🎉', {
      fontSize: '46px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(W / 2, 115, 'Du hast alle 8 Kreaturen gefangen!', {
      fontSize: '24px', color: '#52b788'
    }).setOrigin(0.5);

    // Creature grid — 4 columns × 2 rows
    var cardW = 180, cardH = 155;
    var startX = 90, startY = 170;
    var cols = 4;

    for (var i = 0; i < CREATURES.length; i++) {
      var c = CREATURES[i];
      var col = i % cols;
      var row = Math.floor(i / cols);
      var cx = startX + col * (cardW + 16) + cardW / 2;
      var cy = startY + row * (cardH + 12) + cardH / 2;

      this.add.rectangle(cx, cy, cardW, cardH, 0x1b4332)
        .setStrokeStyle(2, 0x52b788);
      this.add.text(cx, cy - 28, c.emoji, { fontSize: '40px' }).setOrigin(0.5);
      this.add.text(cx, cy + 22, c.name, {
        fontSize: '15px', color: '#ffffff', fontStyle: 'bold'
      }).setOrigin(0.5);
      var rarityColor = c.rarity === 'rare' ? '#f5e642' : c.rarity === 'uncommon' ? '#b0c4de' : '#aaaaaa';
      this.add.text(cx, cy + 46, c.rarity, {
        fontSize: '12px', color: rarityColor
      }).setOrigin(0.5);
    }

    // Play again button
    var btn = this.add.rectangle(W / 2, 656, 320, 58, 0x2c5f2e)
      .setInteractive()
      .setStrokeStyle(2, 0x52b788);
    var btnLabel = this.add.text(W / 2, 656, '🔄 Nochmal spielen', {
      fontSize: '24px', color: '#ffffff'
    }).setOrigin(0.5);

    btn.on('pointerover', function() { btn.setFillStyle(0x3d7a25); });
    btn.on('pointerout',  function() { btn.setFillStyle(0x2c5f2e); });
    btn.on('pointerdown', function() {
      localStorage.removeItem('pgame_collection');
      self.scene.start('StartScene');
    });
  }
});
