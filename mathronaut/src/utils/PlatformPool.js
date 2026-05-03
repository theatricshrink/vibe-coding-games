var PlatformPool = (function() {
  var PLATFORM_W  = 110;
  var PLATFORM_H  = 18;
  var NEUTRAL_W   = 150;
  var ANSWER_OFFSET = 200;
  var POOL_SIZE   = 15;

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
    var g = scene.add.graphics();
    g.fillStyle(0x4a6080);
    g.fillRoundedRect(0, 0, NEUTRAL_W, PLATFORM_H, 4);
    g.generateTexture('plat_neutral', NEUTRAL_W, PLATFORM_H);
    g.destroy();
  }

  return {
    init: function(scene) {
      createPlatformTextures(scene);
      this._scene = scene;
      this._pool = [];

      for (var i = 0; i < POOL_SIZE; i++) {
        var platforms = [];
        var labels = [];

        // Index 0: neutral launch pad
        var neutral = scene.physics.add.image(-9999, -9999, 'plat_neutral')
          .setImmovable(true);
        neutral.body.allowGravity = false;
        neutral.setDepth(1);
        neutral.isNeutral = true;
        neutral.isCorrect = false;
        platforms.push(neutral);
        labels.push(null);

        // Indices 1-3: answer platforms
        for (var j = 0; j < 3; j++) {
          var img = scene.physics.add.image(-9999, -9999, 'plat_t1')
            .setImmovable(true);
          img.body.allowGravity = false;
          img.setDepth(1);
          img.isNeutral = false;
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

    getNextRow: function(yPos, tier, spawnNeutral) {
      var row = null;
      for (var i = 0; i < this._pool.length; i++) {
        if (!this._pool[i].active) { row = this._pool[i]; break; }
      }
      if (!row) return null;

      var problem = MathEngine.generate(tier);
      var answers = [problem.distractors[0], problem.distractors[1], problem.correct];
      for (var k = answers.length - 1; k > 0; k--) {
        var r = Math.floor(Math.random() * (k + 1));
        var tmp = answers[k]; answers[k] = answers[r]; answers[r] = tmp;
      }
      var correctIndex = answers.indexOf(problem.correct);

      // Neutral launch pad: only for the first row
      if (spawnNeutral) {
        row.platforms[0].setTexture('plat_neutral');
        row.platforms[0].setPosition(240, yPos);
        row.platforms[0].body.reset(240, yPos);
        row.platforms[0].isNeutral = true;
        row.platforms[0].isCorrect = false;
        row.platforms[0].setVisible(true);
      } else {
        row.platforms[0].setPosition(-9999, -9999);
        row.platforms[0].body.reset(-9999, -9999);
        row.platforms[0].setVisible(false);
      }

      // Answer platforms: 150px above neutral, with ±25px Y jitter each
      var textureKey = 'plat_t' + tier;
      var answerBaseY = yPos - ANSWER_OFFSET;
      var jitter = 20;
      for (var j = 0; j < 3; j++) {
        var xPos = ZONE_CENTERS[j] + Math.floor(Math.random() * jitter * 2) - jitter;
        var yOff = Math.floor(Math.random() * 50) - 25;
        row.platforms[j + 1].setTexture(textureKey);
        row.platforms[j + 1].clearTint();
        row.platforms[j + 1].setPosition(xPos, answerBaseY + yOff);
        row.platforms[j + 1].body.reset(xPos, answerBaseY + yOff);
        row.platforms[j + 1].isCorrect = (j === correctIndex);
        row.platforms[j + 1].isNeutral = false;
        row.platforms[j + 1].setVisible(true);

        var ansStr = String(answers[j]);
        row.labels[j + 1].setText(ansStr);
        row.labels[j + 1].setFontSize(ansStr.length > 4 ? '13px' : '16px');
        row.labels[j + 1].setPosition(xPos, answerBaseY + yOff);
        row.labels[j + 1].setVisible(true);
      }

      row.active = true;
      row.correctIndex = correctIndex;
      row.question = problem.question;
      row.yPos = yPos;
      return row;
    },

    recycleRow: function(row) {
      if (!row) return;
      for (var j = 0; j < 4; j++) {
        row.platforms[j].setPosition(-9999, -9999);
        row.platforms[j].body.reset(-9999, -9999);
        row.platforms[j].setVisible(false);
        if (row.labels[j]) {
          row.labels[j].setPosition(-9999, -9999);
          row.labels[j].setVisible(false);
        }
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
    },

    getRowForPlatform: function(platform) {
      for (var i = 0; i < this._pool.length; i++) {
        var row = this._pool[i];
        for (var j = 0; j < row.platforms.length; j++) {
          if (row.platforms[j] === platform) return row;
        }
      }
      return null;
    }
  };
})();
