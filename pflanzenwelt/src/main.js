var config = {
  type: Phaser.AUTO,
  width: 960,
  height: 720,
  backgroundColor: '#1a3a10',
  scene: [StartScene, GameScene, QuizScene, CollectionScene, WinScene]
};

var game = new Phaser.Game(config);
