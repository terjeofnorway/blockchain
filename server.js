const express = require('express');
const path = require('path');

const publicDir = `${__dirname}/dist`;
const index = `${publicDir}/index.html`;

const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'dist')))
  .get('/', (req, res) => res.sendFile(index))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
