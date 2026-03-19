// Works in both browser (global) and Node.js (module.exports)
function weightedRandom(items) {
  if (!items || items.length === 0) throw new Error('weightedRandom: items array is empty');
  var total = 0;
  for (var i = 0; i < items.length; i++) total += items[i].weight;
  if (total === 0) throw new Error('weightedRandom: all items have weight 0');
  var roll = Math.random() * total;
  var cumulative = 0;
  for (var j = 0; j < items.length; j++) {
    cumulative += items[j].weight;
    if (roll < cumulative) return items[j];
  }
  return items[items.length - 1]; // fallback for floating point edge
}

if (typeof module !== 'undefined') module.exports = weightedRandom;
