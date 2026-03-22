var config = {
  type: Phaser.AUTO,
  backgroundColor: '#1a3a10',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 720
  },
  scene: [StartScene, GameScene, QuizScene, CollectionScene, WinScene]
};

var game = new Phaser.Game(config);
