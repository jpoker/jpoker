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
    return id in this.sessions ? this.sessions[id] : null;
}

FakeDB.prototype.createUser = function(name, session_id) {
    if (!(session_id in this.users))
        return null;

    var user = new TeamMember(name);
    var id = this.counter++;
    user.id = id.toString();

    this.users[session_id][id] = user;

    return user;
}

FakeDB.prototype.getUserByID = function(user_id, session_id) {
    if (!(session_id in this.users))
        return null;

    var users_in_session = this.users[session_id];
    return user_id in users_in_session ? users_in_session[user_id] : null;
}

FakeDB.prototype.getUserIDsBySessionID = function(session_id) {
    var user_ids = [];

    for (var user_id in this.users[session_id])
        user_ids.push(user_id);

    return user_ids;
}

exports.FakeDB = FakeDB;

}());