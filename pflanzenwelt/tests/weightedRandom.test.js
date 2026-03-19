// Minimal test runner — throws on failure
function assert(condition, message) {
  if (!condition) throw new Error('FAIL: ' + message);
  console.log('PASS: ' + message);
}

// Load the module
var weightedRandom = require('../src/utils/weightedRandom');

// Test 1: Always picks from items
var items = [
  { id: 'a', weight: 1 },
  { id: 'b', weight: 1 },
  { id: 'c', weight: 1 }
];
for (var i = 0; i < 20; i++) {
  var result = weightedRandom(items);
  assert(['a','b','c'].indexOf(result.id) !== -1, 'result is always a valid item (run ' + i + ')');
}

// Test 2: Zero-weight items are never picked
var skewed = [
  { id: 'x', weight: 0 },
  { id: 'y', weight: 100 }
];
for (var j = 0; j < 50; j++) {
  assert(weightedRandom(skewed).id === 'y', 'zero-weight item never picked (run ' + j + ')');
}

// Test 3: Single item always returned
assert(weightedRandom([{ id: 'solo', weight: 10 }]).id === 'solo', 'single item always returned');

// Test 4: Empty array throws
var threw = false;
try { weightedRandom([]); } catch(e) { threw = true; }
assert(threw, 'empty array throws');

// Test 5: All-zero weights throws
threw = false;
try { weightedRandom([{ id: 'z', weight: 0 }]); } catch(e) { threw = true; }
assert(threw, 'all-zero weights throws');

console.log('\nAll weightedRandom tests passed.');
