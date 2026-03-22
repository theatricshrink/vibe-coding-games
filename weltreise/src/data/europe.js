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
        },
        {
          de: { q: 'Wie heißt der höchste Berg Österreichs?', options: ['Dachstein', 'Großvenediger', 'Zugspitze', 'Großglockner'], answer: 3 },
          en: { q: 'What is the highest mountain in Austria?', options: ['Dachstein', 'Großvenediger', 'Zugspitze', 'Großglockner'], answer: 3 }
        },
        {
          de: { q: 'Wie viele Bundesländer hat Österreich?', options: ['7', '8', '9', '10'], answer: 2 },
          en: { q: 'How many federal states does Austria have?', options: ['7', '8', '9', '10'], answer: 2 }
        },
        {
          de: { q: 'Welches Schloss in Wien ist ein UNESCO-Weltkulturerbe?', options: ['Schloss Ambras', 'Schloss Belvedere', 'Schloss Schönbrunn', 'Schloss Eggenberg'], answer: 2 },
          en: { q: 'Which palace in Vienna is a UNESCO World Heritage Site?', options: ['Ambras Castle', 'Belvedere Palace', 'Schönbrunn Palace', 'Eggenberg Palace'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr trat Österreich der Europäischen Union bei?', options: ['1990', '1993', '1995', '1997'], answer: 2 },
          en: { q: 'In which year did Austria join the European Union?', options: ['1990', '1993', '1995', '1997'], answer: 2 }
        },
        {
          de: { q: 'Welcher österreichische Komponist schrieb die „Walzerfolgen"?', options: ['Franz Schubert', 'Johann Strauß Sohn', 'Anton Bruckner', 'Gustav Mahler'], answer: 1 },
          en: { q: 'Which Austrian composer wrote famous waltz sequences?', options: ['Franz Schubert', 'Johann Strauss II', 'Anton Bruckner', 'Gustav Mahler'], answer: 1 }
        },
        {
          de: { q: 'Welcher See liegt an der Grenze zwischen Österreich, Deutschland und der Schweiz?', options: ['Attersee', 'Wolfgangsee', 'Bodensee', 'Neusiedler See'], answer: 2 },
          en: { q: 'Which lake lies on the border of Austria, Germany, and Switzerland?', options: ['Attersee', 'Wolfgangsee', 'Lake Constance', 'Lake Neusiedl'], answer: 2 }
        },
        {
          de: { q: 'Welche Stadt ist nach Wien die zweitgrößte in Österreich?', options: ['Linz', 'Salzburg', 'Graz', 'Innsbruck'], answer: 2 },
          en: { q: 'Which city is the second largest in Austria after Vienna?', options: ['Linz', 'Salzburg', 'Graz', 'Innsbruck'], answer: 2 }
        },
        {
          de: { q: 'Welches traditionelle österreichische Gericht ist ein paniertes Schnitzel?', options: ['Tafelspitz', 'Wiener Schnitzel', 'Gulasch', 'Kaiserschmarrn'], answer: 1 },
          en: { q: 'Which traditional Austrian dish is a breaded cutlet?', options: ['Tafelspitz', 'Wiener Schnitzel', 'Goulash', 'Kaiserschmarrn'], answer: 1 }
        },
        {
          de: { q: 'Welcher österreichische Physiker gilt als Mitbegründer der Quantenmechanik?', options: ['Ludwig Boltzmann', 'Ernst Mach', 'Erwin Schrödinger', 'Victor Hess'], answer: 2 },
          en: { q: 'Which Austrian physicist is considered a co-founder of quantum mechanics?', options: ['Ludwig Boltzmann', 'Ernst Mach', 'Erwin Schrödinger', 'Victor Hess'], answer: 2 }
        },
        {
          de: { q: 'In welcher österreichischen Stadt findet jährlich das Filmfestival am See statt?', options: ['Klagenfurt', 'Bregenz', 'St. Pölten', 'Eisenstadt'], answer: 1 },
          en: { q: 'In which Austrian city does the annual lake-side opera festival take place?', options: ['Klagenfurt', 'Bregenz', 'St. Pölten', 'Eisenstadt'], answer: 1 }
        },
        {
          de: { q: 'Welcher österreichische Tennisspieler gewann 2003 die French Open?', options: ['Thomas Muster', 'Jürgen Melzer', 'Dominic Thiem', 'Horst Skoff'], answer: 0 },
          en: { q: 'Which Austrian tennis player won the French Open in 1995?', options: ['Thomas Muster', 'Jürgen Melzer', 'Dominic Thiem', 'Horst Skoff'], answer: 0 }
        },
        {
          de: { q: 'Welche österreichische Airline war die nationale Fluggesellschaft des Landes?', options: ['Lauda Air', 'Austrian Airlines', 'Niki', 'People\'s Air'], answer: 1 },
          en: { q: 'Which Austrian airline is the national carrier of the country?', options: ['Lauda Air', 'Austrian Airlines', 'Niki', 'People\'s Air'], answer: 1 }
        },
        {
          de: { q: 'Durch wie viele Länder fließt die Donau?', options: ['7', '8', '10', '12'], answer: 2 },
          en: { q: 'Through how many countries does the Danube river flow?', options: ['7', '8', '10', '12'], answer: 2 }
        },
        {
          de: { q: 'Welches ist das bekannteste Konzerthaus in Wien?', options: ['Burgtheater', 'Wiener Staatsoper', 'Musikverein', 'Konzerthaus'], answer: 2 },
          en: { q: 'Which is the most famous concert hall in Vienna?', options: ['Burgtheater', 'Vienna State Opera', 'Musikverein', 'Konzerthaus'], answer: 2 }
        },
        {
          de: { q: 'Welcher österreichische Bundeskanzler wurde 1942 im KZ Dachau ermordet?', options: ['Engelbert Dollfuß', 'Kurt Schuschnigg', 'Wilhelm Miklas', 'Karl Renner'], answer: 0 },
          en: { q: 'Which Austrian Chancellor was murdered in 1934 in a Nazi coup attempt?', options: ['Engelbert Dollfuß', 'Kurt Schuschnigg', 'Wilhelm Miklas', 'Karl Renner'], answer: 0 }
        },
        {
          de: { q: 'Welcher Alpenpass verbindet Österreich mit Italien über die Brennerroute?', options: ['Reschen', 'Brenner', 'Tauern', 'Felbertauern'], answer: 1 },
          en: { q: 'Which Alpine pass connects Austria with Italy via the Brenner route?', options: ['Reschen', 'Brenner', 'Tauern', 'Felbertauern'], answer: 1 }
        },
        {
          de: { q: 'Wer war der letzte Kaiser Österreich-Ungarns?', options: ['Franz Joseph I.', 'Karl I.', 'Ferdinand I.', 'Maximilian I.'], answer: 1 },
          en: { q: 'Who was the last Emperor of Austria-Hungary?', options: ['Franz Joseph I', 'Karl I', 'Ferdinand I', 'Maximilian I'], answer: 1 }
        },
        {
          de: { q: 'In welchem Bundesland liegt der Nationalpark Hohe Tauern?', options: ['Steiermark', 'Tirol', 'Vorarlberg', 'Kärnten'], answer: 3 },
          en: { q: 'In which federal state is the Hohe Tauern National Park located?', options: ['Styria', 'Tyrol', 'Vorarlberg', 'Carinthia'], answer: 3 }
        },
        {
          de: { q: 'Welcher Sportler aus Österreich gewann viermal die Formel-1-Weltmeisterschaft?', options: ['Jochen Rindt', 'Niki Lauda', 'Gerhard Berger', 'Alexander Wurz'], answer: 1 },
          en: { q: 'Which Austrian racing driver won three Formula 1 World Championships?', options: ['Jochen Rindt', 'Niki Lauda', 'Gerhard Berger', 'Alexander Wurz'], answer: 1 }
        },
        {
          de: { q: 'Wie nennt man den typischen österreichischen Apfelkuchen?', options: ['Sachertorte', 'Apfelkuchen', 'Apfelstrudel', 'Linzer Torte'], answer: 2 },
          en: { q: 'What is the typical Austrian apple pastry called?', options: ['Sachertorte', 'Apple cake', 'Apfelstrudel', 'Linzer Torte'], answer: 2 }
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
        },
        {
          de: { q: 'In welchem Jahr begann die Französische Revolution?', options: ['1776', '1789', '1799', '1804'], answer: 1 },
          en: { q: 'In which year did the French Revolution begin?', options: ['1776', '1789', '1799', '1804'], answer: 1 }
        },
        {
          de: { q: 'Welches berühmte Museum befindet sich in Paris?', options: ['Uffizien', 'Prado', 'Louvre', 'Hermitage'], answer: 2 },
          en: { q: 'Which famous museum is located in Paris?', options: ['Uffizi', 'Prado', 'Louvre', 'Hermitage'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg Frankreichs?', options: ['Mont Blanc', 'Mont Ventoux', 'Puy de Dôme', 'Monte Cinto'], answer: 0 },
          en: { q: 'What is the highest mountain in France?', options: ['Mont Blanc', 'Mont Ventoux', 'Puy de Dôme', 'Monte Cinto'], answer: 0 }
        },
        {
          de: { q: 'Welche Weinregion liegt im Südwesten Frankreichs an der Gironde?', options: ['Burgund', 'Champagne', 'Bordeaux', 'Elsass'], answer: 2 },
          en: { q: 'Which wine region lies in south-west France along the Gironde?', options: ['Burgundy', 'Champagne', 'Bordeaux', 'Alsace'], answer: 2 }
        },
        {
          de: { q: 'Wer war der erste Präsident der Fünften Französischen Republik?', options: ['François Mitterrand', 'Georges Pompidou', 'Charles de Gaulle', 'Valéry Giscard d\'Estaing'], answer: 2 },
          en: { q: 'Who was the first President of the Fifth French Republic?', options: ['François Mitterrand', 'Georges Pompidou', 'Charles de Gaulle', 'Valéry Giscard d\'Estaing'], answer: 2 }
        },
        {
          de: { q: 'Welche Insel im Mittelmeer ist ein französisches Département?', options: ['Sardinien', 'Sizilien', 'Korsika', 'Malta'], answer: 2 },
          en: { q: 'Which Mediterranean island is a French department?', options: ['Sardinia', 'Sicily', 'Corsica', 'Malta'], answer: 2 }
        },
        {
          de: { q: 'Welcher französische Kaiser wurde 1769 in Korsika geboren?', options: ['Ludwig XIV.', 'Napoleon Bonaparte', 'Karl der Große', 'Heinrich IV.'], answer: 1 },
          en: { q: 'Which French emperor was born in Corsica in 1769?', options: ['Louis XIV', 'Napoleon Bonaparte', 'Charlemagne', 'Henry IV'], answer: 1 }
        },
        {
          de: { q: 'Wie nennt man das berühmte Radrennen, das durch ganz Frankreich führt?', options: ['Giro d\'Italia', 'Vuelta a España', 'Tour de France', 'Paris–Roubaix'], answer: 2 },
          en: { q: 'What is the famous cycling race that traverses all of France called?', options: ['Giro d\'Italia', 'Vuelta a España', 'Tour de France', 'Paris–Roubaix'], answer: 2 }
        },
        {
          de: { q: 'Welches ist das Wahrzeichen der Stadt Paris auf dem Hügel Montmartre?', options: ['Notre-Dame', 'Panthéon', 'Sacré-Cœur', 'Arc de Triomphe'], answer: 2 },
          en: { q: 'Which landmark crowns the Montmartre hill in Paris?', options: ['Notre-Dame', 'Panthéon', 'Sacré-Cœur', 'Arc de Triomphe'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der Unterwassertunnel zwischen Frankreich und England?', options: ['Eurotunnel', 'Nordseetunnel', 'Kanalbrücke', 'Dover-Tunnel'], answer: 0 },
          en: { q: 'What is the undersea tunnel between France and England called?', options: ['Eurotunnel', 'North Sea Tunnel', 'Channel Bridge', 'Dover Tunnel'], answer: 0 }
        },
        {
          de: { q: 'Welche Sprache sprechen die meisten Menschen in Frankreich?', options: ['Okzitanisch', 'Bretonisch', 'Französisch', 'Elsässisch'], answer: 2 },
          en: { q: 'What language do most people in France speak?', options: ['Occitan', 'Breton', 'French', 'Alsatian'], answer: 2 }
        },
        {
          de: { q: 'Welcher Künstler malte „Die Seerose" und lebte in Giverny?', options: ['Pierre-Auguste Renoir', 'Paul Cézanne', 'Claude Monet', 'Edgar Degas'], answer: 2 },
          en: { q: 'Which artist painted the Water Lilies series and lived in Giverny?', options: ['Pierre-Auguste Renoir', 'Paul Cézanne', 'Claude Monet', 'Edgar Degas'], answer: 2 }
        },
        {
          de: { q: 'Welches Gericht ist ein typischer französischer Eintopf aus der Provence?', options: ['Bouillabaisse', 'Cassoulet', 'Ratatouille', 'Pot-au-feu'], answer: 2 },
          en: { q: 'Which dish is a typical Provençal French vegetable stew?', options: ['Bouillabaisse', 'Cassoulet', 'Ratatouille', 'Pot-au-feu'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt befindet sich der Fürstensitz von Monaco?', options: ['Nizza', 'Cannes', 'Monaco-Ville', 'Antibes'], answer: 2 },
          en: { q: 'In which city is the Prince\'s Palace of Monaco located?', options: ['Nice', 'Cannes', 'Monaco-Ville', 'Antibes'], answer: 2 }
        },
        {
          de: { q: 'Welche Filmfestspiele finden jährlich in Cannes statt?', options: ['Berlinale', 'Filmfestspiele Venedig', 'Festival de Cannes', 'Sundance'], answer: 2 },
          en: { q: 'Which film festival takes place annually in Cannes?', options: ['Berlinale', 'Venice Film Festival', 'Festival de Cannes', 'Sundance'], answer: 2 }
        },
        {
          de: { q: 'Welches mythologische Bauwerk der Römer steht noch in Nîmes?', options: ['Kolosseum', 'Maison Carrée', 'Pantheon', 'Forum Romanum'], answer: 1 },
          en: { q: 'Which Roman temple still stands in Nîmes?', options: ['Colosseum', 'Maison Carrée', 'Pantheon', 'Forum Romanum'], answer: 1 }
        },
        {
          de: { q: 'Frankreich grenzt im Süden an welches Meer?', options: ['Nordsee', 'Ostsee', 'Mittelmeer', 'Schwarzes Meer'], answer: 2 },
          en: { q: 'France borders which sea to the south?', options: ['North Sea', 'Baltic Sea', 'Mediterranean Sea', 'Black Sea'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt der berühmte Tennisplatz in Paris, auf dem die French Open stattfinden?', options: ['Stade de France', 'Roland Garros', 'Bercy', 'Longchamp'], answer: 1 },
          en: { q: 'What is the famous Paris tennis venue where the French Open is held?', options: ['Stade de France', 'Roland Garros', 'Bercy', 'Longchamp'], answer: 1 }
        },
        {
          de: { q: 'Wer schrieb den Roman „Les Misérables"?', options: ['Honoré de Balzac', 'Gustave Flaubert', 'Victor Hugo', 'Alexandre Dumas'], answer: 2 },
          en: { q: 'Who wrote the novel "Les Misérables"?', options: ['Honoré de Balzac', 'Gustave Flaubert', 'Victor Hugo', 'Alexandre Dumas'], answer: 2 }
        },
        {
          de: { q: 'Was ist das Nationaltier Frankreichs?', options: ['Adler', 'Löwe', 'Hahn', 'Bär'], answer: 2 },
          en: { q: 'What is the national animal of France?', options: ['Eagle', 'Lion', 'Rooster', 'Bear'], answer: 2 }
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
        },
        {
          de: { q: 'Wie viele Bundesländer hat Deutschland?', options: ['12', '14', '16', '18'], answer: 2 },
          en: { q: 'How many federal states does Germany have?', options: ['12', '14', '16', '18'], answer: 2 }
        },
        {
          de: { q: 'Welches berühmte Fest findet jedes Jahr in München statt?', options: ['Karneval', 'Oktoberfest', 'Schützenfest', 'Weinlesefest'], answer: 1 },
          en: { q: 'Which famous festival takes place every year in Munich?', options: ['Carnival', 'Oktoberfest', 'Marksmen\'s Festival', 'Wine Harvest Festival'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg Deutschlands?', options: ['Brocken', 'Feldberg', 'Zugspitze', 'Watzmann'], answer: 2 },
          en: { q: 'What is the highest mountain in Germany?', options: ['Brocken', 'Feldberg', 'Zugspitze', 'Watzmann'], answer: 2 }
        },
        {
          de: { q: 'In welcher deutschen Stadt wurde Beethoven geboren?', options: ['Leipzig', 'Hamburg', 'Bonn', 'Augsburg'], answer: 2 },
          en: { q: 'In which German city was Beethoven born?', options: ['Leipzig', 'Hamburg', 'Bonn', 'Augsburg'], answer: 2 }
        },
        {
          de: { q: 'Welche deutsche Erfindung ermöglichte den Buchdruck?', options: ['Dampfmaschine', 'Buchdruckmaschine mit beweglichen Lettern', 'Telegraf', 'Schreibmaschine'], answer: 1 },
          en: { q: 'Which German invention made book printing possible?', options: ['Steam engine', 'Printing press with movable type', 'Telegraph', 'Typewriter'], answer: 1 }
        },
        {
          de: { q: 'Welche deutsche Autobahn hat keine generelle Geschwindigkeitsbegrenzung?', options: ['A1', 'A9', 'Es gibt kein generelles Tempolimit auf deutschen Autobahnen', 'A100'], answer: 2 },
          en: { q: 'Which statement about German motorways is correct?', options: ['All have a 130 km/h limit', 'Only the A9 has no limit', 'There is no general speed limit on German motorways', 'Only the A100 has no limit'], answer: 2 }
        },
        {
          de: { q: 'Welcher Fluss fließt durch Hamburg?', options: ['Weser', 'Elbe', 'Rhein', 'Oder'], answer: 1 },
          en: { q: 'Which river flows through Hamburg?', options: ['Weser', 'Elbe', 'Rhine', 'Oder'], answer: 1 }
        },
        {
          de: { q: 'In welchem deutschen Wald lebt laut Märchen Rotkäppchen?', options: ['Schwarzwald', 'Bayerischer Wald', 'Thüringer Wald', 'Harz'], answer: 0 },
          en: { q: 'In which German forest does Little Red Riding Hood live according to the fairy tale?', options: ['Black Forest', 'Bavarian Forest', 'Thuringian Forest', 'Harz'], answer: 0 }
        },
        {
          de: { q: 'Welcher Physiker entwickelte die Relativitätstheorie?', options: ['Max Planck', 'Werner Heisenberg', 'Albert Einstein', 'Heinrich Hertz'], answer: 2 },
          en: { q: 'Which physicist developed the theory of relativity?', options: ['Max Planck', 'Werner Heisenberg', 'Albert Einstein', 'Heinrich Hertz'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das bekannteste deutsche Schloss, das auf einem Felsen in Bayern steht?', options: ['Schloss Heidelberg', 'Schloss Neuschwanstein', 'Schloss Hohenzollern', 'Schloss Linderhof'], answer: 1 },
          en: { q: 'What is the most famous German castle perched on a rock in Bavaria?', options: ['Heidelberg Castle', 'Neuschwanstein Castle', 'Hohenzollern Castle', 'Linderhof Palace'], answer: 1 }
        },
        {
          de: { q: 'Welche Stadt war früher die geteilte Hauptstadt beider deutschen Staaten?', options: ['Bonn', 'Frankfurt', 'Berlin', 'Leipzig'], answer: 2 },
          en: { q: 'Which city was formerly the divided capital of both German states?', options: ['Bonn', 'Frankfurt', 'Berlin', 'Leipzig'], answer: 2 }
        },
        {
          de: { q: 'Welche Automarke hat ihren Hauptsitz in Wolfsburg?', options: ['BMW', 'Mercedes-Benz', 'Volkswagen', 'Audi'], answer: 2 },
          en: { q: 'Which car brand is headquartered in Wolfsburg?', options: ['BMW', 'Mercedes-Benz', 'Volkswagen', 'Audi'], answer: 2 }
        },
        {
          de: { q: 'Wer schrieb das Werk „Faust"?', options: ['Friedrich Schiller', 'Heinrich Heine', 'Johann Wolfgang von Goethe', 'Bertolt Brecht'], answer: 2 },
          en: { q: 'Who wrote the work "Faust"?', options: ['Friedrich Schiller', 'Heinrich Heine', 'Johann Wolfgang von Goethe', 'Bertolt Brecht'], answer: 2 }
        },
        {
          de: { q: 'In welchem Jahr fiel die Berliner Mauer?', options: ['1987', '1988', '1989', '1990'], answer: 2 },
          en: { q: 'In which year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], answer: 2 }
        },
        {
          de: { q: 'Welches Bundesland liegt im äußersten Süden Deutschlands?', options: ['Hessen', 'Thüringen', 'Baden-Württemberg', 'Bayern'], answer: 3 },
          en: { q: 'Which federal state is located in the far south of Germany?', options: ['Hesse', 'Thuringia', 'Baden-Württemberg', 'Bavaria'], answer: 3 }
        },
        {
          de: { q: 'Wie heißt das größte deutsche Volksfest nach dem Oktoberfest?', options: ['Cannstatter Volksfest', 'Hamburger Dom', 'Rheinkirmes Düsseldorf', 'Frühlingsfest München'], answer: 0 },
          en: { q: 'What is the second largest German folk festival after Oktoberfest?', options: ['Cannstatter Volksfest', 'Hamburger Dom', 'Düsseldorf Rheinkirmes', 'Munich Spring Festival'], answer: 0 }
        },
        {
          de: { q: 'Welches Symbol zeigt die Mitte des deutschen Bundeswappens?', options: ['Löwe', 'Adler', 'Bär', 'Eiche'], answer: 1 },
          en: { q: 'Which symbol is shown at the center of the German federal coat of arms?', options: ['Lion', 'Eagle', 'Bear', 'Oak'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der größte See Deutschlands?', options: ['Chiemsee', 'Müritz', 'Ammersee', 'Starnberger See'], answer: 1 },
          en: { q: 'What is the largest lake entirely within Germany?', options: ['Chiemsee', 'Müritz', 'Ammersee', 'Starnberger See'], answer: 1 }
        },
        {
          de: { q: 'Welche Verfassung gilt in Deutschland als Grundgesetz?', options: ['Weimarer Verfassung', 'Paulskirchenverfassung', 'Grundgesetz von 1949', 'Reichsverfassung von 1871'], answer: 2 },
          en: { q: 'Which constitution serves as Germany\'s Basic Law?', options: ['Weimar Constitution', 'Paulskirche Constitution', 'Basic Law of 1949', 'Imperial Constitution of 1871'], answer: 2 }
        },
        {
          de: { q: 'Welcher Fluss bildet die Grenze zwischen Deutschland und Polen?', options: ['Weichsel', 'Oder', 'Neisse', 'Elbe'], answer: 1 },
          en: { q: 'Which river forms the border between Germany and Poland?', options: ['Vistula', 'Oder', 'Neisse', 'Elbe'], answer: 1 }
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
        },
        {
          de: { q: 'Wie heißt die berühmte Arena in Rom aus der Antike?', options: ['Pantheon', 'Forum Romanum', 'Kolosseum', 'Circus Maximus'], answer: 2 },
          en: { q: 'What is the famous ancient amphitheatre in Rome called?', options: ['Pantheon', 'Forum Romanum', 'Colosseum', 'Circus Maximus'], answer: 2 }
        },
        {
          de: { q: 'Wer malte die Sixtinische Kapelle in Rom?', options: ['Leonardo da Vinci', 'Raffael', 'Michelangelo', 'Botticelli'], answer: 2 },
          en: { q: 'Who painted the Sistine Chapel in Rome?', options: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Botticelli'], answer: 2 }
        },
        {
          de: { q: 'Welches ist die größte Insel Italiens?', options: ['Sardinien', 'Elba', 'Sizilien', 'Capri'], answer: 2 },
          en: { q: 'Which is the largest island of Italy?', options: ['Sardinia', 'Elba', 'Sicily', 'Capri'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt befindet sich die berühmte Rialto-Brücke?', options: ['Florenz', 'Mailand', 'Venedig', 'Genua'], answer: 2 },
          en: { q: 'In which city is the famous Rialto Bridge located?', options: ['Florence', 'Milan', 'Venice', 'Genoa'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die berühmte Oper, die Giuseppe Verdi komponierte und nach einem Shakespeare-Stück benannt ist?', options: ['Tosca', 'Nabucco', 'Otello', 'Norma'], answer: 2 },
          en: { q: 'What is the famous opera composed by Giuseppe Verdi based on a Shakespeare play?', options: ['Tosca', 'Nabucco', 'Otello', 'Norma'], answer: 2 }
        },
        {
          de: { q: 'Welches Gericht ist ein typisch italienischer Kaffeeklassiker?', options: ['Cappuccino', 'Latte Macchiato', 'Espresso', 'Americano'], answer: 2 },
          en: { q: 'Which drink is the quintessential classic Italian coffee?', options: ['Cappuccino', 'Latte Macchiato', 'Espresso', 'Americano'], answer: 2 }
        },
        {
          de: { q: 'Welcher Kleinstaat liegt vollständig innerhalb Italiens?', options: ['Monaco', 'Liechtenstein', 'Vatikanstadt', 'Andorra'], answer: 2 },
          en: { q: 'Which microstate is located entirely within Italy?', options: ['Monaco', 'Liechtenstein', 'Vatican City', 'Andorra'], answer: 2 }
        },
        {
          de: { q: 'Wer erfand die Glühbirne und hatte auch viele Verbindungen zu Italien?', options: ['Nikola Tesla', 'Alessandro Volta', 'Guglielmo Marconi', 'Galileo Galilei'], answer: 1 },
          en: { q: 'Which Italian scientist invented the electric battery?', options: ['Nikola Tesla', 'Alessandro Volta', 'Guglielmo Marconi', 'Galileo Galilei'], answer: 1 }
        },
        {
          de: { q: 'Welche Stadt ist bekannt als die Modemetropole Italiens?', options: ['Rom', 'Florenz', 'Mailand', 'Turin'], answer: 2 },
          en: { q: 'Which city is known as the fashion capital of Italy?', options: ['Rome', 'Florence', 'Milan', 'Turin'], answer: 2 }
        },
        {
          de: { q: 'Wie nennt man die typisch italienische Sauce aus Tomaten, Mozzarella und Basilikum?', options: ['Carbonara', 'Arrabbiata', 'Margherita', 'Puttanesca'], answer: 2 },
          en: { q: 'What is the classic Italian pizza topped with tomato, mozzarella, and basil called?', options: ['Carbonara', 'Arrabbiata', 'Margherita', 'Puttanesca'], answer: 2 }
        },
        {
          de: { q: 'Welche Stadt war der Geburtsort der Renaissance?', options: ['Mailand', 'Venedig', 'Florenz', 'Neapel'], answer: 2 },
          en: { q: 'Which city is considered the birthplace of the Renaissance?', options: ['Milan', 'Venice', 'Florence', 'Naples'], answer: 2 }
        },
        {
          de: { q: 'Wer schrieb die „Göttliche Komödie"?', options: ['Francesco Petrarca', 'Giovanni Boccaccio', 'Dante Alighieri', 'Niccolò Machiavelli'], answer: 2 },
          en: { q: 'Who wrote the "Divine Comedy"?', options: ['Francesco Petrarca', 'Giovanni Boccaccio', 'Dante Alighieri', 'Niccolò Machiavelli'], answer: 2 }
        },
        {
          de: { q: 'Welcher See liegt an der Grenze zwischen Italien und der Schweiz?', options: ['Gardasee', 'Comer See', 'Lago Maggiore', 'Iseosee'], answer: 2 },
          en: { q: 'Which lake lies on the border between Italy and Switzerland?', options: ['Lake Garda', 'Lake Como', 'Lake Maggiore', 'Lake Iseo'], answer: 2 }
        },
        {
          de: { q: 'Welches italiennische Autorennen findet in Monaco statt?', options: ['Mille Miglia', 'Targa Florio', 'Formel-1-Grand-Prix von Monaco', 'Gran Premio d\'Italia'], answer: 2 },
          en: { q: 'Which famous Grand Prix takes place on the streets of Monaco?', options: ['Mille Miglia', 'Targa Florio', 'Monaco Formula 1 Grand Prix', 'Italian Grand Prix'], answer: 2 }
        },
        {
          de: { q: 'Wie viele Mal hat die italienische Nationalmannschaft die Fußball-Weltmeisterschaft gewonnen?', options: ['2', '3', '4', '5'], answer: 2 },
          en: { q: 'How many times has the Italian national football team won the World Cup?', options: ['2', '3', '4', '5'], answer: 2 }
        },
        {
          de: { q: 'In welcher Stadt befindet sich die Scala, eines der bekanntesten Opernhäuser der Welt?', options: ['Rom', 'Mailand', 'Venedig', 'Neapel'], answer: 1 },
          en: { q: 'In which city is La Scala, one of the world\'s most famous opera houses?', options: ['Rome', 'Milan', 'Venice', 'Naples'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der berühmteste Käse aus der Toskana?', options: ['Parmigiano Reggiano', 'Pecorino', 'Gorgonzola', 'Taleggio'], answer: 1 },
          en: { q: 'What is the most famous cheese from Tuscany?', options: ['Parmigiano Reggiano', 'Pecorino', 'Gorgonzola', 'Taleggio'], answer: 1 }
        },
        {
          de: { q: 'In welcher Stadt wurden Romeo und Julia von Shakespeare verortet?', options: ['Florenz', 'Venedig', 'Verona', 'Mailand'], answer: 2 },
          en: { q: 'In which city did Shakespeare set Romeo and Juliet?', options: ['Florence', 'Venice', 'Verona', 'Milan'], answer: 2 }
        },
        {
          de: { q: 'Welche berühmte Skulptur von Michelangelo steht in Florenz?', options: ['Pietà', 'Moses', 'David', 'Laokoon'], answer: 2 },
          en: { q: 'Which famous Michelangelo sculpture stands in Florence?', options: ['Pietà', 'Moses', 'David', 'Laocoön'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die berühmte venezianische Gondelbrücke, die Seufzerbrücke genannt wird?', options: ['Ponte Vecchio', 'Ponte dei Sospiri', 'Rialto-Brücke', 'Ponte della Libertà'], answer: 1 },
          en: { q: 'What is the famous Venetian bridge called the Bridge of Sighs?', options: ['Ponte Vecchio', 'Ponte dei Sospiri', 'Rialto Bridge', 'Ponte della Libertà'], answer: 1 }
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
        },
        {
          de: { q: 'Wie heißt der längste Fluss Spaniens?', options: ['Ebro', 'Tajo', 'Guadalquivir', 'Duero'], answer: 1 },
          en: { q: 'What is the longest river in Spain?', options: ['Ebro', 'Tagus', 'Guadalquivir', 'Douro'], answer: 1 }
        },
        {
          de: { q: 'Welche spanische Stadt ist bekannt für ihre unvollendete Kirche Sagrada Família?', options: ['Madrid', 'Valencia', 'Sevilla', 'Barcelona'], answer: 3 },
          en: { q: 'Which Spanish city is famous for the unfinished Sagrada Família church?', options: ['Madrid', 'Valencia', 'Seville', 'Barcelona'], answer: 3 }
        },
        {
          de: { q: 'Wer entwarf die Sagrada Família in Barcelona?', options: ['Salvador Dalí', 'Antoni Gaudí', 'Joan Miró', 'Pablo Picasso'], answer: 1 },
          en: { q: 'Who designed the Sagrada Família in Barcelona?', options: ['Salvador Dalí', 'Antoni Gaudí', 'Joan Miró', 'Pablo Picasso'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt das traditionelle spanische Reisgericht mit Meeresfrüchten?', options: ['Gazpacho', 'Tapas', 'Paella', 'Tortilla'], answer: 2 },
          en: { q: 'What is the traditional Spanish rice dish with seafood called?', options: ['Gazpacho', 'Tapas', 'Paella', 'Tortilla'], answer: 2 }
        },
        {
          de: { q: 'Welche Inselgruppe gehört zu Spanien und liegt vor der Küste Afrikas?', options: ['Balearen', 'Azoren', 'Kanarische Inseln', 'Kap Verde'], answer: 2 },
          en: { q: 'Which island group belongs to Spain and lies off the coast of Africa?', options: ['Balearic Islands', 'Azores', 'Canary Islands', 'Cape Verde'], answer: 2 }
        },
        {
          de: { q: 'In welchem spanischen Gebäude hängt das Gemälde „Las Meninas" von Velázquez?', options: ['Reina Sofía', 'Prado', 'Thyssen-Bornemisza', 'Guggenheim Bilbao'], answer: 1 },
          en: { q: 'In which Spanish building does Velázquez\'s painting "Las Meninas" hang?', options: ['Reina Sofía', 'Prado', 'Thyssen-Bornemisza', 'Guggenheim Bilbao'], answer: 1 }
        },
        {
          de: { q: 'Welcher Stierkampf findet jährlich beim Sanfermín-Fest statt?', options: ['Pamplona-Stiertreiben', 'Encierro', 'Corrida', 'Rejoneo'], answer: 1 },
          en: { q: 'What is the name of the bull run that takes place annually at the San Fermín festival?', options: ['Pamplona Bull Chase', 'Encierro', 'Corrida', 'Rejoneo'], answer: 1 }
        },
        {
          de: { q: 'In welcher Stadt befindet sich die maurische Palastanlage Alhambra?', options: ['Sevilla', 'Córdoba', 'Granada', 'Toledo'], answer: 2 },
          en: { q: 'In which city is the Moorish Alhambra palace complex located?', options: ['Seville', 'Córdoba', 'Granada', 'Toledo'], answer: 2 }
        },
        {
          de: { q: 'Welche Sprache wird in Katalonien zusätzlich zu Spanisch offiziell gesprochen?', options: ['Baskisch', 'Galizisch', 'Katalanisch', 'Valencianisch'], answer: 2 },
          en: { q: 'Which language is officially spoken in Catalonia in addition to Spanish?', options: ['Basque', 'Galician', 'Catalan', 'Valencian'], answer: 2 }
        },
        {
          de: { q: 'Welches Fußballteam hat seinen Heimsitz im Santiago Bernabéu Stadion?', options: ['FC Barcelona', 'Atletico Madrid', 'Real Madrid', 'Sevilla FC'], answer: 2 },
          en: { q: 'Which football club plays its home games at the Santiago Bernabéu stadium?', options: ['FC Barcelona', 'Atletico Madrid', 'Real Madrid', 'Sevilla FC'], answer: 2 }
        },
        {
          de: { q: 'Welcher spanische Entdecker umsegelte als erster die Erde?', options: ['Hernán Cortés', 'Vasco Núñez de Balboa', 'Fernando Magellan', 'Christoph Kolumbus'], answer: 2 },
          en: { q: 'Which Spanish-led expedition was the first to circumnavigate the Earth?', options: ['Hernán Cortés', 'Vasco Núñez de Balboa', 'Ferdinand Magellan', 'Christopher Columbus'], answer: 2 }
        },
        {
          de: { q: 'Welche Stadt ist die Hauptstadt der autonomen Gemeinschaft Katalonien?', options: ['Valencia', 'Zaragoza', 'Barcelona', 'Girona'], answer: 2 },
          en: { q: 'Which city is the capital of the autonomous community of Catalonia?', options: ['Valencia', 'Zaragoza', 'Barcelona', 'Girona'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt die kalte Tomatensuppe, die besonders in Andalusien beliebt ist?', options: ['Salmorejo', 'Gazpacho', 'Ajoblanco', 'Porra antequerana'], answer: 1 },
          en: { q: 'What is the cold tomato soup particularly popular in Andalusia called?', options: ['Salmorejo', 'Gazpacho', 'Ajoblanco', 'Porra antequerana'], answer: 1 }
        },
        {
          de: { q: 'Wie heißt der höchste Berg Spaniens auf den Kanarischen Inseln?', options: ['Mulhacén', 'Aneto', 'Pico de Teide', 'Veleta'], answer: 2 },
          en: { q: 'What is the name of the highest peak in Spain, located in the Canary Islands?', options: ['Mulhacén', 'Aneto', 'Pico del Teide', 'Veleta'], answer: 2 }
        },
        {
          de: { q: 'Welcher spanische Schriftsteller schrieb „Don Quijote"?', options: ['Federico García Lorca', 'Miguel de Cervantes', 'Lope de Vega', 'Francisco de Quevedo'], answer: 1 },
          en: { q: 'Which Spanish author wrote "Don Quixote"?', options: ['Federico García Lorca', 'Miguel de Cervantes', 'Lope de Vega', 'Francisco de Quevedo'], answer: 1 }
        },
        {
          de: { q: 'Welche Stadt war von 711 bis 1492 das Zentrum der maurischen Herrschaft in Spanien?', options: ['Sevilla', 'Toledo', 'Córdoba', 'Granada'], answer: 2 },
          en: { q: 'Which city was a major centre of Moorish rule in Spain from 711 to 1031?', options: ['Seville', 'Toledo', 'Córdoba', 'Granada'], answer: 2 }
        },
        {
          de: { q: 'Wer war der spanische Diktator, der von 1939 bis 1975 regierte?', options: ['Miguel Primo de Rivera', 'Emilio Mola', 'Francisco Franco', 'Manuel Azaña'], answer: 2 },
          en: { q: 'Who was the Spanish dictator who ruled from 1939 to 1975?', options: ['Miguel Primo de Rivera', 'Emilio Mola', 'Francisco Franco', 'Manuel Azaña'], answer: 2 }
        },
        {
          de: { q: 'Wie heißt das typische spanische Getränk aus Wein und Früchten?', options: ['Cava', 'Horchata', 'Sangría', 'Sidra'], answer: 2 },
          en: { q: 'What is the typical Spanish drink made of wine and fruit called?', options: ['Cava', 'Horchata', 'Sangría', 'Sidra'], answer: 2 }
        },
        {
          de: { q: 'In welcher spanischen Stadt findet jährlich die Tomatenschlacht „La Tomatina" statt?', options: ['Valencia', 'Buñol', 'Castellón', 'Sagunto'], answer: 1 },
          en: { q: 'In which Spanish town does the annual tomato fight "La Tomatina" take place?', options: ['Valencia', 'Buñol', 'Castellón', 'Sagunto'], answer: 1 }
        },
        {
          de: { q: 'Welcher spanische Tennisspieler hat die French Open 14 Mal gewonnen?', options: ['Àlex Corretja', 'Carlos Moyá', 'Rafael Nadal', 'David Ferrer'], answer: 2 },
          en: { q: 'Which Spanish tennis player has won the French Open 14 times?', options: ['Àlex Corretja', 'Carlos Moyá', 'Rafael Nadal', 'David Ferrer'], answer: 2 }
        }
      ]
    }
  ]
};
