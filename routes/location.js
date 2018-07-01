'use strict';
const express = require('express');
const router = express.Router();
const calc = require('../lib/calc.js');
const rpn = require('request-promise-native');
const options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

router.all('/', function(req,res) {
  console.log("POST recieved");
  rpn(options).then(function(results) {
    let locationData;
    if (req.body) {
      locationData = req.body;
    }
    else {
      locationData = calc.getCoord();
    }
    let query;
    if (locationData.zip) {
      console.log("User is requesting via zip");
      query = calc.findByZip(results, locationData);
    }
    else if (locationData.coordLong && locationData.coordLat) {
      console.log("User is requesting via coordinates");
      query = calc.findByCoord(results, locationData);
    }
    else {
      console.log("Something went wrong");
      // Render invalid data
    }
    res.render('locations', { syncTime: query.timeStamp, stations: query.listChunks });
  });
});

module.exports = router;
