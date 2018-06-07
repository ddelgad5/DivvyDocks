'use-strict';  //  Use strict rules

const express = require('express');
const app = express();
const fs = require('fs');
const req = require('request-promise-native'); //  Require the request-promise-native package
const options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};
// class Station {
//   constructor(id, stationName, availableDocks, totalDocks, latitude, longitude, statusKey, status, availableBikes, stAddress1, stAddress2, postalCode, testStation, lastCommunicationTime, landMark, is_renting) { // Station object
//     this.id = id,
//     this.stationName = stationName,
//     this.availableDocks = availableDocks,
//     this.totalDocks = totalDocks,
//     this.latitude = latitude,
//     this.longitude = longitude,
//     this.statusKey = statusKey,
//     this.status = status,
//     this.availableBikes = availableBikes,
//     this.stAddress1 = stAddress1,
//     this.stAddress2 = stAddress2,
//     this.postalCode = postalCode,
//     this.testStation = testStation,
//     this.lastCommunicationTime = lastCommunicationTime,
//     this.landMark = landMark,
//     this.is_renting = is_renting;
//   }
// }
// var obj = { //  JSON Structure
//   executionTime,
//   stationBeanList: []
// }

app.get('/', function(getRequest, getResponse) { //  Respond to GET request
  // res.send('Hello World!');  //  Test message
  console.log("Divvy API data requested");
  req(options)
    .then( function(rData) {
      console.log("Divvy data received");
      console.log(rData[1]);
      getResponse.send(rData);
    })
    .catch( function(err) {
      console.log("Something went wrong\n", err);
    });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
