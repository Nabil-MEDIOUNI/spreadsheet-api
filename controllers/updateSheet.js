exports.CreateNewCell = async (gsapi, response) => {
  const newArray = response.map((r) => {
    r.push(`${r[0]}_${r[1]}`);
    return r;
  });
  const updateOptions = {
    spreadsheetId: '1d4xiV1pOSoF8BmAfwQi_mzrD3CE_D5Cp1kf-fuSAaQ4',
    range: 'Data',
    valueInputOption: 'USER_ENTERED',
    resource: { values: newArray },
  };
  const newResponse = await gsapi.spreadsheets.values.update(updateOptions);
};

exports.UpdateCell = async (cl, gsapi) => {
  const request = {
    spreadsheetId: '1d4xiV1pOSoF8BmAfwQi_mzrD3CE_D5Cp1kf-fuSAaQ4',
    range: 'Data!A1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [['new value']],
    },
    auth: cl,
  };
  const responses = await gsapi.spreadsheets.values.update(request);
};

exports.FindAndReplace = async (gsapi, sheetId) => {
  const requests = [];
  requests.push({
    findReplace: {
      find: 'hello',
      replacement: 'name',
      allSheets: true,
    },
  });
  const batchUpdateRequest = { requests };
  await gsapi.spreadsheets.batchUpdate(
    {
      spreadsheetId: sheetId,
      resource: batchUpdateRequest,
    },
    (err, response) => {
      if (err) {
        // Handle error
        console.log(err);
      } else console.log('change succeed');
    },
  );
};

exports.DeleteCell = async (cl, gsapi) => {
  const request = {
    spreadsheetId: '1d4xiV1pOSoF8BmAfwQi_mzrD3CE_D5Cp1kf-fuSAaQ4',
    range: 'Data!A1',
    auth: cl,
  };
  const responses = await gsapi.spreadsheets.values.clear(request);
};
