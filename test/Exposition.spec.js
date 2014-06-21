var assert = require('assert');
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

                done();
            });
        });
    });

    it('should be available when all users laid their cards down', function (done) {
        var fib0Card = sessionController.getCardByName('fibonacci_0'), 
            fib1Card = sessionController.getCardByName('fibonacci_1');

        masterController.provideEstimate(fib0Card);
        jonController.provideEstiamte(fib1Card);

        var exposition = sessionController.getExposition();
        assert.ok(exposition);

        done();
    });

    it('should be unavailable when not all users laid their cards down', function (done) {
    });

});