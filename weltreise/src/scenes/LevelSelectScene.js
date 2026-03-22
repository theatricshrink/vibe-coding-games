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
    var continentMap = { europe: EUROPE, africa: AFRICA, asia: ASIA, americas: AMERICAS, oceania: OCEANIA };
    var continent = continentMap[this.continentId];
    var countries = continent.countries;
    var n = countries.length;
    var progress = Progress.load();

    // Background colour per continent
    var bgColors = { europe: 0x1a3a6e, africa: 0x6b3a1a, asia: 0x1a5a2a, americas: 0x3a1a6e, oceania: 0x1a4a5a };
    var bgColor = bgColors[this.continentId] || 0x1a1a2e;
    this.add.rectangle(480, 360, 960, 720, bgColor);

    // Continent title
    this.add.text(480, 40, continent.name[LANG], {
      fontFamily: 'Arial', fontSize: '38px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5);

    // Back button — small red Mario button
    var backLabel = (LANG === 'de') ? '← Karte' : '← Map';
    makeMarioBtn(self, 72, 26, backLabel,
      function() { self.scene.start('WorldMapScene'); },
      { w: 118, h: 34, fontSize: '14px', color: 0xcc1111 }
    );

    // Node positions: distribute evenly across the width
    var margin = 120;
    var nodeY = 360;
    var nodeXList = [];
    for (var i = 0; i < n; i++) {
      nodeXList.push(n === 1 ? 480 : margin + i * ((960 - 2 * margin) / (n - 1)));
    }

    // Draw path line between nodes
    var pathG = this.add.graphics();
    for (var pi = 0; pi < n - 1; pi++) {
      var isDone = Progress.isLevelComplete(countries[pi].id);
      pathG.lineStyle(6, isDone ? 0xffcc00 : 0xffffff, isDone ? 1.0 : 0.35);
      pathG.beginPath();
      pathG.moveTo(nodeXList[pi], nodeY);
      pathG.lineTo(nodeXList[pi + 1], nodeY);
      pathG.strokePath();
    }

    // Draw country nodes
    countries.forEach(function(country, i) {
      var isFirst   = i === 0;
      var prevDone  = i > 0 && Progress.isLevelComplete(countries[i - 1].id);
      var isUnlocked = isFirst || prevDone;
      var isComplete = Progress.isLevelComplete(country.id);

      var x = nodeXList[i];
      var nodeColor = isComplete ? 0xffcc00 : (isUnlocked ? 0x2196F3 : 0x444444);
      var ringColor = isUnlocked ? 0xffffff : 0x777777;

      var nodeG = self.add.graphics();
      nodeG.fillStyle(nodeColor, 1);
      nodeG.lineStyle(3, ringColor, 1);
      nodeG.fillCircle(x, nodeY, 36);
      nodeG.strokeCircle(x, nodeY, 36);

      // Star or number in node
      var nodeLabel = isComplete ? '★' : (i + 1).toString();
      self.add.text(x, nodeY, nodeLabel, {
        fontFamily: 'Arial', fontSize: isComplete ? '28px' : '22px',
        color: isComplete ? '#ffffff' : '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Country name below node
      self.add.text(x, nodeY + 48, country.name[LANG], {
        fontFamily: 'Arial', fontSize: '14px',
        color: isUnlocked ? '#ffffff' : '#888888',
        stroke: '#000000', strokeThickness: 3,
        wordWrap: { width: 110 }, align: 'center'
      }).setOrigin(0.5, 0);

      if (isUnlocked) {
        var countryId = country.id;
        var continentId = self.continentId;
        var zone = self.add.zone(x, nodeY, 80, 80).setInteractive();
        zone.on('pointerover', function() {
          nodeG.clear();
          nodeG.fillStyle(0x42a5f5, 1);
          nodeG.lineStyle(4, 0xffff00, 1);
          nodeG.fillCircle(x, nodeY, 40);
          nodeG.strokeCircle(x, nodeY, 40);
        });
        zone.on('pointerout', function() {
          nodeG.clear();
          nodeG.fillStyle(nodeColor, 1);
          nodeG.lineStyle(3, ringColor, 1);
          nodeG.fillCircle(x, nodeY, 36);
          nodeG.strokeCircle(x, nodeY, 36);
        });
        zone.on('pointerdown', function() {
          self.scene.start('GameScene', { countryId: countryId, continentId: continentId });
        });
      }
    });

    // Instruction text
    var hint = (LANG === 'de') ? 'Wähle ein Land!' : 'Choose a country!';
    this.add.text(480, 560, hint, {
      fontFamily: 'Arial', fontSize: '20px', color: '#aaaaaa'
    }).setOrigin(0.5);
  }
});
