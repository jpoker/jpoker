"use strict";

var TeamMember = require('./TeamMember.js').TeamMember;

function TeamMemberController(teamMember) {
    this.teamMember = teamMember;
}

TeamMemberController.prototype.provideEstimate = function(exposedCard) {
    if (exposedCard == null)
        throw new Error("empty exposedCard");

    this.teamMember.exposedCard = exposedCard;
};

TeamMemberController.prototype.recallEstimate = function() {
    this.teamMember.exposedCard = null;
};

exports.TeamMemberController = TeamMemberController;