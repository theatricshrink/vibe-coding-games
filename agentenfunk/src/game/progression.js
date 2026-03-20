var Progression = (function() {
  var SAVE_KEY = 'agentenfunk_progress';
  var state = load();

  function load() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return { wave: 1, missionsDone: 0, totalPlayMs: 0, campaignIdx: 0, campaignDone: false };
  }

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch(e) {}
  }

  function reset() {
    state = { wave: 1, missionsDone: 0, totalPlayMs: 0, campaignIdx: 0, campaignDone: false };
    save();
  }

  function getWave()         { return state.wave; }
  function getMissionsDone() { return state.missionsDone; }
  function getTotalPlayMs()  { return state.totalPlayMs; }

  function getUnlockedLetters() {
    return lettersUnlockedThrough(state.wave);
  }

  function unlockWave(w) {
    if (w > state.wave) { state.wave = w; save(); }
  }

  function completeMission(durationMs) {
    state.missionsDone += 1;
    state.totalPlayMs += durationMs;
    save();
  }

  function getCampaignIdx() { return state.campaignIdx; }
  function isCampaignDone() { return state.campaignDone; }

  function advanceCampaign() {
    if (state.campaignDone) return;
    // MISSIONS may not be loaded in test env — use length 12 as fallback
    var total = (typeof MISSIONS !== 'undefined') ? MISSIONS.length : 12;
    state.campaignIdx = Math.min(state.campaignIdx + 1, total);
    if (state.campaignIdx >= total) state.campaignDone = true;
    save();
  }

  function starsForAccuracy(accuracy, fast) {
    if (accuracy >= 0.95 && fast) return 3;
    if (accuracy >= 0.8)          return 2;
    return 1;
  }

  return {
    reset: reset,
    getWave: getWave,
    getMissionsDone: getMissionsDone,
    getTotalPlayMs: getTotalPlayMs,
    getUnlockedLetters: getUnlockedLetters,
    unlockWave: unlockWave,
    completeMission: completeMission,
    starsForAccuracy: starsForAccuracy,
    getCampaignIdx: getCampaignIdx,
    isCampaignDone: isCampaignDone,
    advanceCampaign: advanceCampaign
  };
})();
