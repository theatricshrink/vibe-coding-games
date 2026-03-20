var DecodeScreen = (function() {
  var mission = null;
  var letters = [];
  var currentIdx = 0;
  var correct = 0;
  var total = 0;
  var streak = 0;
  var signal = 100;
  var missionStart = 0;
  var noRefUsed = true;
  var hadErrors = false;
  var isCampaign = false;
  var QUESTIONS_PER_MISSION = 10;
  var isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  function start(m, campaign) {
    isCampaign = !!campaign;
    mission = m;
    var wave = MORSE_WAVES[m.wave];
    var prev = lettersUnlockedThrough(m.wave - 1);
    var pool = [];
    for (var i = 0; i < QUESTIONS_PER_MISSION; i++) {
      pool.push(Math.random() < 0.6
        ? wave[Math.floor(Math.random() * wave.length)]
        : (prev.length ? prev[Math.floor(Math.random() * prev.length)] : wave[0]));
    }
    letters = pool;
    currentIdx = 0; correct = 0; total = 0; streak = 0; signal = 100; noRefUsed = true; hadErrors = false;
    missionStart = Date.now();
    Input.disable();
    Router.go('decode');
  }

  function render() {
    if (!mission) return;
    var el = document.getElementById('screen-decode');
    var useChoices = isMobile || mission.wave <= 3;

    el.innerHTML = [
      '<div class="panel">',
      '  <div class="panel-label">' + mission.name[LANG] + '</div>',
      '  <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--dim);">',
      '    <span>' + t('decodeStreak') + ': <b style="color:var(--green)">' + streak + '</b></span>',
      '    <span>' + t('decodeAccuracy') + ': <b>' + (total ? Math.round(correct/total*100) : 100) + '%</b></span>',
      '    <span>' + (currentIdx+1) + '/' + QUESTIONS_PER_MISSION + '</span>',
      '  </div>',
      '  <div style="margin-top:8px;"><div class="signal-meter"><div id="sig-fill" style="width:' + signal + '%;height:100%;background:' + (signal > 60 ? 'var(--green)' : signal > 30 ? 'var(--amber)' : 'var(--red)') + ';transition:width 0.3s;"></div></div></div>',
      '</div>',
      '<div class="panel" style="text-align:center;">',
      '  <div class="panel-label">' + t('decodeInstruction') + '</div>',
      '  <div class="morse-display" id="morse-anim">\xb7 \u2014 \xb7</div>',
      '  <div style="color:var(--dim);font-size:0.75rem;margin-top:4px;" id="morse-letter-prompt"></div>',
      '</div>',
      useChoices ? renderChoices() : renderInput(),
      '<div style="display:flex;gap:8px;margin-top:8px;">',
      '  <button class="btn" style="flex:1;" onclick="DecodeScreen.replayMorse()">\u21ba REPLAY</button>',
      '  <button class="btn" style="flex:1;" onclick="MorseReference.show();DecodeScreen._noRef()">\u2261 REF</button>',
      '</div>'
    ].join('');

    playCurrentLetter();
  }

  function _noRef() { noRefUsed = false; }

  function renderChoices() {
    var target = letters[currentIdx];
    var pool = Progression.getUnlockedLetters();
    var wrong = pool.filter(function(l) { return l !== target; });
    shuffle(wrong);
    var opts = [target].concat(wrong.slice(0,3));
    shuffle(opts);
    return '<div class="choices" id="answer-choices">' +
      opts.map(function(l) {
        return '<button class="choice-btn" onclick="DecodeScreen.checkAnswer(\'' + l + '\')">' + l + '</button>';
      }).join('') + '</div>';
  }

  function renderInput() {
    return '<div style="padding:16px 0;text-align:center;">' +
      '<input id="free-input" maxlength="1" style="background:var(--panel-bg);border:1px solid var(--border);color:var(--green);font-family:\'Share Tech Mono\',monospace;font-size:2rem;width:60px;text-align:center;padding:8px;text-transform:uppercase;" autocomplete="off"/>' +
      '<br/><button class="btn" style="margin-top:8px;" onclick="DecodeScreen.checkAnswer(document.getElementById(\'free-input\').value.toUpperCase())">CONFIRM</button>' +
      '</div>';
  }

  function playCurrentLetter() {
    var target = letters[currentIdx];
    var code = MORSE[target];
    var disp = document.getElementById('morse-anim');
    if (!disp) return;
    disp.textContent = '';
    Audio.playMorse(code, function(sym) {
      if (disp) {
        disp.textContent += (disp.textContent ? ' ' : '') + (sym === '.' ? '\xb7' : '\u2014');
        disp.classList.add('pulse');
        setTimeout(function() { if (disp) disp.classList.remove('pulse'); }, 600);
      }
    }).then(function() {
      AchievementsEngine.setLetterPresentTime();
    });
  }

  function replayMorse() { playCurrentLetter(); }

  function checkAnswer(answer) {
    var target = letters[currentIdx];
    total++;
    var isCorrect = answer === target;
    if (isCorrect) {
      correct++;
      streak++;
      signal = Math.min(100, signal + 5);
      Audio.playCorrect();
      showFeedback(true, target);
      AchievementsEngine.onCorrectAnswer({ streak: streak });
      AchievementsEngine.onLetterCorrectAfterFails(target);
    } else {
      hadErrors = true;
      streak = 0;
      signal = Math.max(0, signal - 15);
      Audio.playWrong();
      showFeedback(false, target);
      AchievementsEngine.onWrongAnswer({ letter: target });
    }
    var choices = document.querySelectorAll('.choice-btn');
    choices.forEach(function(b) { b.disabled = true; });

    setTimeout(function() {
      currentIdx++;
      if (currentIdx >= QUESTIONS_PER_MISSION) {
        endMission();
      } else {
        render();
      }
    }, 1000);
  }

  function showFeedback(ok, correctLetter) {
    var prompt = document.getElementById('morse-letter-prompt');
    if (prompt) {
      prompt.textContent = ok
        ? t('decodeCorrect')
        : t('decodeWrong') + ' (' + correctLetter + ' = ' + morseToDisplay(MORSE[correctLetter]) + ')';
      prompt.style.color = ok ? 'var(--green)' : 'var(--red)';
    }
  }

  function endMission() {
    var durationMs = Date.now() - missionStart;
    var accuracy = total ? correct / total : 1;
    var fast = durationMs < QUESTIONS_PER_MISSION * 3000;
    var stars = Progression.starsForAccuracy(accuracy, fast);
    Progression.completeMission(durationMs);
    var triggeredWaveUnlock = false;
    if (accuracy >= 0.8 && mission.wave === Progression.getWave()) {
      Progression.unlockWave(mission.wave + 1);
      triggeredWaveUnlock = true;
    }
    AchievementsEngine.onMissionComplete({
      accuracy: accuracy, fast: fast, noRef: noRefUsed, wave: mission.wave,
      hadErrors: hadErrors, triggeredWaveUnlock: triggeredWaveUnlock,
      mode: 'decode', durationMs: durationMs
    });

    if (isCampaign) Progression.advanceCampaign();
    showEndScreen(stars, accuracy);
  }

  function showEndScreen(stars, accuracy) {
    var el = document.getElementById('screen-decode');
    var starStr = '\u2605'.repeat(stars) + '\u2606'.repeat(3 - stars);
    var label = stars === 3 ? t('stars3') : stars === 2 ? t('stars2') : t('stars1');
    var nextBtn = isCampaign
      ? (Progression.isCampaignDone()
          ? '<button class="btn" onclick="Router.go(\'campaign-end\')">' + t('campaignComplete') + ' \u2192</button>'
          : '<button class="btn" onclick="MissionScreen.startCampaign()">NEXT MISSION \u2192</button>')
      : '<button class="btn" onclick="Router.go(\'mission\')">' + t('menuFreePlay') + '</button>';

    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;">',
      '<div style="font-size:3rem;letter-spacing:8px;">' + starStr + '</div>',
      '<div style="font-family:Oswald,sans-serif;letter-spacing:2px;">' + label + '</div>',
      '<div style="color:var(--dim);">' + t('decodeAccuracy') + ': ' + Math.round(accuracy*100) + '%</div>',
      nextBtn,
      '<button class="btn" onclick="Router.go(\'menu\')">' + t('back') + '</button>',
      '</div>'
    ].join('');
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i+1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  return { start: start, render: render, replayMorse: replayMorse, checkAnswer: checkAnswer, _noRef: _noRef };
})();
