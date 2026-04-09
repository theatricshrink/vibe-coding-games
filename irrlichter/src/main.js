var config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 560
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene]
};

var game = new Phaser.Game(config);
