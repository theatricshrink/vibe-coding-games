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
  { id: 'antenna', ox: 28, oy: 0, pixels: [
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
    this.add.rectangle(W / 2, 32, W, 64, 0x0d1a0d);

    var s = STRINGS[LANG];
    this.add.text(20, 32, s.chainLabel, { fontSize: '22px' }).setOrigin(0, 0.5);
    this._chainValueText = this.add.text(44, 32, '0', {
      fontSize: '22px', color: '#f5e642', fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.add.text(130, 32, s.bestLabel, { fontSize: '22px' }).setOrigin(0, 0.5);
    this._bestValueText = this.add.text(154, 32, String(this._bestChain), {
      fontSize: '22px', color: '#aed9b8'
    }).setOrigin(0, 0.5);

    this._constraintText = this.add.text(W / 2, 32, '', {
      fontSize: '18px', color: '#f5e642'
    }).setOrigin(0.5, 0.5);

    // ── Robot graphics object ──
    this._robotGfx = this.add.graphics();

    // ── "Wrong guesses" label ──
    this._wrongLabel = this.add.text(154, 320, '', {
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
  }
});
