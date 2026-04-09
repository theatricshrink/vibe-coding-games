var STRINGS = {
  de: {
    title:          'Irrlichter',
    subtitle:       'Das Labyrinth-Rennen',
    start:          'SPIELEN',
    ctrlP1:         'SPIELER 1 — WASD',
    ctrlP2:         'SPIELER 2 — PFEILTASTEN',
    ctrlTouch:      'TOUCH — Linke / Rechte Bildschirmhälfte',
    goal:           'Finde das Irrlicht im Labyrinth!',
    firstTo:        'Wer zuerst 5 Runden gewinnt!',
    player1:        'SP 1',
    player2:        'SP 2',
    p1found:        'SPIELER 1\nHAT ES GEFUNDEN!',
    p2found:        'SPIELER 2\nHAT ES GEFUNDEN!',
    winnerP1:       'SPIELER 1\nGEWINNT DAS SPIEL!',
    winnerP2:       'SPIELER 2\nGEWINNT DAS SPIEL!',
    finalScore:     'Endstand',
    playAgain:      'NOCHMAL',
    toMenu:         'MENÜ',
    backLabel:      '← Übersicht',
    round:          'Runde'
  },
  en: {
    title:          'Irrlichter',
    subtitle:       'The Labyrinth Race',
    start:          'PLAY',
    ctrlP1:         'PLAYER 1 — WASD',
    ctrlP2:         'PLAYER 2 — ARROW KEYS',
    ctrlTouch:      'TOUCH — Left / Right screen halves',
    goal:           'Find the will-o\'-wisp in the labyrinth!',
    firstTo:        'First to win 5 rounds wins!',
    player1:        'P1',
    player2:        'P2',
    p1found:        'PLAYER 1\nFOUND IT!',
    p2found:        'PLAYER 2\nFOUND IT!',
    winnerP1:       'PLAYER 1\nWINS THE MATCH!',
    winnerP2:       'PLAYER 2\nWINS THE MATCH!',
    finalScore:     'Final Score',
    playAgain:      'PLAY AGAIN',
    toMenu:         'MENU',
    backLabel:      '← Overview',
    round:          'Round'
  }
};

function t(key) {
  return (STRINGS[LANG] && STRINGS[LANG][key]) || STRINGS['en'][key] || key;
}
