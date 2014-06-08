var http = require('http');
var express = require('express');
var morgan = require('morgan');
var server = module.exports = express();//express.createServer()
var PORT = 9372;

var AppController = require('./AppController.js').AppController;
var SessionController = require('./SessionController.js').SessionController;
var FakeDB = require('./FakeDB.js').FakeDB;

var db = new FakeDB();
var appController = new AppController(db);

server.use(morgan('short'));
server.use('/static', express.static(__dirname + './../client/static'));



//root of the website
server.get('/', function(req, res) {
    res.redirect('/static/index.html');
});

server.post('/sessions/new/:master_id', function (req, res) {
    res.send('session created! ' +
        appController.createSession(req.params.master_id).id);
});

server.post('/sessions/edit/:session_id/user/:user_id', function (req, res) {
    var sessionController = new SessionController(appController.getSessionByID(req.params.session_id), db);
    var addedUser = sessionController.joinSession(req.params.user_id);

    res.send('user ' + addedUser.name +
        ' added to session ' + req.params.session_id);
});

server.get('/session/:id/users/:info', function (req, res) {


    res.send('connected users ' + req.params.info);
});


server.listen(PORT);