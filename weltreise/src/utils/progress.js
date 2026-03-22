var Progress = (function() {
  var CONTINENT_ORDER = ['europe', 'americas', 'africa', 'asia', 'oceania'];

  function getContinentData() {
    return { europe: EUROPE, africa: AFRICA, asia: ASIA, americas: AMERICAS, oceania: OCEANIA };
  }

  return {
    load: function() {
      var raw = localStorage.getItem('weltreise_progress');
      if (!raw) return { unlockedContinent: 'europe', completedLevels: [] };
      try { return JSON.parse(raw); } catch(e) { return { unlockedContinent: 'europe', completedLevels: [] }; }
    },
    save: function(data) {
      localStorage.setItem('weltreise_progress', JSON.stringify(data));
    },
    isLevelComplete: function(countryId) {
      return this.load().completedLevels.indexOf(countryId) !== -1;
    },
    completeLevel: function(countryId) {
      var data = this.load();
      if (data.completedLevels.indexOf(countryId) === -1) {
        data.completedLevels.push(countryId);
      }
      // Check if all countries in current continent are done → advance
      var continentData = getContinentData();
      var currentContinent = continentData[data.unlockedContinent];
      if (currentContinent) {
        var allDone = currentContinent.countries.every(function(c) {
          return data.completedLevels.indexOf(c.id) !== -1;
        });
        if (allDone) {
          var idx = CONTINENT_ORDER.indexOf(data.unlockedContinent);
          if (idx < CONTINENT_ORDER.length - 1) {
            data.unlockedContinent = CONTINENT_ORDER[idx + 1];
          }
        }
      }
      this.save(data);
    },
    reset: function() {
      localStorage.removeItem('weltreise_progress');
    },
    CONTINENT_ORDER: CONTINENT_ORDER
  };
})();
