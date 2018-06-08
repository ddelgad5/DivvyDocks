var express = require('express');
var router = express.Router();
var rpn = require('request-promise-native')
var options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

/* GET home page. */
router.get('/', function(req, res, next) {
  rpn(options).then( function(results) {
    console.log("Divvy API queried");
    var listChunks = []; // create array to send to template
    for (let i=0; i in results.stationBeanList; i++) { // iterate through the json file
      // console.log(results.stationBeanList[i].stationName);
      var chunk = { // create chunk object to hold individual data
        stationName: results.stationBeanList[i].stationName,
        availableDocks: results.stationBeanList[i].availableDocks,
        availableBikes: results.stationBeanList[i].availableBikes,
        totalDocks: results.stationBeanList[i].totalDocks
      }
      listChunks.push(chunk);
    }
    res.render('index', { syncTime: Date(results.executionTime), stations: listChunks });
  });
});

module.exports = router;
