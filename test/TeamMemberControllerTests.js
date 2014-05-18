var assert = require('assert');
var TeamMember = require('../server/TeamMember.js').TeamMember;
var TeamMemberController = require('../server/TeamMemberController.js').TeamMemberController;

describe('TeamMemberController', function() {

    it('shouldChangeEstimateToGivenWhenProvided', function() {
        var teamMember = new TeamMember();
        var controller = new TeamMemberController(teamMember);
        controller.provideEstimate(13);
        assert.equal(13, teamMember.exposedCard);
    });

    it('shouldRemoveEstimateWhenRecalled', function() {
        var teamMember = new TeamMember();
        var controller = new TeamMemberController(teamMember);
        controller.provideEstimate(13);
        controller.recallEstimate();
        assert.equal(null, teamMember.exposedCard);
    });

    it('shouldThrowWhenEmptyCardProvided', function() {
        var teamMember = new TeamMember();
        var controller = new TeamMemberController(teamMember);
        assert.throws(function() {
            controller.provideEstimate(null);
            });
    });

})