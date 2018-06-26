'use strict';
const express = require('express');
const router = express.Router();
const rpn = require('request-promise-native');
const calc = require('../lib/sort.js');
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
    // console.log("Divvy API queried");
    let coord = calc.getCoord();
    let listChunks = []; // create array to send to template
    for (const station of results.stationBeanList) { // iterate through the json file
      // console.log(results.stationBeanList[i].stationName);
      if (station.postalCode === '60616') {  // Look for stations around IIT
        let chunk = { // create chunk object to hold individual data
          stationName: station.stationName,
          availableDocks: station.availableDocks,
          availableBikes: station.availableBikes,
          totalDocks: station.totalDocks,
          lat: station.latitude,
          long: station.longitude
        };
        listChunks.push(chunk);
      }
    }
    calc.chunkSort(listChunks, coord);
    listChunks = calc.chunkSnip(listChunks, 10);
    res.render('index', { syncTime: Date(results.executionTime), stations: listChunks });
  });
});

module.exports = router;
