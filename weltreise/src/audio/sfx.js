var SFX = (function() {
  var ctx = null;
  function getCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    return ctx;
  }
  function play(type, freq, endFreq, duration) {
    var c = getCtx();
    if (!c) return;
    try {
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime);
      if (endFreq !== freq) {
        osc.frequency.exponentialRampToValueAtTime(endFreq, c.currentTime + duration);
      }
      gain.gain.setValueAtTime(0.3, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + duration);
    } catch(e) {}
  }
  return {
    stomp: function() { play('triangle', 220, 110, 0.1); },
    correct: function() {
      play('sine', 523, 523, 0.05);
      setTimeout(function() { play('sine', 659, 659, 0.05); }, 60);
      setTimeout(function() { play('sine', 784, 784, 0.1); }, 120);
    },
    wrong: function() { play('sawtooth', 80, 80, 0.3); },
    powerUp: function() { play('sine', 200, 800, 0.2); }
  };
})();
