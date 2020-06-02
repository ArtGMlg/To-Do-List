const express = require('express');
const request = require('request-promise');
const app = express();
var parseString = require('xml2js').parseString;
var router = express.Router();

router.get('/get/:city', function(req, res, next){
	var city = req.query.city;
	var url = 'http://weather.service.msn.com/data.aspx?weasearchstr='+city+'&culture=ru-RU&weadegreetype=C&src=msn'

	var options = {
		method: 'GET',
		uri: encodeURI(url)
	}

	res.setHeader('Content-Type', 'text/xml');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	request(options)
		.then(function (response) {
		  parseString(response, function (err, result) {
				res.jsonp(result);
		  });
		})
		.catch(function (err) {
		  res.send(JSON.stringify(err))
	})
})
	
module.exports = router;
