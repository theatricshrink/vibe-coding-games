function assert(condition, message) {
  if (!condition) throw new Error('FAIL: ' + message);
  console.log('PASS: ' + message);
}

var QuestionPool = require('../src/utils/questionPool');

var sampleQuestions = [
  { id: 'q1', category: 'Mathe' },
  { id: 'q2', category: 'Mathe' },
  { id: 'q3', category: 'Mathe' },
  { id: 'q4', category: 'Deutsch' },
  { id: 'q5', category: 'Deutsch' }
];

var pool = new QuestionPool(sampleQuestions);

// Test 1: draw returns a question from correct category
var q = pool.draw('Mathe');
assert(q.category === 'Mathe', 'draw returns Mathe question');

// Test 2: draw without replacement — all 3 unique before reset
var seen = {};
seen[q.id] = true;
var q2 = pool.draw('Mathe'); seen[q2.id] = true;
var q3 = pool.draw('Mathe'); seen[q3.id] = true;
assert(Object.keys(seen).length === 3, 'all 3 Mathe questions drawn before reset');

// Test 3: after exhausting pool, resets (draw returns a valid question again)
var q4 = pool.draw('Mathe');
assert(q4.category === 'Mathe', 'pool resets after exhaustion and draws again');

// Test 4: categories are independent
var dq = pool.draw('Deutsch');
assert(dq.category === 'Deutsch', 'Deutsch pool is independent');

console.log('\nAll questionPool tests passed.');
