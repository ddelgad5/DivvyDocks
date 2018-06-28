'use strict';
const express = require('express');
const router = express();

router.post('/location', function(req,res) {
  console.log("POST recieved");
  console.log(req.params);
  res.send(req.params);
});

module.exports = router;
