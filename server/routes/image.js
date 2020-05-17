const express = require('express');
const request = require('request-promise');
const app = express();
var router = express.Router();

const options = {
	method: 'GET',
	uri: 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',
	json: true
}

router.get('/get', function(req, res, next){
	res.setHeader('Content-Type', 'application/json');	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	request(options)
		.then(function (response) {
		  res.jsonp(response);
		})
		.catch(function (err) {
		    // Произошло что-то плохое, обработка ошибки
	})
})
	
module.exports = router;
