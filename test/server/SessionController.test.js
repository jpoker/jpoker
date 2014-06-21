var assert = require('chai').assert;
var sinon = require('sinon');
var SessionController = require('../../server/SessionController.js').SessionController;

describe('SessionController', function() {

    beforeEach(function () {
        var db = {
            createUser: function () { },
            getUserIDsBySessionID: function () { },
			getUserByID: function () {}
        };
        session = { id: 'session-id', deck: [] };

        dbMock = sinon.mock(db);

        controller = new SessionController(session, db);
    });
	
	describe('joinSession', function () {

		it('should throw when team member name is empty', function () {
			assert.throws(function() {
				controller.joinSession('');
			}, Error);
		});

		it('should call db.createUser with given name', function () {
			var userName = 'Petya Pupkin';
			dbMock.expects('createUser').once().withArgs(userName);

			controller.joinSession(userName);

			dbMock.verify();
		});

	});
		
	describe('getUser', function () {
	
		it('should call db.getUserIDsBySessionID with the session id', function() {
			dbMock.expects('getUserIDsBySessionID').once().withArgs(session.id);

			controller.getUsers();

			dbMock.verify();
		});

	});
		
	describe('canEstimate', function () {
	
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

	});
		
	describe('setDeck', function () {
	
		it('should throw when assigning empty deck', function (done) {
			assert.throws(function () {
				var deck = [];
				controller.setDeck(deck);
			}, Error, 'cannot assign empty deck');

			done();
		});

		it('should assign given deck when it is not empty', function (done) {
			var deck = ['one', 'two'];
			controller.setDeck(deck);
			assert.deepEqual(deck, session.deck);

			done();
		});

	});

	describe('getExposition', function () {
	
		it('should be null when not all users providedEstimate', function (done) {
			// TODO: stub would be better
			dbMock.expects('getUserIDsBySessionID').returns(['Jon', 'Max']);
			dbMock.expects('getUserByID').withArgs('Jon').returns({name: 'Jon', exposedCard: '12'});
			dbMock.expects('getUserByID').withArgs('Max').returns({name: 'Max', exposedCard: null});
			
			var exposition = controller.getExposition();

			assert.isNull(exposition);
		
			done();
		});
	
	});
	
})
