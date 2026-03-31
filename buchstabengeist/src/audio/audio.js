var AudioManager = (function() {
  var ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function playTone(freq, type, durationMs, delayMs) {
    try {
      var c = getCtx();
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      var start = c.currentTime + (delayMs || 0) / 1000;
      var end = start + durationMs / 1000;
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, end);
      osc.start(start);
      osc.stop(end);
    } catch(e) {}
  }

  function playSequence(steps) {
    // steps: [{freq, type, dur, delay}]
    steps.forEach(function(s) {
      playTone(s.freq, s.type || 'sine', s.dur, s.delay || 0);
    });
  }

  return {
    unlock: function() { try { getCtx().resume(); } catch(e) {} },

    correctEat: function(wordProgress) {
      playTone(400 + wordProgress * 100, 'sine', 80);
    },

    wordComplete: function() {
      playSequence([
        {freq: 600, dur: 100, delay:   0},
        {freq: 800, dur: 100, delay: 120},
        {freq:1000, dur: 150, delay: 240}
      ]);
    },

    wrongEat: function() {
      playTone(120, 'sawtooth', 200);
    },

    shieldUsed: function() {
      playSequence([
        {freq: 300, dur: 80, delay:  0},
        {freq: 500, dur: 80, delay: 90}
      ]);
    },

    powerPellet: function() {
      playSequence([
        {freq: 400, dur: 60, delay:   0},
        {freq: 550, dur: 60, delay:  70},
        {freq: 700, dur: 60, delay: 140},
        {freq: 900, dur: 80, delay: 210}
      ]);
    }
  };
})();
