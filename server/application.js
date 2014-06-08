var express = require('express');
var morgan = require('morgan');
var server = module.exports = express();
var PORT = 9372;

server.use(morgan('short'));
server.use('/static', express.static(__dirname + './../client/static'));

server.get('/', function(req, res) {
    res.redirect('/static/index.html');
});

server.post('/sessions', function(req, res) {
    res.send('session created!');
});



server.listen(PORT);
<<<<<<< HEAD
C:\Users\Sergii\Polymer\bower_components\core-input\application.js
=======
>>>>>>> d92f6afb81971fbccaa60fa447372ad22fa9f79b
