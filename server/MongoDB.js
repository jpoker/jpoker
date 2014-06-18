'use strict';

(function() {

var mongoose = require('mongoose');

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
    var self = this;
    this.getSessionByID(sessionID, function (err) {
        if (err)
            return callback(err);

        var user = new self.User({ name: userName, sessionID: sessionID });
        user.save(callback);
    });
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

MongoDB.prototype.getUserIDsBySessionID = function (sessionID, callback) {
    var self = this;
    this.getSessionByID(sessionID, function (err, session) {
        if (err)
            return callback(err);

        self.User.find({ sessionID: sessionID }, function (err, users) {
            if (err)
                return callback(err);

            var userIDs = [];
            for (var i in users)
                userIDs.push(users[i].id);
            callback(null, userIDs);
        });
    });
}

exports.MongoDB = MongoDB;

}());