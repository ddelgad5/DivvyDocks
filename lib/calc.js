// Sorting stations based on zip code and distance (coordinates)
'use strict';
// const navigator = require('navigator');
const rpn = require('request-promise-native');
const options = {
  url:"https://feeds.divvybikes.com/stations/stations.json",
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};
exports.googleMaps = 'https://www.google.com/maps/search/?api=1&query=';

exports.chunkSort = (list, location) => {
  let coord = {
    lat: location.coordLat,
    long: location.coordLong
  };
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
  return list;
};

exports.chunkSnip = (list, newSize) => {
  if (list.length < newSize) {
    return list;
  }
  while (list.length !== newSize) {
    list.pop();
  }
  for (let x of list) {
    x.url = exports.googleMaps + x.lat + ',' + x.long;
    // console.log(x.url);
  }
  return list;
};

exports.getCoord = () => {
  let coord = {
    lat: 41.834266, // IIT Mies Campus coordinates
    long: -87.627628 // IIT Mies Campus coordinates
  };
  // Backend geolocation
  return coord;
}

exports.findByZip = (data, location) => {
  console.log(location);
  let query = {
    timeStamp: data.executionTime
  }
  let listChunks = []; // create array to send to template
  for (let station of data.stationBeanList) { // iterate through the json file
    if (station.postalCode === location.zip) {  // Look for stations around IIT
      let chunk = { // create chunk object to hold individual data
        stationName: station.stationName,
        availableDocks: station.availableDocks,
        availableBikes: station.availableBikes,
        totalDocks: station.totalDocks,
        lat: station.latitude,
        long: station.longitude
      };
      listChunks.push(chunk);
    }
  }
  // console.log(listChunks);
  query.listChunks = exports.chunkSnip(listChunks, 10);
  console.log("Finished findByZip");
  // console.log(query);
  return query;
};

exports.findByCoord = (data, location) => {
  let query = {
    timeStamp: data.executionTime
  }
  let listChunks = []; // create array to send to template
  for (let station of data.stationBeanList) { // iterate through the json file
    let chunk = { // create chunk object to hold individual data
      stationName: station.stationName,
      availableDocks: station.availableDocks,
      availableBikes: station.availableBikes,
      totalDocks: station.totalDocks,
      lat: station.latitude,
      long: station.longitude
    };
    listChunks.push(chunk);
  }
  listChunks = exports.chunkSort(listChunks, location);
  query.listChunks = exports.chunkSnip(listChunks, 10);
  return query;
};
