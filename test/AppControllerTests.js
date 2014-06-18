var assert = require('chai').assert;
var sinon = require('sinon');
var AppController = require('../server/AppController.js').AppController;

describe('AppController', function() {

    beforeEach(function () {
        var db = {
            createSession: function () { },
            createUser: function () { },
            getSessionByID: function () { }
        };
        db_mock = sinon.mock(db);
        controller = new AppController(db);
    });

    it('createSession should throw when scrum master name is empty', function () {
        var controller = new AppController();
        assert.throws(function () {
            controller.createSession('');
            }, Error);
    });

    it('createSession should call db.createSession and db.createUser with given scrum master user', function () {
        var scrumMaster = 'Vasya Pupkin';
        var session = { id: 1 };
        var user = { name: scrumMaster };
        db_mock.expects('createSession').withArgs(scrumMaster).callsArgWith(1, null, session);
        db_mock.expects('createUser').withArgs(scrumMaster).callsArgWith(2, null, user);

        controller.createSession(scrumMaster, function () { });

        db_mock.verify();
    });

    it('createSession should return error when db.createSession failed', function () {
        var dbError = 'failure';
        db_mock.expects('createSession').callsArgWith(1, dbError);
        db_mock.expects('createUser').never();
        var callback = sinon.spy();

        controller.createSession('Vasya', callback);

        db_mock.verify();
        assert(callback.calledOnce);
        assert(callback.calledWith(dbError));
    });

    it('createSession should return error when db.createUser failed', function () {
        var session = {id: 1};
        var userError = 'wrong user';
        db_mock.expects('createSession').callsArgWith(1, null, session);
        db_mock.expects('createUser').callsArgWith(2, userError);
        var callback = sinon.spy();

        controller.createSession('Vasya', callback);

        db_mock.verify();
        assert(callback.calledOnce);
        assert(callback.calledWith(userError));
    });

    it('getSessionByID should call db.getSessionByID', function () {
        var sessionID = 'session-id';
        db_mock.expects('getSessionByID').once().withArgs(sessionID);

        controller.getSessionByID(sessionID);

        db_mock.verify();
    })

})