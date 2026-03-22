var AMERICAS = {
  id: 'americas',
  name: { de: 'Amerika', en: 'Americas' },
  countries: [
    {
      id: 'argentina',
      name: { de: 'Argentinien', en: 'Argentina' },
      anthem: 'assets/audio/anthems/argentina.mp3',
      background: 'assets/backgrounds/argentina.png',
      enemyType: 'argentina_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Argentinien?', options: ['Montevideo', 'Santiago', 'Buenos Aires', 'Lima'], answer: 2 },
          en: { q: 'What is the capital of Argentina?', options: ['Montevideo', 'Santiago', 'Buenos Aires', 'Lima'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die argentinische Währung?', options: ['Real', 'Sol', 'Peso', 'Boliviano'], answer: 2 },
          en: { q: 'What is the Argentine currency?', options: ['Real', 'Sol', 'Peso', 'Boliviano'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte argentinische Tanz?', options: ['Samba', 'Merengue', 'Cumbia', 'Tango'], answer: 3 },
          en: { q: 'What is the famous Argentine dance?', options: ['Samba', 'Merengue', 'Cumbia', 'Tango'], answer: 3 }
        },
        {
          de: { q: 'Wie heißen die berühmten Wasserfälle an der Grenze Argentiniens?', options: ['Niagara', 'Victoria', 'Iguazú', 'Angel'], answer: 2 },
          en: { q: 'What are the famous waterfalls on the Argentina border?', options: ['Niagara', 'Victoria', 'Iguazu', 'Angel'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der längste Fluss Argentiniens?', options: ['Amazonas', 'Orinoco', 'Paraguay', 'Paraná'], answer: 3 },
          en: { q: 'What is the longest river in Argentina?', options: ['Amazon', 'Orinoco', 'Paraguay', 'Parana'], answer: 3 }
        },
        {
          de: { q: 'Welches Gebirge bildet die natürliche Grenze Argentiniens im Westen?', options: ['Anden', 'Kordilleren', 'Sierra Madre', 'Ural'], answer: 0 },
          en: { q: 'Which mountain range forms Argentina\'s natural western border?', options: ['Andes', 'Cordillera', 'Sierra Madre', 'Ural'], answer: 0 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg Argentiniens und Südamerikas?', options: ['Huascarán', 'Cotopaxi', 'Aconcagua', 'Chimborazo'], answer: 2 },
          en: { q: 'What is the highest mountain in Argentina and South America?', options: ['Huascaran', 'Cotopaxi', 'Aconcagua', 'Chimborazo'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr gewann Argentinien zuletzt die FIFA-Fußballweltmeisterschaft?', options: ['2014', '2018', '2022', '2010'], answer: 2 },
          en: { q: 'In which year did Argentina last win the FIFA Football World Cup?', options: ['2014', '2018', '2022', '2010'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte argentinische Fußballspieler, der 2022 den WM-Titel gewann?', options: ['Ronaldo', 'Neymar', 'Messi', 'Mbappé'], answer: 2 },
          en: { q: 'What is the name of the famous Argentine footballer who won the World Cup in 2022?', options: ['Ronaldo', 'Neymar', 'Messi', 'Mbappe'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die Wüste im Süden Argentiniens?', options: ['Atacama', 'Sahara', 'Sonora', 'Patagonien'], answer: 3 },
          en: { q: 'What is the name of the arid region in southern Argentina?', options: ['Atacama', 'Sahara', 'Sonoran', 'Patagonia'], answer: 3 }
        },
        {
          de: { q: 'Welche Sprache ist die Amtssprache Argentiniens?', options: ['Portugiesisch', 'Italienisch', 'Spanisch', 'Französisch'], answer: 2 },
          en: { q: 'What is the official language of Argentina?', options: ['Portuguese', 'Italian', 'Spanish', 'French'], answer: 2 }
        },
        {
          de: { q: 'Welches Land grenzt im Osten an Argentinien über den Río de la Plata?', options: ['Paraguay', 'Chile', 'Uruguay', 'Bolivien'], answer: 2 },
          en: { q: 'Which country borders Argentina to the east across the Río de la Plata?', options: ['Paraguay', 'Chile', 'Uruguay', 'Bolivia'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das berühmte argentinische Grillgericht?', options: ['Ceviche', 'Asado', 'Empanada', 'Feijoada'], answer: 1 },
          en: { q: 'What is the famous Argentine barbecue dish?', options: ['Ceviche', 'Asado', 'Empanada', 'Feijoada'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt das argentinische Kräutergetränk, das traditionell aus einem Kürbis getrunken wird?', options: ['Yerba Mate', 'Chicha', 'Horchata', 'Guarapo'], answer: 0 },
          en: { q: 'What is the Argentine herbal drink traditionally drunk from a gourd?', options: ['Yerba Mate', 'Chicha', 'Horchata', 'Guarapo'], answer: 0 }
        },
        {
          de: { q: 'Wer war die berühmte First Lady Argentiniens, die in einem Musical verewigt wurde?', options: ['Isabel Perón', 'Eva Perón', 'Cristina Kirchner', 'María Estela Martínez'], answer: 1 },
          en: { q: 'Who was the famous Argentine First Lady immortalised in a musical?', options: ['Isabel Peron', 'Eva Peron', 'Cristina Kirchner', 'Maria Estela Martinez'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt die südlichste Stadt der Welt in Argentinien?', options: ['Punta Arenas', 'Ushuaia', 'Puerto Madryn', 'Bariloche'], answer: 1 },
          en: { q: 'What is the name of the southernmost city in the world, located in Argentina?', options: ['Punta Arenas', 'Ushuaia', 'Puerto Madryn', 'Bariloche'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der argentinische Revolutionär, der ein weltbekanntes Gesicht auf T-Shirts wurde?', options: ['Simón Bolívar', 'José de San Martín', 'Che Guevara', 'Fidel Castro'], answer: 2 },
          en: { q: 'What is the name of the Argentine revolutionary whose face became iconic on T-shirts worldwide?', options: ['Simon Bolivar', 'Jose de San Martin', 'Che Guevara', 'Fidel Castro'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahrzehnt fand der Falklandkrieg zwischen Argentinien und Großbritannien statt?', options: ['1970er', '1980er', '1990er', '2000er'], answer: 1 },
          en: { q: 'In which decade did the Falklands War between Argentina and the UK take place?', options: ['1970s', '1980s', '1990s', '2000s'], answer: 1 }
        },
        {
          de: { q: 'Welche Tierart ist auf der argentinischen Nationalflagge abgebildet?', options: ['Kondor', 'Puma', 'Keine - nur eine Sonne', 'Guanako'], answer: 2 },
          en: { q: 'What symbol appears on the Argentine national flag?', options: ['Condor', 'Puma', 'A sun only', 'Guanaco'], answer: 2 }
        },
        {
          de: { q: 'Welcher Papst stammt ursprünglich aus Argentinien?', options: ['Johannes Paul II.', 'Benedikt XVI.', 'Franziskus', 'Gregor XVI.'], answer: 2 },
          en: { q: 'Which Pope originally comes from Argentina?', options: ['John Paul II', 'Benedict XVI', 'Francis', 'Gregory XVI'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der größte See Argentiniens?', options: ['Lago Nahuel Huapi', 'Lago Buenos Aires', 'Lago Mar Chiquita', 'Lago Argentino'], answer: 2 },
          en: { q: 'What is the largest lake in Argentina?', options: ['Lake Nahuel Huapi', 'Lake Buenos Aires', 'Mar Chiquita', 'Lake Argentino'], answer: 2 }
        },
        {
          de: { q: 'Welcher Kontinent liegt der argentinischen Antarktisprovinz am nächsten?', options: ['Afrika', 'Australien', 'Südamerika', 'Antarktis'], answer: 3 },
          en: { q: 'Which landmass is closest to Argentina\'s Antarctic territory?', options: ['Africa', 'Australia', 'South America', 'Antarctica'], answer: 3 }
        },
        {
          de: { q: 'Welche Sportart ist neben Fußball besonders typisch für die argentinische Oberschicht?', options: ['Cricket', 'Rugby', 'Polo', 'Tennis'], answer: 2 },
          en: { q: 'Which sport besides football is particularly associated with the Argentine upper class?', options: ['Cricket', 'Rugby', 'Polo', 'Tennis'], answer: 2 }
        },
        {
          de: { q: 'Wie viele Provinzen hat Argentinien?', options: ['18', '20', '23', '25'], answer: 2 },
          en: { q: 'How many provinces does Argentina have?', options: ['18', '20', '23', '25'], answer: 2 }
        },
        {
          de: { q: 'Welcher argentinische Formel-1-Fahrer wurde in den 1950er Jahren Weltmeister?', options: ['Carlos Reutemann', 'Juan Manuel Fangio', 'Emerson Fittipaldi', 'Nelson Piquet'], answer: 1 },
          en: { q: 'Which Argentine Formula 1 driver became world champion in the 1950s?', options: ['Carlos Reutemann', 'Juan Manuel Fangio', 'Emerson Fittipaldi', 'Nelson Piquet'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt die Steppe in Argentinien, die für Rinderzucht bekannt ist?', options: ['Cerrado', 'Llanos', 'Pampa', 'Caatinga'], answer: 2 },
          en: { q: 'What is the name of the Argentine grassland plain famous for cattle ranching?', options: ['Cerrado', 'Llanos', 'Pampa', 'Caatinga'], answer: 2 }
        }
      ]
    },
    {
      id: 'brazil',
      name: { de: 'Brasilien', en: 'Brazil' },
      anthem: 'assets/audio/anthems/brazil.mp3',
      background: 'assets/backgrounds/brazil.png',
      enemyType: 'brazil_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Brasilien?', options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'], answer: 2 },
          en: { q: 'What is the capital of Brazil?', options: ['Rio de Janeiro', 'São Paulo', 'Brasilia', 'Salvador'], answer: 2 }
        },
        {
          de: { q: 'Was ist die größte Stadt Brasiliens?', options: ['Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'São Paulo'], answer: 3 },
          en: { q: 'What is the largest city in Brazil?', options: ['Rio de Janeiro', 'Brasilia', 'Belo Horizonte', 'Sao Paulo'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die brasilianische Währung?', options: ['Peso', 'Sol', 'Real', 'Cruzeiro'], answer: 2 },
          en: { q: 'What is the Brazilian currency?', options: ['Peso', 'Sol', 'Real', 'Cruzeiro'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt findet das berühmte brasilianische Karneval statt?', options: ['São Paulo', 'Brasília', 'Rio de Janeiro', 'Salvador'], answer: 2 },
          en: { q: 'In which city is the famous Brazilian carnival held?', options: ['São Paulo', 'Brasilia', 'Rio de Janeiro', 'Salvador'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der größte Fluss Brasiliens?', options: ['Orinoco', 'Paraná', 'Amazonas', 'Paraguay'], answer: 2 },
          en: { q: 'What is the largest river in Brazil?', options: ['Orinoco', 'Parana', 'Amazon', 'Paraguay'], answer: 2 }
        },
        {
          de: { q: 'Welche Sprache ist die Amtssprache Brasiliens?', options: ['Spanisch', 'Französisch', 'Portugiesisch', 'Englisch'], answer: 2 },
          en: { q: 'What is the official language of Brazil?', options: ['Spanish', 'French', 'Portuguese', 'English'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die berühmte Christusstatue in Rio de Janeiro?', options: ['Cristo Salvador', 'Cristo Redentor', 'Cristo Liberador', 'Cristo Eterno'], answer: 1 },
          en: { q: 'What is the name of the famous Christ statue in Rio de Janeiro?', options: ['Cristo Salvador', 'Cristo Redentor', 'Cristo Liberator', 'Cristo Eternal'], answer: 1 }
        },
        {
          de: { q: 'Wie oft hat Brasilien die FIFA-Fußballweltmeisterschaft gewonnen?', options: ['3', '4', '5', '6'], answer: 2 },
          en: { q: 'How many times has Brazil won the FIFA Football World Cup?', options: ['3', '4', '5', '6'], answer: 2 }
        },
        {
          de: { q: 'Welches ist das flächenmäßig größte Land Südamerikas?', options: ['Argentinien', 'Kolumbien', 'Brasilien', 'Peru'], answer: 2 },
          en: { q: 'Which is the largest country in South America by area?', options: ['Argentina', 'Colombia', 'Brazil', 'Peru'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte brasilianische Strand in Rio de Janeiro?', options: ['Punta del Este', 'Copacabana', 'Ipanema', 'Leblon'], answer: 1 },
          en: { q: 'What is the name of the most famous beach in Rio de Janeiro?', options: ['Punta del Este', 'Copacabana', 'Ipanema', 'Leblon'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt das typisch brasilianische Bohnen-Fleisch-Eintopfgericht?', options: ['Churrasco', 'Moqueca', 'Feijoada', 'Vatapá'], answer: 2 },
          en: { q: 'What is the name of the typical Brazilian bean and meat stew?', options: ['Churrasco', 'Moqueca', 'Feijoada', 'Vatapa'], answer: 2 }
        },
        {
          de: { q: 'Welches europäische Land kolonisierte Brasilien?', options: ['Spanien', 'Portugal', 'Frankreich', 'Niederlande'], answer: 1 },
          en: { q: 'Which European country colonised Brazil?', options: ['Spain', 'Portugal', 'France', 'Netherlands'], answer: 1 }
        },
        {
          de: { q: 'In welchem Jahr erklärte Brasilien seine Unabhängigkeit?', options: ['1810', '1816', '1822', '1831'], answer: 2 },
          en: { q: 'In which year did Brazil declare independence?', options: ['1810', '1816', '1822', '1831'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der brasilianische Kampfsportart, der auch Tanz und Musik vereint?', options: ['Jiu-Jitsu', 'Capoeira', 'Muay Thai', 'Savate'], answer: 1 },
          en: { q: 'What is the Brazilian martial art that also combines dance and music?', options: ['Jiu-Jitsu', 'Capoeira', 'Muay Thai', 'Savate'], answer: 1 }
        },
        {
          de: { q: 'Welcher brasilianische Fahrer gilt als einer der größten Formel-1-Piloten aller Zeiten?', options: ['Nelson Piquet', 'Emerson Fittipaldi', 'Ayrton Senna', 'Rubens Barrichello'], answer: 2 },
          en: { q: 'Which Brazilian driver is considered one of the greatest Formula 1 drivers of all time?', options: ['Nelson Piquet', 'Emerson Fittipaldi', 'Ayrton Senna', 'Rubens Barrichello'], answer: 2 }
        },
        {
          de: { q: 'Welcher brasilianische Fußballer gilt als einer der besten Spieler aller Zeiten und wurde mit dem Spitznamen „Der König" bekannt?', options: ['Ronaldo', 'Ronaldinho', 'Pelé', 'Zico'], answer: 2 },
          en: { q: 'Which Brazilian footballer is considered one of the best of all time and known as "The King"?', options: ['Ronaldo', 'Ronaldinho', 'Pele', 'Zico'], answer: 2 }
        },
        {
          de: { q: 'Welches Ökosystem bedeckt den größten Teil des nördlichen Brasiliens?', options: ['Savanne', 'Regenwald', 'Steppe', 'Mangroven'], answer: 1 },
          en: { q: 'Which ecosystem covers most of northern Brazil?', options: ['Savanna', 'Rainforest', 'Steppe', 'Mangroves'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt das berühmte Naturschutzgebiet im Pantanal Brasiliens?', options: ['Amazonas-Nationalpark', 'Pantanal-Feuchtgebiet', 'Chapada Diamantina', 'Lençóis Maranhenses'], answer: 1 },
          en: { q: 'What is Brazil\'s Pantanal best known as?', options: ['Amazon National Park', 'Pantanal Wetlands', 'Chapada Diamantina', 'Lencois Maranhenses'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt die brasilianische Nationalmannschaft im Fußball mit ihrem Spitznamen?', options: ['Os Guerreiros', 'A Seleção', 'Os Capoeiristas', 'Bandeirantes'], answer: 1 },
          en: { q: 'What is the nickname of the Brazilian national football team?', options: ['Os Guerreiros', 'A Selecao', 'Os Capoeiristas', 'Bandeirantes'], answer: 1 }
        },
        {
          de: { q: 'In welcher Region Brasiliens befindet sich das Amazonas-Becken hauptsächlich?', options: ['Südosten', 'Nordosten', 'Norden', 'Süden'], answer: 2 },
          en: { q: 'In which region of Brazil is the Amazon Basin mainly located?', options: ['Southeast', 'Northeast', 'North', 'South'], answer: 2 }
        },
        {
          de: { q: 'Welches brasilianische Getränk wird aus dem Zuckerrohrschnaps Cachaça, Limette und Zucker hergestellt?', options: ['Mojito', 'Caipirinha', 'Daiquiri', 'Pisco Sour'], answer: 1 },
          en: { q: 'Which Brazilian cocktail is made from cachaça, lime and sugar?', options: ['Mojito', 'Caipirinha', 'Daiquiri', 'Pisco Sour'], answer: 1 }
        },
        {
          de: { q: 'Welches Land grenzt nicht an Brasilien?', options: ['Bolivien', 'Chile', 'Kolumbien', 'Venezuela'], answer: 1 },
          en: { q: 'Which country does NOT border Brazil?', options: ['Bolivia', 'Chile', 'Colombia', 'Venezuela'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der berühmte Zuckerhut in Rio de Janeiro auf Portugiesisch?', options: ['Corcovado', 'Pão de Açúcar', 'Pedra da Gávea', 'Serra dos Órgãos'], answer: 1 },
          en: { q: 'What is the Portuguese name for the famous Sugarloaf Mountain in Rio de Janeiro?', options: ['Corcovado', 'Pao de Acucar', 'Pedra da Gavea', 'Serra dos Orgaos'], answer: 1 }
        },
        {
          de: { q: 'Was ist Brasiliens größtes Exportprodukt im Bereich Landwirtschaft?', options: ['Mais', 'Bananen', 'Sojabohnen', 'Kaffee'], answer: 2 },
          en: { q: 'What is Brazil\'s largest agricultural export?', options: ['Corn', 'Bananas', 'Soybeans', 'Coffee'], answer: 2 }
        },
        {
          de: { q: 'Welche brasilianische Metropole liegt auf einem Hochplateau auf 760 Metern über dem Meeresspiegel?', options: ['Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'São Paulo'], answer: 3 },
          en: { q: 'Which Brazilian metropolis sits on a plateau at 760 metres above sea level?', options: ['Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Sao Paulo'], answer: 3 }
        }
      ]
    },
    {
      id: 'canada',
      name: { de: 'Kanada', en: 'Canada' },
      anthem: 'assets/audio/anthems/canada.mp3',
      background: 'assets/backgrounds/canada.png',
      enemyType: 'canada_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Kanada?', options: ['Toronto', 'Vancouver', 'Montréal', 'Ottawa'], answer: 3 },
          en: { q: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'], answer: 3 }
        },
        {
          de: { q: 'Was ist die größte Stadt Kanadas?', options: ['Ottawa', 'Vancouver', 'Montréal', 'Toronto'], answer: 3 },
          en: { q: 'What is the largest city in Canada?', options: ['Ottawa', 'Vancouver', 'Montreal', 'Toronto'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die kanadische Währung?', options: ['US-Dollar', 'Pfund', 'Kanadischer Dollar', 'Loonie'], answer: 2 },
          en: { q: 'What is the Canadian currency?', options: ['US Dollar', 'Pound', 'Canadian Dollar', 'Loonie'], answer: 2 }
        },
        {
          de: { q: 'Was sind die Amtssprachen Kanadas?', options: ['Englisch und Spanisch', 'Englisch und Französisch', 'Französisch und Niederländisch', 'Englisch und Inuktitut'], answer: 1 },
          en: { q: 'What are the official languages of Canada?', options: ['English and Spanish', 'English and French', 'French and Dutch', 'English and Inuktitut'], answer: 1 }
        },
        {
          de: { q: 'Was ist das Nationaltier Kanadas?', options: ['Elch', 'Grizzlybär', 'Biber', 'Karibu'], answer: 2 },
          en: { q: 'What is the national animal of Canada?', options: ['Moose', 'Grizzly Bear', 'Beaver', 'Caribou'], answer: 2 }
        },
        {
          de: { q: 'Wie viele Provinzen und Territorien hat Kanada insgesamt?', options: ['10 Provinzen und 2 Territorien', '10 Provinzen und 3 Territorien', '12 Provinzen und 1 Territorium', '9 Provinzen und 3 Territorien'], answer: 1 },
          en: { q: 'How many provinces and territories does Canada have in total?', options: ['10 provinces and 2 territories', '10 provinces and 3 territories', '12 provinces and 1 territory', '9 provinces and 3 territories'], answer: 1 }
        },
        {
          de: { q: 'Welcher Ozean grenzt an die Westküste Kanadas?', options: ['Atlantik', 'Arktischer Ozean', 'Pazifik', 'Indischer Ozean'], answer: 2 },
          en: { q: 'Which ocean borders Canada\'s west coast?', options: ['Atlantic', 'Arctic Ocean', 'Pacific', 'Indian Ocean'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte Nationalpark mit den Rocky Mountains in Alberta?', options: ['Jasper', 'Yoho', 'Banff', 'Kootenay'], answer: 2 },
          en: { q: 'What is the name of the famous national park in the Rocky Mountains in Alberta?', options: ['Jasper', 'Yoho', 'Banff', 'Kootenay'], answer: 2 }
        },
        {
          de: { q: 'Welcher Nationalsport wird oft als Kanadas beliebtester Wintersport bezeichnet?', options: ['Curling', 'Skifahren', 'Eishockey', 'Snowboard'], answer: 2 },
          en: { q: 'Which national sport is often called Canada\'s most popular winter sport?', options: ['Curling', 'Skiing', 'Ice Hockey', 'Snowboarding'], answer: 2 }
        },
        {
          de: { q: 'Welcher Fluss fließt durch Ottawa?', options: ['Sankt-Lorenz-Strom', 'Fraserfluss', 'Ottawa River', 'Yukonfluss'], answer: 2 },
          en: { q: 'Which river flows through Ottawa?', options: ['St Lawrence River', 'Fraser River', 'Ottawa River', 'Yukon River'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das Symbol auf der kanadischen Nationalflagge?', options: ['Eichenblatt', 'Ahornblatt', 'Birkenblatt', 'Kastanienblatt'], answer: 1 },
          en: { q: 'What symbol appears on the Canadian national flag?', options: ['Oak leaf', 'Maple leaf', 'Birch leaf', 'Chestnut leaf'], answer: 1 }
        },
        {
          de: { q: 'Welche kanadische Provinz ist die einzige offiziell frankophone?', options: ['Ontario', 'New Brunswick', 'Québec', 'Manitoba'], answer: 2 },
          en: { q: 'Which Canadian province is the only officially francophone one?', options: ['Ontario', 'New Brunswick', 'Quebec', 'Manitoba'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der größte See vollständig innerhalb Kanadas?', options: ['Oberer See', 'Huronsee', 'Großer Bärensee', 'Manitobasee'], answer: 2 },
          en: { q: 'What is the largest lake located entirely within Canada?', options: ['Lake Superior', 'Lake Huron', 'Great Bear Lake', 'Lake Manitoba'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte kanadische Arzt, der Insulin mitentdeckt hat?', options: ['Alexander Graham Bell', 'Frederick Banting', 'Wilder Penfield', 'Norman Bethune'], answer: 1 },
          en: { q: 'What is the name of the famous Canadian doctor who co-discovered insulin?', options: ['Alexander Graham Bell', 'Frederick Banting', 'Wilder Penfield', 'Norman Bethune'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt die Provinz an der Westküste Kanadas mit der Stadt Vancouver?', options: ['Alberta', 'Saskatchewan', 'British Columbia', 'Yukon'], answer: 2 },
          en: { q: 'What is the name of the west coast province containing Vancouver?', options: ['Alberta', 'Saskatchewan', 'British Columbia', 'Yukon'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr wurde Kanada als eigenständige Dominium vom Vereinigten Königreich unabhängig (Confederation)?', options: ['1848', '1857', '1867', '1901'], answer: 2 },
          en: { q: 'In which year did Canada become a self-governing Dominion (Confederation)?', options: ['1848', '1857', '1867', '1901'], answer: 2 }
        },
        {
          de: { q: 'Welches ist das flächenmäßig größte Land der Welt nach Russland?', options: ['USA', 'China', 'Kanada', 'Australien'], answer: 2 },
          en: { q: 'Which is the second largest country in the world by area after Russia?', options: ['USA', 'China', 'Canada', 'Australia'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das populäre kanadische Fast-Food-Restaurant, bekannt für seinen Kaffee und Donuts?', options: ['Harvey\'s', 'Swiss Chalet', 'Tim Hortons', 'A&W'], answer: 2 },
          en: { q: 'What is the popular Canadian fast food chain known for its coffee and doughnuts?', options: ['Harvey\'s', 'Swiss Chalet', 'Tim Hortons', 'A&W'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das typisch kanadische Gericht aus Pommes frites, Käsebruch und Sauce?', options: ['Tourtière', 'Poutine', 'Bannock', 'Nanaimo Bar'], answer: 1 },
          en: { q: 'What is the name of the typical Canadian dish made of fries, cheese curds and gravy?', options: ['Tourtiere', 'Poutine', 'Bannock', 'Nanaimo Bar'], answer: 1 }
        },
        {
          de: { q: 'Welcher kanadische Premierminister ist der Sohn eines früheren Premierministers?', options: ['Jean Chrétien', 'Paul Martin', 'Justin Trudeau', 'Stephen Harper'], answer: 2 },
          en: { q: 'Which Canadian Prime Minister is the son of a former Prime Minister?', options: ['Jean Chretien', 'Paul Martin', 'Justin Trudeau', 'Stephen Harper'], answer: 2 }
        },
        {
          de: { q: 'Welche Meeresstraße trennt Kanada von Grönland im Nordosten?', options: ['Hudsonstraße', 'Davisstraße', 'Nares-Straße', 'Maclure-Straße'], answer: 1 },
          en: { q: 'Which strait separates Canada from Greenland to the northeast?', options: ['Hudson Strait', 'Davis Strait', 'Nares Strait', 'Maclure Strait'], answer: 1 }
        },
        {
          de: { q: 'Welcher bekannte Sänger stammt aus London, Ontario, Kanada?', options: ['Drake', 'The Weeknd', 'Justin Bieber', 'Shawn Mendes'], answer: 2 },
          en: { q: 'Which famous singer comes from London, Ontario, Canada?', options: ['Drake', 'The Weeknd', 'Justin Bieber', 'Shawn Mendes'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die arktische Insel, die zu Kanada gehört und eine der größten der Welt ist?', options: ['Baffin Island', 'Grönland', 'Victoria Island', 'Banks Island'], answer: 0 },
          en: { q: 'What is the name of the Arctic island belonging to Canada that is one of the largest in the world?', options: ['Baffin Island', 'Greenland', 'Victoria Island', 'Banks Island'], answer: 0 }
        },
        {
          de: { q: 'Welche Stadt Kanadas ist bekannt für das größte Filmfestival Nordamerikas?', options: ['Vancouver', 'Montreal', 'Toronto', 'Calgary'], answer: 2 },
          en: { q: 'Which Canadian city is known for hosting North America\'s largest film festival?', options: ['Vancouver', 'Montreal', 'Toronto', 'Calgary'], answer: 2 }
        },
        {
          de: { q: 'Welche indigene Volksgruppe lebt traditionell im arktischen Norden Kanadas?', options: ['Cree', 'Mohawk', 'Inuit', 'Ojibwe'], answer: 2 },
          en: { q: 'Which indigenous people traditionally live in Canada\'s Arctic north?', options: ['Cree', 'Mohawk', 'Inuit', 'Ojibwe'], answer: 2 }
        }
      ]
    },
    {
      id: 'mexico',
      name: { de: 'Mexiko', en: 'Mexico' },
      anthem: 'assets/audio/anthems/mexico.mp3',
      background: 'assets/backgrounds/mexico.png',
      enemyType: 'mexico_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Mexiko?', options: ['Guadalajara', 'Monterrey', 'Puebla', 'Mexiko-Stadt'], answer: 3 },
          en: { q: 'What is the capital of Mexico?', options: ['Guadalajara', 'Monterrey', 'Puebla', 'Mexico City'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die mexikanische Währung?', options: ['Sol', 'Real', 'Peso', 'Quetzal'], answer: 2 },
          en: { q: 'What is the Mexican currency?', options: ['Sol', 'Real', 'Peso', 'Quetzal'], answer: 2 }
        },
        {
          de: { q: 'Wie hieß die antike Zivilisation Mexikos?', options: ['Inka', 'Maya', 'Azteken', 'Olmeken'], answer: 2 },
          en: { q: 'What was the ancient civilization of Mexico?', options: ['Inca', 'Maya', 'Aztec', 'Olmec'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die berühmte Pyramide in Mexiko?', options: ['Teotihuacan', 'Uxmal', 'Chichén Itzá', 'Palenque'], answer: 2 },
          en: { q: 'What is the famous pyramid in Mexico?', options: ['Teotihuacan', 'Uxmal', 'Chichen Itza', 'Palenque'], answer: 2 }
        },
        {
          de: { q: 'Was ist die Amtssprache Mexikos?', options: ['Portugiesisch', 'Nahuatl', 'Spanisch', 'Französisch'], answer: 2 },
          en: { q: 'What is the official language of Mexico?', options: ['Portuguese', 'Nahuatl', 'Spanish', 'French'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die Halbinsel im Südosten Mexikos, bekannt für Mayas und Karibikstrände?', options: ['Baja California', 'Yucatán', 'Campeche', 'Oaxaca'], answer: 1 },
          en: { q: 'What is the name of the peninsula in southeast Mexico known for Mayan ruins and Caribbean beaches?', options: ['Baja California', 'Yucatan', 'Campeche', 'Oaxaca'], answer: 1 }
        },
        {
          de: { q: 'Welches Land kolonisierte Mexiko im 16. Jahrhundert?', options: ['Portugal', 'Frankreich', 'England', 'Spanien'], answer: 3 },
          en: { q: 'Which country colonised Mexico in the 16th century?', options: ['Portugal', 'France', 'England', 'Spain'], answer: 3 }
        },
        {
          de: { q: 'In welchem Jahr erklärte Mexiko seine Unabhängigkeit von Spanien?', options: ['1810', '1821', '1836', '1848'], answer: 1 },
          en: { q: 'In which year did Mexico achieve independence from Spain?', options: ['1810', '1821', '1836', '1848'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der höchste Vulkan Mexikos?', options: ['Popocatépetl', 'Pico de Orizaba', 'Iztaccíhuatl', 'Nevado de Toluca'], answer: 1 },
          en: { q: 'What is the highest volcano in Mexico?', options: ['Popocatepetl', 'Pico de Orizaba', 'Iztaccihuatl', 'Nevado de Toluca'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt das mexikanische Totenfest, das am 1. und 2. November gefeiert wird?', options: ['Día de los Reyes', 'Día de los Muertos', 'Día de la Independencia', 'Día de la Virgen'], answer: 1 },
          en: { q: 'What is the Mexican Day of the Dead festival called, celebrated on 1st and 2nd November?', options: ['Dia de los Reyes', 'Dia de los Muertos', 'Dia de la Independencia', 'Dia de la Virgen'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der schmale Meeresarm zwischen der Halbinsel Baja California und dem mexikanischen Festland?', options: ['Golf von Mexiko', 'Karibisches Meer', 'Golf von Kalifornien', 'Pazifik'], answer: 2 },
          en: { q: 'What is the name of the narrow sea between the Baja California peninsula and the Mexican mainland?', options: ['Gulf of Mexico', 'Caribbean Sea', 'Gulf of California', 'Pacific Ocean'], answer: 2 }
        },
        {
          de: { q: 'Welche mexikanische Künstlerin ist für ihre selbst Porträts und surrealistischen Werke weltberühmt?', options: ['Remedios Varo', 'Leonora Carrington', 'Frida Kahlo', 'María Izquierdo'], answer: 2 },
          en: { q: 'Which Mexican artist is world-famous for her self-portraits and surrealist works?', options: ['Remedios Varo', 'Leonora Carrington', 'Frida Kahlo', 'Maria Izquierdo'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das mexikanische Agavengetränk, das in der Stadt Tequila hergestellt wird?', options: ['Mezcal', 'Pulque', 'Tequila', 'Sotol'], answer: 2 },
          en: { q: 'What is the Mexican agave spirit produced in the town of Tequila?', options: ['Mezcal', 'Pulque', 'Tequila', 'Sotol'], answer: 2 }
        },
        {
          de: { q: 'Welches Tier ist auf der mexikanischen Nationalflagge abgebildet?', options: ['Quetzal auf einer Schlange', 'Adler mit Schlange', 'Jaguar auf einem Stein', 'Kondor auf einem Kaktus'], answer: 1 },
          en: { q: 'Which animal is depicted on the Mexican national flag?', options: ['Quetzal on a snake', 'Eagle with snake', 'Jaguar on a rock', 'Condor on a cactus'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt die zweitgrößte Stadt Mexikos?', options: ['Monterrey', 'Puebla', 'Guadalajara', 'Tijuana'], answer: 2 },
          en: { q: 'What is the second largest city in Mexico?', options: ['Monterrey', 'Puebla', 'Guadalajara', 'Tijuana'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das typisch mexikanische Gericht: gefüllte Maisfladen?', options: ['Quesadilla', 'Burrito', 'Taco', 'Enchilada'], answer: 2 },
          en: { q: 'What is the name of the typical Mexican dish of filled corn tortillas?', options: ['Quesadilla', 'Burrito', 'Taco', 'Enchilada'], answer: 2 }
        },
        {
          de: { q: 'Welcher Bundesstaat liegt ganz im Norden Mexikos und grenzt direkt an die USA?', options: ['Sonora', 'Chihuahua', 'Nuevo León', 'Tamaulipas'], answer: 1 },
          en: { q: 'Which Mexican state in the far north shares the longest border with the USA?', options: ['Sonora', 'Chihuahua', 'Nuevo Leon', 'Tamaulipas'], answer: 1 }
        },
        {
          de: { q: 'Welcher mexikanische Präsident führte weitreichende Landreformen durch und gilt als Held der Revolution?', options: ['Porfirio Díaz', 'Benito Juárez', 'Emiliano Zapata', 'Lázaro Cárdenas'], answer: 3 },
          en: { q: 'Which Mexican president carried out sweeping land reforms and is celebrated as a hero of the Revolution?', options: ['Porfirio Diaz', 'Benito Juarez', 'Emiliano Zapata', 'Lazaro Cardenas'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die antike Stadt nördlich von Mexiko-Stadt mit der Sonnen- und Mondpyramide?', options: ['Monte Albán', 'El Tajín', 'Teotihuacan', 'Tula'], answer: 2 },
          en: { q: 'What is the name of the ancient city north of Mexico City featuring the Pyramid of the Sun and Moon?', options: ['Monte Alban', 'El Tajin', 'Teotihuacan', 'Tula'], answer: 2 }
        },
        {
          de: { q: 'Welches mexikanische Bundesland ist bekannt für seinen Mole-negro-Sauce und Mezcal?', options: ['Veracruz', 'Jalisco', 'Oaxaca', 'Guerrero'], answer: 2 },
          en: { q: 'Which Mexican state is famous for its mole negro sauce and mezcal?', options: ['Veracruz', 'Jalisco', 'Oaxaca', 'Guerrero'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der Einwanderer-Held und erste indigene Präsident Mexikos?', options: ['Miguel Hidalgo', 'Porfirio Díaz', 'Benito Juárez', 'Vicente Guerrero'], answer: 2 },
          en: { q: 'Who was the first indigenous president of Mexico?', options: ['Miguel Hidalgo', 'Porfirio Diaz', 'Benito Juarez', 'Vicente Guerrero'], answer: 2 }
        },
        {
          de: { q: 'Welches Meer liegt östlich der mexikanischen Halbinsel Yucatán?', options: ['Pazifik', 'Golf von Mexiko', 'Karibisches Meer', 'Atlantik'], answer: 2 },
          en: { q: 'Which sea lies to the east of Mexico\'s Yucatan Peninsula?', options: ['Pacific', 'Gulf of Mexico', 'Caribbean Sea', 'Atlantic'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte mexikanische Wandmaler, der mit Diego Rivera bekannt war?', options: ['José Orozco', 'David Siqueiros', 'Rufino Tamayo', 'Juan O\'Gorman'], answer: 1 },
          en: { q: 'What is the name of the famous Mexican muralist who was closely associated with Diego Rivera?', options: ['Jose Orozco', 'David Siqueiros', 'Rufino Tamayo', 'Juan O\'Gorman'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der mit einem Impaktkrater verbundene Ort auf der Halbinsel Yucatán, der mit dem Aussterben der Dinosaurier assoziiert wird?', options: ['Chichén Itzá', 'Chicxulub', 'Cancún', 'Mérida'], answer: 1 },
          en: { q: 'What is the site on the Yucatan Peninsula associated with the impact crater linked to the dinosaur extinction?', options: ['Chichen Itza', 'Chicxulub', 'Cancun', 'Merida'], answer: 1 }
        }
      ]
    },
    {
      id: 'usa',
      name: { de: 'USA', en: 'USA' },
      anthem: 'assets/audio/anthems/usa.mp3',
      background: 'assets/backgrounds/usa.png',
      enemyType: 'usa_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt der USA?', options: ['New York', 'Los Angeles', 'Chicago', 'Washington D.C.'], answer: 3 },
          en: { q: 'What is the capital of the USA?', options: ['New York', 'Los Angeles', 'Chicago', 'Washington DC'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt die amerikanische Währung?', options: ['Pfund', 'Euro', 'Dollar', 'Peso'], answer: 2 },
          en: { q: 'What is the American currency?', options: ['Pound', 'Euro', 'Dollar', 'Peso'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr wurde die Unabhängigkeitserklärung der USA unterzeichnet?', options: ['1774', '1775', '1776', '1783'], answer: 2 },
          en: { q: 'In which year was the US Declaration of Independence signed?', options: ['1774', '1775', '1776', '1783'], answer: 2 }
        },
        {
          de: { q: 'Was ist der Nationalvogel der USA?', options: ['Truthahn', 'Steinadler', 'Weißkopfseeadler', 'Wanderfalke'], answer: 2 },
          en: { q: 'What is the national bird of the USA?', options: ['Turkey', 'Golden Eagle', 'Bald Eagle', 'Peregrine Falcon'], answer: 2 }
        },
        {
          de: { q: 'Was ist der größte Bundesstaat der USA?', options: ['Texas', 'Kalifornien', 'Montana', 'Alaska'], answer: 3 },
          en: { q: 'What is the largest state in the USA?', options: ['Texas', 'California', 'Montana', 'Alaska'], answer: 3 }
        },
        {
          de: { q: 'Wie viele Bundesstaaten haben die USA?', options: ['48', '49', '50', '52'], answer: 2 },
          en: { q: 'How many states does the USA have?', options: ['48', '49', '50', '52'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der längste Fluss der USA?', options: ['Colorado', 'Ohio', 'Missouri', 'Mississippi'], answer: 2 },
          en: { q: 'What is the longest river in the USA?', options: ['Colorado', 'Ohio', 'Missouri', 'Mississippi'], answer: 2 }
        },
        {
          de: { q: 'In welchem US-Bundesstaat befindet sich der Grand Canyon?', options: ['Utah', 'Nevada', 'Arizona', 'Colorado'], answer: 2 },
          en: { q: 'In which US state is the Grand Canyon located?', options: ['Utah', 'Nevada', 'Arizona', 'Colorado'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das bekannteste Wahrzeichen in New York?', options: ['Golden Gate Bridge', 'Freiheitsstatue', 'Mount Rushmore', 'Empire State Building'], answer: 1 },
          en: { q: 'What is the most famous landmark in New York?', options: ['Golden Gate Bridge', 'Statue of Liberty', 'Mount Rushmore', 'Empire State Building'], answer: 1 }
        },
        {
          de: { q: 'Welcher US-Präsident wurde 1865 ermordet?', options: ['George Washington', 'Andrew Jackson', 'Abraham Lincoln', 'James Garfield'], answer: 2 },
          en: { q: 'Which US president was assassinated in 1865?', options: ['George Washington', 'Andrew Jackson', 'Abraham Lincoln', 'James Garfield'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg der USA (und Nordamerikas)?', options: ['Mount Whitney', 'Mount Logan', 'Denali', 'Mount Rainier'], answer: 2 },
          en: { q: 'What is the highest mountain in the USA (and North America)?', options: ['Mount Whitney', 'Mount Logan', 'Denali', 'Mount Rainier'], answer: 2 }
        },
        {
          de: { q: 'In welchem Bundesstaat liegt Hollywood?', options: ['Nevada', 'Kalifornien', 'Florida', 'New York'], answer: 1 },
          en: { q: 'In which US state is Hollywood located?', options: ['Nevada', 'California', 'Florida', 'New York'], answer: 1 }
        },
        {
          de: { q: 'Welches war das erste Land, in dem die USA diplomatische Beziehungen als neue Nation aufnahm?', options: ['Frankreich', 'England', 'Niederlande', 'Spanien'], answer: 0 },
          en: { q: 'Which was the first country to establish diplomatic relations with the USA as a new nation?', options: ['France', 'England', 'Netherlands', 'Spain'], answer: 0 }
        },
        {
          de: { q: 'Wie heißt das jährliche Erntedank-Fest in den USA?', options: ['Labor Day', 'Thanksgiving', 'Memorial Day', 'Independence Day'], answer: 1 },
          en: { q: 'What is the annual harvest festival in the USA called?', options: ['Labor Day', 'Thanksgiving', 'Memorial Day', 'Independence Day'], answer: 1 }
        },
        {
          de: { q: 'Welcher Bundesstaat liegt auf Hawaii?', options: ['Es ist ein eigenständiger Bundesstaat', 'Er gehört zu Kalifornien', 'Er gehört zu Alaska', 'Er ist kein Bundesstaat'], answer: 0 },
          en: { q: 'What is the status of Hawaii in the USA?', options: ['It is its own state', 'It belongs to California', 'It belongs to Alaska', 'It is not a state'], answer: 0 }
        },
        {
          de: { q: 'Welcher US-Präsident führte die Mondlandung durch die NASA ein?', options: ['Dwight Eisenhower', 'John F. Kennedy', 'Lyndon Johnson', 'Richard Nixon'], answer: 1 },
          en: { q: 'Which US president initiated the NASA Moon landing programme?', options: ['Dwight Eisenhower', 'John F. Kennedy', 'Lyndon Johnson', 'Richard Nixon'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt die Brücke in San Francisco, die für ihre rote Farbe bekannt ist?', options: ['Bay Bridge', 'Brooklyn Bridge', 'Golden Gate Bridge', 'Sunshine Skyway'], answer: 2 },
          en: { q: 'What is the name of the bridge in San Francisco known for its red colour?', options: ['Bay Bridge', 'Brooklyn Bridge', 'Golden Gate Bridge', 'Sunshine Skyway'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das amerikanische Nationallied?', options: ['America the Beautiful', 'God Bless America', 'My Country \'Tis of Thee', 'The Star-Spangled Banner'], answer: 3 },
          en: { q: 'What is the American national anthem?', options: ['America the Beautiful', 'God Bless America', 'My Country \'Tis of Thee', 'The Star-Spangled Banner'], answer: 3 }
        },
        {
          de: { q: 'Welcher US-Staat ist für seine Kartoffelproduktion bekannt und trägt den Spitznamen "Gem State"?', options: ['Iowa', 'Idaho', 'Indiana', 'Illinois'], answer: 1 },
          en: { q: 'Which US state is famous for potato production and nicknamed the "Gem State"?', options: ['Iowa', 'Idaho', 'Indiana', 'Illinois'], answer: 1 }
        },
        {
          de: { q: 'In welcher Stadt der USA befindet sich das Weiße Haus?', options: ['New York', 'Philadelphia', 'Washington D.C.', 'Baltimore'], answer: 2 },
          en: { q: 'In which US city is the White House located?', options: ['New York', 'Philadelphia', 'Washington DC', 'Baltimore'], answer: 2 }
        },
        {
          de: { q: 'Welcher US-Bundesstaat wurde als letzter, im Jahr 1959, aufgenommen?', options: ['Alaska', 'Hawaii', 'Beide gleichzeitig', 'New Mexico'], answer: 1 },
          en: { q: 'Which US state was the last to be admitted, in 1959?', options: ['Alaska', 'Hawaii', 'Both at the same time', 'New Mexico'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der bekannteste Nationalpark in Wyoming, bekannt für Geysire?', options: ['Grand Teton', 'Glacier', 'Yellowstone', 'Zion'], answer: 2 },
          en: { q: 'What is the most famous national park in Wyoming, known for its geysers?', options: ['Grand Teton', 'Glacier', 'Yellowstone', 'Zion'], answer: 2 }
        },
        {
          de: { q: 'Welche Stadt gilt als die Musikhauptstadt der USA, bekannt für Country-Musik?', options: ['Memphis', 'New Orleans', 'Nashville', 'Austin'], answer: 2 },
          en: { q: 'Which city is considered the music capital of the USA, known for country music?', options: ['Memphis', 'New Orleans', 'Nashville', 'Austin'], answer: 2 }
        },
        {
          de: { q: 'Welcher Ozean liegt östlich der USA?', options: ['Pazifik', 'Indischer Ozean', 'Atlantik', 'Arktischer Ozean'], answer: 2 },
          en: { q: 'Which ocean lies to the east of the USA?', options: ['Pacific', 'Indian Ocean', 'Atlantic', 'Arctic Ocean'], answer: 2 }
        },
        {
          de: { q: 'Welches ist das bevölkerungsreichste Bundesland der USA?', options: ['Texas', 'Florida', 'New York', 'Kalifornien'], answer: 3 },
          en: { q: 'Which is the most populous state in the USA?', options: ['Texas', 'Florida', 'New York', 'California'], answer: 3 }
        }
      ]
    }
  ]
};
