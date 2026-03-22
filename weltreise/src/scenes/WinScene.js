var WinScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function WinScene() {
    Phaser.Scene.call(this, { key: 'WinScene' });
  },
  init: function(data) {
    this.countryId = data.countryId;
    this.continentId = data.continentId;
  },
  create: function() {
    var self = this;
    // Find country name from globals
    var continentMap = { europe: EUROPE, africa: AFRICA, asia: ASIA, americas: AMERICAS, oceania: OCEANIA };
    var continent = continentMap[this.continentId];
    var countryName = this.countryId; // fallback
    if (continent) {
      for (var i = 0; i < continent.countries.length; i++) {
        if (continent.countries[i].id === this.countryId) {
          countryName = continent.countries[i].name[LANG];
          break;
        }
      }
    }

    // Dark background
    this.add.rectangle(480, 360, 960, 720, 0x0d1b2a);

    // "Level Complete" text
    var title = LANG === 'de' ? 'Level geschafft!' : 'Level Complete!';
    this.add.text(480, 160, title, {
      fontFamily: 'Arial', fontSize: '56px', color: '#ffcc00'
    }).setOrigin(0.5);

    // Country name
    this.add.text(480, 260, countryName, {
      fontFamily: 'Arial', fontSize: '36px', color: '#ffffff'
    }).setOrigin(0.5);

    // 5 stars
    this.add.text(480, 340, '★★★★★', {
      fontFamily: 'Arial', fontSize: '48px', color: '#ffcc00'
    }).setOrigin(0.5);

    // Continue button
    var continueLabel = LANG === 'de' ? 'Weiter' : 'Continue';
    var contBg = this.add.rectangle(480, 460, 240, 60, 0x2196F3).setInteractive();
    this.add.text(480, 460, continueLabel, { fontFamily: 'Arial', fontSize: '28px', color: '#ffffff' }).setOrigin(0.5);
    contBg.on('pointerover', function() { contBg.setFillStyle(0x1565c0); });
    contBg.on('pointerout', function() { contBg.setFillStyle(0x2196F3); });
    contBg.on('pointerdown', function() {
      self.scene.start('LevelSelectScene', { continentId: self.continentId });
    });
  }
});
