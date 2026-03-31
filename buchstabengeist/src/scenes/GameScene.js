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

  _spawnGhosts: function() {
    // Destroy old letter Text objects
    this.ghostLetters.forEach(function(t) { t.destroy(); });
    this.ghostLetters = [];
    this.ghosts = [];

    var word = this.currentWord.word;
    var openCells = [];
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        if (MAZE[r][c] === 0) openCells.push({ r: r, c: c });
      }
    }

    for (var i = 0; i < word.length; i++) {
      // Find cell away from pac start and previous ghosts
      var cell = null;
      for (var attempt = 0; attempt < 200; attempt++) {
        var candidate = openCells[Math.floor(Math.random() * openCells.length)];
        var distPac = Math.abs(candidate.r - PAC_START_R) + Math.abs(candidate.c - PAC_START_C);
        if (distPac < 6) continue;
        var tooClose = false;
        for (var j = 0; j < this.ghosts.length; j++) {
          if (Math.abs(candidate.r - this.ghosts[j].r) + Math.abs(candidate.c - this.ghosts[j].c) < 3) {
            tooClose = true; break;
          }
        }
        if (!tooClose) { cell = candidate; break; }
      }
      if (!cell) cell = openCells[Math.floor(Math.random() * openCells.length)];

      var dirs = ['up','down','left','right'];
      var startDir = dirs[Math.floor(Math.random() * dirs.length)];

      this.ghosts.push({
        r: cell.r + 0.5, c: cell.c + 0.5,
        dir: startDir,
        wordIdx: i,
        eaten: false,
        scared: false,
        scaredUntil: 0,
        baseSpeed: 0.038 + i * 0.003 + (this.level - 1) * 0.004,
        color: GHOST_COLORS[i % GHOST_COLORS.length]
      });

      this.ghostLetters.push(
        this.add.text(0, 0, word[i], {
          fontFamily: 'monospace', fontSize: '13px',
          color: '#ffffff', stroke: '#000000', strokeThickness: 2
        }).setOrigin(0.5)
      );
    }
  },
  _spawnPellets: function() {
    this.pellets = [];
    // One pellet per quadrant: top-left, top-right, bottom-left, bottom-right
    var quadrants = [
      { rMin: 1, rMax: 9,  cMin: 1, cMax: 8  },
      { rMin: 1, rMax: 9,  cMin: 10, cMax: 17 },
      { rMin: 11, rMax: 19, cMin: 1, cMax: 8  },
      { rMin: 11, rMax: 19, cMin: 10, cMax: 17 }
    ];
    quadrants.forEach(function(q) {
      var candidates = [];
      for (var r = q.rMin; r <= q.rMax; r++) {
        for (var c = q.cMin; c <= q.cMax; c++) {
          if (MAZE[r][c] === 0) candidates.push({ r: r, c: c });
        }
      }
      if (candidates.length > 0) {
        this.pellets.push(candidates[Math.floor(Math.random() * candidates.length)]);
      }
    }, this);
  },

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

    var tileR = Math.floor(pac.r);
    var tileC = Math.floor(pac.c);
    var centerR = tileR + 0.5;
    var centerC = tileC + 0.5;
    var aligned = Math.abs(pac.r - centerR) < 0.15 && Math.abs(pac.c - centerC) < 0.15;

    if (aligned) {
      // Snap to tile centre to prevent drift
      pac.r = centerR;
      pac.c = centerC;

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

  _updateGhosts: function() {
    var now = this.time.now;
    var pac = this.pac;
    var guided = this.mode === 'guided';

    for (var i = 0; i < this.ghosts.length; i++) {
      var g = this.ghosts[i];
      if (g.eaten) continue;

      // Update scared state
      if (g.scared && now > g.scaredUntil) g.scared = false;

      var tileR = Math.floor(g.r);
      var tileC = Math.floor(g.c);
      var centerR = tileR + 0.5;
      var centerC = tileC + 0.5;
      var aligned = Math.abs(g.r - centerR) < 0.12 && Math.abs(g.c - centerC) < 0.12;

      if (aligned) {
        g.r = centerR;
        g.c = centerC;
        g.dir = chooseGhostDir(MAZE, g, pac, g.scared);
      }

      var speed = g.baseSpeed * (g.scared ? 0.45 : 1) * (guided ? 0.85 : 1);
      var d = DIR_DELTA[g.dir];
      g.r += d.dr * speed;
      g.c += d.dc * speed;

      // Tunnel wrap
      if (g.c < -0.5) g.c = COLS - 0.5;
      if (g.c > COLS - 0.5) g.c = -0.5;
    }
  },

  _drawGhosts: function() {
    var now = this.time.now;
    var gfx = this.ghostGfx;
    gfx.clear();

    var nextIdx = getNextTargetIdx(this.ghosts);
    var guided = this.mode === 'guided';

    for (var i = 0; i < this.ghosts.length; i++) {
      var gh = this.ghosts[i];
      if (gh.eaten) {
        this.ghostLetters[i].setVisible(false);
        continue;
      }

      var p = entityPixel(gh.r, gh.c);
      var R = GHOST_RADIUS;

      // Next-target halo
      if (i === nextIdx) {
        var haloAlpha = guided
          ? 0.4 + 0.2 * Math.sin(now * 0.006)
          : 0.22;
        gfx.fillStyle(0xffe066, haloAlpha);
        gfx.fillCircle(p.x, p.y, R + 5);
      }

      // Scared flash
      var flash = gh.scared && now > gh.scaredUntil - 600 && Math.floor(now / 100) % 2 === 0;
      var bodyColor = gh.scared ? (flash ? 0xffffff : 0x3333bb) : gh.color;

      // Ghost body: circle top + rect body + cut-out scallops
      gfx.fillStyle(bodyColor, 1);
      gfx.fillCircle(p.x, p.y, R);
      gfx.fillRect(p.x - R, p.y, R * 2, R * 1.3);

      // Scallop cut-outs (background colour)
      gfx.fillStyle(0x080818, 1);
      var scR = R / 3;
      gfx.fillCircle(p.x - R * 0.66, p.y + R * 1.3, scR);
      gfx.fillCircle(p.x,             p.y + R * 1.3, scR);
      gfx.fillCircle(p.x + R * 0.66, p.y + R * 1.3, scR);

      // Eyes (hidden when scared)
      if (!gh.scared) {
        gfx.fillStyle(0xffffff, 1);
        gfx.fillCircle(p.x - R * 0.32, p.y - R * 0.1, R * 0.28);
        gfx.fillCircle(p.x + R * 0.32, p.y - R * 0.1, R * 0.28);
        var eyeShift = { up:[0,-0.18], down:[0,0.18], left:[-0.18,0], right:[0.18,0] };
        var es = eyeShift[gh.dir] || [0,0];
        gfx.fillStyle(0x0033cc, 1);
        gfx.fillCircle(p.x - R*0.32 + es[0]*R, p.y - R*0.1 + es[1]*R, R*0.14);
        gfx.fillCircle(p.x + R*0.32 + es[0]*R, p.y - R*0.1 + es[1]*R, R*0.14);
      }

      // Position letter text
      this.ghostLetters[i].setVisible(!gh.scared);
      this.ghostLetters[i].setPosition(p.x, p.y + 1);
    }
  },

  _scatterGhosts: function() {
    var now = this.time.now;
    for (var i = 0; i < this.ghosts.length; i++) {
      if (!this.ghosts[i].eaten) {
        this.ghosts[i].scared = true;
        this.ghosts[i].scaredUntil = now + 2000;
      }
    }
  },

  _stunPac: function() {
    this.pac.stunnedFrames = 55;
    this.pac.mouthAngle = 0.42;
  },

  _loseLife: function() {
    this.lives--;
    this._updateHUD();
    if (this.lives <= 0) {
      this.time.delayedCall(600, function() {
        this.ghostLetters.forEach(function(t) { t.destroy(); });
        this.scene.start('GameOverScene', { score: this.score, lang: LANG });
      }, [], this);
    }
  },

  _handleWordComplete: function() {
    this.score = Math.max(0, this.score + calcScoreDelta('wordComplete', this.level));
    AudioManager.wordComplete();
    var self = this;

    var flash = this.add.text(240, 330, STRINGS[LANG].wordComplete, {
      fontFamily: 'monospace', fontSize: '28px', color: '#f5e642',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(10);
    this.tweens.add({
      targets: flash,
      scaleX: { from: 0, to: 1 }, scaleY: { from: 0, to: 1 },
      alpha: { from: 1, to: 0 },
      duration: 1100, ease: 'Back.Out',
      onComplete: function() { flash.destroy(); }
    });

    this.time.delayedCall(1300, function() {
      self.level++;
      self._startWord();
    });
  },

  _fillWordSlot: function(idx) {
    if (idx >= this.wordSlots.length) return;
    var slot = this.wordSlots[idx];
    slot.setText(this.currentWord.word[idx]);
    slot.setColor('#f5e642');
    this.tweens.add({
      targets: slot,
      scaleX: { from: 0, to: 1 }, scaleY: { from: 0, to: 1 },
      duration: 200, ease: 'Back.Out'
    });
  },

  _shakeSlot: function(idx) {
    if (idx >= this.wordSlots.length) return;
    var slot = this.wordSlots[idx];
    var origX = slot.x;
    this.tweens.add({
      targets: slot,
      x: { from: origX - 5, to: origX + 5 },
      duration: 60, yoyo: true, repeat: 3,
      onComplete: function() { slot.setX(origX); }
    });
  },

  _checkCollisions: function() {
    if (this.pac.stunnedFrames > 0) return;

    var pac = this.pac;
    var now = this.time.now;
    var nextIdx = getNextTargetIdx(this.ghosts);

    for (var i = 0; i < this.ghosts.length; i++) {
      var gh = this.ghosts[i];
      if (gh.eaten) continue;

      if (!ghostOverlapsPac(pac, gh)) continue;

      if (!gh.scared) {
        if (gh.wordIdx === nextIdx) {
          gh.eaten = true;
          this.wordProgress++;
          this.score = Math.max(0, this.score + calcScoreDelta('correctEat', this.level));
          AudioManager.correctEat(this.wordProgress - 1);
          this._fillWordSlot(gh.wordIdx);
          this._updateHUD();

          if (this.wordProgress >= this.currentWord.word.length) {
            this._handleWordComplete();
          }
        } else {
          if (this.mode === 'challenge') {
            if (this.shield) {
              this.shield = false;
              AudioManager.shieldUsed();
              this._scatterGhosts();
              this._stunPac();
              this._updateHUD();
            } else {
              this.score = Math.max(0, this.score + calcScoreDelta('wrongEat', this.level));
              AudioManager.wrongEat();
              this._scatterGhosts();
              this._stunPac();
              this._shakeSlot(nextIdx);
              this._loseLife();
            }
          } else {
            AudioManager.wrongEat();
            this._scatterGhosts();
            this._stunPac();
            this._shakeSlot(nextIdx);
          }
        }
        return;
      }
    }
  },

  _drawPellets: function() {
    var gfx = this.pelletGfx;
    gfx.clear();
    if (this.mode !== 'challenge') return;
    var now = this.time.now;
    var pulse = 7 + 2 * Math.sin(now * 0.004);

    this.pellets.forEach(function(pel) {
      if (pel.collected) return;
      var p = entityPixel(pel.r + 0.5, pel.c + 0.5);
      gfx.fillStyle(0xfffbb0, 0.9);
      gfx.fillCircle(p.x, p.y, pulse);
      gfx.lineStyle(2, 0xffe066, 0.6);
      gfx.strokeCircle(p.x, p.y, pulse + 3);
    });
  },

  _checkPellets: function() {
    if (this.mode !== 'challenge') return;
    var pac = this.pac;
    for (var i = 0; i < this.pellets.length; i++) {
      var pel = this.pellets[i];
      if (pel.collected) continue;
      var distR = Math.abs(pac.r - (pel.r + 0.5));
      var distC = Math.abs(pac.c - (pel.c + 0.5));
      if (distR < 0.55 && distC < 0.55) {
        pel.collected = true;
        if (this.shield) {
          this.score = Math.max(0, this.score + calcScoreDelta('sparePellet', this.level));
        } else {
          this.shield = true;
        }
        AudioManager.powerPellet();
        this._updateHUD();
      }
    }
  },

  update: function() {
    this._updateInput();
    this._updatePac();
    this._updateGhosts();
    this._checkCollisions();
    this._checkPellets();
    this._drawPac();
    this._drawGhosts();
    this._drawPellets();
  }
});
