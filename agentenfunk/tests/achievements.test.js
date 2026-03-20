var assert = require('./assert');
var fs = require('fs');
global.localStorage = { _d:{}, getItem:function(k){return this._d[k]||null;}, setItem:function(k,v){this._d[k]=String(v);} };
global.document = { getElementById: function() { return { classList:{add:function(){},remove:function(){}}, innerHTML:'', querySelector:function(){return null;} }; } };
global.LANG = 'en';
function t(key) { return key; }
eval(fs.readFileSync(__dirname+'/../src/data/morse.js','utf8'));
eval(fs.readFileSync(__dirname+'/../src/data/achievements.js','utf8'));
eval(fs.readFileSync(__dirname+'/../src/game/progression.js','utf8'));
eval(fs.readFileSync(__dirname+'/../src/game/achievements-engine.js','utf8'));

AchievementsEngine.reset();
assert(!AchievementsEngine.isUnlocked('first_contact'), 'first_contact locked initially');
AchievementsEngine.onMissionComplete({ accuracy: 1.0, fast: true, wave: 1, mode: 'decode', hadErrors: false, triggeredWaveUnlock: false });
assert(AchievementsEngine.isUnlocked('first_contact'), 'first_contact unlocked after first mission');
assert(AchievementsEngine.isUnlocked('ghost_signal'), 'ghost_signal unlocked at 100% accuracy');

// stone_cold: wave unlock with no errors
AchievementsEngine.reset();
AchievementsEngine.onMissionComplete({ accuracy: 0.9, fast: false, wave: 2, mode: 'decode', hadErrors: false, triggeredWaveUnlock: true });
assert(AchievementsEngine.isUnlocked('stone_cold'), 'stone_cold unlocked when wave unlocked with no errors');

// blitz: encode mission under 30s
AchievementsEngine.reset();
AchievementsEngine.onMissionComplete({ accuracy: 1.0, fast: true, wave: 1, mode: 'encode', hadErrors: false, triggeredWaveUnlock: false, durationMs: 20000 });
assert(AchievementsEngine.isUnlocked('blitz'), 'blitz unlocked for encode under 30s');

AchievementsEngine.reset();
for (var i = 0; i < 20; i++) AchievementsEngine.onCorrectAnswer({ streak: i+1 });
assert(AchievementsEngine.isUnlocked('untouchable'), 'untouchable at streak 20');

// stubborn: wrong 5x then correct
AchievementsEngine.reset();
for (var j = 0; j < 5; j++) AchievementsEngine.onWrongAnswer({ letter: 'R' });
AchievementsEngine.onLetterCorrectAfterFails('R');
assert(AchievementsEngine.isUnlocked('stubborn'), 'stubborn after 5 fails then correct');

console.log('\nAll achievements tests passed.');
