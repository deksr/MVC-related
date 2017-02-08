const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// CONFIG
require('./db/config');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));