// robotraetsel/src/utils/wordPool.js
function WordPool(words, lang) {
  this._all       = words.filter(function(w) { return w.lang === lang; });
  this._remaining = this._all.slice();
}

WordPool.prototype._getBucket = function(chainLength) {
  if (chainLength <= 2) return { min: 4, max: 6 };
  if (chainLength <= 5) return { min: 7, max: 9 };
  return { min: 10, max: 99 };
};

WordPool.prototype.draw = function(chainLength, startLetter) {
  var bucket = this._getBucket(chainLength);

  function inBucket(w) {
    return w.word.length >= bucket.min && w.word.length <= bucket.max;
  }

  var pool = this._remaining.filter(function(w) {
    return inBucket(w) && (!startLetter || w.word[0] === startLetter);
  });

  // Fallback 1: drop chain constraint if no matching word
  if (pool.length === 0 && startLetter) {
    pool = this._remaining.filter(inBucket);
  }

  // Fallback 2: reset pool when bucket is fully exhausted
  if (pool.length === 0) {
    this._remaining = this._all.slice();
    pool = this._remaining.filter(inBucket);
  }

  // Guard: no words exist for this bucket in the language
  if (pool.length === 0) return null;

  var word = pool[Math.floor(Math.random() * pool.length)];
  this._remaining.splice(this._remaining.indexOf(word), 1);
  return word;
};

if (typeof module !== 'undefined') module.exports = WordPool;
