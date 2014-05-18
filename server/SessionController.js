var Session = require('./Session.js').Session;
var TeamMember = require('./TeamMember.js').TeamMember;

function SessionController(session) {
    this.session = session;
}

SessionController.prototype.joinSession = function(teamMemberName) {
    if (teamMemberName == "")
        throw new Error("not implemented!");

    return new TeamMember(teamMemberName);
};

exports.SessionController = SessionController;