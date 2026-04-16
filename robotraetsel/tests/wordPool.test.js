// robotraetsel/tests/wordPool.test.js
function assert(condition, message) {
  if (!condition) throw new Error('FAIL: ' + message);
  console.log('PASS: ' + message);
}

var WordPool = require('../src/utils/wordPool');

var testWords = [
  { word: 'HUND',    category: 'animal', lang: 'de' }, // 4
  { word: 'KATZE',   category: 'animal', lang: 'de' }, // 5
  { word: 'VOGEL',   category: 'animal', lang: 'de' }, // 5
  { word: 'ELEFANT', category: 'animal', lang: 'de' }, // 7
  { word: 'PINGUIN', category: 'animal', lang: 'de' }, // 7
  { word: 'KROKODIL',category: 'animal', lang: 'de' }, // 8
  { word: 'SCHMETTERLING', category: 'animal', lang: 'de' }, // 13
  { word: 'SCHILDKRÖTE',   category: 'animal', lang: 'de' }, // 11
  { word: 'BEAR',    category: 'animal', lang: 'en' }, // 4
  { word: 'LION',    category: 'animal', lang: 'en' }, // 4
  { word: 'DOLPHIN', category: 'animal', lang: 'en' }, // 7
  { word: 'CHIMPANZEE', category: 'animal', lang: 'en' }, // 10
];

// Test 1: only returns words matching lang
var pool = new WordPool(testWords, 'de');
var w = pool.draw(0, null);
assert(w.lang === 'de', 'draw returns only de words');

// Test 2: chain 0 → 4-6 letter word
pool = new WordPool(testWords, 'de');
w = pool.draw(0, null);
assert(w.word.length >= 4 && w.word.length <= 6, 'chain 0 returns 4-6 letter word');

// Test 3: chain 3 → 7-9 letter word
pool = new WordPool(testWords, 'de');
w = pool.draw(3, null);
assert(w.word.length >= 7 && w.word.length <= 9, 'chain 3 returns 7-9 letter word');

// Test 4: chain 6 → 10+ letter word
pool = new WordPool(testWords, 'de');
w = pool.draw(6, null);
assert(w.word.length >= 10, 'chain 6 returns 10+ letter word');

// Test 5: chain constraint filters by starting letter
pool = new WordPool(testWords, 'de');
w = pool.draw(0, 'K'); // KATZE is the only 4-6 letter word starting with K
assert(w.word[0] === 'K', 'chain constraint returns word starting with K');

// Test 6: chain constraint fallback when no matching word
pool = new WordPool(testWords, 'de');
w = pool.draw(0, 'Z'); // no 4-6 letter de word starts with Z → falls back
assert(w.lang === 'de' && w.word.length >= 4 && w.word.length <= 6,
  'chain constraint fallback: returns valid word when no match');

// Test 7: no replacement within a session
pool = new WordPool(testWords, 'de');
var drawn = {};
drawn[pool.draw(0, null).word] = true;
drawn[pool.draw(0, null).word] = true;
drawn[pool.draw(0, null).word] = true;
assert(Object.keys(drawn).length === 3, 'no replacement: 3 unique words before reset');

// Test 8: pool resets after exhaustion and continues drawing
pool = new WordPool(testWords, 'de');
pool.draw(0, null); pool.draw(0, null); pool.draw(0, null); // exhaust short bucket
var wAfterReset = pool.draw(0, null);
assert(wAfterReset && wAfterReset.lang === 'de', 'pool resets after exhaustion');

console.log('\nAll wordPool tests passed.');
