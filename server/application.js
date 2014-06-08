var http = require('http');
var express = require('express');
var morgan = require('morgan');
var server = module.exports = express();//express.createServer()
var PORT = 9372;

var AppController = require('./AppController.js').AppController;
var FakeDB = require('./FakeDB.js').FakeDB;

var db = new FakeDB();
var appController = new AppController(db); // use it in routes

server.use(morgan('short'));
server.use('/static', express.static(__dirname + './../client/static'));

//include the router middleware
server.use(server.router);

//root of the website
server.get('/', function(req, res) {
    res.redirect('/static/index.html');
});

server.post('/session/:id', function(req, res) {
    res.send('session created!' + req.params.session_id);
});

server.post('/user/:id', function (req, res) {
    res.send('user added' + req.params.user_id);
});

server.get('', function (req, res) {
    res.send('connected users' + req.params.connected_users);
});


server.index = {
    json : function(req, res){
        res.send(''); //TODO: compose a response 
    }
};

server.default = function (req, res) {
    res.send('Unsupported format "' + req.format + '"', 406);
};


server.listen(PORT);
