var assert = require('./assert');
// morse.js exposes MORSE global — load it
eval(require('fs').readFileSync(__dirname + '/../src/data/morse.js', 'utf8'));

assert(MORSE['E'] === '.', 'E is dot');
assert(MORSE['T'] === '-', 'T is dash');
assert(MORSE['A'] === '.-', 'A is dot-dash');
assert(MORSE['S'] === '...', 'S is three dots');
assert(MORSE['O'] === '---', 'O is three dashes');
assert(MORSE['0'] === '-----', '0 is five dashes');
assert(Object.keys(MORSE).length === 36, '26 letters + 10 digits');

// MORSE_REVERSE: code -> letter
assert(MORSE_REVERSE['.'] === 'E', 'reverse E');
assert(MORSE_REVERSE['.-'] === 'A', 'reverse A');

// MORSE_WAVES: wave array structure
assert(MORSE_WAVES[1].length === 2, 'wave 1 has 2 letters');
assert(MORSE_WAVES[1].indexOf('E') !== -1, 'wave 1 contains E');
assert(MORSE_WAVES[1].indexOf('T') !== -1, 'wave 1 contains T');
assert(MORSE_WAVES[6].length === 10, 'wave 6 has 10 digits');

// lettersUnlockedThrough
assert(lettersUnlockedThrough(1).length === 2, 'through wave 1: 2 letters');
assert(lettersUnlockedThrough(2).length === 4, 'through wave 2: 4 letters');

// morseToDisplay
assert(morseToDisplay('.-') === '· —', 'dot-dash displays as · —');
assert(morseToDisplay('...') === '· · ·', 'SOS S displays correctly');

console.log('\nAll morse tests passed.');
