const express = require('express');
const path = require('path');
const app = express();
const publicDir = __dirname + "/dist/";

const PORT = process.env.PORT || 5000

express()
.use(express.static(path.join(__dirname, 'dist')))
.get('/', (req, res) => res.sendFile(publicDir + 'index.html'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
