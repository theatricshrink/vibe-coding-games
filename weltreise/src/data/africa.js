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
        },
        {
          de: { q: 'Welcher berühmte ägyptische See liegt südlich von Kairo?', options: ['Assuan-Stausee', 'Nasser-See', 'Qarun-See', 'Manzala-See'], answer: 1 },
          en: { q: 'Which famous Egyptian lake lies south of Aswan?', options: ['Aswan Reservoir', 'Lake Nasser', 'Lake Qarun', 'Lake Manzala'], answer: 1 }
        },
        {
          de: { q: 'Wer war die berühmteste Pharaonin des alten Ägyptens?', options: ['Nofretete', 'Hatschepsut', 'Kleopatra', 'Isis'], answer: 2 },
          en: { q: 'Who was the most famous female ruler of ancient Egypt?', options: ['Nefertiti', 'Hatshepsut', 'Cleopatra', 'Isis'], answer: 2 }
        },
        {
          de: { q: 'In welcher Wüste liegt der größte Teil Ägyptens?', options: ['Kalahari', 'Arabische Wüste', 'Sahara', 'Nubische Wüste'], answer: 2 },
          en: { q: 'In which desert does most of Egypt lie?', options: ['Kalahari', 'Arabian Desert', 'Sahara', 'Nubian Desert'], answer: 2 }
        },
        {
          de: { q: 'Welcher Kanal verbindet das Mittelmeer mit dem Roten Meer?', options: ['Panamakanal', 'Korinthkanal', 'Suezkanal', 'Kielkanal'], answer: 2 },
          en: { q: 'Which canal connects the Mediterranean Sea to the Red Sea?', options: ['Panama Canal', 'Corinth Canal', 'Suez Canal', 'Kiel Canal'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der ägyptische Tempel, der beim Bau des Assuan-Staudamms versetzt wurde?', options: ['Karnak', 'Luxor', 'Abu Simbel', 'Philae'], answer: 2 },
          en: { q: 'Which Egyptian temple was relocated when the Aswan Dam was built?', options: ['Karnak', 'Luxor', 'Abu Simbel', 'Philae'], answer: 2 }
        },
        {
          de: { q: 'Was ist das Nationalgericht Ägyptens?', options: ['Falafel', 'Kushari', 'Hummus', 'Schawarma'], answer: 1 },
          en: { q: 'What is the national dish of Egypt?', options: ['Falafel', 'Koshari', 'Hummus', 'Shawarma'], answer: 1 }
        },
        {
          de: { q: 'Welche Stadt gilt als das antike "Hunderttorige Theben"?', options: ['Kairo', 'Alexandria', 'Luxor', 'Aswan'], answer: 2 },
          en: { q: 'Which city is known as ancient "Thebes of the Hundred Gates"?', options: ['Cairo', 'Alexandria', 'Luxor', 'Aswan'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der Gott der Toten im alten Ägypten?', options: ['Ra', 'Horus', 'Osiris', 'Anubis'], answer: 2 },
          en: { q: 'Who was the god of the dead in ancient Egypt?', options: ['Ra', 'Horus', 'Osiris', 'Anubis'], answer: 2 }
        },
        {
          de: { q: 'Welche Meere grenzen an Ägypten?', options: ['Mittelmeer und Rotes Meer', 'Mittelmeer und Arabisches Meer', 'Rotes Meer und Indischer Ozean', 'Schwarzes Meer und Rotes Meer'], answer: 0 },
          en: { q: 'Which seas border Egypt?', options: ['Mediterranean Sea and Red Sea', 'Mediterranean Sea and Arabian Sea', 'Red Sea and Indian Ocean', 'Black Sea and Red Sea'], answer: 0 }
        },
        {
          de: { q: 'Welcher ägyptische Präsident nationalisierte 1956 den Suezkanal?', options: ['Mubarak', 'Sadat', 'Nasser', 'Farouk'], answer: 2 },
          en: { q: 'Which Egyptian president nationalized the Suez Canal in 1956?', options: ['Mubarak', 'Sadat', 'Nasser', 'Farouk'], answer: 2 }
        },
        {
          de: { q: 'Welches Land liegt direkt östlich von Ägypten auf der Sinai-Halbinsel?', options: ['Jordanien', 'Libyen', 'Israel', 'Saudi-Arabien'], answer: 2 },
          en: { q: 'Which country lies directly east of Egypt across the Sinai Peninsula?', options: ['Jordan', 'Libya', 'Israel', 'Saudi Arabia'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der größte koptisch-orthodoxe Feiertag in Ägypten?', options: ['Eid al-Fitr', 'Scham el-Nassim', 'Kopawa', 'Timkat'], answer: 3 },
          en: { q: 'What is the most important Coptic Orthodox feast in Egypt?', options: ['Eid al-Fitr', 'Sham el-Nessim', 'Kopawa', 'Timkat'], answer: 3 }
        },
        {
          de: { q: 'Wie viele Wunder der Antike stehen noch in Ägypten?', options: ['Keines', 'Eines', 'Zwei', 'Drei'], answer: 1 },
          en: { q: 'How many Wonders of the Ancient World still stand in Egypt?', options: ['None', 'One', 'Two', 'Three'], answer: 1 }
        },
        {
          de: { q: 'Welche ägyptische Stadt liegt am Mittelmeer und wurde von Alexander dem Großen gegründet?', options: ['Port Said', 'Damietta', 'Alexandria', 'Rosetta'], answer: 2 },
          en: { q: 'Which Egyptian city on the Mediterranean was founded by Alexander the Great?', options: ['Port Said', 'Damietta', 'Alexandria', 'Rosetta'], answer: 2 }
        },
        {
          de: { q: 'Was ist der Hauptexportartikel Ägyptens?', options: ['Kaffee', 'Erdöl und Erdgas', 'Baumwolle', 'Gold'], answer: 1 },
          en: { q: 'What is the main export of Egypt?', options: ['Coffee', 'Petroleum and natural gas', 'Cotton', 'Gold'], answer: 1 }
        },
        {
          de: { q: 'Welcher berühmte ägyptische Fußballklub ist der erfolgreichste in Afrika?', options: ['Zamalek SC', 'Al-Ahly SC', 'Ismaily SC', 'Al-Masry'], answer: 1 },
          en: { q: 'Which famous Egyptian football club is the most successful in Africa?', options: ['Zamalek SC', 'Al-Ahly SC', 'Ismaily SC', 'Al-Masry'], answer: 1 }
        },
        {
          de: { q: 'Was bedeutet das Wort "Pharao"?', options: ['Krieger', 'Großes Haus', 'Sohn des Ra', 'Ewiger Herrscher'], answer: 1 },
          en: { q: 'What does the word "Pharaoh" mean?', options: ['Warrior', 'Great House', 'Son of Ra', 'Eternal Ruler'], answer: 1 }
        },
        {
          de: { q: 'Welcher Stein ermöglichte die Entzifferung der Hieroglyphen?', options: ['Bernstein', 'Stein von Rosette', 'Onyx-Tafel', 'Emerald-Stein'], answer: 1 },
          en: { q: 'Which stone enabled the decipherment of hieroglyphics?', options: ['Amber Stone', 'Rosetta Stone', 'Onyx Tablet', 'Emerald Stone'], answer: 1 }
        },
        {
          de: { q: 'Welche Halbinsel gehört zu Ägypten?', options: ['Arabische Halbinsel', 'Sinai-Halbinsel', 'Krim-Halbinsel', 'Iberische Halbinsel'], answer: 1 },
          en: { q: 'Which peninsula belongs to Egypt?', options: ['Arabian Peninsula', 'Sinai Peninsula', 'Crimean Peninsula', 'Iberian Peninsula'], answer: 1 }
        },
        {
          de: { q: 'In welchem Jahrhundert wurde die Große Pyramide von Gizeh erbaut?', options: ['15. Jahrhundert v. Chr.', '26. Jahrhundert v. Chr.', '10. Jahrhundert v. Chr.', '3. Jahrhundert n. Chr.'], answer: 1 },
          en: { q: 'In which century was the Great Pyramid of Giza built?', options: ['15th century BC', '26th century BC', '10th century BC', '3rd century AD'], answer: 1 }
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
        },
        {
          de: { q: 'Welcher See liegt auf der Grenze zwischen Kenia und Uganda?', options: ['Tanganjikasee', 'Malawisee', 'Victoriasee', 'Turkana-See'], answer: 2 },
          en: { q: 'Which lake lies on the border between Kenya and Uganda?', options: ['Lake Tanganyika', 'Lake Malawi', 'Lake Victoria', 'Lake Turkana'], answer: 2 }
        },
        {
          de: { q: 'Welches Volk ist bekannt für seine Krieger-Tradition und lebt in Kenia und Tansania?', options: ['Kikuyu', 'Zulu', 'Maasai', 'Yoruba'], answer: 2 },
          en: { q: 'Which people known for their warrior tradition live in Kenya and Tanzania?', options: ['Kikuyu', 'Zulu', 'Maasai', 'Yoruba'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die jährliche Tierwanderung, die durch Kenia führt?', options: ['Große Karawane', 'Große Migration', 'Savannenzug', 'Nilwanderung'], answer: 1 },
          en: { q: 'What is the annual animal migration that passes through Kenya called?', options: ['Great Caravan', 'Great Migration', 'Savanna Trek', 'Nile Migration'], answer: 1 }
        },
        {
          de: { q: 'In welcher kenianischen Stadt liegt der wichtigste Hafen?', options: ['Nairobi', 'Kisumu', 'Nakuru', 'Mombasa'], answer: 3 },
          en: { q: 'In which Kenyan city is the most important port located?', options: ['Nairobi', 'Kisumu', 'Nakuru', 'Mombasa'], answer: 3 }
        },
        {
          de: { q: 'Was ist der wichtigste Exportartikel Kenias?', options: ['Kakao', 'Kaffee und Tee', 'Erdöl', 'Diamanten'], answer: 1 },
          en: { q: 'What is Kenya\'s most important export?', options: ['Cocoa', 'Coffee and tea', 'Petroleum', 'Diamonds'], answer: 1 }
        },
        {
          de: { q: 'Kenia liegt in welchem geographischen Bereich?', options: ['Südliches Afrika', 'Westafrika', 'Ostafrika', 'Nordafrika'], answer: 2 },
          en: { q: 'Kenya is located in which geographical region?', options: ['Southern Africa', 'West Africa', 'East Africa', 'North Africa'], answer: 2 }
        },
        {
          de: { q: 'Wer war Kenias erster Präsident nach der Unabhängigkeit?', options: ['Daniel arap Moi', 'Uhuru Kenyatta', 'Jomo Kenyatta', 'Raila Odinga'], answer: 2 },
          en: { q: 'Who was Kenya\'s first president after independence?', options: ['Daniel arap Moi', 'Uhuru Kenyatta', 'Jomo Kenyatta', 'Raila Odinga'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr wurde Kenia unabhängig von Großbritannien?', options: ['1957', '1960', '1963', '1968'], answer: 2 },
          en: { q: 'In which year did Kenya gain independence from Britain?', options: ['1957', '1960', '1963', '1968'], answer: 2 }
        },
        {
          de: { q: 'Welches kenianische Nationalparktier steht auf der Flagge?', options: ['Elefant', 'Löwe', 'Maasai-Schild und Speere', 'Gepard'], answer: 2 },
          en: { q: 'What Kenyan national symbol appears on the flag?', options: ['Elephant', 'Lion', 'Maasai shield and spears', 'Cheetah'], answer: 2 }
        },
        {
          de: { q: 'Welcher kenianische Langstreckenläufer gilt als einer der größten der Geschichte?', options: ['Haile Gebrselassie', 'Eliud Kipchoge', 'Mo Farah', 'Kenenisa Bekele'], answer: 1 },
          en: { q: 'Which Kenyan long-distance runner is considered one of the greatest ever?', options: ['Haile Gebrselassie', 'Eliud Kipchoge', 'Mo Farah', 'Kenenisa Bekele'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt das traditionelle kenianische fermentierte Maisbiergetränk?', options: ['Ugali', 'Chang\'aa', 'Busaa', 'Uji'], answer: 2 },
          en: { q: 'What is the traditional Kenyan fermented maize beer called?', options: ['Ugali', 'Chang\'aa', 'Busaa', 'Uji'], answer: 2 }
        },
        {
          de: { q: 'Was ist das Grundnahrungsmittel in Kenia, ein Maisbrei?', options: ['Injera', 'Jollof', 'Ugali', 'Fufu'], answer: 2 },
          en: { q: 'What is the staple food in Kenya, a maize porridge?', options: ['Injera', 'Jollof', 'Ugali', 'Fufu'], answer: 2 }
        },
        {
          de: { q: 'Der Äquator verläuft durch welches Land?', options: ['Tansania', 'Uganda', 'Kenia', 'Äthiopien'], answer: 2 },
          en: { q: 'The equator passes through which country?', options: ['Tanzania', 'Uganda', 'Kenya', 'Ethiopia'], answer: 2 }
        },
        {
          de: { q: 'Welches ist die größte ethnische Gruppe Kenias?', options: ['Luo', 'Kalenjin', 'Kikuyu', 'Luhya'], answer: 2 },
          en: { q: 'Which is the largest ethnic group in Kenya?', options: ['Luo', 'Kalenjin', 'Kikuyu', 'Luhya'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das bedeutende UNESCO-Weltkulturerbe an der kenianischen Küste?', options: ['Kilwa Kisiwani', 'Malindi', 'Lamu-Altstadt', 'Mombasa-Fort'], answer: 2 },
          en: { q: 'What is the important UNESCO World Heritage site on the Kenyan coast?', options: ['Kilwa Kisiwani', 'Malindi', 'Lamu Old Town', 'Mombasa Fort'], answer: 2 }
        },
        {
          de: { q: 'Welcher Ostafrikanische Graben verläuft durch Kenia?', options: ['Westafrikanischer Graben', 'Zentralafrikanischer Graben', 'Ostafrikanischer Grabenbruch', 'Nubischer Graben'], answer: 2 },
          en: { q: 'Which rift valley runs through Kenya?', options: ['West African Rift', 'Central African Rift', 'East African Rift Valley', 'Nubian Rift'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die Nobelpreisträgerin aus Kenia, bekannt für Aufforstung?', options: ['Leymah Gbowee', 'Wangari Maathai', 'Nawal El Saadawi', 'Chimamanda Adichie'], answer: 1 },
          en: { q: 'Which Kenyan Nobel Prize winner is known for reforestation efforts?', options: ['Leymah Gbowee', 'Wangari Maathai', 'Nawal El Saadawi', 'Chimamanda Adichie'], answer: 1 }
        },
        {
          de: { q: 'Welcher Ozean grenzt an Kenia im Osten?', options: ['Atlantischer Ozean', 'Pazifischer Ozean', 'Indischer Ozean', 'Arktischer Ozean'], answer: 2 },
          en: { q: 'Which ocean borders Kenya to the east?', options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'], answer: 2 }
        },
        {
          de: { q: 'Was ist die Hauptattraktion des Amboseli-Nationalparks?', options: ['Gorillas', 'Flamingos', 'Blick auf den Kilimandscharo', 'Nilpferde'], answer: 2 },
          en: { q: 'What is the main attraction of Amboseli National Park?', options: ['Gorillas', 'Flamingos', 'View of Kilimanjaro', 'Hippos'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt befindet sich die Börse Kenias?', options: ['Mombasa', 'Kisumu', 'Nairobi', 'Nakuru'], answer: 2 },
          en: { q: 'In which city is the Kenyan stock exchange located?', options: ['Mombasa', 'Kisumu', 'Nairobi', 'Nakuru'], answer: 2 }
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
        },
        {
          de: { q: 'Welches Gebirge durchzieht Marokko?', options: ['Drakensberg', 'Äthiopisches Hochland', 'Atlas', 'Tibesti'], answer: 2 },
          en: { q: 'Which mountain range runs through Morocco?', options: ['Drakensberg', 'Ethiopian Highlands', 'Atlas Mountains', 'Tibesti'], answer: 2 }
        },
        {
          de: { q: 'Was ist die Amtssprache Marokkos?', options: ['Französisch und Spanisch', 'Arabisch und Tamazight', 'Arabisch und Französisch', 'Berberisch und Spanisch'], answer: 1 },
          en: { q: 'What are the official languages of Morocco?', options: ['French and Spanish', 'Arabic and Tamazight', 'Arabic and French', 'Berber and Spanish'], answer: 1 }
        },
        {
          de: { q: 'Welches berühmte Gericht ist der nationale Eintopf Marokkos?', options: ['Couscous', 'Tajine', 'Harira', 'Bastilla'], answer: 1 },
          en: { q: 'Which famous dish is Morocco\'s national stew?', options: ['Couscous', 'Tagine', 'Harira', 'Bastilla'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der König von Marokko (Stand 2024)?', options: ['Hassan III.', 'Mohammed VI.', 'Abdullah II.', 'Salman'], answer: 1 },
          en: { q: 'What is the name of Morocco\'s king (as of 2024)?', options: ['Hassan III', 'Mohammed VI', 'Abdullah II', 'Salman'], answer: 1 }
        },
        {
          de: { q: 'Welche zwei europäischen Meere grenzen an Marokko?', options: ['Nordsee und Ostsee', 'Mittelmeer und Atlantik', 'Adria und Ägäis', 'Schwarzes Meer und Mittelmeer'], answer: 1 },
          en: { q: 'Which two bodies of water border Morocco?', options: ['North Sea and Baltic Sea', 'Mediterranean Sea and Atlantic Ocean', 'Adriatic Sea and Aegean Sea', 'Black Sea and Mediterranean'], answer: 1 }
        },
        {
          de: { q: 'In welcher Stadt liegt die älteste Universität der Welt, die Universität al-Qarawiyyin?', options: ['Rabat', 'Marrakesch', 'Casablanca', 'Fes'], answer: 3 },
          en: { q: 'In which city is the world\'s oldest university, the University of al-Qarawiyyin, located?', options: ['Rabat', 'Marrakesh', 'Casablanca', 'Fes'], answer: 3 }
        },
        {
          de: { q: 'Welche Farbe dominiert die Architektur der Altstadt von Marrakesch?', options: ['Weiß', 'Blau', 'Rot/Ocker', 'Gelb'], answer: 2 },
          en: { q: 'What color dominates the architecture of Marrakesh\'s old city?', options: ['White', 'Blue', 'Red/Ochre', 'Yellow'], answer: 2 }
        },
        {
          de: { q: 'Welches marokkanische Volk ist eines der ältesten Nordafrikas?', options: ['Araber', 'Tuareg', 'Berber (Amazigh)', 'Phönizier'], answer: 2 },
          en: { q: 'Which Moroccan people are among the oldest in North Africa?', options: ['Arabs', 'Tuareg', 'Berbers (Amazigh)', 'Phoenicians'], answer: 2 }
        },
        {
          de: { q: 'Für welches Produkt ist die marokkanische Stadt Essaouira bekannt?', options: ['Safran', 'Arganöl', 'Rosenöl', 'Olivenöl'], answer: 1 },
          en: { q: 'What product is the Moroccan city of Essaouira known for?', options: ['Saffron', 'Argan oil', 'Rose oil', 'Olive oil'], answer: 1 }
        },
        {
          de: { q: 'In welchem Jahr qualifizierte sich Marokko erstmals für das WM-Halbfinale?', options: ['1986', '1998', '2022', '2018'], answer: 2 },
          en: { q: 'In which year did Morocco first qualify for a World Cup semi-final?', options: ['1986', '1998', '2022', '2018'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der Hauptplatz in Marrakesch?', options: ['Place Mohammed V', 'Djemaa el-Fna', 'Bab Doukkala', 'Place des Nations'], answer: 1 },
          en: { q: 'What is the name of the main square in Marrakesh?', options: ['Place Mohammed V', 'Djemaa el-Fna', 'Bab Doukkala', 'Place des Nations'], answer: 1 }
        },
        {
          de: { q: 'Welche spanischen Enklaven liegen auf marokkanischem Territorium?', options: ['Gibraltar und Ibiza', 'Ceuta und Melilla', 'Teneriffa und Lanzarote', 'Palma und Ceuta'], answer: 1 },
          en: { q: 'Which Spanish enclaves are located on Moroccan territory?', options: ['Gibraltar and Ibiza', 'Ceuta and Melilla', 'Tenerife and Lanzarote', 'Palma and Ceuta'], answer: 1 }
        },
        {
          de: { q: 'Was ist das traditionelle marokkanische Badehaus?', options: ['Riad', 'Hammam', 'Kasbah', 'Medina'], answer: 1 },
          en: { q: 'What is the traditional Moroccan bathhouse called?', options: ['Riad', 'Hammam', 'Kasbah', 'Medina'], answer: 1 }
        },
        {
          de: { q: 'Welches Kap ist die nördlichste Spitze Afrikas und liegt in Marokko?', options: ['Kap Spartel', 'Kap Bon', 'Kap Blanco', 'Kap Malabata'], answer: 0 },
          en: { q: 'Which cape is the northernmost point of Africa and lies in Morocco?', options: ['Cape Spartel', 'Cape Bon', 'Cape Blanco', 'Cape Malabata'], answer: 0 }
        },
        {
          de: { q: 'Wie heißt das traditionelle marokkanische Gewand für Männer?', options: ['Caftan', 'Djellaba', 'Burnous', 'Gandoura'], answer: 1 },
          en: { q: 'What is the traditional Moroccan full-length robe worn by men called?', options: ['Caftan', 'Djellaba', 'Burnous', 'Gandoura'], answer: 1 }
        },
        {
          de: { q: 'Wofür ist Marokko weltweit der größte Exporteur?', options: ['Olivenöl', 'Phosphat', 'Safran', 'Arganöl'], answer: 1 },
          en: { q: 'What is Morocco the world\'s largest exporter of?', options: ['Olive oil', 'Phosphate', 'Saffron', 'Argan oil'], answer: 1 }
        },
        {
          de: { q: 'Welcher Fluss bildet die Grenze zwischen Marokko und Algerien im Westen?', options: ['Draa', 'Moulouya', 'Sebou', 'Oum Er-Rbia'], answer: 1 },
          en: { q: 'Which river forms the border between Morocco and Algeria in the west?', options: ['Draa', 'Moulouya', 'Sebou', 'Oum Er-Rbia'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg Marokkos?', options: ['Jbel Siroua', 'Jbel Toubkal', 'Jbel Ayachi', 'Jbel Bou Iblane'], answer: 1 },
          en: { q: 'What is the highest mountain in Morocco?', options: ['Jbel Siroua', 'Jbel Toubkal', 'Jbel Ayachi', 'Jbel Bou Iblane'], answer: 1 }
        },
        {
          de: { q: 'Welches marokkanische Getränk ist bekannt als "marokkanisches Whisky"?', options: ['Kaffee', 'Orangensaft', 'Minztee', 'Harira'], answer: 2 },
          en: { q: 'Which Moroccan drink is known as "Moroccan whisky"?', options: ['Coffee', 'Orange juice', 'Mint tea', 'Harira'], answer: 2 }
        },
        {
          de: { q: 'Was ist "Chefchaouen" in Marokko bekannt für?', options: ['Rote Gebäude', 'Blaue Gebäude', 'Weiße Strände', 'Gelbe Märkte'], answer: 1 },
          en: { q: 'What is Chefchaouen in Morocco famous for?', options: ['Red buildings', 'Blue buildings', 'White beaches', 'Yellow markets'], answer: 1 }
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
        },
        {
          de: { q: 'Welche beiden Flüsse geben Nigeria seinen Namen?', options: ['Volta und Kongo', 'Niger und Benue', 'Niger und Sambesi', 'Kongo und Benue'], answer: 1 },
          en: { q: 'Which two rivers give Nigeria its name?', options: ['Volta and Congo', 'Niger and Benue', 'Niger and Zambezi', 'Congo and Benue'], answer: 1 }
        },
        {
          de: { q: 'Nigeria liegt in welchem Teil Afrikas?', options: ['Ostafrika', 'Südafrika', 'Westafrika', 'Nordafrika'], answer: 2 },
          en: { q: 'Nigeria is located in which part of Africa?', options: ['East Africa', 'Southern Africa', 'West Africa', 'North Africa'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die nigerianische Filmbranche?', options: ['Bollywood', 'Nollywood', 'Lagoswood', 'Abujawood'], answer: 1 },
          en: { q: 'What is the Nigerian film industry called?', options: ['Bollywood', 'Nollywood', 'Lagoswood', 'Abujawood'], answer: 1 }
        },
        {
          de: { q: 'Welche drei größten ethnischen Gruppen gibt es in Nigeria?', options: ['Hausa, Fulani, Ijaw', 'Yoruba, Igbo, Kanuri', 'Hausa-Fulani, Yoruba, Igbo', 'Yoruba, Igbo, Tiv'], answer: 2 },
          en: { q: 'What are the three largest ethnic groups in Nigeria?', options: ['Hausa, Fulani, Ijaw', 'Yoruba, Igbo, Kanuri', 'Hausa-Fulani, Yoruba, Igbo', 'Yoruba, Igbo, Tiv'], answer: 2 }
        },
        {
          de: { q: 'Wann erlangte Nigeria die Unabhängigkeit von Großbritannien?', options: ['1957', '1960', '1963', '1966'], answer: 1 },
          en: { q: 'When did Nigeria gain independence from Britain?', options: ['1957', '1960', '1963', '1966'], answer: 1 }
        },
        {
          de: { q: 'Was ist Nigerias wichtigstes Exportgut?', options: ['Kakao', 'Erdöl', 'Gold', 'Kaffee'], answer: 1 },
          en: { q: 'What is Nigeria\'s most important export?', options: ['Cocoa', 'Petroleum', 'Gold', 'Coffee'], answer: 1 }
        },
        {
          de: { q: 'Welcher nigerianische Autor gewann 1986 den Nobelpreis für Literatur?', options: ['Chinua Achebe', 'Chimamanda Adichie', 'Wole Soyinka', 'Ben Okri'], answer: 2 },
          en: { q: 'Which Nigerian author won the Nobel Prize in Literature in 1986?', options: ['Chinua Achebe', 'Chimamanda Adichie', 'Wole Soyinka', 'Ben Okri'], answer: 2 }
        },
        {
          de: { q: 'Welches berühmte Buch schrieb Chinua Achebe?', options: ['Lila Farbe', 'Alles zerfällt', 'Der Gott der kleinen Dinge', 'Weinen ist nicht genug'], answer: 1 },
          en: { q: 'Which famous book did Chinua Achebe write?', options: ['Purple Hibiscus', 'Things Fall Apart', 'The God of Small Things', 'Weep Not, Child'], answer: 1 }
        },
        {
          de: { q: 'Was ist die traditionelle Musik Nigerias aus dem Yoruba-Volk?', options: ['Afrobeats', 'Jùjú', 'Highlife', 'Afrobeat'], answer: 1 },
          en: { q: 'What is the traditional music of Nigeria from the Yoruba people?', options: ['Afrobeats', 'Jùjú', 'Highlife', 'Afrobeat'], answer: 1 }
        },
        {
          de: { q: 'Welcher Ozean grenzt an Nigeria im Süden?', options: ['Indischer Ozean', 'Pazifischer Ozean', 'Atlantischer Ozean', 'Südlicher Ozean'], answer: 2 },
          en: { q: 'Which ocean borders Nigeria to the south?', options: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean', 'Southern Ocean'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der Golf, an dem Nigeria liegt?', options: ['Golf von Aden', 'Golf von Bengalen', 'Golf von Guinea', 'Golf von Mexiko'], answer: 2 },
          en: { q: 'What is the name of the gulf on which Nigeria is situated?', options: ['Gulf of Aden', 'Gulf of Bengal', 'Gulf of Guinea', 'Gulf of Mexico'], answer: 2 }
        },
        {
          de: { q: 'Welches nigerianische Gericht gilt als Nationalspeise?', options: ['Fufu und Egusi-Suppe', 'Jollof Reis', 'Puff Puff', 'Suya'], answer: 1 },
          en: { q: 'Which Nigerian dish is considered the national food?', options: ['Fufu and Egusi soup', 'Jollof Rice', 'Puff Puff', 'Suya'], answer: 1 }
        },
        {
          de: { q: 'Was ist die größte Wirtschaft Afrikas nach BIP?', options: ['Südafrika', 'Ägypten', 'Äthiopien', 'Nigeria'], answer: 3 },
          en: { q: 'What is Africa\'s largest economy by GDP?', options: ['South Africa', 'Egypt', 'Ethiopia', 'Nigeria'], answer: 3 }
        },
        {
          de: { q: 'Welche nigerianische Staatsform hat das Land?', options: ['Monarchie', 'Einheitsstaat', 'Föderale Republik', 'Parlamentarische Republik'], answer: 2 },
          en: { q: 'What form of government does Nigeria have?', options: ['Monarchy', 'Unitary state', 'Federal Republic', 'Parliamentary Republic'], answer: 2 }
        },
        {
          de: { q: 'Welcher nigerianische Musiker machte Afrobeats weltweit bekannt?', options: ['Davido', 'Fela Kuti', 'Burna Boy', 'Wizkid'], answer: 1 },
          en: { q: 'Which Nigerian musician pioneered Afrobeat and made it globally known?', options: ['Davido', 'Fela Kuti', 'Burna Boy', 'Wizkid'], answer: 1 }
        },
        {
          de: { q: 'Wie viele Bundesstaaten hat Nigeria?', options: ['30', '32', '36', '42'], answer: 2 },
          en: { q: 'How many states does Nigeria have?', options: ['30', '32', '36', '42'], answer: 2 }
        },
        {
          de: { q: 'Welche Stadt in Nigeria war Gastgeber der FESTAC 77 Festivalfeier der Schwarzen und afrikanischen Kunst?', options: ['Abuja', 'Kano', 'Lagos', 'Ibadan'], answer: 2 },
          en: { q: 'Which Nigerian city hosted the FESTAC 77 Festival of Black and African Arts?', options: ['Abuja', 'Kano', 'Lagos', 'Ibadan'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte Markt in Lagos, einer der größten in Westafrika?', options: ['Oshodi Markt', 'Balogun Markt', 'Idumota Markt', 'Alaba Markt'], answer: 1 },
          en: { q: 'What is the name of the famous market in Lagos, one of the largest in West Africa?', options: ['Oshodi Market', 'Balogun Market', 'Idumota Market', 'Alaba Market'], answer: 1 }
        },
        {
          de: { q: 'Welches Tier ist das Nationaltier Nigerias?', options: ['Löwe', 'Elefant', 'Adler', 'Leopard'], answer: 2 },
          en: { q: 'What is the national animal of Nigeria?', options: ['Lion', 'Elephant', 'Eagle', 'Leopard'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt Nigerias Nationalmannschaft im Fußball?', options: ['Black Stars', 'Lions of Teranga', 'Super Eagles', 'Indomitable Lions'], answer: 2 },
          en: { q: 'What is Nigeria\'s national football team called?', options: ['Black Stars', 'Lions of Teranga', 'Super Eagles', 'Indomitable Lions'], answer: 2 }
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
        },
        {
          de: { q: 'Wie heißt der größte Nationalpark Südafrikas?', options: ['Addo Elephant Park', 'Kruger-Nationalpark', 'Kgalagadi Park', 'Table Mountain Park'], answer: 1 },
          en: { q: 'What is the largest national park in South Africa?', options: ['Addo Elephant Park', 'Kruger National Park', 'Kgalagadi Park', 'Table Mountain Park'], answer: 1 }
        },
        {
          de: { q: 'Wo fand die Fußball-Weltmeisterschaft 2010 statt?', options: ['Ägypten', 'Nigeria', 'Südafrika', 'Marokko'], answer: 2 },
          en: { q: 'Where was the 2010 FIFA World Cup held?', options: ['Egypt', 'Nigeria', 'South Africa', 'Morocco'], answer: 2 }
        },
        {
          de: { q: 'Wie nennt man die Politik der Rassentrennung, die in Südafrika bis 1994 galt?', options: ['Kolonialismus', 'Apartheid', 'Segregation', 'Jim Crow'], answer: 1 },
          en: { q: 'What was the policy of racial segregation in South Africa until 1994 called?', options: ['Colonialism', 'Apartheid', 'Segregation', 'Jim Crow'], answer: 1 }
        },
        {
          de: { q: 'Welches ist die gesetzgebende Hauptstadt Südafrikas?', options: ['Pretoria', 'Johannesburg', 'Kapstadt', 'Bloemfontein'], answer: 2 },
          en: { q: 'What is the legislative capital of South Africa?', options: ['Pretoria', 'Johannesburg', 'Cape Town', 'Bloemfontein'], answer: 2 }
        },
        {
          de: { q: 'Welches berühmte Gefängnis, auf dem Nelson Mandela inhaftiert war, liegt vor Kapstadt?', options: ['Victor Verster', 'Pollsmoor', 'Robben Island', 'Pretoria Central'], answer: 2 },
          en: { q: 'Which famous prison where Nelson Mandela was held is located off Cape Town?', options: ['Victor Verster', 'Pollsmoor', 'Robben Island', 'Pretoria Central'], answer: 2 }
        },
        {
          de: { q: 'Welches Gebirge liegt in der Nähe von Kapstadt und ist UNESCO-Weltnaturerbe?', options: ['Drakensberge', 'Tafelberg', 'Langeberg', 'Hottentots-Holland-Berge'], answer: 1 },
          en: { q: 'Which mountain near Cape Town is a UNESCO World Heritage Site?', options: ['Drakensberg', 'Table Mountain', 'Langeberg', 'Hottentots Holland Mountains'], answer: 1 }
        },
        {
          de: { q: 'Was ist Südafrikas wichtigstes Exportgut?', options: ['Diamanten und Gold', 'Kaffee', 'Erdöl', 'Baumwolle'], answer: 0 },
          en: { q: 'What is South Africa\'s most important export?', options: ['Diamonds and gold', 'Coffee', 'Petroleum', 'Cotton'], answer: 0 }
        },
        {
          de: { q: 'Welche Stadt ist bekannt als "Stadt des Goldes" in Südafrika?', options: ['Kapstadt', 'Durban', 'Johannesburg', 'Pretoria'], answer: 2 },
          en: { q: 'Which city is known as the "City of Gold" in South Africa?', options: ['Cape Town', 'Durban', 'Johannesburg', 'Pretoria'], answer: 2 }
        },
        {
          de: { q: 'Welches Tier ist das Nationaltier Südafrikas?', options: ['Löwe', 'Elefant', 'Springbock', 'Nashorn'], answer: 2 },
          en: { q: 'What is the national animal of South Africa?', options: ['Lion', 'Elephant', 'Springbok', 'Rhinoceros'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die südafrikanische Nationalmannschaft im Rugby?', options: ['Wallabies', 'All Blacks', 'Springboks', 'Lions'], answer: 2 },
          en: { q: 'What is the South African national rugby team called?', options: ['Wallabies', 'All Blacks', 'Springboks', 'Lions'], answer: 2 }
        },
        {
          de: { q: 'Welcher Ozean und welches Meer treffen am Kap der Guten Hoffnung aufeinander?', options: ['Atlantik und Indischer Ozean', 'Pazifik und Indischer Ozean', 'Atlantik und Pazifik', 'Atlantik und Rotes Meer'], answer: 0 },
          en: { q: 'Which two oceans meet near the Cape of Good Hope?', options: ['Atlantic and Indian Ocean', 'Pacific and Indian Ocean', 'Atlantic and Pacific', 'Atlantic and Red Sea'], answer: 0 }
        },
        {
          de: { q: 'In welcher Stadt befindet sich das Apartheid Museum?', options: ['Kapstadt', 'Durban', 'Johannesburg', 'Pretoria'], answer: 2 },
          en: { q: 'In which city is the Apartheid Museum located?', options: ['Cape Town', 'Durban', 'Johannesburg', 'Pretoria'], answer: 2 }
        },
        {
          de: { q: 'Welche Sprache sprechen die Buren (Afrikaaner) in Südafrika?', options: ['Niederländisch', 'Deutsch', 'Afrikaans', 'Flämisch'], answer: 2 },
          en: { q: 'What language do the Boers (Afrikaners) speak in South Africa?', options: ['Dutch', 'German', 'Afrikaans', 'Flemish'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr endete die Apartheid offiziell und fanden freie Wahlen statt?', options: ['1990', '1992', '1994', '1996'], answer: 2 },
          en: { q: 'In which year did apartheid officially end and free elections take place?', options: ['1990', '1992', '1994', '1996'], answer: 2 }
        },
        {
          de: { q: 'Welches der "Big Five" Tiere ist das seltenste in Südafrika?', options: ['Elefant', 'Büffel', 'Breitmaulnashorn', 'Spitzmaulnashorn'], answer: 3 },
          en: { q: 'Which of the "Big Five" animals is the rarest in South Africa?', options: ['Elephant', 'Buffalo', 'White rhino', 'Black rhino'], answer: 3 }
        },
        {
          de: { q: 'Welche südafrikanische Sängerin ist bekannt für den Song "Pata Pata"?', options: ['Brenda Fassie', 'Miriam Makeba', 'Yvonne Chaka Chaka', 'Lira'], answer: 1 },
          en: { q: 'Which South African singer is known for the song "Pata Pata"?', options: ['Brenda Fassie', 'Miriam Makeba', 'Yvonne Chaka Chaka', 'Lira'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt das traditionelle südafrikanische Fleischgericht, das am Feuer gegrillt wird?', options: ['Biltong', 'Boerewors', 'Braai', 'Potjiekos'], answer: 2 },
          en: { q: 'What is the traditional South African outdoor barbecue called?', options: ['Biltong', 'Boerewors', 'Braai', 'Potjiekos'], answer: 2 }
        },
        {
          de: { q: 'Welches Königreich lag historisch im heutigen Südafrika und war für seinen Widerstand gegen die Briten bekannt?', options: ['Zulu-Königreich', 'Xhosa-Königreich', 'Sotho-Königreich', 'Venda-Königreich'], answer: 0 },
          en: { q: 'Which historical kingdom in present-day South Africa was known for resisting the British?', options: ['Zulu Kingdom', 'Xhosa Kingdom', 'Sotho Kingdom', 'Venda Kingdom'], answer: 0 }
        },
        {
          de: { q: 'Welches südafrikanische Weinanbaugebiet ist das bekannteste?', options: ['Franschhoek', 'Stellenbosch', 'Robertson', 'Paarl'], answer: 1 },
          en: { q: 'Which South African wine region is the most famous?', options: ['Franschhoek', 'Stellenbosch', 'Robertson', 'Paarl'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der Erzbischof, der Südafrika nach Mandela auf dem Weg der Versöhnung führte?', options: ['Desmond Tutu', 'Allan Boesak', 'Frank Chikane', 'Beyers Naudé'], answer: 0 },
          en: { q: 'Which archbishop guided South Africa toward reconciliation alongside Mandela?', options: ['Desmond Tutu', 'Allan Boesak', 'Frank Chikane', 'Beyers Naude'], answer: 0 }
        }
      ]
    }
  ]
};
