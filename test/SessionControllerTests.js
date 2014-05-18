var assert = require('assert');
var Session = require('../server/Session.js').Session;
var SessionController = require('../server/SessionController.js').SessionController;

describe('SessionController', function() {

    it('joinSession should throw when team member name is empty', function() {
        assert.throws(function() {
            var session = new Session();
            var controller = new SessionController(session);
            controller.joinSession("");
            }, Error);
    });

    it('joinSession should return team member with given name', function() {
        var session = new Session();
        var controller = new SessionController(session);
        var teamMember = controller.joinSession('Petya Pupkin');
        assert.equal('Petya Pupkin', teamMember.name);
    });

})
