var assert = require('assert');
var TeamMemberController = require('../server/TeamMemberController.js').TeamMemberController;

describe('TeamMemberController', function() {

    beforeEach(function() {
        teamMember = { exposedCard: null };
        controller = new TeamMemberController(teamMember);
    });

    it('should change estimate to given when provided', function() {
        controller.provideEstimate(13);
        assert.equal(13, teamMember.exposedCard);
    });

    it('should remove estimate when recalled', function() {
        controller.provideEstimate(13);
        controller.recallEstimate();
        assert.equal(null, teamMember.exposedCard);
    });

    it('should throw when empty card provided', function() {
        assert.throws(function() {
            controller.provideEstimate(null);
            });
    });

    it('should throw when estimate is already provided', function() {
        controller.provideEstimate(13);
        assert.throws(function() {
            controller.provideEstimate(14);
            });
    });

})