function testSaveApplicatorData() {
    const mockData = JSON.parse(
        `[
      {
        "timestamp": 1761250446098,
        "aplicador": "diretor da emebenome",
        "escola": "ALDINO PINOTTI PREFEITO EMEB"
      },
      {
        "escola": "ALDINO PINOTTI PREFEITO EMEB",
        "timestamp": 1761250446098,
        "aplicador": "123456789"
      },
      {
        "timestamp": 1761250446098,
        "escola": "ALDINO PINOTTI PREFEITO EMEB",
        "aplicador": "12345"
      },
      {
        "timestamp": 1761250446098,
        "aplicador": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "turma": "2º Ano EF - MANHÃ - A",
        "escola": "ALDINO PINOTTI PREFEITO EMEB"
      },
      {
        "turma": "2º Ano EF - MANHÃ - B",
        "timestamp": 1761250446098,
        "escola": "ALDINO PINOTTI PREFEITO EMEB",
        "aplicador": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
      },
      {
        "escola": "ALDINO PINOTTI PREFEITO EMEB",
        "aplicador": "ccccccccccccccccccccccccccccc",
        "turma": "2º Ano EF - TARDE - C",
        "timestamp": 1761250446098
      },
      {
        "timestamp": 1761250446098,
        "turma": "2º Ano EF - TARDE - D",
        "aplicador": "dddddddddddddddddddddddddddd",
        "escola": "ALDINO PINOTTI PREFEITO EMEB"
      }
    ]`
    );

    saveApplicatorData(mockData);
}

