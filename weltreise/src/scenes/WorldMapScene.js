var WorldMapScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function WorldMapScene() {
    Phaser.Scene.call(this, { key: 'WorldMapScene' });
  },

  create: function() {
    var self = this;

    // Dark background
    this.add.rectangle(480, 360, 960, 720, 0x0d1b2a);

    // Title
    var titleText = (LANG === 'de') ? 'Weltkarte' : 'World Map';
    this.add.text(480, 60, titleText, {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Back button
    var backLabel = (LANG === 'de') ? '← Menü' : '← Menu';
    var backBg = this.add.rectangle(80, 40, 120, 36, 0x2196F3).setInteractive();
    var backText = this.add.text(80, 40, backLabel, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    backBg.on('pointerdown', function() { self.scene.start('MenuScene'); });
    backText.on('pointerdown', function() { self.scene.start('MenuScene'); });

    // Load progress
    var progress = Progress.load();

    // Continent data
    var continents = [
      { id: 'europe',   de: 'Europa',    en: 'Europe'   },
      { id: 'africa',   de: 'Afrika',    en: 'Africa'   },
      { id: 'asia',     de: 'Asien',     en: 'Asia'     },
      { id: 'americas', de: 'Amerika',   en: 'Americas' },
      { id: 'oceania',  de: 'Ozeanien',  en: 'Oceania'  }
    ];

    var yPositions = [180, 270, 360, 450, 540];
    var unlockedIdx = Progress.CONTINENT_ORDER.indexOf(progress.unlockedContinent);

    continents.forEach(function(continent, i) {
      var y = yPositions[i];
      var continentIdx = Progress.CONTINENT_ORDER.indexOf(continent.id);
      var isUnlocked = continentIdx <= unlockedIdx;

      var label = (LANG === 'de') ? continent.de : continent.en;
      if (!isUnlocked) label = '🔒 ' + label;

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
        var continentId = continent.id;
        btn.on('pointerover', function() { btn.setFillStyle(0x1565c0); });
        btn.on('pointerout', function() { btn.setFillStyle(0x2196F3); });
        btn.on('pointerdown', function() { self.scene.start('LevelSelectScene', { continentId: continentId }); });
        txt.on('pointerover', function() { btn.setFillStyle(0x1565c0); });
        txt.on('pointerout', function() { btn.setFillStyle(0x2196F3); });
        txt.on('pointerdown', function() { self.scene.start('LevelSelectScene', { continentId: continentId }); });
      }
    });
  }
});
