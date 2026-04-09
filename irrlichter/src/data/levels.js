// Maze dimensions grow with each round played.
// UNIT = CELL (36) + WALL (8) = 44px per grid unit
// World size = WALL(8) + cols*UNIT  x  WALL(8) + rows*UNIT
var MAZE_SIZES = [
  { cols: 11, rows:  9 },   // round  0 — 492 × 404
  { cols: 12, rows: 10 },   // round  1 — 536 × 448
  { cols: 13, rows: 11 },   // round  2 — 580 × 492
  { cols: 15, rows: 12 },   // round  3 — 668 × 536
  { cols: 16, rows: 13 },   // round  4 — 712 × 580
  { cols: 18, rows: 14 },   // round  5 — 800 × 624
  { cols: 20, rows: 15 }    // round 6+ — 888 × 668
];

var TARGET_WINS = 5;  // first player to reach this many round-wins wins the match

function getMazeSize(roundNum) {
  var idx = Math.min(roundNum, MAZE_SIZES.length - 1);
  return MAZE_SIZES[idx];
}
