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

    // D-pad booleans (set by virtual d-pad in Task 9)
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
  }
});
