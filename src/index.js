import React from 'react';
import ReactDOM from 'react-dom';

import AllUserWrapper from './components/AllUserWrapper.js';
import Header from './components/Header.js';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>
  <Header />
  <AllUserWrapper />
  </div>,
  document.getElementById('app')
);

//HTTP stdlib request
const https = require('https');

var twitterhandle = "Laggy";

https.get("https://searchandprotech.lib.id/checkSuicidal/?twitterHandle=" + twitterhandle, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    //console.log("Data from resp: " + data);
  });

}).on("error", (err) => {
  //console.log("Error: " + err.message);
});
//End HTTP stdlib request

module.hot.accept();
