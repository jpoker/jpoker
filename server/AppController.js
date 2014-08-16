'use strict';

(function () {

var async = require('async');

function AppController(db) {
    this.db = db;
}

AppController.prototype.createSession = function(scrumMasterName, callback) {
    if (scrumMasterName === '')
        return callback(new Error('scrum master\'s name cannot be empty!'));

    var self = this;
    var _session;
    async.waterfall(
        [function (callback) {
            self.db.createSession(scrumMasterName, callback);
        },
        function (session, callback) {
            _session = session;
            self.db.createUser(scrumMasterName, session.id, callback);
        },
        function (user, callback) {
            callback(null, _session, user);
        }],
        callback);
};
                                    
AppController.prototype.getSessionByID = function(sessionID, callback) {
    return this.db.getSessionByID(sessionID, callback);
};

exports.AppController = AppController;

}());