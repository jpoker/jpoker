'use strict';

(function() {

function FakeDB() {
    this.sessions = {};
    this.users = {};
    this.counter = 1;
}

FakeDB.prototype.createSession = function(scrumMasterName, callback) {
    var session = { scrumMasterName: scrumMasterName, deck: [] };
    var id = this.counter++;
    session.id = id;

    this.sessions[id] = session;
    this.users[id] = {};

    callback(null, session);
};

FakeDB.prototype.getSessionByID = function(id, callback) {
    if (id in this.sessions)
        callback(null, this.sessions[id]);
    else
        callback(new Error('not found'), null);
};

FakeDB.prototype.createUser = function(name, sessionID, callback) {
    if (!(sessionID in this.users))
        return callback(new Error('wrong session id'), null);

    var user = { name: name, exposedCard: null };
    var id = (this.counter++).toString();
    user.id = id;

    this.users[sessionID][id] = user;
    callback(null, user);
};

FakeDB.prototype.getUserByID = function(userID, sessionID, callback) {
    if (!(sessionID in this.users))
        return callback(new Error('wrong session id'), null);

    var usersInSession = this.users[sessionID];
    if (userID in usersInSession)
        callback(null, usersInSession[userID]);
    else
        callback(new Error('not found'), null);
};

FakeDB.prototype.getUserIDsBySessionID = function (sessionID, callback) {
    if (!(sessionID in this.sessions))
        return callback(new Error('not found'), null);

    var userIDs = [];

    for (var userID in this.users[sessionID])
        userIDs.push(userID);

    callback(null, userIDs);
};

FakeDB.prototype.connect = function (callback) {
    callback();
};

exports.FakeDB = FakeDB;

}());