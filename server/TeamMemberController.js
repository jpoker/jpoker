"use strict";

var TeamMember = require('./TeamMember.js').TeamMember;

function TeamMemberController(teamMember) {
    this.teamMember = teamMember;
}

TeamMemberController.prototype.provideEstimate = function(exposedCard) {
    this.teamMember.exposedCard = exposedCard;
};

exports.TeamMemberController = TeamMemberController;