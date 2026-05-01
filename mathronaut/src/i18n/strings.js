var STRINGS = { de: {}, en: {} };
function t(key) { return (STRINGS[LANG] && STRINGS[LANG][key]) || STRINGS['en'][key] || key; }
