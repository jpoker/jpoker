var assert = require('assert');
var TeamMember = require('../server/TeamMember.js').TeamMember;

describe('TeamMember', function() {

    it('shouldHaveEmptyExpositionWhenCreated', function() {
        var teamMember = new TeamMember();
        assert.equal(null, teamMember.exposedCard);
    });

})