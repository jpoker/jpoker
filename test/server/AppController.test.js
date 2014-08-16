var assert = require('chai').assert;
var sinon = require('sinon');
var AppController = require('../../server/AppController.js').AppController;

describe('AppController', function() {

    var dbMock;
    var controller;

    beforeEach(function () {
        var db = {
            createSession: function () { },
            createUser: function () { },
            getSessionByID: function () { }
        };
        dbMock = sinon.mock(db);
        controller = new AppController(db);
    });

    it('createSession should return error when scrum master name is empty', function () {
        var callback = sinon.spy();
        controller.createSession('', function (err) {
            assert.ok(err);
        });
    });

    it('createSession should return session and scrum master in callback', function () {
        var scrumMaster = 'Vasya Pupkin';
        var session = { id: 1 };
        var user = { name: scrumMaster };
        dbMock.expects('createSession').withArgs(scrumMaster).callsArgWith(1, null, session);
        dbMock.expects('createUser').withArgs(scrumMaster).callsArgWith(2, null, user);

        controller.createSession(scrumMaster, function (err, _session, _user) {
            assert.isNull(err);
            assert.deepEqual(session, _session);
            assert.deepEqual(user, _user);
            dbMock.verify();
        });
    });

    it('createSession should return error when db.createSession failed', function () {
        var dbError = 'failure';
        dbMock.expects('createSession').callsArgWith(1, dbError);
        dbMock.expects('createUser').never();
        var callback = sinon.spy();

        controller.createSession('Vasya', function (err) {
            assert.deepEqual(err, dbError);
            dbMock.verify();
        });
    });

    it('createSession should return error when db.createUser failed', function () {
        var session = {id: 1};
        var userError = 'wrong user';
        dbMock.expects('createSession').callsArgWith(1, null, session);
        dbMock.expects('createUser').callsArgWith(2, userError);
        var callback = sinon.spy();

        controller.createSession('Vasya', function (err) {
            assert.deepEqual(err, userError);
            dbMock.verify();
        });
    });

    it('getSessionByID should call db.getSessionByID', function () {
        var sessionID = 'session-id';
        dbMock.expects('getSessionByID').once().withArgs(sessionID);

        controller.getSessionByID(sessionID, function () {
            dbMock.verify();
        });
    });

});