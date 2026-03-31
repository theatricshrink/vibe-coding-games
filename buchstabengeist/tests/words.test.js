var assert = require('./assert');

global.localStorage = { getItem: function() { return null; } };
eval(require('fs').readFileSync(__dirname + '/../src/i18n/lang.js', 'utf8'));
eval(require('fs').readFileSync(__dirname + '/../src/data/words.js', 'utf8'));

assert(Array.isArray(WORDS_EN), 'WORDS_EN is array');
assert(Array.isArray(WORDS_DE), 'WORDS_DE is array');
assert(WORDS_EN.length === 30, 'WORDS_EN has 30 entries (got ' + WORDS_EN.length + ')');
assert(WORDS_DE.length === 30, 'WORDS_DE has 30 entries (got ' + WORDS_DE.length + ')');

var VALID_CHARS = /^[A-Z]+$/;

WORDS_EN.forEach(function(entry, i) {
  var label = 'EN[' + i + '] ' + entry.word;
  assert(typeof entry.word === 'string', label + ' has word');
  assert(VALID_CHARS.test(entry.word), label + ' word is uppercase A-Z only');
  assert(entry.word.length >= 3 && entry.word.length <= 6, label + ' word length 3-6 (got ' + entry.word.length + ')');
  assert(typeof entry.hint === 'string' && entry.hint.length > 0, label + ' has hint');
});

WORDS_DE.forEach(function(entry, i) {
  var label = 'DE[' + i + '] ' + entry.word;
  assert(typeof entry.word === 'string', label + ' has word');
  assert(VALID_CHARS.test(entry.word), label + ' word is uppercase A-Z only (no Umlauts)');
  assert(entry.word.length >= 3 && entry.word.length <= 8, label + ' word length 3-8 (got ' + entry.word.length + ')');
  assert(typeof entry.hint === 'string' && entry.hint.length > 0, label + ' has hint');
});

// No duplicate words within each bank
var enWords = WORDS_EN.map(function(e) { return e.word; });
var deWords = WORDS_DE.map(function(e) { return e.word; });
var enUniq = enWords.filter(function(w, i) { return enWords.indexOf(w) === i; });
var deUniq = deWords.filter(function(w, i) { return deWords.indexOf(w) === i; });
assert(enUniq.length === WORDS_EN.length, 'WORDS_EN has no duplicates');
assert(deUniq.length === WORDS_DE.length, 'WORDS_DE has no duplicates');
