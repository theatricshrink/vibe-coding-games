var OCEANIA = {
  id: 'oceania',
  name: { de: 'Ozeanien', en: 'Oceania' },
  countries: [
    {
      id: 'australia',
      name: { de: 'Australien', en: 'Australia' },
      anthem: 'assets/audio/anthems/australia.mp3',
      background: 'assets/backgrounds/australia.png',
      enemyType: 'australia_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Australien?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], answer: 2 },
          en: { q: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], answer: 2 }
        },
        {
          de: { q: 'Was ist die größte Stadt Australiens?', options: ['Melbourne', 'Sydney', 'Brisbane', 'Perth'], answer: 1 },
          en: { q: 'What is the largest city in Australia?', options: ['Melbourne', 'Sydney', 'Brisbane', 'Perth'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt die australische Währung?', options: ['Neuseeländischer Dollar', 'Pfund', 'Australischer Dollar', 'Pacific-Dollar'], answer: 2 },
          en: { q: 'What is the Australian currency?', options: ['New Zealand Dollar', 'Pound', 'Australian Dollar', 'Pacific Dollar'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte Felsen mitten in Australien?', options: ['Ayers Fels', 'Devils Marbles', 'Uluru', 'Wave Rock'], answer: 2 },
          en: { q: 'What is the famous rock in the middle of Australia?', options: ['Ayers Rock', 'Devils Marbles', 'Uluru', 'Wave Rock'], answer: 2 }
        },
        {
          de: { q: 'Was ist das Nationaltier Australiens?', options: ['Koala', 'Dingo', 'Wombat', 'Känguru'], answer: 3 },
          en: { q: 'What is the national animal of Australia?', options: ['Koala', 'Dingo', 'Wombat', 'Kangaroo'], answer: 3 }
        },
        {
          de: { q: 'In welchem Jahr wurde Australien als unabhängige Nation gegründet?', options: ['1888', '1901', '1915', '1927'], answer: 1 },
          en: { q: 'In which year was Australia founded as an independent nation?', options: ['1888', '1901', '1915', '1927'], answer: 1 }
        },
        {
          de: { q: 'Welches ist das längste Flusssystem Australiens?', options: ['Darling River', 'Murray River', 'Murray-Darling-System', 'Murrumbidgee River'], answer: 2 },
          en: { q: 'What is the longest river system in Australia?', options: ['Darling River', 'Murray River', 'Murray-Darling system', 'Murrumbidgee River'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das berühmte Opernhaus in Sydney?', options: ['Sydney Concert Hall', 'Sydney Opernhaus', 'Sydney Opera House', 'Harbour Arts Centre'], answer: 2 },
          en: { q: 'What is the famous opera house in Sydney called?', options: ['Sydney Concert Hall', 'Sydney Opernhaus', 'Sydney Opera House', 'Harbour Arts Centre'], answer: 2 }
        },
        {
          de: { q: 'Welcher australische Staat hat die meisten Einwohner?', options: ['Queensland', 'Victoria', 'New South Wales', 'Western Australia'], answer: 2 },
          en: { q: 'Which Australian state has the most inhabitants?', options: ['Queensland', 'Victoria', 'New South Wales', 'Western Australia'], answer: 2 }
        },
        {
          de: { q: 'Was ist das Great Barrier Reef?', options: ['Ein Gebirgszug', 'Ein Nationalpark im Inland', 'Das größte Korallenriff der Welt', 'Ein Flussgebiet'], answer: 2 },
          en: { q: 'What is the Great Barrier Reef?', options: ['A mountain range', 'An inland national park', 'The world\'s largest coral reef', 'A river system'], answer: 2 }
        },
        {
          de: { q: 'Welche Tierart ist auf der australischen 50-Cent-Münze abgebildet?', options: ['Dingo', 'Koala', 'Känguru', 'Echidna'], answer: 2 },
          en: { q: 'Which animal is depicted on the Australian 50-cent coin?', options: ['Dingo', 'Koala', 'Kangaroo', 'Echidna'], answer: 2 }
        },
        {
          de: { q: 'Welchen Spitznamen trägt das australische Rugby-Team?', options: ['All Blacks', 'Springboks', 'Wallabies', 'Kangaroos'], answer: 2 },
          en: { q: 'What nickname does the Australian rugby union team go by?', options: ['All Blacks', 'Springboks', 'Wallabies', 'Kangaroos'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg Australiens?', options: ['Mount Kosciuszko', 'Mount Gambier', 'Mount Bartle Frere', 'Ben Lomond'], answer: 0 },
          en: { q: 'What is the highest mountain in Australia?', options: ['Mount Kosciuszko', 'Mount Gambier', 'Mount Bartle Frere', 'Ben Lomond'], answer: 0 }
        },
        {
          de: { q: 'Welche australische Stadt liegt am weitesten westlich?', options: ['Darwin', 'Adelaide', 'Perth', 'Broome'], answer: 2 },
          en: { q: 'Which Australian capital city is located furthest west?', options: ['Darwin', 'Adelaide', 'Perth', 'Broome'], answer: 2 }
        },
        {
          de: { q: 'Wie nennt man die Ureinwohner Australiens?', options: ['Maori', 'Aborigines', 'Polynesier', 'Melanesier'], answer: 1 },
          en: { q: 'What are the indigenous people of Australia called?', options: ['Maori', 'Aborigines', 'Polynesians', 'Melanesians'], answer: 1 }
        },
        {
          de: { q: 'Welches Tier ist das giftigste Landsäugetier Australiens?', options: ['Taipan', 'Dingo', 'Platypus', 'Quokka'], answer: 0 },
          en: { q: 'Which animal is Australia\'s most venomous land snake?', options: ['Inland Taipan', 'Tiger Snake', 'Eastern Brown Snake', 'Red-bellied Black Snake'], answer: 0 }
        },
        {
          de: { q: 'Welches bekannte australische Gericht besteht aus Lammfleisch auf dem Grill?', options: ['Barbie', 'Snag', 'Lamb chop', 'Barbeque lamb'], answer: 1 },
          en: { q: 'What do Australians call a sausage cooked on a barbecue?', options: ['Barbie', 'Snag', 'Banger', 'Chop'], answer: 1 }
        },
        {
          de: { q: 'Welcher Kontinent liegt Australien am nächsten?', options: ['Südamerika', 'Afrika', 'Asien', 'Antarktis'], answer: 2 },
          en: { q: 'Which continent is closest to Australia?', options: ['South America', 'Africa', 'Asia', 'Antarctica'], answer: 2 }
        },
        {
          de: { q: 'Welche australische Schauspielerin war in "Moulin Rouge" zu sehen?', options: ['Cate Blanchett', 'Naomi Watts', 'Nicole Kidman', 'Rose Byrne'], answer: 2 },
          en: { q: 'Which Australian actress starred in Moulin Rouge?', options: ['Cate Blanchett', 'Naomi Watts', 'Nicole Kidman', 'Rose Byrne'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt fanden die Olympischen Sommerspiele 2000 statt?', options: ['Melbourne', 'Brisbane', 'Sydney', 'Perth'], answer: 2 },
          en: { q: 'In which city were the 2000 Summer Olympics held?', options: ['Melbourne', 'Brisbane', 'Sydney', 'Perth'], answer: 2 }
        },
        {
          de: { q: 'Was ist Vegemite?', options: ['Eine Käsesorte', 'Ein Hefefett-Aufstrich', 'Ein Fruchtaufstrich', 'Eine Fleischpastete'], answer: 1 },
          en: { q: 'What is Vegemite?', options: ['A type of cheese', 'A yeast extract spread', 'A fruit jam', 'A meat paste'], answer: 1 }
        },
        {
          de: { q: 'Wie viele Zeitzonen hat Australien?', options: ['3', '5', '8', '2'], answer: 1 },
          en: { q: 'How many time zones does Australia have?', options: ['3', '5', '8', '2'], answer: 1 }
        },
        {
          de: { q: 'Welches australische Tier kann schwimmen, legen Eier und hat einen Entenschnabel?', options: ['Wombat', 'Numbat', 'Schnabeltier', 'Quokka'], answer: 2 },
          en: { q: 'Which Australian animal can swim, lays eggs, and has a duck-like bill?', options: ['Wombat', 'Numbat', 'Platypus', 'Quokka'], answer: 2 }
        },
        {
          de: { q: 'Welche australische Stadt ist für die Formel-1-Strecke bekannt?', options: ['Sydney', 'Brisbane', 'Melbourne', 'Adelaide'], answer: 2 },
          en: { q: 'Which Australian city is known for its Formula 1 Grand Prix circuit?', options: ['Sydney', 'Brisbane', 'Melbourne', 'Adelaide'], answer: 2 }
        },
        {
          de: { q: 'Welche Tierart ist auf der australischen Wappenrolle zusammen mit dem Känguru abgebildet?', options: ['Koala', 'Emu', 'Dingo', 'Wombat'], answer: 1 },
          en: { q: 'Which animal appears on the Australian coat of arms alongside the kangaroo?', options: ['Koala', 'Emu', 'Dingo', 'Wombat'], answer: 1 }
        },
      ]
    },
    {
      id: 'fiji',
      name: { de: 'Fidschi', en: 'Fiji' },
      anthem: 'assets/audio/anthems/fiji.mp3',
      background: 'assets/backgrounds/fiji.png',
      enemyType: 'fiji_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Fidschi?', options: ['Nadi', 'Lautoka', 'Suva', 'Labasa'], answer: 2 },
          en: { q: 'What is the capital of Fiji?', options: ['Nadi', 'Lautoka', 'Suva', 'Labasa'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die fidschianische Währung?', options: ['Pazifischer Franc', 'Australischer Dollar', 'Fidschianischer Dollar', 'Tala'], answer: 2 },
          en: { q: 'What is the Fijian currency?', options: ['Pacific Franc', 'Australian Dollar', 'Fijian Dollar', 'Tala'], answer: 2 }
        },
        {
          de: { q: 'In welchem Ozean liegt Fidschi?', options: ['Indischer Ozean', 'Atlantischer Ozean', 'Arktischer Ozean', 'Pazifischer Ozean'], answer: 3 },
          en: { q: 'In which ocean is Fiji located?', options: ['Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean', 'Pacific Ocean'], answer: 3 }
        },
        {
          de: { q: 'Wofür ist Fidschi besonders bekannt?', options: ['Bergsteigen', 'Wüstensafaris', 'Korallenriffe', 'Wintersport'], answer: 2 },
          en: { q: 'What is Fiji famous for?', options: ['Mountaineering', 'Desert safaris', 'Coral reefs', 'Winter sports'], answer: 2 }
        },
        {
          de: { q: 'Welche Sprache ist eine Amtssprache Fidschis?', options: ['Französisch', 'Spanisch', 'Englisch', 'Portugiesisch'], answer: 2 },
          en: { q: 'Which language is an official language of Fiji?', options: ['French', 'Spanish', 'English', 'Portuguese'], answer: 2 }
        },
        {
          de: { q: 'Aus wie vielen Inseln besteht Fidschi ungefähr?', options: ['100', '330', '520', '900'], answer: 1 },
          en: { q: 'Approximately how many islands make up Fiji?', options: ['100', '330', '520', '900'], answer: 1 }
        },
        {
          de: { q: 'Welches Land kolonisierte Fidschi vor der Unabhängigkeit?', options: ['Frankreich', 'USA', 'Vereinigtes Königreich', 'Australien'], answer: 2 },
          en: { q: 'Which country colonised Fiji before its independence?', options: ['France', 'USA', 'United Kingdom', 'Australia'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr wurde Fidschi unabhängig?', options: ['1958', '1965', '1970', '1979'], answer: 2 },
          en: { q: 'In which year did Fiji gain independence?', options: ['1958', '1965', '1970', '1979'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das traditionelle fidschianische Getränk aus einer Pfefferpflanze?', options: ['Awa', 'Kava', 'Taro', 'Cassava'], answer: 1 },
          en: { q: 'What is the traditional Fijian drink made from a pepper plant?', options: ['Awa', 'Kava', 'Taro', 'Cassava'], answer: 1 }
        },
        {
          de: { q: 'Was ist die größte Insel Fidschis?', options: ['Vanua Levu', 'Taveuni', 'Viti Levu', 'Kadavu'], answer: 2 },
          en: { q: 'What is the largest island of Fiji?', options: ['Vanua Levu', 'Taveuni', 'Viti Levu', 'Kadavu'], answer: 2 }
        },
        {
          de: { q: 'Welche Sportart ist in Fidschi besonders beliebt und weltweit bekannt?', options: ['Cricket', 'Rugby Sevens', 'Fußball', 'Basketball'], answer: 1 },
          en: { q: 'Which sport is Fiji particularly famous for on the world stage?', options: ['Cricket', 'Rugby Sevens', 'Football', 'Basketball'], answer: 1 }
        },
        {
          de: { q: 'Bei den Olympischen Spielen 2016 gewann Fidschi seine erste Goldmedaille in welcher Sportart?', options: ['Schwimmen', 'Leichtathletik', 'Rugby Sevens', 'Boxen'], answer: 2 },
          en: { q: 'At the 2016 Olympics, Fiji won its first ever gold medal in which sport?', options: ['Swimming', 'Athletics', 'Rugby Sevens', 'Boxing'], answer: 2 }
        },
        {
          de: { q: 'Welches ist die zweitgrößte Insel Fidschis?', options: ['Taveuni', 'Vanua Levu', 'Kadavu', 'Ovalau'], answer: 1 },
          en: { q: 'What is the second largest island of Fiji?', options: ['Taveuni', 'Vanua Levu', 'Kadavu', 'Ovalau'], answer: 1 }
        },
        {
          de: { q: 'Welche ethnische Gruppe wurde historisch als Arbeitskraft nach Fidschi gebracht?', options: ['Chinesen', 'Malayen', 'Inder', 'Japaner'], answer: 2 },
          en: { q: 'Which ethnic group was historically brought to Fiji as indentured labour?', options: ['Chinese', 'Malays', 'Indians', 'Japanese'], answer: 2 }
        },
        {
          de: { q: 'Was ist ein typisches fidschianisches Gericht?', options: ['Sushi', 'Lovo (Erdofen-Gericht)', 'Jerk Chicken', 'Moussaka'], answer: 1 },
          en: { q: 'What is a typical Fijian dish?', options: ['Sushi', 'Lovo (earth oven dish)', 'Jerk Chicken', 'Moussaka'], answer: 1 }
        },
        {
          de: { q: 'Welche Pflanze ist ein Grundnahrungsmittel in Fidschi?', options: ['Weizen', 'Kartoffel', 'Taro', 'Mais'], answer: 2 },
          en: { q: 'Which plant is a staple food in Fiji?', options: ['Wheat', 'Potato', 'Taro', 'Maize'], answer: 2 }
        },
        {
          de: { q: 'Wie nennt man den traditionellen fidschianischen Tanz?', options: ['Haka', 'Meke', 'Siva', 'Tamure'], answer: 1 },
          en: { q: 'What is the traditional Fijian dance called?', options: ['Haka', 'Meke', 'Siva', 'Tamure'], answer: 1 }
        },
        {
          de: { q: 'Welches Riff liegt vor der Küste Fidschis?', options: ['Great Barrier Reef', 'Ningaloo Riff', 'Fidschi-Barriereriff', 'Astrolabe Riff'], answer: 3 },
          en: { q: 'Which reef off the coast of Fiji is famous for diving?', options: ['Great Barrier Reef', 'Ningaloo Reef', 'Fiji Barrier Reef', 'Astrolabe Reef'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt der Meridian, der durch Fidschi verläuft und die Datumsgrenze bildet?', options: ['Nullmeridian', '180. Meridian', '90. Meridian', '120. Meridian'], answer: 1 },
          en: { q: 'Which meridian passes through Fiji and forms the International Date Line?', options: ['Prime Meridian', '180th Meridian', '90th Meridian', '120th Meridian'], answer: 1 }
        },
        {
          de: { q: 'Welches Land liegt nordwestlich von Fidschi?', options: ['Tonga', 'Samoa', 'Vanuatu', 'Tuvalu'], answer: 2 },
          en: { q: 'Which country lies to the northwest of Fiji?', options: ['Tonga', 'Samoa', 'Vanuatu', 'Tuvalu'], answer: 2 }
        },
        {
          de: { q: 'Welche Flaggenfarbe hat Fidschi als Hintergrund?', options: ['Grün', 'Rot', 'Hellblau', 'Weiß'], answer: 2 },
          en: { q: 'What background colour does the Fijian flag have?', options: ['Green', 'Red', 'Light blue', 'White'], answer: 2 }
        },
        {
          de: { q: 'Welche Rohstoffe werden in Fidschi hauptsächlich exportiert?', options: ['Öl und Gas', 'Zucker und Bekleidung', 'Diamanten und Gold', 'Kupfer und Kaffee'], answer: 1 },
          en: { q: 'What are Fiji\'s main export products?', options: ['Oil and gas', 'Sugar and garments', 'Diamonds and gold', 'Copper and coffee'], answer: 1 }
        },
        {
          de: { q: 'Wann erlebte Fidschi seinen ersten Militärputsch?', options: ['1975', '1987', '1995', '2000'], answer: 1 },
          en: { q: 'When did Fiji experience its first military coup?', options: ['1975', '1987', '1995', '2000'], answer: 1 }
        },
        {
          de: { q: 'Welcher europäische Entdecker besuchte als erster die fidschianischen Inseln?', options: ['James Cook', 'Abel Tasman', 'Louis-Antoine de Bougainville', 'Ferdinand Magellan'], answer: 1 },
          en: { q: 'Which European explorer was the first to visit the Fijian islands?', options: ['James Cook', 'Abel Tasman', 'Louis-Antoine de Bougainville', 'Ferdinand Magellan'], answer: 1 }
        },
        {
          de: { q: 'Wie lautet der fidschianische Gruß?', options: ['Kia Ora', 'Bula', 'Malo', 'Talofa'], answer: 1 },
          en: { q: 'What is the Fijian greeting?', options: ['Kia Ora', 'Bula', 'Malo', 'Talofa'], answer: 1 }
        }
      ]
    },
    {
      id: 'new_zealand',
      name: { de: 'Neuseeland', en: 'New Zealand' },
      anthem: 'assets/audio/anthems/new_zealand.mp3',
      background: 'assets/backgrounds/new_zealand.png',
      enemyType: 'new_zealand_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Neuseeland?', options: ['Auckland', 'Christchurch', 'Wellington', 'Hamilton'], answer: 2 },
          en: { q: 'What is the capital of New Zealand?', options: ['Auckland', 'Christchurch', 'Wellington', 'Hamilton'], answer: 2 }
        },
        {
          de: { q: 'Was ist die größte Stadt Neuseelands?', options: ['Wellington', 'Christchurch', 'Dunedin', 'Auckland'], answer: 3 },
          en: { q: 'What is the largest city in New Zealand?', options: ['Wellington', 'Christchurch', 'Dunedin', 'Auckland'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die neuseeländische Währung?', options: ['Australischer Dollar', 'Pacific-Dollar', 'NZD', 'Pfund'], answer: 2 },
          en: { q: 'What is the New Zealand currency?', options: ['Australian Dollar', 'Pacific Dollar', 'NZD', 'Pound'], answer: 2 }
        },
        {
          de: { q: 'Wie heißen die indigenen Menschen Neuseelands?', options: ['Aborigines', 'Inuit', 'Maori', 'Polynesier'], answer: 2 },
          en: { q: 'What are the indigenous people of New Zealand called?', options: ['Aborigines', 'Inuit', 'Maori', 'Polynesians'], answer: 2 }
        },
        {
          de: { q: 'Wofür ist Neuseeland als Filmkulisse bekannt?', options: ['Star Wars', 'Harry Potter', 'Herr der Ringe', 'Avatar'], answer: 2 },
          en: { q: 'What famous film series was filmed in New Zealand?', options: ['Star Wars', 'Harry Potter', 'Lord of the Rings', 'Avatar'], answer: 2 }
        },
        {
          de: { q: 'Welches berühmte Rugby-Team kommt aus Neuseeland?', options: ['Springboks', 'Wallabies', 'All Blacks', 'Lions'], answer: 2 },
          en: { q: 'Which famous rugby team comes from New Zealand?', options: ['Springboks', 'Wallabies', 'All Blacks', 'Lions'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der traditionelle Kriegstanz der Maori?', options: ['Siva', 'Haka', 'Meke', 'Tamure'], answer: 1 },
          en: { q: 'What is the traditional Maori war dance called?', options: ['Siva', 'Haka', 'Meke', 'Tamure'], answer: 1 }
        },
        {
          de: { q: 'Wie nennt man Neuseeland auf Maori?', options: ['Aotearoa', 'Hawaiki', 'Tangata Whenua', 'Te Reo'], answer: 0 },
          en: { q: 'What is New Zealand called in the Maori language?', options: ['Aotearoa', 'Hawaiki', 'Tangata Whenua', 'Te Reo'], answer: 0 }
        },
        {
          de: { q: 'Welcher Vogel ist das Nationalsymbol Neuseelands?', options: ['Albatros', 'Tuatara', 'Kiwi', 'Kakapo'], answer: 2 },
          en: { q: 'Which bird is the national symbol of New Zealand?', options: ['Albatross', 'Tuatara', 'Kiwi', 'Kakapo'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg Neuseelands?', options: ['Mount Ruapehu', 'Mount Taranaki', 'Mount Cook (Aoraki)', 'Mount Aspiring'], answer: 2 },
          en: { q: 'What is the highest mountain in New Zealand?', options: ['Mount Ruapehu', 'Mount Taranaki', 'Mount Cook (Aoraki)', 'Mount Aspiring'], answer: 2 }
        },
        {
          de: { q: 'Neuseeland war das erste Land, das Frauen das Wahlrecht gewährte. In welchem Jahr?', options: ['1865', '1893', '1910', '1928'], answer: 1 },
          en: { q: 'New Zealand was the first country to grant women the right to vote. In which year?', options: ['1865', '1893', '1910', '1928'], answer: 1 }
        },
        {
          de: { q: 'Welcher neuseeländische Bergsteiger bestieg 1953 als erster den Mount Everest?', options: ['Edmund Hillary', 'George Mallory', 'Reinhold Messner', 'Tenzing Norgay'], answer: 0 },
          en: { q: 'Which New Zealand mountaineer first summited Mount Everest in 1953?', options: ['Edmund Hillary', 'George Mallory', 'Reinhold Messner', 'Tenzing Norgay'], answer: 0 }
        },
        {
          de: { q: 'Welches Tier mit Schuppenrücken ist ein lebendes Fossil aus Neuseeland?', options: ['Weta', 'Kea', 'Tuatara', 'Kakapo'], answer: 2 },
          en: { q: 'Which scaly reptile from New Zealand is considered a living fossil?', options: ['Weta', 'Kea', 'Tuatara', 'Kakapo'], answer: 2 }
        },
        {
          de: { q: 'In welchem Meer liegt Neuseeland?', options: ['Korallenmeer', 'Südpolarmeer', 'Tasmansee und Pazifik', 'Indischer Ozean'], answer: 2 },
          en: { q: 'In which waters is New Zealand situated?', options: ['Coral Sea', 'Southern Ocean', 'Tasman Sea and Pacific Ocean', 'Indian Ocean'], answer: 2 }
        },
        {
          de: { q: 'Welche neuseeländische Sängerin ist unter dem Namen Lorde bekannt?', options: ['Ella Yelich-O\'Connor', 'Brooke Fraser', 'Bic Runga', 'Gin Wigmore'], answer: 0 },
          en: { q: 'Which New Zealand singer is known by the stage name Lorde?', options: ['Ella Yelich-O\'Connor', 'Brooke Fraser', 'Bic Runga', 'Gin Wigmore'], answer: 0 }
        },
        {
          de: { q: 'Welches ist die Hauptinsel im Norden Neuseelands?', options: ['Südinsel', 'Steward Island', 'Nordinsel', 'Chatham Island'], answer: 2 },
          en: { q: 'What is the main northern island of New Zealand called?', options: ['South Island', 'Stewart Island', 'North Island', 'Chatham Island'], answer: 2 }
        },
        {
          de: { q: 'Welcher aktivste Vulkan Neuseelands befindet sich auf der Nordinsel?', options: ['Mount Cook', 'Mount Taranaki', 'Ruapehu', 'Tongariro'], answer: 2 },
          en: { q: 'Which of New Zealand\'s most active volcanoes is located on the North Island?', options: ['Mount Cook', 'Mount Taranaki', 'Ruapehu', 'Tongariro'], answer: 2 }
        },
        {
          de: { q: 'Welche Stadt Neuseelands ist für ihr Erdbeben 2011 bekannt?', options: ['Wellington', 'Auckland', 'Christchurch', 'Dunedin'], answer: 2 },
          en: { q: 'Which New Zealand city is known for its devastating 2011 earthquake?', options: ['Wellington', 'Auckland', 'Christchurch', 'Dunedin'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die Meeresstraße zwischen Nord- und Südinsel Neuseelands?', options: ['Cookstraße', 'Bassstraße', 'Tasmanstraße', 'Torresstraße'], answer: 0 },
          en: { q: 'What is the strait between New Zealand\'s North and South Islands called?', options: ['Cook Strait', 'Bass Strait', 'Tasman Strait', 'Torres Strait'], answer: 0 }
        },
        {
          de: { q: 'Was ist ein Pavlova?', options: ['Ein Maori-Ritual', 'Ein Meeresfrüchte-Gericht', 'Ein Baiser-Dessert', 'Eine neuseeländische Sportart'], answer: 2 },
          en: { q: 'What is a Pavlova?', options: ['A Maori ritual', 'A seafood dish', 'A meringue dessert', 'A New Zealand sport'], answer: 2 }
        },
        {
          de: { q: 'Welche neuseeländische Stadt ist nördlichste Großstadt des Landes?', options: ['Hamilton', 'Tauranga', 'Auckland', 'Whangarei'], answer: 2 },
          en: { q: 'Which New Zealand city is the country\'s northernmost major city?', options: ['Hamilton', 'Tauranga', 'Auckland', 'Whangarei'], answer: 2 }
        },
        {
          de: { q: 'Welcher Physiker aus Neuseeland spaltete erstmals das Atom?', options: ['Niels Bohr', 'Ernest Rutherford', 'J.J. Thomson', 'Paul Dirac'], answer: 1 },
          en: { q: 'Which New Zealand-born physicist first split the atom?', options: ['Niels Bohr', 'Ernest Rutherford', 'J.J. Thomson', 'Paul Dirac'], answer: 1 }
        },
        {
          de: { q: 'Welche neuseeländische Insel ist die drittgrößte und bekannt als "Mutterinsel"?', options: ['Chatham Island', 'Kapiti Island', 'Stewart Island', 'Great Barrier Island'], answer: 2 },
          en: { q: 'Which is New Zealand\'s third-largest island, sometimes called "Mother Island"?', options: ['Chatham Island', 'Kapiti Island', 'Stewart Island', 'Great Barrier Island'], answer: 2 }
        },
        {
          de: { q: 'Neuseeland liegt auf dem Pazifischen Feuerring. Was bedeutet das?', options: ['Es ist reich an Ölvorkommen', 'Es liegt in einer tektonisch aktiven Zone mit Vulkanen und Erdbeben', 'Es hat hohe Waldbrands-Gefahr', 'Es ist durch Hurrikan-Aktivität bekannt'], answer: 1 },
          en: { q: 'New Zealand lies on the Pacific Ring of Fire. What does this mean?', options: ['It is rich in oil reserves', 'It lies in a tectonically active zone with volcanoes and earthquakes', 'It has high wildfire risk', 'It is known for hurricane activity'], answer: 1 }
        },
        {
          de: { q: 'Welche Filmproduktionsfirma von Peter Jackson hat ihren Sitz in Wellington?', options: ['Universal Pictures NZ', 'WetaFX (Weta Digital)', 'Pixar NZ', 'DreamWorks Oceania'], answer: 1 },
          en: { q: 'Which visual effects company founded by Peter Jackson is based in Wellington?', options: ['Universal Pictures NZ', 'WetaFX (Weta Digital)', 'Pixar NZ', 'DreamWorks Oceania'], answer: 1 }
        }
      ]
    }
  ]
};
