var assert = require('chai').assert;
var sinon = require('sinon');
var SessionController = require('../../server/SessionController.js').SessionController;

describe('SessionController', function() {

    beforeEach(function () {
        var db = {
            createUser: function () { },
            getUserIDsBySessionID: function () { }
        };
        session = { id: 'session-id', deck: [] };

        dbMock = sinon.mock(db);

        controller = new SessionController(session, db);
    });

    it('joinSession should throw when team member name is empty', function () {
        assert.throws(function() {
            controller.joinSession('');
        }, Error);
    });

    it('joinSession should call db.createUser with given name', function () {
        var userName = 'Petya Pupkin';
        dbMock.expects('createUser').once().withArgs(userName);

        controller.joinSession(userName);

        dbMock.verify();
    });

    it('getUser should call db.getUserIDsBySessionID with the session id', function() {
        dbMock.expects('getUserIDsBySessionID').once().withArgs(session.id);

        controller.getUsers();

        dbMock.verify();
    });

    it('should throw when no deck', function (done) {
        assert.throws(function () {
            controller.canEstimate();
            }, Error, 'deck isn\'t available');

        done();
    });

    it('should not throw when there is a deck', function (done) {
        session.deck = ['a card'];
        assert.doesNotThrow(function () {
            controller.canEstimate();
            }, Error);

        done();
    });

    it('should throw when assigning empty deck', function (done) {
        assert.throws(function () {
            var deck = [];
            controller.setDeck(deck);
        }, Error, 'cannot assign empty deck');

        done();
    });

})
