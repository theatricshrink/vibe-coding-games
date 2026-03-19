var QuizScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function QuizScene() {
    Phaser.Scene.call(this, { key: 'QuizScene' });
  },

  init: function(data) {
    this._creature = data.creature;
    this._questions = data.questions;
    this._onComplete = data.onComplete;
    this._currentQ = 0;
    this._answered = false;
  },

  create: function() {
    var W = 960, H = 720;

    this._bg = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.65);

    this._panel = this.add.rectangle(W / 2, 440, 760, 360, 0x1a1a2e, 1);

    this._creatureText = this.add.text(W / 2, 130, this._creature.emoji, {
      fontSize: '80px'
    }).setOrigin(0.5);

    this._creatureName = this.add.text(W / 2, 230, this._creature.name, {
      fontSize: '32px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this._questionText = this.add.text(W / 2, 315, '', {
      fontSize: '26px', color: '#ffffff', wordWrap: { width: 700 }, align: 'center'
    }).setOrigin(0.5);

    this._buttons = [];
    this._buttonLabels = ['A', 'B', 'C', 'D'];
    var positions = [
      { x: 310, y: 410 }, { x: 650, y: 410 },
      { x: 310, y: 500 }, { x: 650, y: 500 }
    ];
    var self = this;
    for (var i = 0; i < 4; i++) {
      (function(idx) {
        var btn = self.add.rectangle(positions[idx].x, positions[idx].y, 300, 70, 0x2c5f2e)
          .setInteractive();
        var label = self.add.text(positions[idx].x, positions[idx].y, '', {
          fontSize: '22px', color: '#ffffff', wordWrap: { width: 270 }, align: 'center'
        }).setOrigin(0.5);
        self._wireButton(btn, idx);
        self._buttons.push({ rect: btn, label: label });
      })(i);
    }

    this.input.keyboard.on('keydown-A', function() { self._onAnswer('A'); });
    this.input.keyboard.on('keydown-B', function() { self._onAnswer('B'); });
    this.input.keyboard.on('keydown-C', function() { self._onAnswer('C'); });
    this.input.keyboard.on('keydown-D', function() { self._onAnswer('D'); });

    this._showQuestion();
  },

  _wireButton: function(btn, idx) {
    var self = this;
    btn.removeAllListeners();
    btn.on('pointerover', function() { btn.setFillStyle(0x3d7a25); });
    btn.on('pointerout',  function() { btn.setFillStyle(0x2c5f2e); });
    btn.on('pointerdown', function() { self._onAnswer(self._buttonLabels[idx]); });
  },

  _showQuestion: function() {
    var q = this._questions[this._currentQ];
    this._questionText.setText(q.frage);
    for (var i = 0; i < 4; i++) {
      this._buttons[i].label.setText(this._buttonLabels[i] + ') ' + q.optionen[i]);
    }
  },

  _onAnswer: function(letter) {
    if (this._answered) return;
    this._answered = true;
    this.input.keyboard.removeAllListeners();
    for (var i = 0; i < this._buttons.length; i++) {
      this._buttons[i].rect.removeInteractive();
    }

    var q = this._questions[this._currentQ];
    if (letter === q.antwort) {
      this._correct();
    } else {
      this._wrong();
    }
  },

  _correct: function() {
    var self = this;
    this._panel.setFillStyle(0x1e7e34);
    var isLast = this._currentQ >= this._questions.length - 1;
    var feedbackText = isLast ? 'Gefangen! 🎉' : '✓ Richtig!';
    var txt = this.add.text(480, 610, feedbackText, {
      fontSize: '36px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: txt,
      y: 580,
      alpha: 1,
      duration: 300,
      onComplete: function() {
        self.time.delayedCall(900, function() {
          self._currentQ++;
          if (self._currentQ < self._questions.length) {
            txt.destroy();
            self._panel.setFillStyle(0x1a1a2e);
            self.input.keyboard.on('keydown-A', function() { self._onAnswer('A'); });
            self.input.keyboard.on('keydown-B', function() { self._onAnswer('B'); });
            self.input.keyboard.on('keydown-C', function() { self._onAnswer('C'); });
            self.input.keyboard.on('keydown-D', function() { self._onAnswer('D'); });
            for (var i = 0; i < self._buttons.length; i++) {
              self._buttons[i].rect.setInteractive();
              self._wireButton(self._buttons[i].rect, i);
            }
            self._answered = false;
            self._showQuestion();
          } else {
            self._close(true);
          }
        });
      }
    });
  },

  _wrong: function() {
    var self = this;
    this._panel.setFillStyle(0x7b1e1e);
    this.add.text(480, 610, 'Tschüss! 👋', {
      fontSize: '36px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this._creatureText,
      x: '+=30',
      yoyo: true,
      repeat: 2,
      duration: 80,
      onComplete: function() {
        self.tweens.add({
          targets: self._creatureText,
          alpha: 0,
          duration: 400,
          onComplete: function() {
            self.time.delayedCall(600, function() {
              self._close(false);
            });
          }
        });
      }
    });
  },

  _close: function(caught) {
    var onComplete = this._onComplete; // capture before scene.stop() clears state
    this.input.keyboard.removeAllListeners();
    this.scene.stop();
    this.scene.resume('GameScene');
    onComplete(caught);
  }
});
