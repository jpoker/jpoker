'use strict';

(function () {

var Session = require('./Session.js').Session;

function AppController(db) {
    this.db = db;
}

AppController.prototype.createSession = function(scrumMasterName, callback) {
    if (scrumMasterName === '')
        throw new Error('scrum master\'s name cannot be empty!');

    var self = this;
    this.db.createSession(scrumMasterName, function (err, session) {
        if (err)
            return callback(err);
        self.db.createUser(scrumMasterName, session.id, function (err, user) {
            if (err)
                callback(err);
            callback(null, session);
        });
    });
};

AppController.prototype.getSessionByID = function(sessionID, callback) {
    return this.db.getSessionByID(sessionID, callback);
}

exports.AppController = AppController;

}());