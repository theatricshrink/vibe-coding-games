var DifficultyManager = (function() {
  var THRESHOLDS = [300, 700, 1200];

  return {
    create: function() {
      var maxAltitude = 0;
      var currentTier = 1;
      var callback = null;

      return {
        getTier: function(metres) {
          if (metres >= 1200) return 4;
          if (metres >= 700)  return 3;
          if (metres >= 300)  return 2;
          return 1;
        },
        update: function(metres) {
          if (metres <= maxAltitude) return;
          maxAltitude = metres;
          var newTier = this.getTier(metres);
          if (newTier !== currentTier) {
            currentTier = newTier;
            if (callback) callback(newTier);
          }
        },
        onTierChange: function(cb) {
          callback = cb;
        }
      };
    }
  };
})();

if (typeof module !== 'undefined') module.exports = { DifficultyManager: DifficultyManager };
