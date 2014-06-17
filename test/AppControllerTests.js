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

    it('createSession should call db createSession with given scrum master name', function (done) {
        var db = { createSession: function () {} };
        var mock = sinon.mock(db);
        mock.expects('createSession').withArgs('Vasya Pupkin');

        var controller = new AppController(db);
        controller.createSession('Vasya Pupkin');

        mock.verify();

        done();
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