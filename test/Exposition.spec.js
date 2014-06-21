var assert = require('chai').assert;
var AppController = require('../server/AppController.js').AppController;
var FakeDB = require('../server/FakeDB.js').FakeDB;
var Card = require('../server/Card.js').Card;
var Exposition = require('../server/Card.js').Exposition;
var SessionController = require('../server/SessionController.js').SessionController;
var TeamMemberController = require('../server/TeamMemberController.js').TeamMemberController;

describe('Exposition', function () {

    beforeEach(function (done) {
        db = new FakeDB();
        appController = new AppController(db);
        appController.createSession('Master', function (err, session, master) {
            sessionController = new SessionController(session, db);
            masterController = new TeamMemberController(master);

            var deck = [new Card('fibonacci_0', '')
                      , new Card('fibonacci_1', '')
                      , new Card('fibonacci_2', '')
                      , new Card('unsure', '')
                      , new Card('coffee_break', '')];
            sessionController.setDeck(deck);

            sessionController.joinSession('Jon', function (err, jon) {
                jonController = new TeamMemberController(jon);

				sessionController.joinSession('Max', function (err, max) {
					maxController = new TeamMemberController(max);
					
					done();
				});
            });
        });
    });

    it('should be available when all users laid their cards down', function (done) {
        var card0 = sessionController.session.deck[0],
            card1 = sessionController.session.deck[1],
			card2 = sessionController.session.deck[2];

        masterController.provideEstimate(card0);
        jonController.provideEstimate(card1);
		maxController.provideEstimate(card2);

        sessionController.getExposition(function (err, exposition) {
			assert.ok(exposition);
		});

        done();
    });

    it('should be unavailable when not all users laid their cards down', function (done) {
        var card0 = sessionController.session.deck[0],
            card1 = sessionController.session.deck[1],
			card2 = sessionController.session.deck[2];

        masterController.provideEstimate(card0);
        // Jon does not provide estimate
		maxController.provideEstimate(card2);

        sessionController.getExposition(function (err, exposition) {
			assert.notOk(exposition);
		});

        done();
    });

    it('should be unavailable when some user recalled estimate', function (done) {
        var card0 = sessionController.session.deck[0],
            card1 = sessionController.session.deck[1],
			card2 = sessionController.session.deck[2];

        masterController.provideEstimate(card0);
        jonController.provideEstimate(card1);
		// master recalls
        masterController.recallEstimate();
		maxController.provideEstimate(card2);

        sessionController.getExposition(function (err, exposition) {
			assert.notOk(exposition);
		});

        done();
    });

});