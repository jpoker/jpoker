'use strict';

(function() {

var mongoose = require('mongoose');
var Session = require('./Session.js').Session;
var TeamMember = require('./TeamMember.js').TeamMember;

function MongoDB(dbName) {
    this.ready = false;
    this.dbName = dbName;
    this.connection = null;
}

MongoDB.prototype.connect = function (callback) {
    mongoose.connect('mongodb://localhost/' + this.dbName);
    this.connection = mongoose.connection;
    this.connection.on('error', function () {
        throw new Error("Mongoose error!");
    });
    var self = this;
    this.connection.once('open', function () {
        var sessionSchema = new mongoose.Schema({ scrumMasterName: String });
        self.Session = mongoose.model('Session', sessionSchema);
        var userSchema = new mongoose.Schema({name: String, sessionID: String});
        self.User = mongoose.model('User', userSchema);

        self.ready = true;
        callback();
    });
}

MongoDB.prototype.disconnect = function (callback) {
    var self = this;
    mongoose.disconnect(function (err) {
        self.connection = null;
        self.ready = false;
        callback();
    });
}

MongoDB.prototype.connected = function () {
    return this.ready === true;
}

MongoDB.prototype.createSession = function (scrumMasterName, callback) {
    var session = new this.Session({scrumMasterName: scrumMasterName});
    session.save(callback);
}

MongoDB.prototype.getSessionByID = function (sessionID, callback) {
    this.Session.findById(sessionID, callback);
}

MongoDB.prototype.createUser = function (userName, sessionID, callback) {
    var user = new this.User({ name: userName, sessionID: sessionID });
    user.save(callback);
}

MongoDB.prototype.getUserByID = function (userID, sessionID, callback) {
    this.User.find({ _id: userID, sessionID: sessionID }, function (err, users) {
        if (err)
            callback(err);
        else if (users.length == 0)
            callback('not found');
        else if (users.length == 1)
            callback(null, users[0]);
        else
            callback('duplicated IDs');
    });
}

exports.MongoDB = MongoDB;

}());