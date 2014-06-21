'use strict';

(function () {

function SessionController(session, db) {
    this.session = session;
    this.db = db;
}

SessionController.prototype.joinSession = function(teamMemberName, callback) {
    if (teamMemberName === '')
        throw new Error('team member\'s name cannot be empty');

    this.db.createUser(teamMemberName, this.session.id, callback);
};

SessionController.prototype.canEstimate = function () {
    if (this.session.deck.length == 0)
        throw new Error("deck isn't available");
};
/*
SessionController.prototype.getCardByName = function (name) {
    this.canEstimate();
    return this.session.getCardByName(name);
};

SessionController.prototype.estimate = function (userName, cardName) {
    this.canEstimate();
    this.session.updateExposition(userName, this.session.getCardByName(cardName));
};
*/
SessionController.prototype.getUsers = function (callback) {
    var self = this;
    this.db.getUserIDsBySessionID(this.session.id, function (err, userIDs) {
        if (err)
            return callback(err);

        populateUserIDs([], userIDs, 0, self.db, self.session.id, callback);
    });
};

function populateUserIDs(users, userIDs, index, db, sessionID, callback) {
    if (index == userIDs.length)
        return callback(null, users);

    db.getUserByID(userIDs[index], sessionID, function (err, user) {
        if (err)
            return callback(err);
        users.push(user);
        populateUserIDs(users, userIDs, index + 1, db, sessionID, callback);
    });
}

SessionController.prototype.setDeck = function (deck) {
    if (deck.length == 0)
        throw Error('cannot assign empty deck');
    this.session.deck = deck;
};

SessionController.prototype.getExposition = function (callback) {
	this.getUsers(function (err, userList) {
		var exposition = {};
		for (var i in userList) {
			var user = userList[i];
			if (user.exposedCard == null)
				return callback(null, null);
			exposition[user.name] = user.exposedCard;
		}
		callback(null, exposition);
	});
};

exports.SessionController = SessionController;

}());