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
    this.users[id] = {}

    return session;
}

FakeDB.prototype.getSessionByID = function(id) {
    return this.sessions[id];
}

FakeDB.prototype.createUser = function(name, session_id) {
    if (!(session_id in this.users))
        return null;

    var user = new TeamMember(name);
    var id = this.counter++;
    user.id = id;

    this.users[session_id][id] = user;

    return user;
}

FakeDB.prototype.getUserByID = function(user_id, session_id) {
    if (!(session_id in this.users))
        return null;

    return this.users[session_id][user_id];
}

exports.FakeDB = FakeDB;

}());