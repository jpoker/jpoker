var assert = require('chai').assert;
var AppController = require('../server/AppController.js').AppController;
var Session = require('../server/Session.js').Session;
var SessionController = require('../server/SessionController.js').SessionController;
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('SessionController', function() {

    beforeEach(function() {
        var db = new FakeDB();
        var appController = new AppController(db);
        var session = appController.createSession('Master');
        controller = new SessionController(session, db);
    });

    it('joinSession should throw when team member name is empty', function() {
        assert.throws(function() {
            controller.joinSession("");
            }, Error);
    });

    it('joinSession should return team member with given name', function() {
        var teamMember = controller.joinSession('Petya Pupkin');
        assert.equal('Petya Pupkin', teamMember.name);
    });

    it('should return list of joined users and scrum master', function() {
        controller.joinSession('Jon');
        controller.joinSession('Max');

        var user_list = controller.getUsers(session);
        var names = [];
        for (var i = 0; i < user_list.length; ++i) {
            var user = user_list[i];
            names.push(user.name);
        }

        assert.sameMembers(['Jon', 'Max', 'Master'], names);
    });

})
