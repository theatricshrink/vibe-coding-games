# Agentenfunk Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Cold War spy-themed browser/mobile game that teaches Morse code through mission-based gameplay with CRT aesthetic.

**Architecture:** Vanilla HTML/CSS/JS multi-file app loaded via ordered `<script>` tags (mirrors pflanzenwelt pattern). No bundler. Modules expose globals. Screen routing via a lightweight `router.js` that shows/hides DOM sections.

**Tech Stack:** Vanilla JS ES5-compatible, Web Audio API, Web Vibration API, Google Fonts (Share Tech Mono + Oswald), PWA (manifest + service worker), node for tests.

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Shell, CSS, script load order |
| `manifest.json` | PWA manifest |
| `service-worker.js` | Cache-first offline support |
| `src/i18n/lang.js` | Language detection + persistence (`LANG` global) |
| `src/i18n/strings.js` | All EN/DE UI strings (`STRINGS` global) |
| `src/data/morse.js` | Morse table A-Z + 0-9 (`MORSE` global) |
| `src/data/missions.js` | Mission definitions per wave (`MISSIONS` global) |
| `src/data/achievements.js` | Achievement definitions + badge SVGs (`ACHIEVEMENT_DEFS` global) |
| `src/audio/audio.js` | Web Audio API engine (`Audio` global) |
| `src/input/input.js` | Tap zones + keyboard handler, pause-to-confirm (`Input` global) |
| `src/game/progression.js` | Wave state, letter unlocks, scoring, stars (`Progression` global) |
| `src/game/achievements-engine.js` | Condition checking + localStorage (`AchievementsEngine` global) |
| `src/ui/router.js` | Screen show/hide routing (`Router` global) |
| `src/ui/morse-reference.js` | Toggleable overlay: alphabet grid + morse tree (`MorseReference` global) |
| `src/ui/badges.js` | SVG badge rendering, locked/unlocked/hover states (`Badges` global) |
| `src/screens/MenuScreen.js` | Main menu screen |
| `src/screens/MissionScreen.js` | Mission briefing screen |
| `src/screens/DecodeScreen.js` | Decode mode gameplay |
| `src/screens/EncodeScreen.js` | Encode mode gameplay |
| `src/screens/CommendationsScreen.js` | Achievement board |
| `src/screens/SettingsScreen.js` | Settings panel |
| `src/screens/CampaignEndScreen.js` | Campaign finale screen shown after mission 12 |
| `src/main.js` | App init, wires everything together |
| `tests/morse.test.js` | Tests for morse.js |
| `tests/progression.test.js` | Tests for progression.js |
| `tests/achievements.test.js` | Tests for achievements-engine.js |

Script load order in `index.html`:
```
lang.js → strings.js → morse.js → missions.js → achievements.js →
audio.js → input.js → progression.js → achievements-engine.js →
router.js → morse-reference.js → badges.js →
MenuScreen.js → MissionScreen.js → DecodeScreen.js → EncodeScreen.js →
CommendationsScreen.js → SettingsScreen.js → CampaignEndScreen.js → main.js
```

---

## Phase 1: Foundation

### Task 1: HTML shell + CSS

**Files:**
- Create: `agentenfunk/index.html`

- [ ] Create `index.html` with CRT visual design, all screen `<div>` containers (hidden by default), Google Fonts, and placeholder `<script>` tags for load order.

```html
<!DOCTYPE html>
<html lang="en" id="html-root">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="theme-color" content="#040d08"/>
  <link rel="manifest" href="manifest.json"/>
  <title>Agentenfunk</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Oswald:wght@400;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

    :root {
      --bg:       #040d08;
      --green:    #00ff88;
      --dim:      #00aa55;
      --amber:    #ffaa00;
      --red:      #ff3333;
      --panel-bg: #020a05;
      --border:   #00aa55;
    }

    html, body {
      height: 100%;
      background: var(--bg);
      color: var(--green);
      font-family: 'Share Tech Mono', monospace;
      overflow: hidden;
    }

    /* CRT overlay */
    body::before {
      content: '';
      position: fixed; inset: 0; z-index: 9999;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.08) 2px,
        rgba(0,0,0,0.08) 4px
      );
      pointer-events: none;
    }

    /* Vignette */
    body::after {
      content: '';
      position: fixed; inset: 0; z-index: 9998;
      background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%);
      pointer-events: none;
    }

    /* Flicker */
    @keyframes flicker {
      0%,100% { opacity:1; }
      92%      { opacity:1; }
      93%      { opacity:0.92; }
      94%      { opacity:1; }
      96%      { opacity:0.95; }
      97%      { opacity:1; }
    }
    #app { animation: flicker 8s infinite; height: 100%; display: flex; flex-direction: column; }

    .screen { display: none; flex-direction: column; height: 100%; overflow-y: auto; padding: 16px; }
    .screen.active { display: flex; }

    .panel {
      background: var(--panel-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 12px 16px;
      margin-bottom: 12px;
    }

    .panel-label {
      font-family: 'Oswald', sans-serif;
      font-size: 0.65rem;
      letter-spacing: 2px;
      color: var(--dim);
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    h1, h2 {
      font-family: 'Oswald', sans-serif;
      color: var(--green);
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .btn {
      background: var(--panel-bg);
      border: 1px solid var(--border);
      color: var(--green);
      font-family: 'Share Tech Mono', monospace;
      font-size: 1rem;
      padding: 10px 20px;
      cursor: pointer;
      letter-spacing: 1px;
      transition: background 0.1s, border-color 0.1s;
      width: 100%;
      text-align: left;
    }
    .btn:hover, .btn:focus { background: #041a0c; border-color: var(--green); outline: none; }
    .btn + .btn { margin-top: 8px; }

    .signal-meter {
      height: 6px;
      background: #011a0a;
      border: 1px solid var(--border);
      border-radius: 2px;
      overflow: hidden;
    }
    .signal-meter-fill {
      height: 100%;
      background: var(--green);
      transition: width 0.3s;
    }

    /* Tap zones */
    .tap-zones {
      display: flex;
      gap: 8px;
      flex: 1;
      min-height: 120px;
    }
    .tap-zone {
      flex: 1;
      border: 2px solid var(--border);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      cursor: pointer;
      user-select: none;
      transition: background 0.05s;
      -webkit-tap-highlight-color: transparent;
    }
    .tap-zone.flash { background: #004422; }

    /* Back link */
    #back-btn {
      position: fixed; top: 10px; left: 12px; z-index: 200;
      color: var(--dim); font-size: 13px; text-decoration: none; opacity: 0.7;
    }
    #back-btn:hover { opacity: 1; color: var(--amber); }

    /* Lang toggle */
    .lang-toggle {
      position: fixed; top: 10px; right: 12px; z-index: 200;
      display: flex; gap: 6px;
    }
    .lang-btn {
      background: var(--panel-bg); border: 1px solid var(--border);
      border-radius: 4px; color: var(--dim);
      font-family: 'Share Tech Mono', monospace; font-size: 0.8rem;
      padding: 3px 8px; cursor: pointer;
    }
    .lang-btn.active { border-color: var(--green); color: var(--green); }

    /* Morse display */
    .morse-display {
      font-size: 1.8rem;
      letter-spacing: 6px;
      color: var(--green);
      min-height: 2.5rem;
      text-align: center;
    }

    /* Pulse animation for incoming transmissions */
    @keyframes pulse {
      0%,100% { text-shadow: 0 0 4px var(--green); }
      50%      { text-shadow: 0 0 18px var(--green), 0 0 30px var(--green); }
    }
    .pulse { animation: pulse 0.6s ease-in-out; }

    /* Answer choices */
    .choices { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .choice-btn {
      background: var(--panel-bg); border: 2px solid var(--border);
      color: var(--green); font-family: 'Share Tech Mono', monospace;
      font-size: 1.4rem; padding: 14px; cursor: pointer;
      border-radius: 4px; text-align: center;
      transition: background 0.1s, border-color 0.1s;
    }
    .choice-btn:hover { background: #041a0c; border-color: var(--green); }
    .choice-btn.correct { border-color: var(--green); background: #004422; }
    .choice-btn.wrong   { border-color: var(--red);   background: #220000; }

    /* Achievement overlay */
    #achievement-overlay {
      position: fixed; inset: 0; z-index: 500;
      background: rgba(0,0,0,0.85);
      display: none; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 24px;
    }
    #achievement-overlay.show { display: flex; }

    /* Morse reference overlay */
    #morse-ref-overlay {
      position: fixed; inset: 0; z-index: 400;
      background: rgba(2,10,5,0.96);
      display: none; flex-direction: column;
      padding: 16px; overflow-y: auto;
    }
    #morse-ref-overlay.show { display: flex; }

    .morse-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 8px;
    }
    .morse-cell {
      border: 1px solid var(--border); border-radius: 3px;
      padding: 6px; text-align: center; background: var(--panel-bg);
    }
    .morse-cell .letter { font-size: 1.2rem; color: var(--green); }
    .morse-cell .code   { font-size: 0.75rem; color: var(--dim); letter-spacing: 2px; }
    .morse-cell.locked  { opacity: 0.2; }
  </style>
</head>
<body>
  <a id="back-btn" href="../index.html">← Übersicht</a>

  <div class="lang-toggle">
    <button class="lang-btn" id="lang-de" onclick="setLang('de')">DE</button>
    <button class="lang-btn" id="lang-en" onclick="setLang('en')">EN</button>
  </div>

  <div id="app">
    <div id="screen-menu"    class="screen"></div>
    <div id="screen-mission" class="screen"></div>
    <div id="screen-decode"  class="screen"></div>
    <div id="screen-encode"  class="screen"></div>
    <div id="screen-commend" class="screen"></div>
    <div id="screen-settings" class="screen"></div>
    <div id="screen-campaign-end" class="screen"></div>
  </div>

  <!-- Achievement unlock overlay -->
  <div id="achievement-overlay">
    <div id="achievement-badge-render"></div>
    <div id="achievement-citation" style="margin-top:16px;text-align:center;max-width:320px;"></div>
    <button class="btn" style="margin-top:20px;width:auto;padding:8px 32px;" onclick="AchievementsEngine.dismissOverlay()"></button>
  </div>

  <!-- Morse reference overlay -->
  <div id="morse-ref-overlay">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <span style="font-family:Oswald,sans-serif;letter-spacing:2px;" id="ref-title">MORSE REFERENCE</span>
      <button class="btn" style="width:auto;padding:4px 14px;" onclick="MorseReference.hide()">✕</button>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <button class="btn" style="width:auto;" onclick="MorseReference.showGrid()" id="ref-btn-grid">ALPHABET</button>
      <button class="btn" style="width:auto;" onclick="MorseReference.showTree()" id="ref-btn-tree">TREE</button>
    </div>
    <div id="morse-ref-content"></div>
  </div>

  <!-- Scripts: load order matters -->
  <script src="src/i18n/lang.js"></script>
  <script src="src/i18n/strings.js"></script>
  <script src="src/data/morse.js"></script>
  <script src="src/data/missions.js"></script>
  <script src="src/data/achievements.js"></script>
  <script src="src/audio/audio.js"></script>
  <script src="src/input/input.js"></script>
  <script src="src/game/progression.js"></script>
  <script src="src/game/achievements-engine.js"></script>
  <script src="src/ui/router.js"></script>
  <script src="src/ui/morse-reference.js"></script>
  <script src="src/ui/badges.js"></script>
  <script src="src/screens/MenuScreen.js"></script>
  <script src="src/screens/MissionScreen.js"></script>
  <script src="src/screens/DecodeScreen.js"></script>
  <script src="src/screens/EncodeScreen.js"></script>
  <script src="src/screens/CommendationsScreen.js"></script>
  <script src="src/screens/SettingsScreen.js"></script>
  <script src="src/screens/CampaignEndScreen.js"></script>
  <script src="src/main.js"></script>
</body>
</html>
```

- [ ] Open in browser, confirm CRT overlay and vignette render correctly, no console errors.
- [ ] Commit: `git add agentenfunk/index.html && git commit -m "feat(agentenfunk): HTML shell with CRT visual design"`

---

### Task 2: i18n

**Files:**
- Create: `agentenfunk/src/i18n/lang.js`
- Create: `agentenfunk/src/i18n/strings.js`

- [ ] Create `src/i18n/lang.js` (mirrors pflanzenwelt pattern):

```js
var LANG = (function() {
  var stored = localStorage.getItem('agentenfunk_lang');
  if (stored === 'en' || stored === 'de') return stored;
  var nav = (navigator.language || 'en').toLowerCase();
  return nav.startsWith('de') ? 'de' : 'en';
})();

function setLang(lang) {
  localStorage.setItem('agentenfunk_lang', lang);
  LANG = lang;
  document.getElementById('html-root').lang = lang;
  document.getElementById('back-btn').textContent = lang === 'de' ? '← Übersicht' : '← Overview';
  document.getElementById('lang-de').className = 'lang-btn' + (lang === 'de' ? ' active' : '');
  document.getElementById('lang-en').className = 'lang-btn' + (lang === 'en' ? ' active' : '');
  if (typeof Router !== 'undefined') Router.render();
}
```

- [ ] Create `src/i18n/strings.js` with full EN/DE string table:

```js
var STRINGS = {
  en: {
    // Menu
    menuTitle: 'MORSE INTERCEPTOR',
    menuSubtitle: 'CLASSIFIED // EYES ONLY',
    menuCampaign: '▶ CAMPAIGN',
    menuFreePlay: '🔓 FREE PLAY',
    menuCommendations: '★ COMMENDATIONS',
    campaignProgress: 'MISSION {n} OF 12',
    campaignComplete: 'CAMPAIGN COMPLETE',
    campaignFinaleTitle: 'OPERATION CONCLUDED',
    campaignFinaleText: 'You have decoded the final transmission. The network is secure. Your service to the signals corps will not be forgotten, operator.',
    campaignContinue: 'CONTINUE TO FREE PLAY →',
    finaleIncoming: 'FINAL TRANSMISSION INCOMING',
    finaleDecodeInstruction: 'Decode each word of the final message. No hints. You know the code.',
    menuSettings: '⚙ SETTINGS',
    menuReference: '≡ MORSE REFERENCE',
    // Mission
    missionTitle: 'MISSION BRIEFING',
    missionClassified: 'CLASSIFIED',
    missionStart: 'ACCEPT MISSION →',
    // Decode
    decodeTitle: 'INCOMING TRANSMISSION',
    decodeInstruction: 'IDENTIFY THE SIGNAL',
    decodeStreak: 'STREAK',
    decodeAccuracy: 'ACCURACY',
    decodeSignal: 'SIGNAL STRENGTH',
    decodeCorrect: 'CONFIRMED',
    decodeWrong: 'INCORRECT — REVIEW CODE',
    decodeMissionComplete: 'TRANSMISSION SECURED',
    // Encode
    encodeTitle: 'TRANSMIT MESSAGE',
    encodeInstruction: 'TAP OUT THE CODE',
    encodeDot: '·  DOT',
    encodeDash: '—  DASH',
    encodeHint: 'PAUSE TO CONFIRM',
    // Stars
    stars3: 'EXEMPLARY — 3 STARS',
    stars2: 'SATISFACTORY — 2 STARS',
    stars1: 'MISSION COMPLETE — 1 STAR',
    // Settings
    settingsTitle: 'OPERATOR SETTINGS',
    settingsLang: 'LANGUAGE',
    settingsPause: 'SENSITIVITY CALIBRATION',
    settingsPause600: 'HAIR TRIGGER (600ms)',
    settingsPause900: 'STANDARD (900ms)',
    settingsPause1200: 'DELIBERATE (1200ms)',
    settingsMute: 'MUTE ALL AUDIO',
    settingsAmbient: 'AMBIENT STATIC',
    settingsClose: '← BACK',
    settingsDangerZone: 'DANGER ZONE',
    settingsReset: '⚠ RESET ALL PROGRESS',
    settingsResetConfirm: 'Reset all progress, achievements and campaign? This cannot be undone.',
    // Commendations
    commendTitle: 'COMMENDATIONS',
    commendSubtitle: 'FIELD CITATIONS',
    commendCount: 'CITATIONS AWARDED',
    commendLocked: 'CLASSIFIED',
    // Reference
    refTitle: 'MORSE REFERENCE',
    refAlphabet: 'ALPHABET',
    refTree: 'TREE',
    refLocked: 'LOCKED',
    // Wave labels
    wave1: 'WAVE 1 — BASIC SIGNALS',
    wave2: 'WAVE 2 — TWO-SYMBOL',
    wave3: 'WAVE 3 — COMMON',
    wave4: 'WAVE 4 — INTERMEDIATE',
    wave5: 'WAVE 5 — FULL ALPHABET',
    wave6: 'WAVE 6 — NUMBERS',
    // Achievements dismiss
    achieveDismiss: 'ACKNOWLEDGED',
    // Misc
    back: '← BACK',
    mute: 'MUTE',
    unmute: 'UNMUTE',
  },
  de: {
    menuTitle: 'AGENTENFUNK',
    menuSubtitle: 'GEHEIM // NUR FÜR BEFUGTE',
    menuCampaign: '▶ KAMPAGNE',
    menuFreePlay: '🔓 FREIES SPIEL',
    menuCommendations: '★ AUSZEICHNUNGEN',
    campaignProgress: 'MISSION {n} VON 12',
    campaignComplete: 'KAMPAGNE ABGESCHLOSSEN',
    campaignFinaleTitle: 'OPERATION ABGESCHLOSSEN',
    campaignFinaleText: 'Du hast die letzte Übertragung entschlüsselt. Das Netzwerk ist gesichert. Dein Dienst beim Funkerkorps wird nicht vergessen, Funker.',
    campaignContinue: 'WEITER ZU FREIEM SPIEL →',
    finaleIncoming: 'LETZTE ÜBERTRAGUNG EINGEHEND',
    finaleDecodeInstruction: 'Entschlüssle jedes Wort der letzten Nachricht. Keine Hinweise. Du kennst den Code.',
    menuSettings: '⚙ EINSTELLUNGEN',
    menuReference: '≡ MORSECODE-TABELLE',
    missionTitle: 'MISSIONSBRIEFING',
    missionClassified: 'STRENG GEHEIM',
    missionStart: 'MISSION ANNEHMEN →',
    decodeTitle: 'EINGEHENDE ÜBERTRAGUNG',
    decodeInstruction: 'SIGNAL IDENTIFIZIEREN',
    decodeStreak: 'SERIE',
    decodeAccuracy: 'TREFFERQUOTE',
    decodeSignal: 'SIGNALSTÄRKE',
    decodeCorrect: 'BESTÄTIGT',
    decodeWrong: 'FALSCH — CODE PRÜFEN',
    decodeMissionComplete: 'ÜBERTRAGUNG GESICHERT',
    encodeTitle: 'NACHRICHT SENDEN',
    encodeInstruction: 'CODE EINGEBEN',
    encodeDot: '·  PUNKT',
    encodeDash: '—  STRICH',
    encodeHint: 'PAUSE ZUM BESTÄTIGEN',
    stars3: 'AUSGEZEICHNET — 3 STERNE',
    stars2: 'ZUFRIEDENSTELLEND — 2 STERNE',
    stars1: 'MISSION ERFÜLLT — 1 STERN',
    settingsTitle: 'FUNKER-EINSTELLUNGEN',
    settingsLang: 'SPRACHE',
    settingsPause: 'EMPFINDLICHKEITSKALIBRIERUNG',
    settingsPause600: 'HOCHEMPFINDLICH (600ms)',
    settingsPause900: 'STANDARD (900ms)',
    settingsPause1200: 'BEDÄCHTIG (1200ms)',
    settingsMute: 'AUDIO STUMM',
    settingsAmbient: 'UMGEBUNGSRAUSCHEN',
    settingsClose: '← ZURÜCK',
    settingsDangerZone: 'GEFAHRENZONE',
    settingsReset: '⚠ FORTSCHRITT ZURÜCKSETZEN',
    settingsResetConfirm: 'Gesamten Fortschritt, Auszeichnungen und Kampagne zurücksetzen? Dies kann nicht rückgängig gemacht werden.',
    commendTitle: 'AUSZEICHNUNGEN',
    commendSubtitle: 'FELDMELDUNGEN',
    commendCount: 'AUSZEICHNUNGEN VERLIEHEN',
    commendLocked: 'KLASSIFIZIERT',
    refTitle: 'MORSECODE-TABELLE',
    refAlphabet: 'ALPHABET',
    refTree: 'BAUM',
    refLocked: 'GESPERRT',
    wave1: 'WELLE 1 — GRUNDSIGNALE',
    wave2: 'WELLE 2 — ZWEI SYMBOLE',
    wave3: 'WELLE 3 — HÄUFIGE',
    wave4: 'WELLE 4 — MITTELSTUFE',
    wave5: 'WELLE 5 — VOLLES ALPHABET',
    wave6: 'WELLE 6 — ZAHLEN',
    achieveDismiss: 'BESTÄTIGT',
    back: '← ZURÜCK',
    mute: 'STUMM',
    unmute: 'TON AN',
  }
};

function t(key) {
  return (STRINGS[LANG] && STRINGS[LANG][key]) || STRINGS['en'][key] || key;
}
```

- [ ] Commit: `git add agentenfunk/src/i18n/ && git commit -m "feat(agentenfunk): i18n lang detection and full EN/DE strings"`

---

### Task 3: Morse data

**Files:**
- Create: `agentenfunk/src/data/morse.js`
- Create: `agentenfunk/tests/morse.test.js`

- [ ] Write failing test first:

```js
// tests/morse.test.js
var assert = require('../tests/assert');
// morse.js exposes MORSE global — load it
eval(require('fs').readFileSync(__dirname + '/../src/data/morse.js', 'utf8'));

assert(MORSE['E'] === '.', 'E is dot');
assert(MORSE['T'] === '-', 'T is dash');
assert(MORSE['A'] === '.-', 'A is dot-dash');
assert(MORSE['S'] === '...', 'S is three dots');
assert(MORSE['O'] === '---', 'O is three dashes');
assert(MORSE['0'] === '-----', '0 is five dashes');
assert(Object.keys(MORSE).length === 36, '26 letters + 10 digits');

// MORSE_REVERSE: code -> letter
assert(MORSE_REVERSE['.'] === 'E', 'reverse E');
assert(MORSE_REVERSE['.-'] === 'A', 'reverse A');

console.log('\nAll morse tests passed.');
```

- [ ] Create `tests/assert.js` helper:

```js
// tests/assert.js
module.exports = function assert(condition, message) {
  if (!condition) throw new Error('FAIL: ' + message);
  console.log('PASS: ' + message);
};
```

- [ ] Run test, confirm failure: `node tests/morse.test.js`

- [ ] Create `src/data/morse.js`:

```js
var MORSE = {
  'A':'.-',   'B':'-...', 'C':'-.-.', 'D':'-..',  'E':'.',
  'F':'..-.', 'G':'--.',  'H':'....', 'I':'..',   'J':'.---',
  'K':'-.-',  'L':'.-..', 'M':'--',   'N':'-.',   'O':'---',
  'P':'.--.', 'Q':'--.-', 'R':'.-.',  'S':'...',  'T':'-',
  'U':'..-',  'V':'...-', 'W':'.--',  'X':'-..-', 'Y':'-.--',
  'Z':'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-',
  '5':'.....','6':'-....','7':'--...','8':'---..','9':'----.'
};

var MORSE_REVERSE = (function() {
  var r = {};
  Object.keys(MORSE).forEach(function(k) { r[MORSE[k]] = k; });
  return r;
})();

// WAVES: letters introduced per wave
var MORSE_WAVES = [
  [],                          // wave 0 (unused)
  ['E','T'],                   // wave 1
  ['A','N'],                   // wave 2
  ['I','M','S','O'],           // wave 3
  ['D','G','K','R','U','W'],   // wave 4
  ['B','C','F','H','J','L','P','Q','V','X','Y','Z'], // wave 5 (remainder)
  ['0','1','2','3','4','5','6','7','8','9']           // wave 6
];

// Returns all letters unlocked up through waveIndex
function lettersUnlockedThrough(waveIndex) {
  var result = [];
  for (var i = 1; i <= waveIndex; i++) {
    result = result.concat(MORSE_WAVES[i] || []);
  }
  return result;
}

// Render a morse code string as dot/dash unicode symbols
function morseToDisplay(code) {
  return code.split('').map(function(c) {
    return c === '.' ? '·' : '—';
  }).join(' ');
}
```

- [ ] Run test, confirm pass: `node tests/morse.test.js`
- [ ] Commit: `git add agentenfunk/src/data/morse.js agentenfunk/tests/ && git commit -m "feat(agentenfunk): morse table with waves and display helpers"`

---

### Task 4: Audio engine

**Files:**
- Create: `agentenfunk/src/audio/audio.js`

No unit tests for Web Audio (browser-only API) — manual test in browser.

- [ ] Create `src/audio/audio.js`:

```js
var Audio = (function() {
  var ctx = null;
  var muted = localStorage.getItem('agentenfunk_mute') === '1';
  var ambientOn = localStorage.getItem('agentenfunk_ambient') !== '0';
  var ambientNode = null;
  var ambientGain = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
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

  // Play morse code string as audio, returns promise resolving when done
  function playMorse(code, onSymbol) {
    var DOT  = 0.08;
    var DASH = 0.24;
    var GAP  = 0.08;
    var c = getCtx();
    var t = c.currentTime + 0.05;
    code.split('').forEach(function(sym, i) {
      var dur = sym === '.' ? DOT : DASH;
      if (!muted) beep(dur, 600, t);
      if (onSymbol) {
        (function(time, s) {
          setTimeout(function() { onSymbol(s); }, (time - c.currentTime) * 1000);
        })(t, sym);
      }
      t += dur + GAP;
    });
    return new Promise(function(resolve) {
      setTimeout(resolve, (t - c.currentTime) * 1000 + 100);
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

  return { playMorse, playCorrect, playWrong, playMedalThud, startAmbient, stopAmbient, toggleMute, toggleAmbient, isMuted, isAmbientOn };
})();
```

- [ ] Manual test: open in browser, call `Audio.playMorse('.-')` in console — hear dot-dash.
- [ ] Commit: `git add agentenfunk/src/audio/ && git commit -m "feat(agentenfunk): Web Audio engine with morse playback, SFX, ambient"`

---

### Task 5: Input system

**Files:**
- Create: `agentenfunk/src/input/input.js`

- [ ] Create `src/input/input.js`:

```js
var Input = (function() {
  var dotCallback = null;
  var dashCallback = null;
  var confirmCallback = null;
  var sequence = [];
  var timer = null;
  var pauseMs = parseInt(localStorage.getItem('agentenfunk_pause') || '900');
  var active = false;
  var spaceDown = false;
  var spaceStart = 0;

  function setPause(ms) {
    pauseMs = ms;
    localStorage.setItem('agentenfunk_pause', ms);
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
    cancel();
  }

  function onDot(cb)     { dotCallback = cb; }
  function onDash(cb)    { dashCallback = cb; }
  function onConfirm(cb) { confirmCallback = cb; }

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup',   onKeyUp);

  return { dot, dash, cancel, enable, disable, onDot, onDash, onConfirm, bindTapZones, setPause, getPause };
})();
```

- [ ] Commit: `git add agentenfunk/src/input/ && git commit -m "feat(agentenfunk): input system — tap zones, keyboard, pause-to-confirm"`

---

### Task 6: Progression system

**Files:**
- Create: `agentenfunk/src/game/progression.js`
- Create: `agentenfunk/tests/progression.test.js`

- [ ] Write failing test:

```js
// tests/progression.test.js
var assert = require('./assert');
var fs = require('fs');
// Stub globals needed by progression.js
global.localStorage = { _d:{}, getItem: function(k){return this._d[k]||null;}, setItem: function(k,v){this._d[k]=v;} };
eval(fs.readFileSync(__dirname + '/../src/data/morse.js', 'utf8'));
eval(fs.readFileSync(__dirname + '/../src/game/progression.js', 'utf8'));

// Fresh state
Progression.reset();
assert(Progression.getWave() === 1, 'starts at wave 1');
assert(Progression.getUnlockedLetters().length === 2, 'wave 1 has 2 letters');
assert(Progression.getUnlockedLetters().indexOf('E') !== -1, 'E unlocked');

Progression.unlockWave(2);
assert(Progression.getWave() === 2, 'wave advances to 2');
assert(Progression.getUnlockedLetters().length === 4, 'wave 2 adds A,N');

// Campaign
assert(Progression.getCampaignIdx() === 0, 'campaign starts at 0');
assert(!Progression.isCampaignDone(), 'campaign not done initially');
Progression.advanceCampaign();
assert(Progression.getCampaignIdx() === 1, 'campaign advances to 1');

// Stars
assert(Progression.starsForAccuracy(1.0, true)  === 3, '100% fast = 3 stars');
assert(Progression.starsForAccuracy(0.9, false) === 2, '90% = 2 stars');
assert(Progression.starsForAccuracy(0.5, false) === 1, '50% = 1 star');

console.log('\nAll progression tests passed.');
```

- [ ] Run, confirm fail: `node tests/progression.test.js`

- [ ] Create `src/game/progression.js`:

```js
var Progression = (function() {
  var SAVE_KEY = 'agentenfunk_progress';
  var state = load();

  function load() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return { wave: 1, missionsDone: 0, totalPlayMs: 0, campaignIdx: 0, campaignDone: false };
  }

  function save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  function reset() {
    state = { wave: 1, missionsDone: 0, totalPlayMs: 0, campaignIdx: 0, campaignDone: false };
    save();
  }

  function getWave() { return state.wave; }
  function getMissionsDone() { return state.missionsDone; }
  function getTotalPlayMs() { return state.totalPlayMs; }

  function getUnlockedLetters() {
    return lettersUnlockedThrough(state.wave); // from morse.js
  }

  function unlockWave(w) {
    if (w > state.wave) { state.wave = w; save(); }
  }

  function completeMission(durationMs) {
    state.missionsDone += 1;
    state.totalPlayMs += durationMs;
    save();
  }

  function getCampaignIdx()  { return state.campaignIdx; }
  function isCampaignDone()  { return state.campaignDone; }

  function advanceCampaign() {
    if (state.campaignDone) return;
    state.campaignIdx = Math.min(state.campaignIdx + 1, MISSIONS.length);
    if (state.campaignIdx >= MISSIONS.length) state.campaignDone = true;
    save();
  }

  function starsForAccuracy(accuracy, fast) {
    if (accuracy >= 0.95 && fast) return 3;
    if (accuracy >= 0.8)         return 2;
    return 1;
  }

  return { reset, getWave, getMissionsDone, getTotalPlayMs, getUnlockedLetters, unlockWave, completeMission, starsForAccuracy, getCampaignIdx, isCampaignDone, advanceCampaign };
})();
```

- [ ] Run test, confirm pass: `node tests/progression.test.js`
- [ ] Commit: `git add agentenfunk/src/game/progression.js agentenfunk/tests/progression.test.js && git commit -m "feat(agentenfunk): progression system — waves, letter unlocks, stars"`

---

### Task 7: Mission data

**Files:**
- Create: `agentenfunk/src/data/missions.js`

- [ ] Create `src/data/missions.js`. Missions alternate decode/encode. Briefings differ by LANG.

```js
var MISSIONS = [
  {
    id: 'paperclip', wave: 1, mode: 'decode',
    name: { en: 'OPERATION PAPERCLIP', de: 'OPERATION BÜROKLAMMER' },
    briefing: {
      en: 'Agent — a transmission from an unknown source has been intercepted. Identify the signals.',
      de: 'Funker — eine Übertragung aus unbekannter Quelle wurde abgefangen. Signale identifizieren.'
    }
  },
  {
    id: 'mincemeat', wave: 1, mode: 'encode',
    name: { en: 'OPERATION MINCEMEAT', de: 'OPERATION HACKFLEISCH' },
    briefing: {
      en: 'HQ requires confirmation. Transmit the codes accurately.',
      de: 'Die Zentrale benötigt Bestätigung. Codes korrekt übermitteln.'
    }
  },
  {
    id: 'gold', wave: 2, mode: 'decode',
    name: { en: 'OPERATION GOLD', de: 'OPERATION GOLD' },
    briefing: {
      en: 'A message from East Berlin has been intercepted. Decrypt it now.',
      de: 'Eine Nachricht aus Ost-Berlin wurde abgefangen. Jetzt entschlüsseln.'
    }
  },
  {
    id: 'stopwatch', wave: 2, mode: 'encode',
    name: { en: 'OPERATION STOPWATCH', de: 'OPERATION STOPPUHR' },
    briefing: {
      en: 'Time is critical. Transmit each signal with precision.',
      de: 'Zeit ist knapp. Jeden Code mit Präzision senden.'
    }
  },
  {
    id: 'ivy_bells', wave: 3, mode: 'decode',
    name: { en: 'OPERATION IVY BELLS', de: 'OPERATION EFEUGLÖCKEN' },
    briefing: {
      en: 'Deep cover asset has made contact. Stand by for incoming.',
      de: 'Undercoverquelle hat Kontakt aufgenommen. Eingehende Übertragung erwarten.'
    }
  },
  {
    id: 'corona', wave: 3, mode: 'encode',
    name: { en: 'OPERATION CORONA', de: 'OPERATION KRONE' },
    briefing: {
      en: 'Relay the extraction coordinates. Each symbol counts.',
      de: 'Extraktionskoordinaten übermitteln. Jedes Symbol zählt.'
    }
  },
  {
    id: 'ryan', wave: 4, mode: 'decode',
    name: { en: 'OPERATION RYAN', de: 'OPERATION RYAN' },
    briefing: {
      en: 'Intercept traffic suggests imminent movement. Decode at speed.',
      de: 'Abgehörter Funkverkehr deutet auf bevorstehende Bewegung hin. Schnell entschlüsseln.'
    }
  },
  {
    id: 'gladio', wave: 4, mode: 'encode',
    name: { en: 'OPERATION GLADIO', de: 'OPERATION GLADIO' },
    briefing: {
      en: 'The network is waiting. Transmit the activation phrase.',
      de: 'Das Netzwerk wartet. Aktivierungsphrase senden.'
    }
  },
  {
    id: 'venona', wave: 5, mode: 'decode',
    name: { en: 'OPERATION VENONA', de: 'OPERATION VENONA' },
    briefing: {
      en: 'Full spectrum intercept. All letters are in play. Stay sharp.',
      de: 'Volles Spektrum abgefangen. Alle Buchstaben möglich. Konzentration.'
    }
  },
  {
    id: 'swordfish', wave: 5, mode: 'encode',
    name: { en: 'OPERATION SWORDFISH', de: 'OPERATION SCHWERTFISCH' },
    briefing: {
      en: 'The password is the key. Transmit it without error.',
      de: 'Das Passwort ist der Schlüssel. Fehlerfrei übermitteln.'
    }
  },
  {
    id: 'numerus', wave: 6, mode: 'decode',
    name: { en: 'OPERATION NUMERUS', de: 'OPERATION NUMERUS' },
    briefing: {
      en: 'Numbers station detected. Decode the numerical transmission.',
      de: 'Zahlensender geortet. Numerische Übertragung entschlüsseln.'
    }
  },
  {
    id: 'cipher', wave: 6, mode: 'encode',
    name: { en: 'OPERATION CIPHER', de: 'OPERATION CHIFFRE' },
    briefing: {
      en: 'Encode the numerical cipher for transmission to HQ.',
      de: 'Zahlen-Chiffre für Übermittlung an die Zentrale codieren.'
    }
  }
];

function getMissionsForWave(wave) {
  return MISSIONS.filter(function(m) { return m.wave <= wave; });
}
```

- [ ] Commit: `git add agentenfunk/src/data/missions.js && git commit -m "feat(agentenfunk): mission definitions with EN/DE briefings"`

---

## Phase 2: Decode Mode

### Task 8: Router + Menu screen

**Files:**
- Create: `agentenfunk/src/ui/router.js`
- Create: `agentenfunk/src/screens/MenuScreen.js`
- Create: `agentenfunk/src/main.js`

- [ ] Create `src/ui/router.js`:

```js
var Router = (function() {
  var screens = ['menu','mission','decode','encode','commend','settings','campaign-end'];
  var current = null;

  function go(name, data) {
    screens.forEach(function(s) {
      var el = document.getElementById('screen-' + s);
      if (el) el.classList.remove('active');
    });
    var el = document.getElementById('screen-' + name);
    if (el) el.classList.add('active');
    current = name;
    var screenMap = {
      menu:           MenuScreen,
      mission:        MissionScreen,
      decode:         DecodeScreen,
      encode:         EncodeScreen,
      commend:        CommendationsScreen,
      settings:       SettingsScreen,
      'campaign-end': CampaignEndScreen
    };
    if (screenMap[name] && screenMap[name].render) screenMap[name].render(data);
  }

  function render() {
    if (current) go(current);
  }

  return { go, render };
})();
```

- [ ] Create `src/screens/MenuScreen.js`:

```js
var MenuScreen = (function() {
  function render() {
    var el = document.getElementById('screen-menu');
    var campaignDone = Progression.isCampaignDone();
    var campaignIdx  = Progression.getCampaignIdx();
    var campaignLabel = t('menuCampaign') +
      (campaignDone
        ? ' ✓'
        : ' (' + t('campaignProgress').replace('{n}', campaignIdx + 1) + ')');

    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;padding:24px 16px;">',
      '<h1 style="font-size:2rem;text-align:center;margin-bottom:4px;">' + t('menuTitle') + '</h1>',
      '<p style="color:var(--dim);letter-spacing:3px;font-size:0.7rem;margin-bottom:24px;">' + t('menuSubtitle') + '</p>',
      '<button class="btn" onclick="MissionScreen.startCampaign()">' + campaignLabel + '</button>',
      '<button class="btn" onclick="Router.go(\'mission\')">' + t('menuFreePlay') + '</button>',
      '<button class="btn" onclick="Router.go(\'commend\')">' + t('menuCommendations') + '</button>',
      '<button class="btn" onclick="Router.go(\'settings\')">' + t('menuSettings') + '</button>',
      '<button class="btn" onclick="MorseReference.show()">' + t('menuReference') + '</button>',
      '</div>'
    ].join('');
  }
  return { render };
})();
```

- [ ] Create `src/main.js`:

```js
(function() {
  document.getElementById('html-root').lang = LANG;
  document.getElementById('back-btn').textContent = LANG === 'de' ? '← Übersicht' : '← Overview';
  document.getElementById('lang-de').className = 'lang-btn' + (LANG === 'de' ? ' active' : '');
  document.getElementById('lang-en').className = 'lang-btn' + (LANG === 'en' ? ' active' : '');
  Router.go('menu');
  Audio.startAmbient();
})();
```

- [ ] Open in browser, confirm menu renders with correct language and buttons work.
- [ ] Commit: `git add agentenfunk/src/ui/router.js agentenfunk/src/screens/MenuScreen.js agentenfunk/src/main.js && git commit -m "feat(agentenfunk): router + main menu screen"`

---

### Task 9: Mission select screen

**Files:**
- Create: `agentenfunk/src/screens/MissionScreen.js`

- [ ] Create `src/screens/MissionScreen.js`:

```js
var MissionScreen = (function() {
  // Free play: show all wave-unlocked missions as a selectable list
  function render() {
    var wave = Progression.getWave();
    var missions = getMissionsForWave(wave);
    var el = document.getElementById('screen-mission');

    var rows = missions.map(function(m) {
      return [
        '<div class="panel" style="cursor:pointer;" onclick="MissionScreen.selectMission(\'' + m.id + '\')">',
        '<div class="panel-label">' + t('wave' + m.wave) + ' // ' + m.mode.toUpperCase() + '</div>',
        '<div style="font-family:Oswald,sans-serif;font-size:1.1rem;margin-bottom:6px;">' + m.name[LANG] + '</div>',
        '<div style="color:var(--dim);font-size:0.85rem;">' + m.briefing[LANG] + '</div>',
        '</div>'
      ].join('');
    }).join('');

    el.innerHTML = [
      '<div class="panel"><div class="panel-label">' + t('missionTitle') + ' // ' + t('menuFreePlay') + '</div>',
      '<p style="color:var(--dim);font-size:0.8rem;letter-spacing:2px;">' + t('missionClassified') + '</p></div>',
      rows,
      '<button class="btn" onclick="Router.go(\'menu\')">' + t('back') + '</button>'
    ].join('');
  }

  // Campaign: auto-launch the next campaign mission
  function startCampaign() {
    var idx = Progression.getCampaignIdx();
    if (Progression.isCampaignDone()) {
      // Replay from start or go to free play
      Router.go('campaign-end');
      return;
    }
    var mission = MISSIONS[idx];
    if (!mission) { Router.go('campaign-end'); return; }
    launchMission(mission, true);
  }

  function selectMission(id) {
    var mission = MISSIONS.filter(function(m) { return m.id === id; })[0];
    if (!mission) return;
    launchMission(mission, false);
  }

  function launchMission(mission, isCampaign) {
    if (mission.mode === 'decode') DecodeScreen.start(mission, isCampaign);
    else                           EncodeScreen.start(mission, isCampaign);
  }

  return { render, startCampaign, selectMission };
})();
```

- [ ] Commit: `git add agentenfunk/src/screens/MissionScreen.js && git commit -m "feat(agentenfunk): mission select screen"`

---

### Task 10: Decode mode gameplay

**Files:**
- Create: `agentenfunk/src/screens/DecodeScreen.js`

- [ ] Create `src/screens/DecodeScreen.js`:

```js
var DecodeScreen = (function() {
  var mission = null;
  var letters = [];
  var currentIdx = 0;
  var correct = 0;
  var total = 0;
  var streak = 0;
  var signal = 100;
  var missionStart = 0;
  var noRefUsed = true;
  var hadErrors = false;
  var isCampaign = false;
  var QUESTIONS_PER_MISSION = 10;
  var isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  function start(m, campaign) {
    isCampaign = !!campaign;
    mission = m;
    letters = Progression.getUnlockedLetters().filter(function(l) {
      return MORSE_WAVES[m.wave].indexOf(l) !== -1 ||
             lettersUnlockedThrough(m.wave - 1).indexOf(l) !== -1;
    });
    // Shuffle focus: 60% current wave, 40% review
    var wave = MORSE_WAVES[m.wave];
    var prev = lettersUnlockedThrough(m.wave - 1);
    var pool = [];
    for (var i = 0; i < QUESTIONS_PER_MISSION; i++) {
      pool.push(Math.random() < 0.6 ? wave[Math.floor(Math.random() * wave.length)]
                                    : (prev.length ? prev[Math.floor(Math.random() * prev.length)] : wave[0]));
    }
    letters = pool;
    currentIdx = 0; correct = 0; total = 0; streak = 0; signal = 100; noRefUsed = true; hadErrors = false;
    missionStart = Date.now();
    Input.disable();
    Router.go('decode');
  }

  function render() {
    if (!mission) return;
    var el = document.getElementById('screen-decode');
    var unlocked = Progression.getUnlockedLetters();
    // Mobile always uses tap-to-select (spec requirement); desktop uses free input on wave 4+
    var useChoices = isMobile || mission.wave <= 3;

    el.innerHTML = [
      '<div class="panel">',
      '  <div class="panel-label">' + mission.name[LANG] + '</div>',
      '  <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--dim);">',
      '    <span>' + t('decodeStreak') + ': <b style="color:var(--green)">' + streak + '</b></span>',
      '    <span>' + t('decodeAccuracy') + ': <b>' + (total ? Math.round(correct/total*100) : 100) + '%</b></span>',
      '    <span>' + (currentIdx+1) + '/' + QUESTIONS_PER_MISSION + '</span>',
      '  </div>',
      '  <div style="margin-top:8px;"><div class="panel-label">' + t('decodeSignal') + '</div>',
      '  <div class="signal-meter"><div class="signal-fill" style="width:' + signal + '%;height:100%;background:' + (signal > 60 ? 'var(--green)' : signal > 30 ? 'var(--amber)' : 'var(--red)') + ';transition:width 0.3s;"></div></div></div>',
      '</div>',
      '<div class="panel" style="text-align:center;">',
      '  <div class="panel-label">' + t('decodeInstruction') + '</div>',
      '  <div class="morse-display" id="morse-anim">···</div>',
      '  <div style="color:var(--dim);font-size:0.75rem;margin-top:4px;" id="morse-letter-prompt"></div>',
      '</div>',
      useChoices ? renderChoices() : renderInput(),
      '<div style="display:flex;gap:8px;margin-top:8px;">',
      '  <button class="btn" style="flex:1;" onclick="DecodeScreen.replayMorse()">↺ REPLAY</button>',
      '  <button class="btn" style="flex:1;" onclick="MorseReference.show();DecodeScreen._noRef()">≡ REF</button>',
      '</div>'
    ].join('');

    playCurrentLetter();
  }

  function _noRef() { noRefUsed = false; }

  function renderChoices() {
    var target = letters[currentIdx];
    var pool = Progression.getUnlockedLetters();
    var wrong = pool.filter(function(l) { return l !== target; });
    shuffle(wrong);
    var opts = [target].concat(wrong.slice(0,3));
    shuffle(opts);
    return '<div class="choices" id="answer-choices">' +
      opts.map(function(l) {
        return '<button class="choice-btn" onclick="DecodeScreen.checkAnswer(\'' + l + '\')">' + l + '</button>';
      }).join('') + '</div>';
  }

  function renderInput() {
    return '<div style="padding:16px 0;text-align:center;">' +
      '<input id="free-input" maxlength="1" style="background:var(--panel-bg);border:1px solid var(--border);color:var(--green);font-family:Share Tech Mono,monospace;font-size:2rem;width:60px;text-align:center;padding:8px;text-transform:uppercase;" autocomplete="off"/>' +
      '<button class="btn" style="margin-top:8px;" onclick="DecodeScreen.checkAnswer(document.getElementById(\'free-input\').value.toUpperCase())">CONFIRM</button>' +
      '</div>';
  }

  function playCurrentLetter() {
    var target = letters[currentIdx];
    var code = MORSE[target];
    var disp = document.getElementById('morse-anim');
    if (!disp) return;
    disp.textContent = '';
    Audio.playMorse(code, function(sym) {
      if (disp) {
        disp.textContent += (disp.textContent ? ' ' : '') + (sym === '.' ? '·' : '—');
        disp.classList.add('pulse');
        setTimeout(function() { disp && disp.classList.remove('pulse'); }, 600);
      }
    }).then(function() {
      // Record the moment the player can respond (after audio finishes)
      AchievementsEngine.setLetterPresentTime();
    });
  }

  function replayMorse() { playCurrentLetter(); }

  function checkAnswer(answer) {
    var target = letters[currentIdx];
    total++;
    var isCorrect = answer === target;
    if (isCorrect) {
      correct++;
      streak++;
      signal = Math.min(100, signal + 5);
      Audio.playCorrect();
      showFeedback(true, target);
      AchievementsEngine.onCorrectAnswer({ streak: streak });
      AchievementsEngine.onLetterCorrectAfterFails(target);
    } else {
      hadErrors = true;
      streak = 0;
      signal = Math.max(0, signal - 15);
      Audio.playWrong();
      showFeedback(false, target);
      AchievementsEngine.onWrongAnswer({ letter: target });
    }
    // Disable choices briefly
    var choices = document.querySelectorAll('.choice-btn');
    choices.forEach(function(b) { b.disabled = true; });

    setTimeout(function() {
      currentIdx++;
      if (currentIdx >= QUESTIONS_PER_MISSION) {
        endMission();
      } else {
        render();
      }
    }, 1000);
  }

  function showFeedback(ok, correct_letter) {
    var prompt = document.getElementById('morse-letter-prompt');
    if (prompt) {
      prompt.textContent = ok ? t('decodeCorrect') : t('decodeWrong') + ' (' + correct_letter + ' = ' + morseToDisplay(MORSE[correct_letter]) + ')';
      prompt.style.color = ok ? 'var(--green)' : 'var(--red)';
    }
  }

  function endMission() {
    var durationMs = Date.now() - missionStart;
    var accuracy = total ? correct / total : 1;
    var fast = durationMs < QUESTIONS_PER_MISSION * 3000;
    var stars = Progression.starsForAccuracy(accuracy, fast);
    Progression.completeMission(durationMs);
    var triggeredWaveUnlock = false;
    if (accuracy >= 0.8 && mission.wave === Progression.getWave()) {
      Progression.unlockWave(mission.wave + 1);
      triggeredWaveUnlock = true;
    }
    AchievementsEngine.onMissionComplete({
      accuracy: accuracy, fast: fast, noRef: noRefUsed, wave: mission.wave,
      hadErrors: hadErrors, triggeredWaveUnlock: triggeredWaveUnlock,
      mode: 'decode', durationMs: durationMs
    });

    if (isCampaign) Progression.advanceCampaign();
    showEndScreen(stars, accuracy);
  }

  function showEndScreen(stars, accuracy) {
    var el = document.getElementById('screen-decode');
    var starStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    var label = stars === 3 ? t('stars3') : stars === 2 ? t('stars2') : t('stars1');
    var nextBtn = isCampaign
      ? (Progression.isCampaignDone()
          ? '<button class="btn" onclick="Router.go(\'campaign-end\')">' + t('campaignComplete') + ' →</button>'
          : '<button class="btn" onclick="MissionScreen.startCampaign()">NEXT MISSION →</button>')
      : '<button class="btn" onclick="Router.go(\'mission\')">' + t('menuFreePlay') + '</button>';

    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;">',
      '<div style="font-size:3rem;letter-spacing:8px;">' + starStr + '</div>',
      '<div style="font-family:Oswald,sans-serif;letter-spacing:2px;">' + label + '</div>',
      '<div style="color:var(--dim);">' + t('decodeAccuracy') + ': ' + Math.round(accuracy*100) + '%</div>',
      nextBtn,
      '<button class="btn" onclick="Router.go(\'menu\')">' + t('back') + '</button>',
      '</div>'
    ].join('');
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i+1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  return { start, render, replayMorse, checkAnswer, _noRef };
})();
```

- [ ] Test in browser: start a decode mission, hear morse, select answer, see feedback + progress.
- [ ] Commit: `git add agentenfunk/src/screens/DecodeScreen.js && git commit -m "feat(agentenfunk): decode mode gameplay"`

---

## Phase 3: Encode Mode

### Task 11: Encode mode gameplay

**Files:**
- Create: `agentenfunk/src/screens/EncodeScreen.js`

- [ ] Create `src/screens/EncodeScreen.js`:

```js
var EncodeScreen = (function() {
  var mission = null;
  var letters = [];
  var currentIdx = 0;
  var correct = 0;
  var total = 0;
  var streak = 0;
  var signal = 100;
  var missionStart = 0;
  var currentSequence = '';
  var hadErrors = false;
  var QUESTIONS_PER_MISSION = 8;
  var wrongCount = {};
  var sosBuffer = ''; // accumulates confirmed sequences for SOS easter egg detection
  var isCampaign = false;

  function start(m, campaign) {
    isCampaign = !!campaign;
    mission = m;
    var wave = MORSE_WAVES[m.wave];
    var prev = lettersUnlockedThrough(m.wave - 1);
    var pool = [];
    for (var i = 0; i < QUESTIONS_PER_MISSION; i++) {
      pool.push(Math.random() < 0.6 ? wave[Math.floor(Math.random() * wave.length)]
                                    : (prev.length ? prev[Math.floor(Math.random() * prev.length)] : wave[0]));
    }
    letters = pool;
    currentIdx = 0; correct = 0; total = 0; streak = 0; signal = 100; hadErrors = false;
    missionStart = Date.now();
    wrongCount = {};
    Router.go('encode');
  }

  function render() {
    if (!mission) return;
    var target = letters[currentIdx];
    var el = document.getElementById('screen-encode');
    el.innerHTML = [
      '<div class="panel">',
      '  <div class="panel-label">' + mission.name[LANG] + '</div>',
      '  <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--dim);">',
      '    <span>' + t('decodeStreak') + ': <b style="color:var(--green)">' + streak + '</b></span>',
      '    <span>' + (currentIdx+1) + '/' + QUESTIONS_PER_MISSION + '</span>',
      '  </div>',
      '  <div style="margin-top:8px;"><div class="signal-meter"><div id="sig-fill" style="width:' + signal + '%;height:100%;background:var(--green);transition:width 0.3s;"></div></div></div>',
      '</div>',
      '<div class="panel" style="text-align:center;">',
      '  <div class="panel-label">' + t('encodeInstruction') + '</div>',
      '  <div style="font-size:4rem;font-family:Oswald,sans-serif;color:var(--green);">' + target + '</div>',
      '  <div style="color:var(--dim);font-size:0.75rem;margin-top:4px;">' + t('encodeHint') + '</div>',
      '</div>',
      '<div class="panel">',
      '  <div class="panel-label">INPUT DISPLAY</div>',
      '  <div class="morse-display" id="input-display" style="min-height:2rem;text-align:center;">·</div>',
      '</div>',
      '<div class="tap-zones" id="tap-zones">',
      '  <div class="tap-zone" id="zone-dot">' + t('encodeDot') + '</div>',
      '  <div class="tap-zone" id="zone-dash">' + t('encodeDash') + '</div>',
      '</div>',
      '<div style="display:flex;gap:8px;margin-top:8px;">',
      '  <button class="btn" style="flex:1;" onclick="MorseReference.show()">≡ REF</button>',
      '</div>'
    ].join('');

    currentSequence = '';
    document.getElementById('input-display').textContent = '';

    Input.enable();
    Input.onDot(function()  {
      currentSequence += '.';
      updateDisplay();
    });
    Input.onDash(function() {
      currentSequence += '-';
      updateDisplay();
    });
    Input.onConfirm(function(seq) {
      sosBuffer += seq;
      if (sosBuffer.length > 20) sosBuffer = sosBuffer.slice(-20);
      AchievementsEngine.checkSOS(sosBuffer);
      currentSequence = '';
      checkAnswer(seq);
    });
    Input.bindTapZones(
      document.getElementById('zone-dot'),
      document.getElementById('zone-dash')
    );
  }

  function updateDisplay() {
    var disp = document.getElementById('input-display');
    if (disp) {
      disp.textContent = currentSequence.split('').map(function(c) {
        return c === '.' ? '·' : '—';
      }).join(' ');
    }
  }

  function checkAnswer(seq) {
    var target = letters[currentIdx];
    var expected = MORSE[target];
    total++;
    var isCorrect = seq === expected;
    if (isCorrect) {
      correct++;
      streak++;
      signal = Math.min(100, signal + 5);
      Audio.playCorrect();
      AchievementsEngine.onCorrectAnswer({ streak: streak });
      AchievementsEngine.onLetterCorrectAfterFails(target);
    } else {
      hadErrors = true;
      streak = 0;
      signal = Math.max(0, signal - 15);
      Audio.playWrong();
      wrongCount[target] = (wrongCount[target] || 0) + 1;
      AchievementsEngine.onWrongAnswer({ letter: target });
    }

    Input.disable();
    // Show feedback briefly
    var disp = document.getElementById('input-display');
    if (disp) {
      disp.textContent = isCorrect ? '✓ ' + morseToDisplay(expected) : '✗ ' + morseToDisplay(expected);
      disp.style.color = isCorrect ? 'var(--green)' : 'var(--red)';
    }

    setTimeout(function() {
      currentIdx++;
      if (currentIdx >= QUESTIONS_PER_MISSION) endMission();
      else render();
    }, 1200);
  }

  function endMission() {
    var durationMs = Date.now() - missionStart;
    var accuracy = total ? correct / total : 1;
    var fast = durationMs < QUESTIONS_PER_MISSION * 5000;
    var stars = Progression.starsForAccuracy(accuracy, fast);
    Progression.completeMission(durationMs);
    var triggeredWaveUnlock = false;
    if (accuracy >= 0.8 && mission.wave === Progression.getWave()) {
      Progression.unlockWave(mission.wave + 1);
      triggeredWaveUnlock = true;
    }
    AchievementsEngine.onMissionComplete({
      accuracy: accuracy, fast: fast, wave: mission.wave, durationMs: durationMs,
      mode: 'encode', hadErrors: hadErrors, triggeredWaveUnlock: triggeredWaveUnlock
    });

    if (isCampaign) Progression.advanceCampaign();

    var el = document.getElementById('screen-encode');
    var starStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    var nextBtn = isCampaign
      ? (Progression.isCampaignDone()
          ? '<button class="btn" onclick="Router.go(\'campaign-end\')">' + t('campaignComplete') + ' →</button>'
          : '<button class="btn" onclick="MissionScreen.startCampaign()">NEXT MISSION →</button>')
      : '<button class="btn" onclick="Router.go(\'mission\')">' + t('menuFreePlay') + '</button>';

    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;">',
      '<div style="font-size:3rem;letter-spacing:8px;">' + starStr + '</div>',
      '<div style="font-family:Oswald,sans-serif;letter-spacing:2px;">' + (stars===3?t('stars3'):stars===2?t('stars2'):t('stars1')) + '</div>',
      '<div style="color:var(--dim);">' + t('decodeAccuracy') + ': ' + Math.round(accuracy*100) + '%</div>',
      nextBtn,
      '<button class="btn" onclick="Router.go(\'menu\')">' + t('back') + '</button>',
      '</div>'
    ].join('');
  }

  return { start, render };
})();
```

- [ ] Test in browser: start an encode mission, tap dots/dashes, confirm auto-submits after pause.
- [ ] Commit: `git add agentenfunk/src/screens/EncodeScreen.js && git commit -m "feat(agentenfunk): encode mode gameplay"`

---

## Phase 4: Achievements

### Task 12: Achievement definitions

**Files:**
- Create: `agentenfunk/src/data/achievements.js`

- [ ] Create `src/data/achievements.js`. Each entry has id, EN/DE names + citations, and badge SVG string.

```js
var ACHIEVEMENT_DEFS = [
  {
    id: 'first_contact',
    name: { en: 'First Contact', de: 'Erstkontakt' },
    citation: {
      en: 'Completed your first mission. The first transmission is always the hardest.',
      de: 'Erste Mission abgeschlossen. Die erste Übertragung ist immer die schwerste.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#2a1a00" stroke="#b8860b" stroke-width="3"/><line x1="40" y1="16" x2="40" y2="30" stroke="#ffaa00" stroke-width="2"/><line x1="32" y1="30" x2="48" y2="30" stroke="#ffaa00" stroke-width="2"/><line x1="40" y1="30" x2="40" y2="48" stroke="#ffaa00" stroke-width="2"/><ellipse cx="30" cy="54" rx="8" ry="4" fill="none" stroke="#ffaa00" stroke-width="1.5"/><ellipse cx="50" cy="54" rx="8" ry="4" fill="none" stroke="#ffaa00" stroke-width="1.5"/></svg>'
  },
  {
    id: 'ghost_signal',
    name: { en: 'Ghost Signal', de: 'Geistfrequenz' },
    citation: {
      en: 'Completed a mission with 100% accuracy. Silent, perfect, invisible.',
      de: 'Mission mit 100% Trefferquote abgeschlossen. Lautlos, perfekt, unsichtbar.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#0d0d0d" stroke="#888" stroke-width="3"/><path d="M25 55 Q25 35 40 30 Q55 35 55 55 L50 50 L45 55 L40 50 L35 55 L30 50 Z" fill="#555"/><circle cx="34" cy="42" r="3" fill="#ccc"/><circle cx="46" cy="42" r="3" fill="#ccc"/></svg>'
  },
  {
    id: 'iron_operator',
    name: { en: 'Iron Operator', de: 'Eiserner Funker' },
    citation: {
      en: '5 missions in a row with zero errors. Iron discipline.',
      de: '5 Missionen in Folge ohne Fehler. Eiserne Disziplin.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><polygon points="40,8 52,22 68,22 56,34 62,50 40,42 18,50 24,34 12,22 28,22" fill="#2a2a2a" stroke="#888" stroke-width="2"/><line x1="32" y1="36" x2="36" y2="40" stroke="#cc2200" stroke-width="2.5"/><line x1="36" y1="40" x2="48" y2="28" stroke="#cc2200" stroke-width="2.5"/></svg>'
  },
  {
    id: 'speed_of_light',
    name: { en: 'Speed of Light', de: 'Lichtgeschwindigkeit' },
    citation: {
      en: 'Decoded a letter in under 1 second. Reflex of a veteran operator.',
      de: 'Buchstaben in unter 1 Sekunde entschlüsselt. Reflexe eines Veteranen.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#001a33" stroke="#4488ff" stroke-width="3"/><polygon points="44,16 32,42 42,42 36,64 52,36 40,36" fill="#ffee00"/></svg>'
  },
  {
    id: 'blitz',
    name: { en: 'Blitz Transmission', de: 'Blitzübertragung' },
    citation: {
      en: 'Completed a full encode mission in under 30 seconds.',
      de: 'Gesamte Encodierungsmission in unter 30 Sekunden abgeschlossen.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><path d="M10 10 L70 10 L70 70 L10 70 Z" fill="#1a2200" stroke="#6a8800" stroke-width="3"/><circle cx="40" cy="38" r="14" fill="none" stroke="#ffaa00" stroke-width="2"/><line x1="40" y1="24" x2="40" y2="28" stroke="#ffaa00" stroke-width="2"/><line x1="40" y1="48" x2="40" y2="52" stroke="#ffaa00" stroke-width="2"/><line x1="26" y1="38" x2="30" y2="38" stroke="#ffaa00" stroke-width="2"/><line x1="50" y1="38" x2="54" y2="38" stroke="#ffaa00" stroke-width="2"/><line x1="40" y1="38" x2="48" y2="32" stroke="#ff6600" stroke-width="2"/></svg>'
  },
  {
    id: 'stone_cold',
    name: { en: 'Stone Cold', de: 'Eiskalt' },
    citation: {
      en: 'Unlocked a full letter wave without a single mistake.',
      de: 'Einen ganzen Buchstabenblock ohne Fehler freigeschaltet.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><polygon points="40,8 44,28 64,28 48,42 54,62 40,50 26,62 32,42 16,28 36,28" fill="#003344" stroke="#88ccff" stroke-width="2"/><circle cx="40" cy="38" r="6" fill="#aaddff"/></svg>'
  },
  {
    id: 'untouchable',
    name: { en: 'Untouchable', de: 'Unantastbar' },
    citation: {
      en: '20 correct answers in a row. Nothing gets past you.',
      de: '20 richtige Antworten in Folge. Nichts entgeht dir.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#1a0033" stroke="#9900ff" stroke-width="3"/><text x="40" y="48" text-anchor="middle" font-size="22" fill="#dd88ff" font-family="Oswald,sans-serif">20</text></svg>'
  },
  {
    id: 'full_spectrum',
    name: { en: 'Full Spectrum', de: 'Volles Spektrum' },
    citation: {
      en: 'Unlocked all 26 letters of the morse alphabet.',
      de: 'Alle 26 Buchstaben des Morsealphabets freigeschaltet.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><polygon points="40,4 50,18 66,14 62,30 76,40 62,50 66,66 50,62 40,76 30,62 14,66 18,50 4,40 18,30 14,14 30,18" fill="#1a1a00" stroke="#ffdd00" stroke-width="2"/><circle cx="40" cy="40" r="10" fill="#ffdd00"/></svg>'
  },
  {
    id: 'numbers_game',
    name: { en: 'Numbers Game', de: 'Zahlenspiel' },
    citation: {
      en: 'Unlocked all digits 0–9.',
      de: 'Alle Ziffern 0–9 freigeschaltet.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><rect x="10" y="10" width="60" height="60" rx="4" fill="#111" stroke="#aaa" stroke-width="2"/><text x="22" y="46" font-size="18" fill="#888" font-family="Share Tech Mono,monospace">0</text><text x="42" y="46" font-size="18" fill="#aaa" font-family="Share Tech Mono,monospace">1</text></svg>'
  },
  {
    id: 'veteran',
    name: { en: 'Veteran Operator', de: 'Veteran-Funker' },
    citation: {
      en: '50 missions completed. You are the backbone of the network.',
      de: '50 Missionen abgeschlossen. Du bist das Rückgrat des Netzwerks.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#001133" stroke="#003388" stroke-width="4"/><path d="M28 50 L40 20 L52 50 L40 44 Z" fill="#225599"/><path d="M20 52 L40 58 L60 52" fill="none" stroke="#446699" stroke-width="2"/></svg>'
  },
  {
    id: 'centurion',
    name: { en: 'Centurion', de: 'Zenturio' },
    citation: {
      en: '100 missions completed. A legend of the signals corps.',
      de: '100 Missionen abgeschlossen. Eine Legende des Funkerkorps.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#1a0000" stroke="#cc0000" stroke-width="4"/><text x="40" y="48" text-anchor="middle" font-size="20" fill="#ff4444" font-family="Oswald,sans-serif">C</text></svg>'
  },
  {
    id: 'sos',
    name: { en: 'Mayday', de: 'Mayday' },
    citation: {
      en: 'You tapped SOS. Someone out there heard you.',
      de: 'Du hast SOS getippt. Irgendwo da draußen hat es jemand gehört.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#1a0000" stroke="#ff2222" stroke-width="3"/><circle cx="40" cy="40" r="22" fill="none" stroke="#ff2222" stroke-width="2"/><text x="40" y="45" text-anchor="middle" font-size="12" fill="#ff4444" font-family="Share Tech Mono,monospace">SOS</text></svg>'
  },
  {
    id: 'insomniac',
    name: { en: 'Night Watch', de: 'Nachtwache' },
    citation: {
      en: 'Played after midnight. The night belongs to the operator.',
      de: 'Nach Mitternacht gespielt. Die Nacht gehört dem Funker.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#000818" stroke="#334466" stroke-width="2"/><path d="M46 24 A18 18 0 1 0 46 56 A12 12 0 1 1 46 24Z" fill="#778899"/></svg>'
  },
  {
    id: 'stubborn',
    name: { en: 'Never Say Die', de: 'Niemals aufgeben' },
    citation: {
      en: 'Failed the same letter 5 times, then got it right. Persistence is its own medal.',
      de: 'Denselben Buchstaben 5 Mal falsch, dann richtig. Beharrlichkeit ist ihre eigene Auszeichnung.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#1a0e00" stroke="#8B4513" stroke-width="3"/><line x1="30" y1="20" x2="52" y2="62" stroke="#cc8844" stroke-width="4" stroke-dasharray="4,2"/><line x1="32" y1="22" x2="50" y2="60" stroke="#ffcc88" stroke-width="1"/></svg>'
  },
  {
    id: 'the_hard_way',
    name: { en: 'No Crutches', de: 'Ohne Krücken' },
    citation: {
      en: 'Completed a mission with the morse reference hidden. Pure memory.',
      de: 'Mission ohne Morsecode-Tabelle abgeschlossen. Reines Gedächtnis.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#0a1a0a" stroke="#226622" stroke-width="2"/><ellipse cx="40" cy="36" rx="12" ry="8" fill="#224422"/><line x1="28" y1="32" x2="52" y2="40" stroke="#226622" stroke-width="2"/><line x1="28" y1="40" x2="52" y2="32" stroke="#226622" stroke-width="2"/></svg>'
  },
  {
    id: 'cryptophile',
    name: { en: 'Deep Cover', de: 'Im Verborgenen' },
    citation: {
      en: '30 minutes of total playtime. You live in the static.',
      de: '30 Minuten Gesamtspielzeit. Du lebst im Rauschen.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#1a001a" stroke="#660066" stroke-width="2"/><line x1="40" y1="16" x2="40" y2="64" stroke="#884488" stroke-width="2"/><ellipse cx="40" cy="40" rx="16" ry="24" fill="none" stroke="#884488" stroke-width="1.5"/><circle cx="40" cy="28" r="4" fill="#aa44aa"/><circle cx="40" cy="52" r="4" fill="#aa44aa"/></svg>'
  },
  {
    id: 'campaign_complete',
    name: { en: 'Operation Concluded', de: 'Operation Abgeschlossen' },
    citation: {
      en: 'You completed the full campaign. Every wave, every mission. The network is secure.',
      de: 'Du hast die gesamte Kampagne abgeschlossen. Jede Welle, jede Mission. Das Netzwerk ist sicher.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><polygon points="40,4 50,18 66,14 62,30 76,40 62,50 66,66 50,62 40,76 30,62 14,66 18,50 4,40 18,30 14,14 30,18" fill="#0a1400" stroke="#00ff88" stroke-width="3"/><text x="40" y="36" text-anchor="middle" font-size="9" fill="#00ff88" font-family="Oswald,sans-serif" letter-spacing="1">OPERATION</text><text x="40" y="50" text-anchor="middle" font-size="9" fill="#00ff88" font-family="Oswald,sans-serif" letter-spacing="1">CONCLUDED</text></svg>'
  },
  {
    id: 'perfect_run',
    name: { en: 'Flawless Intercept', de: 'Makellos' },
    citation: {
      en: '3 missions back-to-back at 100% accuracy. Flawless.',
      de: '3 Missionen hintereinander mit 100% Genauigkeit. Makellos.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><polygon points="40,4 50,18 66,14 62,30 76,40 62,50 66,66 50,62 40,76 30,62 14,66 18,50 4,40 18,30 14,14 30,18" fill="#1a1400" stroke="#ffd700" stroke-width="3"/><polygon points="40,18 46,30 60,30 48,40 52,54 40,46 28,54 32,40 20,30 34,30" fill="#ffd700" opacity="0.5"/><circle cx="40" cy="40" r="6" fill="#fff"/></svg>'
  }
];

function getAchievementDef(id) {
  return ACHIEVEMENT_DEFS.filter(function(a) { return a.id === id; })[0] || null;
}
```

- [ ] Commit: `git add agentenfunk/src/data/achievements.js && git commit -m "feat(agentenfunk): achievement definitions with inline SVG badges"`

---

### Task 13: Achievements engine

**Files:**
- Create: `agentenfunk/src/game/achievements-engine.js`
- Create: `agentenfunk/tests/achievements.test.js`

- [ ] Write failing test:

```js
// tests/achievements.test.js
var assert = require('./assert');
var fs = require('fs');
global.localStorage = { _d:{}, getItem:function(k){return this._d[k]||null;}, setItem:function(k,v){this._d[k]=String(v);} };
// Stub overlay
global.document = { getElementById: function() { return { classList:{add:function(){}}, innerHTML:'' }; } };
eval(fs.readFileSync(__dirname+'/../src/data/morse.js','utf8'));
eval(fs.readFileSync(__dirname+'/../src/data/achievements.js','utf8'));
eval(fs.readFileSync(__dirname+'/../src/game/progression.js','utf8'));
eval(fs.readFileSync(__dirname+'/../src/game/achievements-engine.js','utf8'));

AchievementsEngine.reset();
assert(!AchievementsEngine.isUnlocked('first_contact'), 'first_contact locked initially');
AchievementsEngine.onMissionComplete({ accuracy: 1.0, fast: true, wave: 1, mode: 'decode', hadErrors: false, triggeredWaveUnlock: false });
assert(AchievementsEngine.isUnlocked('first_contact'), 'first_contact unlocked after first mission');
assert(AchievementsEngine.isUnlocked('ghost_signal'), 'ghost_signal unlocked at 100% accuracy');

// stone_cold: wave unlock with no errors
AchievementsEngine.reset();
AchievementsEngine.onMissionComplete({ accuracy: 0.9, fast: false, wave: 2, mode: 'decode', hadErrors: false, triggeredWaveUnlock: true });
assert(AchievementsEngine.isUnlocked('stone_cold'), 'stone_cold unlocked when wave unlocked with no errors');

// blitz: encode mission under 30s
AchievementsEngine.reset();
AchievementsEngine.onMissionComplete({ accuracy: 1.0, fast: true, wave: 1, mode: 'encode', hadErrors: false, triggeredWaveUnlock: false, durationMs: 20000 });
assert(AchievementsEngine.isUnlocked('blitz'), 'blitz unlocked for encode under 30s');

AchievementsEngine.reset();
for (var i = 0; i < 20; i++) AchievementsEngine.onCorrectAnswer({ streak: i+1 });
assert(AchievementsEngine.isUnlocked('untouchable'), 'untouchable at streak 20');

// stubborn: wrong 5x then correct
AchievementsEngine.reset();
for (var j = 0; j < 5; j++) AchievementsEngine.onWrongAnswer({ letter: 'R' });
AchievementsEngine.onLetterCorrectAfterFails('R');
assert(AchievementsEngine.isUnlocked('stubborn'), 'stubborn after 5 fails then correct');

console.log('\nAll achievements tests passed.');
```

- [ ] Run, confirm fail: `node tests/achievements.test.js`

- [ ] Create `src/game/achievements-engine.js`:

```js
var AchievementsEngine = (function() {
  var SAVE_KEY = 'agentenfunk_achievements';
  var state = load();
  var consecutivePerfect = 0;
  var consecutiveZeroError = 0;

  function load() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return { unlocked: {}, dates: {} };
  }

  function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }

  function reset() {
    state = { unlocked: {}, dates: {} };
    consecutivePerfect = 0;
    consecutiveZeroError = 0;
    wrongCounts = {};
    nightWatchDays = [];
    save();
  }

  function isUnlocked(id) { return !!state.unlocked[id]; }

  function unlock(id) {
    if (state.unlocked[id]) return;
    state.unlocked[id] = true;
    state.dates[id] = Date.now();
    save();
    var def = getAchievementDef(id);
    if (!def) return;
    // Silent achievements don't animate
    var silent = (id === 'night_shift');
    if (!silent) showOverlay(def);
  }

  function showOverlay(def) {
    var overlay = document.getElementById('achievement-overlay');
    var badgeEl = document.getElementById('achievement-badge-render');
    var citEl   = document.getElementById('achievement-citation');
    var dismissBtn = overlay && overlay.querySelector('button');
    if (!overlay) return;
    badgeEl.innerHTML = def.badge;
    citEl.innerHTML = '<b style="font-family:Oswald,sans-serif;font-size:1.1rem;letter-spacing:2px;">' +
      def.name[LANG] + '</b><br/><span style="color:var(--dim);font-size:0.9rem;">' +
      def.citation[LANG] + '</span>';
    if (dismissBtn) dismissBtn.textContent = t('achieveDismiss');
    overlay.classList.add('show');
    if (typeof Audio !== 'undefined') Audio.playMedalThud();
    // Spin animation on badge SVG
    var svg = badgeEl.querySelector('svg');
    if (svg) {
      svg.style.transition = 'transform 0.6s ease-out';
      svg.style.transform = 'rotate(360deg)';
    }
  }

  function dismissOverlay() {
    var overlay = document.getElementById('achievement-overlay');
    if (overlay) overlay.classList.remove('show');
  }

  // Persist nightWatchDays across sessions
  var nightWatchDays = (function() {
    try { return JSON.parse(localStorage.getItem('agentenfunk_nwd') || '[]'); } catch(e) { return []; }
  })();
  function saveNwd() { localStorage.setItem('agentenfunk_nwd', JSON.stringify(nightWatchDays)); }

  // Per-letter wrong counts (in-memory; resets on reload — sufficient for stubborn)
  var wrongCounts = {};

  // Per-letter present time (set when a question is shown, used for speed_of_light)
  var letterPresentTime = null;

  function setLetterPresentTime() { letterPresentTime = Date.now(); }

  function onMissionComplete(data) {
    // data: { accuracy, fast, noRef, wave, durationMs, mode, hadErrors }
    var missionsDone = Progression.getMissionsDone();
    if (missionsDone === 1) unlock('first_contact');
    if (missionsDone >= 50)  unlock('veteran');
    if (missionsDone >= 100) unlock('centurion');

    // ghost_signal / perfect_run: accuracy === 1.0
    if (data.accuracy >= 1.0) {
      unlock('ghost_signal');
      consecutivePerfect++;
    } else {
      consecutivePerfect = 0;
    }
    if (consecutivePerfect >= 3) unlock('perfect_run');

    // iron_operator: zero errors (hadErrors=false), 5 in a row
    if (!data.hadErrors) {
      consecutiveZeroError++;
    } else {
      consecutiveZeroError = 0;
    }
    if (consecutiveZeroError >= 5) unlock('iron_operator');

    // stone_cold: complete a full wave unlock with no errors
    if (!data.hadErrors && data.triggeredWaveUnlock) unlock('stone_cold');

    // campaign_complete: fired explicitly from CampaignEndScreen.showStamp()
    // via isFinaleMission sentinel to avoid double-trigger
    if (data.isFinaleMission) unlock('campaign_complete');

    // the_hard_way: only award if player deliberately hid ref after opening it,
    // OR if player has been playing ≥ wave 2 (knows reference exists) and didn't open it
    if (data.noRef && data.wave >= 2) unlock('the_hard_way');

    if (data.wave >= 5) unlock('full_spectrum');
    if (data.wave >= 6) unlock('numbers_game');

    // blitz: encode mission under 30s
    if (data.mode === 'encode' && data.durationMs && data.durationMs < 30000) unlock('blitz');

    var totalMs = Progression.getTotalPlayMs();
    if (totalMs >= 30 * 60 * 1000) unlock('cryptophile');

    // Night watch
    var hour = new Date().getHours();
    if (hour >= 0 && hour < 4) {
      unlock('insomniac');
      var today = new Date().toDateString();
      if (nightWatchDays.indexOf(today) === -1) { nightWatchDays.push(today); saveNwd(); }
      if (nightWatchDays.length >= 3) unlock('night_shift');
    }
  }

  function onCorrectAnswer(data) {
    // data: { streak }
    if (data.streak >= 20) unlock('untouchable');
    // speed_of_light: time since letter was presented (set by setLetterPresentTime())
    if (letterPresentTime && (Date.now() - letterPresentTime) < 1000) unlock('speed_of_light');
    letterPresentTime = null;
  }

  function onWrongAnswer(data) {
    // data: { letter }
    if (data.letter) wrongCounts[data.letter] = (wrongCounts[data.letter] || 0) + 1;
    letterPresentTime = null;
  }

  function onLetterCorrectAfterFails(letter) {
    if ((wrongCounts[letter] || 0) >= 5) unlock('stubborn');
  }

  function checkSOS(sequence) {
    // SOS = ... --- ...  raw: ...---...
    if (sequence.indexOf('...---...') !== -1) unlock('sos');
  }

  function getAll() {
    return ACHIEVEMENT_DEFS.map(function(def) {
      return {
        def: def,
        unlocked: isUnlocked(def.id),
        date: state.dates[def.id] || null
      };
    });
  }

  return { reset, isUnlocked, unlock, dismissOverlay, onMissionComplete, onCorrectAnswer, onWrongAnswer, onLetterCorrectAfterFails, checkSOS, getAll };
})();
```

- [ ] Run test, confirm pass: `node tests/achievements.test.js`
- [ ] Commit: `git add agentenfunk/src/game/achievements-engine.js agentenfunk/tests/achievements.test.js && git commit -m "feat(agentenfunk): achievements engine with unlock conditions"`

---

### Task 14: Commendations screen + badges

**Files:**
- Create: `agentenfunk/src/ui/badges.js`
- Create: `agentenfunk/src/screens/CommendationsScreen.js`

- [ ] Create `src/ui/badges.js`:

```js
var Badges = (function() {
  function render(def, unlocked, dateTs) {
    var lockedOverlay = !unlocked ? [
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;',
      'background:rgba(0,0,0,0.7);border-radius:4px;">',
      '<span style="color:#ff2222;font-family:Oswald,sans-serif;font-size:0.6rem;letter-spacing:2px;',
      'border:1px solid #ff2222;padding:2px 6px;transform:rotate(-15deg);display:block;">',
      t('commendLocked') + '</span></div>'
    ].join('') : '';

    var dateStr = (unlocked && dateTs) ?
      '<div style="color:var(--dim);font-size:0.6rem;margin-top:2px;">' +
      new Intl.DateTimeFormat(LANG, {day:'2-digit',month:'2-digit',year:'2-digit'}).format(new Date(dateTs)) +
      '</div>' : '';

    return [
      '<div style="position:relative;display:flex;flex-direction:column;align-items:center;',
      'padding:10px 6px;border:1px solid ' + (unlocked ? 'var(--border)' : '#1a2a1a') + ';',
      'border-radius:6px;background:var(--panel-bg);cursor:' + (unlocked ? 'pointer' : 'default') + ';',
      'opacity:' + (unlocked ? '1' : '0.5') + ';"',
      unlocked ? ' title="' + def.citation[LANG] + '"' : '',
      '>',
      '<div style="' + (unlocked ? '' : 'filter:grayscale(1) opacity(0.4);') + '">' + def.badge + '</div>',
      '<div style="font-size:0.65rem;text-align:center;margin-top:6px;color:' + (unlocked ? 'var(--green)' : '#334433') + ';',
      'font-family:Oswald,sans-serif;letter-spacing:1px;">' + def.name[LANG] + '</div>',
      dateStr,
      lockedOverlay,
      '</div>'
    ].join('');
  }

  return { render };
})();
```

- [ ] Create `src/screens/CommendationsScreen.js`:

```js
var CommendationsScreen = (function() {
  function render() {
    var all = AchievementsEngine.getAll();
    var unlockedCount = all.filter(function(a) { return a.unlocked; }).length;
    var el = document.getElementById('screen-commend');

    var grid = all.map(function(a) {
      return Badges.render(a.def, a.unlocked, a.date);
    }).join('');

    el.innerHTML = [
      '<div class="panel">',
      '  <div style="font-family:Oswald,sans-serif;font-size:1.3rem;letter-spacing:3px;">' + t('commendTitle') + ' // ' + t('commendSubtitle') + '</div>',
      '  <div style="color:var(--dim);font-size:0.8rem;margin-top:4px;">' +
         unlockedCount + ' / ' + all.length + ' ' + t('commendCount') + '</div>',
      '</div>',
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px;padding-bottom:80px;">',
      grid,
      '</div>',
      '<button class="btn" style="position:sticky;bottom:8px;" onclick="Router.go(\'menu\')">' + t('back') + '</button>'
    ].join('');
  }
  return { render };
})();
```

- [ ] Test in browser: open commendations, all badges shown, locked ones dimmed with CLASSIFIED stamp.
- [ ] Commit: `git add agentenfunk/src/ui/badges.js agentenfunk/src/screens/CommendationsScreen.js && git commit -m "feat(agentenfunk): commendations screen with SVG badge rendering"`

---

## Phase 5: Support Screens + Morse Reference

### Task 15: Settings screen

**Files:**
- Create: `agentenfunk/src/screens/SettingsScreen.js`

- [ ] Create `src/screens/SettingsScreen.js`:

```js
var SettingsScreen = (function() {
  function render() {
    var el = document.getElementById('screen-settings');
    var pause = Input.getPause();
    var muted = Audio.isMuted();
    var ambient = Audio.isAmbientOn();

    el.innerHTML = [
      '<div class="panel"><div style="font-family:Oswald,sans-serif;font-size:1.2rem;letter-spacing:2px;">' + t('settingsTitle') + '</div></div>',

      '<div class="panel">',
      '  <div class="panel-label">' + t('settingsLang') + '</div>',
      '  <div style="display:flex;gap:8px;">',
      '    <button class="btn' + (LANG==='en'?' active':'') + '" style="flex:1;" onclick="setLang(\'en\');SettingsScreen.render()">🇬🇧 English</button>',
      '    <button class="btn' + (LANG==='de'?' active':'') + '" style="flex:1;" onclick="setLang(\'de\');SettingsScreen.render()">🇩🇪 Deutsch</button>',
      '  </div>',
      '</div>',

      '<div class="panel">',
      '  <div class="panel-label">' + t('settingsPause') + '</div>',
      '  <button class="btn' + (pause===600?' active':'') + '" onclick="Input.setPause(600);SettingsScreen.render()">' + t('settingsPause600') + '</button>',
      '  <button class="btn' + (pause===900?' active':'') + '" onclick="Input.setPause(900);SettingsScreen.render()">' + t('settingsPause900') + '</button>',
      '  <button class="btn' + (pause===1200?' active':'') + '" onclick="Input.setPause(1200);SettingsScreen.render()">' + t('settingsPause1200') + '</button>',
      '</div>',

      '<div class="panel">',
      '  <button class="btn" onclick="SettingsScreen.toggleMute()">' + (muted ? t('unmute') : t('mute')) + ' ' + t('settingsMute') + '</button>',
      '  <button class="btn" onclick="SettingsScreen.toggleAmbient()">' + (ambient ? '■' : '▶') + ' ' + t('settingsAmbient') + '</button>',
      '</div>',

      '<div class="panel" style="border-color:#331111;">',
      '  <div class="panel-label" style="color:#ff4444;">' + t('settingsDangerZone') + '</div>',
      '  <button class="btn" style="border-color:#ff3333;color:#ff3333;" onclick="SettingsScreen.confirmReset()">' + t('settingsReset') + '</button>',
      '</div>',

      '<button class="btn" onclick="Router.go(\'menu\')">' + t('settingsClose') + '</button>'
    ].join('');
  }

  function toggleMute()    { Audio.toggleMute();    render(); }
  function toggleAmbient() { Audio.toggleAmbient(); render(); }

  function confirmReset() {
    if (confirm(t('settingsResetConfirm'))) {
      resetAllProgress();
    }
  }

  function resetAllProgress() {
    // Clear all game data from localStorage
    var keys = [
      'agentenfunk_progress', 'agentenfunk_achievements', 'agentenfunk_nwd'
    ];
    keys.forEach(function(k) { localStorage.removeItem(k); });
    // Re-initialise in-memory state
    Progression.reset();
    AchievementsEngine.reset();
    // Return to menu
    Router.go('menu');
  }

  return { render, toggleMute, toggleAmbient, confirmReset };
})();
```

- [ ] Commit: `git add agentenfunk/src/screens/SettingsScreen.js && git commit -m "feat(agentenfunk): settings screen — language, pause timing, audio"`

---

### Task 16: Morse reference overlay

**Files:**
- Create: `agentenfunk/src/ui/morse-reference.js`

- [ ] Create `src/ui/morse-reference.js`:

```js
var MorseReference = (function() {
  var mode = 'grid';

  function show() {
    var overlay = document.getElementById('morse-ref-overlay');
    if (overlay) overlay.classList.add('show');
    document.getElementById('ref-title').textContent = t('refTitle');
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
    document.getElementById('ref-btn-grid').textContent = t('refAlphabet');
    document.getElementById('ref-btn-tree').textContent = t('refTree');
    if (mode === 'grid') renderGrid(content);
    else                 renderTree(content);
  }

  function renderGrid(content) {
    var unlocked = typeof Progression !== 'undefined' ? Progression.getUnlockedLetters() : Object.keys(MORSE);
    var all = Object.keys(MORSE);
    content.innerHTML = '<div class="morse-grid">' +
      all.map(function(letter) {
        var isLocked = unlocked.indexOf(letter) === -1;
        return '<div class="morse-cell' + (isLocked?' locked':'') + '">' +
          '<div class="letter">' + letter + '</div>' +
          '<div class="code">' + (isLocked ? '?' : morseToDisplay(MORSE[letter])) + '</div>' +
          '</div>';
      }).join('') + '</div>';
  }

  function renderTree(content) {
    // Full morse tree (all 26 letters), depth-first left=dot right=dash order
    var tree = [
      { code:'.',    label:'E' }, { code:'-',    label:'T' },
      { code:'..',   label:'I' }, { code:'.-',   label:'A' }, { code:'-.',   label:'N' }, { code:'--',   label:'M' },
      { code:'...',  label:'S' }, { code:'..-',  label:'U' }, { code:'.-.',  label:'R' }, { code:'.--',  label:'W' },
      { code:'-..',  label:'D' }, { code:'-.-',  label:'K' }, { code:'--.',  label:'G' }, { code:'---',  label:'O' },
      { code:'....',  label:'H' }, { code:'...-',  label:'V' }, { code:'..-.',  label:'F' },
      { code:'.-..',  label:'L' }, { code:'.--.',  label:'P' }, { code:'.---',  label:'J' },
      { code:'-...',  label:'B' }, { code:'-.-.',  label:'C' }, { code:'-..-',  label:'X' }, { code:'-.--',  label:'Y' },
      { code:'--..',  label:'Z' }, { code:'--.-',  label:'Q' }
    ];
    var unlocked = typeof Progression !== 'undefined' ? Progression.getUnlockedLetters() : Object.keys(MORSE);
    var rows = tree.map(function(node) {
      if (!node.label) return '';
      var indent = node.code.length * 20;
      var sym = node.code.slice(-1) === '.' ? '·' : '—';
      var locked = unlocked.indexOf(node.label) === -1;
      return '<div style="padding:3px 0;padding-left:' + indent + 'px;color:' + (locked?'#334433':'var(--green)') + ';">' +
        '<span style="color:var(--dim);margin-right:8px;">' + sym + '</span>' +
        '<span style="font-family:Oswald,sans-serif;font-size:1.1rem;">' + (locked ? '?' : node.label) + '</span>' +
        '<span style="color:var(--dim);font-size:0.75rem;margin-left:8px;">' + (locked?'':morseToDisplay(MORSE[node.label])) + '</span>' +
        '</div>';
    }).join('');
    content.innerHTML = '<div style="font-size:0.8rem;">' +
      '<div style="color:var(--dim);margin-bottom:12px;font-size:0.75rem;">← · dot &nbsp;|&nbsp; — dash →</div>' +
      rows + '</div>';
  }

  return { show, hide, showGrid, showTree };
})();
```

- [ ] Test in browser: open reference from menu, switch between Alphabet and Tree views.
- [ ] Commit: `git add agentenfunk/src/ui/morse-reference.js && git commit -m "feat(agentenfunk): morse reference overlay — alphabet grid + tree view"`

---

## Phase 5b: Campaign Finale

### Task 17: Campaign end screen

**Files:**
- Create: `agentenfunk/src/screens/CampaignEndScreen.js`

- [ ] Create `src/screens/CampaignEndScreen.js`:

```js
var CampaignEndScreen = (function() {
  // The final message the player must decode: "STAND DOWN"
  // S=...  T=-  A=.-  N=-.  D=-..  (space between words)  D=-..  O=---  W=.--  N=-.
  var FINAL_WORDS = ['STAND', 'DOWN'];
  var FINAL_PHRASE = 'STAND DOWN';
  var phase = 'decode'; // 'decode' | 'teletype' | 'done'
  var wordIdx = 0;      // which word of FINAL_WORDS we're on
  var userInput = '';

  function render() {
    phase = 'decode';
    wordIdx = 0;
    userInput = '';
    showDecodePhase();
  }

  // ── Phase 1: Player decodes "STAND DOWN" word by word ───────────────────
  function showDecodePhase() {
    var el = document.getElementById('screen-campaign-end');
    var word = FINAL_WORDS[wordIdx];
    var code = word.split('').map(function(l) { return MORSE[l]; }).join(' ');

    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;padding:24px;gap:12px;">',

      '<div class="panel">',
      '  <div class="panel-label" style="color:var(--amber);letter-spacing:3px;">',
      '  ⚠ ' + t('finaleIncoming'),
      '  </div>',
      '  <div style="font-size:0.8rem;color:var(--dim);">' + t('finaleDecodeInstruction') + '</div>',
      '  <div style="color:var(--dim);font-size:0.75rem;margin-top:4px;">' +
          (wordIdx + 1) + ' / ' + FINAL_WORDS.length + '</div>',
      '</div>',

      '<div class="panel" style="text-align:center;">',
      '  <div class="morse-display" id="finale-morse" style="font-size:1.4rem;letter-spacing:4px;">' +
          code.split('').map(function(c){ return c==='.'?'·':c==='-'?'—':' '; }).join('') +
      '  </div>',
      '</div>',

      '<div class="panel">',
      '  <div class="panel-label">' + t('encodeInstruction') + '</div>',
      '  <input id="finale-input" maxlength="10" autocomplete="off" autocapitalize="characters"',
      '    style="background:var(--panel-bg);border:1px solid var(--border);color:var(--green);',
      '    font-family:Share Tech Mono,monospace;font-size:1.8rem;width:100%;padding:10px;',
      '    text-transform:uppercase;letter-spacing:4px;" />',
      '  <button class="btn" style="margin-top:8px;" onclick="CampaignEndScreen.checkWord()">',
      '    CONFIRM →',
      '  </button>',
      '  <div id="finale-feedback" style="margin-top:8px;font-size:0.85rem;min-height:1.2rem;"></div>',
      '</div>',

      '<button class="btn" onclick="CampaignEndScreen.replayMorse()">↺ REPLAY</button>',

      '</div>'
    ].join('');

    // Play morse automatically
    setTimeout(function() { playWord(word); }, 400);

    // Allow Enter key to confirm
    var inp = document.getElementById('finale-input');
    if (inp) {
      inp.focus();
      inp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') CampaignEndScreen.checkWord();
      });
    }
  }

  function playWord(word) {
    var code = word.split('').map(function(l) { return MORSE[l]; }).join(' ');
    // Play each letter with a gap between
    var flat = word.split('').reduce(function(acc, l, i) {
      return acc + MORSE[l] + (i < word.length - 1 ? ' ' : '');
    }, '');
    var disp = document.getElementById('finale-morse');
    if (disp) disp.textContent = '';
    Audio.playMorse(flat, function(sym) {
      if (disp) {
        disp.textContent += (sym === '.' ? '·' : sym === '-' ? '—' : ' ');
        disp.classList.add('pulse');
        setTimeout(function() { disp && disp.classList.remove('pulse'); }, 400);
      }
    });
  }

  function replayMorse() { playWord(FINAL_WORDS[wordIdx]); }

  function checkWord() {
    var inp = document.getElementById('finale-input');
    var fb  = document.getElementById('finale-feedback');
    if (!inp) return;
    var answer = inp.value.trim().toUpperCase();
    var expected = FINAL_WORDS[wordIdx];

    if (answer === expected) {
      Audio.playCorrect();
      wordIdx++;
      inp.value = '';
      if (wordIdx >= FINAL_WORDS.length) {
        // All words decoded — transition to teletype
        setTimeout(showTeletypePhase, 600);
      } else {
        if (fb) { fb.textContent = '✓ ' + expected; fb.style.color = 'var(--green)'; }
        setTimeout(showDecodePhase, 700);
      }
    } else {
      Audio.playWrong();
      if (fb) { fb.textContent = '✗ ' + t('decodeWrong'); fb.style.color = 'var(--red)'; }
      inp.value = '';
      inp.focus();
    }
  }

  // ── Phase 2: Teletype narrative reveal ───────────────────────────────────
  var DEBRIEF = {
    en: [
      'CLASSIFICATION: TOP SECRET // EYES ONLY',
      '─────────────────────────────────────────',
      'DATE: [REDACTED], 1989',
      'TO:   FIELD OPERATOR — CALLSIGN UNKNOWN',
      'FROM: DIRECTOR OF SIGNALS, LANGLEY',
      'RE:   OPERATIONAL DEBRIEF — FINAL REPORT',
      '',
      'Over the course of twelve operations —',
      'PAPERCLIP, MINCEMEAT, GOLD, STOPWATCH,',
      'IVY BELLS, CORONA, RYAN, GLADIO,',
      'VENONA, SWORDFISH, NUMERUS, CIPHER —',
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
      '─────────────────────────────────────────',
      'END TRANSMISSION'
    ],
    de: [
      'KLASSIFIZIERUNG: STRENG GEHEIM // NUR FÜR BEFUGTE',
      '────────────────────────────────────────────────────',
      'DATUM: [GESCHWÄRZT], 1989',
      'AN:    FELDFUNKER — RUFZEICHEN UNBEKANNT',
      'VON:   DIREKTOR DES NACHRICHTENWESENS',
      'BETR.: EINSATZBERICHT — ABSCHLUSSBERICHT',
      '',
      'Im Verlauf von zwölf Operationen —',
      'BÜROKLAMMER, HACKFLEISCH, GOLD, STOPPUHR,',
      'EFEUGLÖCKEN, KRONE, RYAN, GLADIO,',
      'VENONA, SCHWERTFISCH, NUMERUS, CHIFFRE —',
      '',
      'erreichten deine Abfangergebnisse das',
      'alliierte Kommando.',
      'Die von dir entschlüsselten Übertragungen',
      'trugen direkt zu den Ereignissen des',
      '9. November 1989 bei.',
      '',
      'Die Mauer ist gefallen.',
      'Das Netzwerk ist gesichert.',
      'Der Krieg ist vorbei.',
      '',
      'Du wirst hiermit für außerordentliche',
      'Dienste im Funkerkorps ausgezeichnet.',
      '',
      'Rührt euch, Funker.',
      'Geh nach Hause.',
      '────────────────────────────────────────────────────',
      'ENDE DER ÜBERTRAGUNG'
    ]
  };

  function showTeletypePhase() {
    var el = document.getElementById('screen-campaign-end');
    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;padding:24px;overflow-y:auto;">',
      '<div id="teletype-output" style="font-family:Share Tech Mono,monospace;font-size:0.85rem;',
      'color:var(--green);line-height:1.8;white-space:pre-wrap;flex:1;"></div>',
      '<div id="stamp-container" style="display:none;text-align:center;margin:24px 0;">',
      '  <div id="mission-stamp" style="',
      '    display:inline-block;',
      '    border:4px solid #ff3333;',
      '    color:#ff3333;',
      '    font-family:Oswald,sans-serif;',
      '    font-size:1.4rem;',
      '    letter-spacing:6px;',
      '    padding:12px 24px;',
      '    transform:rotate(-8deg);',
      '    opacity:0;',
      '    transition:opacity 0.4s;',
      '  ">MISSION ACCOMPLISHED</div>',
      '</div>',
      '<div id="finale-actions" style="display:none;padding-top:16px;">',
      '  <button class="btn" onclick="Router.go(\'mission\')">' + t('campaignContinue') + '</button>',
      '  <button class="btn" onclick="Router.go(\'commend\')">' + t('menuCommendations') + '</button>',
      '  <button class="btn" onclick="Router.go(\'menu\')">' + t('back') + '</button>',
      '</div>',
      '</div>'
    ].join('');

    var lines = DEBRIEF[LANG] || DEBRIEF['en'];
    typeLines(lines, 0, function() {
      showStamp();
    });
  }

  // Types lines one character at a time with CRT teletype feel
  function typeLines(lines, lineIdx, onDone) {
    if (lineIdx >= lines.length) { onDone(); return; }
    var out = document.getElementById('teletype-output');
    if (!out) return;
    var line = lines[lineIdx];
    var charIdx = 0;
    var delay = line === '' ? 0 : 28; // blank lines print instantly

    if (line === '') {
      out.textContent += '\n';
      setTimeout(function() { typeLines(lines, lineIdx + 1, onDone); }, 120);
      return;
    }

    var interval = setInterval(function() {
      if (!document.getElementById('teletype-output')) { clearInterval(interval); return; }
      out.textContent += line[charIdx];
      charIdx++;
      // Auto-scroll
      out.scrollTop = out.scrollHeight;
      if (charIdx >= line.length) {
        clearInterval(interval);
        out.textContent += '\n';
        // Pause slightly longer at dramatic lines
        var pause = (line.indexOf('Wall has fallen') !== -1 ||
                     line.indexOf('Mauer ist gefallen') !== -1 ||
                     line.indexOf('war is over') !== -1 ||
                     line.indexOf('Krieg ist vorbei') !== -1) ? 1200 : 180;
        setTimeout(function() { typeLines(lines, lineIdx + 1, onDone); }, pause);
      }
    }, delay);
  }

  function showStamp() {
    // Fire campaign_complete achievement before stamp
    AchievementsEngine.onMissionComplete({
      accuracy: 1.0, fast: false, wave: 6, mode: 'decode',
      hadErrors: false, triggeredWaveUnlock: false, isFinaleMission: true
    });

    var stampContainer = document.getElementById('stamp-container');
    var stamp = document.getElementById('mission-stamp');
    var actions = document.getElementById('finale-actions');
    if (stampContainer) stampContainer.style.display = 'block';
    if (stamp) {
      setTimeout(function() {
        stamp.style.opacity = '1';
        Audio.playMedalThud();
      }, 200);
    }
    if (actions) setTimeout(function() { actions.style.display = 'block'; }, 1200);
  }

  return { render, checkWord, replayMorse };
})();
```

- [ ] Test in browser: complete mission 12 (or force `Progression.advanceCampaign()` 12 times in console), confirm finale screen renders.
- [ ] Commit: `git add agentenfunk/src/screens/CampaignEndScreen.js && git commit -m "feat(agentenfunk): campaign finale screen"`

---

## Phase 6: PWA

### Task 19: PWA manifest + service worker

**Files:**
- Create: `agentenfunk/manifest.json`
- Create: `agentenfunk/service-worker.js`

- [ ] Create `manifest.json`:

```json
{
  "name": "Agentenfunk — Morse Interceptor",
  "short_name": "Agentenfunk",
  "description": "Cold War spy Morse code game",
  "start_url": "/agentenfunk/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#040d08",
  "background_color": "#040d08",
  "icons": [
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect width='192' height='192' fill='%23040d08'/><text x='96' y='130' text-anchor='middle' font-size='100' font-family='monospace' fill='%2300ff88'>📡</text></svg>",
      "sizes": "192x192",
      "type": "image/svg+xml"
    }
  ]
}
```

- [ ] Create `service-worker.js`:

```js
var CACHE = 'agentenfunk-v1';
var ASSETS = [
  '/agentenfunk/',
  '/agentenfunk/index.html',
  '/agentenfunk/src/i18n/lang.js',
  '/agentenfunk/src/i18n/strings.js',
  '/agentenfunk/src/data/morse.js',
  '/agentenfunk/src/data/missions.js',
  '/agentenfunk/src/data/achievements.js',
  '/agentenfunk/src/audio/audio.js',
  '/agentenfunk/src/input/input.js',
  '/agentenfunk/src/game/progression.js',
  '/agentenfunk/src/game/achievements-engine.js',
  '/agentenfunk/src/ui/router.js',
  '/agentenfunk/src/ui/morse-reference.js',
  '/agentenfunk/src/ui/badges.js',
  '/agentenfunk/src/screens/MenuScreen.js',
  '/agentenfunk/src/screens/MissionScreen.js',
  '/agentenfunk/src/screens/DecodeScreen.js',
  '/agentenfunk/src/screens/EncodeScreen.js',
  '/agentenfunk/src/screens/CommendationsScreen.js',
  '/agentenfunk/src/screens/SettingsScreen.js',
  '/agentenfunk/src/screens/CampaignEndScreen.js',
  '/agentenfunk/src/main.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(cache) { return cache.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request).then(function(cached) {
    return cached || fetch(e.request);
  }));
});
```

- [ ] Register service worker in `main.js` (add at the end of the IIFE):

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/agentenfunk/service-worker.js');
}
```

- [ ] Test: open in browser, check DevTools → Application → Service Workers shows registered.
- [ ] Commit: `git add agentenfunk/manifest.json agentenfunk/service-worker.js agentenfunk/src/main.js && git commit -m "feat(agentenfunk): PWA manifest and cache-first service worker"`

---

## Phase 7: Portal card + platform update

### Task 20: Add Agentenfunk card to portal + update platform badges

**Files:**
- Modify: `/mnt/e/dev/game/index.html`

- [ ] Add card to portal and mark Agentenfunk as browser+mobile (PWA):

In `index.html`, inside `.grid` after the Pflanzenwelt card:
```html
<a class="card" href="./agentenfunk/index.html">
  <div class="card-emoji">📡</div>
  <div class="card-title" id="card-af-title"></div>
  <div class="card-desc"  id="card-af-desc"></div>
  <div class="card-btn"   id="card-af-btn"></div>
  <div class="card-platforms">
    <span class="platform-badge supported">🖥️ Browser</span>
    <span class="platform-badge supported">📱 Mobile</span>
  </div>
</a>
```

- [ ] Add strings to `PORTAL_STRINGS` in `index.html`:
```js
// de:
afTitle: 'Agentenfunk',
afDesc: 'Lerne Morsecode als Spionage-Funker!',
// en:
afTitle: 'Agentenfunk',
afDesc: 'Learn Morse code as a Cold War spy operator!',
```

- [ ] Wire up in `render()` function:
```js
document.getElementById('card-af-title').textContent = s.afTitle;
document.getElementById('card-af-desc').textContent  = s.afDesc;
document.getElementById('card-af-btn').textContent   = s.play;
```

- [ ] Commit: `git add /mnt/e/dev/game/index.html && git commit -m "feat: add Agentenfunk card to portal with mobile+browser badges"`

---

## Done

After Task 18, the full game is implemented. Final smoke test:

- [ ] Open portal, see both game cards with correct platform badges
- [ ] Open Agentenfunk, confirm menu renders in correct language
- [ ] Play wave 1 decode mission: hear morse, select answer, see feedback
- [ ] Play wave 1 encode mission: tap dots/dashes, auto-confirm, see result
- [ ] Open commendations: all badges shown, locked ones dimmed
- [ ] Open settings: change pause timing, toggle mute, switch language
- [ ] Open morse reference: alphabet and tree views work
- [ ] Unlock first_contact achievement, see overlay animation
- [ ] `git push origin master`
