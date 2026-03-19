var config = {
  type: Phaser.AUTO,
  width: 960,
  height: 720,
  backgroundColor: '#2d5a27',
  scene: [GameScene, QuizScene, CollectionScene]
};

var game = new Phaser.Game(config);
