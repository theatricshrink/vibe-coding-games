var StartScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function StartScene() {
    Phaser.Scene.call(this, { key: 'StartScene' });
  },

  create: function() {
    var W = 960, H = 720;
    var self = this;

    // Background
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a3a10);

    // Decorative border
    this.add.rectangle(W / 2, H / 2, W - 20, H - 20, 0x000000, 0)
      .setStrokeStyle(3, 0x52b788);

    // Title
    this.add.text(W / 2, 75, '🌿 Pflanzenwelt 🌿', {
      fontSize: '50px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(W / 2, 138, 'Fange alle 8 Kreaturen!', {
      fontSize: '22px', color: '#52b788'
    }).setOrigin(0.5);

    // Instructions box
    this.add.rectangle(W / 2, 400, 820, 420, 0x0d1a0d, 0.85)
      .setStrokeStyle(2, 0x3d7a25);

    this.add.text(W / 2, 210, 'Wie spielt man?', {
      fontSize: '26px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    var lines = [
      ['⬆⬇⬅➡', 'Bewege dich mit den Pfeiltasten oder WASD'],
      ['🌿',     'Laufe durch das hohe Gras um Kreaturen zu treffen'],
      ['❓',     'Beantworte die Frage richtig um sie zu fangen'],
      ['✖',     'Falsche Antwort? Die Kreatur flieht!'],
      ['⭐',     'Seltene Kreaturen brauchen 2 richtige Antworten'],
      ['📖',    'Drücke C um deine Sammlung anzusehen'],
    ];

    for (var i = 0; i < lines.length; i++) {
      this.add.text(230, 263 + i * 55, lines[i][0], {
        fontSize: '26px'
      }).setOrigin(0.5);
      this.add.text(270, 263 + i * 55, lines[i][1], {
        fontSize: '19px', color: '#dddddd'
      }).setOrigin(0, 0.5);
    }

    // Start prompt
    var prompt = this.add.text(W / 2, 658, 'Drücke eine Taste oder klicke zum Starten', {
      fontSize: '22px', color: '#f5e642'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: prompt,
      alpha: 0.1,
      duration: 700,
      yoyo: true,
      repeat: -1
    });

    function startGame() {
      localStorage.removeItem('pgame_collection');
      self.scene.start('GameScene');
    }

    this.input.keyboard.once('keydown', startGame);
    this.input.once('pointerdown', startGame);
  }
});
