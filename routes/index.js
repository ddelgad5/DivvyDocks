'use strict';
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("Homepage requested");
  res.render('index');
});

module.exports = router;
