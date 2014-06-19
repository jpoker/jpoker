var chai = require('chai'), assert = chai.assert, expect = chai.expect;
var AppController = require('../server/AppController.js').AppController;
var SessionController = require('../server/SessionController.js').SessionController;
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('session', function() {

    var session = null;

    beforeEach(function (done) {
        var db = new FakeDB();
        var appController = new AppController(db);
        appController.createSession('Master', function (err, session) {
            session = session;
            sessionController = new SessionController(session, db);
            done();
        });
    });

    function names(userList) {
        var names = [];
        for (var i in userList) {
            var user = userList[i];
            names.push(user.name);
        }
        return names;
    }

    describe('create', function () {

        it('should find scrum master alone given session just been created', function (done) {
            sessionController.getUsers(function (err, userList) {
                expect(names(userList)).to.deep.equal(['Master']);
                done();
            });
        });

    });

    it.skip('should find joined users and scrum master in session', function (done) {
        sessionController.joinSession('Jon', function () {
            sessionController.joinSession('Max', function () {
                sessionController.getUsers(function (err, userList) {
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
