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
        }
      ]
    }
  ]
};
