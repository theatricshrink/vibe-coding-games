// robotraetsel/src/i18n/strings.js
var STRINGS = {
  de: {
    // StartScene
    title:       '🤖 Roboträtsel',
    subtitle:    'Rate Wörter, bevor der Roboter die Welt übernimmt!',
    howToPlay:   'Wie spielt man?',
    startPrompt: 'Drücke eine Taste oder klicke zum Starten',
    instructions: [
      ['🔡', 'Rate Buchstaben um das versteckte Wort zu finden'],
      ['🤖', 'Jeder Fehler baut ein Roboterteil zusammen (6 Teile)'],
      ['💥', 'Vollständiger Roboter = WELTÜBERNAHME!'],
      ['💡', 'Hinweis zeigt die Kategorie — kostet 1 Roboterteil'],
      ['🔗', 'Löse Wörter in einer Kette: jedes beginnt mit dem letzten Buchstaben'],
      ['🏆', 'Kette von 10 Wörtern = Sieg!']
    ],
    // GameScene top bar
    chainLabel:  '🔗',
    bestLabel:   '⭐',
    nextLabel:   'Nächstes Wort beginnt mit',
    // GameScene hint
    hintBtn:     '💡 Hinweis',
    hintUsed:    'Kategorie:',
    // GameScene category names
    categories: {
      animal:     'Tier',
      country:    'Land',
      profession: 'Beruf',
      plant:      'Pflanze',
      food:       'Essen',
      sport:      'Sport'
    },
    // GameScene game over
    takeover:    'WELTÜBERNAHME! 🤖',
    takeoverSub: 'Der Roboter übernimmt kurz die Macht...',
    // WinScene
    winTitle:    '🏆 Du hast gewonnen!',
    winSubtitle: 'Kette von 10 — Roboter besiegt!',
    bestChain:   'Beste Kette:',
    playAgain:   '🔄 Nochmal spielen'
  },
  en: {
    // StartScene
    title:       '🤖 Robot Riddle',
    subtitle:    'Guess the word before the robot takes over the world!',
    howToPlay:   'How to play?',
    startPrompt: 'Press any key or click to start',
    instructions: [
      ['🔡', 'Guess letters to reveal the hidden word'],
      ['🤖', 'Each wrong guess adds a robot part (6 parts total)'],
      ['💥', 'Complete robot = WORLD DOMINATION!'],
      ['💡', 'Hint reveals the category — costs 1 robot part'],
      ['🔗', 'Solve words in a chain: each starts with the last letter'],
      ['🏆', 'Chain of 10 words = victory!']
    ],
    // GameScene top bar
    chainLabel:  '🔗',
    bestLabel:   '⭐',
    nextLabel:   'Next word starts with',
    // GameScene hint
    hintBtn:     '💡 Hint',
    hintUsed:    'Category:',
    // GameScene category names
    categories: {
      animal:     'Animal',
      country:    'Country',
      profession: 'Profession',
      plant:      'Plant',
      food:       'Food',
      sport:      'Sport'
    },
    // GameScene game over
    takeover:    'WORLD DOMINATION! 🤖',
    takeoverSub: 'The robot takes over momentarily...',
    // WinScene
    winTitle:    '🏆 You won!',
    winSubtitle: 'Chain of 10 — robot defeated!',
    bestChain:   'Best chain:',
    playAgain:   '🔄 Play again'
  }
};
