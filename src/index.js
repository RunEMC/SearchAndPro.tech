import React from 'react';
import ReactDOM from 'react-dom';

import AllUserWrapper from './components/AllUserWrapper.js';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>
  <AllUserWrapper />
  </div>,
  document.getElementById('app')
);

//HTTP stdlib request
const https = require('https');

var twitterhandle = "Laggy";

https.get("https://searchandprotech.lib.id/checkSuicidal@0.0.0/?twitterHandle=" + twitterhandle, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log("Data from resp: " + data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
//End HTTP stdlib request

//Twitter DM

// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function PostCode(codestring) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : codestring
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'closure-compiler.appspot.com',
      port: '80',
      path: '/compile',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}

// This is an async file read
fs.readFile('LinkedList.js', 'utf-8', function (err, data) {
  if (err) {
    // If this were just a small part of the application, you would
    // want to handle this differently, maybe throwing an exception
    // for the caller to handle. Since the file is absolutely essential
    // to the program's functionality, we're going to exit with a fatal
    // error instead.
    console.log("FATAL An error occurred trying to read in the file: " + err);
    process.exit(-2);
  }
  // Make sure there's data before we post it
  if(data) {
    PostCode(data);
  }
  else {
    console.log("No data to post");
    process.exit(-1);
  }
});


//End Twitter DM

module.hot.accept();
