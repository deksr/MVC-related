var express = require('express');
var randomstring = require("random-string");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var x = randomstring({length: 10})
	console.log(x)
  res.render('index', { title: 'Express' });
});

module.exports = router;
