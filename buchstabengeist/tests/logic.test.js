var assert = require('./assert');

global.localStorage = { getItem: function() { return null; } };
eval(require('fs').readFileSync(__dirname + '/../src/i18n/lang.js', 'utf8'));
// Stub WORDS so logic.js doesn't break
global.WORDS_EN = []; global.WORDS_DE = [];
eval(require('fs').readFileSync(__dirname + '/../src/data/words.js', 'utf8'));
eval(require('fs').readFileSync(__dirname + '/../src/game/logic.js', 'utf8'));

// canMove
var maze = [
  [1,1,1],
  [1,0,1],
  [1,0,1],
  [1,1,1]
];
assert(canMove(maze, 1, 1, 'down') === true,  'canMove: open cell below');
assert(canMove(maze, 1, 1, 'up')   === false, 'canMove: wall above');
assert(canMove(maze, 1, 1, 'left') === false, 'canMove: wall left');
assert(canMove(maze, 1, 1, 'right')  === false, 'canMove: wall right');

// Tunnel wrap: col -1 wraps to COLS-1
var tunnel = [[0,0,0]];
assert(canMove(tunnel, 0, 0, 'left') === true, 'canMove: tunnel wrap left');
assert(canMove(tunnel, 0, 2, 'right') === true, 'canMove: tunnel wrap right');

// ghostOverlapsPac
assert(ghostOverlapsPac({r:5.0, c:5.0}, {r:5.0, c:5.0}) === true,  'overlap: same tile');
assert(ghostOverlapsPac({r:5.0, c:5.0}, {r:5.5, c:5.5}) === true,  'overlap: within threshold');
assert(ghostOverlapsPac({r:5.0, c:5.0}, {r:6.0, c:5.0}) === false, 'overlap: 1 tile apart');

// pickWord
var words = [{word:'CAT'},{word:'DOG'},{word:'FOX'}];
var picked = pickWord(words, null);
assert(typeof picked === 'object', 'pickWord: returns entry');
var picked2 = pickWord(words, 'CAT');
assert(picked2.word !== 'CAT', 'pickWord: avoids last word');

// calcScoreDelta
assert(calcScoreDelta('correctEat', 1)   === 120, 'score: correctEat level 1 = 120');
assert(calcScoreDelta('correctEat', 3)   === 160, 'score: correctEat level 3 = 160');
assert(calcScoreDelta('wordComplete', 1) === 350, 'score: wordComplete level 1 = 350');
assert(calcScoreDelta('wordComplete', 2) === 400, 'score: wordComplete level 2 = 400');
assert(calcScoreDelta('wrongEat', 1)     === -50, 'score: wrongEat = -50');
assert(calcScoreDelta('sparePellet', 1)  === 50,  'score: sparePellet = +50');

// getNextTargetIdx
var ghosts = [
  {wordIdx:0, eaten:true},
  {wordIdx:1, eaten:false},
  {wordIdx:2, eaten:false}
];
assert(getNextTargetIdx(ghosts) === 1, 'getNextTargetIdx: skips eaten, picks idx 1');
ghosts[1].eaten = true;
assert(getNextTargetIdx(ghosts) === 2, 'getNextTargetIdx: picks idx 2 when 0,1 eaten');
