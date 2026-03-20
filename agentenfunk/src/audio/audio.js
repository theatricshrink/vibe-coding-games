var Audio = (function() {
  var ctx = null;
  var muted = localStorage.getItem('agentenfunk_mute') === '1';
  var ambientOn = localStorage.getItem('agentenfunk_ambient') !== '0';
  var ambientNode = null;
  var ambientGain = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function beep(duration, freq, when, vol) {
    if (muted) return;
    var c = getCtx();
    var osc = c.createOscillator();
    var gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = 'sine';
    osc.frequency.value = freq || 600;
    gain.gain.setValueAtTime(vol || 0.4, when);
    gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
    osc.start(when);
    osc.stop(when + duration + 0.01);
  }

  // Play morse code string as audio, returns promise resolving when done.
  // Uses setTimeout per symbol so each beep is triggered after the
  // AudioContext is guaranteed running — avoids iOS scheduling-while-suspended.
  function playMorse(code, onSymbol) {
    var DOT_MS  = 80;
    var DASH_MS = 240;
    var GAP_MS  = 80;
    var offset  = 80; // initial delay in ms before first symbol

    var cursor = 0;
    code.split('').forEach(function(sym) {
      var durMs = sym === '.' ? DOT_MS : DASH_MS;
      var durSec = durMs / 1000;
      (function(startMs, dur, s) {
        setTimeout(function() {
          var c = getCtx();
          if (!muted) beep(dur, 600, c.currentTime + 0.01);
          if (onSymbol) onSymbol(s);
        }, startMs);
      })(offset + cursor, durSec, sym);
      cursor += durMs + GAP_MS;
    });

    return new Promise(function(resolve) {
      setTimeout(resolve, offset + cursor + 100);
    });
  }

  function playCorrect() {
    if (muted) return;
    var c = getCtx();
    var t = c.currentTime;
    beep(0.1, 660, t);
    beep(0.15, 880, t + 0.12);
  }

  function playWrong() {
    if (muted) return;
    var c = getCtx();
    var bufSize = c.sampleRate * 0.2;
    var buf = c.createBuffer(1, bufSize, c.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    var src = c.createBufferSource();
    src.buffer = buf;
    var gain = c.createGain();
    gain.gain.setValueAtTime(0.4, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
    src.connect(gain);
    gain.connect(c.destination);
    src.start();
  }

  function playMedalThud() {
    if (muted) return;
    var c = getCtx();
    var t = c.currentTime;
    beep(0.05, 200, t, 0.6);
    beep(0.08, 150, t + 0.05, 0.4);
    beep(0.12, 100, t + 0.1, 0.3);
  }

  function startAmbient() {
    if (muted || !ambientOn) return;
    var c = getCtx();
    var bufSize = c.sampleRate * 2;
    var buf = c.createBuffer(1, bufSize, c.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    var src = c.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    ambientGain = c.createGain();
    ambientGain.gain.value = 0.04;
    src.connect(ambientGain);
    ambientGain.connect(c.destination);
    src.start();
    ambientNode = src;
  }

  function stopAmbient() {
    if (ambientNode) { try { ambientNode.stop(); } catch(e) {} ambientNode = null; }
  }

  function toggleMute() {
    muted = !muted;
    localStorage.setItem('agentenfunk_mute', muted ? '1' : '0');
    if (muted) stopAmbient();
    else startAmbient();
    return muted;
  }

  function toggleAmbient() {
    ambientOn = !ambientOn;
    localStorage.setItem('agentenfunk_ambient', ambientOn ? '1' : '0');
    if (ambientOn) startAmbient();
    else stopAmbient();
    return ambientOn;
  }

  function isMuted() { return muted; }
  function isAmbientOn() { return ambientOn; }

  // Call this inside the first user gesture to unlock iOS AudioContext.
  // All calls must be synchronous within the gesture — no .then() chains.
  function unlock() {
    var c = getCtx();
    c.resume();                          // synchronous call inside gesture
    var buf = c.createBuffer(1, 1, c.sampleRate);
    var src = c.createBufferSource();
    src.buffer = buf;
    src.connect(c.destination);
    src.start();                         // no arg = start ASAP, not at t=0
    startAmbient();
  }

  return { playMorse: playMorse, playCorrect: playCorrect, playWrong: playWrong, playMedalThud: playMedalThud, startAmbient: startAmbient, stopAmbient: stopAmbient, toggleMute: toggleMute, toggleAmbient: toggleAmbient, isMuted: isMuted, isAmbientOn: isAmbientOn, unlock: unlock };
})();
