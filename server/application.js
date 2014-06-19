var http = require('http');
var express = require('express');
var morgan = require('morgan');
var server = module.exports = express();//express.createServer()
var PORT = 9372;

var AppController = require('./AppController.js').AppController;
var SessionController = require('./SessionController.js').SessionController;
var FakeDB = require('./FakeDB.js').FakeDB;
var MongoDB = require('./MongoDB.js').MongoDB;

server.use(morgan('short'));
server.use('/static', express.static(__dirname + './../client/static'));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser')
server.use(bodyParser.urlencoded())
server.use(bodyParser.json());

if (server.settings.env == 'development')
{
    console.log('using fake DB'); // TODO: switch to morgan
    db = new FakeDB();
}
else  if (server.settings.env == 'test' || server.settings.env == 'production')
{
    console.log('using ' + server.settings.env + ' MongoDB'); // TODO: switch to morgan
    db = new MongoDB(server.settings.env);
}
else
{
    console.log('unknown environment'); // TODO: switch to morgan
    return;
}

var appController = new AppController(db);

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
server.post('/', function(req, res){
  var userName = req.body.user;
  var html = 'Hello: ' + userName + '.<br>' +
             '<a href="/">Try again.</a>';
  res.send(html);
});

//root of the website
server.get('/', function(req, res) {
    res.redirect('/static/index.html');
});

server.post('/sessions/new/:master_id', function (req, res) {
    appController.createSession(req.params.master_id, function (err, session) {
        if (err)
            return res.send('error! ' + err);
        res.redirect('/static/session.html');
    });     
});

server.post('/sessions/edit/:session_id/user/:user_id', function (req, res) {
    appController.getSessionByID(req.params.session_id, function (err, session) {
        if (err)
            return res.send('error! ' + err);

        var sessionController = new SessionController(session, db);
        sessionController.joinSession(req.params.user_id, function (err, user) {
            if (err)
                return res.send('error! ' + err);

            res.send('user ' + user.name + ' added to session ' + req.params.session_id);
        });
    });
});

server.get('/session/:id/users/:info', function (req, res) {
    res.send('connected users ' + req.params.info);
});

db.connect(function() {
    server.listen(PORT);
})
