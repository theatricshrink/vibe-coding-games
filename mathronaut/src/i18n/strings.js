var STRINGS = {
  de: {
    title:        'Mathronaut',
    modeNormal:   'Normal (3 Leben)',
    modeHard:     'Schwer (sofort vorbei)',
    bestNormal:   'Bestweite Normal:',
    bestHard:     'Bestweite Schwer:',
    noRecord:     '—',
    start:        'Starten →',
    metres:       'm',
    lives:        '❤️',
    zoneT1:       '🌍 Atmosphären-Zone',
    zoneT2:       '⭐ Multiplikations-Zone',
    zoneT3:       '🪐 Divisions-Zone',
    zoneT4:       '✨ Fraktions-Zone',
    gameOver:     'Spiel vorbei!',
    height:       'Höhe',
    best:         'Bestweite',
    tierReached:  'Erreichte Zone',
    tierNames:    ['Atmosphäre', 'Oberatmosphäre', 'Nahraum', 'Tiefer Weltraum'],
    retry:        'Nochmal',
    back:         '← Übersicht'
  },
  en: {
    title:        'Mathronaut',
    modeNormal:   'Normal (3 lives)',
    modeHard:     'Hard (instant death)',
    bestNormal:   'Best Normal:',
    bestHard:     'Best Hard:',
    noRecord:     '—',
    start:        'Launch →',
    metres:       'm',
    lives:        '❤️',
    zoneT1:       '🌍 Atmosphere Zone',
    zoneT2:       '⭐ Multiplication Zone',
    zoneT3:       '🪐 Division Zone',
    zoneT4:       '✨ Fractions Zone',
    gameOver:     'Game Over!',
    height:       'Height',
    best:         'Best',
    tierReached:  'Zone Reached',
    tierNames:    ['Atmosphere', 'Upper Atmosphere', 'Near Space', 'Deep Space'],
    retry:        'Try Again',
    back:         '← Overview'
  }
};

function t(key) {
  return (STRINGS[LANG] && STRINGS[LANG][key]) || STRINGS['en'][key] || key;
}
