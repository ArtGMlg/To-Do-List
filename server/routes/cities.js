var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');

router.get('/get', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.contentType('json');
	res.setHeader('Content-Type', 'application/json');
  var data = JSON.parse(fs.readFileSync('cities.json'),'utf8');
  var cities = data.city;
  var citiesNames = [];
  for (var i = 0; i < cities.length; i++) {
  	citiesNames.push(cities[i].name);
  }
	res.jsonp(citiesNames);
});

module.exports = router;
