var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function MenuScene() {
    Phaser.Scene.call(this, { key: 'MenuScene' });
  },

  create: function() {
    var self = this;

    // Sky-blue Mario-style background
    this.add.rectangle(480, 360, 960, 720, 0x5c94fc);
    // Ground strip
    this.add.rectangle(480, 660, 960, 120, 0x8b5e3c);
    this.add.rectangle(480, 605, 960, 14, 0x4a8c3f);

    // Decorative coin row
    var coinColors = [0xffcc00, 0xffe566, 0xffcc00];
    for (var ci = 0; ci < 7; ci++) {
      var cg = this.add.graphics();
      var cx = 200 + ci * 95, cy = 520;
      cg.fillStyle(0xffcc00, 1);
      cg.fillEllipse(cx, cy, 28, 34);
      cg.fillStyle(0xffe566, 1);
      cg.fillEllipse(cx - 3, cy - 4, 12, 16);
    }

    // Title with Mario-style stroke
    var titleText = (LANG === 'de') ? 'Weltreise' : 'World Tour';
    this.add.text(480, 180, titleText, {
      fontFamily: 'Arial Black, Arial',
      fontSize: '72px',
      fontStyle: 'bold',
      color: '#ffcc00',
      stroke: '#1a0900',
      strokeThickness: 8
    }).setOrigin(0.5);

    var subtitleText = (LANG === 'de') ? 'Ein Geografie-Abenteuer' : 'A Geography Adventure';
    this.add.text(480, 270, subtitleText, {
      fontFamily: 'Arial Black, Arial',
      fontSize: '22px',
      color: '#ffffff',
      stroke: '#1a0900',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Play button — green Mario-style
    makeMarioBtn(self, 480, 390, (LANG === 'de') ? '▶  Spielen' : '▶  Play',
      function() { self.scene.start('WorldMapScene'); },
      { w: 240, h: 60, fontSize: '26px', color: 0x1a8a1a }
    );
  }
});
