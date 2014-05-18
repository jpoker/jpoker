var express = require('express');
var morgan = require('morgan');
var server = express();
var PORT = 9372;

server.use(morgan('short'));
server.use(express.static(__dirname + './../client'));

server.listen(PORT);
C:\Users\Sergii\Polymer\bower_components\core-input\application.js