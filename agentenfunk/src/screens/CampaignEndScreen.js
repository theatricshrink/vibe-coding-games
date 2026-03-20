var CampaignEndScreen = (function() {
  var FINAL_WORDS = { en: ['STAND', 'DOWN'], de: ['AUFTRAG', 'ENDE'] };
  var phase = 'decode';
  var wordIdx = 0;
  var words = [];

  function render() {
    phase = 'decode';
    wordIdx = 0;
    words = FINAL_WORDS[LANG] || FINAL_WORDS['en'];
    showDecodePhase();
  }

  function showDecodePhase() {
    var el = document.getElementById('screen-campaign-end');
    var word = words[wordIdx];
    var flat = word.split('').reduce(function(acc, l, i) {
      return acc + MORSE[l] + (i < word.length - 1 ? ' ' : '');
    }, '');
    var displayed = flat.split('').map(function(c) { return c === '.' ? '\xb7' : c === '-' ? '\u2014' : ' '; }).join('');

    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;padding:24px;gap:12px;">',
      '<div class="panel">',
      '  <div class="panel-label" style="color:var(--amber);letter-spacing:3px;">\u26a0 ' + t('finaleIncoming') + '</div>',
      '  <div style="font-size:0.8rem;color:var(--dim);">' + t('finaleDecodeInstruction') + '</div>',
      '  <div style="color:var(--dim);font-size:0.75rem;margin-top:4px;">' + (wordIdx + 1) + ' / ' + words.length + '</div>',
      '</div>',
      '<div class="panel" style="text-align:center;">',
      '  <div class="morse-display" id="finale-morse" style="font-size:1.4rem;letter-spacing:4px;">' + displayed + '</div>',
      '</div>',
      '<div class="panel">',
      '  <div class="panel-label">' + t('encodeInstruction') + '</div>',
      '  <input id="finale-input" maxlength="10" autocomplete="off" autocapitalize="characters"',
      '    style="background:var(--panel-bg);border:1px solid var(--border);color:var(--green);',
      '    font-family:\'Share Tech Mono\',monospace;font-size:1.8rem;width:100%;padding:10px;',
      '    text-transform:uppercase;letter-spacing:4px;" />',
      '  <button class="btn" style="margin-top:8px;" onclick="CampaignEndScreen.checkWord()">CONFIRM \u2192</button>',
      '  <div id="finale-feedback" style="margin-top:8px;font-size:0.85rem;min-height:1.2rem;"></div>',
      '</div>',
      '<button class="btn" onclick="CampaignEndScreen.replayMorse()">\u21ba REPLAY</button>',
      '<button class="btn" style="border-color:var(--red);color:var(--red);" onclick="Router.go(\'menu\')">' + t('back') + '</button>',
      '</div>'
    ].join('');

    setTimeout(function() { playWord(word); }, 400);

    var inp = document.getElementById('finale-input');
    if (inp) {
      inp.focus();
      inp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') CampaignEndScreen.checkWord();
      });
    }
  }

  function playWord(word) {
    var flat = word.split('').reduce(function(acc, l, i) {
      return acc + MORSE[l] + (i < word.length - 1 ? ' ' : '');
    }, '');
    var disp = document.getElementById('finale-morse');
    if (disp) disp.textContent = '';
    Audio.playMorse(flat, function(sym) {
      if (disp) {
        disp.textContent += (sym === '.' ? '\xb7' : sym === '-' ? '\u2014' : ' ');
        disp.classList.add('pulse');
        setTimeout(function() { if (disp) disp.classList.remove('pulse'); }, 400);
      }
    });
  }

  function replayMorse() { playWord(words[wordIdx]); }

  function checkWord() {
    var inp = document.getElementById('finale-input');
    var fb  = document.getElementById('finale-feedback');
    if (!inp) return;
    var answer = inp.value.trim().toUpperCase();
    var expected = words[wordIdx];

    if (answer === expected) {
      Audio.playCorrect();
      wordIdx++;
      inp.value = '';
      if (wordIdx >= FINAL_WORDS.length) {
        setTimeout(showTeletypePhase, 600);
      } else {
        if (fb) { fb.textContent = '\u2713 ' + expected; fb.style.color = 'var(--green)'; }
        setTimeout(showDecodePhase, 700);
      }
    } else {
      Audio.playWrong();
      if (fb) { fb.textContent = '\u2717 ' + t('decodeWrong'); fb.style.color = 'var(--red)'; }
      inp.value = '';
      inp.focus();
    }
  }

  var DEBRIEF = {
    en: [
      'CLASSIFICATION: TOP SECRET // EYES ONLY',
      '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
      'DATE: [REDACTED], 1989',
      'TO:   FIELD OPERATOR \u2014 CALLSIGN UNKNOWN',
      'FROM: DIRECTOR OF SIGNALS, LANGLEY',
      'RE:   OPERATIONAL DEBRIEF \u2014 FINAL REPORT',
      '',
      'Over the course of twelve operations \u2014',
      'PAPERCLIP, MINCEMEAT, GOLD, STOPWATCH,',
      'IVY BELLS, CORONA, RYAN, GLADIO,',
      'VENONA, SWORDFISH, NUMERUS, CIPHER \u2014',
      '',
      'your intercepts reached allied command.',
      'The transmissions you decoded and relayed',
      'contributed directly to the events of',
      'November 9th, 1989.',
      '',
      'The Wall has fallen.',
      'The network is secure.',
      'The war is over.',
      '',
      'You are hereby commended for exceptional',
      'service to the signals corps.',
      '',
      'Stand down, operator.',
      'Go home.',
      '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
      'END TRANSMISSION'
    ],
    de: [
      'KLASSIFIZIERUNG: STRENG GEHEIM // NUR F\u00dcR BEFUGTE',
      '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
      'DATUM: [GESCHW\u00c4RZT], 1989',
      'AN:    FELDFUNKER \u2014 RUFZEICHEN UNBEKANNT',
      'VON:   DIREKTOR DES NACHRICHTENWESENS',
      'BETR.: EINSATZBERICHT \u2014 ABSCHLUSSBERICHT',
      '',
      'Im Verlauf von zw\u00f6lf Operationen \u2014',
      'B\u00dcROKLAMMER, HACKFLEISCH, GOLD, STOPPUHR,',
      'EFEUGLOCKEN, KRONE, RYAN, GLADIO,',
      'VENONA, SCHWERTFISCH, NUMERUS, CHIFFRE \u2014',
      '',
      'erreichten deine Abfangergebnisse das',
      'alliierte Kommando.',
      'Die von dir entschl\u00fcsselten \u00dcbertragungen',
      'trugen direkt zu den Ereignissen des',
      '9. November 1989 bei.',
      '',
      'Die Mauer ist gefallen.',
      'Das Netzwerk ist gesichert.',
      'Der Krieg ist vorbei.',
      '',
      'Du wirst hiermit f\u00fcr au\u00dferordentliche',
      'Dienste im Funkerkorps ausgezeichnet.',
      '',
      'R\u00fchrt euch, Funker.',
      'Geh nach Hause.',
      '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
      'ENDE DER \u00dcBERTRAGUNG'
    ]
  };

  function showTeletypePhase() {
    var el = document.getElementById('screen-campaign-end');
    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;padding:24px;overflow-y:auto;">',
      '<div id="teletype-output" style="font-family:\'Share Tech Mono\',monospace;font-size:0.85rem;',
      'color:var(--green);line-height:1.8;white-space:pre-wrap;flex:1;"></div>',
      '<div id="stamp-container" style="display:none;text-align:center;margin:24px 0;">',
      '  <div id="mission-stamp" style="display:inline-block;border:4px solid #ff3333;color:#ff3333;',
      '    font-family:Oswald,sans-serif;font-size:1.4rem;letter-spacing:6px;padding:12px 24px;',
      '    transform:rotate(-8deg);opacity:0;transition:opacity 0.4s;">MISSION ACCOMPLISHED</div>',
      '</div>',
      '<div id="finale-actions" style="display:none;padding-top:16px;">',
      '  <button class="btn" onclick="Router.go(\'mission\')">' + t('campaignContinue') + '</button>',
      '  <button class="btn" onclick="Router.go(\'commend\')">' + t('menuCommendations') + '</button>',
      '  <button class="btn" onclick="Router.go(\'menu\')">' + t('back') + '</button>',
      '</div>',
      '</div>'
    ].join('');

    var lines = DEBRIEF[LANG] || DEBRIEF['en'];
    typeLines(lines, 0, function() { showStamp(); });
  }

  function typeLines(lines, lineIdx, onDone) {
    if (lineIdx >= lines.length) { onDone(); return; }
    var out = document.getElementById('teletype-output');
    if (!out) return;
    var line = lines[lineIdx];
    if (line === '') {
      out.textContent += '\n';
      setTimeout(function() { typeLines(lines, lineIdx + 1, onDone); }, 120);
      return;
    }
    var charIdx = 0;
    var interval = setInterval(function() {
      if (!document.getElementById('teletype-output')) { clearInterval(interval); return; }
      out.textContent += line[charIdx];
      charIdx++;
      out.scrollTop = out.scrollHeight;
      if (charIdx >= line.length) {
        clearInterval(interval);
        out.textContent += '\n';
        var pause = (line.indexOf('Wall has fallen') !== -1 ||
                     line.indexOf('Mauer ist gefallen') !== -1 ||
                     line.indexOf('war is over') !== -1 ||
                     line.indexOf('Krieg ist vorbei') !== -1) ? 1200 : 180;
        setTimeout(function() { typeLines(lines, lineIdx + 1, onDone); }, pause);
      }
    }, 28);
  }

  function showStamp() {
    AchievementsEngine.onMissionComplete({
      accuracy: 1.0, fast: false, wave: 6, mode: 'decode',
      hadErrors: false, triggeredWaveUnlock: false, isFinaleMission: true
    });
    var stampContainer = document.getElementById('stamp-container');
    var stamp = document.getElementById('mission-stamp');
    var actions = document.getElementById('finale-actions');
    if (stampContainer) stampContainer.style.display = 'block';
    if (stamp) {
      setTimeout(function() { stamp.style.opacity = '1'; Audio.playMedalThud(); }, 200);
    }
    if (actions) setTimeout(function() { actions.style.display = 'block'; }, 1200);
  }

  return { render: render, checkWord: checkWord, replayMorse: replayMorse };
})();
