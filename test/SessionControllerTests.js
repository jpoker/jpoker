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

        dbMock = sinon.mock(db);

        controller = new SessionController(session, db);
    });

    it('joinSession should throw when team member name is empty', function () {
        assert.throws(function() {
            controller.joinSession('');
        }, Error);
    });

    it('joinSession should call db.createUser with given name', function () {
        var userName = 'Petya Pupkin';
        dbMock.expects('createUser').once().withArgs(userName);

        controller.joinSession(userName);

        dbMock.verify();
    });

    it('getUser should call db.getUserIDsBySessionID with the session id', function() {
        dbMock.expects('getUserIDsBySessionID').once().withArgs(session.id);

        controller.getUsers();

        dbMock.verify();
    });

})
