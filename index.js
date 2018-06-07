'use-strict';  //  Use strict rules

const express = require('express');
const app = express();
const fs = require('fs');  //  Require the file system
const req = require('request-promise-native');  //  Require the request-promise-native package
const options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

app.get('/', function(req, res) { //  Respond to GET request
  // res.send('Hello World!');  //  Test message
  console.log("Divvy API data requested");
  req(options) // Divvy API call
  .then(
    function(results) {
      res.send(results);
      console.log('Divvy request successful!');
    }
  )
  .catch(function(err) {
    console.log(err);
  });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
