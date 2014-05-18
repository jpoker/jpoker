var assert = require('assert');
var TeamMember = require('../server/TeamMember.js').TeamMember;

describe('TeamMember', function() {

    it('should have empty exposition when created', function() {
        var teamMember = new TeamMember();
        assert.equal(null, teamMember.exposedCard);
    });

    it('should have given name when created', function() {
        var teamMember = new TeamMember('Vasya');
        assert.equal('Vasya', teamMember.name);
    });

})