var AchievementsEngine = (function() {
  var SAVE_KEY = 'agentenfunk_achievements';
  var state = load();
  var consecutivePerfect = 0;
  var consecutiveZeroError = 0;
  var missionCallCount = 0;
  var wrongCounts = {};
  var letterPresentTime = null;
  var nightWatchDays = (function() {
    try { return JSON.parse(localStorage.getItem('agentenfunk_nwd') || '[]'); } catch(e) { return []; }
  })();

  function saveNwd() {
    try { localStorage.setItem('agentenfunk_nwd', JSON.stringify(nightWatchDays)); } catch(e) {}
  }

  function load() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return { unlocked: {}, dates: {} };
  }

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch(e) {}
  }

  function reset() {
    state = { unlocked: {}, dates: {} };
    consecutivePerfect = 0;
    consecutiveZeroError = 0;
    missionCallCount = 0;
    wrongCounts = {};
    nightWatchDays = [];
    save();
  }

  function isUnlocked(id) { return !!state.unlocked[id]; }

  function unlock(id) {
    if (state.unlocked[id]) return;
    state.unlocked[id] = true;
    state.dates[id] = Date.now();
    save();
    var def = getAchievementDef(id);
    if (!def) return;
    var silent = (id === 'night_shift');
    if (!silent) showOverlay(def);
  }

  function showOverlay(def) {
    var overlay = document.getElementById('achievement-overlay');
    var badgeEl = document.getElementById('achievement-badge-render');
    var citEl   = document.getElementById('achievement-citation');
    if (!overlay || !badgeEl || !citEl) return;
    var dismissBtn = overlay.querySelector('button');
    badgeEl.innerHTML = def.badge;
    citEl.innerHTML = '<b style="font-family:Oswald,sans-serif;font-size:1.1rem;letter-spacing:2px;">' +
      def.name[LANG] + '</b><br/><span style="color:var(--dim);font-size:0.9rem;">' +
      def.citation[LANG] + '</span>';
    if (dismissBtn) dismissBtn.textContent = t('achieveDismiss');
    overlay.classList.add('show');
    if (typeof Audio !== 'undefined') Audio.playMedalThud();
    var svg = badgeEl.querySelector('svg');
    if (svg) {
      svg.style.transition = 'transform 0.6s ease-out';
      svg.style.transform = 'rotate(360deg)';
    }
  }

  function dismissOverlay() {
    var overlay = document.getElementById('achievement-overlay');
    if (overlay) overlay.classList.remove('show');
  }

  function setLetterPresentTime() { letterPresentTime = Date.now(); }

  function onMissionComplete(data) {
    missionCallCount++;
    if (missionCallCount >= 1)  unlock('first_contact');
    var missionsDone = Progression.getMissionsDone();
    if (missionsDone >= 50)  unlock('veteran');
    if (missionsDone >= 100) unlock('centurion');

    if (data.accuracy >= 1.0) {
      unlock('ghost_signal');
      consecutivePerfect++;
    } else {
      consecutivePerfect = 0;
    }
    if (consecutivePerfect >= 3) unlock('perfect_run');

    if (!data.hadErrors) {
      consecutiveZeroError++;
    } else {
      consecutiveZeroError = 0;
    }
    if (consecutiveZeroError >= 5) unlock('iron_operator');

    if (!data.hadErrors && data.triggeredWaveUnlock) unlock('stone_cold');
    if (data.isFinaleMission) unlock('campaign_complete');
    if (data.noRef && data.wave >= 2) unlock('the_hard_way');
    if (data.wave >= 5) unlock('full_spectrum');
    if (data.wave >= 6) unlock('numbers_game');
    if (data.mode === 'encode' && data.durationMs && data.durationMs < 30000) unlock('blitz');

    var totalMs = Progression.getTotalPlayMs();
    if (totalMs >= 30 * 60 * 1000) unlock('cryptophile');

    var hour = new Date().getHours();
    if (hour >= 0 && hour < 4) {
      unlock('insomniac');
      var today = new Date().toDateString();
      if (nightWatchDays.indexOf(today) === -1) { nightWatchDays.push(today); saveNwd(); }
      if (nightWatchDays.length >= 3) unlock('night_shift');
    }
  }

  function onCorrectAnswer(data) {
    if (data.streak >= 20) unlock('untouchable');
    if (letterPresentTime && (Date.now() - letterPresentTime) < 1000) unlock('speed_of_light');
    letterPresentTime = null;
  }

  function onWrongAnswer(data) {
    if (data.letter) wrongCounts[data.letter] = (wrongCounts[data.letter] || 0) + 1;
    letterPresentTime = null;
  }

  function onLetterCorrectAfterFails(letter) {
    if ((wrongCounts[letter] || 0) >= 5) unlock('stubborn');
  }

  function checkSOS(sequence) {
    if (sequence.indexOf('...---...') !== -1) unlock('sos');
  }

  function getAll() {
    return ACHIEVEMENT_DEFS.map(function(def) {
      return { def: def, unlocked: isUnlocked(def.id), date: state.dates[def.id] || null };
    });
  }

  return {
    reset: reset,
    isUnlocked: isUnlocked,
    unlock: unlock,
    dismissOverlay: dismissOverlay,
    setLetterPresentTime: setLetterPresentTime,
    onMissionComplete: onMissionComplete,
    onCorrectAnswer: onCorrectAnswer,
    onWrongAnswer: onWrongAnswer,
    onLetterCorrectAfterFails: onLetterCorrectAfterFails,
    checkSOS: checkSOS,
    getAll: getAll
  };
})();
