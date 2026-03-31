var assert = require('./assert');

// Load strings without browser globals
global.localStorage = { getItem: function() { return null; } };
eval(require('fs').readFileSync(__dirname + '/../src/i18n/lang.js', 'utf8'));
eval(require('fs').readFileSync(__dirname + '/../src/i18n/strings.js', 'utf8'));

var REQUIRED_KEYS = [
  'title','spell','score','level','lives',
  'modeChallenge','modeGuided','descChallenge','descGuided',
  'controls','playBtn','playAgain','gameOver','wordComplete','livesOut'
];

assert(typeof STRINGS === 'object', 'STRINGS is defined');
assert(typeof STRINGS.en === 'object', 'STRINGS.en exists');
assert(typeof STRINGS.de === 'object', 'STRINGS.de exists');

REQUIRED_KEYS.forEach(function(key) {
  assert(typeof STRINGS.en[key] === 'string' && STRINGS.en[key].length > 0, 'en.' + key + ' is non-empty string');
  assert(typeof STRINGS.de[key] === 'string' && STRINGS.de[key].length > 0, 'de.' + key + ' is non-empty string');
});

assert(Object.keys(STRINGS.en).length === REQUIRED_KEYS.length, 'en has exactly ' + REQUIRED_KEYS.length + ' keys');
assert(Object.keys(STRINGS.de).length === REQUIRED_KEYS.length, 'de has exactly ' + REQUIRED_KEYS.length + ' keys');
