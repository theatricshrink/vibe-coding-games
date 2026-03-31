var DIR_DELTA = {
  up:    { dr: -1, dc:  0 },
  down:  { dr:  1, dc:  0 },
  left:  { dr:  0, dc: -1 },
  right: { dr:  0, dc:  1 }
};

var DIR_REVERSE = { up: 'down', down: 'up', left: 'right', right: 'left' };

function canMove(maze, r, c, dir) {
  var d = DIR_DELTA[dir];
  var nr = r + d.dr;
  var nc = c + d.dc;
  var cols = maze[0].length;
  if (nc < 0) nc = cols - 1;
  if (nc >= cols) nc = 0;
  if (nr < 0 || nr >= maze.length) return false;
  return maze[nr][nc] === 0;
}

function ghostOverlapsPac(pac, ghost) {
  return Math.abs(pac.r - ghost.r) < 0.58 && Math.abs(pac.c - ghost.c) < 0.58;
}

function pickWord(words, lastWord) {
  var pool = lastWord ? words.filter(function(w) { return w.word !== lastWord; }) : words;
  return pool[Math.floor(Math.random() * pool.length)];
}

function calcScoreDelta(event, level) {
  switch (event) {
    case 'correctEat':   return 100 + level * 20;
    case 'wordComplete': return 300 + level * 50;
    case 'wrongEat':     return -50;
    case 'sparePellet':  return 50;
    default:             return 0;
  }
}

function getNextTargetIdx(ghosts) {
  var min = Infinity, idx = -1;
  for (var i = 0; i < ghosts.length; i++) {
    if (!ghosts[i].eaten && ghosts[i].wordIdx < min) {
      min = ghosts[i].wordIdx;
      idx = i;
    }
  }
  return idx;
}

// Ghost direction AI: called at tile boundary.
// Returns best direction for ghost given pac position, scared state.
function chooseGhostDir(maze, ghost, pac, scared) {
  var r = Math.round(ghost.r);
  var c = Math.round(ghost.c);
  var dirs = ['up', 'down', 'left', 'right'];
  var rev = DIR_REVERSE[ghost.dir];
  var valid = dirs.filter(function(d) {
    return d !== rev && canMove(maze, r, c, d);
  });
  if (valid.length === 0) valid = [rev]; // dead end: reverse

  if (scared) {
    // Flee: maximise distance to pac
    valid.sort(function(a, b) {
      var da = DIR_DELTA[a], db = DIR_DELTA[b];
      var dA = Math.pow(r + da.dr - pac.r, 2) + Math.pow(c + da.dc - pac.c, 2);
      var dB = Math.pow(r + db.dr - pac.r, 2) + Math.pow(c + db.dc - pac.c, 2);
      return dB - dA;
    });
    return valid[0];
  }

  if (Math.random() < 0.7) {
    // Chase: minimise distance to pac
    valid.sort(function(a, b) {
      var da = DIR_DELTA[a], db = DIR_DELTA[b];
      var dA = Math.pow(r + da.dr - pac.r, 2) + Math.pow(c + da.dc - pac.c, 2);
      var dB = Math.pow(r + db.dr - pac.r, 2) + Math.pow(c + db.dc - pac.c, 2);
      return dA - dB;
    });
    return valid[0];
  }

  return valid[Math.floor(Math.random() * valid.length)];
}
