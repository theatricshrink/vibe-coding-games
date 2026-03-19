function QuestionPool(allQuestions) {
  this._all = allQuestions;
  this._used = {}; // keyed by category
}

QuestionPool.prototype.draw = function(category) {
  var categoryQuestions = this._all.filter(function(q) { return q.category === category; });
  if (categoryQuestions.length === 0) throw new Error('QuestionPool: no questions for category "' + category + '"');
  if (!this._used[category]) this._used[category] = [];

  // If all used, reset
  if (this._used[category].length >= categoryQuestions.length) {
    this._used[category] = [];
  }

  var used = this._used[category];
  var available = categoryQuestions.filter(function(q) { return used.indexOf(q.id) === -1; });
  var picked = available[Math.floor(Math.random() * available.length)];
  used.push(picked.id);
  return picked;
};

if (typeof module !== 'undefined') module.exports = QuestionPool;
