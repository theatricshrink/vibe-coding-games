var TILE_SIZE = 48;
var COLS = 20;
var ROWS = 15;

// 0=grass, 1=tall grass, 2=tree, 3=water
var MAP = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,2],
  [2,0,0,1,1,1,1,0,0,2,0,0,1,1,1,1,0,0,0,2],
  [2,0,1,1,0,0,1,1,0,2,0,1,1,0,0,1,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2],
  [2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2],
  [2,0,0,2,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,2],
  [2,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,2],
  [2,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,2,0,0,2],
  [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2],
  [2,0,2,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,2],
  [2,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var TILE_COLORS = {
  0: 0x5a9e3a,  // grass
  1: 0x3d7a25,  // tall grass
  2: 0x1b4a10,  // tree
  3: 0x2980b9   // water
};

var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'GameScene' });
  },

  create: function() {
    this._drawMap();

    this._questionPool = new QuestionPool(QUESTIONS);
    this._quizActive = false;
    this._collectionActive = false;

    this._playerCol = 10;
    this._playerRow = 7;
    this._moving = false;

    this._playerGfx = this.add.graphics();
    this._playerText = this.add.text(0, 0, '🧒', {
      fontSize: '28px'
    }).setDepth(1);

    this._drawPlayer();
    this._setupKeys();
    this._setupDpad();
  },

  _drawMap: function() {
    var gfx = this.add.graphics();
    for (var row = 0; row < ROWS; row++) {
      for (var col = 0; col < COLS; col++) {
        var tile = MAP[row][col];
        gfx.fillStyle(TILE_COLORS[tile], 1);
        gfx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE - 1, TILE_SIZE - 1);
      }
    }
  },

  _drawPlayer: function() {
    this._playerGfx.clear();
    this._playerGfx.fillStyle(0xf5a623, 1);
    this._playerGfx.fillRect(
      this._playerCol * TILE_SIZE + 6,
      this._playerRow * TILE_SIZE + 6,
      TILE_SIZE - 12,
      TILE_SIZE - 12
    );
    this._playerText.setPosition(
      this._playerCol * TILE_SIZE + 10,
      this._playerRow * TILE_SIZE + 6
    );
  },

  _setupKeys: function() {
    var self = this;

    this.input.keyboard.on('keydown-UP',    function() { self._tryMove( 0, -1); });
    this.input.keyboard.on('keydown-DOWN',  function() { self._tryMove( 0,  1); });
    this.input.keyboard.on('keydown-LEFT',  function() { self._tryMove(-1,  0); });
    this.input.keyboard.on('keydown-RIGHT', function() { self._tryMove( 1,  0); });
    this.input.keyboard.on('keydown-W',     function() { self._tryMove( 0, -1); });
    this.input.keyboard.on('keydown-S',     function() { self._tryMove( 0,  1); });
    this.input.keyboard.on('keydown-A',     function() { self._tryMove(-1,  0); });
    this.input.keyboard.on('keydown-D',     function() { self._tryMove( 1,  0); });

    var cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this._cKey = cKey;
    cKey.on('down', function() {
      if (self._quizActive) return;
      if (self._collectionActive) return;
      self._collectionActive = true;
      self._hideDpad();
      self.scene.launch('CollectionScene');
      self.scene.pause();
    });

    // Restore d-pad when CollectionScene closes and GameScene resumes
    this.events.on('resume', function() {
      self._showDpad();
    });
  },

  _setupDpad: function() {
    this.dpadObjects = [];
    var self = this;
    var isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS;
    if (!isMobile) return;

    // Cross layout at bottom-left: Up/Down/Left/Right — 70×70 buttons
    var makeDpadBtn = function(x, y, label) {
      var bg  = self.add.rectangle(x, y, 70, 70, 0x333333, 0.8).setScrollFactor(0).setDepth(10);
      var txt = self.add.text(x, y, label, { fontFamily: 'Arial', fontSize: '28px', color: '#ffffff' })
                    .setOrigin(0.5).setScrollFactor(0).setDepth(11);
      self.dpadObjects.push(bg, txt);
    };
    // Positions in 960×720 game coords
    makeDpadBtn(80,  555, '▲');  // up
    makeDpadBtn(80,  665, '▼');  // down
    makeDpadBtn(25,  610, '◀');  // left
    makeDpadBtn(135, 610, '▶');  // right

    // Hit zones (center ± 35)
    // Up:    x[45-115] y[520-590]   Down: x[45-115] y[630-700]
    // Left:  x[0-60]  y[575-645]   Right: x[100-170] y[575-645]
    var canvas = this.sys.game.canvas;

    function updateDpad(touches) {
      var rect = canvas.getBoundingClientRect();
      var sx = 960 / rect.width;
      var sy = 720 / rect.height;
      var up = false, down = false, left = false, right = false;
      for (var i = 0; i < touches.length; i++) {
        var gx = (touches[i].clientX - rect.left) * sx;
        var gy = (touches[i].clientY - rect.top)  * sy;
        if (gx >= 45  && gx <= 115 && gy >= 520 && gy <= 590) up    = true;
        if (gx >= 45  && gx <= 115 && gy >= 630 && gy <= 700) down  = true;
        if (gx >= 0   && gx <= 60  && gy >= 575 && gy <= 645) left  = true;
        if (gx >= 100 && gx <= 170 && gy >= 575 && gy <= 645) right = true;
      }
      // Fire move on press, not continuous hold (handled via flag tracking)
      if (up    && !self._dpadUp)    { self._dpadUp    = true; self._tryMove( 0, -1); }
      if (down  && !self._dpadDown)  { self._dpadDown  = true; self._tryMove( 0,  1); }
      if (left  && !self._dpadLeft)  { self._dpadLeft  = true; self._tryMove(-1,  0); }
      if (right && !self._dpadRight) { self._dpadRight = true; self._tryMove( 1,  0); }
      if (!up)    self._dpadUp    = false;
      if (!down)  self._dpadDown  = false;
      if (!left)  self._dpadLeft  = false;
      if (!right) self._dpadRight = false;
    }

    var onTouch = function(e) { e.preventDefault(); updateDpad(e.touches); };
    var onTouchCancel = function() {
      self._dpadUp = false; self._dpadDown = false;
      self._dpadLeft = false; self._dpadRight = false;
    };

    canvas.addEventListener('touchstart',  onTouch,       { passive: false });
    canvas.addEventListener('touchmove',   onTouch,       { passive: false });
    canvas.addEventListener('touchend',    onTouch,       { passive: false });
    canvas.addEventListener('touchcancel', onTouchCancel);

    this.events.once('shutdown', function() {
      canvas.removeEventListener('touchstart',  onTouch);
      canvas.removeEventListener('touchmove',   onTouch);
      canvas.removeEventListener('touchend',    onTouch);
      canvas.removeEventListener('touchcancel', onTouchCancel);
    });
  },

  _hideDpad: function() {
    this.dpadObjects.forEach(function(obj) { obj.setVisible(false); });
  },

  _showDpad: function() {
    this.dpadObjects.forEach(function(obj) { obj.setVisible(true); });
  },

  _tryMove: function(dc, dr) {
    if (this._moving) return;
    var newCol = this._playerCol + dc;
    var newRow = this._playerRow + dr;
    if (newCol < 0 || newCol >= COLS || newRow < 0 || newRow >= ROWS) return;
    var tile = MAP[newRow][newCol];
    if (tile === 2 || tile === 3) return;
    this._playerCol = newCol;
    this._playerRow = newRow;
    this._drawPlayer();
    this._moving = true;
    var self = this;
    this.time.delayedCall(150, function() { self._moving = false; });
    this._onStep(tile);
  },

  _onStep: function(tile) {
    if (tile !== 1) return;
    if (Math.random() > 0.2) return;
    var raw = localStorage.getItem('pgame_collection');
    var collection = {};
    try { if (raw) collection = JSON.parse(raw); } catch(e) {}
    var available = CREATURES.filter(function(c) { return !collection[c.id]; });
    if (available.length === 0) return;
    var creature = weightedRandom(available);
    this._startEncounter(creature);
  },

  _startEncounter: function(creature) {
    this._quizActive = true;
    var questionsNeeded = (creature.rarity === 'rare') ? 2 : 1;
    var self = this;

    var questions = [];
    var categories = STRINGS[LANG].categories;
    for (var i = 0; i < questionsNeeded; i++) {
      var cat = categories[Math.floor(Math.random() * categories.length)];
      questions.push(this._questionPool.draw(cat));
    }

    this._hideDpad();
    this.scene.launch('QuizScene', {
      creature: creature,
      questions: questions,
      onComplete: function(caught) {
        self._quizActive = false;
        self._showDpad();
        if (caught) {
          self._saveToCollection(creature);
        }
      }
    });
    this.scene.pause();
  },

  _saveToCollection: function(creature) {
    var raw = localStorage.getItem('pgame_collection');
    var collection = {};
    try { if (raw) collection = JSON.parse(raw); } catch(e) {}
    if (!collection[creature.id]) {
      collection[creature.id] = { caughtAt: Date.now() };
      localStorage.setItem('pgame_collection', JSON.stringify(collection));
    }
    if (Object.keys(collection).length === CREATURES.length) {
      this.scene.start('WinScene');
    }
  }
});
