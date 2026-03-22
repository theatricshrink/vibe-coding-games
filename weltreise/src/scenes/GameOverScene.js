var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function GameOverScene() {
    Phaser.Scene.call(this, { key: 'GameOverScene' });
  },
  init: function(data) {
    this.countryId = data.countryId;
    this.continentId = data.continentId;
  },
  create: function() {
    var self = this;
    // Dark background
    this.add.rectangle(480, 360, 960, 720, 0x0d1b2a);

    // "Game Over" text
    var title = LANG === 'de' ? 'Spiel vorbei' : 'Game Over';
    this.add.text(480, 200, title, {
      fontFamily: 'Arial', fontSize: '64px', color: '#ff4444'
    }).setOrigin(0.5);

    // Retry — red Mario button
    makeMarioBtn(self, 480, 370, (LANG === 'de') ? '↺  Nochmal' : '↺  Retry',
      function() { self.scene.start('GameScene', { countryId: self.countryId, continentId: self.continentId }); },
      { w: 250, h: 60, fontSize: '26px', color: 0xcc1111 }
    );
    // Level select — gold Mario button
    makeMarioBtn(self, 480, 470, (LANG === 'de') ? '⬅  Länder' : '⬅  Levels',
      function() { self.scene.start('LevelSelectScene', { continentId: self.continentId }); },
      { w: 250, h: 60, fontSize: '26px', color: 0xe8a000 }
    );
  }
});
