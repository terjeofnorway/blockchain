const express = require('express');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const PORT = process.env.PORT || 5000;

express()
  .use(express.static(publicDir))
  .get('/', (req, res) => res.sendFile('index.html'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
