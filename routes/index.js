'use strict';
const express = require('express');
const router = express.Router();
const rpn = require('request-promise-native');
const calc = require('../lib/calc.js');
const options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};
/* GET home page. */
router.get('/', function(req, res) {
  let coord = calc.getCoord();
  let query = calc.findByCoord(coord);
  console.log(query);
  res.render('index', { syncTime: query.timeStamp, stations: query.listChunks });
  // res.render('index');
});

module.exports = router;
