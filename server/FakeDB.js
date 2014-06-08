'use strict';

(function() {

var Session = require('./Session.js').Session;
var TeamMember = require('./TeamMember.js').TeamMember;

function FakeDB() {
    this.sessions = {};
    this.users = {};
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

FakeDB.prototype.createUser = function(name) {
    var user = new TeamMember(name);
    var id = this.counter++;
    user.id = id;

    this.users[id] = user;

    return user;
}

FakeDB.prototype.getUserByID = function(id) {
    return this.users[id];
}

exports.FakeDB = FakeDB;

}());