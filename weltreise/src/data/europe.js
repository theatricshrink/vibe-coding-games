var EUROPE = {
  id: 'europe',
  name: { de: 'Europa', en: 'Europe' },
  countries: [
    {
      id: 'austria',
      name: { de: 'Österreich', en: 'Austria' },
      anthem: 'assets/audio/anthems/austria.mp3',
      background: 'assets/backgrounds/austria.png',
      enemyType: 'austria_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Österreich?', options: ['Graz', 'Wien', 'Salzburg', 'Linz'], answer: 1 },
          en: { q: 'What is the capital of Austria?', options: ['Graz', 'Vienna', 'Salzburg', 'Linz'], answer: 1 }
        },
        {
          de: { q: 'Welche Farben hat die österreichische Flagge?', options: ['Blau-Weiß-Blau', 'Schwarz-Rot-Gold', 'Rot-Weiß-Rot', 'Grün-Weiß-Grün'], answer: 2 },
          en: { q: 'What are the colors of the Austrian flag?', options: ['Blue-White-Blue', 'Black-Red-Gold', 'Red-White-Red', 'Green-White-Green'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt wurde Mozart geboren?', options: ['Wien', 'Innsbruck', 'Linz', 'Salzburg'], answer: 3 },
          en: { q: 'In which city was Mozart born?', options: ['Vienna', 'Innsbruck', 'Linz', 'Salzburg'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt der längste Fluss Österreichs?', options: ['Rhein', 'Elbe', 'Donau', 'Inn'], answer: 2 },
          en: { q: 'What is the longest river in Austria?', options: ['Rhine', 'Elbe', 'Danube', 'Inn'], answer: 2 }
        },
        {
          de: { q: 'Wie hieß die österreichische Währung vor dem Euro?', options: ['Krone', 'Mark', 'Schilling', 'Gulden'], answer: 2 },
          en: { q: 'What was the Austrian currency before the Euro?', options: ['Crown', 'Mark', 'Schilling', 'Gulden'], answer: 2 }
        }
      ]
    },
    {
      id: 'france',
      name: { de: 'Frankreich', en: 'France' },
      anthem: 'assets/audio/anthems/france.mp3',
      background: 'assets/backgrounds/france.png',
      enemyType: 'france_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Frankreich?', options: ['Paris', 'Lyon', 'Marseille', 'Bordeaux'], answer: 0 },
          en: { q: 'What is the capital of France?', options: ['Paris', 'Lyon', 'Marseille', 'Bordeaux'], answer: 0 }
        },
        {
          de: { q: 'In welcher Stadt steht der Eiffelturm?', options: ['Lyon', 'Nizza', 'Paris', 'Straßburg'], answer: 2 },
          en: { q: 'In which city is the Eiffel Tower located?', options: ['Lyon', 'Nice', 'Paris', 'Strasbourg'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der längste Fluss Frankreichs?', options: ['Rhône', 'Loire', 'Seine', 'Garonne'], answer: 1 },
          en: { q: 'What is the longest river in France?', options: ['Rhône', 'Loire', 'Seine', 'Garonne'], answer: 1 }
        },
        {
          de: { q: 'Wie lautet das französische Nationalmotto?', options: ['Gott und Vaterland', 'Einigkeit und Recht und Freiheit', 'Liberté Égalité Fraternité', 'Frieden und Wohlstand'], answer: 2 },
          en: { q: 'What is the French national motto?', options: ['God and Fatherland', 'Unity and Justice and Freedom', 'Liberté Égalité Fraternité', 'Peace and Prosperity'], answer: 2 }
        },
        {
          de: { q: 'Wie viele Überseedepartements hat Frankreich?', options: ['3', '4', '5', '7'], answer: 2 },
          en: { q: 'How many overseas departments does France have?', options: ['3', '4', '5', '7'], answer: 2 }
        }
      ]
    },
    {
      id: 'germany',
      name: { de: 'Deutschland', en: 'Germany' },
      anthem: 'assets/audio/anthems/germany.mp3',
      background: 'assets/backgrounds/germany.png',
      enemyType: 'germany_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Deutschland?', options: ['Hamburg', 'München', 'Frankfurt', 'Berlin'], answer: 3 },
          en: { q: 'What is the capital of Germany?', options: ['Hamburg', 'Munich', 'Frankfurt', 'Berlin'], answer: 3 }
        },
        {
          de: { q: 'Was ist die größte Stadt Deutschlands?', options: ['München', 'Hamburg', 'Köln', 'Berlin'], answer: 3 },
          en: { q: 'What is the largest city in Germany?', options: ['Munich', 'Hamburg', 'Cologne', 'Berlin'], answer: 3 }
        },
        {
          de: { q: 'Welcher Fluss fließt durch Köln?', options: ['Elbe', 'Rhein', 'Main', 'Mosel'], answer: 1 },
          en: { q: 'Which river flows through Cologne?', options: ['Elbe', 'Rhine', 'Main', 'Moselle'], answer: 1 }
        },
        {
          de: { q: 'Wie hieß die deutsche Währung vor dem Euro?', options: ['Schilling', 'Gulden', 'Deutsche Mark', 'Pfennig'], answer: 2 },
          en: { q: 'What was the German currency before the Euro?', options: ['Schilling', 'Gulden', 'Deutsche Mark', 'Pfennig'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr wurde Deutschland wiedervereinigt?', options: ['1985', '1989', '1990', '1991'], answer: 2 },
          en: { q: 'In which year was Germany reunified?', options: ['1985', '1989', '1990', '1991'], answer: 2 }
        }
      ]
    },
    {
      id: 'italy',
      name: { de: 'Italien', en: 'Italy' },
      anthem: 'assets/audio/anthems/italy.mp3',
      background: 'assets/backgrounds/italy.png',
      enemyType: 'italy_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Italien?', options: ['Mailand', 'Florenz', 'Rom', 'Venedig'], answer: 2 },
          en: { q: 'What is the capital of Italy?', options: ['Milan', 'Florence', 'Rome', 'Venice'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt steht der Schiefe Turm?', options: ['Florenz', 'Pisa', 'Siena', 'Bologna'], answer: 1 },
          en: { q: 'In which city is the famous leaning tower located?', options: ['Florence', 'Pisa', 'Siena', 'Bologna'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der längste Fluss Italiens?', options: ['Arno', 'Tiber', 'Po', 'Etsch'], answer: 2 },
          en: { q: 'What is the longest river in Italy?', options: ['Arno', 'Tiber', 'Po', 'Adige'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der aktive Vulkan auf Sizilien?', options: ['Stromboli', 'Vesuv', 'Etna', 'Vulcano'], answer: 2 },
          en: { q: 'What is the name of the active volcano in Sicily?', options: ['Stromboli', 'Vesuvius', 'Etna', 'Vulcano'], answer: 2 }
        },
        {
          de: { q: 'Welches antike Imperium hatte seinen Ursprung in Italien?', options: ['Griechische', 'Byzantinische', 'Osmanische', 'Römische'], answer: 3 },
          en: { q: 'Which ancient empire originated in Italy?', options: ['Greek', 'Byzantine', 'Ottoman', 'Roman'], answer: 3 }
        }
      ]
    },
    {
      id: 'spain',
      name: { de: 'Spanien', en: 'Spain' },
      anthem: 'assets/audio/anthems/spain.mp3',
      background: 'assets/backgrounds/spain.png',
      enemyType: 'spain_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Spanien?', options: ['Barcelona', 'Sevilla', 'Madrid', 'Valencia'], answer: 2 },
          en: { q: 'What is the capital of Spain?', options: ['Barcelona', 'Seville', 'Madrid', 'Valencia'], answer: 2 }
        },
        {
          de: { q: 'Was ist die größte Stadt Spaniens?', options: ['Barcelona', 'Sevilla', 'Valencia', 'Madrid'], answer: 3 },
          en: { q: 'What is the largest city in Spain?', options: ['Barcelona', 'Seville', 'Valencia', 'Madrid'], answer: 3 }
        },
        {
          de: { q: 'Welcher berühmte Maler stammt aus Spanien?', options: ['Monet', 'Rembrandt', 'Picasso', 'Da Vinci'], answer: 2 },
          en: { q: 'Which famous painter is from Spain?', options: ['Monet', 'Rembrandt', 'Picasso', 'Da Vinci'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der traditionelle spanische Tanz?', options: ['Salsa', 'Tango', 'Rumba', 'Flamenco'], answer: 3 },
          en: { q: 'What is the traditional Spanish dance?', options: ['Salsa', 'Tango', 'Rumba', 'Flamenco'], answer: 3 }
        },
        {
          de: { q: 'Wie hieß die spanische Währung vor dem Euro?', options: ['Escudo', 'Lira', 'Drachme', 'Peseta'], answer: 3 },
          en: { q: 'What was the Spanish currency before the Euro?', options: ['Escudo', 'Lira', 'Drachma', 'Peseta'], answer: 3 }
        }
      ]
    }
  ]
};
