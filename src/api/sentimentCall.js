//HTTP stdlib request
const https = require('https');
const config = require('./config.js');

export default sentimentCall = (twitterHandle = config.twitterHandle) => {
    https.get("https://searchandprotech.lib.id/checkSuicidal@0.0.0/?twitterHandle=" + config.twitterHandle, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log("Data from resp: " + data);
            return data;
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    //End HTTP stdlib request
}