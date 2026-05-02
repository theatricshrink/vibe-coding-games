var config = {
  type: Phaser.AUTO,
  backgroundColor: '#0d1b2a',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 480,
    height: 854
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 400 }, debug: false }
  },
  scene: [StartScene, GameScene, GameOverScene]
};

var game = new Phaser.Game(config);
