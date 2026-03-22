var assert = require('./assert');
var fs = require('fs');
var path = require('path');

function loadData(file) {
  var src = fs.readFileSync(path.join(__dirname, '../src/data/', file), 'utf8');
  // Replace `var NAME =` with `global.NAME =` so vars are accessible in this scope
  var globalSrc = src.replace(/^var ([A-Z_]+)\s*=/m, 'global.$1 =');
  eval(globalSrc);
}

loadData('europe.js');
loadData('africa.js');
loadData('asia.js');
loadData('americas.js');
loadData('oceania.js');

// 1. Each continent var exists
assert(typeof EUROPE !== 'undefined', 'EUROPE exists');
assert(typeof AFRICA !== 'undefined', 'AFRICA exists');
assert(typeof ASIA !== 'undefined', 'ASIA exists');
assert(typeof AMERICAS !== 'undefined', 'AMERICAS exists');
assert(typeof OCEANIA !== 'undefined', 'OCEANIA exists');

// 2. Each has countries array
assert(Array.isArray(EUROPE.countries), 'EUROPE has countries array');
assert(Array.isArray(AFRICA.countries), 'AFRICA has countries array');
assert(Array.isArray(ASIA.countries), 'ASIA has countries array');
assert(Array.isArray(AMERICAS.countries), 'AMERICAS has countries array');
assert(Array.isArray(OCEANIA.countries), 'OCEANIA has countries array');

// 3. Total country count = 23
var totalCountries = EUROPE.countries.length + AFRICA.countries.length + ASIA.countries.length + AMERICAS.countries.length + OCEANIA.countries.length;
assert(totalCountries === 23, 'Total country count is 23 (got ' + totalCountries + ')');

// Per-continent counts
assert(EUROPE.countries.length === 5, 'EUROPE has 5 countries (got ' + EUROPE.countries.length + ')');
assert(AFRICA.countries.length === 5, 'AFRICA has 5 countries (got ' + AFRICA.countries.length + ')');
assert(ASIA.countries.length === 5, 'ASIA has 5 countries (got ' + ASIA.countries.length + ')');
assert(AMERICAS.countries.length === 5, 'AMERICAS has 5 countries (got ' + AMERICAS.countries.length + ')');
assert(OCEANIA.countries.length === 3, 'OCEANIA has 3 countries (got ' + OCEANIA.countries.length + ')');

// 4-6. Validate every country and every question
var allContinents = [EUROPE, AFRICA, ASIA, AMERICAS, OCEANIA];
var totalQuestions = 0;

allContinents.forEach(function(continent) {
  continent.countries.forEach(function(country) {
    var label = continent.id + '/' + country.id;

    // Required country fields
    assert(typeof country.id === 'string' && country.id.length > 0, label + ' has id');
    assert(typeof country.name === 'object' && country.name !== null, label + ' has name object');
    assert(typeof country.name.de === 'string' && country.name.de.length > 0, label + ' has name.de');
    assert(typeof country.name.en === 'string' && country.name.en.length > 0, label + ' has name.en');
    assert(typeof country.anthem === 'string' && country.anthem.length > 0, label + ' has anthem');
    assert(typeof country.background === 'string' && country.background.length > 0, label + ' has background');
    assert(typeof country.enemyType === 'string' && country.enemyType.length > 0, label + ' has enemyType');

    // Exactly 5 questions
    assert(Array.isArray(country.questions), label + ' has questions array');
    assert(country.questions.length === 5, label + ' has exactly 5 questions (got ' + country.questions.length + ')');

    country.questions.forEach(function(q, qi) {
      var qlabel = label + ' Q' + (qi + 1);

      // German question
      assert(typeof q.de === 'object' && q.de !== null, qlabel + ' has de object');
      assert(typeof q.de.q === 'string' && q.de.q.length > 0, qlabel + ' de.q is non-empty string');
      assert(Array.isArray(q.de.options), qlabel + ' de.options is array');
      assert(q.de.options.length === 4, qlabel + ' de.options has 4 items (got ' + q.de.options.length + ')');
      assert(typeof q.de.answer === 'number', qlabel + ' de.answer is a number');
      assert(q.de.answer >= 0 && q.de.answer <= 3, qlabel + ' de.answer is 0-3 (got ' + q.de.answer + ')');

      // English question
      assert(typeof q.en === 'object' && q.en !== null, qlabel + ' has en object');
      assert(typeof q.en.q === 'string' && q.en.q.length > 0, qlabel + ' en.q is non-empty string');
      assert(Array.isArray(q.en.options), qlabel + ' en.options is array');
      assert(q.en.options.length === 4, qlabel + ' en.options has 4 items (got ' + q.en.options.length + ')');
      assert(typeof q.en.answer === 'number', qlabel + ' en.answer is a number');
      assert(q.en.answer >= 0 && q.en.answer <= 3, qlabel + ' en.answer is 0-3 (got ' + q.en.answer + ')');

      totalQuestions++;
    });
  });
});

// 115 questions total (23 countries × 5 questions)
assert(totalQuestions === 115, 'Total question count is 115 (got ' + totalQuestions + ')');

console.log('\nAll tests passed! ' + totalQuestions + ' questions validated across ' + totalCountries + ' countries.');
