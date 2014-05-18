"use strict"

var assert = require('assert');
var Session = require('../server/Session.js').Session;
var SessionController = require('../server/SessionController.js').SessionController;

describe('SessionController', function() {

    it('joinSessionShouldThrowWhenTeamMemberNameIsEmpty', function() {
        assert.throws(function() {
            var session = new Session();
            var controller = new SessionController(session);
            controller.joinSession("");
            }, Error);
    });

})
