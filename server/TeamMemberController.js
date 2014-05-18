'use strict';

(function () {

var TeamMember = require('./TeamMember.js').TeamMember;

function TeamMemberController(teamMember) {
    this.teamMember = teamMember;
}

TeamMemberController.prototype.provideEstimate = function(exposedCard) {
    if (exposedCard === null)
        throw new Error('empty exposedCard');

    if (this.teamMember.exposedCard !== null)
        throw new Error('exposedCard already provided');

    this.teamMember.exposedCard = exposedCard;
};

TeamMemberController.prototype.recallEstimate = function() {
    this.teamMember.exposedCard = null;
};

exports.TeamMemberController = TeamMemberController;

}());