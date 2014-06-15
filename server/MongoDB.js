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
        self.ready = true;
        callback();
    });
}

MongoDB.prototype.disconnect = function (callback) {
    mongoose.disconnect(function () {
        this.connection = null;
        this.ready = false;
        callback();
    });
}

MongoDB.prototype.connected = function () {
    return this.ready === true;
}

MongoDB.prototype.createSession = function (scrumMasterName, callback) {
    if (!this.connected())
        throw new Error("db not ready");

    var sessionSchema = new mongoose.Schema({scrumMasterName: String});
    var Session = mongoose.model('Session', sessionSchema);

    var session = Session.create({scrumMasterName: scrumMasterName},
    function (err, record) {
        callback(err, record);
    });
}

exports.MongoDB = MongoDB;

}());