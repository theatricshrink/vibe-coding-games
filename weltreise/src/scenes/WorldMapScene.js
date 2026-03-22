var WorldMapScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function WorldMapScene() {
    Phaser.Scene.call(this, { key: 'WorldMapScene' });
  },

  create: function() {
    var self = this;
    var progress = Progress.load();
    var unlockedIdx = Progress.CONTINENT_ORDER.indexOf(progress.unlockedContinent);

    var CONTINENTS = [
      { id: 'europe',   de: 'Europa',   en: 'Europe',   x: 490, y: 210, emoji: '🏰' },
      { id: 'africa',   de: 'Afrika',   en: 'Africa',   x: 500, y: 400, emoji: '🐘' },
      { id: 'asia',     de: 'Asien',    en: 'Asia',     x: 695, y: 200, emoji: '🗼' },
      { id: 'americas', de: 'Amerika',  en: 'Americas', x: 175, y: 290, emoji: '🦅' },
      { id: 'oceania',  de: 'Ozeanien', en: 'Oceania',  x: 800, y: 480, emoji: '🦘' }
    ];

    var nodeMap = {};
    CONTINENTS.forEach(function(c) { nodeMap[c.id] = c; });

    // Ocean background
    this.add.rectangle(480, 360, 960, 720, 0x1a6b9a);

    // Rough continent silhouettes
    var g = this.add.graphics();
    g.fillStyle(0x3d7a3d, 1);
    g.fillRoundedRect(80, 180, 210, 270, 28);   // Americas
    g.fillStyle(0x4a7c4a, 1);
    g.fillRoundedRect(385, 120, 220, 170, 20);  // Europe
    g.fillStyle(0xb8944a, 1);
    g.fillRoundedRect(390, 300, 210, 210, 20);  // Africa
    g.fillStyle(0x5a8a3a, 1);
    g.fillRoundedRect(560, 110, 290, 270, 22);  // Asia
    g.fillStyle(0x7a5a2a, 1);
    g.fillRoundedRect(725, 405, 170, 140, 20);  // Oceania

    // Path lines connecting continents in unlock order
    // Unlock order: europe→africa→asia→americas→oceania
    var pathOrder = ['europe', 'africa', 'asia', 'americas', 'oceania'];
    var pathG = this.add.graphics();
    for (var pi = 0; pi < pathOrder.length - 1; pi++) {
      var fromC = nodeMap[pathOrder[pi]];
      var toC   = nodeMap[pathOrder[pi + 1]];
      var traveled = (pi < unlockedIdx);
      pathG.lineStyle(5, traveled ? 0xffcc00 : 0xffffff, traveled ? 1.0 : 0.4);
      // Draw dashed line
      var dx = toC.x - fromC.x;
      var dy = toC.y - fromC.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var dashLen = 18, gapLen = 10, pos = 0;
      var drawing = true;
      while (pos < dist) {
        var segEnd = Math.min(pos + (drawing ? dashLen : gapLen), dist);
        if (drawing) {
          pathG.beginPath();
          pathG.moveTo(fromC.x + dx * (pos / dist), fromC.y + dy * (pos / dist));
          pathG.lineTo(fromC.x + dx * (segEnd / dist), fromC.y + dy * (segEnd / dist));
          pathG.strokePath();
        }
        pos = segEnd;
        drawing = !drawing;
      }
    }

    // Continent nodes
    CONTINENTS.forEach(function(continent) {
      var cIdx = Progress.CONTINENT_ORDER.indexOf(continent.id);
      var isUnlocked  = cIdx <= unlockedIdx;
      var isCompleted = cIdx < unlockedIdx;
      var isCurrent   = cIdx === unlockedIdx;

      var nodeColor = isCompleted ? 0xffcc00 : (isUnlocked ? 0x2196F3 : 0x444444);
      var ringColor = isUnlocked ? 0xffffff : 0x777777;
      var radius = isCurrent ? 34 : 28;

      var nodeG = self.add.graphics();
      nodeG.fillStyle(nodeColor, 1);
      nodeG.lineStyle(3, ringColor, 1);
      nodeG.fillCircle(continent.x, continent.y, radius);
      nodeG.strokeCircle(continent.x, continent.y, radius);

      // Emoji
      self.add.text(continent.x, continent.y, continent.emoji, {
        fontFamily: 'Arial', fontSize: '20px'
      }).setOrigin(0.5);

      // Name label
      var label = (LANG === 'de') ? continent.de : continent.en;
      if (!isUnlocked) label = '🔒 ' + label;
      self.add.text(continent.x, continent.y + radius + 14, label, {
        fontFamily: 'Arial', fontSize: '15px',
        color: isUnlocked ? '#ffffff' : '#888888',
        stroke: '#000000', strokeThickness: 3
      }).setOrigin(0.5);

      if (isUnlocked) {
        var continentId = continent.id;
        var zone = self.add.zone(continent.x, continent.y, 80, 80).setInteractive();
        zone.on('pointerover', function() {
          nodeG.clear();
          nodeG.fillStyle(0x42a5f5, 1);
          nodeG.lineStyle(4, 0xffff00, 1);
          nodeG.fillCircle(continent.x, continent.y, radius + 4);
          nodeG.strokeCircle(continent.x, continent.y, radius + 4);
        });
        zone.on('pointerout', function() {
          nodeG.clear();
          nodeG.fillStyle(nodeColor, 1);
          nodeG.lineStyle(3, ringColor, 1);
          nodeG.fillCircle(continent.x, continent.y, radius);
          nodeG.strokeCircle(continent.x, continent.y, radius);
        });
        zone.on('pointerdown', function() {
          self.scene.start('LevelSelectScene', { continentId: continentId });
        });
      }
    });

    // Flashing marker on current continent
    var cur = nodeMap[progress.unlockedContinent];
    var marker = this.add.text(cur.x, cur.y - 50, '▼', {
      fontFamily: 'Arial', fontSize: '22px', color: '#ffff00',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);
    this.tweens.add({ targets: marker, y: cur.y - 44, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    // Title
    var titleText = (LANG === 'de') ? 'Weltkarte' : 'World Map';
    this.add.text(480, 18, titleText, {
      fontFamily: 'Arial', fontSize: '26px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5, 0);

    // Back button — small red Mario button
    var backLabel = (LANG === 'de') ? '← Menü' : '← Menu';
    makeMarioBtn(self, 72, 26, backLabel,
      function() { self.scene.start('MenuScene'); },
      { w: 118, h: 34, fontSize: '14px', color: 0xcc1111 }
    );
  }
});
