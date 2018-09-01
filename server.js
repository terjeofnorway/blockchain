var express = require('express');
var path = require('path');
var app = express();
var public = __dirname + "/dist/";

const PORT = process.env.PORT || 5000

express()
.use(express.static(path.join(__dirname, 'dist')))
.get('/', (req, res) => res.sendFile(public + 'index.html'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
