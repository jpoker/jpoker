var assert = require('chai').assert;
var sinon = require('sinon');
var AppController = require('../server/AppController.js').AppController;

describe('AppController', function() {
/*
    beforeEach(function (done) {
        var db = {
        };
        db_mock = sinon.mock(db);
        controller = new AppController(db);
        done();
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

    it('createSession should return err when db.createSession failed', function () {
        var db = { createSession: function () { }, createUser: function () { } };
        var mock = sinon.mock(db);
        var dbError = 'failure';
        mock.expects('createSession').callsArgWith(1, dbError, null);
        mock.expects('createUser').never();

        var controller = new AppController(db);
        var callback = sinon.spy();
        controller.createSession('Vasya', callback);

        mock.verify();

        assert(callback.calledWith(dbError));
    });
/*
    it('getUserList should return scrum master ID in user list when session just created', function (done) {
        controller.createSession('master', function (err, session) {
            db.getUserIDsBySessionID(session.id, function (err, userList) {
                assert.lengthOf(userList, 1);
                done();
            });
        });
    })

    it('should return session by ID when created', function (done) {
        controller.createSession('Master', function (err, created) {
            controller.getSessionByID(created.id, function (err, queried) {
                assert.equal(created.id, queried.id);
                done();
            });
        });
    })
*/

})