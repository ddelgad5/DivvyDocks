'use-strict'; // Use strict rules

const express = require('express');
const app = express();

app.get('/', function (req, res) { //  Respond to GET request
  res.send('Hello World!');
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
