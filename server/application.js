'use strict';

var express = require( 'express' );
var morgan = require( 'morgan' );
var fs = require( 'fs' );

var server = module.exports = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);

var PORT = 9372;

var AppController = require( './AppController.js' ).AppController;
var SessionController = require( './SessionController.js' ).SessionController;
var FakeDB = require( './FakeDB.js' ).FakeDB;
var MongoDB = require( './MongoDB.js' ).MongoDB;

server.use( morgan( 'short' ) );
server.use( '/static', express.static( __dirname + './../client/static' ) );

// parse urlencoded request bodies into req.body
var bodyParser = require( 'body-parser' );
server.use( bodyParser.urlencoded() );
server.use( bodyParser.json() );

var db;
if ( server.settings.env === 'development' ) {
    console.log( 'using fake DB' ); // TODO: switch to morgan
    db = new FakeDB();
}
else if ( server.settings.env === 'test' || server.settings.env === 'production' ) {
    console.log( 'using ' + server.settings.env + ' MongoDB' ); // TODO: switch to morgan
    db = new MongoDB( server.settings.env );
}
else {
    console.log( 'unknown environment' ); // TODO: switch to morgan
    return;
}

var appController = new AppController( db );

function notifyUserJoined(user) {
    io.emit('userJoined', user);
}

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
server.post( '/', function ( req, res ) {
    var userName = req.body.user;
    var html = 'Hello: ' + userName + '.<br>' +
        '<a href="/">Try again.</a>';
    res.send( html );
});

//root of the website
server.get( '/', function ( req, res ) {
    res.redirect( '/create' );
});

function render( template, vars, callback ) { // poor's man template :)
    fs.readFile( template, { encoding: 'utf-8' }, function ( err, content ) {
        if ( err )
            return callback( err );

        for ( var key in vars )
            content = content.replace( key, vars[key] );

        callback( null, content );
    });
}

server.get( '/create', function ( req, res ) {
    render( './client/static/create.html', {}, function ( err, content ) {
        res.send( content );
    });
});

server.get( '/join', function ( req, res ) {
    render( './client/static/join.html', { '%SESSION_ID%': req.query.session }, function ( err, content ) {
        res.send( content );
    });
});

server.post( '/sessions/new/:master_id', function ( req, res ) {
    /* jshint -W106 */  // disabled jshint warning about using non-camelcase names
    appController.createSession( req.params.master_id, function ( err, _session ) {
        /* jshint +W106 */
        if ( err ) {
            return res.json( 500, { error: err });
        }

        res.json( 200, { joinURL: '/join?session=' + _session.id, session: _session });
    });
});

server.post( '/sessions/edit/:session_id/user/:user_id', function ( req, res ) {
    /* jshint -W106 */  // disabled jshint warning about using non-camelcase names
    appController.getSessionByID( req.params.session_id, function ( err, session ) {
        if ( err )
            return res.send( 'error! ' + err );

        var sessionController = new SessionController( session, db );
        sessionController.joinSession( req.params.user_id, function ( err, user ) {
            if ( err )
                return res.send( 'error! ' + err );

            notifyUserJoined(user);
            res.json( 200, { userData: user, session: req.params.session_id });
        });
    });
    /* jshint +W106 */
});

server.post( '/session/:id/users/:requestor_id', function ( req, res ) {
    /* jshint -W106 */  // disabled jshint warning about using non-camelcase names
    appController.getSessionByID( req.params.id, function ( err, session ) {
        /* jshint +W106 */
        if ( err )
            return res.send( 'error! ' + err );

        var sessionController = new SessionController( session, db );
        sessionController.getUsers( function ( err, userList ) {
            if ( err )
                return res.send( 'error! ' + err );

            res.json( 200, { joinedUsers: userList });
        });
    });
});

db.connect( function () {
    console.log('listening on port ' + PORT);
    http.listen( PORT );
});
