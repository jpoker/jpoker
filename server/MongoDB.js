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
    mongoose.connect('mongodb://localhost/' + this.db_name);
    this.connection = mongoose.connection;
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
    if (!this.connected())
        throw new Error("db not ready");

    var session = new this.Session({scrumMasterName: scrumMasterName});
    session.save(function (err, record) {
        callback(err, record);
    });
}

exports.MongoDB = MongoDB;

}());