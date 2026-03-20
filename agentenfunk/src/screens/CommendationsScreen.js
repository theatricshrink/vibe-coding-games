var CommendationsScreen = (function() {
  function render() {
    var all = AchievementsEngine.getAll();
    var unlockedCount = all.filter(function(a) { return a.unlocked; }).length;
    var el = document.getElementById('screen-commend');

    var grid = all.map(function(a) {
      return Badges.render(a.def, a.unlocked, a.date);
    }).join('');

    el.innerHTML = [
      '<div class="panel">',
      '  <div style="font-family:Oswald,sans-serif;font-size:1.3rem;letter-spacing:3px;">' + t('commendTitle') + ' // ' + t('commendSubtitle') + '</div>',
      '  <div style="color:var(--dim);font-size:0.8rem;margin-top:4px;">' +
         unlockedCount + ' / ' + all.length + ' ' + t('commendCount') + '</div>',
      '</div>',
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px;padding-bottom:80px;">',
      grid,
      '</div>',
      '<button class="btn" style="position:sticky;bottom:8px;width:100%;" onclick="Router.go(\'menu\')">' + t('back') + '</button>'
    ].join('');
  }
  return { render: render };
})();
