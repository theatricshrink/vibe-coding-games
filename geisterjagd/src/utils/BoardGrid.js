var CELL_UNCLAIMED = 0;
var CELL_CLAIMED   = 1;
var CELL_DRAWING   = 2;

function BoardGrid(cols, rows) {
  this.cols = cols;
  this.rows = rows;
  this.cells = new Array(cols * rows).fill(CELL_UNCLAIMED);
  this.drawingCells = [];
  // Mark border as claimed
  for (var c = 0; c < cols; c++) {
    this._set(c, 0,        CELL_CLAIMED);
    this._set(c, rows - 1, CELL_CLAIMED);
  }
  for (var r = 1; r < rows - 1; r++) {
    this._set(0,        r, CELL_CLAIMED);
    this._set(cols - 1, r, CELL_CLAIMED);
  }
}

BoardGrid.prototype._idx = function(c, r) { return r * this.cols + c; };
BoardGrid.prototype.get  = function(c, r) { return this.cells[this._idx(c, r)]; };
BoardGrid.prototype._set = function(c, r, state) { this.cells[this._idx(c, r)] = state; };

BoardGrid.prototype.isClaimed  = function(c, r) { return this.get(c, r) === CELL_CLAIMED; };
BoardGrid.prototype.isDrawing  = function(c, r) { return this.get(c, r) === CELL_DRAWING; };
BoardGrid.prototype.isInBounds = function(c, r) {
  return c >= 0 && r >= 0 && c < this.cols && r < this.rows;
};

BoardGrid.prototype.startDrawing = function(c, r) {
  this._set(c, r, CELL_DRAWING);
  this.drawingCells = [{col: c, row: r}];
};

BoardGrid.prototype.addDrawing = function(c, r) {
  this._set(c, r, CELL_DRAWING);
  this.drawingCells.push({col: c, row: r});
};

BoardGrid.prototype.clearDrawing = function() {
  for (var i = 0; i < this.drawingCells.length; i++) {
    this._set(this.drawingCells[i].col, this.drawingCells[i].row, CELL_UNCLAIMED);
  }
  this.drawingCells = [];
};

// Flood fill from (startC, startR), only visiting cells that match targetState.
// Returns array of {col, row}.
BoardGrid.prototype._fill = function(startC, startR, targetState) {
  if (!this.isInBounds(startC, startR)) return [];
  if (this.get(startC, startR) !== targetState) return [];
  var visited = new Array(this.cols * this.rows).fill(false);
  var queue = [{col: startC, row: startR}];
  var result = [];
  visited[this._idx(startC, startR)] = true;
  var dirs = [{dc:1,dr:0},{dc:-1,dr:0},{dc:0,dr:1},{dc:0,dr:-1}];
  while (queue.length > 0) {
    var cur = queue.shift();
    result.push(cur);
    for (var d = 0; d < dirs.length; d++) {
      var nc = cur.col + dirs[d].dc;
      var nr = cur.row + dirs[d].dr;
      if (this.isInBounds(nc, nr) && !visited[this._idx(nc, nr)] && this.get(nc, nr) === targetState) {
        visited[this._idx(nc, nr)] = true;
        queue.push({col: nc, row: nr});
      }
    }
  }
  return result;
};

// Close the current drawing line.
// ghostPositions: [{col, row, color}]
// Returns { regions: [{cells, ghosts, bonusType, score, color}] }
BoardGrid.prototype.closeArea = function(ghostPositions) {
  // 1. Convert all drawing cells to claimed
  for (var i = 0; i < this.drawingCells.length; i++) {
    this._set(this.drawingCells[i].col, this.drawingCells[i].row, CELL_CLAIMED);
  }
  this.drawingCells = [];

  // 2. Find connected components of unclaimed cells using flood fill.
  //    Components NOT touching the border are enclosed.
  var visited = new Array(this.cols * this.rows).fill(false);
  var regions = [];

  for (var c = 0; c < this.cols; c++) {
    for (var r = 0; r < this.rows; r++) {
      if (this.get(c, r) === CELL_UNCLAIMED && !visited[this._idx(c, r)]) {
        var component = this._fillVisited(c, r, visited);
        // Check if any cell in component touches the actual border (col 0, col last, row 0, row last)
        var touchesBorder = false;
        for (var j = 0; j < component.length; j++) {
          var cell = component[j];
          if (cell.col === 0 || cell.col === this.cols - 1 ||
              cell.row === 0 || cell.row === this.rows - 1) {
            touchesBorder = true;
            break;
          }
        }
        if (!touchesBorder) {
          regions.push(component);
        }
      }
    }
  }

  // 3. For each enclosed region, find trapped ghosts, score it, claim it
  var result = { regions: [] };
  for (var ri = 0; ri < regions.length; ri++) {
    var cells = regions[ri];
    var cellSet = {};
    for (var ci = 0; ci < cells.length; ci++) {
      cellSet[cells[ci].col + ',' + cells[ci].row] = true;
    }
    // Claim these cells
    for (var ci2 = 0; ci2 < cells.length; ci2++) {
      this._set(cells[ci2].col, cells[ci2].row, CELL_CLAIMED);
    }
    // Find ghosts inside
    var trapped = [];
    for (var gi = 0; gi < ghostPositions.length; gi++) {
      var gp = ghostPositions[gi];
      if (cellSet[gp.col + ',' + gp.row]) {
        trapped.push(gp);
      }
    }
    // Determine bonus type
    var bonusType = 'none';
    var bonusColor = null;
    var score = cells.length;
    if (trapped.length >= 2) {
      var allSame = true;
      var firstColor = trapped[0].color;
      for (var ti = 1; ti < trapped.length; ti++) {
        if (trapped[ti].color !== firstColor) { allSame = false; break; }
      }
      if (allSame) {
        bonusType = 'bonus';
        bonusColor = firstColor;
        score = cells.length * 3;
      } else {
        bonusType = 'fail';
        score = cells.length;
      }
    }
    result.regions.push({ cells: cells, ghosts: trapped, bonusType: bonusType, color: bonusColor, score: score });
  }
  return result;
};

// Internal fill that marks cells in a shared visited array
BoardGrid.prototype._fillVisited = function(startC, startR, visited) {
  var queue = [{col: startC, row: startR}];
  var result = [];
  visited[this._idx(startC, startR)] = true;
  var dirs = [{dc:1,dr:0},{dc:-1,dr:0},{dc:0,dr:1},{dc:0,dr:-1}];
  while (queue.length > 0) {
    var cur = queue.shift();
    result.push(cur);
    for (var d = 0; d < dirs.length; d++) {
      var nc = cur.col + dirs[d].dc;
      var nr = cur.row + dirs[d].dr;
      if (this.isInBounds(nc, nr) && !visited[this._idx(nc, nr)] &&
          this.get(nc, nr) === CELL_UNCLAIMED) {
        visited[this._idx(nc, nr)] = true;
        queue.push({col: nc, row: nr});
      }
    }
  }
  return result;
};
