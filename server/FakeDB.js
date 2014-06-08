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
    return session;
}

exports.FakeDB = FakeDB;

}());