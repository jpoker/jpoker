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
    this.connection = mongoose.createConnection('mongodb://localhost/' + db_name);
    this.connection.on('error', on_error);
    this.connection.once('open', function () {
        console.log('connection open!'); //!
        this.ready = true;
    });
}

MongoDB.prototype.createSession = function (scrumMasterName) {
    var sessionSchema = new mongoose.Schema({ scrumMasterName: String });
    var Session = mongoose.model('Session', sessionSchema);
    var session = new Session({scrumMasterName: scrumMasterName});
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