(function() {
  document.getElementById('html-root').lang = LANG;
  document.getElementById('back-btn').textContent = LANG === 'de' ? '\u2190 \u00DCbersicht' : '\u2190 Overview';
  Router.go('menu');
  Audio.startAmbient();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/agentenfunk/service-worker.js');
  }
})();
