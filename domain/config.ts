/// <reference types="google-apps-script" />

const IS_DEV_MODE = ScriptApp.getService().getUrl().endsWith('/dev');

const ALLOWED_DOMAIN = PropertiesService.getScriptProperties().getProperty("ALLOWED_DOMAIN");

const DATA_SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("DATA_SPREADSHEET_ID");

const PROD_DATABASE_SHEETNAME = "_prod_database_";

const DEV_DATABASE_SHEETNAME = "_dev_database_";

const DATA_SPREADSHEET_SHEETNAME = IS_DEV_MODE ? DEV_DATABASE_SHEETNAME : PROD_DATABASE_SHEETNAME;

const DATA_HEADERS_INDEX = {
    CIE: 0,
    ESCOLA: 1,
    TURMA: 2,
    APLICADOR: 3,
    DIRETOR: 4,
    EPOCH_TIMESTAMP: 5,
    DIRETOR_MATR: 6,
    DIRETOR_CPF: 7,
    USER_EMAIL: 8,
}
