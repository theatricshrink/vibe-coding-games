var MorseReference = (function() {
  var mode = 'grid';

  function show() {
    var overlay = document.getElementById('morse-ref-overlay');
    if (overlay) overlay.classList.add('show');
    var title = document.getElementById('ref-title');
    if (title) title.textContent = t('refTitle');
    render();
  }

  function hide() {
    var overlay = document.getElementById('morse-ref-overlay');
    if (overlay) overlay.classList.remove('show');
  }

  function showGrid() { mode = 'grid'; render(); }
  function showTree() { mode = 'tree'; render(); }

  function render() {
    var content = document.getElementById('morse-ref-content');
    if (!content) return;
    var btnGrid = document.getElementById('ref-btn-grid');
    var btnTree = document.getElementById('ref-btn-tree');
    if (btnGrid) btnGrid.textContent = t('refAlphabet');
    if (btnTree) btnTree.textContent = t('refTree');
    if (mode === 'grid') renderGrid(content);
    else                 renderTree(content);
  }

  function renderGrid(content) {
    var unlocked = (typeof Progression !== 'undefined') ? Progression.getUnlockedLetters() : Object.keys(MORSE);
    var all = Object.keys(MORSE);
    content.innerHTML = '<div class="morse-grid">' +
      all.map(function(letter) {
        var isLocked = unlocked.indexOf(letter) === -1;
        return '<div class="morse-cell' + (isLocked ? ' locked' : '') + '">' +
          '<div class="letter">' + letter + '</div>' +
          '<div class="code">' + (isLocked ? '?' : morseToDisplay(MORSE[letter])) + '</div>' +
          '</div>';
      }).join('') + '</div>';
  }

  function renderTree(content) {
    var tree = [
      { code:'.',    label:'E' }, { code:'-',    label:'T' },
      { code:'..',   label:'I' }, { code:'.-',   label:'A' }, { code:'-.',   label:'N' }, { code:'--',   label:'M' },
      { code:'...',  label:'S' }, { code:'..-',  label:'U' }, { code:'.-.',  label:'R' }, { code:'.--',  label:'W' },
      { code:'-..',  label:'D' }, { code:'-.-',  label:'K' }, { code:'--.',  label:'G' }, { code:'---',  label:'O' },
      { code:'....', label:'H' }, { code:'...-', label:'V' }, { code:'..-.',  label:'F' },
      { code:'.-..',  label:'L' }, { code:'.--.',  label:'P' }, { code:'.---',  label:'J' },
      { code:'-...', label:'B' }, { code:'-.-.',  label:'C' }, { code:'-..-',  label:'X' }, { code:'-.--',  label:'Y' },
      { code:'--..',  label:'Z' }, { code:'--.-',  label:'Q' }
    ];
    var unlocked = (typeof Progression !== 'undefined') ? Progression.getUnlockedLetters() : Object.keys(MORSE);
    var rows = tree.map(function(node) {
      var indent = node.code.length * 20;
      var sym = node.code.slice(-1) === '.' ? '\xb7' : '\u2014';
      var locked = unlocked.indexOf(node.label) === -1;
      return '<div style="padding:3px 0;padding-left:' + indent + 'px;color:' + (locked ? '#334433' : 'var(--green)') + ';">' +
        '<span style="color:var(--dim);margin-right:8px;">' + sym + '</span>' +
        '<span style="font-family:Oswald,sans-serif;font-size:1.1rem;">' + (locked ? '?' : node.label) + '</span>' +
        '<span style="color:var(--dim);font-size:0.75rem;margin-left:8px;">' + (locked ? '' : morseToDisplay(MORSE[node.label])) + '</span>' +
        '</div>';
    }).join('');
    content.innerHTML = '<div style="font-size:0.8rem;">' +
      '<div style="color:var(--dim);margin-bottom:12px;font-size:0.75rem;">\u2190 \xb7 dot &nbsp;|&nbsp; \u2014 dash \u2192</div>' +
      rows + '</div>';
  }

  return { show: show, hide: hide, showGrid: showGrid, showTree: showTree };
})();
