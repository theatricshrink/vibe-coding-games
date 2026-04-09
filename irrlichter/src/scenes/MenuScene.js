var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'MenuScene' }); },

  create: function() {
    var W = 960, H = 560;
    var cx = W / 2, cy = H / 2;

    // Dark background
    this.add.rectangle(cx, cy, W, H, 0x000000);

    // Subtle grid decoration
    var grid = this.add.graphics();
    grid.lineStyle(1, 0x0a0a20, 1);
    for (var x = 0; x < W; x += 40) grid.lineBetween(x, 0, x, H);
    for (var y = 0; y < H; y += 40) grid.lineBetween(0, y, W, y);

    // Title
    this.add.text(cx, 80, t('title'), {
      fontFamily: 'monospace', fontSize: '56px', color: '#00ffcc',
      stroke: '#003322', strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(cx, 140, t('subtitle'), {
      fontFamily: 'monospace', fontSize: '20px', color: '#558899'
    }).setOrigin(0.5);

    // Split line preview
    var preview = this.add.graphics();
    preview.lineStyle(2, 0x00ffcc, 0.4);
    preview.lineBetween(cx, 175, cx, 385);

    // P1 side label
    this.add.text(cx - 160, 195, t('player1'), {
      fontFamily: 'monospace', fontSize: '22px', color: '#ff8822', fontStyle: 'bold'
    }).setOrigin(0.5);

    // P2 side label
    this.add.text(cx + 160, 195, t('player2'), {
      fontFamily: 'monospace', fontSize: '22px', color: '#44aaff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Controls
    var ctrlStyle = { fontFamily: 'monospace', fontSize: '14px', color: '#aaaacc', align: 'center' };
    this.add.text(cx - 160, 230, t('ctrlP1'), ctrlStyle).setOrigin(0.5);
    this.add.text(cx + 160, 230, t('ctrlP2'), ctrlStyle).setOrigin(0.5);
    this.add.text(cx, 270, t('ctrlTouch'), { fontFamily: 'monospace', fontSize: '13px', color: '#666688' }).setOrigin(0.5);

    // Goal
    this.add.text(cx, 315, t('goal'), {
      fontFamily: 'monospace', fontSize: '15px', color: '#ccccaa', align: 'center'
    }).setOrigin(0.5);

    this.add.text(cx, 345, t('firstTo'), {
      fontFamily: 'monospace', fontSize: '14px', color: '#888866', align: 'center'
    }).setOrigin(0.5);

    // Animated Irrlicht demo
    var irr = this.add.circle(cx, 375, 10, 0x00ffcc);
    var irrGlow = this.add.circle(cx, 375, 22, 0x00ffcc, 0.3);
    this.tweens.add({ targets: irrGlow, scaleX: 2.0, scaleY: 2.0, alpha: 0, duration: 1600, repeat: -1, ease: 'Sine.out' });
    this.tweens.add({ targets: irr, scaleX: 1.15, scaleY: 1.15, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    // Start button
    var btnBg = this.add.rectangle(cx, 450, 220, 52, 0x003322)
      .setStrokeStyle(2, 0x00ffcc)
      .setInteractive({ useHandCursor: true });

    var btnText = this.add.text(cx, 450, t('start'), {
      fontFamily: 'monospace', fontSize: '26px', color: '#00ffcc', fontStyle: 'bold'
    }).setOrigin(0.5);

    btnBg.on('pointerover',  function() { btnBg.setFillColor(0x005533); });
    btnBg.on('pointerout',   function() { btnBg.setFillColor(0x003322); });
    btnBg.on('pointerdown',  function() { btnBg.setFillColor(0x007744); });
    btnBg.on('pointerup',    this.startGame, this);

    // Keyboard shortcut
    this.input.keyboard.once('keydown-ENTER', this.startGame, this);
    this.input.keyboard.once('keydown-SPACE', this.startGame, this);

    // Pulsing start hint
    this.tweens.add({ targets: btnText, alpha: 0.5, duration: 900, yoyo: true, repeat: -1 });
  },

  startGame: function() {
    this.scene.start('GameScene', { round: 0, p1Score: 0, p2Score: 0 });
  }
});
