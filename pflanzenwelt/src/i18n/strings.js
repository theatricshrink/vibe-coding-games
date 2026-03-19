// pflanzenwelt/src/i18n/strings.js
var STRINGS = {
  de: {
    // StartScene
    title:       '🌿 Pflanzenwelt 🌿',
    subtitle:    'Fange alle 8 Kreaturen!',
    howToPlay:   'Wie spielt man?',
    startPrompt: 'Drücke eine Taste oder klicke zum Starten',
    instructions: [
      ['⬆⬇⬅➡', 'Bewege dich mit den Pfeiltasten oder WASD'],
      ['🌿',    'Laufe durch das hohe Gras um Kreaturen zu treffen'],
      ['❓',    'Beantworte die Frage richtig um sie zu fangen'],
      ['✖',    'Falsche Antwort? Die Kreatur flieht!'],
      ['⭐',    'Seltene Kreaturen brauchen 2 richtige Antworten'],
      ['📖',   'Drücke C um deine Sammlung anzusehen']
    ],
    // GameScene
    categories: ['Mathe', 'Deutsch', 'Allgemeinwissen'],
    // QuizScene
    caught:  'Gefangen! 🎉',
    correct: '✓ Richtig!',
    bye:     'Tschüss! 👋',
    // CollectionScene
    caughtHeader: 'Gefangen',
    closeHint:    '[C] oder [Esc] zum Schließen',
    caughtLabel:  'Gefangen!',
    // WinScene
    winTitle:    '🏆 Du hast gewonnen! 🏆',
    winSubtitle: 'Alle 8 Kreaturen gefangen — Pflanzenwelt-Meister!',
    playAgain:   '🔄 Nochmal spielen',
    // Rarity labels
    rarity: { common: 'häufig', uncommon: 'ungewöhnlich', rare: 'selten' }
  },
  en: {
    // StartScene
    title:       '🌿 Plant World 🌿',
    subtitle:    'Catch all 8 creatures!',
    howToPlay:   'How to play?',
    startPrompt: 'Press any key or click to start',
    instructions: [
      ['⬆⬇⬅➡', 'Move with arrow keys or WASD'],
      ['🌿',    'Walk through tall grass to meet creatures'],
      ['❓',    'Answer the question correctly to catch them'],
      ['✖',    'Wrong answer? The creature runs away!'],
      ['⭐',    'Rare creatures need 2 correct answers'],
      ['📖',   'Press C to view your collection']
    ],
    // GameScene
    categories: ['Maths', 'English', 'General Knowledge'],
    // QuizScene
    caught:  'Caught! 🎉',
    correct: '✓ Correct!',
    bye:     'Bye! 👋',
    // CollectionScene
    caughtHeader: 'Caught',
    closeHint:    '[C] or [Esc] to close',
    caughtLabel:  'Caught!',
    // WinScene
    winTitle:    '🏆 You won! 🏆',
    winSubtitle: 'All 8 creatures caught — Plant World Master!',
    playAgain:   '🔄 Play again',
    // Rarity labels
    rarity: { common: 'common', uncommon: 'uncommon', rare: 'rare' }
  }
};
