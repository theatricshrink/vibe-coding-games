var ASIA = {
  id: 'asia',
  name: { de: 'Asien', en: 'Asia' },
  countries: [
    {
      id: 'china',
      name: { de: 'China', en: 'China' },
      anthem: 'assets/audio/anthems/china.mp3',
      background: 'assets/backgrounds/china.png',
      enemyType: 'china_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von China?', options: ['Shanghai', 'Peking', 'Hongkong', 'Chengdu'], answer: 1 },
          en: { q: 'What is the capital of China?', options: ['Shanghai', 'Beijing', 'Hong Kong', 'Chengdu'], answer: 1 }
        },
        {
          de: { q: 'Wo befindet sich die Chinesische Mauer?', options: ['Mongolei', 'China', 'Japan', 'Korea'], answer: 1 },
          en: { q: 'Where is the Great Wall located?', options: ['Mongolia', 'China', 'Japan', 'Korea'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt die chinesische Währung?', options: ['Yen', 'Won', 'Yuan', 'Baht'], answer: 2 },
          en: { q: 'What is the Chinese currency?', options: ['Yen', 'Won', 'Yuan', 'Baht'], answer: 2 }
        },
        {
          de: { q: 'Welches ist das bevölkerungsreichste Land der Welt?', options: ['Indien', 'USA', 'Indonesien', 'China'], answer: 3 },
          en: { q: 'Which is the most populous country in the world?', options: ['India', 'USA', 'Indonesia', 'China'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt der längste Fluss Chinas?', options: ['Gelber Fluss', 'Mekong', 'Jangtse', 'Indus'], answer: 2 },
          en: { q: 'What is the longest river in China?', options: ['Yellow River', 'Mekong', 'Yangtze', 'Indus'], answer: 2 }
        }
      ]
    },
    {
      id: 'india',
      name: { de: 'Indien', en: 'India' },
      anthem: 'assets/audio/anthems/india.mp3',
      background: 'assets/backgrounds/india.png',
      enemyType: 'india_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Indien?', options: ['Mumbai', 'Kalkutta', 'Neu-Delhi', 'Bangalore'], answer: 2 },
          en: { q: 'What is the capital of India?', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Bangalore'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt steht das Taj Mahal?', options: ['Delhi', 'Mumbai', 'Jaipur', 'Agra'], answer: 3 },
          en: { q: 'In which city is the Taj Mahal located?', options: ['Delhi', 'Mumbai', 'Jaipur', 'Agra'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die indische Währung?', options: ['Taka', 'Rupie', 'Riyal', 'Rupiah'], answer: 1 },
          en: { q: 'What is the Indian currency?', options: ['Taka', 'Rupee', 'Riyal', 'Rupiah'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der heilige Fluss Indiens?', options: ['Indus', 'Brahmaputra', 'Ganges', 'Yamuna'], answer: 2 },
          en: { q: 'What is the sacred river of India?', options: ['Indus', 'Brahmaputra', 'Ganges', 'Yamuna'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr wurde Indien unabhängig?', options: ['1945', '1946', '1947', '1948'], answer: 2 },
          en: { q: 'In which year did India gain independence?', options: ['1945', '1946', '1947', '1948'], answer: 2 }
        }
      ]
    },
    {
      id: 'japan',
      name: { de: 'Japan', en: 'Japan' },
      anthem: 'assets/audio/anthems/japan.mp3',
      background: 'assets/backgrounds/japan.png',
      enemyType: 'japan_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Japan?', options: ['Osaka', 'Kyoto', 'Tokio', 'Hiroshima'], answer: 2 },
          en: { q: 'What is the capital of Japan?', options: ['Osaka', 'Kyoto', 'Tokyo', 'Hiroshima'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte Berg Japans?', options: ['Aso', 'Nantai', 'Fuji', 'Ontake'], answer: 2 },
          en: { q: 'What is the name of Japan\'s famous mountain?', options: ['Aso', 'Nantai', 'Fuji', 'Ontake'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die japanische Währung?', options: ['Won', 'Yuan', 'Baht', 'Yen'], answer: 3 },
          en: { q: 'What is the Japanese currency?', options: ['Won', 'Yuan', 'Baht', 'Yen'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt das traditionelle japanische Theater?', options: ['Noh', 'Bunraku', 'Kabuki', 'Rakugo'], answer: 2 },
          en: { q: 'What is the name of the traditional Japanese theater?', options: ['Noh', 'Bunraku', 'Kabuki', 'Rakugo'], answer: 2 }
        },
        {
          de: { q: 'Wie viele Inseln hat Japan ungefähr?', options: ['2000', '4000', '6800', '10000'], answer: 2 },
          en: { q: 'Approximately how many islands does Japan have?', options: ['2000', '4000', '6800', '10000'], answer: 2 }
        }
      ]
    },
    {
      id: 'saudi_arabia',
      name: { de: 'Saudi-Arabien', en: 'Saudi Arabia' },
      anthem: 'assets/audio/anthems/saudi_arabia.mp3',
      background: 'assets/backgrounds/saudi_arabia.png',
      enemyType: 'saudi_arabia_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Saudi-Arabien?', options: ['Jeddah', 'Mekka', 'Medina', 'Riad'], answer: 3 },
          en: { q: 'What is the capital of Saudi Arabia?', options: ['Jeddah', 'Mecca', 'Medina', 'Riyadh'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die heiligste Stadt im Islam?', options: ['Medina', 'Jerusalem', 'Mekka', 'Karbala'], answer: 2 },
          en: { q: 'What is the holiest city in Islam?', options: ['Medina', 'Jerusalem', 'Mecca', 'Karbala'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die saudi-arabische Währung?', options: ['Dinar', 'Dirham', 'Riyal', 'Pfund'], answer: 2 },
          en: { q: 'What is the Saudi Arabian currency?', options: ['Dinar', 'Dirham', 'Riyal', 'Pound'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die größte Sandwüste der Welt?', options: ['Sahara', 'Gobi', 'Rub al-Chali', 'Taklamakan'], answer: 2 },
          en: { q: 'What is the largest sand desert in the world?', options: ['Sahara', 'Gobi', 'Rub al Khali', 'Taklamakan'], answer: 2 }
        },
        {
          de: { q: 'Was ist das wichtigste Exportgut Saudi-Arabiens?', options: ['Gold', 'Erdgas', 'Phosphat', 'Öl'], answer: 3 },
          en: { q: 'What is the main export of Saudi Arabia?', options: ['Gold', 'Natural Gas', 'Phosphate', 'Oil'], answer: 3 }
        }
      ]
    },
    {
      id: 'thailand',
      name: { de: 'Thailand', en: 'Thailand' },
      anthem: 'assets/audio/anthems/thailand.mp3',
      background: 'assets/backgrounds/thailand.png',
      enemyType: 'thailand_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Thailand?', options: ['Chiang Mai', 'Phuket', 'Bangkok', 'Pattaya'], answer: 2 },
          en: { q: 'What is the capital of Thailand?', options: ['Chiang Mai', 'Phuket', 'Bangkok', 'Pattaya'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die thailändische Währung?', options: ['Ringgit', 'Rupiah', 'Peso', 'Baht'], answer: 3 },
          en: { q: 'What is the Thai currency?', options: ['Ringgit', 'Rupiah', 'Peso', 'Baht'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt der berühmteste Tempel Bangkoks?', options: ['Wat Arun', 'Wat Pho', 'Wat Phra Kaew', 'Wat Saket'], answer: 2 },
          en: { q: 'What is the most famous temple in Bangkok?', options: ['Wat Arun', 'Wat Pho', 'Wat Phra Kaew', 'Wat Saket'], answer: 2 }
        },
        {
          de: { q: 'Was ist das Nationaltier Thailands?', options: ['Tiger', 'Elefant', 'Büffel', 'Siamesische Katze'], answer: 1 },
          en: { q: 'What is the national animal of Thailand?', options: ['Tiger', 'Elephant', 'Buffalo', 'Siamese Cat'], answer: 1 }
        },
        {
          de: { q: 'Was ist die Amtssprache Thailands?', options: ['Khmer', 'Laotisch', 'Birmanisch', 'Thailändisch'], answer: 3 },
          en: { q: 'What is the official language of Thailand?', options: ['Khmer', 'Lao', 'Burmese', 'Thai'], answer: 3 }
        }
      ]
    }
  ]
};
