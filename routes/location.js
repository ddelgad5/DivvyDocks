'use strict';
const express = require('express');
const router = express.Router();

router.post('/', function(req,res) {
  console.log("POST recieved");
  console.log(req.body);
  res.send(req.body);
  let query;
  if (req.body.zip) {
    console.log("User is requesting via zip");
    query = calc.findByZip(req.body.zip);
  }
  else {
    console.log("User is requesting via coordinates");
    query = calc.findByCoord(req.body.coord);
  }
  res.render('index', { syncTime: query.timeStamp, stations: query.listChunks });
});

module.exports = router;
