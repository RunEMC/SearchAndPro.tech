const express = require('express');
const PORT = process.env.PORT || 3000;
var path = require('path');

var app = express();

app.set('port', PORT);

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
  });
