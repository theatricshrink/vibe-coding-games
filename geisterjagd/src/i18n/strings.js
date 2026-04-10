var STRINGS = {
  de: {
    title:         'Geisterjagd',
    subtitle:      'Fange die Geister ein!',
    easy:          'LEICHT',
    hard:          'SCHWER',
    easyDesc:      '3 Leben',
    hardDesc:      'Kein Fehler',
    start:         'SPIELEN',
    score:         'Punkte',
    level:         'Level',
    lives:         'Leben',
    levelComplete: 'Level geschafft!',
    gameOver:      'Game Over',
    finalScore:    'Punkte',
    bestScore:     'Bestleistung',
    playAgain:     'NOCHMAL',
    toMenu:        'MENÜ',
    backLabel:     '← Übersicht',
    bonus:         'BONUS!',
    fail:          'Gemischt!',
    rule1:         'Ziehe Linien, um Geister einzusperren',
    rule2:         'Gleiche Farbe: ×3 Pkt  ·  Gemischt / keiner: ×1 Pkt'
  },
  en: {
    title:         'Ghost Hunt',
    subtitle:      'Trap the ghosts!',
    easy:          'EASY',
    hard:          'HARD',
    easyDesc:      '3 lives',
    hardDesc:      'No mistakes',
    start:         'PLAY',
    score:         'Score',
    level:         'Level',
    lives:         'Lives',
    levelComplete: 'Level clear!',
    gameOver:      'Game Over',
    finalScore:    'Score',
    bestScore:     'Best',
    playAgain:     'PLAY AGAIN',
    toMenu:        'MENU',
    backLabel:     '← Overview',
    bonus:         'BONUS!',
    fail:          'Mixed!',
    rule1:         'Draw lines from border to border to trap ghosts',
    rule2:         'Same color: ×3 pts  ·  Mixed / none: ×1 pt'
  }
};

function t(key) {
  return (STRINGS[LANG] && STRINGS[LANG][key]) || STRINGS['en'][key] || key;
}
