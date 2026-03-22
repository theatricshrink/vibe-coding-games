var QuestionScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function QuestionScene() {
    Phaser.Scene.call(this, { key: 'QuestionScene' });
  },

  init: function(data) {
    this.question = data.question;
    this.enemyId = data.enemyId;
    this.onResult = data.onResult;
  },

  create: function() {
    var self = this;

    // Semi-transparent dark overlay
    this.add.rectangle(480, 360, 960, 720, 0x000000, 0.75);

    // Question text (bilingual via LANG global)
    this.add.text(480, 160, this.question[LANG].q, {
      fontFamily: 'Arial',
      fontSize: '26px',
      color: '#ffffff',
      wordWrap: { width: 820 },
      align: 'center'
    }).setOrigin(0.5);

    // 4 answer buttons
    var options = this.question[LANG].options;
    var correctIndex = this.question[LANG].answer;
    var yPositions = [300, 380, 460, 540];

    options.forEach(function(optText, i) {
      var btn = self.add.rectangle(480, yPositions[i], 700, 60, 0x2196F3).setInteractive();
      var label = self.add.text(480, yPositions[i], optText, {
        fontFamily: 'Arial',
        fontSize: '22px',
        color: '#ffffff',
        wordWrap: { width: 660 }
      }).setOrigin(0.5);

      btn.on('pointerover', function() { btn.setFillStyle(0x1565c0); });
      btn.on('pointerout', function() { btn.setFillStyle(0x2196F3); });
      btn.on('pointerdown', function() {
        var correct = (i === correctIndex);
        if (correct) { SFX.correct(); } else { SFX.wrong(); }
        // Sequence: stop self → resume GameScene → call onResult
        self.scene.stop();
        self.scene.resume('GameScene');
        self.onResult(correct);
      });
    });
  }
});
