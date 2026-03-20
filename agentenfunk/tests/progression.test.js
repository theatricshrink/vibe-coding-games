var assert = require('./assert');
var fs = require('fs');
global.localStorage = { _d:{}, getItem: function(k){return this._d[k]||null;}, setItem: function(k,v){this._d[k]=String(v);} };
eval(fs.readFileSync(__dirname + '/../src/data/morse.js', 'utf8'));
eval(fs.readFileSync(__dirname + '/../src/game/progression.js', 'utf8'));

// Fresh state
Progression.reset();
assert(Progression.getWave() === 1, 'starts at wave 1');
assert(Progression.getUnlockedLetters().length === 2, 'wave 1 has 2 letters');
assert(Progression.getUnlockedLetters().indexOf('E') !== -1, 'E unlocked');

Progression.unlockWave(2);
assert(Progression.getWave() === 2, 'wave advances to 2');
assert(Progression.getUnlockedLetters().length === 4, 'wave 2 adds A,N');

// Campaign
assert(Progression.getCampaignIdx() === 0, 'campaign starts at 0');
assert(!Progression.isCampaignDone(), 'campaign not done initially');
Progression.advanceCampaign();
assert(Progression.getCampaignIdx() === 1, 'campaign advances to 1');

// Stars
assert(Progression.starsForAccuracy(1.0, true)  === 3, '100% fast = 3 stars');
assert(Progression.starsForAccuracy(0.9, false) === 2, '90% = 2 stars');
assert(Progression.starsForAccuracy(0.5, false) === 1, '50% = 1 star');

console.log('\nAll progression tests passed.');
