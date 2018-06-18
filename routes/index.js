'use strict';
const express = require('express');
const router = express.Router();
const rpn = require('request-promise-native');
const options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};
const googleMaps = 'https://www.google.com/maps/search/?api=1&query=';

/* GET home page. */
router.get('/', function(req, res) {
  rpn(options).then( function(results) {
    console.log("Divvy API queried");
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
        console.log(chunk.url);
        listChunks.push(chunk);
      }
    }
    let coord = {
      lat: 41.834266, // IIT Mies Campus coordinates
      long: -87.627628 // IIT Mies Campus coordinates
    };
    chunkSort(listChunks, coord);
    listChunks = chunkSnip(listChunks, 10);
    res.render('index', { syncTime: Date(results.executionTime), stations: listChunks });
  });
});

module.exports = router;

const chunkSort = (list, coord) => {
  for (let x of list) { // Calculate distance for every station
    x.distance = Math.sqrt(Math.pow((x.lat - coord.lat), 2) + Math.pow((x.long - coord.long), 2)); // get direct distance from coord
  }
  for (let i=0; i < list.length; i++) {
    let target = i; // Current spot up for grabs in the array
    for (let x=i+1; x < list.length; x++) { // Find nearest station
      if (list[x].distance < list[target].distance) {
        // console.log(list[x].stationName,"in spot", i);
        target = x;
      }
    }
    let temp = list[i]; // create placeholder
    list[i] = list[target]; // assign station based on distance
    list[target] = temp; // re-introduce the old station into the list
  }
};

const chunkSnip = (list, newSize) => {
  if (list.length < newSize) {
    return list;
  }
  while (list.length !== newSize) {
    list.pop();
  }
  for (let x of list) {
    x.url = googleMaps + x.lat + ',' + x.long;
    // console.log(x.url);
  }
  return list;
};
