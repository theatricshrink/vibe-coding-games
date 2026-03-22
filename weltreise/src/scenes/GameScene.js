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
    this.load.audio(this.countryId + '_anthem', ['assets/audio/anthems/' + this.countryId + '.mp3']);
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
    makeTex('plat_tex',   0x5a3e1a, 200, 20);
    makeTex('player_tex', 0x00aaff,  32, 48);
    makeTex('enemy_tex',  0xff8800,  24, 24); // mushroom power-up
    makeTex('qblock_tex', 0xffcc00,  40, 40);

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

    // Background
    if (this.textures.exists(this.countryId + '_bg')) {
      this.add.image(0, 0, this.countryId + '_bg').setOrigin(0, 0).setScrollFactor(0);
    } else {
      this.add.rectangle(480, 360, 960, 720, 0x1a3a6e).setScrollFactor(0);
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
      { x: 700,  y: 500, w: 96  }, // narrow — unavoidable blocker
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
    this.player = this.physics.add.image(100, 200, 'player_tex');
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

    // Star HUD (5 stars at top-left, camera-fixed)
    this.starTexts = [];
    for (var i = 0; i < 5; i++) {
      var star = this.add.text(20 + i * 36, 16, '☆', {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#ffcc00'
      });
      star.setScrollFactor(0);
      this.starTexts.push(star);
    }

    // Lives HUD (top-right)
    this.livesText = this.add.text(920, 16, '♥ 3', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ff4444'
    });
    this.livesText.setOrigin(1, 0);
    this.livesText.setScrollFactor(0);

    // Anthem (play if available)
    if (this.cache.audio.has(this.countryId + '_anthem')) {
      this.anthem = this.sound.add(this.countryId + '_anthem', { loop: true, volume: 0.4 });
      this.anthem.play();
    } else {
      this.anthem = null;
    }

    // Fallback: simple beep melody when no anthem file is available
    if (!this.anthem) {
      this.anthemInterval = null;
      try {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // 4-note repeating sequence representing the country's "feel"
        var notes = [261, 294, 329, 349]; // C4 D4 E4 F4
        var noteIdx = 0;
        var playNote = function() {
          try {
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = notes[noteIdx % notes.length];
            noteIdx++;
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.4);
          } catch(e) {}
        };
        self.anthemInterval = setInterval(playNote, 600);
        // Stop on scene shutdown
        self.events.once('shutdown', function() {
          if (self.anthemInterval) clearInterval(self.anthemInterval);
          try { audioCtx.close(); } catch(e) {}
        });
      } catch(e) {}
    }

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
      { x: 400,  y: 560 },
      { x: 700,  y: 480 },   // on narrow platform at y=500
      { x: 1000, y: 560 },
      { x: 1400, y: 500 },  // on narrow platform at y=520
      { x: 1800, y: 540 },
      { x: 2400, y: 520 },
      { x: 3000, y: 480 }
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

    // Exit door (green rectangle as visual + static physics body)
    makeTex('door_tex', 0x00ff00, 60, 120);
    this.exitDoor = this.physics.add.staticImage(3760, 650, 'door_tex');
    this.exitDoor.setAlpha(0.3);
    this.exitDoor.refreshBody();
    this.exitLocked = true;
    this.levelCompleted = false;

    // Question blocks (3 blocks for mushroom power-up)
    this.questionBlocks = this.physics.add.staticGroup();
    var blockDefs = [{ x: 600, y: 440 }, { x: 1100, y: 400 }, { x: 2000, y: 380 }];
    blockDefs.forEach(function(b) {
      var blk = self.physics.add.staticImage(b.x, b.y, 'qblock_tex');
      blk.refreshBody();
      self.questionBlocks.add(blk);
    });
    this.mushrooms = [];

    // Virtual d-pad
    this.dpadObjects = [];
    var isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS;
    if (isMobile) {
      var makeBtn = function(x, y, label) {
        var bg = self.add.rectangle(x, y, 70, 70, 0x333333, 0.8).setScrollFactor(0).setDepth(10).setInteractive();
        var txt = self.add.text(x, y, label, { fontFamily: 'Arial', fontSize: '28px', color: '#ffffff' }).setOrigin(0.5).setScrollFactor(0).setDepth(11);
        self.dpadObjects.push(bg, txt);
        return bg;
      };
      var btnLeft = makeBtn(60, 660, '◀');
      btnLeft.on('pointerdown', function() { self.dpadLeft = true; });
      btnLeft.on('pointerup', function() { self.dpadLeft = false; });
      btnLeft.on('pointerout', function() { self.dpadLeft = false; });

      var btnRight = makeBtn(150, 660, '▶');
      btnRight.on('pointerdown', function() { self.dpadRight = true; });
      btnRight.on('pointerup', function() { self.dpadRight = false; });
      btnRight.on('pointerout', function() { self.dpadRight = false; });

      var btnJump = makeBtn(900, 660, '▲');
      btnJump.on('pointerdown', function() { self.dpadJump = true; });
      btnJump.on('pointerup', function() { self.dpadJump = false; });
      btnJump.on('pointerout', function() { self.dpadJump = false; });
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
        this.player.setDisplaySize(32, 48); // shrink back
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
    for (var i = 0; i < this.starTexts.length; i++) {
      this.starTexts[i].setText(i < this.starsEarned ? '★' : '☆');
    }
  },

  unlockExit: function() {
    this.exitLocked = false;
    this.exitDoor.setAlpha(1);
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

    // Check exit
    if (!this.exitLocked && !this.levelCompleted && this.physics.overlap(this.player, this.exitDoor)) {
      this.levelCompleted = true; // guard: prevent firing again while transition queues
      if (this.anthem) this.anthem.stop();
      if (this.anthemInterval) { clearInterval(this.anthemInterval); this.anthemInterval = null; }
      Progress.completeLevel(this.countryId);
      this.scene.start('WinScene', { countryId: this.countryId, continentId: this.continentId });
    }

    // Question block hit (player hits bottom of block from below)
    var self = this;
    this.physics.overlap(this.player, this.questionBlocks, function(player, block) {
      if (player.body.velocity.y < 0 && player.y > block.y) {
        block.destroy();
        // Spawn mushroom
        var mushroom = self.physics.add.image(block.x, block.y - 30, 'enemy_tex');
        mushroom.setDisplaySize(24, 24);
        mushroom.setTint(0xff8800);
        mushroom.setVelocityX(60);
        mushroom.setBounce(0);
        mushroom.setCollideWorldBounds(true);
        self.physics.add.collider(mushroom, self.platforms);
        self.mushrooms.push(mushroom);
        // Collect mushroom on overlap with player
        self.physics.add.overlap(player, mushroom, function() {
          if (mushroom.active) {
            mushroom.destroy();
            SFX.powerUp();
            self.isBig = true;
            self.player.setDisplaySize(32, 64);
          }
        });
      }
    });
  }
});
