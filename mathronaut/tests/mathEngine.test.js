// Run with: node mathronaut/tests/mathEngine.test.js
var fs = require('fs');
eval(fs.readFileSync('mathronaut/src/data/mathProblems.js', 'utf8'));
eval(fs.readFileSync('mathronaut/src/utils/MathEngine.js', 'utf8'));

var passed = 0;
function assert(condition, msg) {
  if (!condition) throw new Error('FAIL: ' + msg);
  passed++;
}

// generate() returns correct shape
for (var tier = 1; tier <= 4; tier++) {
  var result = MathEngine.generate(tier);
  assert(typeof result.question === 'string', 'tier ' + tier + ': question is string');
  assert(result.distractors.length === 2, 'tier ' + tier + ': 2 distractors');
  assert(result.distractors[0] !== result.correct, 'tier ' + tier + ': distractor[0] != correct');
  assert(result.distractors[1] !== result.correct, 'tier ' + tier + ': distractor[1] != correct');
  assert(result.distractors[0] !== result.distractors[1], 'tier ' + tier + ': distractors differ');
  assert(result.question.includes('?'), 'tier ' + tier + ': question contains ?');
}

// Tier 1: addition answer is numeric sum
var t1 = MathEngine.generate(1);
assert(typeof t1.correct === 'number', 'tier 1: correct is number');
assert(t1.correct >= 1, 'tier 1: correct answer >= 1');

// Tier 2: multiplication table 2-9
var t2 = MathEngine.generate(2);
assert(typeof t2.correct === 'number', 'tier 2: correct is number');
assert(t2.correct >= 4 && t2.correct <= 81, 'tier 2: result in 2x2..9x9 range');

// Tier 3: division produces whole number
var t3 = MathEngine.generate(3);
assert(Number.isInteger(t3.correct), 'tier 3: division result is integer');
assert(t3.question.includes('÷'), 'tier 3: question contains ÷');

// Tier 4: fractions — correct is a string like "3/4"
var t4 = MathEngine.generate(4);
assert(typeof t4.correct === 'string', 'tier 4: correct is string fraction');
assert(t4.correct.includes('/'), 'tier 4: correct contains /');

// generate() is non-deterministic: 10 calls to tier 2 should not all return same correct answer
var answers = [];
for (var i = 0; i < 10; i++) answers.push(MathEngine.generate(2).correct);
var unique = answers.filter(function(v, i, a) { return a.indexOf(v) === i; });
assert(unique.length > 1, 'tier 2: generate() produces varied answers over 10 calls');

console.log('All ' + passed + ' tests passed.');
