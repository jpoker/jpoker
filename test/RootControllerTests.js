var assert = require('assert');
var RootController = require('../server/RootController.js').RootController;

describe('RootController', function() {

    it('createSession should throw when scrum master name is empty', function() {
        assert.throws(function() {
            var controller = new RootController();
            controller.createSession("");
            }, Error);
    });

    it('createSession should return session with given scrum master name', function() {
        var controller = new RootController();
        session = controller.createSession('Vasya Pupkin');
        assert.equal('Vasya Pupkin', session.scrumMasterName);
    });

})