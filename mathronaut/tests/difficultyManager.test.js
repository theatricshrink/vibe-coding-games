// Run with: node mathronaut/tests/difficultyManager.test.js
var fs = require('fs');
eval(fs.readFileSync('mathronaut/src/utils/DifficultyManager.js', 'utf8'));

var passed = 0;
function assert(condition, msg) {
  if (!condition) throw new Error('FAIL: ' + msg);
  passed++;
}

var dm;

// getTier returns correct tier for each altitude band
dm = DifficultyManager.create();
assert(dm.getTier(0)    === 1, 'tier 1 at 0m');
assert(dm.getTier(150)  === 1, 'tier 1 at 150m');
assert(dm.getTier(299)  === 1, 'tier 1 at 299m');
assert(dm.getTier(300)  === 2, 'tier 2 at 300m');
assert(dm.getTier(500)  === 2, 'tier 2 at 500m');
assert(dm.getTier(699)  === 2, 'tier 2 at 699m');
assert(dm.getTier(700)  === 3, 'tier 3 at 700m');
assert(dm.getTier(900)  === 3, 'tier 3 at 900m');
assert(dm.getTier(1199) === 3, 'tier 3 at 1199m');
assert(dm.getTier(1200) === 4, 'tier 4 at 1200m');
assert(dm.getTier(9999) === 4, 'tier 4 at 9999m');

// onTierChange fires when crossing threshold, not on same tier
dm = DifficultyManager.create();
var events = [];
dm.onTierChange(function(tier) { events.push(tier); });
dm.update(100);
assert(events.length === 0, 'no event within tier 1');
dm.update(350);
assert(events.length === 1, 'event fires entering tier 2');
assert(events[0] === 2, 'event value is 2');
dm.update(400);
assert(events.length === 1, 'no re-fire within tier 2');
dm.update(750);
assert(events.length === 2, 'event fires entering tier 3');
dm.update(1300);
assert(events.length === 3, 'event fires entering tier 4');

// update() does not fire for altitudes lower than current max
dm = DifficultyManager.create();
var fired = [];
dm.onTierChange(function(t) { fired.push(t); });
dm.update(400);  // enter tier 2
dm.update(200);  // fall back — should NOT re-fire tier 1
assert(fired.length === 1, 'no re-fire when altitude decreases');
assert(fired[0] === 2, 'only tier 2 event fired');

console.log('All ' + passed + ' tests passed.');
