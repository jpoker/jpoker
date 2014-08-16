var assert = require('chai').assert;
var sinon = require('sinon');
var SessionController = require('../../server/SessionController.js').SessionController;

describe('SessionController', function() {

    var session;
    var dbMock;
    var controller;

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
            var callback = sinon.spy();

            controller.joinSession('', callback);

			assert(callback.calledWithMatch(new Error()));
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
	
		it('should be null when not all users provided estimate', function (done) {
			// TODO: stub would be better
			dbMock.expects('getUserIDsBySessionID').callsArgWith(1, null, ['Jon', 'Max']);
			dbMock.expects('getUserByID').withArgs('Jon').callsArgWith(2, null, {name: 'Jon', exposedCard: '12'});
			dbMock.expects('getUserByID').withArgs('Max').callsArgWith(2, null, {name: 'Max', exposedCard: null});
			
			var callback = sinon.spy();
			controller.getExposition(callback);

			assert(callback.calledOnce);
			assert(callback.calledWith(null, null));
		
			done();
		});
		
		it('should be dictionary when all users provide estimate', function (done) {
			// TODO: stub would be better
			dbMock.expects('getUserIDsBySessionID').callsArgWith(1, null, ['Jon', 'Max']);
			dbMock.expects('getUserByID').withArgs('Jon').callsArgWith(2, null, {name: 'Jon', exposedCard: '1'});
			dbMock.expects('getUserByID').withArgs('Max').callsArgWith(2, null, {name: 'Max', exposedCard: '2'});
			
			var callback = sinon.spy();
			controller.getExposition(callback);

			//console.log(callback);
			assert(callback.calledOnce);
			assert(callback.calledWithMatch(null, {'Jon': '1', 'Max': '2'}));
		
			done();
		});
		
		it('should return error when db returned error', function (done) {    // TODO: remove (done)
			var dbError = 'not found';
			dbMock.expects('getUserIDsBySessionID').callsArgWith(1, dbError);
			
			var callback = sinon.spy();
			controller.getExposition(callback);
			
			assert(callback.calledOnce);
			assert(callback.calledWith(dbError));
			
			done();
		});
	
	});

    describe('getUsers', function () {

        it('should call db getUserByID for every user in session', function () {
            dbMock.expects('getUserIDsBySessionID').callsArgWith(1, null, ['Jon', 'Max']);
            dbMock.expects('getUserByID').withArgs('Jon');
            dbMock.expects('getUserByID').withArgs('Max');

            controller.getUsers();

            dbMock.verify();
        });

    });
	
});
