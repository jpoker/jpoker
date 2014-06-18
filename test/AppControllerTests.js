var assert = require('chai').assert;
var sinon = require('sinon');
var AppController = require('../server/AppController.js').AppController;

describe('AppController', function() {
/*
    beforeEach(function () {
        var db = {
        };
        db_mock = sinon.mock(db);
        controller = new AppController(db);
    });
*/
    it('createSession should throw when scrum master name is empty', function (done) {
        var controller = new AppController();
        assert.throws(function () {
            controller.createSession('');
            }, Error);
        done();
    });

    it('createSession should call db.createSession and db.createUser with given scrum master user', function (done) {
        var db = { createSession: function () { }, createUser: function () { } };
        var scrumMaster = 'Vasya Pupkin';

        var session = { id: 1 };
        var user = { name: scrumMaster };

        var mock = sinon.mock(db);
        mock.expects('createSession').withArgs(scrumMaster).callsArgWith(1, null, session);
        mock.expects('createUser').withArgs(scrumMaster).callsArgWith(2, null, user);

        var controller = new AppController(db);
        controller.createSession(scrumMaster, function () { });

        mock.verify();

        done();
    });

    it('createSession should return error when db.createSession failed', function () {
        var db = { createSession: function () { }, createUser: function () { } };
        var mock = sinon.mock(db);
        var dbError = 'failure';
        mock.expects('createSession').callsArgWith(1, dbError);
        mock.expects('createUser').never();

        var controller = new AppController(db);
        var callback = sinon.spy();
        controller.createSession('Vasya', callback);

        mock.verify();

        assert(callback.calledOnce);
        assert(callback.calledWith(dbError));
    });

    it('createSession should return error when db.createUser failed', function () {
        var db = { createSession: function () { }, createUser: function () { } };
        var mock = sinon.mock(db);
        var session = {id: 1};
        var userError = 'wrong user';
        mock.expects('createSession').callsArgWith(1, null, session);
        mock.expects('createUser').callsArgWith(2, userError);

        var controller = new AppController(db);
        var callback = sinon.spy();
        controller.createSession('Vasya', callback);

        mock.verify();

        assert(callback.calledOnce);
        assert(callback.calledWith(userError));
    });

    it('getSessionByID should call db.getSessionByID', function () {
        var db = { getSessionByID: function () { } };
        var mock = sinon.mock(db);
        var sessionID = 'session-id';

        mock.expects('getSessionByID').once().withArgs(sessionID);

        var controller = new AppController(db);
        controller.getSessionByID(sessionID);

        mock.verify();
    })

})