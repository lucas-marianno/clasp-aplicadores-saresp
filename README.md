# CLASP - Alocação de Aplicadores
Full stack web app used by the Secretaria de Educação de São Bernardo do Campo. (PMSBC)

This web app is used by over 75 schools across the municipality.

## Tech Stack
Yeah, I know google sheets should not be used as a data base yada yada yada... But, hear me out, PMSBC offers to the Secretaria de Educação the Enterprise plan of Google Workspace. That being said, this standard development environment.

### Front End
- HTML5
- JavaScript (vanilla)
- CSS (tailwind)

### Back End
- TypeScript (will be converted to `.gs` - Google App Script)

### Database
- Google Sheets

### Tech stack "glue"
- CLASP (Command Line Apps Script Projects) is a tool that allows for local devolpment of App Script projects.

## How to use this project

### Local settings
- Install and log into [clasp]("https://developers.google.com/apps-script/guides/clasp")

### Appscript settings
- Create a new [Google Sheets](https://docs.google.com/spreadsheets/) document
- Create a new [App Script](https://script.google.com/) Project
- Save the GSheets document ID to `PropertiesService` under the key `DATA_SPREADSHEET_ID`;
- In the new GSheets doc:
  - Create 3 tabs named `_prod_database_`,`_dev_database_`,`_reference_`,
  - Add the following headers to `_reference_` (these headers should correspond the data available in [sis.vunesp.com.br](https://sis.vunesp.com.br/operacao/PlanoDeAplicacao) (you'll need to be logged in as `Coordenador de Avaliação`)):
    CIE,	ESCOLA,	TURMA
  - Add the following headers to both `_prod_database_` and `_dev_database_` tabs (do not add anything except for the headers, since these tabs will have their content updated based on `_reference_` and the responses from the web app form):
    CIE,	ESCOLA,	TURMA,	APLICADOR,	DIRETOR,	EPOCH_TIMESTAMP,	DIRETOR_MATR,	DIRETOR_CPF,	USER_EMAIL
- Create a new deployment
- Embed the new deployment link to a [Google Sites](https://sites.google.com/) website (so that the users entry point web link remains the same on every new script deployment)
    - When embedding the url, if you deployed the script from within a G Suite domain. Add `/a/<your domain name>` right after `https://script.google.com`
    Example: `https://script.google.com/a/<your.company.domain.here>/macros/s/<yourNewDeploymentIdHere>/exec`
