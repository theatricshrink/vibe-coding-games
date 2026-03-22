var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: 'BootScene' });
  },

  preload: function() {
    // Assets loaded per-level in GameScene to avoid loading all 23 upfront
  },

  create: function() {
    this.scene.start('MenuScene');
  }
});
