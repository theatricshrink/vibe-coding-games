var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function() {
    Phaser.Scene.call(this, { key: 'GameScene' });
  },

  create: function(data) {
    var W = 480, H = 854;
    this._mode = data.mode || 'normal';
    this._lives = 3;
    this._startY = 750;
    this._pixelsPerMetre = 5;
    this._currentHeight = 0;
    this._highestPlatformY = this._startY - 130;
    this._gameActive = true;

    // DifficultyManager instance
    this._difficulty = DifficultyManager.create();
    var self = this;
    this._difficulty.onTierChange(function(tier) {
      self._showZoneBanner(tier);
      self._updateBgColor(tier);
    });

    // Background rectangle (fixed to camera)
    this._bg = this.add.rectangle(W / 2, H / 2, W, H, 0x0d1b2a).setScrollFactor(0).setDepth(0);

    // Astronaut texture
    if (!this.textures.exists('astronaut')) {
      var g = this.add.graphics();
      g.fillStyle(0xffffff);
      g.fillCircle(20, 22, 18);
      g.fillStyle(0x87ceeb);
      g.fillCircle(20, 16, 11);
      g.fillStyle(0x333333);
      g.fillRect(12, 34, 5, 8);
      g.fillRect(23, 34, 5, 8);
      g.generateTexture('astronaut', 40, 44);
      g.destroy();
    }

    // Astronaut physics body
    this._astronaut = this.physics.add.sprite(W / 2, this._startY, 'astronaut');
    this._astronaut.setCollideWorldBounds(false);
    this._astronaut.body.setGravityY(0);
    this._astronaut.setDepth(5);

    // Camera: manual control — only scrolls up
    this._minScrollY = this.cameras.main.scrollY;

    // Keyboard input
    this._cursors = this.input.keyboard.createCursorKeys();

    // Touch input state
    this._touchLeft  = false;
    this._touchRight = false;
    this.input.on('pointerdown', function(ptr) {
      if (ptr.x < W / 2) self._touchLeft  = true;
      else                self._touchRight = true;
    });
    this.input.on('pointerup', function(ptr) {
      if (ptr.x < W / 2) self._touchLeft  = false;
      else                self._touchRight = false;
    });

    // Platform pool
    PlatformPool.init(this);
    this._spawnInitialRows();

    // Physics collider between astronaut and all pool platforms
    this._setupCollider();

    // HUD (all setScrollFactor(0))
    this._buildHUD();

    // Zone banner text (hidden initially)
    this._zoneBanner = this.add.text(W / 2, 110, '', {
      fontSize: '20px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold',
      backgroundColor: '#000000aa', padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20).setAlpha(0);
  },

  _spawnInitialRows: function() {
    var tier = this._difficulty.getTier(0);
    for (var i = 0; i < 12; i++) {
      PlatformPool.getNextRow(this._highestPlatformY, tier);
      this._highestPlatformY -= 130;
    }
  },

  _setupCollider: function() {
    var self = this;
    var allPlatforms = PlatformPool.getPlatformGroup();
    allPlatforms.forEach(function(plat) {
      self.physics.add.collider(
        self._astronaut, plat,
        function(astro, p) { self._onLand(astro, p); },
        function(astro, p) { return astro.body.velocity.y > 0; },
        self
      );
    });
  },

  _onLand: function(astronaut, platform) {
    if (!this._gameActive) return;
    if (platform.isCorrect) {
      astronaut.body.setVelocityY(-750);
      this._flashPlatform(platform, 0x00ff88);
      this._spawnStarBurst(platform.x, platform.y);
    } else {
      this._wrongLanding(platform);
    }
  },

  _wrongLanding: function(platform) {
    this._crumblePlatform(platform);
    if (this._mode === 'hard') {
      this._triggerGameOver();
    } else {
      this._lives--;
      this._updateHearts();
      if (this._lives <= 0) {
        this._triggerGameOver();
      } else {
        this._respawnAbove(platform.y);
      }
    }
  },

  _crumblePlatform: function(platform) {
    var self = this;
    this.tweens.add({
      targets: platform,
      alpha: 0, y: platform.y + 120,
      duration: 500, ease: 'Power1',
      onComplete: function() {
        platform.setAlpha(1);
        platform.setPosition(-9999, -9999);
        platform.body.reset(-9999, -9999);
        platform.isCorrect = false;
      }
    });
    this.cameras.main.shake(120, 0.005);
    this._astronaut.setTint(0xff4444);
    this.time.delayedCall(300, function() { self._astronaut.clearTint(); });
  },

  _respawnAbove: function(failedY) {
    this._astronaut.setPosition(240, failedY - 200);
    this._astronaut.body.setVelocityY(-600);
  },

  _triggerGameOver: function() {
    if (!this._gameActive) return;
    this._gameActive = false;
    var self = this;
    this.time.delayedCall(600, function() {
      self.scene.start('GameOverScene', {
        mode: self._mode,
        height: self._currentHeight,
        tier: self._difficulty.getTier(self._currentHeight)
      });
    });
  },

  _flashPlatform: function(platform, color) {
    platform.setTint(color);
    this.time.delayedCall(200, function() { platform.clearTint(); });
  },

  _spawnStarBurst: function(x, y) {
    for (var i = 0; i < 6; i++) {
      var angle = (Math.PI * 2 / 6) * i;
      var star = this.add.circle(x, y, 4, 0xf5e642).setDepth(10);
      this.tweens.add({
        targets: star,
        x: x + Math.cos(angle) * 40,
        y: y + Math.sin(angle) * 40,
        alpha: 0, scale: 0,
        duration: 350, ease: 'Power2',
        onComplete: function() { star.destroy(); }
      });
    }
  },

  _buildHUD: function() {
    var W = 480;
    // Question band background
    this.add.rectangle(W / 2, 35, W, 60, 0x000000, 0.65).setScrollFactor(0).setDepth(15);

    // Question text
    this._questionText = this.add.text(W / 2, 35, '', {
      fontSize: '28px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(16);

    // Height display
    this._heightText = this.add.text(12, 70, '🚀 0m', {
      fontSize: '18px', color: '#aed9b8', fontFamily: 'Arial'
    }).setScrollFactor(0).setDepth(16);

    // Hearts (Normal mode only)
    this._heartsText = this.add.text(W - 12, 70, '', {
      fontSize: '20px', fontFamily: 'Arial'
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(16);
    this._updateHearts();

    // Show first question
    this._refreshQuestion();
  },

  _updateHearts: function() {
    if (this._mode === 'normal') {
      this._heartsText.setText('❤️'.repeat(this._lives));
    }
  },

  _refreshQuestion: function() {
    var rows = PlatformPool.getAllRows();
    if (rows.length === 0) return;
    var camTop = this.cameras.main.scrollY;
    var nearest = null;
    var nearestDist = Infinity;
    rows.forEach(function(row) {
      var dist = Math.abs(row.yPos - camTop);
      if (dist < nearestDist) { nearestDist = dist; nearest = row; }
    });
    if (nearest) this._questionText.setText(nearest.question);
  },

  _showZoneBanner: function(tier) {
    var key = 'zoneT' + tier;
    this._zoneBanner.setText(t(key));
    this._zoneBanner.setAlpha(1);
    this.tweens.add({
      targets: this._zoneBanner,
      alpha: 0, duration: 2000, delay: 1500, ease: 'Power1'
    });
  },

  _updateBgColor: function(tier) {
    var colors = [0x0d1b2a, 0x1a0a2e, 0x050510, 0x000005];
    var self = this;
    this.tweens.addCounter({
      from: 0, to: 1, duration: 2000,
      onUpdate: function(tween) {
        var v = tween.getValue();
        var from = colors[tier - 2] || colors[0];
        var to   = colors[tier - 1];
        var r  = Math.floor(Phaser.Math.Linear((from >> 16) & 0xff, (to >> 16) & 0xff, v));
        var g2 = Math.floor(Phaser.Math.Linear((from >> 8)  & 0xff, (to >> 8)  & 0xff, v));
        var b  = Math.floor(Phaser.Math.Linear( from        & 0xff,  to        & 0xff, v));
        self._bg.setFillStyle((r << 16) | (g2 << 8) | b);
      }
    });
  },

  update: function() {
    if (!this._gameActive) return;

    var HSPEED = 220;
    var vx = 0;
    if (this._cursors.left.isDown  || this._touchLeft)  vx = -HSPEED;
    if (this._cursors.right.isDown || this._touchRight) vx =  HSPEED;
    this._astronaut.body.setVelocityX(vx);

    // Screen wrap
    if (this._astronaut.x < -20)  this._astronaut.x = 500;
    if (this._astronaut.x > 500)  this._astronaut.x = -20;

    // Camera: only scroll up
    var targetScrollY = this._astronaut.y - 680;
    if (targetScrollY < this._minScrollY) {
      this._minScrollY = targetScrollY;
      this.cameras.main.scrollY = this._minScrollY;
    }

    // Update height
    var h = Math.max(0, Math.floor((this._startY - this._astronaut.y) / this._pixelsPerMetre));
    if (h !== this._currentHeight) {
      this._currentHeight = h;
      this._heightText.setText('🚀 ' + h + t('metres'));
      this._difficulty.update(h);
    }

    // Spawn new rows as camera scrolls up
    var camTop = this.cameras.main.scrollY;
    while (this._highestPlatformY > camTop - 400) {
      var tier = this._difficulty.getTier(this._currentHeight);
      PlatformPool.getNextRow(this._highestPlatformY, tier);
      this._highestPlatformY -= 130;
    }

    // Recycle rows below camera
    var camBottom = camTop + 854;
    var self = this;
    PlatformPool.getAllRows().forEach(function(row) {
      if (row.yPos > camBottom + 200) {
        PlatformPool.recycleRow(row);
      }
    });

    // Refresh question display
    this._refreshQuestion();

    // Detect fall off screen bottom
    if (this._astronaut.y > camBottom + 50 && this._gameActive) {
      this._onFallOffScreen();
    }
  },

  _onFallOffScreen: function() {
    if (!this._gameActive) return;
    this.cameras.main.shake(120, 0.005);
    if (this._mode === 'hard') {
      this._triggerGameOver();
    } else {
      this._lives--;
      this._updateHearts();
      if (this._lives <= 0) {
        this._triggerGameOver();
      } else {
        // Respawn near top of current camera view
        this._astronaut.setPosition(240, this.cameras.main.scrollY + 300);
        this._astronaut.body.setVelocityY(-600);
      }
    }
  }
});
