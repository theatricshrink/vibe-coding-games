var LevelSelectScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function LevelSelectScene() {
    Phaser.Scene.call(this, { key: 'LevelSelectScene' });
  },

  init: function(data) {
    this.continentId = data.continentId;
  },

  create: function() {
    var self = this;

    // Get continent object from globals
    var continentMap = { europe: EUROPE, africa: AFRICA, asia: ASIA, americas: AMERICAS, oceania: OCEANIA };
    var continent = continentMap[this.continentId];

    // Load progress
    var progress = Progress.load();

    // Dark background
    this.add.rectangle(480, 360, 960, 720, 0x0d1b2a);

    // Title
    var titleText = continent.name[LANG];
    this.add.text(480, 60, titleText, {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Back button
    var backLabel = (LANG === 'de') ? '← Weltkarte' : '← World Map';
    var backBg = this.add.rectangle(80, 40, 140, 36, 0x2196F3).setInteractive();
    var backText = this.add.text(80, 40, backLabel, {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    backBg.on('pointerdown', function() { self.scene.start('WorldMapScene'); });
    backText.on('pointerdown', function() { self.scene.start('WorldMapScene'); });

    // Render country buttons
    var countries = continent.countries;
    var startY = 160;
    var step = 100;

    countries.forEach(function(country, i) {
      var y = startY + i * step;
      var isFirst = i === 0;
      var prevComplete = isFirst || Progress.isLevelComplete(countries[i - 1].id);
      var isUnlocked = prevComplete;
      var isCompleted = Progress.isLevelComplete(country.id);

      var label = country.name[LANG];
      if (isCompleted) label += ' \u2605';
      if (!isUnlocked) label += ' \uD83D\uDD12';

      var color = isUnlocked ? 0x2196F3 : 0x555555;
      var textColor = isUnlocked ? '#ffffff' : '#888888';

      var btn = self.add.rectangle(480, y, 300, 50, color);
      var txt = self.add.text(480, y, label, {
        fontFamily: 'Arial',
        fontSize: '22px',
        color: textColor
      }).setOrigin(0.5);

      if (isUnlocked) {
        btn.setInteractive();
        txt.setInteractive();
        var countryId = country.id;
        var continentId = self.continentId;
        btn.on('pointerover', function() { btn.setFillStyle(0x1565c0); });
        btn.on('pointerout', function() { btn.setFillStyle(0x2196F3); });
        btn.on('pointerdown', function() { self.scene.start('GameScene', { countryId: countryId, continentId: continentId }); });
        txt.on('pointerover', function() { btn.setFillStyle(0x1565c0); });
        txt.on('pointerout', function() { btn.setFillStyle(0x2196F3); });
        txt.on('pointerdown', function() { self.scene.start('GameScene', { countryId: countryId, continentId: continentId }); });
      }
    });
  }
});
