var WorldMapScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function WorldMapScene() {
    Phaser.Scene.call(this, { key: 'WorldMapScene' });
  },

  init: function(data) {
    this.unlockAnimContinent = (data && data.unlockAnim) ? data.unlockAnim : null;
  },

  create: function() {
    var self = this;
    var progress = Progress.load();
    var unlockedIdx = Progress.CONTINENT_ORDER.indexOf(progress.unlockedContinent);

    var CONTINENTS = [
      { id: 'europe',   de: 'Europa',   en: 'Europe',   x: 490, y: 210 },
      { id: 'americas', de: 'Amerika',  en: 'Americas', x: 175, y: 290 },
      { id: 'africa',   de: 'Afrika',   en: 'Africa',   x: 500, y: 400 },
      { id: 'asia',     de: 'Asien',    en: 'Asia',     x: 695, y: 200 },
      { id: 'oceania',  de: 'Ozeanien', en: 'Oceania',  x: 800, y: 480 }
    ];

    var nodeMap = {};
    CONTINENTS.forEach(function(c) { nodeMap[c.id] = c; });

    // ── Ocean background ──────────────────────────────────────────────────
    this.add.rectangle(480, 360, 960, 720, 0x1a7fa8);
    var waveG = this.add.graphics();
    waveG.fillStyle(0x2090bb, 0.4);
    for (var wi = 0; wi < 7; wi++) {
      waveG.fillRect(0, 80 + wi * 88, 960, 4);
    }

    // ── Continent terrain blobs ───────────────────────────────────────────
    var bg = this.add.graphics();

    function drawBlob(borderColor, fillColor, rects) {
      bg.fillStyle(borderColor, 1);
      rects.forEach(function(r) { bg.fillRoundedRect(r[0] - 3, r[1] - 3, r[2] + 6, r[3] + 6, r[4] + 2); });
      bg.fillStyle(fillColor, 1);
      rects.forEach(function(r) { bg.fillRoundedRect(r[0], r[1], r[2], r[3], r[4]); });
    }

    // Europe
    drawBlob(0x3a6e1a, 0x5a9e3a, [
      [385, 130, 210, 150, 20],
      [365, 190, 100, 80,  16]
    ]);
    // Americas
    drawBlob(0x1d5a1d, 0x3d7a3d, [
      [85,  190, 180, 220, 24],
      [115, 370, 130, 80,  18]
    ]);
    // Africa
    drawBlob(0xa8721a, 0xc8923a, [
      [395, 310, 200, 195, 22],
      [430, 465, 100, 55,  16]
    ]);
    // Asia
    drawBlob(0x5a7e1a, 0x7a9e3a, [
      [565, 120, 270, 240, 22],
      [590, 90,  180, 70,  16]
    ]);
    // Oceania
    drawBlob(0xa8801a, 0xc8a03a, [
      [728, 412, 165, 120, 18],
      [752, 540, 80,  38,  12]
    ]);

    // ── Decorations ───────────────────────────────────────────────────────
    var dg = this.add.graphics();

    // Europe: 2 castle towers
    [[430, 200], [520, 195]].forEach(function(pos) {
      dg.fillStyle(0x8888aa, 1);
      dg.fillRect(pos[0] - 5, pos[1], 10, 16);
      dg.fillStyle(0x6666aa, 1);
      dg.fillTriangle(pos[0] - 7, pos[1], pos[0] + 7, pos[1], pos[0], pos[1] - 8);
    });

    // Americas: 2 pine trees
    [[130, 320], [222, 338]].forEach(function(pos) {
      dg.fillStyle(0x2a6a18, 1);
      dg.fillTriangle(pos[0] - 9,  pos[1],      pos[0] + 9,  pos[1],      pos[0], pos[1] - 18);
      dg.fillTriangle(pos[0] - 6,  pos[1] - 10, pos[0] + 6,  pos[1] - 10, pos[0], pos[1] - 24);
    });

    // Africa: 2 acacia trees
    [[442, 395], [558, 408]].forEach(function(pos) {
      dg.fillStyle(0x6a4018, 1);
      dg.fillRect(pos[0] - 3, pos[1] - 16, 6, 16);
      dg.fillStyle(0x4a7018, 1);
      dg.fillEllipse(pos[0], pos[1] - 20, 32, 10);
    });

    // Asia: pagoda
    var pgx = 680, pgy = 228;
    dg.fillStyle(0xcc4422, 1);
    dg.fillRect(pgx - 12, pgy,       24, 8);
    dg.fillRect(pgx - 8,  pgy - 8,   16, 8);
    dg.fillRect(pgx - 5,  pgy - 16,  10, 8);
    dg.fillTriangle(pgx - 6, pgy - 16, pgx + 6, pgy - 16, pgx, pgy - 24);

    // Oceania: palm tree
    var palmX = 778, palmY = 458;
    dg.fillStyle(0x8a5820, 1);
    dg.fillRect(palmX - 3, palmY - 30, 5, 30);
    dg.fillStyle(0x2a8a18, 1);
    dg.fillEllipse(palmX - 16, palmY - 32, 28, 8);
    dg.fillEllipse(palmX + 14, palmY - 28, 28, 8);
    dg.fillEllipse(palmX,      palmY - 36, 24, 8);

    // ── Double-track paths ────────────────────────────────────────────────
    var pathOrder = ['europe', 'americas', 'africa', 'asia', 'oceania'];
    var pathG = this.add.graphics();

    for (var pi = 0; pi < pathOrder.length - 1; pi++) {
      var fromC = nodeMap[pathOrder[pi]];
      var toC   = nodeMap[pathOrder[pi + 1]];
      var traveled = (pi < unlockedIdx);

      var pdx = toC.x - fromC.x;
      var pdy = toC.y - fromC.y;
      var dist = Math.sqrt(pdx * pdx + pdy * pdy);
      var perpX = (-pdy / dist) * 4;
      var perpY = ( pdx / dist) * 4;

      var railColor  = traveled ? 0xffcc00 : 0x888888;
      var railAlpha  = traveled ? 1.0 : 0.5;
      var crossColor = traveled ? 0xe8a000 : 0x888888;

      // Rail 1
      pathG.lineStyle(2, railColor, railAlpha);
      pathG.beginPath();
      pathG.moveTo(fromC.x + perpX, fromC.y + perpY);
      pathG.lineTo(toC.x   + perpX, toC.y   + perpY);
      pathG.strokePath();

      // Rail 2
      pathG.beginPath();
      pathG.moveTo(fromC.x - perpX, fromC.y - perpY);
      pathG.lineTo(toC.x   - perpX, toC.y   - perpY);
      pathG.strokePath();

      // Crossbars every 20px
      var steps = Math.floor(dist / 20);
      for (var si = 1; si < steps; si++) {
        var t = (si * 20) / dist;
        var cx = fromC.x + pdx * t;
        var cy = fromC.y + pdy * t;
        pathG.lineStyle(2, crossColor, railAlpha);
        pathG.beginPath();
        pathG.moveTo(cx + perpX, cy + perpY);
        pathG.lineTo(cx - perpX, cy - perpY);
        pathG.strokePath();
      }
    }

    // ── Continent nodes (coin style) ──────────────────────────────────────
    var nodeGMap = {};

    CONTINENTS.forEach(function(continent) {
      var cIdx       = Progress.CONTINENT_ORDER.indexOf(continent.id);
      var isUnlocked = cIdx <= unlockedIdx;
      var isCompleted= cIdx < unlockedIdx;
      var isCurrent  = cIdx === unlockedIdx;

      var nodeColor = isCompleted ? 0xffdd44 : (isUnlocked ? 0xe8a000 : 0x444444);
      var ringColor = isUnlocked  ? 0xffcc00 : 0x777777;
      var radius    = isCurrent   ? 34 : 28;

      var nodeG = self.add.graphics();
      nodeGMap[continent.id] = nodeG;

      function drawNode(rExtra) {
        var r = rExtra || 0;
        nodeG.clear();
        nodeG.fillStyle(ringColor, 1);
        nodeG.fillCircle(continent.x, continent.y, radius + 4 + r);
        nodeG.fillStyle(nodeColor, 1);
        nodeG.fillCircle(continent.x, continent.y, radius + r);
      }
      drawNode(0);

      // Star inside completed nodes
      if (isCompleted) {
        self.add.text(continent.x, continent.y, '★', {
          fontFamily: 'Arial', fontSize: '18px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);
      }

      // Pulse tween for current continent node
      if (isCurrent) {
        self.tweens.add({
          targets: nodeG,
          scaleX: 1.08, scaleY: 1.08,
          duration: 900,
          ease: 'Sine.easeInOut',
          yoyo: true,
          repeat: -1
        });
      }

      // Name label below node
      var label = (LANG === 'de') ? continent.de : continent.en;
      if (!isUnlocked) label = '🔒 ' + label;
      self.add.text(continent.x, continent.y + radius + 14, label, {
        fontFamily: 'Arial', fontSize: '15px',
        color: isUnlocked ? '#ffffff' : '#888888',
        stroke: '#000000', strokeThickness: 3
      }).setOrigin(0.5);

      // Hover / click zones for unlocked continents
      if (isUnlocked) {
        var continentId = continent.id;
        var zone = self.add.zone(continent.x, continent.y, (radius + 4) * 2, (radius + 4) * 2).setInteractive();
        zone.on('pointerover', function() {
          nodeG.clear();
          nodeG.fillStyle(0xffcc00, 1);
          nodeG.fillCircle(continent.x, continent.y, radius + 8);
          nodeG.fillStyle(0xffd740, 1);
          nodeG.fillCircle(continent.x, continent.y, radius + 2);
        });
        zone.on('pointerout', function() { drawNode(0); });
        zone.on('pointerdown', function() {
          self.scene.start('LevelSelectScene', { continentId: continentId });
        });
      }
    });

    // ── Flashing ▼ marker on current continent ────────────────────────────
    var cur = nodeMap[progress.unlockedContinent];
    var marker = this.add.text(cur.x, cur.y - 52, '▼', {
      fontFamily: 'Arial', fontSize: '22px', color: '#ffff00',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);
    this.tweens.add({ targets: marker, y: cur.y - 46, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    // ── Title ─────────────────────────────────────────────────────────────
    var titleText = (LANG === 'de') ? 'Weltkarte' : 'World Map';
    this.add.text(480, 18, titleText, {
      fontFamily: 'Arial', fontSize: '26px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5, 0);

    // ── Back button ───────────────────────────────────────────────────────
    var backLabel = (LANG === 'de') ? '← Menü' : '← Menu';
    makeMarioBtn(self, 72, 26, backLabel,
      function() { self.scene.start('MenuScene'); },
      { w: 118, h: 34, fontSize: '14px', color: 0xcc1111 }
    );

    // ── Unlock animation ──────────────────────────────────────────────────
    if (this.unlockAnimContinent) {
      var newC = nodeMap[this.unlockAnimContinent];
      var newContData = null;
      for (var ci = 0; ci < CONTINENTS.length; ci++) {
        if (CONTINENTS[ci].id === self.unlockAnimContinent) { newContData = CONTINENTS[ci]; break; }
      }

      self.time.delayedCall(600, function() {

        // 1. Flash ring (expands from node centre)
        var ring = self.add.graphics();
        ring.setPosition(newC.x, newC.y);
        ring.fillStyle(0xffffff, 0.8);
        ring.fillCircle(0, 0, 36);
        self.tweens.add({ targets: ring, scaleX: 2.5, scaleY: 2.5, alpha: 0, duration: 500, ease: 'Power2' });

        // 2. Pop tween on the new continent's node graphics
        var newNodeG = nodeGMap[self.unlockAnimContinent];
        if (newNodeG) {
          self.tweens.add({
            targets: newNodeG,
            scaleX: 1.5, scaleY: 1.5,
            duration: 300,
            ease: 'Sine.easeOut',
            yoyo: true
          });
        }

        // 3. Star burst (8 directions)
        for (var si = 0; si < 8; si++) {
          var angle = si * Math.PI / 4;
          var star = self.add.text(newC.x, newC.y, '★', {
            fontFamily: 'Arial', fontSize: '20px', color: '#ffcc00'
          }).setOrigin(0.5);
          self.tweens.add({
            targets: star,
            x: newC.x + Math.cos(angle) * 80,
            y: newC.y + Math.sin(angle) * 80,
            alpha: 0,
            duration: 700,
            ease: 'Power2'
          });
        }

        // 4. Banner text
        if (newContData) {
          var bannerText = (LANG === 'de')
            ? (newContData.de + ' freigeschaltet!')
            : (newContData.en + ' unlocked!');
          var banner = self.add.text(newC.x, newC.y + 50, bannerText, {
            fontFamily: 'Arial Black, Arial', fontSize: '24px', fontStyle: 'bold',
            color: '#ffcc00', stroke: '#000000', strokeThickness: 4
          }).setOrigin(0.5).setAlpha(0);
          self.tweens.add({
            targets: banner,
            y: newC.y + 20,
            alpha: 1,
            duration: 400,
            onComplete: function() {
              self.time.delayedCall(2000, function() {
                self.tweens.add({ targets: banner, alpha: 0, duration: 400 });
              });
            }
          });
        }
      });
    }
  }
});
