var assert = require('assert');
var Card = require('../server/Card.js').Card;
var Exposition = require('../server/Card.js').Exposition;

describe('Selection', function () {

    it('absenceOfDeckShouldThrow', function () {
        assert.throws(function () {
            var session = new Session();
            var controller = new SessionController(session);
            controller.canEstimate();
        }, Error);
    });

    it('afterUserSelectsACardExpositionShouldBeEqual', function () {
        var session = new Session();
        var deck = [new Card('Vasia', ''), new Card('Petia', ''), new Card('Oleg', '')];

        session.setDeck(deck);
        var controller = new SessionController(session);






        assert.equal( ,);
    });

});