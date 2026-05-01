var PlatformPool = (function() {
  var PLATFORM_W  = 110;
  var PLATFORM_H  = 18;
  var POOL_SIZE   = 15;

  // X zones: three horizontal bands each ~160px wide
  // Each platform center is picked from within its zone with ±20px jitter
  var ZONE_CENTERS = [80, 240, 400];

  var TIER_COLORS = [0x778899, 0x6a5acd, 0x334455, 0x88ccdd];

  function createPlatformTextures(scene) {
    if (scene.textures.exists('plat_t1')) return;
    TIER_COLORS.forEach(function(color, i) {
      var g = scene.add.graphics();
      g.fillStyle(color);
      g.fillRoundedRect(0, 0, PLATFORM_W, PLATFORM_H, 4);
      g.generateTexture('plat_t' + (i + 1), PLATFORM_W, PLATFORM_H);
      g.destroy();
    });
  }

  return {
    init: function(scene) {
      createPlatformTextures(scene);
      this._scene = scene;
      this._pool = [];

      for (var i = 0; i < POOL_SIZE; i++) {
        var platforms = [];
        var labels = [];
        for (var j = 0; j < 3; j++) {
          var img = scene.physics.add.image(-9999, -9999, 'plat_t1')
            .setImmovable(true)
            .setGravityY(-700);
          img.body.allowGravity = false;
          img.setDepth(1);
          platforms.push(img);

          var lbl = scene.add.text(-9999, -9999, '', {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
          }).setOrigin(0.5, 0.5).setDepth(2);
          labels.push(lbl);
        }
        this._pool.push({ platforms: platforms, labels: labels, active: false, correctIndex: 0 });
      }
    },

    getNextRow: function(yPos, tier) {
      var row = null;
      for (var i = 0; i < this._pool.length; i++) {
        if (!this._pool[i].active) { row = this._pool[i]; break; }
      }
      if (!row) return null;

      var problem = MathEngine.generate(tier);
      var answers = [problem.distractors[0], problem.distractors[1], problem.correct];
      // shuffle answers
      for (var k = answers.length - 1; k > 0; k--) {
        var r = Math.floor(Math.random() * (k + 1));
        var tmp = answers[k]; answers[k] = answers[r]; answers[r] = tmp;
      }
      var correctIndex = answers.indexOf(problem.correct);

      var textureKey = 'plat_t' + tier;
      var jitter = 20;

      for (var j = 0; j < 3; j++) {
        var xPos = ZONE_CENTERS[j] + Math.floor(Math.random() * jitter * 2) - jitter;
        row.platforms[j].setTexture(textureKey);
        row.platforms[j].setPosition(xPos, yPos);
        row.platforms[j].body.reset(xPos, yPos);
        row.platforms[j].isCorrect = (j === correctIndex);
        row.platforms[j].setVisible(true);

        var ansStr = String(answers[j]);
        row.labels[j].setText(ansStr);
        row.labels[j].setFontSize(ansStr.length > 4 ? '13px' : '16px');
        row.labels[j].setPosition(xPos, yPos);
        row.labels[j].setVisible(true);
      }

      row.active = true;
      row.correctIndex = correctIndex;
      row.question = problem.question;
      row.yPos = yPos;
      return row;
    },

    recycleRow: function(row) {
      if (!row) return;
      for (var j = 0; j < 3; j++) {
        row.platforms[j].setPosition(-9999, -9999);
        row.platforms[j].body.reset(-9999, -9999);
        row.platforms[j].setVisible(false);
        row.labels[j].setPosition(-9999, -9999);
        row.labels[j].setVisible(false);
      }
      row.active = false;
    },

    getAllRows: function() {
      return this._pool.filter(function(r) { return r.active; });
    },

    getPlatformGroup: function() {
      var platforms = [];
      this._pool.forEach(function(row) {
        row.platforms.forEach(function(p) { platforms.push(p); });
      });
      return platforms;
    }
  };
})();
