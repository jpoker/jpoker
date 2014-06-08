'use strict';

(function() {

var Session = require('./Session.js').Session;

function FakeDB() {
    this.sessions = {};
    this.counter = 0;
}

FakeDB.prototype.createSession = function() {
    var session = new Session('');
    var id = this.counter++;
    session.id = id;

    this.sessions[id] = session;

    return session;
}

FakeDB.prototype.getSessionByID = function(id) {
    return this.sessions[id];
}

exports.FakeDB = FakeDB;

}());