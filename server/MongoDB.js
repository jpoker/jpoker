'use strict';

(function() {

var mongoose = require('mongoose');
var Session = require('./Session.js').Session;
var TeamMember = require('./TeamMember.js').TeamMember;

function on_error() {
    throw new Error("Mongoose error!");
}

function MongoDB(db_name) {
    this.ready = false;
    this.db_name = db_name;
    this.connection = null;
}

MongoDB.prototype.connect = function (callback) {
    this.connection = mongoose.createConnection('mongodb://localhost/' + this.db_name);
    this.connection.on('error', on_error);
    var self = this;
    this.connection.once('open', function () {
        var sessionSchema = new mongoose.Schema({ scrumMasterName: String });
        self.Session = mongoose.model('Session', sessionSchema);

        self.ready = true;
        callback();
    });
}

MongoDB.prototype.disconnect = function (callback) {
    this.connection.close(callback);
    this.ready = false;
}

MongoDB.prototype.connected = function () {
    return this.ready === true;
}

MongoDB.prototype.createSession = function (scrumMasterName) {
    if (!this.connected())
        throw new Error("db not ready");

    var session = new this.Session({scrumMasterName: scrumMasterName});
    session.save(function (err, record) {
        if (err !== null)
            console.log('error saving an entry: ' + err);
        else
            console.log('saved with id ' + record._id);
    });
    return session;
}

exports.MongoDB = MongoDB;

}());