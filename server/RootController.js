'use strict';

(function () {

var Session = require('./Session.js').Session;

function RootController(db) {
    this.db = db;
}

RootController.prototype.createSession = function(scrumMasterName) {
        if (scrumMasterName === '')
            throw new Error('not implemented!');

        return this.db.createSession(scrumMasterName);
};

exports.RootController = RootController;

}());