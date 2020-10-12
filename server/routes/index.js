﻿var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('It works!\n');
});

module.exports = router;
