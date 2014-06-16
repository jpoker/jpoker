var assert = require('chai').assert;
var AppController = require('../server/AppController.js').AppController;
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('AppController', function() {

    beforeEach(function (done) {
        db = new FakeDB();
        controller = new AppController(db);
        done();
    });

    it('createSession should throw when scrum master name is empty', function (done) {
        assert.throws(function() {
            controller.createSession('');
            }, Error);
        done();
    });

    it('createSession should return session with given scrum master name', function (done) {
        controller.createSession('Vasya Pupkin', function (err, session) {
            assert.equal('Vasya Pupkin', session.scrumMasterName);
            done();
        });
    });

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


})