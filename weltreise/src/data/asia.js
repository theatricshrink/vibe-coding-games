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
        },
        {
          de: { q: 'Welches Tier ist das Nationalsymbol Chinas?', options: ['Tiger', 'Drache', 'Großer Panda', 'Kranich'], answer: 2 },
          en: { q: 'Which animal is the national symbol of China?', options: ['Tiger', 'Dragon', 'Giant Panda', 'Crane'], answer: 2 }
        },
        {
          de: { q: 'In welcher chinesischen Stadt findet man die Verbotene Stadt?', options: ['Shanghai', 'Xian', 'Peking', 'Nanjing'], answer: 2 },
          en: { q: 'In which Chinese city is the Forbidden City located?', options: ['Shanghai', 'Xian', 'Beijing', 'Nanjing'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr fanden die Olympischen Sommerspiele in Peking statt?', options: ['2004', '2006', '2008', '2010'], answer: 2 },
          en: { q: 'In which year were the Summer Olympics held in Beijing?', options: ['2004', '2006', '2008', '2010'], answer: 2 }
        },
        {
          de: { q: 'Welches ist die bevölkerungsreichste Stadt Chinas?', options: ['Peking', 'Chongqing', 'Shanghai', 'Guangzhou'], answer: 2 },
          en: { q: 'Which is the most populous city in China?', options: ['Beijing', 'Chongqing', 'Shanghai', 'Guangzhou'], answer: 2 }
        },
        {
          de: { q: 'Welche Schrift wird in China offiziell verwendet?', options: ['Hiragana', 'Hangul', 'Vereinfachtes Chinesisch', 'Devanagari'], answer: 2 },
          en: { q: 'Which script is officially used in China?', options: ['Hiragana', 'Hangul', 'Simplified Chinese', 'Devanagari'], answer: 2 }
        },
        {
          de: { q: 'Welche Weltwunder steht in Xi\'an, China?', options: ['Terrakotta-Armee', 'Große Mauer', 'Sommerpalast', 'Potala-Palast'], answer: 0 },
          en: { q: 'Which world wonder is located in Xi\'an, China?', options: ['Terracotta Army', 'Great Wall', 'Summer Palace', 'Potala Palace'], answer: 0 }
        },
        {
          de: { q: 'Welche Philosophie ist eng mit China verbunden?', options: ['Buddhismus', 'Konfuzianismus', 'Hinduismus', 'Taoismus'], answer: 1 },
          en: { q: 'Which philosophy is most closely associated with China?', options: ['Buddhism', 'Confucianism', 'Hinduism', 'Taoism'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg der Welt, der auf der Grenze zu China liegt?', options: ['K2', 'Kangchendzönga', 'Mount Everest', 'Lhotse'], answer: 2 },
          en: { q: 'What is the name of the highest mountain in the world, located on China\'s border?', options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'], answer: 2 }
        },
        {
          de: { q: 'Was ist das traditionelle chinesische Neujahrsfest nach dem Kalender?', options: ['Laternenfest', 'Drachenfest', 'Mondfest', 'Frühlingsfest'], answer: 3 },
          en: { q: 'What is the traditional Chinese New Year celebration called?', options: ['Lantern Festival', 'Dragon Festival', 'Moon Festival', 'Spring Festival'], answer: 3 }
        },
        {
          de: { q: 'Welche Provinz ist für die Pandazucht bekannt?', options: ['Yunnan', 'Sichuan', 'Hunan', 'Shaanxi'], answer: 1 },
          en: { q: 'Which province is known for panda breeding?', options: ['Yunnan', 'Sichuan', 'Hunan', 'Shaanxi'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der bekannteste chinesische Tee?', options: ['Darjeeling', 'Oolong', 'Assam', 'Earl Grey'], answer: 1 },
          en: { q: 'What is the most famous Chinese tea?', options: ['Darjeeling', 'Oolong', 'Assam', 'Earl Grey'], answer: 1 }
        },
        {
          de: { q: 'Welches Land grenzt im Norden an China?', options: ['Russland', 'Kasachstan', 'Mongolei', 'Kirgisistan'], answer: 2 },
          en: { q: 'Which country borders China to the north?', options: ['Russia', 'Kazakhstan', 'Mongolia', 'Kyrgyzstan'], answer: 2 }
        },
        {
          de: { q: 'Welche chinesische Erfindung revolutionierte die Kommunikation?', options: ['Kompass', 'Papier', 'Schießpulver', 'Buchdruck'], answer: 3 },
          en: { q: 'Which Chinese invention revolutionized communication?', options: ['Compass', 'Paper', 'Gunpowder', 'Printing press'], answer: 3 }
        },
        {
          de: { q: 'In welcher Stadt befindet sich der Shanghai Tower?', options: ['Peking', 'Guangzhou', 'Shenzhen', 'Shanghai'], answer: 3 },
          en: { q: 'In which city is the Shanghai Tower located?', options: ['Beijing', 'Guangzhou', 'Shenzhen', 'Shanghai'], answer: 3 }
        },
        {
          de: { q: 'Welcher chinesische Kaiser ließ die Verbotene Stadt erbauen?', options: ['Qianlong', 'Kangxi', 'Yongle', 'Hongwu'], answer: 2 },
          en: { q: 'Which Chinese emperor had the Forbidden City built?', options: ['Qianlong', 'Kangxi', 'Yongle', 'Hongwu'], answer: 2 }
        },
        {
          de: { q: 'Welches Gericht gilt als chinesisches Nationalgericht?', options: ['Dim Sum', 'Kung-Pao-Hähnchen', 'Peking-Ente', 'Mapo-Tofu'], answer: 2 },
          en: { q: 'Which dish is considered China\'s national dish?', options: ['Dim Sum', 'Kung Pao Chicken', 'Peking Duck', 'Mapo Tofu'], answer: 2 }
        },
        {
          de: { q: 'Was ist die offizielle Sprache Chinas?', options: ['Kantonesisch', 'Hokkien', 'Mandarin', 'Wu'], answer: 2 },
          en: { q: 'What is the official language of China?', options: ['Cantonese', 'Hokkien', 'Mandarin', 'Wu'], answer: 2 }
        },
        {
          de: { q: 'Welcher Fluss fließt durch die Drei-Schluchten-Talsperre?', options: ['Gelber Fluss', 'Perlenfluss', 'Jangtse', 'Mekong'], answer: 2 },
          en: { q: 'Which river flows through the Three Gorges Dam?', options: ['Yellow River', 'Pearl River', 'Yangtze', 'Mekong'], answer: 2 }
        },
        {
          de: { q: 'Welche chinesische Stadt war früher als Kanton bekannt?', options: ['Shenzhen', 'Wuhan', 'Guangzhou', 'Chengdu'], answer: 2 },
          en: { q: 'Which Chinese city was formerly known as Canton?', options: ['Shenzhen', 'Wuhan', 'Guangzhou', 'Chengdu'], answer: 2 }
        },
        {
          de: { q: 'Wie viele Zeitzonen hat China offiziell?', options: ['5', '3', '1', '4'], answer: 2 },
          en: { q: 'How many time zones does China officially use?', options: ['5', '3', '1', '4'], answer: 2 }
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
        },
        {
          de: { q: 'Welches Tier ist das Nationaltier Indiens?', options: ['Löwe', 'Elefant', 'Bengal-Tiger', 'Pfau'], answer: 2 },
          en: { q: 'What is the national animal of India?', options: ['Lion', 'Elephant', 'Bengal Tiger', 'Peacock'], answer: 2 }
        },
        {
          de: { q: 'Welcher Vogel ist der Nationalvogel Indiens?', options: ['Kranich', 'Adler', 'Flamingo', 'Pfau'], answer: 3 },
          en: { q: 'Which bird is the national bird of India?', options: ['Crane', 'Eagle', 'Flamingo', 'Peacock'], answer: 3 }
        },
        {
          de: { q: 'Was ist die meistgesprochene Sprache Indiens?', options: ['Urdu', 'Bengali', 'Tamil', 'Hindi'], answer: 3 },
          en: { q: 'What is the most spoken language in India?', options: ['Urdu', 'Bengali', 'Tamil', 'Hindi'], answer: 3 }
        },
        {
          de: { q: 'Wer war der erste Premierminister Indiens?', options: ['Mahatma Gandhi', 'Indira Gandhi', 'Jawaharlal Nehru', 'Sardar Patel'], answer: 2 },
          en: { q: 'Who was the first Prime Minister of India?', options: ['Mahatma Gandhi', 'Indira Gandhi', 'Jawaharlal Nehru', 'Sardar Patel'], answer: 2 }
        },
        {
          de: { q: 'In welcher indischen Stadt befindet sich die Filmindustrie Bollywood?', options: ['Delhi', 'Hyderabad', 'Chennai', 'Mumbai'], answer: 3 },
          en: { q: 'In which Indian city is the Bollywood film industry located?', options: ['Delhi', 'Hyderabad', 'Chennai', 'Mumbai'], answer: 3 }
        },
        {
          de: { q: 'Welche Religion hat die meisten Anhänger in Indien?', options: ['Islam', 'Sikhismus', 'Hinduismus', 'Buddhismus'], answer: 2 },
          en: { q: 'Which religion has the most followers in India?', options: ['Islam', 'Sikhism', 'Hinduism', 'Buddhism'], answer: 2 }
        },
        {
          de: { q: 'Welches Gericht ist ein indisches Nationalgericht?', options: ['Sushi', 'Falafel', 'Butter Chicken', 'Pad Thai'], answer: 2 },
          en: { q: 'Which dish is considered an Indian national dish?', options: ['Sushi', 'Falafel', 'Butter Chicken', 'Pad Thai'], answer: 2 }
        },
        {
          de: { q: 'Welches ist das bevölkerungsreichste Bundesland Indiens?', options: ['Maharashtra', 'Rajasthan', 'Uttar Pradesh', 'Bihar'], answer: 2 },
          en: { q: 'Which is the most populous state in India?', options: ['Maharashtra', 'Rajasthan', 'Uttar Pradesh', 'Bihar'], answer: 2 }
        },
        {
          de: { q: 'Welcher indische Freiheitskämpfer war für gewaltlosen Widerstand bekannt?', options: ['Bhagat Singh', 'Subhas Chandra Bose', 'Mahatma Gandhi', 'Bal Gangadhar Tilak'], answer: 2 },
          en: { q: 'Which Indian freedom fighter was known for non-violent resistance?', options: ['Bhagat Singh', 'Subhas Chandra Bose', 'Mahatma Gandhi', 'Bal Gangadhar Tilak'], answer: 2 }
        },
        {
          de: { q: 'Welcher Gebirgszug bildet die nördliche Grenze Indiens?', options: ['Hindukusch', 'Karakorum', 'Himalaya', 'Vindhya'], answer: 2 },
          en: { q: 'Which mountain range forms the northern border of India?', options: ['Hindu Kush', 'Karakoram', 'Himalayas', 'Vindhya'], answer: 2 }
        },
        {
          de: { q: 'Welches Brettspiel wurde in Indien erfunden?', options: ['Dame', 'Mühle', 'Schach', 'Go'], answer: 2 },
          en: { q: 'Which board game was invented in India?', options: ['Checkers', 'Nine Men\'s Morris', 'Chess', 'Go'], answer: 2 }
        },
        {
          de: { q: 'Welcher Fluss ist der längste in Indien?', options: ['Brahmaputra', 'Godavari', 'Ganga', 'Indus'], answer: 2 },
          en: { q: 'Which river is the longest in India?', options: ['Brahmaputra', 'Godavari', 'Ganga', 'Indus'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das bekannteste klassische Tanzstil Indiens?', options: ['Kathak', 'Bharatanatyam', 'Odissi', 'Kuchipudi'], answer: 1 },
          en: { q: 'What is the most well-known classical dance style of India?', options: ['Kathak', 'Bharatanatyam', 'Odissi', 'Kuchipudi'], answer: 1 }
        },
        {
          de: { q: 'Welche Farbe steht im Mittelpunkt der indischen Flagge?', options: ['Rot', 'Weiß', 'Blau', 'Grün'], answer: 1 },
          en: { q: 'Which colour is in the centre of the Indian flag?', options: ['Red', 'White', 'Blue', 'Green'], answer: 1 }
        },
        {
          de: { q: 'Welche Stadt ist als "Pink City" bekannt?', options: ['Agra', 'Varanasi', 'Jaipur', 'Udaipur'], answer: 2 },
          en: { q: 'Which city is known as the "Pink City"?', options: ['Agra', 'Varanasi', 'Jaipur', 'Udaipur'], answer: 2 }
        },
        {
          de: { q: 'Welches indische Gewürz ist das teuerste der Welt?', options: ['Kurkuma', 'Kardamom', 'Safran', 'Zimt'], answer: 2 },
          en: { q: 'Which Indian spice is the most expensive in the world?', options: ['Turmeric', 'Cardamom', 'Saffron', 'Cinnamon'], answer: 2 }
        },
        {
          de: { q: 'Welche Sportart ist in Indien am beliebtesten?', options: ['Fußball', 'Hockey', 'Cricket', 'Kabaddi'], answer: 2 },
          en: { q: 'Which sport is most popular in India?', options: ['Football', 'Hockey', 'Cricket', 'Kabaddi'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das indische Zahlensystem, das weltweit verwendet wird?', options: ['Arabisches System', 'Römisches System', 'Hindu-Arabisches System', 'Babylonisches System'], answer: 2 },
          en: { q: 'What is the Indian numeral system used worldwide called?', options: ['Arabic system', 'Roman system', 'Hindu-Arabic system', 'Babylonian system'], answer: 2 }
        },
        {
          de: { q: 'Welches ist das größte Bundesland Indiens nach Fläche?', options: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh'], answer: 2 },
          en: { q: 'Which is the largest state in India by area?', options: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der indische Unabhängigkeitstag?', options: ['15. Juli', '26. Januar', '15. August', '2. Oktober'], answer: 2 },
          en: { q: 'When is India\'s Independence Day?', options: ['15 July', '26 January', '15 August', '2 October'], answer: 2 }
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
        },
        {
          de: { q: 'Wie heißt das japanische Schnellzugsystem?', options: ['Shinkansen', 'Tokaido', 'Nozomi', 'Hayabusa'], answer: 0 },
          en: { q: 'What is the Japanese high-speed rail system called?', options: ['Shinkansen', 'Tokaido', 'Nozomi', 'Hayabusa'], answer: 0 }
        },
        {
          de: { q: 'Was ist das traditionelle japanische Kleidungsstück?', options: ['Hanbok', 'Sari', 'Kimono', 'Ao Dai'], answer: 2 },
          en: { q: 'What is the traditional Japanese garment?', options: ['Hanbok', 'Sari', 'Kimono', 'Ao Dai'], answer: 2 }
        },
        {
          de: { q: 'Welches ist die größte Insel Japans?', options: ['Shikoku', 'Kyushu', 'Hokkaido', 'Honshu'], answer: 3 },
          en: { q: 'Which is the largest island of Japan?', options: ['Shikoku', 'Kyushu', 'Hokkaido', 'Honshu'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt der japanische Kampfsport mit Schwert?', options: ['Judo', 'Kendo', 'Karate', 'Aikido'], answer: 1 },
          en: { q: 'What is the Japanese sword martial art called?', options: ['Judo', 'Kendo', 'Karate', 'Aikido'], answer: 1 }
        },
        {
          de: { q: 'Welche Stadt war die erste Hauptstadt Japans?', options: ['Tokio', 'Osaka', 'Nara', 'Kyoto'], answer: 2 },
          en: { q: 'Which city was the first capital of Japan?', options: ['Tokyo', 'Osaka', 'Nara', 'Kyoto'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das japanische Nationalgericht aus rohem Fisch?', options: ['Tempura', 'Ramen', 'Sushi', 'Udon'], answer: 2 },
          en: { q: 'What is the Japanese national dish made from raw fish?', options: ['Tempura', 'Ramen', 'Sushi', 'Udon'], answer: 2 }
        },
        {
          de: { q: 'Welches Unternehmen produziert den Spielzeugklassiker "Nintendo"?', options: ['Sony', 'Panasonic', 'Nintendo', 'Sega'], answer: 2 },
          en: { q: 'Which company produces the gaming classic Nintendo?', options: ['Sony', 'Panasonic', 'Nintendo', 'Sega'], answer: 2 }
        },
        {
          de: { q: 'Welche Blume ist das Nationalsymbol Japans?', options: ['Chrysantheme', 'Lotus', 'Kirschblüte', 'Pfingstrose'], answer: 2 },
          en: { q: 'Which flower is the national symbol of Japan?', options: ['Chrysanthemum', 'Lotus', 'Cherry blossom', 'Peony'], answer: 2 }
        },
        {
          de: { q: 'Welche Atombombe wurde auf Hiroshima abgeworfen?', options: ['Fat Man', 'Little Boy', 'Big Boy', 'Thin Man'], answer: 1 },
          en: { q: 'Which atomic bomb was dropped on Hiroshima?', options: ['Fat Man', 'Little Boy', 'Big Boy', 'Thin Man'], answer: 1 }
        },
        {
          de: { q: 'In welchem Jahr öffnete Japan seine Grenzen zum Westen?', options: ['1848', '1853', '1868', '1889'], answer: 1 },
          en: { q: 'In which year did Japan open its borders to the West?', options: ['1848', '1853', '1868', '1889'], answer: 1 }
        },
        {
          de: { q: 'Welches Tier ist in Japan als Glückssymbol bekannt?', options: ['Drache', 'Karpfen', 'Kranich', 'Tiger'], answer: 2 },
          en: { q: 'Which animal is known as a symbol of good luck in Japan?', options: ['Dragon', 'Carp', 'Crane', 'Tiger'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt Japans bekanntester Manga-Künstler?', options: ['Hayao Miyazaki', 'Osamu Tezuka', 'Akira Toriyama', 'Naoki Urasawa'], answer: 1 },
          en: { q: 'Who is Japan\'s most famous manga artist?', options: ['Hayao Miyazaki', 'Osamu Tezuka', 'Akira Toriyama', 'Naoki Urasawa'], answer: 1 }
        },
        {
          de: { q: 'In welchem Meer liegt Japan?', options: ['Südchinesisches Meer', 'Arabisches Meer', 'Pazifischer Ozean', 'Indischer Ozean'], answer: 2 },
          en: { q: 'In which ocean does Japan lie?', options: ['South China Sea', 'Arabian Sea', 'Pacific Ocean', 'Indian Ocean'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der japanische Automobilhersteller mit dem Emblem eines Dreizacks?', options: ['Honda', 'Nissan', 'Mitsubishi', 'Subaru'], answer: 2 },
          en: { q: 'Which Japanese car manufacturer has a three-diamond emblem?', options: ['Honda', 'Nissan', 'Mitsubishi', 'Subaru'], answer: 2 }
        },
        {
          de: { q: 'Was bedeutet "Origami" auf Deutsch?', options: ['Papierkunst', 'Papierschneiden', 'Papierfalten', 'Papierdruck'], answer: 2 },
          en: { q: 'What does "Origami" mean in English?', options: ['Paper art', 'Paper cutting', 'Paper folding', 'Paper printing'], answer: 2 }
        },
        {
          de: { q: 'Welches japanische Alkoholgetränk wird aus Reis gebraut?', options: ['Shochu', 'Whisky', 'Sake', 'Umeshu'], answer: 2 },
          en: { q: 'Which Japanese alcoholic drink is brewed from rice?', options: ['Shochu', 'Whisky', 'Sake', 'Umeshu'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die traditionelle japanische Gartenkunst mit Miniaturbäumen?', options: ['Ikebana', 'Bonsai', 'Suiseki', 'Niwaki'], answer: 1 },
          en: { q: 'What is the Japanese art of miniature tree cultivation called?', options: ['Ikebana', 'Bonsai', 'Suiseki', 'Niwaki'], answer: 1 }
        },
        {
          de: { q: 'Welche Hauptinselgruppe gehört nicht zu Japan?', options: ['Ryukyu', 'Bonin', 'Kuril', 'Mariana'], answer: 3 },
          en: { q: 'Which major island group does not belong to Japan?', options: ['Ryukyu', 'Bonin', 'Kuril', 'Mariana'], answer: 3 }
        },
        {
          de: { q: 'Welche Stadt wurde 2011 von einem Tsunami und Erdbeben verwüstet?', options: ['Sendai', 'Fukushima', 'Miyako', 'Kesennuma'], answer: 0 },
          en: { q: 'Which city was devastated by the 2011 tsunami and earthquake?', options: ['Sendai', 'Fukushima', 'Miyako', 'Kesennuma'], answer: 0 }
        },
        {
          de: { q: 'Welche Farbe hat die japanische Flagge?', options: ['Weiß mit blauem Kreis', 'Weiß mit rotem Kreis', 'Rot mit weißem Kreis', 'Weiß mit schwarzem Kreis'], answer: 1 },
          en: { q: 'What colour scheme is on the Japanese flag?', options: ['White with blue circle', 'White with red circle', 'Red with white circle', 'White with black circle'], answer: 1 }
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
        },
        {
          de: { q: 'Welche Religion ist die Staatsreligion Saudi-Arabiens?', options: ['Christentum', 'Judentum', 'Islam', 'Buddhismus'], answer: 2 },
          en: { q: 'What is the state religion of Saudi Arabia?', options: ['Christianity', 'Judaism', 'Islam', 'Buddhism'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der König Saudi-Arabiens (seit 2015)?', options: ['König Abdullah', 'König Fahd', 'König Salman', 'König Faisal'], answer: 2 },
          en: { q: 'Who is the King of Saudi Arabia (since 2015)?', options: ['King Abdullah', 'King Fahd', 'King Salman', 'King Faisal'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt befindet sich der König-Fahd-Brunnen, einer der höchsten der Welt?', options: ['Riad', 'Medina', 'Mekka', 'Dschidda'], answer: 3 },
          en: { q: 'In which city is the King Fahd Fountain, one of the world\'s tallest, located?', options: ['Riyadh', 'Medina', 'Mecca', 'Jeddah'], answer: 3 }
        },
        {
          de: { q: 'Welches Meer liegt westlich von Saudi-Arabien?', options: ['Arabisches Meer', 'Rotes Meer', 'Persischer Golf', 'Indischer Ozean'], answer: 1 },
          en: { q: 'Which sea lies to the west of Saudi Arabia?', options: ['Arabian Sea', 'Red Sea', 'Persian Gulf', 'Indian Ocean'], answer: 1 }
        },
        {
          de: { q: 'Welcher Pilgerweg ist eine der fünf Säulen des Islam?', options: ['Jihad', 'Salat', 'Hadsch', 'Sawm'], answer: 2 },
          en: { q: 'Which pilgrimage is one of the Five Pillars of Islam?', options: ['Jihad', 'Salat', 'Hajj', 'Sawm'], answer: 2 }
        },
        {
          de: { q: 'Welches Unternehmen ist das größte Ölunternehmen Saudi-Arabiens?', options: ['BP', 'Shell', 'Saudi Aramco', 'ExxonMobil'], answer: 2 },
          en: { q: 'Which company is Saudi Arabia\'s largest oil company?', options: ['BP', 'Shell', 'Saudi Aramco', 'ExxonMobil'], answer: 2 }
        },
        {
          de: { q: 'Welche Halbinsel umfasst Saudi-Arabien zum Großteil?', options: ['Sinai-Halbinsel', 'Indische Halbinsel', 'Arabische Halbinsel', 'Anatolische Halbinsel'], answer: 2 },
          en: { q: 'Which peninsula does Saudi Arabia mostly occupy?', options: ['Sinai Peninsula', 'Indian Peninsula', 'Arabian Peninsula', 'Anatolian Peninsula'], answer: 2 }
        },
        {
          de: { q: 'Welches ist die offizielle Sprache Saudi-Arabiens?', options: ['Persisch', 'Türkisch', 'Arabisch', 'Urdu'], answer: 2 },
          en: { q: 'What is the official language of Saudi Arabia?', options: ['Persian', 'Turkish', 'Arabic', 'Urdu'], answer: 2 }
        },
        {
          de: { q: 'Welche Tierart ist das Nationaltier Saudi-Arabiens?', options: ['Dromedar', 'Arabisches Pferd', 'Falke', 'Löwe'], answer: 2 },
          en: { q: 'Which animal is the national animal of Saudi Arabia?', options: ['Dromedary', 'Arabian Horse', 'Falcon', 'Lion'], answer: 2 }
        },
        {
          de: { q: 'Welche Organisation gehört Saudi-Arabien an, die Ölpreise reguliert?', options: ['WTO', 'OPEC', 'ASEAN', 'G20'], answer: 1 },
          en: { q: 'Which organization regulating oil prices does Saudi Arabia belong to?', options: ['WTO', 'OPEC', 'ASEAN', 'G20'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt das historische Nabatäer-Weltkulturerbe in Saudi-Arabien?', options: ['Mada\'in Salih', 'Diriyah', 'Jizan', 'Tabuk'], answer: 0 },
          en: { q: 'What is the ancient Nabataean UNESCO World Heritage Site in Saudi Arabia?', options: ['Mada\'in Salih', 'Diriyah', 'Jizan', 'Tabuk'], answer: 0 }
        },
        {
          de: { q: 'In welchem Jahr durften Frauen in Saudi-Arabien erstmals Auto fahren?', options: ['2015', '2016', '2017', '2018'], answer: 3 },
          en: { q: 'In which year were women in Saudi Arabia first allowed to drive?', options: ['2015', '2016', '2017', '2018'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die Vision Saudi-Arabiens für wirtschaftliche Diversifizierung?', options: ['Vision 2030', 'Saudi Vision 2050', 'Plan 2040', 'Neom 2035'], answer: 0 },
          en: { q: 'What is Saudi Arabia\'s economic diversification plan called?', options: ['Vision 2030', 'Saudi Vision 2050', 'Plan 2040', 'Neom 2035'], answer: 0 }
        },
        {
          de: { q: 'Welches Land grenzt im Norden an Saudi-Arabien?', options: ['Iran', 'Oman', 'Irak', 'Ägypten'], answer: 2 },
          en: { q: 'Which country borders Saudi Arabia to the north?', options: ['Iran', 'Oman', 'Iraq', 'Egypt'], answer: 2 }
        },
        {
          de: { q: 'Welches traditionelle Kleidungsstück tragen saudische Männer?', options: ['Kaftan', 'Dishdasha', 'Thobe', 'Kandura'], answer: 2 },
          en: { q: 'What traditional garment do Saudi men wear?', options: ['Kaftan', 'Dishdasha', 'Thobe', 'Kandura'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das islamische Gebetshaus?', options: ['Synagoge', 'Kirche', 'Moschee', 'Tempel'], answer: 2 },
          en: { q: 'What is the Islamic place of worship called?', options: ['Synagogue', 'Church', 'Mosque', 'Temple'], answer: 2 }
        },
        {
          de: { q: 'Welches Fußballteam gewann bei der WM 2022 gegen Argentinien?', options: ['Japan', 'Marokko', 'Saudi-Arabien', 'Australien'], answer: 2 },
          en: { q: 'Which football team upset Argentina at the 2022 World Cup?', options: ['Japan', 'Morocco', 'Saudi Arabia', 'Australia'], answer: 2 }
        },
        {
          de: { q: 'Was ist das Nationalgericht Saudi-Arabiens?', options: ['Kabsa', 'Mandi', 'Shawarma', 'Hummus'], answer: 0 },
          en: { q: 'What is the national dish of Saudi Arabia?', options: ['Kabsa', 'Mandi', 'Shawarma', 'Hummus'], answer: 0 }
        },
        {
          de: { q: 'Welches Bauwerk ist das höchste Gebäude Saudi-Arabiens?', options: ['Abraj Al-Bait Tower', 'Kingdom Centre Tower', 'Al Faisaliyah Center', 'Makkah Clock Royal Tower'], answer: 0 },
          en: { q: 'Which building is the tallest in Saudi Arabia?', options: ['Abraj Al-Bait Tower', 'Kingdom Centre Tower', 'Al Faisaliyah Center', 'Makkah Clock Royal Tower'], answer: 0 }
        },
        {
          de: { q: 'Welche Sportart ist in Saudi-Arabien besonders beliebt?', options: ['Basketball', 'Cricket', 'Fußball', 'Tennis'], answer: 2 },
          en: { q: 'Which sport is especially popular in Saudi Arabia?', options: ['Basketball', 'Cricket', 'Football', 'Tennis'], answer: 2 }
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
        },
        {
          de: { q: 'Welche Religion hat in Thailand die meisten Anhänger?', options: ['Hinduismus', 'Islam', 'Christentum', 'Buddhismus'], answer: 3 },
          en: { q: 'Which religion has the most followers in Thailand?', options: ['Hinduism', 'Islam', 'Christianity', 'Buddhism'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt das berühmte Straßengericht Thailands aus gebratenen Nudeln?', options: ['Tom Yum', 'Pad Thai', 'Som Tam', 'Khao Pad'], answer: 1 },
          en: { q: 'What is Thailand\'s famous street food dish of stir-fried noodles?', options: ['Tom Yum', 'Pad Thai', 'Som Tam', 'Khao Pad'], answer: 1 }
        },
        {
          de: { q: 'Wie hieß Thailand früher?', options: ['Siam', 'Ayutthaya', 'Sukhothai', 'Lanna'], answer: 0 },
          en: { q: 'What was Thailand formerly called?', options: ['Siam', 'Ayutthaya', 'Sukhothai', 'Lanna'], answer: 0 }
        },
        {
          de: { q: 'Welcher Fluss fließt durch Bangkok?', options: ['Mekong', 'Mun', 'Chi', 'Chao Phraya'], answer: 3 },
          en: { q: 'Which river flows through Bangkok?', options: ['Mekong', 'Mun', 'Chi', 'Chao Phraya'], answer: 3 }
        },
        {
          de: { q: 'Welches Land grenzt im Westen an Thailand?', options: ['Laos', 'Kambodscha', 'Malaysia', 'Myanmar'], answer: 3 },
          en: { q: 'Which country borders Thailand to the west?', options: ['Laos', 'Cambodia', 'Malaysia', 'Myanmar'], answer: 3 }
        },
        {
          de: { q: 'Welcher König regierte Thailand am längsten?', options: ['König Bhumibol Adulyadej', 'König Vajiravudh', 'König Mongkut', 'König Chulalongkorn'], answer: 0 },
          en: { q: 'Which king reigned over Thailand the longest?', options: ['King Bhumibol Adulyadej', 'King Vajiravudh', 'King Mongkut', 'King Chulalongkorn'], answer: 0 }
        },
        {
          de: { q: 'Welcher Kampfsport stammt aus Thailand?', options: ['Taekwondo', 'Judo', 'Muay Thai', 'Silat'], answer: 2 },
          en: { q: 'Which martial art originates from Thailand?', options: ['Taekwondo', 'Judo', 'Muay Thai', 'Silat'], answer: 2 }
        },
        {
          de: { q: 'Welche Insel ist Thailands größte Touristeninsel?', options: ['Koh Samui', 'Koh Chang', 'Phuket', 'Koh Phangan'], answer: 2 },
          en: { q: 'Which island is Thailand\'s largest tourist island?', options: ['Koh Samui', 'Koh Chang', 'Phuket', 'Koh Phangan'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die historische Königsstadt nördlich von Bangkok?', options: ['Chiang Rai', 'Sukhothai', 'Ayutthaya', 'Lopburi'], answer: 2 },
          en: { q: 'What is the historic royal city north of Bangkok called?', options: ['Chiang Rai', 'Sukhothai', 'Ayutthaya', 'Lopburi'], answer: 2 }
        },
        {
          de: { q: 'Welches Fest wird in Thailand mit Wasserschlachten gefeiert?', options: ['Loi Krathong', 'Songkran', 'Yi Peng', 'Bun Bang Fai'], answer: 1 },
          en: { q: 'Which festival in Thailand is celebrated with water fights?', options: ['Loi Krathong', 'Songkran', 'Yi Peng', 'Bun Bang Fai'], answer: 1 }
        },
        {
          de: { q: 'Was ist die Hauptstadt der Provinz Chiang Mai?', options: ['Chiang Rai', 'Chiang Mai', 'Lampang', 'Lamphun'], answer: 1 },
          en: { q: 'What is the capital city of Chiang Mai province?', options: ['Chiang Rai', 'Chiang Mai', 'Lampang', 'Lamphun'], answer: 1 }
        },
        {
          de: { q: 'Welche Frucht ist die "Königin der Früchte" in Thailand?', options: ['Durian', 'Mango', 'Mangosteen', 'Rambutan'], answer: 2 },
          en: { q: 'Which fruit is the "Queen of Fruits" in Thailand?', options: ['Durian', 'Mango', 'Mangosteen', 'Rambutan'], answer: 2 }
        },
        {
          de: { q: 'Welche Suppe ist eines der bekanntesten Gerichte Thailands?', options: ['Pho', 'Tom Yum', 'Laksa', 'Ramen'], answer: 1 },
          en: { q: 'Which soup is one of Thailand\'s most famous dishes?', options: ['Pho', 'Tom Yum', 'Laksa', 'Ramen'], answer: 1 }
        },
        {
          de: { q: 'Welche Staatsform hat Thailand?', options: ['Republik', 'Bundesstaat', 'Konstitutionelle Monarchie', 'Absolute Monarchie'], answer: 2 },
          en: { q: 'What form of government does Thailand have?', options: ['Republic', 'Federal State', 'Constitutional Monarchy', 'Absolute Monarchy'], answer: 2 }
        },
        {
          de: { q: 'In welchem Golf liegt Thailand?', options: ['Golf von Bengalen', 'Golf von Oman', 'Golf von Thailand', 'Persischer Golf'], answer: 2 },
          en: { q: 'In which gulf does Thailand have coastline?', options: ['Bay of Bengal', 'Gulf of Oman', 'Gulf of Thailand', 'Persian Gulf'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die zweitgrößte Stadt Thailands?', options: ['Pattaya', 'Phuket', 'Nonthaburi', 'Chiang Mai'], answer: 3 },
          en: { q: 'What is the second largest city in Thailand?', options: ['Pattaya', 'Phuket', 'Nonthaburi', 'Chiang Mai'], answer: 3 }
        },
        {
          de: { q: 'Welches Alphabet wird in Thailand verwendet?', options: ['Lateinisches Alphabet', 'Arabisches Alphabet', 'Khmer-Schrift', 'Thailändische Schrift'], answer: 3 },
          en: { q: 'Which alphabet is used in Thailand?', options: ['Latin alphabet', 'Arabic alphabet', 'Khmer script', 'Thai script'], answer: 3 }
        },
        {
          de: { q: 'Welches Land grenzt im Süden an Thailand?', options: ['Kambodscha', 'Laos', 'Myanmar', 'Malaysia'], answer: 3 },
          en: { q: 'Which country borders Thailand to the south?', options: ['Cambodia', 'Laos', 'Myanmar', 'Malaysia'], answer: 3 }
        },
        {
          de: { q: 'Welche Farben hat die thailändische Flagge?', options: ['Rot, Weiß, Blau', 'Gelb, Rot, Grün', 'Blau, Weiß, Grün', 'Rot, Gelb, Weiß'], answer: 0 },
          en: { q: 'What colours are on the Thai flag?', options: ['Red, White, Blue', 'Yellow, Red, Green', 'Blue, White, Green', 'Red, Yellow, White'], answer: 0 }
        },
        {
          de: { q: 'Welche Katzenrasse stammt ursprünglich aus Thailand?', options: ['Perser', 'Bengale', 'Siamkatze', 'Ragdoll'], answer: 2 },
          en: { q: 'Which cat breed originally comes from Thailand?', options: ['Persian', 'Bengal', 'Siamese', 'Ragdoll'], answer: 2 }
        }
      ]
    }
  ]
};
