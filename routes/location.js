'use strict';
const express = require('express');
const router = express.Router();

router.post('/', function(req,res) {
  console.log("POST recieved");
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
