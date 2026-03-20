var MISSIONS = [
  {
    id: 'paperclip', wave: 1, mode: 'decode',
    name: { en: 'OPERATION PAPERCLIP', de: 'OPERATION BÜROKLAMMER' },
    briefing: {
      en: 'Agent — a transmission from an unknown source has been intercepted. Identify the signals.',
      de: 'Funker — eine Übertragung aus unbekannter Quelle wurde abgefangen. Signale identifizieren.'
    }
  },
  {
    id: 'mincemeat', wave: 1, mode: 'encode',
    name: { en: 'OPERATION MINCEMEAT', de: 'OPERATION HACKFLEISCH' },
    briefing: {
      en: 'HQ requires confirmation. Transmit the codes accurately.',
      de: 'Die Zentrale benötigt Bestätigung. Codes korrekt übermitteln.'
    }
  },
  {
    id: 'gold', wave: 2, mode: 'decode',
    name: { en: 'OPERATION GOLD', de: 'OPERATION GOLD' },
    briefing: {
      en: 'A message from East Berlin has been intercepted. Decrypt it now.',
      de: 'Eine Nachricht aus Ost-Berlin wurde abgefangen. Jetzt entschlüsseln.'
    }
  },
  {
    id: 'stopwatch', wave: 2, mode: 'encode',
    name: { en: 'OPERATION STOPWATCH', de: 'OPERATION STOPPUHR' },
    briefing: {
      en: 'Time is critical. Transmit each signal with precision.',
      de: 'Zeit ist knapp. Jeden Code mit Präzision senden.'
    }
  },
  {
    id: 'ivy_bells', wave: 3, mode: 'decode',
    name: { en: 'OPERATION IVY BELLS', de: 'OPERATION EFEUGLÖCKEN' },
    briefing: {
      en: 'Deep cover asset has made contact. Stand by for incoming.',
      de: 'Undercoverquelle hat Kontakt aufgenommen. Eingehende Übertragung erwarten.'
    }
  },
  {
    id: 'corona', wave: 3, mode: 'encode',
    name: { en: 'OPERATION CORONA', de: 'OPERATION KRONE' },
    briefing: {
      en: 'Relay the extraction coordinates. Each symbol counts.',
      de: 'Extraktionskoordinaten übermitteln. Jedes Symbol zählt.'
    }
  },
  {
    id: 'ryan', wave: 4, mode: 'decode',
    name: { en: 'OPERATION RYAN', de: 'OPERATION RYAN' },
    briefing: {
      en: 'Intercept traffic suggests imminent movement. Decode at speed.',
      de: 'Abgehörter Funkverkehr deutet auf bevorstehende Bewegung hin. Schnell entschlüsseln.'
    }
  },
  {
    id: 'gladio', wave: 4, mode: 'encode',
    name: { en: 'OPERATION GLADIO', de: 'OPERATION GLADIO' },
    briefing: {
      en: 'The network is waiting. Transmit the activation phrase.',
      de: 'Das Netzwerk wartet. Aktivierungsphrase senden.'
    }
  },
  {
    id: 'venona', wave: 5, mode: 'decode',
    name: { en: 'OPERATION VENONA', de: 'OPERATION VENONA' },
    briefing: {
      en: 'Full spectrum intercept. All letters are in play. Stay sharp.',
      de: 'Volles Spektrum abgefangen. Alle Buchstaben möglich. Konzentration.'
    }
  },
  {
    id: 'swordfish', wave: 5, mode: 'encode',
    name: { en: 'OPERATION SWORDFISH', de: 'OPERATION SCHWERTFISCH' },
    briefing: {
      en: 'The password is the key. Transmit it without error.',
      de: 'Das Passwort ist der Schlüssel. Fehlerfrei übermitteln.'
    }
  },
  {
    id: 'numerus', wave: 6, mode: 'decode',
    name: { en: 'OPERATION NUMERUS', de: 'OPERATION NUMERUS' },
    briefing: {
      en: 'Numbers station detected. Decode the numerical transmission.',
      de: 'Zahlensender geortet. Numerische Übertragung entschlüsseln.'
    }
  },
  {
    id: 'cipher', wave: 6, mode: 'encode',
    name: { en: 'OPERATION CIPHER', de: 'OPERATION CHIFFRE' },
    briefing: {
      en: 'Encode the numerical cipher for transmission to HQ.',
      de: 'Zahlen-Chiffre für Übermittlung an die Zentrale codieren.'
    }
  }
];

function getMissionsForWave(wave) {
  return MISSIONS.filter(function(m) { return m.wave <= wave; });
}
