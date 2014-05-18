var Session = require('./Session.js').Session;

function SessionController(session) {
    this.session = session;
}

SessionController.prototype.joinSession = function(teamMemberName) {
        if (teamMemberName == "")
            throw new Error("not implemented!");
};

exports.SessionController = SessionController;