
/**
 * @returns {Array<Object>} An array of objects representing the data.
 */
function _getDbData() {
    const dbSS = SpreadsheetApp.openById(DATA_SPREADSHEET_ID);
    const dbSheet = dbSS.getSheetByName(DATA_SPREADSHEET_SHEETNAME);
    const dbRng = dbSheet.getDataRange();

    const data = dbRng.getValues();

    return data;
}

/**
 * @param {*} data - The data to sanitize (e.g., string, number, array, nested array).
 * @returns {*} - The sanitized data, preserving the array structure.
 */
function _sanitizeDataToString(data) {
    if (Array.isArray(data)) {
        return data.map(entry => _sanitizeDataToString(entry));
    }

    return `${data}`.replace(/[/\\(){}<>"]/g, " ");
}

function _backupDatabase() {
    const dbSS = SpreadsheetApp.openById(DATA_SPREADSHEET_ID);
    const dbSheet = dbSS.getSheetByName(PROD_DATABASE_SHEETNAME);

    const d = new Date(Date.now());
    const date = `${d.getDay()}/${d.getMonth()}-${d.getHours()}:${d.getMinutes()}`

    const newSheet = dbSheet.copyTo(dbSS);
    const newSheetName = "_backup_" + date + PROD_DATABASE_SHEETNAME;

    newSheet.setName(newSheetName);

    Logger.log(`Created a new backup for ${PROD_DATABASE_SHEETNAME}\n\n${newSheetName}`);
}

