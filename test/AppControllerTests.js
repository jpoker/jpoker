var assert = require('assert');
var AppController = require('../server/AppController.js').AppController;
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('AppController', function() {

    it('createSession should throw when scrum master name is empty', function() {
        assert.throws(function() {
            var db = new FakeDB();
            var controller = new AppController(db);
            controller.createSession('');
            }, Error);
    });

    it('createSession should return session with given scrum master name', function() {
        var db = new FakeDB();
        var controller = new AppController(db);
        session = controller.createSession('Vasya Pupkin');
        assert.equal('Vasya Pupkin', session.scrumMasterName);
    });

})