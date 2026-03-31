var config = {
  type: Phaser.AUTO,
  backgroundColor: '#080818',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 480,
    height: 660
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene]
};

var game = new Phaser.Game(config);
