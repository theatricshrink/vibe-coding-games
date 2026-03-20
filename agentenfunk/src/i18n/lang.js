// Language follows the portal selection (pgame_lang key set by index.html)
var LANG = (function() {
  var stored = localStorage.getItem('pgame_lang');
  if (stored === 'en' || stored === 'de') return stored;
  var nav = (navigator.language || 'en').toLowerCase();
  return nav.startsWith('de') ? 'de' : 'en';
})();
