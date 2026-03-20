var ACHIEVEMENT_DEFS = [
  {
    id: 'first_contact',
    name: { en: 'First Contact', de: 'Erstkontakt' },
    citation: {
      en: 'Completed your first mission. The first transmission is always the hardest.',
      de: 'Erste Mission abgeschlossen. Die erste \u00dcbertragung ist immer die schwerste.'
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
      de: 'Buchstaben in unter 1 Sekunde entschl\u00fcsselt. Reflexe eines Veteranen.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#001a33" stroke="#4488ff" stroke-width="3"/><polygon points="44,16 32,42 42,42 36,64 52,36 40,36" fill="#ffee00"/></svg>'
  },
  {
    id: 'blitz',
    name: { en: 'Blitz Transmission', de: 'Blitz\u00fcbertragung' },
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
      en: 'Unlocked all digits 0\u20139.',
      de: 'Alle Ziffern 0\u20139 freigeschaltet.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><rect x="10" y="10" width="60" height="60" rx="4" fill="#111" stroke="#aaa" stroke-width="2"/><text x="22" y="46" font-size="18" fill="#888" font-family="Share Tech Mono,monospace">0</text><text x="42" y="46" font-size="18" fill="#aaa" font-family="Share Tech Mono,monospace">1</text></svg>'
  },
  {
    id: 'veteran',
    name: { en: 'Veteran Operator', de: 'Veteran-Funker' },
    citation: {
      en: '50 missions completed. You are the backbone of the network.',
      de: '50 Missionen abgeschlossen. Du bist das R\u00fcckgrat des Netzwerks.'
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
      de: 'Du hast SOS getippt. Irgendwo da drau\u00dfen hat es jemand geh\u00f6rt.'
    },
    badge: '<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#1a0000" stroke="#ff2222" stroke-width="3"/><circle cx="40" cy="40" r="22" fill="none" stroke="#ff2222" stroke-width="2"/><text x="40" y="45" text-anchor="middle" font-size="12" fill="#ff4444" font-family="Share Tech Mono,monospace">SOS</text></svg>'
  },
  {
    id: 'insomniac',
    name: { en: 'Night Watch', de: 'Nachtwache' },
    citation: {
      en: 'Played after midnight. The night belongs to the operator.',
      de: 'Nach Mitternacht gespielt. Die Nacht geh\u00f6rt dem Funker.'
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
    name: { en: 'No Crutches', de: 'Ohne Kr\u00fccken' },
    citation: {
      en: 'Completed a mission with the morse reference hidden. Pure memory.',
      de: 'Mission ohne Morsecode-Tabelle abgeschlossen. Reines Ged\u00e4chtnis.'
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
