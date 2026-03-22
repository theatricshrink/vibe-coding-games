// weltreise/src/main.js
var config = {
  type: Phaser.AUTO,
  width: 960,
  height: 720,
  backgroundColor: '#0d1b2a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: [BootScene, MenuScene, WorldMapScene, LevelSelectScene, GameScene, QuestionScene, GameOverScene, WinScene]
};

var game = new Phaser.Game(config);

// iOS audio unlock — resume AudioContext on first user gesture, then remove listener
function onFirstGesture() {
  if (game.sound && game.sound.context) {
    game.sound.context.resume();
  }
  document.removeEventListener('click', onFirstGesture);
  document.removeEventListener('touchstart', onFirstGesture);
}
document.addEventListener('click', onFirstGesture);
document.addEventListener('touchstart', onFirstGesture);

// Service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/weltreise/service-worker.js');
  });
}
