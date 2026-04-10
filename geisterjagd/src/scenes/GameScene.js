var LEVEL_CONFIG = [
  { ghosts: 3, speed: 1.5, colors: ['red', 'blue'] },
  { ghosts: 4, speed: 1.8, colors: ['red', 'blue'] },
  { ghosts: 5, speed: 2.0, colors: ['red', 'blue'] },
  { ghosts: 5, speed: 2.2, colors: ['red', 'blue', 'green'] },
  { ghosts: 6, speed: 2.5, colors: ['red', 'blue', 'green'] },
  { ghosts: 7, speed: 2.8, colors: ['red', 'blue', 'green'] },
  { ghosts: 8, speed: 3.0, colors: ['red', 'blue', 'green', 'orange'] },
  { ghosts: 9, speed: 3.3, colors: ['red', 'blue', 'green', 'orange'] },
  { ghosts:10, speed: 3.6, colors: ['red', 'blue', 'green', 'orange'] },
  { ghosts:12, speed: 4.0, colors: ['red', 'blue', 'green', 'orange'] }
];
var GHOST_HEX = { red: 0xff4444, blue: 0x44aaff, green: 0x44ff88, orange: 0xffaa22 };
var CELL_SIZE = 16;
var GCOLS = 60;
var GROWS = 35;

var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameScene' }); },

  init: function(data) {
    this.difficulty = data.difficulty || 'easy';
    this.score      = data.score      || 0;
    this.levelNum   = data.level      || 1;
    this.lives      = (this.difficulty === 'easy') ? 3 : 1;
  },

  create: function() {
    Audio.init();
    this.board = new BoardGrid(GCOLS, GROWS);

    // Graphics layers
    this.bgGraphics    = this.add.graphics(); // claimed cells fill
    this.drawGraphics  = this.add.graphics(); // live drawing line
    this.ghostGraphics = this.add.graphics(); // ghost circles
    this.overlayGfx    = this.add.graphics(); // flash overlays

    this._drawBoard();

    // Player starts at top-left corner of interior (on border)
    this.player = { col: 0, row: 1 };
    this.playerSprite = this.add.circle(
      this.player.col * CELL_SIZE + CELL_SIZE / 2,
      this.player.row * CELL_SIZE + CELL_SIZE / 2,
      5, 0xffffff
    );
    this.playerGlow = this.add.circle(
      this.playerSprite.x, this.playerSprite.y, 9, 0xffffff, 0.3
    );

    this.isDrawing = false;

    // Movement timing
    this.moveTimer    = 0;
    this.moveInterval = 1 / 8; // seconds between moves (keyboard repeat speed)

    // Cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Ghosts
    this.ghosts      = [];
    this.ghostSprites = [];
    this.ghostTimer  = 0;
    this._spawnGhosts();

    // HUD
    this._createHUD();

    // Mobile D-pad
    this._createDpad();

    // Input direction from d-pad
    this.dpadDir = { dx: 0, dy: 0 };
  },

  _getLevelConfig: function() {
    var idx = Math.min(this.levelNum - 1, LEVEL_CONFIG.length - 1);
    return LEVEL_CONFIG[idx];
  },

  _drawBoard: function() {
    var gfx = this.bgGraphics;
    gfx.clear();
    // Border
    gfx.fillStyle(0x334433, 1);
    for (var c = 0; c < GCOLS; c++) {
      gfx.fillRect(c * CELL_SIZE, 0,                   CELL_SIZE, CELL_SIZE);
      gfx.fillRect(c * CELL_SIZE, (GROWS-1) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    for (var r = 1; r < GROWS - 1; r++) {
      gfx.fillRect(0,                    r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      gfx.fillRect((GCOLS-1) * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    // Interior claimed cells (initially none beyond border)
    gfx.fillStyle(0x223322, 1);
    for (var cc = 1; cc < GCOLS - 1; cc++) {
      for (var rr = 1; rr < GROWS - 1; rr++) {
        if (this.board.isClaimed(cc, rr)) {
          gfx.fillRect(cc * CELL_SIZE, rr * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
  },

  _spawnGhosts: function() {
    var cfg    = this._getLevelConfig();
    var colors = cfg.colors;
    this.ghosts       = [];
    this.ghostSprites = [];
    this.ghostTimers  = [];
    var ghostSpeed = cfg.speed; // steps per second
    for (var i = 0; i < cfg.ghosts; i++) {
      // Random interior unclaimed position
      var col, row, attempts = 0;
      do {
        col = 2 + Math.floor(Math.random() * (GCOLS - 4));
        row = 2 + Math.floor(Math.random() * (GROWS - 4));
        attempts++;
      } while (this.board.get(col, row) !== CELL_UNCLAIMED && attempts < 200);

      var color = colors[i % colors.length];
      var ghost = new GhostAI(col, row, color);
      this.ghosts.push(ghost);
      this.ghostTimers.push(0);

      var px = col * CELL_SIZE + CELL_SIZE / 2;
      var py = row * CELL_SIZE + CELL_SIZE / 2;
      var circle = this.add.circle(px, py, 6, GHOST_HEX[color] || 0xffffff);
      var glow   = this.add.circle(px, py, 10, GHOST_HEX[color] || 0xffffff, 0.3);
      this.tweens.add({ targets: glow, scaleX: 1.8, scaleY: 1.8, alpha: 0, duration: 900 + i * 100, repeat: -1, ease: 'Sine.out' });
      this.ghostSprites.push({ circle: circle, glow: glow });
    }
  },

  _createHUD: function() {
    // HUD rendered on top of game area (960×560). Use a semi-transparent strip at top.
    // Score (top-left), Level (top-center), Lives (top-right)
    this.hudScore = this.add.text(8, 4, t('score') + ': 0', {
      fontFamily: 'monospace', fontSize: '13px', color: '#cccccc'
    });
    this.hudLevel = this.add.text(480, 4, t('level') + ': ' + this.levelNum, {
      fontFamily: 'monospace', fontSize: '13px', color: '#cccccc'
    }).setOrigin(0.5, 0);
    this.hudLives = this.add.text(952, 4, '', {
      fontFamily: 'monospace', fontSize: '13px', color: '#ff8888'
    }).setOrigin(1, 0);
    this._updateHUD();
  },

  _updateHUD: function() {
    this.hudScore.setText(t('score') + ': ' + this.score);
    this.hudLevel.setText(t('level') + ': ' + this.levelNum);
    if (this.difficulty === 'easy') {
      this.hudLives.setText('👻'.repeat(this.lives));
    } else {
      this.hudLives.setText(t('hard'));
    }
  },

  _createDpad: function() {
    var self  = this;
    var bSize = 44;
    var cx    = 480;
    var cy    = 530;

    function makeBtn(x, y, label, dx, dy) {
      var btn = self.add.rectangle(x, y, bSize, bSize, 0x222233)
        .setStrokeStyle(1, 0x666688)
        .setAlpha(0.7)
        .setInteractive({ useHandCursor: true });
      self.add.text(x, y, label, {
        fontFamily: 'monospace', fontSize: '18px', color: '#aaaacc'
      }).setOrigin(0.5);
      btn.on('pointerdown', function() { self.dpadDir = { dx: dx, dy: dy }; });
      btn.on('pointerup',   function() { self.dpadDir = { dx: 0,  dy: 0  }; });
      btn.on('pointerout',  function() { self.dpadDir = { dx: 0,  dy: 0  }; });
    }

    makeBtn(cx,           cy - bSize - 4, '▲', 0, -1);
    makeBtn(cx,           cy + bSize + 4, '▼', 0,  1);
    makeBtn(cx - bSize - 4, cy,           '◀',-1,  0);
    makeBtn(cx + bSize + 4, cy,           '▶', 1,  0);
  },

  _getInputDir: function() {
    if (this.cursors.left.isDown)  return { dx: -1, dy:  0 };
    if (this.cursors.right.isDown) return { dx:  1, dy:  0 };
    if (this.cursors.up.isDown)    return { dx:  0, dy: -1 };
    if (this.cursors.down.isDown)  return { dx:  0, dy:  1 };
    if (this.dpadDir.dx !== 0 || this.dpadDir.dy !== 0) return this.dpadDir;
    return null;
  },

  _movePlayer: function(dx, dy) {
    var nc = this.player.col + dx;
    var nr = this.player.row + dy;
    if (!this.board.isInBounds(nc, nr)) return;
    var cellState = this.board.get(nc, nr);

    // Cannot move into claimed cells (except border when not drawing)
    if (cellState === CELL_CLAIMED) {
      if (this.isDrawing) {
        // Close area
        this._closeArea();
      }
      // Stay on border — allow movement along claimed edge
      // Let player move to claimed cell (border/claimed territory is walkable)
      this.player.col = nc;
      this.player.row = nr;
      Audio.playTick();
      return;
    }

    // Cannot cross own drawing line
    if (cellState === CELL_DRAWING) return;

    if (!this.isDrawing && cellState === CELL_UNCLAIMED) {
      // Start drawing
      this.isDrawing = true;
      this.board.startDrawing(nc, nr);
    } else if (this.isDrawing && cellState === CELL_UNCLAIMED) {
      this.board.addDrawing(nc, nr);
    }

    this.player.col = nc;
    this.player.row = nr;
    Audio.playTick();
    this._redrawDrawLine();
  },

  _redrawDrawLine: function() {
    var gfx = this.drawGraphics;
    gfx.clear();
    gfx.fillStyle(0xffffff, 0.9);
    for (var i = 0; i < this.board.drawingCells.length; i++) {
      var cell = this.board.drawingCells[i];
      gfx.fillRect(cell.col * CELL_SIZE + 4, cell.row * CELL_SIZE + 4, CELL_SIZE - 8, CELL_SIZE - 8);
    }
  },

  _updatePlayerSprite: function() {
    var px = this.player.col * CELL_SIZE + CELL_SIZE / 2;
    var py = this.player.row * CELL_SIZE + CELL_SIZE / 2;
    this.playerSprite.setPosition(px, py);
    this.playerGlow.setPosition(px, py);
  },

  _closeArea: function() {
    var ghostPositions = this.ghosts.map(function(g) {
      return { col: g.col, row: g.row, color: g.color };
    });
    var result = this.board.closeArea(ghostPositions);
    this.isDrawing = false;

    // Remove trapped ghosts
    for (var ri = 0; ri < result.regions.length; ri++) {
      var region = result.regions[ri];
      this.score += region.score;

      // Collect trapped ghost indices
      var trappedIds = [];
      for (var gi = 0; gi < this.ghosts.length; gi++) {
        for (var ti = 0; ti < region.ghosts.length; ti++) {
          if (this.ghosts[gi].col === region.ghosts[ti].col &&
              this.ghosts[gi].row === region.ghosts[ti].row) {
            trappedIds.push(gi);
          }
        }
      }
      // Remove sprites for trapped ghosts (in reverse to preserve indices)
      trappedIds.sort(function(a, b) { return b - a; });
      for (var ti2 = 0; ti2 < trappedIds.length; ti2++) {
        var idx = trappedIds[ti2];
        this.ghostSprites[idx].circle.destroy();
        this.ghostSprites[idx].glow.destroy();
        this.ghosts.splice(idx, 1);
        this.ghostSprites.splice(idx, 1);
        this.ghostTimers.splice(idx, 1);
      }

      // Visual + audio feedback
      this._flashRegion(region);

      if (region.bonusType === 'bonus') {
        Audio.playBonus();
      } else if (region.bonusType === 'fail') {
        Audio.playFail();
      } else {
        Audio.playClose();
      }
    }

    this._redrawBoard();
    this._redrawDrawLine();
    this._updateHUD();

    // Win check
    if (this.ghosts.length === 0) {
      this._levelComplete();
    }
  },

  _flashRegion: function(region) {
    var gfx    = this.overlayGfx;
    var color  = 0x888888;
    if (region.bonusType === 'bonus') {
      color = GHOST_HEX[region.color] || 0xcc44ff;
    }
    gfx.fillStyle(color, 0.6);
    for (var i = 0; i < region.cells.length; i++) {
      gfx.fillRect(
        region.cells[i].col * CELL_SIZE,
        region.cells[i].row * CELL_SIZE,
        CELL_SIZE, CELL_SIZE
      );
    }
    var self = this;
    this.time.delayedCall(500, function() {
      gfx.clear();
      self._redrawBoard();
    });

    // Bonus shimmer: extra pulse overlay
    if (region.bonusType === 'bonus') {
      this.time.delayedCall(100, function() {
        gfx.fillStyle(0xffffff, 0.35);
        for (var j = 0; j < region.cells.length; j++) {
          gfx.fillRect(
            region.cells[j].col * CELL_SIZE,
            region.cells[j].row * CELL_SIZE,
            CELL_SIZE, CELL_SIZE
          );
        }
      });
    }
  },

  _redrawBoard: function() {
    var gfx = this.bgGraphics;
    gfx.clear();
    // Border (always green-ish)
    gfx.fillStyle(0x334433, 1);
    for (var c = 0; c < GCOLS; c++) {
      gfx.fillRect(c * CELL_SIZE, 0,                   CELL_SIZE, CELL_SIZE);
      gfx.fillRect(c * CELL_SIZE, (GROWS-1) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    for (var r = 1; r < GROWS - 1; r++) {
      gfx.fillRect(0,                     r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      gfx.fillRect((GCOLS-1) * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    // Claimed interior cells
    gfx.fillStyle(0x223322, 1);
    for (var cc = 1; cc < GCOLS - 1; cc++) {
      for (var rr = 1; rr < GROWS - 1; rr++) {
        if (this.board.isClaimed(cc, rr)) {
          gfx.fillRect(cc * CELL_SIZE, rr * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
  },

  _levelComplete: function() {
    Audio.playLevelComplete();
    var self = this;
    // Brief flash
    var flash = this.add.rectangle(480, 280, 960, 560, 0xffffff, 0.3);
    this.tweens.add({ targets: flash, alpha: 0, duration: 600 });

    this.add.text(480, 260, t('levelComplete'), {
      fontFamily: 'monospace', fontSize: '36px', color: '#cc44ff', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5);

    this.time.delayedCall(1500, function() {
      self.scene.start('GameScene', {
        difficulty: self.difficulty,
        score: self.score,
        level: self.levelNum + 1
      });
    });
  },

  _die: function() {
    Audio.playDeath();
    this.board.clearDrawing();
    this.isDrawing = false;
    this._redrawDrawLine();
    this.lives--;
    this._updateHUD();

    if (this.lives <= 0) {
      this.time.delayedCall(600, function() {
        this.scene.start('GameOverScene', {
          difficulty: this.difficulty,
          score: this.score,
          level: this.levelNum
        });
      }, [], this);
    } else {
      // Flash player red
      var self = this;
      this.playerSprite.setFillStyle(0xff0000);
      this.time.delayedCall(400, function() {
        self.playerSprite.setFillStyle(0xffffff);
      });
    }
  },

  update: function(time, delta) {
    var dt = delta / 1000;

    // Player movement
    this.moveTimer += dt;
    if (this.moveTimer >= this.moveInterval) {
      this.moveTimer = 0;
      var dir = this._getInputDir();
      if (dir) {
        this._movePlayer(dir.dx, dir.dy);
        this._updatePlayerSprite();
      }
    }

    // Ghost movement
    var cfg = this._getLevelConfig();
    var ghostInterval = 1 / cfg.speed;
    for (var i = 0; i < this.ghosts.length; i++) {
      this.ghostTimers[i] += dt;
      if (this.ghostTimers[i] >= ghostInterval) {
        this.ghostTimers[i] = 0;
        var result = this.ghosts[i].step(this.board);
        // Update sprite position
        var px = this.ghosts[i].col * CELL_SIZE + CELL_SIZE / 2;
        var py = this.ghosts[i].row * CELL_SIZE + CELL_SIZE / 2;
        this.ghostSprites[i].circle.setPosition(px, py);
        this.ghostSprites[i].glow.setPosition(px, py);

        if (result.hitDrawing) {
          this._die();
          return;
        }
      }
    }
  }
});
