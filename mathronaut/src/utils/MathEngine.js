var MathEngine = (function() {
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function uniqueDistractors(correct, candidates) {
    var filtered = candidates.filter(function(v) { return v !== correct; });
    var seen = {};
    var unique = [];
    for (var i = 0; i < filtered.length; i++) {
      var v = filtered[i];
      if (!seen[v]) { seen[v] = true; unique.push(v); }
    }
    return unique.slice(0, 2);
  }

  function generateT1() {
    var a = randInt(2, 20), b = randInt(2, 15);
    var op = Math.random() < 0.5 ? '+' : '-';
    if (op === '-' && b > a) { var tmp = a; a = b; b = tmp; }
    var correct = op === '+' ? a + b : a - b;
    var candidates = [correct + 1, correct - 1, correct + 2, correct - 2];
    var distractors = uniqueDistractors(correct, candidates.filter(function(v) { return v > 0; }));
    if (distractors.length < 2) distractors = [correct + 1, correct + 2];
    return { question: a + ' ' + op + ' ' + b + ' = ?', correct: correct, distractors: distractors };
  }

  function generateT2() {
    var a = randInt(2, 9), b = randInt(2, 9);
    var correct = a * b;
    var candidates = [a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b];
    var distractors = uniqueDistractors(correct, candidates.filter(function(v) { return v > 0; }));
    if (distractors.length < 2) distractors = [correct + a, correct - b];
    return { question: a + ' × ' + b + ' = ?', correct: correct, distractors: distractors };
  }

  function generateT3() {
    var divisor = randInt(2, 9), quotient = randInt(2, 9);
    var dividend = divisor * quotient;
    var correct = quotient;
    var candidates = [quotient + 1, quotient - 1, quotient + 2, divisor];
    var distractors = uniqueDistractors(correct, candidates.filter(function(v) { return v > 0 && v !== correct; }));
    if (distractors.length < 2) distractors = [correct + 1, correct + 2];
    return { question: dividend + ' ÷ ' + divisor + ' = ?', correct: correct, distractors: distractors };
  }

  function generateT4() {
    var pool = MATH_PROBLEMS.fractions;
    var item = pool[randInt(0, pool.length - 1)];
    return { question: item.question, correct: item.correct, distractors: item.distractors.slice() };
  }

  var generators = [null, generateT1, generateT2, generateT3, generateT4];

  return {
    generate: function(tier) {
      return generators[tier]();
    }
  };
})();

if (typeof module !== 'undefined') module.exports = { MathEngine: MathEngine };
