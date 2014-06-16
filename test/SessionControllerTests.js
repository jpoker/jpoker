var assert = require('chai').assert;
var AppController = require('../server/AppController.js').AppController;
var Session = require('../server/Session.js').Session;
var SessionController = require('../server/SessionController.js').SessionController;
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('SessionController', function() {

    var session = null;

    beforeEach(function (done) {
        var db = new FakeDB();
        var appController = new AppController(db);
        appController.createSession('Master', function (err, session) {
            session = session;
            controller = new SessionController(session, db);
            done();
        });
    });

    it('joinSession should throw when team member name is empty', function (done) {
        assert.throws(function() {
            controller.joinSession("");
        }, Error);

        done();
    });

    it('joinSession should return team member with given name', function (done) {
        controller.joinSession('Petya Pupkin', function (err, user) {
            assert.equal('Petya Pupkin', user.name);
            done();
        });
    });

    it('should return list of joined users and scrum master', function(done) {
        controller.joinSession('Jon', function () {
            controller.joinSession('Max', function () {
                controller.getUsers(function (err, userList) {
                    var names = [];
                    for (var i in userList) {
                        var user = userList[i];
                        names.push(user.name);
                    }
                    assert.sameMembers(['Jon', 'Max', 'Master'], names);
                    done();
                });
            });
        });
    });
})
