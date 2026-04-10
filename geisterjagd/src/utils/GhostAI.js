var GHOST_DIRS = [
  {dc:  1, dr:  0},
  {dc: -1, dr:  0},
  {dc:  0, dr:  1},
  {dc:  0, dr: -1}
];

function GhostAI(col, row, color) {
  this.col   = col;
  this.row   = row;
  this.color = color;
  this.dx    = 0;
  this.dy    = 0;
  this._pickDir();
}

GhostAI.prototype._pickDir = function() {
  var d = GHOST_DIRS[Math.floor(Math.random() * 4)];
  this.dx = d.dc;
  this.dy = d.dr;
};

// Move one step on the board.
// Returns { hitDrawing: bool }
GhostAI.prototype.step = function(board) {
  var nc = this.col + this.dx;
  var nr = this.row + this.dy;

  // Check if next cell is drawing — death condition
  if (board.isInBounds(nc, nr) && board.get(nc, nr) === CELL_DRAWING) {
    this.col = nc;
    this.row = nr;
    return { hitDrawing: true };
  }

  // If blocked (out of bounds or claimed), try other directions
  if (!board.isInBounds(nc, nr) || board.get(nc, nr) === CELL_CLAIMED) {
    // Shuffle directions and pick first unblocked one
    var dirs = GHOST_DIRS.slice().sort(function() { return Math.random() - 0.5; });
    var moved = false;
    for (var i = 0; i < dirs.length; i++) {
      var tc = this.col + dirs[i].dc;
      var tr = this.row + dirs[i].dr;
      if (board.isInBounds(tc, tr) && board.get(tc, tr) === CELL_UNCLAIMED) {
        this.dx = dirs[i].dc;
        this.dy = dirs[i].dr;
        this.col = tc;
        this.row = tr;
        moved = true;
        break;
      }
    }
    // If all directions blocked (fully enclosed), stay put
    return { hitDrawing: false };
  }

  this.col = nc;
  this.row = nr;
  return { hitDrawing: false };
};
