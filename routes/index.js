'use strict';
const express = require('express');
const router = express.Router();
const rpn = require('request-promise-native');
const options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

/* GET home page. */
router.get('/', function(req, res) {
  rpn(options).then( function(results) {
    console.log("Divvy API queried");
    let listChunks = []; // create array to send to template
    for (const station of results.stationBeanList) { // iterate through the json file
      // console.log(results.stationBeanList[i].stationName);
      if (station.postalCode === '60616') {  // Look for stations around IIT
        let chunk = { // create chunk object to hold individual data
          stationName: station.stationName,
          availableDocks: station.availableDocks,
          availableBikes: station.availableBikes,
          totalDocks: station.totalDocks
        }
        listChunks.push(chunk);
      }
    }
    res.render('index', { syncTime: Date(results.executionTime), stations: listChunks });
  });
});

module.exports = router;
