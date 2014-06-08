'use strict';

(function () {

var Session = require('./Session.js').Session;

function AppController(db) {
    this.db = db;
}

AppController.prototype.createSession = function(scrumMasterName) {
    if (scrumMasterName === '')
        throw new Error('scrum master\'s name cannot be empty!');

    var session = this.db.createSession(scrumMasterName);
    var scrumMaster = this.db.createUser(scrumMasterName, session.id);
    return session;
};

AppController.prototype.getSessionByID = function(id) {
    return this.db.getSessionByID(id);
}

exports.AppController = AppController;

}());