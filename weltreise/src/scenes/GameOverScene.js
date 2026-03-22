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

    // Retry button
    var retryLabel = LANG === 'de' ? 'Nochmal' : 'Retry';
    var retryBg = this.add.rectangle(480, 380, 240, 60, 0x2196F3).setInteractive();
    this.add.text(480, 380, retryLabel, { fontFamily: 'Arial', fontSize: '28px', color: '#ffffff' }).setOrigin(0.5);
    retryBg.on('pointerover', function() { retryBg.setFillStyle(0x1565c0); });
    retryBg.on('pointerout', function() { retryBg.setFillStyle(0x2196F3); });
    retryBg.on('pointerdown', function() {
      self.scene.start('GameScene', { countryId: self.countryId, continentId: self.continentId });
    });

    // Level select button
    var selectLabel = LANG === 'de' ? 'Levelauswahl' : 'Level Select';
    var selectBg = this.add.rectangle(480, 470, 240, 60, 0x555555).setInteractive();
    this.add.text(480, 470, selectLabel, { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' }).setOrigin(0.5);
    selectBg.on('pointerover', function() { selectBg.setFillStyle(0x333333); });
    selectBg.on('pointerout', function() { selectBg.setFillStyle(0x555555); });
    selectBg.on('pointerdown', function() {
      self.scene.start('LevelSelectScene', { continentId: self.continentId });
    });
  }
});
