"use strict";

var Session = require('./Session.js').Session;

function RootController() {
}

RootController.prototype.createSession = function(scrumMasterName) {
        if (scrumMasterName == "")
            throw new Error("not implemented!");

        return new Session(scrumMasterName);
};

exports.RootController = RootController;