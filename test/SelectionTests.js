var assert = require('assert');
var AppController = require('../server/AppController.js').AppController;
var FakeDB = require('../server/FakeDB.js').FakeDB;
var Card = require('../server/Card.js').Card;
var Exposition = require('../server/Card.js').Exposition;
var Session = require('../server/Session.js').Session;
var SessionController = require('../server/SessionController.js').SessionController;
var TeamMemberController = require('../server/TeamMemberController.js').TeamMemberController;

describe('Selection', function () {

    it('absenceOfDeckShouldThrow', function () {
        assert.throws(function () {
            var session = new Session();
            var controller = new SessionController(session);
            controller.canEstimate();
        }, Error);
    });

    it('afterUserSelectsCardExpositionShouldBeEqual', function () {
        var db = new FakeDB();
        var appController = new AppController(db);
        var session = appController.createSession();

        var deck = [new Card('fibonacci_0', '')
                  , new Card('fibonacci_1', '')
                  , new Card('fibonacci_2', '')
                  , new Card('unsure', '')
                  , new Card('coffee_break', '')];
        session.setDeck(deck);

        var sessionController = new SessionController(session, db);
        var team_member = sessionController.joinSession('Jon');
        var teamMemberController = new TeamMemberController(team_member);
        var exposedCard = session.getCardByName('coffee_break');
        teamMemberController.provideEstimate(exposedCard);
        assert.equal(team_member.getExposedCart(), exposedCard);
    });

});