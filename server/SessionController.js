'use strict';

(function () {

var Session = require('./Session.js').Session;
var TeamMember = require('./TeamMember.js').TeamMember;

function SessionController(session) {
    this.session = session;
}

SessionController.prototype.joinSession = function(teamMemberName) {
    if (teamMemberName === '')
        throw new Error('team member\'s name cannot be empty');

    return new TeamMember(teamMemberName);
};

SessionController.prototype.canEstimate = function () {
    if (this.session.deckEmpty())
        throw new Error("deck isn't available");
};

SessionController.prototype.getCardByName = function (name) {
    this.canEstimate();
    return this.session.getCardByName(name);
};

SessionController.prototype.estimate = function (userName, cardName) {
    this.canEstimate();
    this.session.updateExposition(userName, this.session.getCardByName(cardName));
};



exports.SessionController = SessionController;

}());