var Input = (function() {
  var dotCallback = null;
  var dashCallback = null;
  var confirmCallback = null;
  var sequence = [];
  var timer = null;
  var pauseMs = 900;
  try { pauseMs = parseInt(localStorage.getItem('agentenfunk_pause') || '900', 10) || 900; } catch(e) {}
  var active = false;
  var spaceDown = false;
  var spaceStart = 0;
  var boundElements = [];

  function setPause(ms) {
    pauseMs = parseInt(ms, 10) || 900;
    try { localStorage.setItem('agentenfunk_pause', pauseMs); } catch(e) {}
  }

  function getPause() { return pauseMs; }

  function scheduleConfirm() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      if (sequence.length && confirmCallback) {
        var seq = sequence.join('');
        sequence = [];
        confirmCallback(seq);
      }
    }, pauseMs);
  }

  function addSymbol(sym) {
    if (!active) return;
    sequence.push(sym);
    if (sym === '.') { if (dotCallback) dotCallback(); }
    else              { if (dashCallback) dashCallback(); }
    scheduleConfirm();
  }

  function dot()  { addSymbol('.'); }
  function dash() { addSymbol('-'); }

  function cancel() {
    clearTimeout(timer);
    sequence = [];
  }

  // Keyboard handler
  function onKeyDown(e) {
    if (!active) return;
    if (e.code === 'Space' && !spaceDown) {
      e.preventDefault();
      spaceDown = true;
      spaceStart = Date.now();
    }
    if (e.code === 'KeyF') { e.preventDefault(); dot(); }
    if (e.code === 'KeyJ') { e.preventDefault(); dash(); }
  }

  function onKeyUp(e) {
    if (!active) return;
    if (e.code === 'Space' && spaceDown) {
      e.preventDefault();
      spaceDown = false;
      var held = Date.now() - spaceStart;
      if (held >= 300) dash(); else dot();
    }
  }

  function bindTapZones(dotEl, dashEl) {
    if (boundElements.indexOf(dotEl) !== -1) return;
    boundElements.push(dotEl);
    boundElements.push(dashEl);
    function flash(el) {
      el.classList.add('flash');
      setTimeout(function() { el.classList.remove('flash'); }, 100);
    }

    function tapDot(e) {
      e.preventDefault();
      if (navigator.vibrate) navigator.vibrate(50);
      flash(dotEl);
      dot();
    }
    function tapDash(e) {
      e.preventDefault();
      if (navigator.vibrate) navigator.vibrate(150);
      flash(dashEl);
      dash();
    }

    dotEl.addEventListener('touchstart', tapDot, { passive: false });
    dotEl.addEventListener('mousedown',  tapDot);
    dashEl.addEventListener('touchstart', tapDash, { passive: false });
    dashEl.addEventListener('mousedown',  tapDash);
  }

  function enable() {
    active = true;
    sequence = [];
  }

  function disable() {
    active = false;
    spaceDown = false;
    spaceStart = 0;
    cancel();
  }

  function onDot(cb)     { dotCallback = cb; }
  function onDash(cb)    { dashCallback = cb; }
  function onConfirm(cb) { confirmCallback = cb; }

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup',   onKeyUp);

  return { dot: dot, dash: dash, cancel: cancel, enable: enable, disable: disable, onDot: onDot, onDash: onDash, onConfirm: onConfirm, bindTapZones: bindTapZones, setPause: setPause, getPause: getPause };
})();
