'use strict';

(function () {

var Session = require('./Session.js').Session;

function AppController(db) {
    this.db = db;
}

AppController.prototype.createSession = function(scrumMasterName) {
        if (scrumMasterName === '')
            throw new Error('scrum master\'s name cannot be empty!');

        return this.db.createSession(scrumMasterName);
};

exports.AppController = AppController;

}());