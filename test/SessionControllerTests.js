var assert = require('chai').assert;
var sinon = require('sinon');
var SessionController = require('../server/SessionController.js').SessionController;

describe('SessionController', function() {
/*
    var session = null;

    beforeEach(function () {
        var db = new FakeDB();
        var appController = new AppController(db);
        appController.createSession('Master', function (err, session) {
            session = session;
            controller = new SessionController(session, db);
        });
    });
*/
    beforeEach(function () {
        var db = { createUser: function() {} };
        var session = {};

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
/*
    it('should return list of joined users and scrum master', function() {
        controller.joinSession('Jon', function () {
            controller.joinSession('Max', function () {
                controller.getUsers(function (err, userList) {
                    var names = [];
                    for (var i in userList) {
                        var user = userList[i];
                        names.push(user.name);
                    }
                    assert.sameMembers(['Jon', 'Max', 'Master'], names);
                });
            });
        });
    });
*/
})
