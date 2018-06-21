module.exports.auth = () => {
    const fs = require('fs');
    const readline = require('readline');
    const { google } = require('googleapis');

    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const TOKEN_PATH = 'credentials.json';

    var oAuth2;

    fs.readFile('client_secret.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        authorize(JSON.parse(content));
    });

    function authorize(credentials) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        fs.readFile(TOKEN_PATH, (err, token) => {
            oAuth2Client.setCredentials(JSON.parse(token));
            oAuth2 = oAuth2Client;
        });
    }
    return oAuth2;
};