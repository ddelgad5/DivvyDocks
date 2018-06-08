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
    res.render('index', { syncTime: Date(results.executionTime) });
  });
});

module.exports = router;
