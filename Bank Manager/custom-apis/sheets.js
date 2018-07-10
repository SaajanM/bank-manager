const { google } = require('googleapis');
const sheets = google.sheets('v4');
const fs = require('fs');
const readline = require('readline');
const spreadsheetID = "1SEuX3T6XDji6dJFlNkPlkF0NNS9KhpcCylLN8GYGgw4";
module.exports.auth = (callback) => {
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
    const TOKEN_PATH = 'credentials.json';

    fs.readFile('client_secret.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        authorize(JSON.parse(content));
    });

    function authorize(credentials) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return console.log(err);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }
};
module.exports.read = (auth, range, callback) => {
    var request = {
        spreadsheetId: spreadsheetID,
        range: range,
        auth: auth,
        valueRenderOption: "UNFORMATTED_VALUE",
        dateTimeRenderOption: "FORMATTED_STRING",
        majorDimension: "ROWS"
    };
    
    sheets.spreadsheets.values.get(request, function (err, response) {
        if (err) {
                console.error(err);
                return;
        }

        // TODO: Change code below to process the `response` object:
        callback(response);
    });
};
module.exports.write = (auth, range, newValues, callback) => {
    var body = {
        values: newValues
    };
    var request = {
        spreadsheetId: spreadsheetID,
        range: range,
        valueInputOption: "USER_ENTERED",
        resource: body,
        auth: auth
    };
    sheets.spreadsheets.values.update(request, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        callback(result);
    });
};