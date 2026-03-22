var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'GameScene' });
  },

  init: function(data) {
    this.countryId = data.countryId;
    this.continentId = data.continentId;
  },

  preload: function() {
    this.load.image(this.countryId + '_bg', 'assets/backgrounds/' + this.countryId + '.png');
    // Try loading real enemy sprite — silently ignored if PNG not present yet
    this.load.image(this.countryId + '_enemy', 'assets/sprites/enemies/' + this.countryId + '_enemy.png');

    // Handle missing assets silently
    this.load.on('loaderror', function(file) {
      console.warn('Asset not found (ok): ' + file.key);
    });
  },

  create: function() {
    var self = this;

    // Generate solid-color textures for all placeholders
    // (more reliable than '__DEFAULT' + setTint + setDisplaySize)
    function makeTex(key, color, w, h) {
      if (self.textures.exists(key)) return;
      var g = self.make.graphics({ add: false });
      g.fillStyle(color, 1);
      g.fillRect(0, 0, w, h);
      g.generateTexture(key, w, h);
      g.destroy();
    }
    makeTex('plat_tex', 0x5a3e1a, 200, 20);

    // Mario-style plumber — small (32x48) and big (32x64)
    function makePlumber(key, H) {
      if (self.textures.exists(key)) return;
      var g = self.make.graphics({ add: false });
      var bodyH = (H === 64) ? 18 : 12;
      var legY  = (H === 64) ? 44 : 38;
      var shoeY = (H === 64) ? 54 : 42;
      var shoeH = (H === 64) ? 10 : 6;
      var armH  = (H === 64) ? 20 : 14;
      // Red cap
      g.fillStyle(0xcc1111, 1);
      g.fillRect(9, 1, 14, 6);    // crown
      g.fillRect(4, 6, 24, 4);    // brim
      g.fillStyle(0xffffff, 1);
      g.fillRect(5, 9, 22, 1);    // white band
      // Skin face
      g.fillStyle(0xffe0b2, 1);
      g.fillRect(6, 10, 20, 12);  // face
      g.fillRect(4, 13, 4, 6);    // left ear
      g.fillRect(24, 13, 4, 6);   // right ear
      // Eyes
      g.fillStyle(0x222222, 1);
      g.fillRect(9, 13, 4, 3);
      g.fillRect(19, 13, 4, 3);
      // Nose
      g.fillStyle(0xffb07b, 1);
      g.fillRect(14, 17, 4, 3);
      // Mustache
      g.fillStyle(0x3e1a00, 1);
      g.fillRect(9, 19, 6, 3);
      g.fillRect(17, 19, 6, 3);
      // Red shirt arms
      g.fillStyle(0xcc1111, 1);
      g.fillRect(4, 22, 6, armH);
      g.fillRect(22, 22, 6, armH);
      // Blue overalls body
      g.fillStyle(0x1a5fb4, 1);
      g.fillRect(10, 22, 12, 4);         // bib top strap
      g.fillRect(6, 26, 20, bodyH);      // body
      // Yellow buttons
      g.fillStyle(0xffcc00, 1);
      g.fillRect(10, 27, 3, 3);
      g.fillRect(19, 27, 3, 3);
      // Legs
      g.fillStyle(0x1a5fb4, 1);
      g.fillRect(7, legY, 8, 6);
      g.fillRect(17, legY, 8, 6);
      // Shoes
      g.fillStyle(0x3e1a00, 1);
      g.fillRect(5, shoeY, 11, shoeH);
      g.fillRect(16, shoeY, 11, shoeH);
      g.generateTexture(key, 32, H);
      g.destroy();
    }
    makePlumber('player_small', 48);
    makePlumber('player_big',   64);

    // Mushroom power-up (28x28)
    function makeMushroomTex() {
      if (self.textures.exists('mushroom_tex')) return;
      var g = self.make.graphics({ add: false });
      g.fillStyle(0xee1111, 1);
      g.fillCircle(14, 11, 12);   // red cap dome
      g.fillStyle(0xffffff, 1);
      g.fillCircle(8,  7, 3);     // spots
      g.fillCircle(20, 6, 3);
      g.fillCircle(14, 3, 2);
      g.fillRect(8, 18, 12, 10);  // white stem
      g.fillStyle(0x333333, 1);
      g.fillCircle(10, 20, 2);    // eyes
      g.fillCircle(18, 20, 2);
      g.generateTexture('mushroom_tex', 28, 28);
      g.destroy();
    }
    makeMushroomTex();

    // Question block — yellow tile with pixel-art "?"
    function makeQBlockTex() {
      if (self.textures.exists('qblock_tex')) return;
      var g = self.make.graphics({ add: false });
      g.fillStyle(0xffcc00, 1);
      g.fillRect(0, 0, 40, 40);
      g.fillStyle(0xd47000, 1);   // orange border
      g.fillRect(0, 0, 40, 3);
      g.fillRect(0, 37, 40, 3);
      g.fillRect(0, 0, 3, 40);
      g.fillRect(37, 0, 3, 40);
      g.fillStyle(0xffe566, 1);   // highlight (top-left bevel)
      g.fillRect(3, 3, 3, 34);
      g.fillRect(3, 3, 34, 3);
      g.fillStyle(0x5a2d00, 1);   // "?" pixel art (4px blocks, 5-col grid at x=10, y=5)
      var q = function(c, r) { g.fillRect(10 + c * 4, 5 + r * 4, 4, 4); };
      q(1,0); q(2,0); q(3,0);     // .###.
      q(0,1); q(4,1);             // #...#
      q(3,2); q(4,2);             // ...##
      q(2,3); q(3,3);             // ..##.
      q(2,4);                     // ..#..
                                  // .....  gap
      q(2,6);                     // ..#..  dot
      g.generateTexture('qblock_tex', 40, 40);
      g.destroy();
    }
    makeQBlockTex();

    // Key icon for HUD (42x22)
    function makeKeyTex() {
      if (self.textures.exists('key_tex')) return;
      var g = self.make.graphics({ add: false });
      g.fillStyle(0xffcc00, 1);
      g.fillCircle(11, 11, 10);   // bow
      g.fillStyle(0x3a2800, 1);
      g.fillCircle(11, 11, 5);    // hole
      g.fillStyle(0xffcc00, 1);
      g.fillRect(19, 8, 23, 6);   // shaft
      g.fillRect(32, 14, 4, 5);   // tooth 1
      g.fillRect(38, 14, 4, 5);   // tooth 2
      g.generateTexture('key_tex', 44, 22);
      g.destroy();
    }
    makeKeyTex();

    // Programmatic 960x720 country background — skipped if real PNG loaded
    function makeCountryBg(key, id) {
      if (self.textures.exists(key)) return;
      var W = 960, H = 720;
      var g = self.make.graphics({ add: false });
      // [sky1, sky2, groundColor, type]
      var CFG = {
        austria:      [0x4a8ec0, 0x90c8f0, 0x4a8c3f, 'alpine'],
        germany:      [0x5090c8, 0x90c8f5, 0x5a8a40, 'alpine'],
        france:       [0x5098d0, 0x90c8f8, 0x90b840, 'fields'],
        italy:        [0x3a88d5, 0x80c0f5, 0xc08050, 'med'],
        spain:        [0x3880d0, 0x80c0f5, 0xc09848, 'med'],
        japan:        [0xf0b8d0, 0xf8e0f0, 0x5a8038, 'japan'],
        china:        [0x8ab0d8, 0xc0d8f0, 0x588038, 'mist'],
        egypt:        [0xd08030, 0xf0c060, 0xd4a44c, 'desert'],
        kenya:        [0xe07028, 0xf0b060, 0xa87830, 'savanna'],
        nigeria:      [0x3090d5, 0x70c0f0, 0x388018, 'jungle'],
        south_africa: [0x4898d5, 0x88c0f0, 0xb88838, 'savanna'],
        morocco:      [0xd08838, 0xf0c468, 0xc89040, 'desert'],
        thailand:     [0x2880d0, 0x68c0f0, 0x287818, 'jungle'],
        india:        [0xe08838, 0xf0b868, 0x889838, 'india'],
        saudi_arabia: [0xe09830, 0xf0c860, 0xd0aa48, 'desert'],
        brazil:       [0x2090d8, 0x60c0f0, 0x287818, 'jungle'],
        argentina:    [0x5898d8, 0x88c8f8, 0x78b840, 'alpine'],
        mexico:       [0xd08028, 0xf0b858, 0xb89050, 'desert'],
        canada:       [0x4880d0, 0x88c0f0, 0x488838, 'alpine'],
        usa:          [0x4888d5, 0x88c0f5, 0x88aa48, 'plains'],
        australia:    [0x3888d5, 0x78c0f8, 0xd08840, 'outback'],
        new_zealand:  [0x5098d8, 0x88c8f8, 0x58a838, 'alpine'],
        fiji:         [0x1888e0, 0x58c0f8, 0xf0e080, 'beach']
      };
      var c = CFG[id] || [0x4a80d0, 0x87ceeb, 0x4a8c3f, 'alpine'];
      var sky1 = c[0], sky2 = c[1], gnd = c[2], type = c[3];
      // Sky gradient
      g.fillStyle(sky1, 1); g.fillRect(0, 0, W, 430);
      g.fillStyle(sky2, 1); g.fillRect(0, 295, W, 215);
      // Sun
      g.fillStyle(0xffffa0, 1); g.fillCircle(820, 85, 42);
      if (type === 'alpine' || type === 'mist') {
        var mts = [[105,418],[235,338],[425,392],[615,318],[765,382],[905,358]];
        g.fillStyle(0x7090b0, 1);
        for (var i = 0; i < mts.length; i++) { g.fillTriangle(mts[i][0]-90,496, mts[i][0],mts[i][1], mts[i][0]+90,496); }
        g.fillStyle(0xeef5ff, 1);
        for (var i = 0; i < mts.length; i++) { var bh=(496-mts[i][1])*0.28; g.fillTriangle(mts[i][0]-bh*0.6,mts[i][1]+bh, mts[i][0],mts[i][1], mts[i][0]+bh*0.6,mts[i][1]+bh); }
        g.fillStyle(gnd, 1); g.fillRect(0, 490, W, H-490);
        g.fillStyle(0x3a6a28, 1); g.fillEllipse(220,510,420,60); g.fillEllipse(720,505,360,50);
      } else if (type === 'desert' || type === 'outback') {
        g.fillStyle(gnd, 1); g.fillRect(0, 468, W, H-468);
        g.fillStyle(0xbc8838, 1); g.fillEllipse(150,486,350,48); g.fillEllipse(560,474,420,46); g.fillEllipse(860,488,300,44);
        if (id === 'egypt') {
          g.fillStyle(0xc89038, 1); g.fillTriangle(148,490, 265,328, 382,490); g.fillTriangle(390,490, 472,376, 554,490);
          g.fillStyle(0xa87030, 1); g.fillRect(218,480,15,10);
        }
        if (id === 'mexico') {
          g.fillStyle(0x4a8820, 1);
          g.fillRect(672,353,18,137); g.fillRect(640,386,50,14); g.fillRect(640,353,18,47); g.fillRect(690,365,18,47);
        }
        if (id === 'australia') { g.fillStyle(0xb04820, 1); g.fillEllipse(680,460,270,72); }
      } else if (type === 'savanna') {
        g.fillStyle(gnd, 1); g.fillRect(0, 476, W, H-476);
        g.fillStyle(0x906020, 1); g.fillRect(0, 518, W, H-518);
        var atx = [132,372,632,822];
        for (var i = 0; i < atx.length; i++) {
          g.fillStyle(0x6a4018, 1); g.fillRect(atx[i]-5,438,10,60);
          g.fillStyle(0x4a7018, 1); g.fillEllipse(atx[i],430,88,28);
        }
      } else if (type === 'jungle') {
        g.fillStyle(gnd, 1); g.fillRect(0, 476, W, H-476);
        var jxs = [58,170,292,432,562,682,802,922];
        g.fillStyle(0x1a5a10, 1);
        for (var i = 0; i < jxs.length; i++) { var jy=388+(i%3)*36; g.fillTriangle(jxs[i]-55,490, jxs[i],jy, jxs[i]+55,490); g.fillTriangle(jxs[i]-35,490, jxs[i],jy+26, jxs[i]+35,490); }
        if (id === 'brazil') { g.fillStyle(0x1a60a0, 1); g.fillRect(340,492,112,28); }
      } else if (type === 'med') {
        g.fillStyle(gnd, 1); g.fillRect(0, 486, W, H-486);
        g.fillStyle(0xc07840, 1); g.fillRect(0, 526, W, H-526);
        g.fillStyle(gnd, 1); g.fillEllipse(212,493,432,48); g.fillEllipse(722,485,402,42);
        var cyp = [76,212,542,692,860];
        for (var i = 0; i < cyp.length; i++) { g.fillStyle(0x2a5818, 1); g.fillRect(cyp[i]-5,426,10,70); g.fillEllipse(cyp[i],410,22,50); }
        // Italy — Colosseum silhouette (centre-right, anchor x=680, ground y=486)
        if (id === 'italy') {
          var colX = 680;
          // Base oval shadow
          g.fillStyle(0xb09060, 1);
          g.fillEllipse(colX, 486, 200, 30);
          // Main wall body
          g.fillStyle(0xc8a870, 1);
          g.fillRect(colX - 100, 340, 200, 146);
          // Lower arcade (y 420–442): 9 dark arch openings
          g.fillStyle(0x3a2a10, 1);
          for (var ai = 0; ai < 9; ai++) {
            g.fillRect(colX - 96 + ai * 22, 420, 14, 22);
          }
          // Middle arcade (y 370–390): 8 openings
          for (var ai = 0; ai < 8; ai++) {
            g.fillRect(colX - 88 + ai * 24, 370, 12, 20);
          }
          // Upper attic wall (y 340–368): 160px wide (right 40px missing = ruin)
          g.fillStyle(0xc8a870, 1);
          g.fillRect(colX - 100, 340, 160, 28);
          // Attic windows: 5 small
          g.fillStyle(0x3a2a10, 1);
          for (var ai = 0; ai < 5; ai++) {
            g.fillRect(colX - 90 + ai * 34, 346, 8, 12);
          }
          // Ruin break: paint sky colour over top-right corner
          g.fillStyle(sky1, 1);
          g.fillRect(colX + 60, 340, 40, 28);
        }
      } else if (type === 'japan') {
        g.fillStyle(0x9090a8, 1); g.fillTriangle(292,496, 480,253, 668,496);
        g.fillStyle(0xeef5ff, 1); g.fillTriangle(392,328, 480,253, 568,328);
        g.fillStyle(gnd, 1); g.fillRect(0, 486, W, H-486);
        var ctx = [82,207,742,870];
        for (var i = 0; i < ctx.length; i++) {
          g.fillStyle(0x7a5020, 1); g.fillRect(ctx[i]-5,396,10,92);
          g.fillStyle(0xf5a0c0, 1); g.fillCircle(ctx[i],370,38); g.fillCircle(ctx[i]-22,386,26); g.fillCircle(ctx[i]+22,383,26);
        }
      } else if (type === 'fields') {
        g.fillStyle(0x9088c8, 1); g.fillRect(0, 488, W, 52);
        g.fillStyle(0x7060b0, 1); g.fillRect(0, 528, W, 42);
        g.fillStyle(gnd, 1); g.fillRect(0, 558, W, H-558);
        // France — Eiffel Tower silhouette (centred at x=480, ground y=488)
        if (id === 'france') {
          g.fillStyle(0x4a4a5a, 1);
          // Base legs — two wide triangles splaying outward
          g.fillTriangle(400, 488, 455, 420, 470, 488);
          g.fillTriangle(510, 488, 525, 420, 580, 488);
          // First platform
          g.fillStyle(0x5a5a6a, 1);
          g.fillRect(442, 416, 96, 10);
          // Mid body — two narrowing triangles
          g.fillStyle(0x4a4a5a, 1);
          g.fillTriangle(442, 416, 462, 310, 468, 416);
          g.fillTriangle(492, 416, 518, 416, 498, 310);
          // Second platform
          g.fillStyle(0x5a5a6a, 1);
          g.fillRect(458, 306, 64, 8);
          // Upper spire
          g.fillStyle(0x4a4a5a, 1);
          g.fillTriangle(458, 306, 480, 195, 522, 306);
          // Horizontal lattice lines
          g.fillStyle(0x5a5a5a, 1);
          g.fillRect(428, 380, 104, 2);
          g.fillRect(436, 360, 88,  2);
          g.fillRect(444, 340, 72,  2);
          // Static gold tip dot (tween added separately in create())
          g.fillStyle(0xffdd44, 1);
          g.fillCircle(480, 195, 4);
        }
      } else if (type === 'india') {
        g.fillStyle(gnd, 1); g.fillRect(0, 486, W, H-486);
        g.fillStyle(0xe8e8f0, 1);
        g.fillRect(372,416,216,80); g.fillRect(444,356,72,62); g.fillCircle(480,343,32);
        g.fillRect(368,436,14,62); g.fillRect(578,436,14,62); g.fillCircle(375,433,9); g.fillCircle(585,433,9);
      } else if (type === 'plains') {
        g.fillStyle(gnd, 1); g.fillRect(0, 486, W, H-486);
        var blds = [[80,426,60,62],[165,390,52,98],[248,436,68,52],[355,376,52,112],[430,418,62,70],[598,383,80,105],[705,418,60,70],[798,406,72,82]];
        for (var i = 0; i < blds.length; i++) {
          var b = blds[i];
          g.fillStyle(0x607090, 1); g.fillRect(b[0],b[1],b[2],b[3]);
          g.fillStyle(0xffd080, 1); g.fillRect(b[0]+6,b[1]+6,10,8); g.fillRect(b[0]+b[2]-16,b[1]+6,10,8);
        }
      } else if (type === 'beach') {
        g.fillStyle(0x1070d0, 1); g.fillRect(0, 446, W, H-446);
        g.fillStyle(0xf0e080, 1); g.fillRect(0, 488, W, 60);
        var pxs = [110,292,692,857];
        for (var i = 0; i < pxs.length; i++) {
          var px = pxs[i];
          g.fillStyle(0x7a5018, 1); g.fillRect(px-5,378,10,122);
          g.fillStyle(0x228818, 1); g.fillEllipse(px-22,366,68,18); g.fillEllipse(px+22,360,68,18); g.fillEllipse(px,356,58,18);
        }
      }
      g.generateTexture(key, W, H);
      g.destroy();
    }
    makeCountryBg(this.countryId + '_bg', this.countryId);

    // Programmatic country-specific enemy sprite (40x56 humanoid)
    // Skipped if real PNG already loaded in preload()
    function makeCountryEnemy(key) {
      if (self.textures.exists(key)) return;
      var W = 40, H = 56;
      var STYLES = {
        austria_enemy:      { skin: 0xffe0b2, body: 0x795548, leg: 0x4e342e, hat: 'wide',     hatColor: 0x388e3c },
        germany_enemy:      { skin: 0xffe0b2, body: 0x795548, leg: 0x4e342e, hat: 'wide',     hatColor: 0x1565c0 },
        france_enemy:       { skin: 0xffe0b2, body: 0x1565c0, leg: 0x0d47a1, hat: 'beret',    hatColor: 0xb71c1c },
        italy_enemy:        { skin: 0xffe0b2, body: 0xffffff, leg: 0x37474f, hat: 'chef',     hatColor: 0xffffff },
        spain_enemy:        { skin: 0xffe0b2, body: 0xb71c1c, leg: 0x212121, hat: 'wide',     hatColor: 0x212121 },
        japan_enemy:        { skin: 0xffe0b2, body: 0xb71c1c, leg: 0x212121, hat: 'kabuto',   hatColor: 0x424242 },
        china_enemy:        { skin: 0xffe0b2, body: 0xb71c1c, leg: 0xb71c1c, hat: 'pointed',  hatColor: 0xffcc00 },
        egypt_enemy:        { skin: 0xd7a96a, body: 0xf5deb3, leg: 0xc8a96a, hat: 'pharaoh',  hatColor: 0xffcc00, accent: 0x1565c0 },
        kenya_enemy:        { skin: 0x5d4037, body: 0x8d6e63, leg: 0x4e342e, hat: 'wide',     hatColor: 0xf5f5dc },
        nigeria_enemy:      { skin: 0x5d4037, body: 0x00897b, leg: 0x004d40, hat: 'beret',    hatColor: 0x388e3c },
        south_africa_enemy: { skin: 0x8d6e63, body: 0x388e3c, leg: 0x1b5e20, hat: 'wide',     hatColor: 0xf5f5dc },
        morocco_enemy:      { skin: 0xd7a96a, body: 0xff7043, leg: 0xbf360c, hat: 'fez',      hatColor: 0xb71c1c },
        thailand_enemy:     { skin: 0xffe0b2, body: 0xff8f00, leg: 0xe65100, hat: 'pointed',  hatColor: 0xffd600 },
        india_enemy:        { skin: 0xd7a96a, body: 0xff8f00, leg: 0xff6f00, hat: 'turban',   hatColor: 0xff6f00, accent: 0xffd600 },
        saudi_arabia_enemy: { skin: 0xd7a96a, body: 0xffffff, leg: 0xfafafa, hat: 'keffiyeh', hatColor: 0xffffff, accent: 0x212121 },
        brazil_enemy:       { skin: 0xd7a96a, body: 0xfdd835, leg: 0x388e3c, hat: 'sombrero', hatColor: 0x388e3c },
        argentina_enemy:    { skin: 0xffe0b2, body: 0x90caf9, leg: 0x1565c0, hat: 'wide',     hatColor: 0x795548 },
        mexico_enemy:       { skin: 0xd7a96a, body: 0x388e3c, leg: 0x1b5e20, hat: 'sombrero', hatColor: 0x795548 },
        canada_enemy:       { skin: 0xffe0b2, body: 0xb71c1c, leg: 0x212121, hat: 'wide',     hatColor: 0x8d6e63 },
        usa_enemy:          { skin: 0xffe0b2, body: 0x1565c0, leg: 0x4e342e, hat: 'cowboy',   hatColor: 0x8d6e63 },
        australia_enemy:    { skin: 0xffe0b2, body: 0x795548, leg: 0x4e342e, hat: 'wide',     hatColor: 0xd2a069 },
        new_zealand_enemy:  { skin: 0xffe0b2, body: 0x1b5e20, leg: 0x212121, hat: 'round',    hatColor: 0x4e342e },
        fiji_enemy:         { skin: 0x8d6e63, body: 0xff8f00, leg: 0x795548, hat: 'none',     hatColor: 0x000000 }
      };
      var st = STYLES[key] || { skin: 0xffe0b2, body: 0xff4444, leg: 0xcc0000, hat: 'round', hatColor: 0x880000 };
      var g = self.make.graphics({ add: false });
      // Legs
      g.fillStyle(st.leg, 1);
      g.fillRect(10, 44, 8, 12);
      g.fillRect(22, 44, 8, 12);
      // Body
      g.fillStyle(st.body, 1);
      g.fillRect(9, 26, 22, 20);
      // Head
      g.fillStyle(st.skin, 1);
      g.fillCircle(20, 16, 11);
      // Eyes
      g.fillStyle(0x333333, 1);
      g.fillCircle(16, 14, 2);
      g.fillCircle(24, 14, 2);
      // Hat
      g.fillStyle(st.hatColor, 1);
      if (st.hat === 'wide' || st.hat === 'cowboy') {
        g.fillRect(5, 8, 30, 3);   // brim
        g.fillRect(12, 1, 16, 8);  // crown
      } else if (st.hat === 'sombrero') {
        g.fillRect(2, 9, 36, 3);   // wide brim
        g.fillRect(12, 1, 16, 9);  // crown
      } else if (st.hat === 'chef') {
        g.fillRect(9, 7, 22, 3);   // base band
        g.fillRect(12, 0, 16, 8);  // puffy crown
      } else if (st.hat === 'beret') {
        g.fillEllipse(20, 6, 28, 12);
      } else if (st.hat === 'fez') {
        g.fillRect(13, 2, 14, 9);  // cylinder
        g.fillRect(11, 10, 18, 3); // base band
      } else if (st.hat === 'kabuto') {
        g.fillCircle(20, 7, 12);   // dome
        g.fillRect(6, 12, 28, 4);  // cheek guard
      } else if (st.hat === 'pointed') {
        g.fillTriangle(20, 0, 8, 11, 32, 11);
      } else if (st.hat === 'pharaoh') {
        g.fillRect(8, 4, 24, 14);  // nemes cloth
        g.fillStyle(st.accent || 0x1565c0, 1);
        g.fillRect(8, 7, 24, 2);
        g.fillRect(8, 12, 24, 2);
      } else if (st.hat === 'turban') {
        g.fillCircle(20, 5, 11);
        g.fillStyle(st.accent || 0xffd600, 1);
        g.fillRect(10, 4, 20, 3);
      } else if (st.hat === 'keffiyeh') {
        g.fillRect(8, 4, 24, 14);
        g.fillStyle(st.accent || 0x212121, 1);
        g.fillRect(8, 4, 24, 3);
        g.fillRect(8, 9, 24, 3);
      } else if (st.hat === 'round') {
        g.fillCircle(20, 6, 9);
      }
      // hat === 'none': bare head
      g.generateTexture(key, W, H);
      g.destroy();
    }
    makeCountryEnemy(this.countryId + '_enemy');

    // World bounds
    this.physics.world.setBounds(0, 0, 3840, 720);
    this.cameras.main.setBounds(0, 0, 3840, 720);

    // Background (programmatic or real PNG — always available after makeCountryBg)
    this.add.image(0, 0, this.countryId + '_bg').setOrigin(0, 0).setScrollFactor(0);
    // France: animated tip sparkle over static background
    if (this.countryId === 'france') {
      var tipG = this.add.graphics().setScrollFactor(0);
      tipG.fillStyle(0xffdd44, 1);
      tipG.fillCircle(480, 195, 4);
      this.tweens.add({ targets: tipG, alpha: 0.3, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }

    // Platforms — use staticImage so physics body is exact
    this.platforms = this.physics.add.staticGroup();

    // Ground: full width
    var ground = this.physics.add.staticImage(1920, 710, 'plat_tex');
    ground.setDisplaySize(3840, 20);
    ground.refreshBody();
    this.platforms.add(ground);

    // Floating platforms
    var platformDefs = [
      { x: 400,  y: 580, w: 200 },
      { x: 820,  y: 500, w: 160 },
      { x: 1000, y: 580, w: 200 },
      { x: 1200, y: 460, w: 200 },
      { x: 1400, y: 520, w: 96  }, // narrow — unavoidable blocker
      { x: 1700, y: 560, w: 200 },
      { x: 2000, y: 480, w: 200 },
      { x: 2400, y: 540, w: 200 },
      { x: 2800, y: 500, w: 200 },
      { x: 3400, y: 580, w: 200 }
    ];
    platformDefs.forEach(function(p) {
      var plat = self.physics.add.staticImage(p.x, p.y, 'plat_tex');
      plat.setDisplaySize(p.w, 20);
      plat.refreshBody();
      self.platforms.add(plat);
    });

    // Player
    this.player = this.physics.add.image(100, 200, 'player_small');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(2);
    this.physics.add.collider(this.player, this.platforms);

    // State
    this.starsEarned = 0;
    this.isBig = false;
    this.livesCount = 3;

    // D-pad booleans (set by virtual d-pad)
    this.dpadLeft = false;
    this.dpadRight = false;
    this.dpadJump = false;

    // Key HUD (5 key icons at top-left, camera-fixed)
    this.keyIcons = [];
    for (var i = 0; i < 5; i++) {
      var kImg = this.add.image(22 + i * 46, 22, 'key_tex');
      kImg.setScrollFactor(0).setAlpha(0.25).setDepth(5);
      this.keyIcons.push(kImg);
    }

    // Lives HUD (top-right)
    this.livesText = this.add.text(920, 16, '♥ 3', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ff4444'
    });
    this.livesText.setOrigin(1, 0);
    this.livesText.setScrollFactor(0);

    // Back to level select (top-centre HUD)
    var doMapReturn = function() {
      if (self.anthem) self.anthem.stop();
      if (self.anthemInterval) { clearInterval(self.anthemInterval); self.anthemInterval = null; }
      self.scene.start('LevelSelectScene', { continentId: self.continentId });
    };
    makeMarioBtn(self, 480, 20, (LANG === 'de') ? '← Länder' : '← Levels', doMapReturn,
      { w: 110, h: 26, fontSize: '13px', color: 0xcc1111, scrollFactor: 0, depth: 5 }
    );

    // Anthem — HTML Audio element works on both file:// and https://
    this.anthem = null;
    this.anthemInterval = null;
    this._anthemAudio = null;
    try {
      var _muted = localStorage.getItem('weltreise_mute') === '1';
      var _audio = new Audio('assets/audio/anthems/' + self.countryId + '.wav');
      _audio.loop = true;
      _audio.volume = 0.4;
      if (!_muted) {
        var _playPromise = _audio.play();
        if (_playPromise) { _playPromise.catch(function() {}); }
      }
      self._anthemAudio = _audio;
      self.anthem = { stop: function() { _audio.pause(); _audio.src = ''; } };
    } catch(e) {}

    // Music toggle (top right, below lives ♥)
    var _muteState = localStorage.getItem('weltreise_mute') === '1';
    var _muteBtn = self.add.text(948, 46, _muteState ? '🔇' : '🔊', {
      fontFamily: 'Arial', fontSize: '20px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 2
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(5).setInteractive({ useHandCursor: true });
    _muteBtn.on('pointerdown', function() {
      _muteState = !_muteState;
      localStorage.setItem('weltreise_mute', _muteState ? '1' : '0');
      _muteBtn.setText(_muteState ? '🔇' : '🔊');
      if (self._anthemAudio) {
        if (_muteState) {
          self._anthemAudio.pause();
        } else {
          var _p = self._anthemAudio.play();
          if (_p) { _p.catch(function() {}); }
        }
      }
    });

    self.events.once('shutdown', function() {
      if (self.anthem) { self.anthem.stop(); self.anthem = null; }
      if (self.anthemInterval) { clearInterval(self.anthemInterval); self.anthemInterval = null; }
    });

    // Camera follow
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Cursors (created once here, used in update)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Find country data
    var continentMap = { europe: EUROPE, africa: AFRICA, asia: ASIA, americas: AMERICAS, oceania: OCEANIA };
    var continent = continentMap[this.continentId];
    this.countryData = null;
    for (var ci = 0; ci < continent.countries.length; ci++) {
      if (continent.countries[ci].id === this.countryId) {
        this.countryData = continent.countries[ci];
        break;
      }
    }
    // Shuffle questions (Fisher-Yates)
    var qs = this.countryData.questions.slice();
    for (var qi = qs.length - 1; qi > 0; qi--) {
      var qj = Math.floor(Math.random() * (qi + 1));
      var qtmp = qs[qi]; qs[qi] = qs[qj]; qs[qj] = qtmp;
    }
    this.questionPool = qs;
    this.questionIndex = 0;

    // Enemies
    this.enemies = this.physics.add.group();
    var enemyDefs = [
      { x: 400,  y: 542 },  // platform 300–500 (y=580)
      { x: 820,  y: 462 },  // platform 740–900 (y=500)
      { x: 1200, y: 422 },  // platform 1100–1300 (y=460)
      { x: 1524, y: 660 },  // ground — gap between x=1448 and x=1600
      { x: 1700, y: 522 },  // platform 1600–1800 (y=560)
      { x: 2400, y: 502 },  // platform 2300–2500 (y=540)
      { x: 3000, y: 660 }   // ground — gap between x=2900 and x=3300
    ];
    enemyDefs.forEach(function(def, i) {
      var e = self.physics.add.image(def.x, def.y, self.countryId + '_enemy');
      e.body.setSize(32, 48, true); // consistent hitbox regardless of sprite size
      e.setBounce(0);
      e.setCollideWorldBounds(true);
      e.setVelocityX(80);
      e.setDepth(1);
      e.enemyId = 'enemy_' + i;
      e.isStunned = false;
      e.hasGivenStar = false;
      e.direction = 1;
      self.enemies.add(e);
    });
    this.physics.add.collider(this.enemies, this.platforms);

    // Exit door — arched wooden door with keyhole
    function makeDoorTex() {
      if (self.textures.exists('door_tex')) return;
      var g = self.make.graphics({ add: false });
      // Outer frame (dark wood)
      g.fillStyle(0x2d1200, 1);
      g.fillRect(0, 0, 60, 120);
      // Arch shape: rect base + semicircle top
      g.fillStyle(0x5c2800, 1);
      g.fillRect(4, 22, 52, 94);
      g.fillCircle(30, 22, 26);
      // Door surface
      g.fillStyle(0x7a3d10, 1);
      g.fillRect(8, 26, 44, 88);
      g.fillCircle(30, 26, 20);
      // Upper panel recess
      g.fillStyle(0x4e2008, 1); g.fillRect(12, 30, 36, 32);
      g.fillStyle(0x8b4a18, 1); g.fillRect(14, 32, 32, 28);
      // Lower panel recess
      g.fillStyle(0x4e2008, 1); g.fillRect(12, 70, 36, 38);
      g.fillStyle(0x8b4a18, 1); g.fillRect(14, 72, 32, 34);
      // Wood grain lines
      g.fillStyle(0x6a3008, 1);
      g.fillRect(15, 40, 30, 2); g.fillRect(15, 50, 30, 2);
      g.fillRect(15, 80, 30, 2); g.fillRect(15, 90, 30, 2);
      // Gold doorknob
      g.fillStyle(0xd4a000, 1); g.fillCircle(43, 86, 5);
      g.fillStyle(0xffdd44, 1); g.fillCircle(42, 85, 3);
      // Keyhole
      g.fillStyle(0x1a0800, 1);
      g.fillCircle(43, 95, 3);
      g.fillRect(41, 95, 4, 6);
      g.generateTexture('door_tex', 60, 120);
      g.destroy();
    }
    makeDoorTex();
    this.exitDoor = this.physics.add.staticImage(3680, 650, 'door_tex');
    this.exitDoor.setAlpha(0.3);
    this.exitDoor.refreshBody();
    this.exitLocked = true;
    this.levelCompleted = false;
    this.exitArrow = null;

    // Padlock on door — removed when exit unlocks
    function makeLockTex() {
      if (self.textures.exists('lock_tex')) return;
      var g = self.make.graphics({ add: false });
      // Shackle
      g.fillStyle(0xb8860b, 1);
      g.fillRect(6, 0, 5, 18);
      g.fillRect(23, 0, 5, 18);
      g.fillRect(6, 0, 22, 6);
      // Body
      g.fillStyle(0xd4a000, 1);
      g.fillRect(0, 16, 34, 26);
      g.fillStyle(0xffdd44, 1);
      g.fillRect(2, 18, 10, 4);
      // Keyhole
      g.fillStyle(0x3a2800, 1);
      g.fillCircle(17, 26, 5);
      g.fillRect(14, 28, 6, 8);
      g.generateTexture('lock_tex', 34, 42);
      g.destroy();
    }
    makeLockTex();
    // 5 small lock icons spread across door face
    this.doorLocks = [];
    for (var li = 0; li < 5; li++) {
      var lk = self.add.image(3656 + li * 12, 626, 'lock_tex');
      lk.setScale(0.42).setDepth(3);
      self.doorLocks.push(lk);
    }
    // Hint text floating above door
    var hintStr = (LANG === 'de')
      ? 'Sprich mit Leuten\num 5 Schlüssel zu sammeln'
      : 'Talk to people\nto collect 5 keys';
    this.doorHintText = this.add.text(3680, 568, hintStr, {
      fontFamily: 'Arial', fontSize: '13px', color: '#ffcc00',
      stroke: '#000000', strokeThickness: 3, align: 'center'
    }).setOrigin(0.5, 1).setDepth(4);

    // Question blocks (3 blocks for mushroom power-up)
    this.questionBlocks = this.physics.add.staticGroup();
    var blockDefs = [{ x: 600, y: 500 }, { x: 2200, y: 460 }];
    blockDefs.forEach(function(b) {
      var blk = self.physics.add.staticImage(b.x, b.y, 'qblock_tex');
      blk.refreshBody();
      self.questionBlocks.add(blk);
    });
    this.mushrooms = [];

    // Question blocks are solid (player can stand on them) and spawn mushroom when hit from below
    this.physics.add.collider(this.player, this.questionBlocks, function(player, block) {
      if (player.body.blocked.up) {
        block.destroy();
        SFX.mushroomPop();
        var mushroom = self.physics.add.image(block.x, block.y - 30, 'mushroom_tex');
        mushroom.setVelocityX(60);
        mushroom.setBounce(0);
        mushroom.setCollideWorldBounds(true);
        self.physics.add.collider(mushroom, self.platforms);
        self.mushrooms.push(mushroom);
        self.physics.add.overlap(player, mushroom, function() {
          if (mushroom.active) {
            mushroom.destroy();
            SFX.powerUp();
            self.isBig = true;
            self.player.setTexture('player_big');
            self.player.body.setSize(32, 64, true);
            self.player.y -= 8; // (64-48)/2 — keep body bottom flush with floor
          }
        });
      }
    });

    // Virtual d-pad — raw DOM touch events for reliable multi-touch
    this.dpadObjects = [];
    var isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS;
    if (isMobile) {
      // Visual buttons (no setInteractive — handled by DOM events below)
      var makeDpadBtn = function(x, y, label) {
        var bg = self.add.rectangle(x, y, 70, 70, 0x333333, 0.8).setScrollFactor(0).setDepth(10);
        var txt = self.add.text(x, y, label, { fontFamily: 'Arial', fontSize: '28px', color: '#ffffff' }).setOrigin(0.5).setScrollFactor(0).setDepth(11);
        self.dpadObjects.push(bg, txt);
      };
      makeDpadBtn(60,  660, '◀');
      makeDpadBtn(150, 660, '▶');
      makeDpadBtn(900, 660, '▲');

      // Button hit zones in game coordinates (960×720)
      // Left: x25-95, Right: x115-185, Jump: x865-935 — all y625-695
      var canvas = self.sys.game.canvas;
      function updateDpad(touches) {
        var rect = canvas.getBoundingClientRect();
        var sx = 960 / rect.width;
        var sy = 720 / rect.height;
        var left = false, right = false, jump = false;
        for (var i = 0; i < touches.length; i++) {
          var gx = (touches[i].clientX - rect.left) * sx;
          var gy = (touches[i].clientY - rect.top)  * sy;
          if (gx >= 25  && gx <= 95  && gy >= 625 && gy <= 695) left  = true;
          if (gx >= 115 && gx <= 185 && gy >= 625 && gy <= 695) right = true;
          if (gx >= 865 && gx <= 935 && gy >= 625 && gy <= 695) jump  = true;
        }
        self.dpadLeft  = left;
        self.dpadRight = right;
        self.dpadJump  = jump;
      }

      var onTouch       = function(e) { updateDpad(e.touches); };
      var onTouchCancel = function()  { self.dpadLeft = false; self.dpadRight = false; self.dpadJump = false; };

      canvas.addEventListener('touchstart',  onTouch,       { passive: false });
      canvas.addEventListener('touchmove',   onTouch,       { passive: false });
      canvas.addEventListener('touchend',    onTouch,       { passive: false });
      canvas.addEventListener('touchcancel', onTouchCancel);

      self.events.once('shutdown', function() {
        canvas.removeEventListener('touchstart',  onTouch);
        canvas.removeEventListener('touchmove',   onTouch);
        canvas.removeEventListener('touchend',    onTouch);
        canvas.removeEventListener('touchcancel', onTouchCancel);
      });
    }
  },

  checkEnemyStomp: function() {
    var self = this;
    var enemies = this.enemies.getChildren();
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      if (enemy.isStunned || enemy.hasGivenStar) continue;
      if (this.physics.overlap(this.player, enemy) &&
          this.player.body.velocity.y > 0 &&
          this.player.y < enemy.y) {
        // Stomp!
        enemy.isStunned = true;
        enemy.setVelocityX(0);
        SFX.stomp();
        // Bounds check on question pool
        if (this.questionIndex >= this.questionPool.length) {
          // Re-shuffle pool
          var qs = this.questionPool.slice();
          for (var qi = qs.length - 1; qi > 0; qi--) {
            var qj = Math.floor(Math.random() * (qi + 1));
            var qtmp = qs[qi]; qs[qi] = qs[qj]; qs[qj] = qtmp;
          }
          this.questionPool = qs;
          this.questionIndex = 0;
        }
        var question = this.questionPool[this.questionIndex++];
        var enemyRef = enemy;
        var onResult = function(correct) {
          self.applyStompResult(correct, enemyRef);
          // Restore d-pad visibility
          self.dpadObjects.forEach(function(obj) { obj.setVisible(true); });
        };
        // Hide d-pad during question
        this.dpadObjects.forEach(function(obj) { obj.setVisible(false); });
        this.scene.launch('QuestionScene', { question: question, enemyId: enemy.enemyId, onResult: onResult });
        this.scene.pause('GameScene');
        return; // only one stomp per frame
      }
    }
  },

  applyStompResult: function(correct, enemy) {
    if (correct) {
      enemy.hasGivenStar = true;
      enemy.destroy();
      this.starsEarned++;
      this.updateStarHUD();
      if (this.starsEarned >= 5) this.unlockExit();
    } else {
      // Enemy recovers
      enemy.isStunned = false;
      enemy.direction = (enemy.direction || 1);
      enemy.setVelocityX(80 * enemy.direction);
      // Player penalty
      if (this.isBig) {
        this.isBig = false;
        this.player.setTexture('player_small');
        this.player.body.setSize(32, 48, true);
      } else {
        this.livesCount--;
        this.livesText.setText('♥ ' + this.livesCount);
        if (this.livesCount <= 0) {
          if (this.anthem) this.anthem.stop();
          if (this.anthemInterval) { clearInterval(this.anthemInterval); this.anthemInterval = null; }
          this.scene.start('GameOverScene', { countryId: this.countryId, continentId: this.continentId });
        }
      }
    }
  },

  updateStarHUD: function() {
    for (var i = 0; i < this.keyIcons.length; i++) {
      this.keyIcons[i].setAlpha(i < this.starsEarned ? 1.0 : 0.25);
    }
    // Remove the matching door lock (first collected = leftmost lock)
    var lockIdx = this.starsEarned - 1;
    if (lockIdx >= 0 && lockIdx < this.doorLocks.length && this.doorLocks[lockIdx]) {
      this.doorLocks[lockIdx].destroy();
      this.doorLocks[lockIdx] = null;
    }
    // Update hint text with remaining count
    if (this.doorHintText && this.doorHintText.active) {
      var remaining = 5 - this.starsEarned;
      var hintStr;
      if (LANG === 'de') {
        hintStr = 'Sprich mit Leuten\num noch ' + remaining + ' Schlüssel zu sammeln';
      } else {
        hintStr = 'Talk to people\nto collect ' + remaining + ' more ' + (remaining === 1 ? 'key' : 'keys');
      }
      this.doorHintText.setText(hintStr);
    }
  },

  unlockExit: function() {
    this.exitLocked = false;
    this.exitDoor.setAlpha(1);
    if (this.doorHintText) { this.doorHintText.destroy(); this.doorHintText = null; }

    // Show blinking exit arrow if door is off-screen to the right
    var doorScreenX = this.exitDoor.x - this.cameras.main.scrollX;
    if (doorScreenX > 960) {
      var arrowLabel = (LANG === 'de') ? 'AUSGANG ▶▶' : 'EXIT ▶▶';
      this.exitArrow = this.add.text(950, 360, arrowLabel, {
        fontFamily: 'Arial Black, Arial',
        fontSize: '20px',
        color: '#ffcc00',
        stroke: '#000000',
        strokeThickness: 4
      }).setOrigin(1, 0.5).setScrollFactor(0).setDepth(10);
      this.tweens.add({
        targets: this.exitArrow,
        alpha: 0.15,
        duration: 480,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  },

  update: function() {
    // Left/right movement
    if (this.cursors.left.isDown || this.dpadLeft) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown || this.dpadRight) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    // Jump
    if ((this.cursors.up.isDown || this.spaceKey.isDown || this.dpadJump) && this.player.body.blocked.down) {
      this.player.setVelocityY(-550);
    }

    // Enemy direction reversal
    var enemies = this.enemies.getChildren();
    for (var ei = 0; ei < enemies.length; ei++) {
      var e = enemies[ei];
      if (!e.isStunned && e.body) {
        if (e.body.blocked.right) { e.direction = -1; e.setVelocityX(-80); }
        else if (e.body.blocked.left) { e.direction = 1; e.setVelocityX(80); }
      }
    }

    // Check stomp
    this.checkEnemyStomp();

    // Hide exit arrow once door scrolls into view
    if (this.exitArrow) {
      var doorScreenX = this.exitDoor.x - this.cameras.main.scrollX;
      if (doorScreenX <= 960) { this.exitArrow.destroy(); this.exitArrow = null; }
    }

    // Check exit
    if (!this.exitLocked && !this.levelCompleted && this.physics.overlap(this.player, this.exitDoor)) {
      this.levelCompleted = true; // guard: prevent firing again while transition queues
      if (this.anthem) this.anthem.stop();
      if (this.anthemInterval) { clearInterval(this.anthemInterval); this.anthemInterval = null; }
      Progress.completeLevel(this.countryId);
      this.scene.start('WinScene', { countryId: this.countryId, continentId: this.continentId });
    }

  }
});
