var CollectionScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function CollectionScene() {
    Phaser.Scene.call(this, { key: 'CollectionScene' });
  },

  create: function() {
    var W = 960, H = 720;
    var self = this;

    var raw = localStorage.getItem('pgame_collection');
    var collection = {};
    try { if (raw) collection = JSON.parse(raw); } catch(e) {}

    this.add.rectangle(W / 2, H / 2, W, H, 0x0d0d1a, 0.92);

    var caught = Object.keys(collection).length;
    this.add.text(W / 2, 40, STRINGS[LANG].caughtHeader + ': ' + caught + ' / ' + CREATURES.length, {
      fontSize: '30px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(W / 2, 80, STRINGS[LANG].closeHint, {
      fontSize: '16px', color: '#aaaaaa'
    }).setOrigin(0.5);

    var cols = 4;
    var cardW = 190, cardH = 210;
    var startX = 95, startY = 140;

    for (var i = 0; i < CREATURES.length; i++) {
      var c = CREATURES[i];
      var col = i % cols;
      var row = Math.floor(i / cols);
      var cx = startX + col * (cardW + 20);
      var cy = startY + row * (cardH + 20);
      var isCaught = !!collection[c.id];

      var cardColor = isCaught ? 0x1b4332 : 0x1a1a2e;
      this.add.rectangle(cx + cardW / 2, cy + cardH / 2, cardW, cardH, cardColor)
        .setStrokeStyle(2, isCaught ? 0x52b788 : 0x444444);

      if (isCaught) {
        this.add.text(cx + cardW / 2, cy + 60, c.emoji, {
          fontSize: '52px'
        }).setOrigin(0.5);
        this.add.text(cx + cardW / 2, cy + 120, LANG === 'en' ? c.nameEn : c.name, {
          fontSize: '18px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(cx + cardW / 2, cy + 155, STRINGS[LANG].caughtLabel, {
          fontSize: '13px', color: '#52b788'
        }).setOrigin(0.5);
        var rarityColor = c.rarity === 'rare' ? '#f5e642' : c.rarity === 'uncommon' ? '#b0c4de' : '#aaaaaa';
        this.add.text(cx + cardW / 2, cy + 178, STRINGS[LANG].rarity[c.rarity], {
          fontSize: '12px', color: rarityColor
        }).setOrigin(0.5);
      } else {
        this.add.text(cx + cardW / 2, cy + 60, '❓', {
          fontSize: '52px'
        }).setOrigin(0.5).setAlpha(0.4);
        this.add.text(cx + cardW / 2, cy + 120, '???', {
          fontSize: '20px', color: '#555555'
        }).setOrigin(0.5);
      }
    }

    var closed = false;
    function close() {
      if (closed) return;
      closed = true;
      self.scene.get('GameScene')._collectionActive = false;
      self.scene.stop();
      self.scene.resume('GameScene');
    }

    var cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    var escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    cKey.on('down', close);
    escKey.on('down', close);
  }
});
