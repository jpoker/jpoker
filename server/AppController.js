'use strict';

(function () {

var Session = require('./Session.js').Session;

function AppController(db) {
    this.db = db;
}

AppController.prototype.createSession = function(scrumMasterName) {
        if (scrumMasterName === '')
            throw new Error('not implemented!');

        return this.db.createSession(scrumMasterName);
};

exports.AppController = AppController;

}());