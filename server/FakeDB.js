'use strict';

(function() {

var Session = require('./Session.js').Session;

function FakeDB() {
    this.sessions = {};
    this.counter = 0;
}

FakeDB.prototype.createSession = function(scrumMasterName) {
    var session = new Session(scrumMasterName);
    var id = this.counter++;
    session.id = id;

    this.sessions[id] = session;

    return session;
}

FakeDB.prototype.getSessionByID = function(id) {
    return this.sessions[id];
}

FakeDB.prototype.createUser = function() {
    return {id: this.counter++};
}

exports.FakeDB = FakeDB;

}());