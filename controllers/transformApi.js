const { google } = require('googleapis');
const auth = require('./auth-client');

const gsapi = google.sheets({ version: 'v4', auth: auth.client });

exports.TransformApi = async (data, opt, rowColumn) => {
  const Objectproperties = (
    await gsapi.spreadsheets.values.get(opt)
  ).data.values[rowColumn].map((val) => val.replace(/\s/g, ''));

  const rows = data.filter((_, index) => index !== 0);
  const objects = rows.map((array) => array.reduce((accumulator, currentValue, index) => ({
    ...accumulator,
    [Objectproperties[index]]: currentValue,
  }), {}));
  return objects;
};

exports.reverseTransform = (objects) => objects.map((dict) => Object.values(dict));
