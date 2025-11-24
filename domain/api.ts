function doGet() {
    return HtmlService.createHtmlOutputFromFile('pages/index.html').setTitle("Alocação de Aplicadores - Saresp");
    // return HtmlService.createHtmlOutputFromFile('pages/accessDenied.html').setTitle("Alocação de Aplicadores - Saresp");
}

function getSchools() {
    const data = _getDbData();

    // removes headers (first row)
    // maps to school column only
    // removes duplicates by parsing into `Set` then back to `Array`
    const schools = [...new Set(data.slice(1).map(entry => entry[DATA_HEADERS_INDEX.ESCOLA]))];

    return _sanitizeDataToString(schools.sort());
}

function getClassesForSchool(schoolName) {
    const data = _getDbData();

    return _sanitizeDataToString(data.filter(item => item[DATA_HEADERS_INDEX.ESCOLA] == schoolName));
}

function saveApplicatorData(applicatorData) {
    Logger.log(JSON.stringify(applicatorData, null, 2));
    const lock = LockService.getScriptLock();

    try {
        lock.waitLock(30000);

        try {
            //gets current data stored in the db
            let dbData = _getDbData();
            let entriesModified = 0;

            // merges the new data into it
            applicatorData.forEach(function (entry) {
                const foundIndex = dbData.findIndex(row => row[DATA_HEADERS_INDEX.ESCOLA] == entry.escola && row[DATA_HEADERS_INDEX.TURMA] == entry.turma);
                if (!foundIndex) {
                    throw new Error(`Não foi encontrado uma entrada para ${row[DATA_HEADERS_INDEX.ESCOLA]} | ${row[DATA_HEADERS_INDEX.TURMA]}`);
                }

                const currentApplicator = dbData[foundIndex][DATA_HEADERS_INDEX.APLICADOR];
                const newApplicator = entry.aplicador.toUpperCase();

                if (currentApplicator !== newApplicator) {
                    dbData[foundIndex][DATA_HEADERS_INDEX.APLICADOR] = newApplicator;
                    dbData[foundIndex][DATA_HEADERS_INDEX.DIRETOR] = entry.diretor;
                    dbData[foundIndex][DATA_HEADERS_INDEX.DIRETOR_CPF] = entry.diretor_cpf;
                    dbData[foundIndex][DATA_HEADERS_INDEX.DIRETOR_MATR] = entry.diretor_matr;
                    dbData[foundIndex][DATA_HEADERS_INDEX.EPOCH_TIMESTAMP] = entry.timestamp;
                    dbData[foundIndex][DATA_HEADERS_INDEX.USER_EMAIL] = entry.user_email;
                    entriesModified++;
                }
            });

            if (entriesModified < 1) {
                return {
                    status: 'success',
                    message: `Os aplicadores já estão registrados. Não houve alteração.`
                };
            }

            const dbSS = SpreadsheetApp.openById(DATA_SPREADSHEET_ID);
            const dbSheet = dbSS.getSheetByName(DATA_SPREADSHEET_SHEETNAME);
            const dbRng = dbSheet.getDataRange();

            dbRng.setValues(_sanitizeDataToString(dbData));

            return {
                status: 'success',
                message: `Sucesso! ${entriesModified} aplicadores foram registrados.`
            };
        } catch (e) {
            Logger.log(e);
            return {
                status: 'error',
                message: `Ocorreu um erro!\n\n ${e}`
            };
        }
    } catch (e) {
        Logger.log(e);
        return {
            status: 'error',
            message: `Muitos acessos simultâneos! Por gentileza, tente novamente em alguns minutos.`
        };
    } finally {
        SpreadsheetApp.flush();
        lock.releaseLock();
    }
}

function getCurrentUserEmail() {
    return Session.getActiveUser().getEmail();
}








