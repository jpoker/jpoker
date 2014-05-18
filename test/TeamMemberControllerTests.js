var assert = require('assert');
var TeamMember = require('../server/TeamMember.js').TeamMember;
var TeamMemberController = require('../server/TeamMemberController.js').TeamMemberController;

describe('TeamMemberController', function() {

    it('should change estimate to given when provided', function() {
        var teamMember = new TeamMember();
        var controller = new TeamMemberController(teamMember);
        controller.provideEstimate(13);
        assert.equal(13, teamMember.exposedCard);
    });

    it('should remove estimate when recalled', function() {
        var teamMember = new TeamMember();
        var controller = new TeamMemberController(teamMember);
        controller.provideEstimate(13);
        controller.recallEstimate();
        assert.equal(null, teamMember.exposedCard);
    });

    it('should throw when empty card provided', function() {
        var teamMember = new TeamMember();
        var controller = new TeamMemberController(teamMember);
        assert.throws(function() {
            controller.provideEstimate(null);
            });
    });

    it('should throw when estimate is already provided', function() {
        var teamMember = new TeamMember();
        var controller = new TeamMemberController(teamMember);
        controller.provideEstimate(13);
        assert.throws(function() {
            controller.provideEstimate(14);
            });
    });

})