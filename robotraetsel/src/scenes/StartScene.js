// robotraetsel/src/scenes/StartScene.js
var StartScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function StartScene() {
    Phaser.Scene.call(this, { key: 'StartScene' });
  },

  create: function() {
    var W = 960, H = 720;
    var self = this;

    this.add.rectangle(W / 2, H / 2, W, H, 0x1a1a2e);
    this.add.rectangle(W / 2, H / 2, W - 20, H - 20, 0x000000, 0)
      .setStrokeStyle(3, 0x3d7a25);

    this.add.text(W / 2, 80, STRINGS[LANG].title, {
      fontSize: '52px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(W / 2, 145, STRINGS[LANG].subtitle, {
      fontSize: '20px', color: '#52b788', wordWrap: { width: 800 }, align: 'center'
    }).setOrigin(0.5);

    // Instructions panel
    this.add.rectangle(W / 2, 420, 840, 440, 0x0d1a0d, 0.85)
      .setStrokeStyle(2, 0x2c5f2e);

    this.add.text(W / 2, 215, STRINGS[LANG].howToPlay, {
      fontSize: '26px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    var lines = STRINGS[LANG].instructions;
    for (var i = 0; i < lines.length; i++) {
      this.add.text(230, 268 + i * 52, lines[i][0], {
        fontSize: '24px'
      }).setOrigin(0.5);
      this.add.text(272, 268 + i * 52, lines[i][1], {
        fontSize: '18px', color: '#dddddd'
      }).setOrigin(0, 0.5);
    }

    var prompt = this.add.text(W / 2, 662, STRINGS[LANG].startPrompt, {
      fontSize: '22px', color: '#f5e642'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: prompt, alpha: 0.1, duration: 700, yoyo: true, repeat: -1
    });

    function startGame() {
      self.scene.start('GameScene');
    }

    this.input.keyboard.once('keydown', startGame);
    this.input.once('pointerdown', startGame);
  }
});
