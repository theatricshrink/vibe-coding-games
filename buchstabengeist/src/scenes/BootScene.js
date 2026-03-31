var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'BootScene' }); },
  create: function() {
    // Unlock audio on first interaction
    this.input.once('pointerdown', function() { AudioManager.unlock(); });
    this.scene.start('MenuScene');
  }
});
