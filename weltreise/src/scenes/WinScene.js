var WinScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function WinScene() {
    Phaser.Scene.call(this, { key: 'WinScene' });
  },
  init: function(data) {
    this.countryId = data.countryId;
    this.continentId = data.continentId;
  },
  create: function() {
    var self = this;
    // Find country name from globals
    var continentMap = { europe: EUROPE, africa: AFRICA, asia: ASIA, americas: AMERICAS, oceania: OCEANIA };
    var continent = continentMap[this.continentId];
    var countryName = this.countryId; // fallback
    if (continent) {
      for (var i = 0; i < continent.countries.length; i++) {
        if (continent.countries[i].id === this.countryId) {
          countryName = continent.countries[i].name[LANG];
          break;
        }
      }
    }

    // Dark background
    this.add.rectangle(480, 360, 960, 720, 0x0d1b2a);

    // "Level Complete" text
    var title = LANG === 'de' ? 'Level geschafft!' : 'Level Complete!';
    this.add.text(480, 160, title, {
      fontFamily: 'Arial', fontSize: '56px', color: '#ffcc00'
    }).setOrigin(0.5);

    // Country name
    this.add.text(480, 260, countryName, {
      fontFamily: 'Arial', fontSize: '36px', color: '#ffffff'
    }).setOrigin(0.5);

    // 5 stars
    this.add.text(480, 340, '★★★★★', {
      fontFamily: 'Arial', fontSize: '48px', color: '#ffcc00'
    }).setOrigin(0.5);

    // Determine if entire continent was just completed
    var progress = Progress.load();
    var continentOrder = Progress.CONTINENT_ORDER;
    var myIdx = continentOrder.indexOf(self.continentId);
    var allDone = false;
    if (continent) {
      allDone = continent.countries.every(function(c) {
        return progress.completedLevels.indexOf(c.id) !== -1;
      });
    }
    var continentJustFinished = allDone && myIdx >= 0 && myIdx < continentOrder.length - 1;
    var nextContinentId = continentJustFinished ? continentOrder[myIdx + 1] : null;

    // Continue button — routes to WorldMapScene (unlock anim) or LevelSelectScene
    var continueLabel = LANG === 'de' ? '▶  Weiter' : '▶  Continue';
    var continueCallback = continentJustFinished
      ? function() { self.scene.start('WorldMapScene', { unlockAnim: nextContinentId }); }
      : function() { self.scene.start('LevelSelectScene', { continentId: self.continentId }); };
    makeMarioBtn(self, 480, 460, continueLabel, continueCallback,
      { w: 260, h: 62, fontSize: '26px', color: 0x1a8a1a }
    );
  }
});
