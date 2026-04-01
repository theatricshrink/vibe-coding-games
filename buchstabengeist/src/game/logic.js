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

// Map game level (1-10) to a word-length range so difficulty grows.
//   Levels 1-3  → short  words (≤4 letters)
//   Levels 4-7  → medium words (5 letters)
//   Levels 8-10 → long   words (≥6 letters)
function _lengthRange(level) {
  if (level <= 3) return { min: 1, max: 4 };
  if (level <= 7) return { min: 5, max: 5 };
  return { min: 6, max: 99 };
}

// Pick a word appropriate for the current level, avoiding already-used words.
// Falls back to any unused word if the tier is exhausted, then resets.
function pickWord(words, usedWords, level) {
  var range = _lengthRange(level || 1);
  var inTier = function(w) {
    return w.word.length >= range.min && w.word.length <= range.max;
  };

  // Preferred: correct tier, not yet used
  var pool = words.filter(function(w) { return inTier(w) && usedWords.indexOf(w.word) === -1; });

  // Fallback: any unused word (tier exhausted)
  if (pool.length === 0) {
    pool = words.filter(function(w) { return usedWords.indexOf(w.word) === -1; });
  }

  // Last resort: all words used — restart cycle from tier
  if (pool.length === 0) {
    pool = words.filter(inTier);
    if (pool.length === 0) pool = words.slice();
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

function calcScoreDelta(event, level) {
  switch (event) {
    case 'correctEat':   return 100 + level * 20;
    case 'wordComplete': return 300 + level * 50;
    case 'wrongEat':     return -50;
    case 'loseLife':     return -200;
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
  var r = Math.floor(ghost.r);
  var c = Math.floor(ghost.c);
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
