const { google } = require('googleapis');

exports.client = new google.auth.JWT(
  '',
  null,
  '',
  ['https://www.googleapis.com/auth/spreadsheets'],
);
