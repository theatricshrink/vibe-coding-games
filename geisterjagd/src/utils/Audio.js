var Audio = {
  ctx: null,

  init: function() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  _tone: function(freq, startTime, duration, type, vol, fadeOut) {
    var ctx = this.ctx;
    if (!ctx) return;
    var osc  = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(vol || 0.3, startTime);
    if (fadeOut) gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration);
  },

  // Faint blip on player movement
  playTick: function() {
    this.init();
    this._tone(220, this.ctx.currentTime, 0.04, 'square', 0.05, true);
  },

  // Short success chime on neutral area close
  playClose: function() {
    this.init();
    var t = this.ctx.currentTime;
    this._tone(440, t,        0.1,  'sine', 0.2, true);
    this._tone(660, t + 0.08, 0.12, 'sine', 0.2, true);
  },

  // Ascending sparkle arpeggio on bonus
  playBonus: function() {
    this.init();
    var t = this.ctx.currentTime;
    var notes = [523, 659, 784, 1047];
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], t + i * 0.07, 0.12, 'sine', 0.25, true);
    }
  },

  // Descending wah-wah on fail (mixed colors)
  playFail: function() {
    this.init();
    var t = this.ctx.currentTime;
    var notes = [330, 262, 196, 147];
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], t + i * 0.1, 0.15, 'sawtooth', 0.2, true);
    }
  },

  // Low thud + descending sting on death
  playDeath: function() {
    this.init();
    var t   = this.ctx.currentTime;
    var ctx = this.ctx;
    // Thud
    this._tone(80,  t,       0.15, 'sine',     0.4, true);
    // Descending sting
    var osc  = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.6);
    gain.gain.setValueAtTime(0.25, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.start(t + 0.1);
    osc.stop(t + 0.65);
  },

  // Short upbeat fanfare on level complete
  playLevelComplete: function() {
    this.init();
    var t = this.ctx.currentTime;
    var notes = [523, 659, 784, 659, 1047];
    var durs  = [0.1, 0.1, 0.1, 0.05, 0.3];
    var offset = 0;
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], t + offset, durs[i], 'sine', 0.3, true);
      offset += durs[i] + 0.02;
    }
  }
};
