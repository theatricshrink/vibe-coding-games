var LANG = (function() {
  var stored = localStorage.getItem('agentenfunk_lang');
  if (stored === 'en' || stored === 'de') return stored;
  var nav = (navigator.language || 'en').toLowerCase();
  return nav.startsWith('de') ? 'de' : 'en';
})();

function setLang(lang) {
  localStorage.setItem('agentenfunk_lang', lang);
  LANG = lang;
  document.getElementById('html-root').lang = lang;
  document.getElementById('back-btn').textContent = lang === 'de' ? '← Übersicht' : '← Overview';
  document.getElementById('lang-de').className = 'lang-btn' + (lang === 'de' ? ' active' : '');
  document.getElementById('lang-en').className = 'lang-btn' + (lang === 'en' ? ' active' : '');
  if (typeof Router !== 'undefined') Router.render();
}
