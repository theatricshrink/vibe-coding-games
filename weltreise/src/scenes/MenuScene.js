var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function MenuScene() {
    Phaser.Scene.call(this, { key: 'MenuScene' });
  },

  create: function() {
    var self = this;

    // Dark background
    this.add.rectangle(480, 360, 960, 720, 0x0d1b2a);

    // Title
    var titleText = (LANG === 'de') ? 'Weltreise' : 'World Tour';
    this.add.text(480, 200, titleText, {
      fontFamily: 'Arial',
      fontSize: '64px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Subtitle
    var subtitleText = (LANG === 'de') ? 'Ein Geografie-Abenteuer' : 'A Geography Adventure';
    this.add.text(480, 280, subtitleText, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#aaaaaa'
    }).setOrigin(0.5);

    // Play button
    var playBg = this.add.rectangle(480, 400, 200, 50, 0x2196F3).setInteractive();
    var playLabel = (LANG === 'de') ? 'Spielen' : 'Play';
    var playText = this.add.text(480, 400, playLabel, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    playBg.on('pointerover', function() { playBg.setFillStyle(0x1565c0); });
    playBg.on('pointerout', function() { playBg.setFillStyle(0x2196F3); });
    playBg.on('pointerdown', function() { self.scene.start('WorldMapScene'); });

    playText.on('pointerover', function() { playBg.setFillStyle(0x1565c0); });
    playText.on('pointerout', function() { playBg.setFillStyle(0x2196F3); });
    playText.on('pointerdown', function() { self.scene.start('WorldMapScene'); });

    // Language toggle button
    var langBg = this.add.rectangle(480, 480, 200, 50, 0x2196F3).setInteractive();
    var langLabel = (LANG === 'de') ? 'Sprache: DE' : 'Language: EN';
    var langText = this.add.text(480, 480, langLabel, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    langBg.on('pointerover', function() { langBg.setFillStyle(0x1565c0); });
    langBg.on('pointerout', function() { langBg.setFillStyle(0x2196F3); });
    langBg.on('pointerdown', function() {
      LANG = (LANG === 'de') ? 'en' : 'de';
      localStorage.setItem('pgame_lang', LANG);
      self.scene.restart();
    });

    langText.on('pointerover', function() { langBg.setFillStyle(0x1565c0); });
    langText.on('pointerout', function() { langBg.setFillStyle(0x2196F3); });
    langText.on('pointerdown', function() {
      LANG = (LANG === 'de') ? 'en' : 'de';
      localStorage.setItem('pgame_lang', LANG);
      self.scene.restart();
    });
  }
});
