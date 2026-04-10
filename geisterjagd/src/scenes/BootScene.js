var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'BootScene' }); },
  create: function() { this.scene.start('MenuScene'); }
});
