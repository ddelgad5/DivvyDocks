'use strict';
const express = require('express');
const router = express.Router();
const calc = require('../lib/calc.js');

router.post('/', function(req,res) {
  console.log("POST recieved");
  console.log(req.body);
  let locationData = req.body;
  console.log("Zip:", locationData.zip);
  console.log("Lat:", locationData.coordLat);
  console.log("Long:", locationData.coordLong);
  if (locationData.zip) {
    console.log("User is requesting via zip");
    let query = calc.findByZip(locationData);
    console.log("Query complete");
  }
  else if (locationData.coordLong && locationData.coordLat) {
    console.log("User is requesting via coordinates");
    let query = calc.findByCoord(locationData);
    console.log("Query complete");
  }
  else {
    console.log("Something went wrong");
    // Render invalid data
  }
  console.log("All location calculations complete");
  // console.log("Data to be rendered:", query);
  // res.render('locations', { syncTime: query.timeStamp, stations: query.listChunks });
  console.log("Data to be rendered:", query);
  res.render('index');
});

module.exports = router;
