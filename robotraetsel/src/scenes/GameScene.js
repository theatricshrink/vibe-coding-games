// robotraetsel/src/scenes/GameScene.js

// ─── Robot pixel-art constants ────────────────────────────────────────────────
var ROBOT_CELL = 8;
var ROBOT_X    = 100;  // game-coord left edge of head/body columns
var ROBOT_Y    = 110;  // game-coord top of robot

var ROBOT_PALETTE = {
  'M': 0x8e9aaf,  // main metal (grey-blue)
  'D': 0x4a5568,  // dark accents
  'L': 0xe2e8f0,  // light/shine
  'E': 0x63b3ed,  // glowing eyes (blue)
  'R': 0xe53e3e   // red indicator lights
};

// 6 parts, assembled in order on wrong guesses.
// ox/oy = pixel offset from (ROBOT_X, ROBOT_Y). Each pixel = ROBOT_CELL × ROBOT_CELL.
var ROBOT_PARTS = [
  { id: 'antenna', ox: 20, oy: 0, pixels: [
    ['.','R','.'],
    ['.','D','.'],
    ['.','D','.']
  ]},
  { id: 'head', ox: 0, oy: 24, pixels: [
    ['D','M','M','M','M','M','M','D'],
    ['M','M','M','M','M','M','M','M'],
    ['M','E','E','M','M','E','E','M'],
    ['M','M','M','M','M','M','M','M'],
    ['M','D','L','L','L','L','D','M'],
    ['D','M','M','M','M','M','M','D']
  ]},
  { id: 'body', ox: 0, oy: 72, pixels: [
    ['D','M','M','M','M','M','M','D'],
    ['M','R','M','M','M','M','R','M'],
    ['M','M','M','M','M','M','M','M'],
    ['M','M','M','M','M','M','M','M'],
    ['M','R','M','M','M','M','R','M'],
    ['D','M','M','M','M','M','M','D']
  ]},
  { id: 'left_arm', ox: -24, oy: 72, pixels: [
    ['D','M','M'],
    ['M','M','M'],
    ['M','M','M'],
    ['M','M','M'],
    ['D','M','L']
  ]},
  { id: 'right_arm', ox: 64, oy: 72, pixels: [
    ['M','M','D'],
    ['M','M','M'],
    ['M','M','M'],
    ['M','M','M'],
    ['L','M','D']
  ]},
  { id: 'legs', ox: 0, oy: 120, pixels: [
    ['D','M','M','D','D','M','M','D'],
    ['M','M','M','.','.','M','M','M'],
    ['M','M','M','.','.','M','M','M'],
    ['M','L','M','.','.','M','L','M'],
    ['D','M','D','.','.','D','M','D']
  ]}
];

// ─── Letter rows for on-screen keyboard ───────────────────────────────────────
var LETTERS_DE = [
  ['A','B','C','D','E','F','G','H','I','J'],
  ['K','L','M','N','O','P','Q','R','S','T'],
  ['U','V','W','X','Y','Z','Ä','Ö','Ü']
];
var LETTERS_EN = [
  ['A','B','C','D','E','F','G','H','I','J'],
  ['K','L','M','N','O','P','Q','R','S','T'],
  ['U','V','W','X','Y','Z']
];

// ─── Scene ────────────────────────────────────────────────────────────────────
var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'GameScene' });
  },

  create: function() {
    var W = 960, H = 720;

    // Retrieve persisted best chain
    this._bestChain   = parseInt(localStorage.getItem('robotraetsel_best') || '0', 10);
    this._chainLength = 0;
    this._wrongCount  = 0;
    this._guessed     = {};
    this._hintUsed    = false;
    this._nextLetter  = null;
    this._slotTexts   = [];
    this._slotRects   = [];
    this._keyButtons  = {};

    // ── Static background ──
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a1a2e);
    // Divider between robot area and word area
    this.add.rectangle(308, H / 2, 2, H, 0x2c4a2c);

    // ── Top bar ──
    this.add.rectangle(W / 2, 46, W, 64, 0x0d1a0d);

    var s = STRINGS[LANG];
    this.add.text(20, 46, s.chainLabel, { fontSize: '22px' }).setOrigin(0, 0.5);
    this._chainValueText = this.add.text(62, 46, '0', {
      fontSize: '22px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.add.text(130, 46, s.bestLabel, { fontSize: '22px' }).setOrigin(0, 0.5);
    this._bestValueText = this.add.text(172, 46, String(this._bestChain), {
      fontSize: '22px', color: '#aed9b8'
    }).setOrigin(0, 0.5);

    this._constraintText = this.add.text(W / 2, 46, '', {
      fontSize: '18px', color: '#f5e642'
    }).setOrigin(0.5, 0.5);

    // ── Robot graphics object ──
    this._robotGfx = this.add.graphics();

    // ── "Wrong guesses" label ──
    this._wrongLabel = this.add.text(132, 320, '', {
      fontSize: '16px', color: '#e53e3e'
    }).setOrigin(0.5);

    // ── Category reveal text (shown after hint used) ──
    this._categoryText = this.add.text(630, 95, '', {
      fontSize: '20px', color: '#f5e642', fontStyle: 'italic'
    }).setOrigin(0.5);

    // ── Build keyboard and hint button ──
    this._buildKeyboard();
    this._buildHintButton();

    // ── Start first word ──
    this._wordPool = new WordPool(WORDS, LANG);
    this._startWord();
  },

  // ── Draw robot with numParts assembled ──────────────────────────────────────
  _drawRobot: function(numParts) {
    this._robotGfx.clear();
    for (var p = 0; p < numParts; p++) {
      var part = ROBOT_PARTS[p];
      var grid = part.pixels;
      for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
          var code = grid[r][c];
          if (code === '.') continue;
          this._robotGfx.fillStyle(ROBOT_PALETTE[code], 1);
          this._robotGfx.fillRect(
            ROBOT_X + part.ox + c * ROBOT_CELL,
            ROBOT_Y + part.oy + r * ROBOT_CELL,
            ROBOT_CELL, ROBOT_CELL
          );
        }
      }
    }
    this._wrongLabel.setText(this._wrongCount > 0 ? this._wrongCount + ' / 6' : '');
  },

  // ── Update top-bar dynamic text ─────────────────────────────────────────────
  _updateTopBar: function() {
    var s = STRINGS[LANG];
    this._chainValueText.setText(String(this._chainLength));
    this._bestValueText.setText(String(this._bestChain));
    if (this._nextLetter) {
      this._constraintText.setText(s.nextLabel + ': ' + this._nextLetter);
    } else {
      this._constraintText.setText('');
    }
  },

  // ── Start a new word ────────────────────────────────────────────────────────
  _startWord: function() {
    this._currentWord = this._wordPool.draw(this._chainLength, this._nextLetter);
    this._wrongCount  = 0;
    this._guessed     = {};
    this._hintUsed    = false;
    this._nextLetter  = null;

    this._robotGfx.clear();
    this._wrongLabel.setText('');
    this._categoryText.setText('');
    this._resetHintButton();
    this._buildWordSlots();
    this._resetKeyboard();
    this._updateTopBar();
  },

  // ── Build letter slots for the current word ─────────────────────────────────
  _buildWordSlots: function() {
    var i;
    for (i = 0; i < this._slotTexts.length; i++) { this._slotTexts[i].destroy(); }
    for (i = 0; i < this._slotRects.length; i++) { this._slotRects[i].destroy(); }
    this._slotTexts = [];
    this._slotRects = [];

    var word = this._currentWord.word;
    var n    = word.length;
    var slotW = n <= 8 ? 50 : 38;
    var gap   = n <= 8 ? 8  : 4;
    var totalW = n * slotW + (n - 1) * gap;
    var startX = 630 - totalW / 2;  // 630 = centre of right panel (310-950)
    var slotY  = 220;
    var fontSize = n <= 8 ? '30px' : '22px';

    for (i = 0; i < n; i++) {
      var cx = startX + i * (slotW + gap) + slotW / 2;
      // underline bar
      var rect = this.add.rectangle(cx, slotY + 28, slotW - 4, 3, 0x8888aa);
      // letter text (hidden until guessed)
      var txt = this.add.text(cx, slotY, '', {
        fontSize: fontSize, color: '#ffffff', fontStyle: 'bold'
      }).setOrigin(0.5, 0);
      this._slotTexts.push(txt);
      this._slotRects.push(rect);
    }
  },

  // ── Reveal all correctly-guessed letters in slots ───────────────────────────
  _updateWordSlots: function() {
    var word = this._currentWord.word;
    for (var i = 0; i < word.length; i++) {
      if (this._guessed[word[i]]) {
        this._slotTexts[i].setText(word[i]);
      }
    }
  },

  // ── Reveal ALL letters (called on game over so player sees the word) ─────────
  _revealWord: function() {
    var word = this._currentWord.word;
    for (var i = 0; i < word.length; i++) {
      this._slotTexts[i].setText(word[i]).setColor('#ff9999');
    }
  },

  // ── Check if every letter in the word has been guessed ──────────────────────
  _isWordSolved: function() {
    var word = this._currentWord.word;
    for (var i = 0; i < word.length; i++) {
      if (!this._guessed[word[i]]) return false;
    }
    return true;
  },

  // ── Build on-screen A-Z (+ ÄÖÜ in DE) keyboard ─────────────────────────────
  _buildKeyboard: function() {
    var self  = this;
    var rows  = LANG === 'de' ? LETTERS_DE : LETTERS_EN;
    var BW    = 48, BH = 44, GAP = 4;
    var panelCX = 630;  // horizontal centre of right panel
    var startY  = 330;

    for (var ri = 0; ri < rows.length; ri++) {
      var row    = rows[ri];
      var rowW   = row.length * BW + (row.length - 1) * GAP;
      var startX = panelCX - rowW / 2;

      for (var ci = 0; ci < row.length; ci++) {
        (function(letter, x, y) {
          var bg = self.add.rectangle(x + BW / 2, y + BH / 2, BW - 2, BH - 2, 0x2c5f2e)
            .setInteractive()
            .setStrokeStyle(1, 0x52b788);
          var lbl = self.add.text(x + BW / 2, y + BH / 2, letter, {
            fontSize: '18px', color: '#ffffff'
          }).setOrigin(0.5);

          bg.on('pointerover', function() { bg.setFillStyle(0x3d7a25); });
          bg.on('pointerout',  function() { bg.setFillStyle(0x2c5f2e); });
          bg.on('pointerdown', function() { self._onGuess(letter); });

          self._keyButtons[letter] = { bg: bg, lbl: lbl };
        })(row[ci], startX + ci * (BW + GAP), startY + ri * (BH + GAP));
      }
    }

    // Physical keyboard — A-Z only (umlauts via on-screen buttons)
    this._keydownHandler = function(event) {
      var letter = event.key.toUpperCase();
      if (/^[A-ZÄÖÜ]$/.test(letter)) self._onGuess(letter);
    };
    this.input.keyboard.on('keydown', this._keydownHandler);
  },

  // ── Re-enable all keyboard buttons and reset colours ────────────────────────
  _resetKeyboard: function() {
    for (var letter in this._keyButtons) {
      var btn = this._keyButtons[letter];
      btn.bg.setFillStyle(0x2c5f2e).setInteractive().setAlpha(1);
      btn.lbl.setColor('#ffffff');
    }
  },

  // ── Process a letter guess ──────────────────────────────────────────────────
  _onGuess: function(letter) {
    if (this._guessed[letter]) return;
    if (!this._keyButtons[letter]) return;  // ignore letters not in our alphabet
    this._guessed[letter] = true;

    // Grey out keyboard button
    var btn = this._keyButtons[letter];
    btn.bg.removeInteractive().setFillStyle(0x555555).setAlpha(0.5);
    btn.lbl.setColor('#888888');

    if (this._currentWord.word.indexOf(letter) !== -1) {
      // ── Correct guess ──
      this._updateWordSlots();
      if (this._isWordSolved()) {
        this._onWordSolved();
      }
    } else {
      // ── Wrong guess ──
      this._wrongCount++;
      this._drawRobot(this._wrongCount);
      this._updateHintButtonState();
      if (this._wrongCount >= 6) {
        this._onGameOver();
      }
    }
  },

  // ── Build the hint button ───────────────────────────────────────────────────
  _buildHintButton: function() {
    var self = this;
    var bx   = 630, by = 570;
    this._hintBg = this.add.rectangle(bx, by, 200, 48, 0x1b3a5c)
      .setInteractive()
      .setStrokeStyle(2, 0x63b3ed);
    this._hintLbl = this.add.text(bx, by, STRINGS[LANG].hintBtn, {
      fontSize: '20px', color: '#63b3ed'
    }).setOrigin(0.5);

    this._hintBg.on('pointerover', function() {
      if (self._hintBg.input && self._hintBg.input.enabled) {
        self._hintBg.setFillStyle(0x2a5480);
      }
    });
    this._hintBg.on('pointerout', function() {
      if (self._hintBg.input && self._hintBg.input.enabled) {
        self._hintBg.setFillStyle(0x1b3a5c);
      }
    });
    this._hintBg.on('pointerdown', function() { self._useHint(); });
  },

  // ── Enable/disable hint button based on state ────────────────────────────────
  _resetHintButton: function() {
    this._hintBg.setInteractive().setFillStyle(0x1b3a5c).setAlpha(1);
    this._hintLbl.setColor('#63b3ed');
  },

  _updateHintButtonState: function() {
    // Disable if already used this word, or if using it would trigger game over
    if (this._hintUsed || this._wrongCount >= 5) {
      this._hintBg.removeInteractive().setAlpha(0.35);
      this._hintLbl.setColor('#445566');
    }
  },

  // ── Use the hint: reveal category, add one wrong guess ──────────────────────
  _useHint: function() {
    if (this._hintUsed || this._wrongCount >= 5) return;
    this._hintUsed = true;

    var cat = STRINGS[LANG].categories[this._currentWord.category];
    this._categoryText.setText(STRINGS[LANG].hintUsed + ' ' + cat);

    // Cost: one robot part
    this._wrongCount++;
    this._drawRobot(this._wrongCount);
    this._updateHintButtonState();

    if (this._wrongCount >= 6) {
      this._onGameOver();
    }
  },

  // ── Called when the word is fully guessed ───────────────────────────────────
  _onWordSolved: function() {
    var self = this;
    var word = this._currentWord.word;

    // Flash slots green
    for (var i = 0; i < this._slotTexts.length; i++) {
      this._slotTexts[i].setColor('#52e888');
    }

    // Increment chain and persist best
    this._chainLength++;
    if (this._chainLength > this._bestChain) {
      this._bestChain = this._chainLength;
      localStorage.setItem('robotraetsel_best', String(this._bestChain));
    }

    // Set chain constraint: next word starts with last letter of solved word
    this._nextLetter = word[word.length - 1];

    // Win condition: chain of 10
    if (this._chainLength >= 10) {
      this._updateTopBar();
      this.time.delayedCall(800, function() {
        self.scene.start('WinScene', { best: self._bestChain });
      });
      return;
    }

    this._updateTopBar();
    this.time.delayedCall(1200, function() { self._startWord(); });
  },

  // ── Called when the 6th wrong guess is made ─────────────────────────────────
  _onGameOver: function() {
    var self = this;
    // Disable all input
    for (var letter in this._keyButtons) {
      this._keyButtons[letter].bg.removeInteractive();
    }
    this._hintBg.removeInteractive();

    this._revealWord();

    // Shake the robot graphics
    this.tweens.add({
      targets: this._robotGfx,
      x: '+=12',
      yoyo: true,
      repeat: 4,
      duration: 60,
      onComplete: function() {
        self._robotGfx.setPosition(0, 0); // reset after shake
        self._showTakeover();
      }
    });
  },

  // ── World domination overlay ─────────────────────────────────────────────────
  _showTakeover: function() {
    var self = this;
    var W = 960, H = 720;
    var s = STRINGS[LANG];

    var overlay = this.add.rectangle(W / 2, H / 2, W, H, 0xcc0000, 0.92).setDepth(20);
    var title   = this.add.text(W / 2, H / 2 - 60, s.takeover, {
      fontSize: '58px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(21).setAlpha(0);
    var sub = this.add.text(W / 2, H / 2 + 40, s.takeoverSub, {
      fontSize: '26px', color: '#ffcccc'
    }).setOrigin(0.5).setDepth(21).setAlpha(0);

    this.tweens.add({
      targets: [title, sub], alpha: 1, duration: 300
    });

    this.time.delayedCall(2200, function() {
      overlay.destroy();
      title.destroy();
      sub.destroy();

      // Reset chain
      self._chainLength = 0;
      self._nextLetter  = null;
      self._updateTopBar();
      self._startWord();
    });
  },

  // ── Scene shutdown: remove keyboard listener to prevent accumulation ─────────
  shutdown: function() {
    if (this._keydownHandler) {
      this.input.keyboard.off('keydown', this._keydownHandler);
    }
  }
});
