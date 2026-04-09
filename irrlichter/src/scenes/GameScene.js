// ─── Constants ────────────────────────────────────────────────────────────────
var CELL     = 36;   // walkable cell interior (px, world)
var GWALL    = 8;    // wall thickness (px, world)
var UNIT     = CELL + GWALL; // = 44 px per grid unit (world)
var PLAYER_R = 10;   // player circle radius (world px)
var IRR_R    = 10;   // Irrlicht circle radius (world px)
var WIN_DIST = PLAYER_R + IRR_R + 6; // collect distance (world px)
var FLASH_R  = 75;   // flashlight radius (world px; at CAM_ZOOM=2 → 150 screen px)
var CAM_ZOOM = 2;    // camera zoom — shows ~5×6 cells at once, forces exploration
var SPEED    = 200;  // player speed (world px/s)

// Largest possible world (20×15 cells)
var WORLD_MAX_W = GWALL + 20 * UNIT; // 888
var WORLD_MAX_H = GWALL + 15 * UNIT; // 668

// Colours
var CC_WALL  = 0x07071a;
var CC_FLOOR = 0x14143a;
var CC_P1    = 0xff8822;
var CC_P2    = 0x44aaff;
var CC_IRR   = 0x00ffcc;

// ─── GameScene ────────────────────────────────────────────────────────────────
var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameScene' }); },

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  init: function(data) {
    this.roundNum = data.round   || 0;
    this.p1Score  = data.p1Score || 0;
    this.p2Score  = data.p2Score || 0;
  },

  create: function() {
    this.gameState = 'init';
    this.winTimer  = 0;

    this._buildWorld();
    this._buildEntities();
    this._buildFog();       // fog AFTER entities (mask sources need to exist)
    this._buildCameras();   // cameras AFTER fog (ignore lists reference fog objects)
    this._buildInput();
    this._buildHUD();       // HUD AFTER cameras (ignore lists reference HUD objects)
    this._startRound();
  },

  update: function(time, delta) {
    if (this.gameState === 'playing') {
      this._handleInput(delta / 1000);
      this._updateFog();
      this._checkWin();
    } else if (this.gameState === 'round_win' || this.gameState === 'match_won') {
      this.winTimer -= delta;
      if (this.winTimer <= 0) this._afterWin();
    }
  },

  // ── Build helpers ──────────────────────────────────────────────────────────

  _buildWorld: function() {
    this.mazeGfx = this.add.graphics().setDepth(0);
  },

  _buildEntities: function() {
    this.p1Sprite = this.add.circle(0, 0, PLAYER_R, CC_P1).setDepth(7);
    this.p2Sprite = this.add.circle(0, 0, PLAYER_R, CC_P2).setDepth(7);

    // Irrlicht: pulsing core + expanding aura
    this.irrCore = this.add.circle(0, 0, IRR_R,       CC_IRR, 1.0).setDepth(5);
    this.irrAura = this.add.circle(0, 0, IRR_R * 2.5, CC_IRR, 0.35).setDepth(4);
    this.tweens.add({ targets: this.irrAura, scaleX: 2.2, scaleY: 2.2, alpha: 0, duration: 1800, repeat: -1, ease: 'Sine.out' });
    this.tweens.add({ targets: this.irrCore, scaleX: 1.2, scaleY: 1.2, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
  },

  _buildFog: function() {
    // ── Brush texture: radial gradient circle in WORLD pixels.
    // FLASH_R world px at zoom=2 → 150 screen px radius — feels like a proper torch.
    var d    = FLASH_R * 2; // 150 world-px diameter
    var bc   = document.createElement('canvas');
    bc.width = d; bc.height = d;
    var bctx = bc.getContext('2d');
    var grad = bctx.createRadialGradient(FLASH_R, FLASH_R, 0, FLASH_R, FLASH_R, FLASH_R);
    grad.addColorStop(0,    'rgba(255,255,255,1)');
    grad.addColorStop(0.45, 'rgba(255,255,255,1)');
    grad.addColorStop(0.82, 'rgba(255,255,255,0.3)');
    grad.addColorStop(1,    'rgba(255,255,255,0)');
    bctx.fillStyle = grad;
    bctx.beginPath(); bctx.arc(FLASH_R, FLASH_R, FLASH_R, 0, Math.PI * 2); bctx.fill();
    if (this.textures.exists('flashBrush')) this.textures.remove('flashBrush');
    this.textures.addCanvas('flashBrush', bc);

    // ── World-space fog RenderTextures covering the entire possible maze area.
    // No scrollFactor trickery — camera zoom/scroll handle the transform automatically.
    // Each camera sees only its own RT (via ignore list in _buildCameras).
    var W = WORLD_MAX_W, H = WORLD_MAX_H;
    this.fogRT1 = this.add.renderTexture(0, 0, W, H).setOrigin(0, 0).setDepth(10);
    this.fogRT2 = this.add.renderTexture(0, 0, W, H).setOrigin(0, 0).setDepth(10);
    this.fogRT1.fill(0x000000, 1);
    this.fogRT2.fill(0x000000, 1);
  },

  _buildCameras: function() {
    // Left half — follows P1
    this.cam1 = this.cameras.main;
    this.cam1.setViewport(0, 0, 480, 560);
    this.cam1.setZoom(CAM_ZOOM); // shows 240×280 world px → forces maze exploration
    this.cam1.startFollow(this.p1Sprite, true, 0.08, 0.08);

    // Right half — follows P2
    this.cam2 = this.cameras.add(480, 0, 480, 560);
    this.cam2.setZoom(CAM_ZOOM);
    this.cam2.startFollow(this.p2Sprite, true, 0.08, 0.08);

    // Each camera only sees its own fog RT.
    this.cam1.ignore([this.fogRT2]);
    this.cam2.ignore([this.fogRT1]);
  },

  _buildInput: function() {
    this.keysP1 = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.W,
      down:  Phaser.Input.Keyboard.KeyCodes.S,
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.keysP2 = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.UP,
      down:  Phaser.Input.Keyboard.KeyCodes.DOWN,
      left:  Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    this.p1Joy = { active: false, dx: 0, dy: 0, id: -1, sx: 0, sy: 0 };
    this.p2Joy = { active: false, dx: 0, dy: 0, id: -1, sx: 0, sy: 0 };
    var self = this;

    this.input.on('pointerdown', function(ptr) {
      if (ptr.x < 480 && !self.p1Joy.active) {
        self.p1Joy.active = true; self.p1Joy.id = ptr.id;
        self.p1Joy.sx = ptr.x;   self.p1Joy.sy = ptr.y;
        self.p1Joy.dx = 0;       self.p1Joy.dy = 0;
      } else if (ptr.x >= 480 && !self.p2Joy.active) {
        self.p2Joy.active = true; self.p2Joy.id = ptr.id;
        self.p2Joy.sx = ptr.x;   self.p2Joy.sy = ptr.y;
        self.p2Joy.dx = 0;       self.p2Joy.dy = 0;
      }
    });
    this.input.on('pointermove', function(ptr) {
      self._updateJoy(self.p1Joy, ptr);
      self._updateJoy(self.p2Joy, ptr);
    });
    this.input.on('pointerup', function(ptr) {
      if (self.p1Joy.active && ptr.id === self.p1Joy.id) { self.p1Joy.active = false; self.p1Joy.dx = 0; self.p1Joy.dy = 0; }
      if (self.p2Joy.active && ptr.id === self.p2Joy.id) { self.p2Joy.active = false; self.p2Joy.dx = 0; self.p2Joy.dy = 0; }
    });
  },

  _updateJoy: function(joy, ptr) {
    if (!joy.active || ptr.id !== joy.id) return;
    var dx = ptr.x - joy.sx, dy = ptr.y - joy.sy;
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len > 16) { joy.dx = dx / len; joy.dy = dy / len; }
    else          { joy.dx = 0;        joy.dy = 0; }
  },

  _buildHUD: function() {
    var nameStyle  = { fontFamily: 'monospace', fontSize: '16px', fontStyle: 'bold' };
    var scoreStyle = { fontFamily: 'monospace', fontSize: '22px', fontStyle: 'bold' };

    // Player names — shown only in their own camera half
    this.p1Name = this.add.text(10, 10, t('player1'), Object.assign({}, nameStyle, { color: '#ff8822' }))
      .setScrollFactor(0).setDepth(20);
    this.p2Name = this.add.text(10, 10, t('player2'), Object.assign({}, nameStyle, { color: '#44aaff' }))
      .setScrollFactor(0).setDepth(20);

    // Score: "X - Y" centred in each half (same scrollFactor=0 position → different screen x per cam)
    this.p1ScoreNum = this.add.text(206, 10, '0', Object.assign({}, scoreStyle, { color: '#ff8822' }))
      .setScrollFactor(0).setDepth(20).setOrigin(1, 0);
    this.dashText = this.add.text(240, 10, '-', Object.assign({}, scoreStyle, { color: '#666688' }))
      .setScrollFactor(0).setDepth(20).setOrigin(0.5, 0);
    this.p2ScoreNum = this.add.text(274, 10, '0', Object.assign({}, scoreStyle, { color: '#44aaff' }))
      .setScrollFactor(0).setDepth(20).setOrigin(0, 0);

    // Round label
    this.roundInfo = this.add.text(240, 34, '', { fontFamily: 'monospace', fontSize: '12px', color: '#445566' })
      .setScrollFactor(0).setDepth(20).setOrigin(0.5, 0);
    this._updateRoundInfo();

    // Divider — right edge of cam1's viewport (cam2 ignores it)
    this.divider = this.add.rectangle(479, 280, 2, 560, 0x00ffcc, 0.4)
      .setScrollFactor(0).setDepth(20);

    // Win overlay — centred in EACH camera half simultaneously
    this.overlayBg = this.add.rectangle(240, 290, 440, 170, 0x000000, 0)
      .setScrollFactor(0).setDepth(90);
    this.overlayTitle = this.add.text(240, 255, '', {
      fontFamily: 'monospace', fontSize: '26px', color: '#ffcc00',
      align: 'center', wordWrap: { width: 420 }
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(91);
    this.overlayScore = this.add.text(240, 320, '', {
      fontFamily: 'monospace', fontSize: '34px', color: '#ffffff', align: 'center'
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(91);
    this._setOverlay(false);

    // Camera-specific HUD ignores
    this.cam2.ignore([this.p1Name, this.divider]);
    this.cam1.ignore([this.p2Name]);
  },

  // ── Round logic ───────────────────────────────────────────────────────────

  _startRound: function() {
    var size = getMazeSize(this.roundNum);
    this.COLS    = size.cols;
    this.ROWS    = size.rows;
    this.WORLD_W = GWALL + this.COLS * UNIT;
    this.WORLD_H = GWALL + this.ROWS * UNIT;

    this.maze = generateMaze(this.COLS, this.ROWS);
    this.mazeGfx.clear();
    this._drawMaze();

    // Camera bounds — confine scroll to current maze world
    this.cam1.setBounds(0, 0, this.WORLD_W, this.WORLD_H);
    this.cam2.setBounds(0, 0, this.WORLD_W, this.WORLD_H);

    // Place players and immediately snap cameras to their positions
    var p1Start = this._cellCenter(0, 0);
    var p2Start = this._cellCenter(this.COLS - 1, this.ROWS - 1);
    this.p1Sprite.setPosition(p1Start.x, p1Start.y);
    this.p2Sprite.setPosition(p2Start.x, p2Start.y);
    this.cam1.centerOn(p1Start.x, p1Start.y);
    this.cam2.centerOn(p2Start.x, p2Start.y);

    // Reset fog for the new round.
    this.fogRT1.fill(0x000000, 1);
    this.fogRT2.fill(0x000000, 1);

    // Place Irrlicht
    var iCell = pickIrrLichtCell(this.COLS, this.ROWS);
    var iPos  = this._cellCenter(iCell.c, iCell.r);
    this.irrCore.setPosition(iPos.x, iPos.y);
    this.irrAura.setPosition(iPos.x, iPos.y);
    this.irrAura.setScale(1).setAlpha(0.35);

    this._setOverlay(false);
    this._updateScoreDisplay();
    this._updateRoundInfo();
    this.gameState = 'playing';
  },

  _afterWin: function() {
    if (this.gameState === 'match_won') {
      this.scene.start('GameOverScene', { winner: this.lastWinner, p1Score: this.p1Score, p2Score: this.p2Score });
    } else {
      this.roundNum++;
      this._startRound();
    }
  },

  // ── Update helpers ────────────────────────────────────────────────────────

  _handleInput: function(dt) {
    this._movePlayer(this.p1Sprite, this.keysP1, this.p1Joy, dt);
    this._movePlayer(this.p2Sprite, this.keysP2, this.p2Joy, dt);
  },

  _movePlayer: function(sprite, keys, joy, dt) {
    var vx = 0, vy = 0;
    if (joy.active && (joy.dx !== 0 || joy.dy !== 0)) {
      vx = joy.dx; vy = joy.dy;
    } else {
      if (keys.left.isDown)  vx -= 1;
      if (keys.right.isDown) vx += 1;
      if (keys.up.isDown)    vy -= 1;
      if (keys.down.isDown)  vy += 1;
      if (vx !== 0 && vy !== 0) { vx *= 0.7071; vy *= 0.7071; }
    }
    if (vx === 0 && vy === 0) return;
    var dx = vx * SPEED * dt, dy = vy * SPEED * dt;
    if      (!this._collidesWall(sprite.x + dx, sprite.y + dy)) { sprite.x += dx; sprite.y += dy; }
    else if (!this._collidesWall(sprite.x + dx, sprite.y))      { sprite.x += dx; }
    else if (!this._collidesWall(sprite.x,       sprite.y + dy)) { sprite.y += dy; }
  },

  _collidesWall: function(x, y) {
    var r = PLAYER_R - 1, s = r * 0.7071;
    var pts = [[x+r,y],[x-r,y],[x,y+r],[x,y-r],[x+s,y+s],[x-s,y+s],[x+s,y-s],[x-s,y-s]];
    for (var i = 0; i < pts.length; i++) {
      if (this._isWall(pts[i][0], pts[i][1])) return true;
    }
    return false;
  },

  _isWall: function(px, py) {
    var mx = px - GWALL, my = py - GWALL;
    if (mx < 0 || my < 0 || mx >= this.COLS * UNIT || my >= this.ROWS * UNIT) return true;
    var col = Math.floor(mx / UNIT), row = Math.floor(my / UNIT);
    var cx  = mx - col * UNIT,       cy  = my - row * UNIT;
    if (col >= this.COLS || row >= this.ROWS) return true;
    if (cx < CELL && cy < CELL) return false;
    if (cx >= CELL && cy < CELL) return col >= this.COLS - 1 || this.maze[row][col].e;
    if (cx < CELL && cy >= CELL) return row >= this.ROWS - 1 || this.maze[row][col].s;
    return true;
  },

  // World-space RT: fill with black every frame, then erase the torch circle at the
  // player's world position. Camera zoom/scroll are irrelevant here — the RT is a
  // normal world object and the camera transforms it exactly like any other sprite.
  _updateFog: function() {
    var p1x = this.p1Sprite.x, p1y = this.p1Sprite.y;
    var p2x = this.p2Sprite.x, p2y = this.p2Sprite.y;
    this.fogRT1.fill(0x000000, 1);
    this.fogRT1.erase('flashBrush', p1x - FLASH_R, p1y - FLASH_R);
    this.fogRT2.fill(0x000000, 1);
    this.fogRT2.erase('flashBrush', p2x - FLASH_R, p2y - FLASH_R);
  },

  _checkWin: function() {
    var d1 = Phaser.Math.Distance.Between(this.p1Sprite.x, this.p1Sprite.y, this.irrCore.x, this.irrCore.y);
    var d2 = Phaser.Math.Distance.Between(this.p2Sprite.x, this.p2Sprite.y, this.irrCore.x, this.irrCore.y);
    if (d1 <= WIN_DIST || d2 <= WIN_DIST) this._roundWin(d1 <= d2 ? 1 : 2);
  },

  _roundWin: function(player) {
    if (player === 1) this.p1Score++; else this.p2Score++;
    this.lastWinner = player;
    this._updateScoreDisplay();
    var isMatch = this.p1Score >= TARGET_WINS || this.p2Score >= TARGET_WINS;
    this.gameState = isMatch ? 'match_won' : 'round_win';
    this.winTimer  = isMatch ? 3200 : 2400;
    var titleStr = player === 1 ? (isMatch ? t('winnerP1') : t('p1found')) : (isMatch ? t('winnerP2') : t('p2found'));
    this._setOverlay(true, titleStr, this.p1Score + '  –  ' + this.p2Score, player === 1 ? '#ff8822' : '#44aaff');
    var sprite = player === 1 ? this.p1Sprite : this.p2Sprite;
    this.tweens.add({ targets: sprite, alpha: 0, duration: 120, yoyo: true, repeat: 5 });
  },

  // ── Drawing helpers ───────────────────────────────────────────────────────

  _drawMaze: function() {
    var g = this.mazeGfx;
    g.fillStyle(CC_WALL);
    g.fillRect(0, 0, this.WORLD_W, this.WORLD_H);
    g.fillStyle(CC_FLOOR);
    for (var r = 0; r < this.ROWS; r++) {
      for (var c = 0; c < this.COLS; c++) {
        var x = GWALL + c * UNIT, y = GWALL + r * UNIT;
        g.fillRect(x, y, CELL, CELL);
        if (!this.maze[r][c].e && c < this.COLS - 1) g.fillRect(x + CELL, y, GWALL, CELL);
        if (!this.maze[r][c].s && r < this.ROWS - 1) g.fillRect(x, y + CELL, CELL, GWALL);
      }
    }
    // Subtle floor cell inset lines for visual depth
    g.lineStyle(1, 0x0d0d26, 1);
    for (r = 0; r < this.ROWS; r++) {
      for (c = 0; c < this.COLS; c++) {
        g.strokeRect(GWALL + c * UNIT + 1, GWALL + r * UNIT + 1, CELL - 2, CELL - 2);
      }
    }
  },

  _cellCenter: function(col, row) {
    return { x: GWALL + col * UNIT + CELL / 2, y: GWALL + row * UNIT + CELL / 2 };
  },

  // ── HUD helpers ───────────────────────────────────────────────────────────

  _updateScoreDisplay: function() {
    this.p1ScoreNum.setText(String(this.p1Score));
    this.p2ScoreNum.setText(String(this.p2Score));
  },

  _updateRoundInfo: function() {
    this.roundInfo.setText(t('round') + ' ' + (this.roundNum + 1));
  },

  _setOverlay: function(visible, title, score, titleColor) {
    this.overlayBg.setAlpha(visible ? 0.88 : 0);
    this.overlayTitle.setVisible(visible);
    this.overlayScore.setVisible(visible);
    if (visible) {
      this.overlayTitle.setText(title || '').setColor(titleColor || '#ffcc00');
      this.overlayScore.setText(score || '');
    }
  }
});
