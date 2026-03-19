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
      self.scene.launch('CollectionScene');
      self.scene.pause();
    });
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
    var creature = weightedRandom(CREATURES);
    this._startEncounter(creature);
  },

  _startEncounter: function(creature) {
    this._quizActive = true;
    var questionsNeeded = (creature.rarity === 'rare') ? 2 : 1;
    var self = this;

    var questions = [];
    var categories = ['Mathe', 'Deutsch', 'Allgemeinwissen'];
    for (var i = 0; i < questionsNeeded; i++) {
      var cat = categories[Math.floor(Math.random() * categories.length)];
      questions.push(this._questionPool.draw(cat));
    }

    this.scene.launch('QuizScene', {
      creature: creature,
      questions: questions,
      onComplete: function(caught) {
        self._quizActive = false;
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
  }
});
