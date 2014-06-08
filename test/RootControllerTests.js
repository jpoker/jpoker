var assert = require('assert');
var RootController = require('../server/RootController.js').RootController;
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('RootController', function() {

    it('createSession should throw when scrum master name is empty', function() {
        assert.throws(function() {
            var db = new FakeDB();
            var controller = new RootController(db);
            controller.createSession('');
            }, Error);
    });

    it('createSession should return session with given scrum master name', function() {
        var db = new FakeDB();
        var controller = new RootController(db);
        session = controller.createSession('Vasya Pupkin');
        assert.equal('Vasya Pupkin', session.scrumMasterName);
    });

})