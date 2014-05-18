var assert = require('assert');
var TeamMember = require('../server/TeamMember.js').TeamMember;

describe('TeamMember', function() {

    it('shouldHaveEmptyExpositionWhenCreated', function() {
        var teamMember = new TeamMember();
        assert.equal(null, teamMember.exposedCard);
    });

    it('shouldHaveGivenNameWhenCreated', function() {
        var teamMember = new TeamMember("Vasya");
        assert.equal("Vasya", teamMember.name);
    });

})