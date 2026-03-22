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
      { id: 'europe',   de: 'Europa',   en: 'Europe',   x: 430, y: 158 },
      { id: 'americas', de: 'Amerika',  en: 'Americas', x: 152, y: 298 },
      { id: 'africa',   de: 'Afrika',   en: 'Africa',   x: 448, y: 352 },
      { id: 'asia',     de: 'Asien',    en: 'Asia',     x: 672, y: 202 },
      { id: 'oceania',  de: 'Ozeanien', en: 'Oceania',  x: 778, y: 462 }
    ];

    var nodeMap = {};
    CONTINENTS.forEach(function(c) { nodeMap[c.id] = c; });

    // ── Ocean ─────────────────────────────────────────────────────────────
    this.add.rectangle(480, 360, 960, 720, 0x4a90c8);

    // ── Continents with 3D cliff effect ───────────────────────────────────
    var g = this.add.graphics();

    function drawContinent(cliffColor, topColor, pts) {
      var cliff = pts.map(function(p) { return { x: p.x, y: p.y + 8 }; });
      g.fillStyle(cliffColor, 1);
      g.fillPoints(cliff, true);
      g.fillStyle(topColor, 1);
      g.fillPoints(pts, true);
    }

    // Americas (North + South combined, green)
    drawContinent(0x6b4e1e, 0x52a028, [
      { x:  46, y: 162 }, { x:  82, y: 128 }, { x: 138, y: 114 },
      { x: 198, y: 108 }, { x: 236, y: 138 }, { x: 248, y: 182 },
      { x: 235, y: 232 }, { x: 208, y: 268 }, { x: 196, y: 302 },
      { x: 212, y: 332 }, { x: 208, y: 358 },
      { x: 195, y: 368 }, { x: 228, y: 390 }, { x: 248, y: 422 },
      { x: 246, y: 482 }, { x: 218, y: 542 }, { x: 174, y: 556 },
      { x: 132, y: 542 }, { x: 106, y: 502 }, { x:  98, y: 452 },
      { x: 112, y: 402 }, { x: 108, y: 382 },
      { x: 155, y: 368 }, { x: 150, y: 342 },
      { x: 118, y: 312 }, { x:  92, y: 272 },
      { x:  62, y: 242 }, { x:  40, y: 208 }
    ]);

    // Europe (green)
    drawContinent(0x6b4e1e, 0x52a028, [
      { x: 362, y:  98 }, { x: 418, y:  88 }, { x: 476, y:  98 },
      { x: 504, y: 124 }, { x: 508, y: 158 }, { x: 492, y: 188 },
      { x: 462, y: 208 }, { x: 425, y: 216 }, { x: 392, y: 206 },
      { x: 366, y: 180 }, { x: 352, y: 148 }, { x: 356, y: 118 }
    ]);

    // Africa (sandy/tan)
    drawContinent(0x9a7818, 0xc8a438, [
      { x: 358, y: 218 }, { x: 428, y: 204 }, { x: 508, y: 208 },
      { x: 544, y: 244 }, { x: 548, y: 312 }, { x: 538, y: 378 },
      { x: 518, y: 432 }, { x: 492, y: 472 }, { x: 450, y: 490 },
      { x: 412, y: 478 }, { x: 382, y: 446 }, { x: 354, y: 396 },
      { x: 342, y: 328 }, { x: 346, y: 262 }
    ]);

    // Asia (green)
    drawContinent(0x6b4e1e, 0x52a028, [
      { x: 492, y:  78 }, { x: 582, y:  68 }, { x: 684, y:  62 },
      { x: 782, y:  72 }, { x: 852, y: 104 }, { x: 872, y: 152 },
      { x: 862, y: 212 }, { x: 832, y: 262 }, { x: 792, y: 298 },
      { x: 742, y: 318 }, { x: 682, y: 328 }, { x: 622, y: 312 },
      { x: 564, y: 290 }, { x: 528, y: 258 }, { x: 508, y: 212 },
      { x: 504, y: 162 }, { x: 512, y: 118 }
    ]);

    // Oceania / Australia (outback orange-red)
    drawContinent(0x9a4a18, 0xd4783a, [
      { x: 694, y: 398 }, { x: 774, y: 388 }, { x: 842, y: 398 },
      { x: 868, y: 430 }, { x: 862, y: 492 }, { x: 826, y: 532 },
      { x: 774, y: 542 }, { x: 722, y: 526 }, { x: 692, y: 488 },
      { x: 686, y: 442 }
    ]);

    // New Zealand (small green island)
    g.fillStyle(0x5a4818, 1);
    g.fillEllipse(888, 514, 38, 24);
    g.fillStyle(0x52a028, 1);
    g.fillEllipse(888, 510, 32, 20);

    // ── Decorative trees ──────────────────────────────────────────────────
    var tg = this.add.graphics();
    tg.fillStyle(0x2a7010, 1);
    [[88,178],[158,148],[212,202],[126,452],[180,490]].forEach(function(p) { tg.fillCircle(p[0],p[1],7); });
    [[392,138],[448,118],[478,158]].forEach(function(p) { tg.fillCircle(p[0],p[1],6); });
    [[548,128],[642,108],[752,148],[808,190],[688,278]].forEach(function(p) { tg.fillCircle(p[0],p[1],7); });
    tg.fillStyle(0xa88828, 1);
    [[428,290],[488,322],[412,358]].forEach(function(p) { tg.fillCircle(p[0],p[1],5); });

    // ── Clouds ────────────────────────────────────────────────────────────
    var clg = this.add.graphics();
    clg.fillStyle(0xffffff, 0.88);
    [[305,138,52,20],[282,130,34,15],[596,445,48,18],[572,438,30,13],
     [74,432,42,16],[54,425,26,12],[574,92,44,16],[554,84,28,12],
     [898,340,40,15],[878,332,25,11]].forEach(function(c) {
      clg.fillEllipse(c[0],c[1],c[2],c[3]);
    });

    // ── Dotted paths ──────────────────────────────────────────────────────
    var pathOrder = ['europe', 'americas', 'africa', 'asia', 'oceania'];
    var pathG = this.add.graphics();

    for (var pi = 0; pi < pathOrder.length - 1; pi++) {
      var fromC = nodeMap[pathOrder[pi]];
      var toC   = nodeMap[pathOrder[pi + 1]];
      var traveled = (pi < unlockedIdx);
      var pdx = toC.x - fromC.x;
      var pdy = toC.y - fromC.y;
      var dist = Math.sqrt(pdx * pdx + pdy * pdy);
      var dotColor = traveled ? 0xffdd00 : 0xf0e090;
      var dotAlpha = traveled ? 1.0 : 0.75;
      var dotCount = Math.floor(dist / 13);
      for (var di = 1; di < dotCount; di++) {
        var t = di / dotCount;
        pathG.fillStyle(dotColor, dotAlpha);
        pathG.fillCircle(fromC.x + pdx * t, fromC.y + pdy * t, 3);
      }
    }

    // ── Continent nodes ────────────────────────────────────────────────────
    var nodeGMap = {};

    CONTINENTS.forEach(function(continent) {
      var cIdx       = Progress.CONTINENT_ORDER.indexOf(continent.id);
      var isUnlocked = cIdx <= unlockedIdx;
      var isCompleted= cIdx < unlockedIdx;
      var isCurrent  = cIdx === unlockedIdx;

      var nodeColor = isCompleted ? 0xffdd44 : (isUnlocked ? 0xe8a000 : 0x777777);
      var ringColor = isUnlocked  ? 0xffffff : 0x555555;
      var radius    = isCurrent ? 22 : 18;

      var nodeG = self.add.graphics();
      nodeGMap[continent.id] = nodeG;

      function drawNode() {
        nodeG.clear();
        nodeG.fillStyle(0x1a0c00, 1);
        nodeG.fillCircle(continent.x, continent.y, radius + 3);
        nodeG.fillStyle(ringColor, 1);
        nodeG.fillCircle(continent.x, continent.y, radius + 1);
        nodeG.fillStyle(nodeColor, 1);
        nodeG.fillCircle(continent.x, continent.y, radius);
      }
      drawNode();

      self.add.text(continent.x, continent.y, '★', {
        fontFamily: 'Arial', fontSize: isCurrent ? '20px' : '16px',
        color: isUnlocked ? '#ffffff' : '#444444'
      }).setOrigin(0.5);

      if (isCurrent) {
        self.tweens.add({
          targets: nodeG, scaleX: 1.12, scaleY: 1.12,
          duration: 820, ease: 'Sine.easeInOut', yoyo: true, repeat: -1
        });
      }

      var label = (LANG === 'de') ? continent.de : continent.en;
      if (!isUnlocked) label = '🔒 ' + label;
      self.add.text(continent.x, continent.y + radius + 12, label, {
        fontFamily: 'Arial', fontSize: '14px',
        color: isUnlocked ? '#ffffff' : '#888888',
        stroke: '#000000', strokeThickness: 3
      }).setOrigin(0.5);

      if (isUnlocked) {
        var continentId = continent.id;
        var zone = self.add.zone(continent.x, continent.y, (radius + 4) * 2, (radius + 4) * 2).setInteractive();
        zone.on('pointerover', function() {
          nodeG.clear();
          nodeG.fillStyle(0x1a0c00, 1);
          nodeG.fillCircle(continent.x, continent.y, radius + 5);
          nodeG.fillStyle(0xffffff, 1);
          nodeG.fillCircle(continent.x, continent.y, radius + 3);
          nodeG.fillStyle(0xffee44, 1);
          nodeG.fillCircle(continent.x, continent.y, radius + 1);
        });
        zone.on('pointerout', function() { drawNode(); });
        zone.on('pointerdown', function() {
          self.scene.start('LevelSelectScene', { continentId: continentId });
        });
      }
    });

    // ── Flashing ▼ marker ─────────────────────────────────────────────────
    var cur = nodeMap[progress.unlockedContinent];
    var marker = this.add.text(cur.x, cur.y - 42, '▼', {
      fontFamily: 'Arial', fontSize: '18px', color: '#ffff00',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);
    this.tweens.add({ targets: marker, y: cur.y - 37, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    // ── Title ─────────────────────────────────────────────────────────────
    var titleText = (LANG === 'de') ? 'Weltkarte' : 'World Map';
    this.add.text(480, 14, titleText, {
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
        var ring = self.add.graphics();
        ring.setPosition(newC.x, newC.y);
        ring.fillStyle(0xffffff, 0.85);
        ring.fillCircle(0, 0, 28);
        self.tweens.add({ targets: ring, scaleX: 2.5, scaleY: 2.5, alpha: 0, duration: 500, ease: 'Power2' });

        var newNodeG = nodeGMap[self.unlockAnimContinent];
        if (newNodeG) {
          self.tweens.add({ targets: newNodeG, scaleX: 1.5, scaleY: 1.5, duration: 300, ease: 'Sine.easeOut', yoyo: true });
        }

        for (var si = 0; si < 8; si++) {
          var angle = si * Math.PI / 4;
          var star = self.add.text(newC.x, newC.y, '★', {
            fontFamily: 'Arial', fontSize: '18px', color: '#ffcc00'
          }).setOrigin(0.5);
          self.tweens.add({
            targets: star,
            x: newC.x + Math.cos(angle) * 72,
            y: newC.y + Math.sin(angle) * 72,
            alpha: 0, duration: 700, ease: 'Power2'
          });
        }

        if (newContData) {
          var bannerText = (LANG === 'de')
            ? (newContData.de + ' freigeschaltet!')
            : (newContData.en + ' unlocked!');
          var banner = self.add.text(newC.x, newC.y + 48, bannerText, {
            fontFamily: 'Arial Black, Arial', fontSize: '22px', fontStyle: 'bold',
            color: '#ffcc00', stroke: '#000000', strokeThickness: 4
          }).setOrigin(0.5).setAlpha(0);
          self.tweens.add({
            targets: banner, y: newC.y + 22, alpha: 1, duration: 400,
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
