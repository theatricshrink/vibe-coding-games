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

    // Handle missing assets silently
    this.load.on('loaderror', function(file) {
      console.warn('Asset not found (ok): ' + file.key);
    });
  },

  create: function() {
    var self = this;

    // World & background
    this.physics.world.setBounds(0, 0, 3840, 720);
    this.cameras.main.setBounds(0, 0, 3840, 720);

    if (this.textures.exists(this.countryId + '_bg')) {
      this.add.image(0, 0, this.countryId + '_bg').setOrigin(0, 0).setScrollFactor(0);
    } else {
      this.add.rectangle(480, 360, 960, 720, 0x1a3a6e).setScrollFactor(0);
    }

    // Platforms
    this.platforms = this.physics.add.staticGroup();

    // Ground: full width
    this.platforms.add(this.add.rectangle(1920, 710, 3840, 20, 0x5a3e1a).setOrigin(0.5, 0.5));

    // Floating platforms at varied positions
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
      var rect = self.add.rectangle(p.x, p.y, p.w, 20, 0x5a3e1a);
      self.platforms.add(rect);
    });

    // Refresh all static bodies after adding
    this.platforms.refresh();

    // Player (placeholder rectangle as physics body)
    this.player = this.physics.add.image(100, 580, '__DEFAULT');
    this.player.setDisplaySize(32, 48);
    this.player.setTint(0x00aaff);
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1);
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
      var e = self.physics.add.image(def.x, def.y, '__DEFAULT');
      e.setDisplaySize(32, 32);
      e.setTint(0xff4444);
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

    // Exit door
    this.exitDoor = this.add.rectangle(3760, 650, 60, 120, 0x00ff00);
    this.exitDoor.setAlpha(0.3);
    this.physics.add.existing(this.exitDoor, true); // static
    this.exitLocked = true;

    // Question blocks (3 blocks for mushroom power-up)
    this.questionBlocks = this.physics.add.staticGroup();
    var blockDefs = [{ x: 600, y: 440 }, { x: 1100, y: 400 }, { x: 2000, y: 380 }];
    blockDefs.forEach(function(b) {
      var blk = self.add.rectangle(b.x, b.y, 40, 40, 0xffcc00);
      self.questionBlocks.add(blk);
    });
    this.questionBlocks.refresh();
    this.mushrooms = [];

    // Virtual d-pad
    this.dpadObjects = [];
    var isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS;
    if (isMobile) {
      var makeBtn = function(x, y, label) {
        var bg = self.add.rectangle(x, y, 70, 70, 0x333333, 0.8).setScrollFactor(0).setDepth(10).setInteractive();
        var txt = self.add.text(x, y, label, { fontFamily: 'Arial', fontSize: '28px', color: '#ffffff' }).setOrigin(0.5).setScrollFactor(0).setDepth(11);
        bg.on('pointerdown', function() { return bg; }); // set in specific handlers below
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
    if (!this.exitLocked && this.physics.overlap(this.player, this.exitDoor)) {
      if (this.anthem) this.anthem.stop();
      Progress.completeLevel(this.countryId);
      this.scene.start('WinScene', { countryId: this.countryId, continentId: this.continentId });
    }

    // Question block hit (player hits bottom of block from below)
    var self = this;
    this.physics.overlap(this.player, this.questionBlocks, function(player, block) {
      if (player.body.velocity.y < 0 && player.y > block.y) {
        block.destroy();
        // Spawn mushroom
        var mushroom = self.physics.add.image(block.x, block.y - 30, '__DEFAULT');
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
            self.isBig = true;
            self.player.setDisplaySize(32, 64);
          }
        });
      }
    });
  }
});
