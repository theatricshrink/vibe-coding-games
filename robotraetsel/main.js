// robotraetsel/main.js
var config = {
  type: Phaser.AUTO,
  backgroundColor: '#1a1a2e',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 720
  },
  scene: [StartScene, GameScene, WinScene]
};

var game = new Phaser.Game(config);
