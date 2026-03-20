(function() {
  document.getElementById('html-root').lang = LANG;
  document.getElementById('back-btn').textContent = LANG === 'de' ? '\u2190 \u00DCbersicht' : '\u2190 Overview';
  document.getElementById('lang-de').className = 'lang-btn' + (LANG === 'de' ? ' active' : '');
  document.getElementById('lang-en').className = 'lang-btn' + (LANG === 'en' ? ' active' : '');
  Router.go('menu');
  Audio.startAmbient();
})();
