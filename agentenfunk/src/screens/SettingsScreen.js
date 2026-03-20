var SettingsScreen = (function() {
  function render() {
    var el = document.getElementById('screen-settings');
    var pause = Input.getPause();
    var muted = Audio.isMuted();
    var ambient = Audio.isAmbientOn();

    el.innerHTML = [
      '<div class="panel"><div style="font-family:Oswald,sans-serif;font-size:1.2rem;letter-spacing:2px;">' + t('settingsTitle') + '</div></div>',

      '<div class="panel">',
      '  <div class="panel-label">' + t('settingsPause') + '</div>',
      '  <div style="display:flex;gap:8px;">',
      '  <button class="btn' + (pause===600?' active':'') + '" style="flex:1;" onclick="Input.setPause(600);SettingsScreen.render()">' + t('settingsPause600') + '</button>',
      '  <button class="btn' + (pause===900?' active':'') + '" style="flex:1;" onclick="Input.setPause(900);SettingsScreen.render()">' + t('settingsPause900') + '</button>',
      '  <button class="btn' + (pause===1200?' active':'') + '" style="flex:1;" onclick="Input.setPause(1200);SettingsScreen.render()">' + t('settingsPause1200') + '</button>',
      '  </div>',
      '</div>',

      '<div class="panel">',
      '  <button class="btn" onclick="SettingsScreen.toggleMute()">' + (muted ? t('unmute') : t('mute')) + ' ' + t('settingsMute') + '</button>',
      '  <button class="btn" onclick="SettingsScreen.toggleAmbient()">' + (ambient ? '\u25a0' : '\u25b6') + ' ' + t('settingsAmbient') + '</button>',
      '</div>',

      '<div class="panel" style="border-color:#331111;">',
      '  <div class="panel-label" style="color:#ff4444;">' + t('settingsDangerZone') + '</div>',
      '  <button class="btn" style="border-color:#ff3333;color:#ff3333;" onclick="SettingsScreen.confirmReset()">' + t('settingsReset') + '</button>',
      '</div>',

      '<button class="btn" onclick="Router.go(\'menu\')">' + t('settingsClose') + '</button>'
    ].join('');
  }

  function toggleMute()    { Audio.toggleMute();    render(); }
  function toggleAmbient() { Audio.toggleAmbient(); render(); }

  function confirmReset() {
    if (confirm(t('settingsResetConfirm'))) {
      resetAllProgress();
    }
  }

  function resetAllProgress() {
    var keys = ['agentenfunk_progress', 'agentenfunk_achievements', 'agentenfunk_nwd'];
    keys.forEach(function(k) { try { localStorage.removeItem(k); } catch(e) {} });
    Progression.reset();
    AchievementsEngine.reset();
    Router.go('menu');
  }

  return { render: render, toggleMute: toggleMute, toggleAmbient: toggleAmbient, confirmReset: confirmReset };
})();
