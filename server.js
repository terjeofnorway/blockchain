var express = require('express');
var path = require('path');
var app = express();
var public = __dirname + "/dist/";

const PORT = process.env.PORT || 5000

app.get('/', function (req, res) {
  res.sendFile(path.join(public + 'index.html'));
});

app.use('/', express.static(public));

app.listen(PORT);
