var assert = require('chai').assert;
var sinon = require('sinon');
var SessionController = require('../server/SessionController.js').SessionController;

describe('SessionController', function() {

    beforeEach(function () {
        var db = {
            createUser: function () { },
            getUserIDsBySessionID: function () { }
        };
        session = { id: 'session-id' };

        db_mock = sinon.mock(db);

        controller = new SessionController(session, db);
    });

    it('joinSession should throw when team member name is empty', function () {
        assert.throws(function() {
            controller.joinSession('');
        }, Error);
    });

    it('joinSession should call db.createUser with given name', function () {
        var userName = 'Petya Pupkin';
        db_mock.expects('createUser').once().withArgs(userName);

        controller.joinSession(userName);

        db_mock.verify();
    });

    it('getUser should call db.getUserIDsBySessionID with the session id', function() {
        db_mock.expects('getUserIDsBySessionID').once().withArgs(session.id);

        controller.getUsers();

        db_mock.verify();
    });

})
