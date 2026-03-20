var MORSE = {
  'A':'.-',   'B':'-...', 'C':'-.-.', 'D':'-..',  'E':'.',
  'F':'..-.', 'G':'--.',  'H':'....', 'I':'..',   'J':'.---',
  'K':'-.-',  'L':'.-..', 'M':'--',   'N':'-.',   'O':'---',
  'P':'.--.', 'Q':'--.-', 'R':'.-.',  'S':'...',  'T':'-',
  'U':'..-',  'V':'...-', 'W':'.--',  'X':'-..-', 'Y':'-.--',
  'Z':'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-',
  '5':'.....','6':'-....','7':'--...','8':'---..','9':'----.'
};

var MORSE_REVERSE = (function() {
  var r = {};
  Object.keys(MORSE).forEach(function(k) { r[MORSE[k]] = k; });
  return r;
})();

// WAVES: letters introduced per wave
var MORSE_WAVES = [
  [],                          // wave 0 (unused)
  ['E','T'],                   // wave 1
  ['A','N'],                   // wave 2
  ['I','M','S','O'],           // wave 3
  ['D','G','K','R','U','W'],   // wave 4
  ['B','C','F','H','J','L','P','Q','V','X','Y','Z'], // wave 5 (remainder)
  ['0','1','2','3','4','5','6','7','8','9']           // wave 6
];

// Returns all letters unlocked up through waveIndex
function lettersUnlockedThrough(waveIndex) {
  var result = [];
  for (var i = 1; i <= waveIndex; i++) {
    result = result.concat(MORSE_WAVES[i] || []);
  }
  return result;
}

// Render a morse code string as dot/dash unicode symbols
function morseToDisplay(code) {
  return code.split('').map(function(c) {
    return c === '.' ? '·' : '—';
  }).join(' ');
}
