var assert = require('chai').assert;
var AppController = require('../server/AppController.js').AppController;
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('AppController', function() {

    beforeEach(function() {
        db = new FakeDB();
        controller = new AppController(db);
    });

    it('createSession should throw when scrum master name is empty', function() {
        assert.throws(function() {
            controller.createSession('');
            }, Error);
    });

    it('createSession should return session with given scrum master name', function() {
        session = controller.createSession('Vasya Pupkin');
        assert.equal('Vasya Pupkin', session.scrumMasterName);
    });

    it('getUserList should return scrum master ID in user list when session just created', function() {
        var session = controller.createSession();

        var user_list = db.getUserIDsBySessionID(session.id);

        assert.lengthOf(user_list, 1);
    })


})