var assert = require('./assert');
var fs = require('fs');
var path = require('path');

// Load BoardGrid into global scope
var src = fs.readFileSync(path.join(__dirname, '../src/utils/BoardGrid.js'), 'utf8');
eval(src);

// --- Init ---
var g = new BoardGrid(10, 8);
assert(g.cols === 10, 'BoardGrid cols = 10');
assert(g.rows === 8,  'BoardGrid rows = 8');

// Border cells are CLAIMED
assert(g.get(0, 0) === CELL_CLAIMED, 'top-left corner is claimed');
assert(g.get(9, 7) === CELL_CLAIMED, 'bottom-right corner is claimed');
assert(g.get(5, 0) === CELL_CLAIMED, 'top border cell is claimed');
assert(g.get(0, 4) === CELL_CLAIMED, 'left border cell is claimed');

// Interior is UNCLAIMED
assert(g.get(1, 1) === CELL_UNCLAIMED, 'interior cell starts unclaimed');
assert(g.get(5, 4) === CELL_UNCLAIMED, 'center cell starts unclaimed');

// isClaimed
assert(g.isClaimed(0, 0) === true,  'isClaimed border = true');
assert(g.isClaimed(1, 1) === false, 'isClaimed interior = false');

// isInBounds
assert(g.isInBounds(0, 0)  === true,  'isInBounds (0,0) = true');
assert(g.isInBounds(9, 7)  === true,  'isInBounds (9,7) = true');
assert(g.isInBounds(-1, 0) === false, 'isInBounds (-1,0) = false');
assert(g.isInBounds(10, 0) === false, 'isInBounds (10,0) = false');

// startDrawing / addDrawing
g.startDrawing(1, 1);
assert(g.get(1, 1) === CELL_DRAWING, 'startDrawing sets DRAWING');
assert(g.drawingCells.length === 1, 'drawingCells has 1 entry');

g.addDrawing(2, 1);
g.addDrawing(3, 1);
assert(g.drawingCells.length === 3, 'drawingCells has 3 entries after addDrawing');

// --- closeArea: no ghosts ---
var g2 = new BoardGrid(6, 5);
g2.startDrawing(1, 2);
g2.addDrawing(2, 2);
g2.addDrawing(2, 1);
var result2 = g2.closeArea([]);
assert(Array.isArray(result2.regions), 'closeArea returns regions array');
assert(g2.get(1, 2) === CELL_CLAIMED, 'drawing cells become claimed after closeArea');
assert(g2.get(2, 2) === CELL_CLAIMED, 'drawing cells become claimed after closeArea');

// --- closeArea: bonus — 2 same-color ghosts enclosed ---
var g4 = new BoardGrid(8, 6);
g4.startDrawing(1, 2);
g4.addDrawing(2, 2);
g4.addDrawing(3, 2);
g4.addDrawing(4, 2);
g4.addDrawing(5, 2);
g4.addDrawing(6, 2);
var ghosts4 = [{col:2, row:1, color:'red'}, {col:4, row:1, color:'red'}];
var result4 = g4.closeArea(ghosts4);
assert(result4.regions.length >= 1, 'closeArea finds at least 1 enclosed region');
var bonusRegion = result4.regions.find(function(r) { return r.bonusType === 'bonus'; });
assert(bonusRegion !== undefined, 'same-color 2+ ghosts → bonusType = bonus');
assert(bonusRegion.score === bonusRegion.cells.length * 3, 'bonus score = cells × 3');

// --- closeArea: fail — mixed colors ---
var g5 = new BoardGrid(8, 6);
g5.startDrawing(1, 2);
g5.addDrawing(2, 2);
g5.addDrawing(3, 2);
g5.addDrawing(4, 2);
g5.addDrawing(5, 2);
g5.addDrawing(6, 2);
var ghosts5 = [{col:2, row:1, color:'red'}, {col:4, row:1, color:'blue'}];
var result5 = g5.closeArea(ghosts5);
var failRegion = result5.regions.find(function(r) { return r.bonusType === 'fail'; });
assert(failRegion !== undefined, 'mixed colors → bonusType = fail');
assert(failRegion.score === failRegion.cells.length * 1, 'fail score = cells × 1');

// --- closeArea: neutral — 1 ghost ---
var g6 = new BoardGrid(8, 6);
g6.startDrawing(1, 2);
g6.addDrawing(2, 2);
g6.addDrawing(3, 2);
g6.addDrawing(4, 2);
g6.addDrawing(5, 2);
g6.addDrawing(6, 2);
var ghosts6 = [{col:2, row:1, color:'red'}];
var result6 = g6.closeArea(ghosts6);
var neutralRegion = result6.regions.find(function(r) { return r.bonusType === 'none'; });
assert(neutralRegion !== undefined, '1 ghost → bonusType = none');

// --- clearDrawing ---
var g7 = new BoardGrid(6, 5);
g7.startDrawing(1, 1);
g7.addDrawing(2, 1);
g7.clearDrawing();
assert(g7.get(1, 1) === CELL_UNCLAIMED, 'clearDrawing resets DRAWING → UNCLAIMED');
assert(g7.get(2, 1) === CELL_UNCLAIMED, 'clearDrawing resets all drawing cells');
assert(g7.drawingCells.length === 0, 'drawingCells empty after clearDrawing');

console.log('\nAll BoardGrid tests passed!');
