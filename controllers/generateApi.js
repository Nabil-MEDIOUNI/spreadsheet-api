const { google } = require('googleapis');

const { client } = require('./auth-client');
const { TransformApi } = require('./transformApi');

const gsapi = google.sheets({ version: 'v4', auth: client });

exports.googleSheetRun = async (sheetId, rangeName, rowColumn) => {
  const options = {
    spreadsheetId: sheetId,
    range: rangeName,
  };
  const data = (await gsapi.spreadsheets.values.get(options)).data.values;
  return TransformApi(data, options, rowColumn);
};
