var MissionScreen = (function() {
  function render() {
    // All missions played earns all wave unlocks — repair any stale saved state
    if (Progression.isFinaleReady()) Progression.unlockWave(6);
    var wave = Progression.getWave();
    var missions = getMissionsForWave(wave);
    var el = document.getElementById('screen-mission');

    var rows = missions.map(function(m) {
      return [
        '<div class="panel" style="cursor:pointer;" onclick="MissionScreen.selectMission(\'' + m.id + '\')">',
        '<div class="panel-label">' + t('wave' + m.wave) + ' // ' + m.mode.toUpperCase() + '</div>',
        '<div style="font-family:Oswald,sans-serif;font-size:1.1rem;margin-bottom:6px;">' + m.name[LANG] + '</div>',
        '<div style="color:var(--dim);font-size:0.85rem;">' + m.briefing[LANG] + '</div>',
        '</div>'
      ].join('');
    }).join('');

    el.innerHTML = [
      '<div class="panel"><div class="panel-label">' + t('missionTitle') + ' // ' + t('menuFreePlay') + '</div>',
      '<p style="color:var(--dim);font-size:0.8rem;letter-spacing:2px;">' + t('missionClassified') + '</p></div>',
      rows,
      '<button class="btn" onclick="Router.go(\'menu\')">' + t('back') + '</button>'
    ].join('');
  }

  function startCampaign() {
    var idx = Progression.getCampaignIdx();
    if (Progression.isFinaleReady()) {
      Router.go('campaign-end');
      return;
    }
    var mission = MISSIONS[idx];
    if (!mission) { Router.go('campaign-end'); return; }
    launchMission(mission, true);
  }

  function selectMission(id) {
    var mission = MISSIONS.filter(function(m) { return m.id === id; })[0];
    if (!mission) return;
    launchMission(mission, false);
  }

  function launchMission(mission, isCampaign) {
    // In campaign mode, always unlock up to this mission's wave so the
    // morse reference shows all letters the mission can ask about.
    if (isCampaign) Progression.unlockWave(mission.wave);
    if (mission.mode === 'decode') DecodeScreen.start(mission, isCampaign);
    else                           EncodeScreen.start(mission, isCampaign);
  }

  return { render: render, startCampaign: startCampaign, selectMission: selectMission };
})();
