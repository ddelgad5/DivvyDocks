// Sorting stations based on zip code and distance (coordinates)
'use strict';
// const navigator = require('navigator');
exports.googleMaps = 'https://www.google.com/maps/search/?api=1&query=';

exports.chunkSort = (list, coord) => {
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
  // let coord;
  let coord = {
    lat: 41.834266, // IIT Mies Campus coordinates
    long: -87.627628 // IIT Mies Campus coordinates
  };
  // if (!navigator.geolocation) { // geolocation is not available
  // }
  // let success = (position) => {
  //   coord = {
  //     lat: position.coords.latitude,
  //     long: position.coords.longitude
  //   };
  //   return coord;
  // };
  // let error = () => {
  //   return coord;
  // };
  // navigator.geolocation.getCurrentPosition(success, error);
  return coord;
}
