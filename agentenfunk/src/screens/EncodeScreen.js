var EncodeScreen = (function() {
  var mission = null;
  var letters = [];
  var currentIdx = 0;
  var correct = 0;
  var total = 0;
  var streak = 0;
  var signal = 100;
  var missionStart = 0;
  var currentSequence = '';
  var hadErrors = false;
  var QUESTIONS_PER_MISSION = 8;
  var wrongCount = {};
  var sosLetters = '';
  var isCampaign = false;

  function start(m, campaign) {
    Audio.unlock();
    isCampaign = !!campaign;
    mission = m;
    var wave = MORSE_WAVES[m.wave];
    var prev = lettersUnlockedThrough(m.wave - 1);
    // Fewer questions for tiny wave pools (e.g. wave 1 has only E & T)
    QUESTIONS_PER_MISSION = wave.length <= 2 ? 6 : 8;
    letters = buildPool(wave, prev, QUESTIONS_PER_MISSION);
    currentIdx = 0; correct = 0; total = 0; streak = 0; signal = 100; hadErrors = false;
    missionStart = Date.now();
    wrongCount = {};
    sosLetters = '';
    Router.go('encode');
  }

  function render() {
    if (!mission) return;
    var target = letters[currentIdx];
    var el = document.getElementById('screen-encode');
    el.innerHTML = [
      '<div class="panel">',
      '  <div class="panel-label">' + mission.name[LANG] + '</div>',
      '  <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--dim);">',
      '    <span>' + t('decodeStreak') + ': <b style="color:var(--green)">' + streak + '</b></span>',
      '    <span>' + (currentIdx+1) + '/' + QUESTIONS_PER_MISSION + '</span>',
      '  </div>',
      '  <div style="margin-top:8px;"><div class="signal-meter"><div id="sig-fill" style="width:' + signal + '%;height:100%;background:var(--green);transition:width 0.3s;"></div></div></div>',
      '</div>',
      '<div class="panel" style="text-align:center;">',
      '  <div class="panel-label">' + t('encodeInstruction') + '</div>',
      '  <div style="font-size:4rem;font-family:Oswald,sans-serif;color:var(--green);">' + target + '</div>',
      '  <div style="color:var(--dim);font-size:0.75rem;margin-top:4px;">' + t('encodeHint') + '</div>',
      '</div>',
      '<div class="panel">',
      '  <div class="panel-label">INPUT DISPLAY</div>',
      '  <div class="morse-display" id="input-display" style="min-height:2rem;text-align:center;">&nbsp;</div>',
      '</div>',
      '<div class="tap-zones" id="tap-zones">',
      '  <div class="tap-zone" id="zone-dot">' + t('encodeDot') + '</div>',
      '  <div class="tap-zone" id="zone-dash">' + t('encodeDash') + '</div>',
      '</div>',
      '<div style="display:flex;gap:8px;margin-top:8px;">',
      '  <button class="btn" style="flex:1;" onclick="MorseReference.show()">\u2261 REF</button>',
      '</div>',
      '<button class="btn" style="width:100%;margin-top:4px;border-color:var(--red);color:var(--red);" onclick="EncodeScreen.abort()">\u2715 ' + t('abort') + '</button>'
    ].join('');

    currentSequence = '';

    Input.enable();
    Input.onDot(function() {
      currentSequence += '.';
      updateDisplay();
    });
    Input.onDash(function() {
      currentSequence += '-';
      updateDisplay();
    });
    Input.onConfirm(function(seq) {
      currentSequence = '';
      checkAnswer(seq);
    });
    Input.bindTapZones(
      document.getElementById('zone-dot'),
      document.getElementById('zone-dash')
    );
  }

  function updateDisplay() {
    var disp = document.getElementById('input-display');
    if (disp) {
      disp.textContent = currentSequence.split('').map(function(c) {
        return c === '.' ? '\xb7' : '\u2014';
      }).join(' ');
    }
  }

  function checkAnswer(seq) {
    var target = letters[currentIdx];
    var expected = MORSE[target];
    total++;
    var isCorrect = seq === expected;
    if (isCorrect) {
      correct++;
      streak++;
      signal = Math.min(100, signal + 5);
      Audio.playCorrect();
      AchievementsEngine.onCorrectAnswer({ streak: streak });
      AchievementsEngine.onLetterCorrectAfterFails(target);
      // SOS Easter egg: track correctly encoded letters, not raw morse
      sosLetters += target;
      if (sosLetters.length > 5) sosLetters = sosLetters.slice(-5);
      if (sosLetters.slice(-3) === 'SOS') AchievementsEngine.unlock('sos');
    } else {
      hadErrors = true;
      streak = 0;
      signal = Math.max(0, signal - 15);
      Audio.playWrong();
      wrongCount[target] = (wrongCount[target] || 0) + 1;
      AchievementsEngine.onWrongAnswer({ letter: target });
    }

    Input.disable();
    var disp = document.getElementById('input-display');
    if (disp) {
      disp.textContent = isCorrect ? '\u2713 ' + morseToDisplay(expected) : '\u2717 ' + morseToDisplay(expected);
      disp.style.color = isCorrect ? 'var(--green)' : 'var(--red)';
    }

    setTimeout(function() {
      currentIdx++;
      if (currentIdx >= QUESTIONS_PER_MISSION) endMission();
      else render();
    }, 1200);
  }

  function endMission() {
    var durationMs = Date.now() - missionStart;
    var accuracy = total ? correct / total : 1;
    var fast = durationMs < QUESTIONS_PER_MISSION * 5000;
    var stars = Progression.starsForAccuracy(accuracy, fast);
    Progression.completeMission(durationMs);
    var triggeredWaveUnlock = false;
    if (accuracy >= 0.8 && mission.wave === Progression.getWave()) {
      Progression.unlockWave(mission.wave + 1);
      triggeredWaveUnlock = true;
    }
    AchievementsEngine.onMissionComplete({
      accuracy: accuracy, fast: fast, wave: mission.wave, durationMs: durationMs,
      mode: 'encode', hadErrors: hadErrors, triggeredWaveUnlock: triggeredWaveUnlock
    });

    if (isCampaign) {
      Progression.unlockWave(mission.wave);
      Progression.advanceCampaign();
    }

    var el = document.getElementById('screen-encode');
    var starStr = '\u2605'.repeat(stars) + '\u2606'.repeat(3 - stars);
    var nextBtn = isCampaign
      ? (Progression.isFinaleReady()
          ? '<button class="btn" onclick="Router.go(\'campaign-end\')">' + t('campaignToFinale') + '</button>'
          : '<button class="btn" onclick="MissionScreen.startCampaign()">NEXT MISSION \u2192</button>')
      : '<button class="btn" onclick="Router.go(\'mission\')">' + t('menuFreePlay') + '</button>';

    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;">',
      '<div style="font-size:3rem;letter-spacing:8px;">' + starStr + '</div>',
      '<div style="font-family:Oswald,sans-serif;letter-spacing:2px;">' + (stars===3?t('stars3'):stars===2?t('stars2'):t('stars1')) + '</div>',
      '<div style="color:var(--dim);">' + t('decodeAccuracy') + ': ' + Math.round(accuracy*100) + '%</div>',
      nextBtn,
      '<button class="btn" onclick="Router.go(\'menu\')">' + t('back') + '</button>',
      '</div>'
    ].join('');
  }

  function buildPool(wave, prev, count) {
    var guaranteed = wave.slice();
    shuffle(guaranteed);
    var pool = guaranteed.slice(0, Math.min(count, guaranteed.length));
    while (pool.length < count) {
      pool.push(Math.random() < 0.6
        ? wave[Math.floor(Math.random() * wave.length)]
        : (prev.length ? prev[Math.floor(Math.random() * prev.length)] : wave[Math.floor(Math.random() * wave.length)]));
    }
    shuffle(pool);
    return pool;
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i+1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function abort() {
    Input.disable();
    Router.go('menu');
  }

  return { start: start, render: render, abort: abort };
})();
