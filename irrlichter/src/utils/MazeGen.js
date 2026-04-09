// MazeGen.js — Recursive backtracker maze generator
// Returns maze[row][col] = { n, s, e, w } where true = wall, false = passage

function generateMaze(cols, rows) {
  var maze = [];
  for (var r = 0; r < rows; r++) {
    maze[r] = [];
    for (var c = 0; c < cols; c++) {
      maze[r][c] = { n: true, s: true, e: true, w: true, v: false };
    }
  }

  // Start from a random cell near center for better spread
  var stack = [];
  var sr = Math.floor(rows / 2);
  var sc = Math.floor(cols / 2);
  maze[sr][sc].v = true;
  stack.push({ r: sr, c: sc });

  while (stack.length > 0) {
    var cur = stack[stack.length - 1];
    var r = cur.r, c = cur.c;
    var nb = [];

    if (r > 0        && !maze[r-1][c].v) nb.push({ r: r-1, c: c,   d: 'n', o: 's' });
    if (r < rows - 1 && !maze[r+1][c].v) nb.push({ r: r+1, c: c,   d: 's', o: 'n' });
    if (c > 0        && !maze[r][c-1].v) nb.push({ r: r,   c: c-1, d: 'w', o: 'e' });
    if (c < cols - 1 && !maze[r][c+1].v) nb.push({ r: r,   c: c+1, d: 'e', o: 'w' });

    if (nb.length > 0) {
      var next = nb[Math.floor(Math.random() * nb.length)];
      maze[r][c][next.d]           = false;
      maze[next.r][next.c][next.o] = false;
      maze[next.r][next.c].v       = true;
      stack.push({ r: next.r, c: next.c });
    } else {
      stack.pop();
    }
  }

  // Strip visited flag
  for (r = 0; r < rows; r++) {
    for (c = 0; c < cols; c++) {
      delete maze[r][c].v;
    }
  }

  return maze;
}

// Pick a cell for the Irrlicht that is far from both player corners
function pickIrrLichtCell(cols, rows) {
  var minD = Math.floor(Math.min(cols, rows) / 3) + 1;
  var candidates = [];
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      var d1 = Math.abs(c)          + Math.abs(r);           // dist from (0,0)
      var d2 = Math.abs(c-(cols-1)) + Math.abs(r-(rows-1));  // dist from (cols-1,rows-1)
      if (d1 >= minD && d2 >= minD) candidates.push({ c: c, r: r });
    }
  }
  if (candidates.length === 0) return { c: Math.floor(cols/2), r: Math.floor(rows/2) };
  return candidates[Math.floor(Math.random() * candidates.length)];
}
