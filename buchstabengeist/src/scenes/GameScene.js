var MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,1],
  [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
  [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var COLS = 19;
var ROWS = 21;
var TILE = 25;
var MAZE_X = Math.floor((480 - COLS * TILE) / 2);   // 2
var MAZE_Y = 110;                                      // 55 HUD + 55 word bar
var PAC_START_R = 15.5;
var PAC_START_C = 9.5;
var PAC_RADIUS = 10;
var GHOST_RADIUS = 10;
var GHOST_COLORS = [0xff6b9d, 0x6bc5ff, 0xffa94d, 0xa8ff78, 0xd4a0ff, 0xff6b6b];

// Pixel position for an entity at float tile coordinate (r, c).
// Entity coords are in tile-units where 9.5 means "half a tile into row 9".
function entityPixel(r, c) {
  return {
    x: MAZE_X + c * TILE,
    y: MAZE_Y + r * TILE
  };
}

var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameScene' }); },

  init: function(data) {
    this.mode = data.mode || 'challenge';
  },

  create: function() {
    var s = STRINGS[LANG];

    // ── Maze ────────────────────────────────────────────────────────
    this.mazeGfx = this.add.graphics();
    this._drawMaze();

    // ── HUD (y = 0..54) ─────────────────────────────────────────────
    this.titleText = this.add.text(8, 6, s.title, {
      fontFamily: 'monospace', fontSize: '13px', color: '#ff6b9d'
    });
    this.scoreLabel = this.add.text(8, 24, s.score + ': 0', {
      fontFamily: 'monospace', fontSize: '11px', color: '#aaaacc'
    });
    this.levelLabel = this.add.text(8, 38, s.level + ': 1', {
      fontFamily: 'monospace', fontSize: '11px', color: '#aaaacc'
    });
    this.livesText = this.add.text(480 - 8, 6, '❤❤❤', {
      fontFamily: 'monospace', fontSize: '14px', color: '#ff6b6b'
    }).setOrigin(1, 0);
    this.shieldText = this.add.text(480 - 8, 26, '🛡', {
      fontFamily: 'monospace', fontSize: '14px'
    }).setOrigin(1, 0).setVisible(false);

    // ── Word bar (y = 55..109) ───────────────────────────────────────
    this.spellLabel = this.add.text(8, 62, s.spell, {
      fontFamily: 'monospace', fontSize: '12px', color: '#aaaacc'
    });
    this.hintText = this.add.text(8, 92, '', {
      fontFamily: 'monospace', fontSize: '10px', color: '#555577',
      wordWrap: { width: 464 }
    });
    this.wordSlots = [];   // created in _setupWord

    // ── Divider lines ────────────────────────────────────────────────
    var divGfx = this.add.graphics();
    divGfx.lineStyle(1, 0x222244, 1);
    divGfx.lineBetween(0, 54, 480, 54);
    divGfx.lineBetween(0, 109, 480, 109);

    // ── Game state ───────────────────────────────────────────────────
    this.score = 0;
    this.level = 1;
    this.lives = 3;
    this.shield = false;
    this.currentWord = null;
    this.wordProgress = 0;
    this.ghosts = [];
    this.pellets = [];

    // ── Rendering objects (populated in later tasks) ─────────────────
    this.pacGfx   = this.add.graphics();
    this.ghostGfx = this.add.graphics();
    this.pelletGfx = this.add.graphics();
    this.ghostLetters = [];

    // Pac object
    this.pac = {
      r: PAC_START_R, c: PAC_START_C,
      dir: 'left', queuedDir: null,
      stunnedFrames: 0,
      mouthAngle: 0, mouthOpen: true
    };

    // ── Input (keyboard) ────────────────────────────────────────────
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = {
      up:    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    // ── Touch input ─────────────────────────────────────────────────
    this._touchStart = null;
    this.input.on('pointerdown', function(p) {
      this._touchStart = { x: p.x, y: p.y };
    }, this);
    this.input.on('pointerup', function(p) {
      if (!this._touchStart) return;
      var dx = p.x - this._touchStart.x;
      var dy = p.y - this._touchStart.y;
      this._touchStart = null;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        this.pac.queuedDir = dx > 0 ? 'right' : 'left';
      } else {
        this.pac.queuedDir = dy > 0 ? 'down' : 'up';
      }
    }, this);

    // Start first word
    this._startWord();
  },

  _drawMaze: function() {
    var g = this.mazeGfx;
    g.clear();
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        if (MAZE[r][c] === 1) {
          var x = MAZE_X + c * TILE;
          var y = MAZE_Y + r * TILE;
          g.fillStyle(0x090920, 1);
          g.fillRect(x, y, TILE, TILE);
          g.lineStyle(1, 0x2424aa, 1);
          g.strokeRect(x + 1, y + 1, TILE - 2, TILE - 2);
          g.lineStyle(1, 0x3c3cc8, 0.18);
          g.strokeRect(x + 3, y + 3, TILE - 6, TILE - 6);
        }
      }
    }
  },

  _startWord: function() {
    var lastWord = this.currentWord ? this.currentWord.word : null;
    this.currentWord = pickWord(WORDS, lastWord);
    this.wordProgress = 0;
    this._createWordSlots();
    this.hintText.setText(this.currentWord.hint);
    this._spawnGhosts();
    if (this.mode === 'challenge') this._spawnPellets();
    this._updateHUD();
  },

  _createWordSlots: function() {
    // Clear old slots
    this.wordSlots.forEach(function(t) { t.destroy(); });
    this.wordSlots = [];

    var word = this.currentWord.word;
    var slotW = 22;
    var totalW = word.length * slotW;
    var startX = 480 / 2 - totalW / 2;

    for (var i = 0; i < word.length; i++) {
      var ch = this.mode === 'guided'
        ? word[i]      // shown faintly
        : '_';         // hidden
      var slot = this.add.text(startX + i * slotW, 62, ch, {
        fontFamily: 'monospace', fontSize: '18px',
        color: this.mode === 'guided' ? '#444466' : '#aaaacc'
      });
      this.wordSlots.push(slot);
    }
  },

  _updateHUD: function() {
    var s = STRINGS[LANG];
    this.scoreLabel.setText(s.score + ': ' + this.score);
    this.levelLabel.setText(s.level + ': ' + this.level);
    var hearts = '';
    for (var i = 0; i < this.lives; i++) hearts += '❤';
    this.livesText.setText(hearts);
    this.shieldText.setVisible(this.mode === 'challenge' && this.shield);
  },

  _spawnGhosts: function() {},
  _spawnPellets: function() {},

  _updateInput: function() {
    var dirs = ['up','down','left','right'];
    var keys = {
      up:    this.cursors.up.isDown    || this.wasd.up.isDown,
      down:  this.cursors.down.isDown  || this.wasd.down.isDown,
      left:  this.cursors.left.isDown  || this.wasd.left.isDown,
      right: this.cursors.right.isDown || this.wasd.right.isDown
    };
    for (var i = 0; i < dirs.length; i++) {
      if (keys[dirs[i]]) { this.pac.queuedDir = dirs[i]; break; }
    }
  },

  _updatePac: function() {
    var pac = this.pac;

    if (pac.stunnedFrames > 0) {
      pac.stunnedFrames--;
      return;
    }

    var tileR = Math.round(pac.r);
    var tileC = Math.round(pac.c);
    var aligned = Math.abs(pac.r - tileR) < 0.15 && Math.abs(pac.c - tileC) < 0.15;

    if (aligned) {
      // Snap to tile centre to prevent drift
      pac.r = tileR;
      pac.c = tileC;

      // Apply queued direction if valid
      if (pac.queuedDir && canMove(MAZE, tileR, tileC, pac.queuedDir)) {
        pac.dir = pac.queuedDir;
        pac.queuedDir = null;
      }

      // Stop if wall ahead
      if (!canMove(MAZE, tileR, tileC, pac.dir)) return;
    }

    var d = DIR_DELTA[pac.dir];
    pac.r += d.dr * 0.09;
    pac.c += d.dc * 0.09;

    // Tunnel wrap
    if (pac.c < -0.5) pac.c = COLS - 0.5;
    if (pac.c > COLS - 0.5) pac.c = -0.5;

    // Animate mouth
    if (pac.mouthOpen) {
      pac.mouthAngle += 0.06;
      if (pac.mouthAngle >= 0.42) pac.mouthOpen = false;
    } else {
      pac.mouthAngle -= 0.06;
      if (pac.mouthAngle <= 0) pac.mouthOpen = true;
    }
  },

  _drawPac: function() {
    var pac = this.pac;
    var g = this.pacGfx;
    g.clear();

    var p = entityPixel(pac.r, pac.c);
    var stunned = pac.stunnedFrames > 0;
    var color = stunned ? 0x888888 : 0xffe066;

    // Rotation angle based on direction
    var rot = { right: 0, down: Math.PI/2, left: Math.PI, up: -Math.PI/2 };
    var angle = rot[pac.dir] || 0;
    var mouth = stunned ? 0.42 : pac.mouthAngle;

    g.fillStyle(color, 1);
    g.beginPath();
    g.arc(p.x, p.y, PAC_RADIUS, angle + mouth, angle + Math.PI * 2 - mouth, false);
    g.lineTo(p.x, p.y);
    g.closePath();
    g.fillPath();
  },

  update: function() {
    this._updateInput();
    this._updatePac();
    this._drawPac();
  }
});
