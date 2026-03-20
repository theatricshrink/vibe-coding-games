(function() {
  document.getElementById('html-root').lang = LANG;
  document.getElementById('back-btn').textContent = LANG === 'de' ? '\u2190 \u00DCbersicht' : '\u2190 Overview';
  Router.go('menu');

  // iOS requires AudioContext to be created inside a user gesture.
  // Unlock on first tap, then remove the listeners.
  function onFirstGesture() {
    Audio.unlock();
    document.removeEventListener('click', onFirstGesture);
  }
  document.addEventListener('click', onFirstGesture);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/agentenfunk/service-worker.js');
  }
})();
