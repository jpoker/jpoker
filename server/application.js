var express = require('express');
var morgan = require('morgan');
var server = express();
var PORT = 9372;

var AppController = require('./AppController.js').AppController;
var FakeDB = require('./FakeDB.js').FakeDB;

var db = new FakeDB();
var appController = new AppController(db); // use it in routes

server.use(morgan('short'));
server.use(express.static(__dirname + './../client'));

server.listen(PORT);
