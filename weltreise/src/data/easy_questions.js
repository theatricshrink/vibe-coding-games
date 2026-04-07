// Easy question pool for Weltreise – designed for children aged 5–6.
// Each country has exactly 5 bilingual questions (DE + EN) with 4 answer options.
var EASY_QUESTIONS = {

  // ── Europe ──────────────────────────────────────────────────────────────────

  austria: [
    {
      de: { q: 'Was ist die Hauptstadt von Österreich?', options: ['Berlin', 'Wien', 'Bern', 'Paris'], answer: 1 },
      en: { q: 'What is the capital of Austria?', options: ['Berlin', 'Vienna', 'Bern', 'Paris'], answer: 1 }
    },
    {
      de: { q: 'In welchem Gebirge liegt Österreich?', options: ['Himalaya', 'Anden', 'Alpen', 'Rocky Mountains'], answer: 2 },
      en: { q: 'Which mountain range is found in Austria?', options: ['Himalayas', 'Andes', 'Alps', 'Rocky Mountains'], answer: 2 }
    },
    {
      de: { q: 'Welche Sprache spricht man in Österreich?', options: ['Englisch', 'Französisch', 'Spanisch', 'Deutsch'], answer: 3 },
      en: { q: 'What language do people speak in Austria?', options: ['English', 'French', 'Spanish', 'German'], answer: 3 }
    },
    {
      de: { q: 'Welches Tier ist in Österreich berühmt?', options: ['Känguru', 'Lipizzaner-Pferd', 'Panda', 'Elefant'], answer: 1 },
      en: { q: 'Which animal is famous in Austria?', options: ['Kangaroo', 'Lipizzaner horse', 'Panda', 'Elephant'], answer: 1 }
    },
    {
      de: { q: 'Was trinken die Österreicher sehr gerne?', options: ['Tee', 'Orangensaft', 'Kaffee', 'Limonade'], answer: 2 },
      en: { q: 'What do Austrians love to drink?', options: ['Tea', 'Orange juice', 'Coffee', 'Lemonade'], answer: 2 }
    }
  ],

  germany: [
    {
      de: { q: 'Was ist die Hauptstadt von Deutschland?', options: ['Hamburg', 'München', 'Berlin', 'Köln'], answer: 2 },
      en: { q: 'What is the capital of Germany?', options: ['Hamburg', 'Munich', 'Berlin', 'Cologne'], answer: 2 }
    },
    {
      de: { q: 'Welches Tier steht im deutschen Wappen?', options: ['Löwe', 'Adler', 'Bär', 'Wolf'], answer: 1 },
      en: { q: 'Which animal is on the German coat of arms?', options: ['Lion', 'Eagle', 'Bear', 'Wolf'], answer: 1 }
    },
    {
      de: { q: 'Welches Fest ist in Deutschland sehr bekannt?', options: ['Karneval in Rio', 'Oktoberfest', 'Fasching in Venedig', 'Halloween'], answer: 1 },
      en: { q: 'Which festival is very famous in Germany?', options: ['Rio Carnival', 'Oktoberfest', 'Venice Carnival', 'Halloween'], answer: 1 }
    },
    {
      de: { q: 'Welches Fahrzeug wird in Deutschland gebaut?', options: ['Schiff', 'Flugzeug', 'Auto', 'Zug'], answer: 2 },
      en: { q: 'Which vehicle is famous for being built in Germany?', options: ['Ship', 'Airplane', 'Car', 'Train'], answer: 2 }
    },
    {
      de: { q: 'Welche Farben hat die deutsche Flagge?', options: ['Blau, Weiß, Rot', 'Grün, Weiß, Rot', 'Schwarz, Rot, Gold', 'Blau, Rot, Gelb'], answer: 2 },
      en: { q: 'What colours does the German flag have?', options: ['Blue, white, red', 'Green, white, red', 'Black, red, gold', 'Blue, red, yellow'], answer: 2 }
    }
  ],

  france: [
    {
      de: { q: 'Was ist die Hauptstadt von Frankreich?', options: ['Lyon', 'Marseille', 'Nizza', 'Paris'], answer: 3 },
      en: { q: 'What is the capital of France?', options: ['Lyon', 'Marseille', 'Nice', 'Paris'], answer: 3 }
    },
    {
      de: { q: 'Welcher Turm steht in Paris?', options: ['Big Ben', 'Eiffelturm', 'Freiheitsstatue', 'Kolosseum'], answer: 1 },
      en: { q: 'Which tower stands in Paris?', options: ['Big Ben', 'Eiffel Tower', 'Statue of Liberty', 'Colosseum'], answer: 1 }
    },
    {
      de: { q: 'Was essen Franzosen sehr gerne?', options: ['Pizza', 'Sushi', 'Croissant', 'Taco'], answer: 2 },
      en: { q: 'What do French people love to eat?', options: ['Pizza', 'Sushi', 'Croissant', 'Taco'], answer: 2 }
    },
    {
      de: { q: 'Welche Sprache spricht man in Frankreich?', options: ['Spanisch', 'Italienisch', 'Englisch', 'Französisch'], answer: 3 },
      en: { q: 'What language do people speak in France?', options: ['Spanish', 'Italian', 'English', 'French'], answer: 3 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Frankreich?', options: ['Asien', 'Afrika', 'Europa', 'Amerika'], answer: 2 },
      en: { q: 'On which continent is France located?', options: ['Asia', 'Africa', 'Europe', 'America'], answer: 2 }
    }
  ],

  italy: [
    {
      de: { q: 'Was ist die Hauptstadt von Italien?', options: ['Mailand', 'Venedig', 'Rom', 'Florenz'], answer: 2 },
      en: { q: 'What is the capital of Italy?', options: ['Milan', 'Venice', 'Rome', 'Florence'], answer: 2 }
    },
    {
      de: { q: 'Welches Essen kommt aus Italien?', options: ['Sushi', 'Pizza', 'Tacos', 'Curry'], answer: 1 },
      en: { q: 'Which food comes from Italy?', options: ['Sushi', 'Pizza', 'Tacos', 'Curry'], answer: 1 }
    },
    {
      de: { q: 'Welches berühmte Bauwerk steht in Rom?', options: ['Eiffelturm', 'Big Ben', 'Kolosseum', 'Akropolis'], answer: 2 },
      en: { q: 'Which famous building stands in Rome?', options: ['Eiffel Tower', 'Big Ben', 'Colosseum', 'Acropolis'], answer: 2 }
    },
    {
      de: { q: 'Wie heißt das Eis aus Italien?', options: ['Sorbet', 'Gelato', 'Frozen Yogurt', 'Parfait'], answer: 1 },
      en: { q: 'What is Italian ice cream called?', options: ['Sorbet', 'Gelato', 'Frozen Yogurt', 'Parfait'], answer: 1 }
    },
    {
      de: { q: 'Welche Form hat Italien auf der Landkarte?', options: ['Dreieck', 'Kreis', 'Stiefel', 'Stern'], answer: 2 },
      en: { q: 'What shape does Italy look like on a map?', options: ['Triangle', 'Circle', 'Boot', 'Star'], answer: 2 }
    }
  ],

  spain: [
    {
      de: { q: 'Was ist die Hauptstadt von Spanien?', options: ['Barcelona', 'Sevilla', 'Valencia', 'Madrid'], answer: 3 },
      en: { q: 'What is the capital of Spain?', options: ['Barcelona', 'Seville', 'Valencia', 'Madrid'], answer: 3 }
    },
    {
      de: { q: 'Welches Tier tanzt beim Stierkampf?', options: ['Pferd', 'Stier', 'Esel', 'Ziege'], answer: 1 },
      en: { q: 'Which animal is at the centre of a bullfight?', options: ['Horse', 'Bull', 'Donkey', 'Goat'], answer: 1 }
    },
    {
      de: { q: 'Welche Sprache spricht man in Spanien?', options: ['Portugiesisch', 'Französisch', 'Spanisch', 'Italienisch'], answer: 2 },
      en: { q: 'What language do people speak in Spain?', options: ['Portuguese', 'French', 'Spanish', 'Italian'], answer: 2 }
    },
    {
      de: { q: 'Welchen Tanz tanzt man in Spanien?', options: ['Walzer', 'Tango', 'Flamenco', 'Salsa'], answer: 2 },
      en: { q: 'Which dance is famous in Spain?', options: ['Waltz', 'Tango', 'Flamenco', 'Salsa'], answer: 2 }
    },
    {
      de: { q: 'Welches Meer liegt südlich von Spanien?', options: ['Nordsee', 'Ostsee', 'Mittelmeer', 'Atlantik'], answer: 2 },
      en: { q: 'Which sea is to the south of Spain?', options: ['North Sea', 'Baltic Sea', 'Mediterranean Sea', 'Atlantic Ocean'], answer: 2 }
    }
  ],

  // ── Africa ──────────────────────────────────────────────────────────────────

  egypt: [
    {
      de: { q: 'Was ist die Hauptstadt von Ägypten?', options: ['Kairo', 'Alexandria', 'Luxor', 'Assuan'], answer: 0 },
      en: { q: 'What is the capital of Egypt?', options: ['Cairo', 'Alexandria', 'Luxor', 'Aswan'], answer: 0 }
    },
    {
      de: { q: 'Welches berühmte Bauwerk steht in Ägypten?', options: ['Eiffelturm', 'Pyramiden', 'Kolosseum', 'Taj Mahal'], answer: 1 },
      en: { q: 'Which famous structures are found in Egypt?', options: ['Eiffel Tower', 'Pyramids', 'Colosseum', 'Taj Mahal'], answer: 1 }
    },
    {
      de: { q: 'Welcher große Fluss fließt durch Ägypten?', options: ['Amazonas', 'Mississippi', 'Nil', 'Donau'], answer: 2 },
      en: { q: 'Which great river flows through Egypt?', options: ['Amazon', 'Mississippi', 'Nile', 'Danube'], answer: 2 }
    },
    {
      de: { q: 'Welche Tierfigur bewacht die Pyramiden?', options: ['Drache', 'Löwe', 'Sphinx', 'Adler'], answer: 2 },
      en: { q: 'Which stone figure guards the pyramids?', options: ['Dragon', 'Lion', 'Sphinx', 'Eagle'], answer: 2 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Ägypten?', options: ['Asien', 'Europa', 'Amerika', 'Afrika'], answer: 3 },
      en: { q: 'On which continent is Egypt?', options: ['Asia', 'Europe', 'America', 'Africa'], answer: 3 }
    }
  ],

  kenya: [
    {
      de: { q: 'Was ist die Hauptstadt von Kenia?', options: ['Nairobi', 'Mombasa', 'Kampala', 'Daressalam'], answer: 0 },
      en: { q: 'What is the capital of Kenya?', options: ['Nairobi', 'Mombasa', 'Kampala', 'Dar es Salaam'], answer: 0 }
    },
    {
      de: { q: 'Welches Tier lebt in der Savanne Kenias?', options: ['Pinguin', 'Eisbär', 'Löwe', 'Elch'], answer: 2 },
      en: { q: 'Which animal lives on the Kenyan savanna?', options: ['Penguin', 'Polar bear', 'Lion', 'Moose'], answer: 2 }
    },
    {
      de: { q: 'Was ist das schnellste Tier der Welt — und lebt in Kenia?', options: ['Gepard', 'Pferd', 'Hund', 'Zebra'], answer: 0 },
      en: { q: 'What is the fastest land animal — found in Kenya?', options: ['Cheetah', 'Horse', 'Dog', 'Zebra'], answer: 0 }
    },
    {
      de: { q: 'Welches Streifen-Tier lebt in Kenia?', options: ['Tiger', 'Zebra', 'Biene', 'Barsch'], answer: 1 },
      en: { q: 'Which striped animal lives in Kenya?', options: ['Tiger', 'Zebra', 'Bee', 'Perch'], answer: 1 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Kenia?', options: ['Asien', 'Europa', 'Afrika', 'Australien'], answer: 2 },
      en: { q: 'On which continent is Kenya?', options: ['Asia', 'Europe', 'Africa', 'Australia'], answer: 2 }
    }
  ],

  nigeria: [
    {
      de: { q: 'Was ist die Hauptstadt von Nigeria?', options: ['Lagos', 'Kano', 'Abuja', 'Ibadan'], answer: 2 },
      en: { q: 'What is the capital of Nigeria?', options: ['Lagos', 'Kano', 'Abuja', 'Ibadan'], answer: 2 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Nigeria?', options: ['Asien', 'Afrika', 'Amerika', 'Europa'], answer: 1 },
      en: { q: 'On which continent is Nigeria?', options: ['Asia', 'Africa', 'America', 'Europe'], answer: 1 }
    },
    {
      de: { q: 'Welche Farben hat die nigerianische Flagge?', options: ['Rot und Weiß', 'Grün und Weiß', 'Blau und Gelb', 'Schwarz und Grün'], answer: 1 },
      en: { q: 'What colours does the Nigerian flag have?', options: ['Red and white', 'Green and white', 'Blue and yellow', 'Black and green'], answer: 1 }
    },
    {
      de: { q: 'Welches Tier ist ein Symbol Nigerias?', options: ['Adler', 'Pinguin', 'Panda', 'Känguru'], answer: 0 },
      en: { q: 'Which animal is a symbol of Nigeria?', options: ['Eagle', 'Penguin', 'Panda', 'Kangaroo'], answer: 0 }
    },
    {
      de: { q: 'Welche Sprache wird in Nigeria offiziell gesprochen?', options: ['Französisch', 'Arabisch', 'Englisch', 'Portugiesisch'], answer: 2 },
      en: { q: 'What is the official language of Nigeria?', options: ['French', 'Arabic', 'English', 'Portuguese'], answer: 2 }
    }
  ],

  south_africa: [
    {
      de: { q: 'Welches Tier ist ein Symbol Südafrikas?', options: ['Löwe', 'Springbock', 'Zebra', 'Elefant'], answer: 1 },
      en: { q: 'Which animal is a symbol of South Africa?', options: ['Lion', 'Springbok', 'Zebra', 'Elephant'], answer: 1 }
    },
    {
      de: { q: 'Wie heißt das große Kap am südlichen Ende Afrikas?', options: ['Kap Nord', 'Kap Hoorn', 'Kap der Guten Hoffnung', 'Kap Verde'], answer: 2 },
      en: { q: 'What is the famous cape at the southern tip of Africa?', options: ['Cape North', 'Cape Horn', 'Cape of Good Hope', 'Cape Verde'], answer: 2 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Südafrika?', options: ['Amerika', 'Asien', 'Australien', 'Afrika'], answer: 3 },
      en: { q: 'On which continent is South Africa?', options: ['America', 'Asia', 'Australia', 'Africa'], answer: 3 }
    },
    {
      de: { q: 'Welcher Pinguin lebt in Südafrika?', options: ['Kaiserpinguin', 'Brillenpinguin', 'Zügelpinguin', 'Macaroni-Pinguin'], answer: 1 },
      en: { q: 'Which penguin lives in South Africa?', options: ['Emperor penguin', 'African penguin', 'Chinstrap penguin', 'Macaroni penguin'], answer: 1 }
    },
    {
      de: { q: 'Wie heißt die Regierungshauptstadt Südafrikas?', options: ['Kapstadt', 'Durban', 'Johannesburg', 'Pretoria'], answer: 3 },
      en: { q: 'What is the government capital of South Africa?', options: ['Cape Town', 'Durban', 'Johannesburg', 'Pretoria'], answer: 3 }
    }
  ],

  morocco: [
    {
      de: { q: 'Was ist die Hauptstadt von Marokko?', options: ['Casablanca', 'Marrakesch', 'Rabat', 'Fes'], answer: 2 },
      en: { q: 'What is the capital of Morocco?', options: ['Casablanca', 'Marrakech', 'Rabat', 'Fez'], answer: 2 }
    },
    {
      de: { q: 'Welche Wüste liegt östlich von Marokko?', options: ['Gobi', 'Sahara', 'Atacama', 'Namib'], answer: 1 },
      en: { q: 'Which desert lies to the east of Morocco?', options: ['Gobi', 'Sahara', 'Atacama', 'Namib'], answer: 1 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Marokko?', options: ['Europa', 'Asien', 'Afrika', 'Amerika'], answer: 2 },
      en: { q: 'On which continent is Morocco?', options: ['Europe', 'Asia', 'Africa', 'America'], answer: 2 }
    },
    {
      de: { q: 'Welches Tier transportiert Menschen durch die Wüste?', options: ['Pferd', 'Esel', 'Kamel', 'Elefant'], answer: 2 },
      en: { q: 'Which animal carries people through the desert?', options: ['Horse', 'Donkey', 'Camel', 'Elephant'], answer: 2 }
    },
    {
      de: { q: 'Welche Sprache wird in Marokko gesprochen?', options: ['Französisch', 'Arabisch', 'Spanisch', 'Portugiesisch'], answer: 1 },
      en: { q: 'Which language is spoken in Morocco?', options: ['French', 'Arabic', 'Spanish', 'Portuguese'], answer: 1 }
    }
  ],

  // ── Asia ────────────────────────────────────────────────────────────────────

  china: [
    {
      de: { q: 'Was ist die Hauptstadt von China?', options: ['Shanghai', 'Peking', 'Hongkong', 'Guangzhou'], answer: 1 },
      en: { q: 'What is the capital of China?', options: ['Shanghai', 'Beijing', 'Hong Kong', 'Guangzhou'], answer: 1 }
    },
    {
      de: { q: 'Welches Tier ist das Symbol Chinas?', options: ['Löwe', 'Tiger', 'Panda', 'Drache'], answer: 2 },
      en: { q: 'Which animal is a symbol of China?', options: ['Lion', 'Tiger', 'Panda', 'Dragon'], answer: 2 }
    },
    {
      de: { q: 'Welches berühmte Bauwerk gibt es in China?', options: ['Eiffelturm', 'Große Mauer', 'Kolosseum', 'Taj Mahal'], answer: 1 },
      en: { q: 'Which famous structure is found in China?', options: ['Eiffel Tower', 'Great Wall', 'Colosseum', 'Taj Mahal'], answer: 1 }
    },
    {
      de: { q: 'Was isst man in China mit Stäbchen?', options: ['Pizza', 'Reis', 'Brot', 'Pommes'], answer: 1 },
      en: { q: 'What do people in China eat with chopsticks?', options: ['Pizza', 'Rice', 'Bread', 'Chips'], answer: 1 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt China?', options: ['Afrika', 'Amerika', 'Europa', 'Asien'], answer: 3 },
      en: { q: 'On which continent is China?', options: ['Africa', 'America', 'Europe', 'Asia'], answer: 3 }
    }
  ],

  japan: [
    {
      de: { q: 'Was ist die Hauptstadt von Japan?', options: ['Osaka', 'Kyoto', 'Tokio', 'Hiroshima'], answer: 2 },
      en: { q: 'What is the capital of Japan?', options: ['Osaka', 'Kyoto', 'Tokyo', 'Hiroshima'], answer: 2 }
    },
    {
      de: { q: 'Welches Tier ist ein Symbol Japans?', options: ['Panda', 'Kranich', 'Löwe', 'Känguru'], answer: 1 },
      en: { q: 'Which animal is a symbol of Japan?', options: ['Panda', 'Crane', 'Lion', 'Kangaroo'], answer: 1 }
    },
    {
      de: { q: 'Was isst man in Japan?', options: ['Pizza', 'Sushi', 'Tacos', 'Croissant'], answer: 1 },
      en: { q: 'What do people eat in Japan?', options: ['Pizza', 'Sushi', 'Tacos', 'Croissant'], answer: 1 }
    },
    {
      de: { q: 'Was ist der berühmte Berg in Japan?', options: ['Everest', 'Kilimandscharo', 'Fuji', 'Matterhorn'], answer: 2 },
      en: { q: 'What is the famous mountain in Japan?', options: ['Everest', 'Kilimanjaro', 'Fuji', 'Matterhorn'], answer: 2 }
    },
    {
      de: { q: 'Welche Farbe hat die japanische Flagge?', options: ['Blau und Weiß', 'Rot und Weiß', 'Grün und Weiß', 'Gelb und Rot'], answer: 1 },
      en: { q: 'What colours are on the Japanese flag?', options: ['Blue and white', 'Red and white', 'Green and white', 'Yellow and red'], answer: 1 }
    }
  ],

  thailand: [
    {
      de: { q: 'Was ist die Hauptstadt von Thailand?', options: ['Chiang Mai', 'Phuket', 'Bangkok', 'Pattaya'], answer: 2 },
      en: { q: 'What is the capital of Thailand?', options: ['Chiang Mai', 'Phuket', 'Bangkok', 'Pattaya'], answer: 2 }
    },
    {
      de: { q: 'Welches Tier ist ein nationales Symbol Thailands?', options: ['Löwe', 'Tiger', 'Elefant', 'Drache'], answer: 2 },
      en: { q: 'Which animal is a national symbol of Thailand?', options: ['Lion', 'Tiger', 'Elephant', 'Dragon'], answer: 2 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Thailand?', options: ['Afrika', 'Europa', 'Asien', 'Amerika'], answer: 2 },
      en: { q: 'On which continent is Thailand?', options: ['Africa', 'Europe', 'Asia', 'America'], answer: 2 }
    },
    {
      de: { q: 'Was wächst auf den Feldern in Thailand?', options: ['Weizen', 'Kartoffeln', 'Reis', 'Mais'], answer: 2 },
      en: { q: 'What grows in the fields of Thailand?', options: ['Wheat', 'Potatoes', 'Rice', 'Corn'], answer: 2 }
    },
    {
      de: { q: 'Welche Frucht kommt aus Thailand?', options: ['Apfel', 'Birne', 'Banane', 'Mango'], answer: 3 },
      en: { q: 'Which fruit comes from Thailand?', options: ['Apple', 'Pear', 'Banana', 'Mango'], answer: 3 }
    }
  ],

  india: [
    {
      de: { q: 'Was ist die Hauptstadt von Indien?', options: ['Mumbai', 'Neu-Delhi', 'Bangalore', 'Kolkata'], answer: 1 },
      en: { q: 'What is the capital of India?', options: ['Mumbai', 'New Delhi', 'Bangalore', 'Kolkata'], answer: 1 }
    },
    {
      de: { q: 'Welches berühmte Gebäude steht in Indien?', options: ['Kolosseum', 'Eiffelturm', 'Taj Mahal', 'Große Mauer'], answer: 2 },
      en: { q: 'Which famous building is found in India?', options: ['Colosseum', 'Eiffel Tower', 'Taj Mahal', 'Great Wall'], answer: 2 }
    },
    {
      de: { q: 'Welches Tier ist das Nationaltier Indiens?', options: ['Löwe', 'Elefant', 'Tiger', 'Krokodil'], answer: 2 },
      en: { q: 'Which animal is the national animal of India?', options: ['Lion', 'Elephant', 'Tiger', 'Crocodile'], answer: 2 }
    },
    {
      de: { q: 'Welcher Fluss ist in Indien heilig?', options: ['Nil', 'Amazonas', 'Ganges', 'Mississippi'], answer: 2 },
      en: { q: 'Which river is sacred in India?', options: ['Nile', 'Amazon', 'Ganges', 'Mississippi'], answer: 2 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Indien?', options: ['Afrika', 'Europa', 'Amerika', 'Asien'], answer: 3 },
      en: { q: 'On which continent is India?', options: ['Africa', 'Europe', 'America', 'Asia'], answer: 3 }
    }
  ],

  saudi_arabia: [
    {
      de: { q: 'Was ist die Hauptstadt von Saudi-Arabien?', options: ['Dubai', 'Riad', 'Medina', 'Mekka'], answer: 1 },
      en: { q: 'What is the capital of Saudi Arabia?', options: ['Dubai', 'Riyadh', 'Medina', 'Mecca'], answer: 1 }
    },
    {
      de: { q: 'Welches Tier läuft durch die Wüste Saudi-Arabiens?', options: ['Pferd', 'Zebra', 'Kamel', 'Esel'], answer: 2 },
      en: { q: 'Which animal roams the deserts of Saudi Arabia?', options: ['Horse', 'Zebra', 'Camel', 'Donkey'], answer: 2 }
    },
    {
      de: { q: 'Was liegt unter dem Sand Saudi-Arabiens?', options: ['Gold', 'Diamanten', 'Öl', 'Kohle'], answer: 2 },
      en: { q: 'What lies beneath the sand of Saudi Arabia?', options: ['Gold', 'Diamonds', 'Oil', 'Coal'], answer: 2 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Saudi-Arabien?', options: ['Afrika', 'Europa', 'Asien', 'Amerika'], answer: 2 },
      en: { q: 'On which continent is Saudi Arabia?', options: ['Africa', 'Europe', 'Asia', 'America'], answer: 2 }
    },
    {
      de: { q: 'Welche Landschaft dominiert Saudi-Arabien?', options: ['Dschungel', 'Wüste', 'Regenwald', 'Tundra'], answer: 1 },
      en: { q: 'Which landscape dominates Saudi Arabia?', options: ['Jungle', 'Desert', 'Rainforest', 'Tundra'], answer: 1 }
    }
  ],

  // ── Americas ─────────────────────────────────────────────────────────────────

  argentina: [
    {
      de: { q: 'Was ist die Hauptstadt von Argentinien?', options: ['Rio de Janeiro', 'Santiago', 'Buenos Aires', 'Lima'], answer: 2 },
      en: { q: 'What is the capital of Argentina?', options: ['Rio de Janeiro', 'Santiago', 'Buenos Aires', 'Lima'], answer: 2 }
    },
    {
      de: { q: 'Welchen Tanz tanzt man in Argentinien?', options: ['Samba', 'Flamenco', 'Tango', 'Walzer'], answer: 2 },
      en: { q: 'Which dance is famous in Argentina?', options: ['Samba', 'Flamenco', 'Tango', 'Waltz'], answer: 2 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Argentinien?', options: ['Europa', 'Asien', 'Afrika', 'Südamerika'], answer: 3 },
      en: { q: 'On which continent is Argentina?', options: ['Europe', 'Asia', 'Africa', 'South America'], answer: 3 }
    },
    {
      de: { q: 'Welcher Pinguin lebt in Argentinien?', options: ['Kaiserpinguin', 'Magellan-Pinguin', 'Brillenpinguin', 'Zügelpinguin'], answer: 1 },
      en: { q: 'Which penguin lives in Argentina?', options: ['Emperor penguin', 'Magellanic penguin', 'African penguin', 'Chinstrap penguin'], answer: 1 }
    },
    {
      de: { q: 'Was ist Argentiniens berühmtester Sport?', options: ['Basketball', 'Tennis', 'Fußball', 'Rugby'], answer: 2 },
      en: { q: 'What is Argentina\'s most famous sport?', options: ['Basketball', 'Tennis', 'Football', 'Rugby'], answer: 2 }
    }
  ],

  brazil: [
    {
      de: { q: 'Was ist die Hauptstadt von Brasilien?', options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'], answer: 2 },
      en: { q: 'What is the capital of Brazil?', options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'], answer: 2 }
    },
    {
      de: { q: 'Welcher große Regenwald liegt in Brasilien?', options: ['Kongo', 'Amazonas', 'Borneo', 'Daintree'], answer: 1 },
      en: { q: 'Which great rainforest is in Brazil?', options: ['Congo', 'Amazon', 'Borneo', 'Daintree'], answer: 1 }
    },
    {
      de: { q: 'Welches Tier lebt im Amazonas?', options: ['Krokodil', 'Eisbär', 'Känguru', 'Panda'], answer: 0 },
      en: { q: 'Which animal lives in the Amazon?', options: ['Caiman', 'Polar bear', 'Kangaroo', 'Panda'], answer: 0 }
    },
    {
      de: { q: 'Welchen Tanz tanzt man beim Karneval in Rio?', options: ['Tango', 'Walzer', 'Samba', 'Flamenco'], answer: 2 },
      en: { q: 'Which dance is performed at the Rio Carnival?', options: ['Tango', 'Waltz', 'Samba', 'Flamenco'], answer: 2 }
    },
    {
      de: { q: 'Welche Sprache spricht man in Brasilien?', options: ['Spanisch', 'Englisch', 'Portugiesisch', 'Französisch'], answer: 2 },
      en: { q: 'What language do people speak in Brazil?', options: ['Spanish', 'English', 'Portuguese', 'French'], answer: 2 }
    }
  ],

  canada: [
    {
      de: { q: 'Was ist die Hauptstadt von Kanada?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], answer: 2 },
      en: { q: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], answer: 2 }
    },
    {
      de: { q: 'Was ist auf der kanadischen Flagge abgebildet?', options: ['Adler', 'Ahornblatt', 'Bär', 'Biber'], answer: 1 },
      en: { q: 'What is shown on the Canadian flag?', options: ['Eagle', 'Maple leaf', 'Bear', 'Beaver'], answer: 1 }
    },
    {
      de: { q: 'Welches Tier ist ein Symbol Kanadas?', options: ['Adler', 'Biber', 'Grizzlybär', 'Elch'], answer: 1 },
      en: { q: 'Which animal is a symbol of Canada?', options: ['Eagle', 'Beaver', 'Grizzly bear', 'Moose'], answer: 1 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Kanada?', options: ['Europa', 'Asien', 'Nordamerika', 'Südamerika'], answer: 2 },
      en: { q: 'On which continent is Canada?', options: ['Europe', 'Asia', 'North America', 'South America'], answer: 2 }
    },
    {
      de: { q: 'Was wird in Kanada aus Ahornbäumen gemacht?', options: ['Honig', 'Ahornsirup', 'Marmelade', 'Saft'], answer: 1 },
      en: { q: 'What is made from maple trees in Canada?', options: ['Honey', 'Maple syrup', 'Jam', 'Juice'], answer: 1 }
    }
  ],

  usa: [
    {
      de: { q: 'Was ist die Hauptstadt der USA?', options: ['New York', 'Los Angeles', 'Washington D.C.', 'Chicago'], answer: 2 },
      en: { q: 'What is the capital of the USA?', options: ['New York', 'Los Angeles', 'Washington D.C.', 'Chicago'], answer: 2 }
    },
    {
      de: { q: 'Welche berühmte Statue steht in New York?', options: ['Eiffelturm', 'Freiheitsstatue', 'Kolosseum', 'Taj Mahal'], answer: 1 },
      en: { q: 'Which famous statue stands in New York?', options: ['Eiffel Tower', 'Statue of Liberty', 'Colosseum', 'Taj Mahal'], answer: 1 }
    },
    {
      de: { q: 'Welches Tier ist das Symbol der USA?', options: ['Adler', 'Bison', 'Bär', 'Wolf'], answer: 0 },
      en: { q: 'Which animal is the symbol of the USA?', options: ['Eagle', 'Bison', 'Bear', 'Wolf'], answer: 0 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegen die USA?', options: ['Europa', 'Asien', 'Nordamerika', 'Südamerika'], answer: 2 },
      en: { q: 'On which continent are the USA?', options: ['Europe', 'Asia', 'North America', 'South America'], answer: 2 }
    },
    {
      de: { q: 'Wie viele Sterne hat die US-Flagge?', options: ['13', '50', '48', '52'], answer: 1 },
      en: { q: 'How many stars are on the US flag?', options: ['13', '50', '48', '52'], answer: 1 }
    }
  ],

  mexico: [
    {
      de: { q: 'Was ist die Hauptstadt von Mexiko?', options: ['Guadalajara', 'Cancún', 'Mexiko-Stadt', 'Monterrey'], answer: 2 },
      en: { q: 'What is the capital of Mexico?', options: ['Guadalajara', 'Cancún', 'Mexico City', 'Monterrey'], answer: 2 }
    },
    {
      de: { q: 'Was isst man in Mexiko?', options: ['Sushi', 'Pasta', 'Taco', 'Croissant'], answer: 2 },
      en: { q: 'What do people eat in Mexico?', options: ['Sushi', 'Pasta', 'Taco', 'Croissant'], answer: 2 }
    },
    {
      de: { q: 'Welches Tier ist auf der mexikanischen Flagge?', options: ['Löwe', 'Adler', 'Schlange', 'Kondor'], answer: 1 },
      en: { q: 'Which animal is on the Mexican flag?', options: ['Lion', 'Eagle', 'Snake', 'Condor'], answer: 1 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Mexiko?', options: ['Südamerika', 'Europa', 'Nordamerika', 'Asien'], answer: 2 },
      en: { q: 'On which continent is Mexico?', options: ['South America', 'Europe', 'North America', 'Asia'], answer: 2 }
    },
    {
      de: { q: 'Welche Pflanze wächst in der mexikanischen Wüste?', options: ['Palme', 'Kaktus', 'Birke', 'Bambus'], answer: 1 },
      en: { q: 'Which plant grows in the Mexican desert?', options: ['Palm tree', 'Cactus', 'Birch tree', 'Bamboo'], answer: 1 }
    }
  ],

  // ── Oceania ──────────────────────────────────────────────────────────────────

  australia: [
    {
      de: { q: 'Was ist die Hauptstadt von Australien?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], answer: 2 },
      en: { q: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], answer: 2 }
    },
    {
      de: { q: 'Welches Tier trägt sein Baby im Beutel?', options: ['Koala', 'Känguru', 'Wombat', 'Quokka'], answer: 1 },
      en: { q: 'Which animal carries its baby in a pouch?', options: ['Koala', 'Kangaroo', 'Wombat', 'Quokka'], answer: 1 }
    },
    {
      de: { q: 'Welches Tier sitzt im Eukalyptusbaum?', options: ['Känguru', 'Dingo', 'Koala', 'Tasmanischer Teufel'], answer: 2 },
      en: { q: 'Which animal sits in eucalyptus trees?', options: ['Kangaroo', 'Dingo', 'Koala', 'Tasmanian devil'], answer: 2 }
    },
    {
      de: { q: 'Auf welchem Kontinent liegt Australien?', options: ['Asien', 'Afrika', 'Amerika', 'Australien/Ozeanien'], answer: 3 },
      en: { q: 'On which continent is Australia?', options: ['Asia', 'Africa', 'America', 'Australia/Oceania'], answer: 3 }
    },
    {
      de: { q: 'Welches berühmte Felsmassiv steht in Australien?', options: ['Grand Canyon', 'Uluru', 'Tafelberg', 'Mount Everest'], answer: 1 },
      en: { q: 'Which famous rock stands in Australia?', options: ['Grand Canyon', 'Uluru', 'Table Mountain', 'Mount Everest'], answer: 1 }
    }
  ],

  fiji: [
    {
      de: { q: 'Was ist die Hauptstadt von Fidschi?', options: ['Suva', 'Nadi', 'Lautoka', 'Labasa'], answer: 0 },
      en: { q: 'What is the capital of Fiji?', options: ['Suva', 'Nadi', 'Lautoka', 'Labasa'], answer: 0 }
    },
    {
      de: { q: 'Wie heißt die Inselgruppe, zu der Fidschi gehört?', options: ['Karibik', 'Mittelmeer', 'Pazifik', 'Indischer Ozean'], answer: 2 },
      en: { q: 'Which ocean is Fiji located in?', options: ['Caribbean', 'Mediterranean', 'Pacific', 'Indian Ocean'], answer: 2 }
    },
    {
      de: { q: 'Auf welchem Kontinent/Region liegt Fidschi?', options: ['Asien', 'Afrika', 'Ozeanien', 'Amerika'], answer: 2 },
      en: { q: 'In which region is Fiji located?', options: ['Asia', 'Africa', 'Oceania', 'America'], answer: 2 }
    },
    {
      de: { q: 'Was findet man rund um die Inseln Fidschis?', options: ['Wüste', 'Korallenriffe', 'Gletscher', 'Wälder'], answer: 1 },
      en: { q: 'What surrounds the islands of Fiji?', options: ['Desert', 'Coral reefs', 'Glaciers', 'Forests'], answer: 1 }
    },
    {
      de: { q: 'Was trinkt man auf Fidschi als traditionelles Getränk?', options: ['Tee', 'Kaffee', 'Kava', 'Kakao'], answer: 2 },
      en: { q: 'What traditional drink is popular in Fiji?', options: ['Tea', 'Coffee', 'Kava', 'Cocoa'], answer: 2 }
    }
  ],

  new_zealand: [
    {
      de: { q: 'Was ist die Hauptstadt von Neuseeland?', options: ['Auckland', 'Christchurch', 'Wellington', 'Dunedin'], answer: 2 },
      en: { q: 'What is the capital of New Zealand?', options: ['Auckland', 'Christchurch', 'Wellington', 'Dunedin'], answer: 2 }
    },
    {
      de: { q: 'Welcher flugunfähige Vogel ist das Symbol Neuseelands?', options: ['Pinguin', 'Strauß', 'Kiwi', 'Emu'], answer: 2 },
      en: { q: 'Which flightless bird is the symbol of New Zealand?', options: ['Penguin', 'Ostrich', 'Kiwi', 'Emu'], answer: 2 }
    },
    {
      de: { q: 'Welcher Volksstamm lebt seit Jahrhunderten in Neuseeland?', options: ['Azteken', 'Maori', 'Inuit', 'Aborigines'], answer: 1 },
      en: { q: 'Which indigenous people have lived in New Zealand for centuries?', options: ['Aztecs', 'Maori', 'Inuit', 'Aborigines'], answer: 1 }
    },
    {
      de: { q: 'In welchem Ozean liegt Neuseeland?', options: ['Atlantik', 'Arktis', 'Indischer Ozean', 'Pazifik'], answer: 3 },
      en: { q: 'In which ocean is New Zealand located?', options: ['Atlantic', 'Arctic', 'Indian Ocean', 'Pacific'], answer: 3 }
    },
    {
      de: { q: 'Auf welchem Kontinent/Region liegt Neuseeland?', options: ['Asien', 'Afrika', 'Ozeanien', 'Amerika'], answer: 2 },
      en: { q: 'In which region is New Zealand?', options: ['Asia', 'Africa', 'Oceania', 'America'], answer: 2 }
    }
  ]
};
