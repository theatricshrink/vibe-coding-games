var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function() {
    Phaser.Scene.call(this, { key: 'GameOverScene' });
  },

  create: function(data) {
    var W = 480, H = 854;
    var mode      = data.mode   || 'normal';
    var height    = data.height || 0;
    var tier      = data.tier   || 1;

    // Save best score
    var bestKey = 'mathronaut_best_' + mode;
    var prev = parseInt(localStorage.getItem(bestKey)) || 0;
    var isNewBest = height > prev;
    if (isNewBest) localStorage.setItem(bestKey, height);

    // Background
    this.add.rectangle(W / 2, H / 2, W, H, 0x050510);

    // Stars
    for (var i = 0; i < 80; i++) {
      var sx = Phaser.Math.Between(0, W);
      var sy = Phaser.Math.Between(0, H);
      this.add.circle(sx, sy, Phaser.Math.Between(1, 2), 0xffffff,
        Phaser.Math.FloatBetween(0.2, 0.8));
    }

    // Floating astronaut (bouncing tween)
    var astro = this.add.circle(W / 2, 220, 42, 0xffffff);
    this.add.circle(W / 2, 208, 26, 0x87ceeb);
    this.tweens.add({ targets: [astro], y: 230, yoyo: true, repeat: -1, duration: 1200, ease: 'Sine.easeInOut' });

    // Game over title
    this.add.text(W / 2, 310, t('gameOver'), {
      fontSize: '44px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Height
    this.add.text(W / 2, 385, t('height') + ': ' + height + t('metres'), {
      fontSize: '28px', color: '#ffffff', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // New best indicator
    if (isNewBest) {
      this.add.text(W / 2, 425, '★ ' + t('best') + '! ★', {
        fontSize: '22px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5);
    } else {
      var bestVal = Math.max(prev, height);
      this.add.text(W / 2, 425, t('best') + ': ' + bestVal + t('metres'), {
        fontSize: '20px', color: '#aed9b8', fontFamily: 'Arial'
      }).setOrigin(0.5);
    }

    // Zone reached
    var tierNames = t('tierNames');
    var zoneName = tierNames[tier - 1] || tierNames[0];
    this.add.text(W / 2, 468, t('tierReached') + ': ' + zoneName, {
      fontSize: '18px', color: '#aed9b8', fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Retry button
    var self = this;
    var retryBtn = this.add.text(W / 2, 570, t('retry'), {
      fontSize: '30px', color: '#f5e642', fontFamily: 'Arial', fontStyle: 'bold',
      backgroundColor: '#1a4d2e', padding: { x: 24, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    retryBtn.on('pointerdown', function() { self.scene.start('StartScene'); });
    retryBtn.on('pointerover', function() { retryBtn.setColor('#ffffff'); });
    retryBtn.on('pointerout',  function() { retryBtn.setColor('#f5e642'); });

    // Back button
    var backBtn = this.add.text(W / 2, 652, t('back'), {
      fontSize: '20px', color: '#52b788', fontFamily: 'Arial',
      padding: { x: 16, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', function() { window.location.href = '../index.html'; });
    backBtn.on('pointerover', function() { backBtn.setColor('#ffffff'); });
    backBtn.on('pointerout',  function() { backBtn.setColor('#52b788'); });
  }
});
