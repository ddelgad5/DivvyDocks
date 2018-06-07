'use-strict';  //  Use strict rules

const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const index = fs.readFileSync('index.html');
const req = require('request-promise-native'); //  Require the request-promise-native package
const options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

app.get('/', function(getRequest, getResponse) { //  Respond to GET request on homepage
  console.log("Homepage being requested");
  console.log("Requesting Divvy API data");
  req(options)
    .then( function(rData) {
      console.log("Divvy data received");
      console.log("Timestamp:", rData.executionTime);
      fs.writeFile('docks.json', JSON.stringify(rData), (err) => {
        if (err) {
          throw err;
        }
      });
      getResponse.sendFile(index);
    })
    .catch( function(err) {
      console.log("Something went wrong\n", err);
    });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
