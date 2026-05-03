var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function() {
    Phaser.Scene.call(this, { key: 'GameScene' });
  },

  create: function(data) {
    var W = 480, H = 854;
    this._mode = data.mode || 'easy';
    this._startY = 720;
    this._pixelsPerMetre = 5;
    this._currentHeight = 0;
    this._highestPlatformY = this._startY + 30;
    this._gameActive = true;
    this._correctJustLanded = false;
    this._landingQueue = [];
    this._currentLevelY = this._startY;
    this._deathZoneY = (this._mode === 'hard') ? this._startY + 800 : null;
    this._deathZoneGraphic = (this._mode === 'hard') ? this.add.graphics().setDepth(8) : null;

    this._difficulty = DifficultyManager.create();
    var self = this;
    this._difficulty.onTierChange(function(tier) {
      self._showZoneBanner(tier);
      self._updateBgColor(tier);
    });

    this._bg = this.add.rectangle(W / 2, H / 2, W, H, 0x0d1b2a).setScrollFactor(0).setDepth(0);

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

    this._astronaut = this.physics.add.sprite(W / 2, this._startY, 'astronaut');
    this._astronaut.setCollideWorldBounds(false);
    this._astronaut.setDepth(5);

    this._flame = this.add.graphics().setDepth(4);

    this._cursors = this.input.keyboard.createCursorKeys();
    this._spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this._touchLeft   = false;
    this._touchRight  = false;
    this._touchThrust = false;
    this._setupTouchInput();

    PlatformPool.init(this);
    this._spawnInitialRows();
    this._setupCollider();
    this._buildHUD();

    this._zoneBanner = this.add.text(W / 2, 120, '', {
      fontSize: '20px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold',
      backgroundColor: '#000000aa', padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20).setAlpha(0);
  },

  _setupTouchInput: function() {
    var self = this;
    this.input.on('pointerdown', function() { self._updateTouchButtons(); });
    this.input.on('pointerup',   function() { self._updateTouchButtons(); });
    this.input.on('pointermove', function(ptr) { if (ptr.isDown) self._updateTouchButtons(); });
  },

  _updateTouchButtons: function() {
    var W = 480, H = 854, BTN_Y = H - 100;
    this._touchLeft   = false;
    this._touchThrust = false;
    this._touchRight  = false;
    var pointers = this.input.manager.pointers;
    for (var i = 0; i < pointers.length; i++) {
      var ptr = pointers[i];
      if (!ptr.isDown || ptr.y < BTN_Y) continue;
      if      (ptr.x < W / 3)       this._touchLeft   = true;
      else if (ptr.x < 2 * W / 3)   this._touchThrust = true;
      else                           this._touchRight  = true;
    }
  },

  _spawnInitialRows: function() {
    for (var i = 0; i < 10; i++) {
      var alt = Math.max(0, Math.floor((this._startY - this._highestPlatformY) / this._pixelsPerMetre));
      PlatformPool.getNextRow(this._highestPlatformY, this._difficulty.getTier(alt), i === 0);
      this._highestPlatformY -= 250;
    }
  },

  _setupCollider: function() {
    var self = this;
    PlatformPool.getPlatformGroup().forEach(function(plat) {
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
    if (platform.isNeutral) {
      this._currentLevelY = platform.y;
      return;
    }
    // Queue for batch resolution in update() — correct beats wrong even if wrong fires first
    this._landingQueue.push(platform);
  },

  _resolveLandingQueue: function() {
    if (this._landingQueue.length === 0) return;
    var queue = this._landingQueue;
    this._landingQueue = [];
    if (this._correctJustLanded) return;

    var correct = null;
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].isCorrect) { correct = queue[i]; break; }
    }
    if (correct) {
      correct.isCorrect = false;
      correct.isNeutral = true;
      this._correctJustLanded = true;
      this._currentLevelY = correct.y;
      this._correctLanding(correct);
    } else {
      this._wrongLanding(queue[0]);
    }
  },

  _wrongLanding: function(platform) {
    this._crumblePlatform(platform);
    this._triggerGameOver();
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

  _correctLanding: function(platform) {
    var self = this;

    // Flash white then settle to green
    platform.setTint(0xffffff);
    this.time.delayedCall(90, function() { platform.setTint(0x00cc55); });

    // Dismiss wrong platforms and clear correctJustLanded after brief window
    var row = PlatformPool.getRowForPlatform(platform);
    if (row) {
      for (var j = 1; j <= 3; j++) {
        var p = row.platforms[j];
        if (p === platform) {
          row.labels[j].setText('✓ ' + row.labels[j].text);
        } else {
          p.body.enable = false;
          self._dismissWrongPlatform(p, row.labels[j]);
        }
      }
    }
    this.time.delayedCall(400, function() { self._correctJustLanded = false; });
  },

  _dismissWrongPlatform: function(platform, label) {
    if (label) { label.setVisible(false); label.setPosition(-9999, -9999); }
    var flyX = platform.x < 240 ? platform.x - 180 : platform.x + 180;
    this.tweens.add({
      targets: platform,
      x: flyX, alpha: 0, scaleX: 0.3, scaleY: 0.3,
      duration: 350, ease: 'Power2',
      onComplete: function() {
        platform.body.enable = true;
        platform.setAlpha(1);
        platform.setScale(1);
        platform.setPosition(-9999, -9999);
        platform.body.reset(-9999, -9999);
      }
    });
  },

  _buildHUD: function() {
    var W = 480, H = 854;

    this.add.rectangle(W / 2, 35, W, 60, 0x000000, 0.65).setScrollFactor(0).setDepth(15);
    this._questionText = this.add.text(W / 2, 35, '', {
      fontSize: '28px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(16);

    this._heightText = this.add.text(12, 70, '🚀 0m', {
      fontSize: '18px', color: '#aed9b8', fontFamily: 'Arial'
    }).setScrollFactor(0).setDepth(16);

    // Jetpack control buttons fixed to bottom of screen
    var btnY = H - 38;
    var btnW = W / 3 - 6;
    var btnH = 68;

    this.add.rectangle(W / 6,     btnY, btnW, btnH, 0x1a2a4a, 0.6).setScrollFactor(0).setDepth(15);
    this.add.rectangle(W / 2,     btnY, btnW, btnH, 0x1a3a1a, 0.6).setScrollFactor(0).setDepth(15);
    this.add.rectangle(5 * W / 6, btnY, btnW, btnH, 0x1a2a4a, 0.6).setScrollFactor(0).setDepth(15);

    this.add.text(W / 6,     btnY, '◀', { fontSize: '30px', color: '#aed9b8', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(16);
    this.add.text(W / 2,     btnY, '🚀', { fontSize: '30px', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(16);
    this.add.text(5 * W / 6, btnY, '▶', { fontSize: '30px', color: '#aed9b8', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(16);

    this._refreshQuestion();
  },

  _refreshQuestion: function() {
    var rows = PlatformPool.getAllRows();
    if (rows.length === 0) return;
    var astroY = this._astronaut.y;
    // Show question for nearest answer zone that is above the astronaut (row.yPos - 200 < astroY).
    // This transitions immediately when the astronaut lands on the correct answer.
    var nearest = null, nearestDist = Infinity;
    rows.forEach(function(row) {
      var ansY = row.yPos - 200;
      if (ansY < astroY) {
        var dist = astroY - ansY;
        if (dist < nearestDist) { nearestDist = dist; nearest = row; }
      }
    });
    if (!nearest) {
      rows.forEach(function(row) {
        var dist = Math.abs(row.yPos - 200 - astroY);
        if (dist < nearestDist) { nearestDist = dist; nearest = row; }
      });
    }
    if (nearest) this._questionText.setText(nearest.question);
  },

  _showZoneBanner: function(tier) {
    this._zoneBanner.setText(t('zoneT' + tier));
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

  update: function(time, delta) {
    if (!this._gameActive) return;

    this._resolveLandingQueue();

    // Hard mode: rising gravitational death zone
    if (this._deathZoneGraphic) {
      var riseSpeed = (60 + this._currentHeight * 0.05) * (delta / 1000);
      this._deathZoneY -= riseSpeed;

      if (this._astronaut.y > this._deathZoneY) {
        this._triggerGameOver();
        return;
      }

      var pulse = 0.55 + 0.45 * Math.sin(time * 0.006);
      this._deathZoneGraphic.clear();
      this._deathZoneGraphic.fillStyle(0x0d0020, 0.88);
      this._deathZoneGraphic.fillRect(0, this._deathZoneY, 480, 2000);
      this._deathZoneGraphic.lineStyle(6, 0xaa00ff, pulse);
      this._deathZoneGraphic.lineBetween(0, this._deathZoneY, 480, this._deathZoneY);
      this._deathZoneGraphic.lineStyle(2, 0xff66ff, pulse * 0.6);
      this._deathZoneGraphic.lineBetween(0, this._deathZoneY - 8, 480, this._deathZoneY - 8);
    }

    // Horizontal movement
    var vx = 0;
    if (this._cursors.left.isDown  || this._touchLeft)  vx = -180;
    if (this._cursors.right.isDown || this._touchRight) vx =  180;
    this._astronaut.body.setVelocityX(vx);

    // Jetpack thrust — ceiling is 260px above the last platform landed on
    var thrusting = this._touchThrust || this._spaceKey.isDown || this._cursors.up.isDown;
    if (thrusting && this._astronaut.y > this._currentLevelY - 280) {
      this._astronaut.body.setVelocityY(Math.max(this._astronaut.body.velocity.y - 15, -200));
    }

    // Cap fall speed
    if (this._astronaut.body.velocity.y > 350) {
      this._astronaut.body.setVelocityY(350);
    }

    // Jetpack flame (drawn in world space, positioned over astronaut)
    this._flame.clear();
    if (thrusting) {
      var fx = this._astronaut.x, fy = this._astronaut.y + 26;
      this._flame.fillStyle(0xff6600, 0.9);
      this._flame.fillCircle(fx - 7, fy, 4 + Math.random() * 4);
      this._flame.fillStyle(0xffcc00, 0.7);
      this._flame.fillCircle(fx + 7, fy, 3 + Math.random() * 3);
    }

    // Screen wrap
    if (this._astronaut.x < -20)  this._astronaut.x = 500;
    if (this._astronaut.x > 500)  this._astronaut.x = -20;

    // Camera: follow astronaut
    this.cameras.main.scrollY = this._astronaut.y - 500;

    // Height
    var h = Math.max(0, Math.floor((this._startY - this._astronaut.y) / this._pixelsPerMetre));
    if (h !== this._currentHeight) {
      this._currentHeight = h;
      this._heightText.setText('🚀 ' + h + t('metres'));
      this._difficulty.update(h);
    }

    // Spawn new rows ahead of camera; tier based on platform altitude; no neutral after row 0
    var camTop = this.cameras.main.scrollY;
    while (this._highestPlatformY > camTop - 500) {
      var platAlt = Math.max(0, Math.floor((this._startY - this._highestPlatformY) / this._pixelsPerMetre));
      PlatformPool.getNextRow(this._highestPlatformY, this._difficulty.getTier(platAlt), false);
      this._highestPlatformY -= 250;
    }

    // Recycle rows below camera; track lowest surviving neutral for fall detection
    var camBottom = camTop + 854;
    var lowestNeutralY = this._startY + 30;
    var self = this;
    PlatformPool.getAllRows().forEach(function(row) {
      if (row.yPos > camBottom + 200) {
        PlatformPool.recycleRow(row);
      } else if (row.yPos > lowestNeutralY) {
        lowestNeutralY = row.yPos;
      }
    });

    this._refreshQuestion();

    if (this._astronaut.y > lowestNeutralY + 300 && this._gameActive) {
      this._onFallOffScreen();
    }
  },

  _onFallOffScreen: function() {
    if (!this._gameActive) return;
    this.cameras.main.shake(120, 0.005);
    this._triggerGameOver();
  }
});
