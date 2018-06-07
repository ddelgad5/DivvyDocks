'use-strict';  //  Use strict rules

const express = require('express');
const app = express();
const req = require('request-promise-native'); //  Require the request-promise-native package
const options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

app.get('/', function(getRequest, getResponse) { //  Respond to GET request
  // res.send('Hello World!');  //  Test message
  console.log("Divvy API data requested");
  req(options)
    .then( function(rData) {
      console.log("Divvy data received");
      getResponse.send(rData);
    })
    .catch( function(err) {
      console.log("Something went wrong\n", err);
    });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
