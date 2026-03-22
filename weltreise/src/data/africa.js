var AFRICA = {
  id: 'africa',
  name: { de: 'Afrika', en: 'Africa' },
  countries: [
    {
      id: 'egypt',
      name: { de: 'Ägypten', en: 'Egypt' },
      anthem: 'assets/audio/anthems/egypt.mp3',
      background: 'assets/backgrounds/egypt.png',
      enemyType: 'egypt_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Ägypten?', options: ['Alexandria', 'Kairo', 'Luxor', 'Aswan'], answer: 1 },
          en: { q: 'What is the capital of Egypt?', options: ['Alexandria', 'Cairo', 'Luxor', 'Aswan'], answer: 1 }
        },
        {
          de: { q: 'Welches berühmte Monument steht in Ägypten?', options: ['Kolosseum', 'Akropolis', 'Pyramiden von Gizeh', 'Machu Picchu'], answer: 2 },
          en: { q: 'Which famous monument is located in Egypt?', options: ['Colosseum', 'Acropolis', 'Pyramids of Giza', 'Machu Picchu'], answer: 2 }
        },
        {
          de: { q: 'Welcher Fluss fließt durch Ägypten?', options: ['Kongo', 'Niger', 'Sambesi', 'Nil'], answer: 3 },
          en: { q: 'Which river flows through Egypt?', options: ['Congo', 'Niger', 'Zambezi', 'Nile'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die ägyptische Währung?', options: ['Dinar', 'Dirham', 'Ägyptisches Pfund', 'Piaster'], answer: 2 },
          en: { q: 'What is the Egyptian currency?', options: ['Dinar', 'Dirham', 'Egyptian Pound', 'Piaster'], answer: 2 }
        },
        {
          de: { q: 'Wie hieß die Schriftform der alten Ägypter?', options: ['Keilschrift', 'Kyrillisch', 'Hieroglyphen', 'Runen'], answer: 2 },
          en: { q: 'What was the writing system of the ancient Egyptians?', options: ['Cuneiform', 'Cyrillic', 'Hieroglyphics', 'Runes'], answer: 2 }
        }
      ]
    },
    {
      id: 'kenya',
      name: { de: 'Kenia', en: 'Kenya' },
      anthem: 'assets/audio/anthems/kenya.mp3',
      background: 'assets/backgrounds/kenya.png',
      enemyType: 'kenya_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Kenia?', options: ['Mombasa', 'Kisumu', 'Nairobi', 'Nakuru'], answer: 2 },
          en: { q: 'What is the capital of Kenya?', options: ['Mombasa', 'Kisumu', 'Nairobi', 'Nakuru'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das berühmte Wildreservat in Kenia?', options: ['Serengeti', 'Kruger', 'Maasai Mara', 'Okavango'], answer: 2 },
          en: { q: 'What is the famous wildlife reserve in Kenya?', options: ['Serengeti', 'Kruger', 'Maasai Mara', 'Okavango'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg Kenias?', options: ['Kilimandscharo', 'Mount Kenia', 'Ruwenzori', 'Elgon'], answer: 1 },
          en: { q: 'What is the highest mountain in Kenya?', options: ['Kilimanjaro', 'Mount Kenya', 'Rwenzori', 'Elgon'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt die kenianische Währung?', options: ['Tansania-Schilling', 'Uganda-Schilling', 'Kenianischer Schilling', 'Rand'], answer: 2 },
          en: { q: 'What is the Kenyan currency?', options: ['Tanzanian Shilling', 'Ugandan Shilling', 'Kenyan Shilling', 'Rand'], answer: 2 }
        },
        {
          de: { q: 'Welche sind die Amtssprachen Kenias?', options: ['Französisch und Arabisch', 'Englisch und Suaheli', 'Portugiesisch und Suaheli', 'Arabisch und Suaheli'], answer: 1 },
          en: { q: 'What are the official languages of Kenya?', options: ['French and Arabic', 'English and Swahili', 'Portuguese and Swahili', 'Arabic and Swahili'], answer: 1 }
        }
      ]
    },
    {
      id: 'morocco',
      name: { de: 'Marokko', en: 'Morocco' },
      anthem: 'assets/audio/anthems/morocco.mp3',
      background: 'assets/backgrounds/morocco.png',
      enemyType: 'morocco_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Marokko?', options: ['Casablanca', 'Marrakesch', 'Rabat', 'Fes'], answer: 2 },
          en: { q: 'What is the capital of Morocco?', options: ['Casablanca', 'Marrakesh', 'Rabat', 'Fes'], answer: 2 }
        },
        {
          de: { q: 'Welche berühmte Wüste liegt in Marokko?', options: ['Kalahari', 'Namib', 'Sahara', 'Negev'], answer: 2 },
          en: { q: 'Which famous desert is found in Morocco?', options: ['Kalahari', 'Namib', 'Sahara', 'Negev'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die marokkanische Währung?', options: ['Dinar', 'Dirham', 'Pfund', 'Franc'], answer: 1 },
          en: { q: 'What is the Moroccan currency?', options: ['Dinar', 'Dirham', 'Pound', 'Franc'], answer: 1 }
        },
        {
          de: { q: 'Was ist die größte Stadt Marokkos?', options: ['Rabat', 'Marrakesch', 'Fes', 'Casablanca'], answer: 3 },
          en: { q: 'What is the largest city in Morocco?', options: ['Rabat', 'Marrakesh', 'Fes', 'Casablanca'], answer: 3 }
        },
        {
          de: { q: 'Welches Land liegt an der Straße von Gibraltar?', options: ['Algerien', 'Tunesien', 'Marokko', 'Libyen'], answer: 2 },
          en: { q: 'Which country borders the Strait of Gibraltar?', options: ['Algeria', 'Tunisia', 'Morocco', 'Libya'], answer: 2 }
        }
      ]
    },
    {
      id: 'nigeria',
      name: { de: 'Nigeria', en: 'Nigeria' },
      anthem: 'assets/audio/anthems/nigeria.mp3',
      background: 'assets/backgrounds/nigeria.png',
      enemyType: 'nigeria_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Nigeria?', options: ['Lagos', 'Kano', 'Ibadan', 'Abuja'], answer: 3 },
          en: { q: 'What is the capital of Nigeria?', options: ['Lagos', 'Kano', 'Ibadan', 'Abuja'], answer: 3 }
        },
        {
          de: { q: 'Was ist die größte Stadt Nigerias?', options: ['Abuja', 'Kano', 'Lagos', 'Port Harcourt'], answer: 2 },
          en: { q: 'What is the largest city in Nigeria?', options: ['Abuja', 'Kano', 'Lagos', 'Port Harcourt'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die nigerianische Währung?', options: ['Cedi', 'Naira', 'Franc', 'Schilling'], answer: 1 },
          en: { q: 'What is the Nigerian currency?', options: ['Cedi', 'Naira', 'Franc', 'Shilling'], answer: 1 }
        },
        {
          de: { q: 'Welches ist das bevölkerungsreichste Land Afrikas?', options: ['Äthiopien', 'Ägypten', 'Südafrika', 'Nigeria'], answer: 3 },
          en: { q: 'Which is the most populous country in Africa?', options: ['Ethiopia', 'Egypt', 'South Africa', 'Nigeria'], answer: 3 }
        },
        {
          de: { q: 'Was ist die Amtssprache Nigerias?', options: ['Französisch', 'Arabisch', 'Englisch', 'Portugiesisch'], answer: 2 },
          en: { q: 'What is the official language of Nigeria?', options: ['French', 'Arabic', 'English', 'Portuguese'], answer: 2 }
        }
      ]
    },
    {
      id: 'south_africa',
      name: { de: 'Südafrika', en: 'South Africa' },
      anthem: 'assets/audio/anthems/south_africa.mp3',
      background: 'assets/backgrounds/south_africa.png',
      enemyType: 'south_africa_enemy',
      questions: [
        {
          de: { q: 'Was ist die Exekutivhauptstadt Südafrikas?', options: ['Kapstadt', 'Johannesburg', 'Pretoria', 'Durban'], answer: 2 },
          en: { q: 'What is the executive capital of South Africa?', options: ['Cape Town', 'Johannesburg', 'Pretoria', 'Durban'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die südafrikanische Währung?', options: ['Kwacha', 'Rand', 'Pula', 'Schilling'], answer: 1 },
          en: { q: 'What is the South African currency?', options: ['Kwacha', 'Rand', 'Pula', 'Shilling'], answer: 1 }
        },
        {
          de: { q: 'Welcher berühmte Anführer kam aus Südafrika?', options: ['Mugabe', 'Lumumba', 'Nkrumah', 'Mandela'], answer: 3 },
          en: { q: 'Which famous leader came from South Africa?', options: ['Mugabe', 'Lumumba', 'Nkrumah', 'Mandela'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die südlichste Spitze Afrikas?', options: ['Kap Agulhas', 'Kap Verde', 'Kap der Guten Hoffnung', 'Kap Bojador'], answer: 2 },
          en: { q: 'What is the famous cape at the tip of Africa?', options: ['Cape Agulhas', 'Cape Verde', 'Cape of Good Hope', 'Cape Bojador'], answer: 2 }
        },
        {
          de: { q: 'Wie viele Amtssprachen hat Südafrika?', options: ['5', '7', '9', '11'], answer: 3 },
          en: { q: 'How many official languages does South Africa have?', options: ['5', '7', '9', '11'], answer: 3 }
        }
      ]
    }
  ]
};
