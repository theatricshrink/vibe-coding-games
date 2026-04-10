var assert = require('./assert');
var fs = require('fs');
var path = require('path');

// Load BoardGrid first (GhostAI depends on CELL_* constants)
eval(fs.readFileSync(path.join(__dirname, '../src/utils/BoardGrid.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, '../src/utils/GhostAI.js'), 'utf8'));

// --- Creation ---
var g = new BoardGrid(10, 8);
var ghost = new GhostAI(5, 4, 'red');
assert(ghost.col === 5,     'GhostAI col set');
assert(ghost.row === 4,     'GhostAI row set');
assert(ghost.color === 'red', 'GhostAI color set');
assert(ghost.dx !== undefined && ghost.dy !== undefined, 'GhostAI has direction');
assert(Math.abs(ghost.dx) + Math.abs(ghost.dy) === 1, 'Initial direction is axis-aligned unit');

// --- Step: normal move ---
var g2 = new BoardGrid(10, 8);
var ghost2 = new GhostAI(3, 3, 'blue');
ghost2.dx = 1; ghost2.dy = 0;
var result2 = ghost2.step(g2);
assert(ghost2.col === 4, 'Ghost moves right');
assert(ghost2.row === 3, 'Ghost stays on same row');
assert(result2.hitDrawing === false, 'No drawing cell hit');

// --- Step: blocked by claimed cell, picks new direction ---
var g3 = new BoardGrid(10, 8);
var ghost3 = new GhostAI(5, 3, 'green');
ghost3.dx = 1; ghost3.dy = 0;
// Block right side by marking (6,3) as claimed
g3._set(6, 3, CELL_CLAIMED);
var prevCol = ghost3.col;
ghost3.step(g3);
// Ghost should not have moved to (6,3)
assert(ghost3.col !== 6 || ghost3.row !== 3, 'Ghost did not enter claimed cell');

// --- Step: ghost touches drawing cell → hitDrawing = true ---
var g4 = new BoardGrid(10, 8);
var ghost4 = new GhostAI(3, 3, 'red');
ghost4.dx = 1; ghost4.dy = 0;
g4._set(4, 3, CELL_DRAWING);
var result4 = ghost4.step(g4);
assert(result4.hitDrawing === true, 'Ghost touching drawing cell returns hitDrawing=true');

console.log('\nAll GhostAI tests passed!');
