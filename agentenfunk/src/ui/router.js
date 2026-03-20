var Router = (function() {
  var screens = ['menu','mission','decode','encode','commend','settings','campaign-end'];
  var current = null;

  function go(name, data) {
    screens.forEach(function(s) {
      var el = document.getElementById('screen-' + s);
      if (el) el.classList.remove('active');
    });
    var el = document.getElementById('screen-' + name);
    if (el) el.classList.add('active');
    current = name;
    var screenMap = {
      'menu':         MenuScreen,
      'mission':      MissionScreen,
      'decode':       DecodeScreen,
      'encode':       EncodeScreen,
      'commend':      CommendationsScreen,
      'settings':     SettingsScreen,
      'campaign-end': CampaignEndScreen
    };
    if (screenMap[name] && screenMap[name].render) screenMap[name].render(data);
  }

  function render() {
    if (current) go(current);
  }

  return { go: go, render: render };
})();
