'use strict';

(function () {

var async = require('async');

function SessionController(session, db) {
    this.session = session;
    this.db = db;
}

SessionController.prototype.joinSession = function(teamMemberName, callback) {
    if (teamMemberName === '')
        callback(new Error('team member\'s name cannot be empty'));

    this.db.createUser(teamMemberName, this.session.id, callback);
};

SessionController.prototype.canEstimate = function () {
    if (!this.session.deck.length)
        throw new Error('deck isn\'t available');
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

        async.map(userIDs, 
            function (userId, callback) {
                self.db.getUserByID(userId, self.session.id, callback);
            },
            callback);
    });
};

SessionController.prototype.setDeck = function (deck) {
    if (!deck.length)
        throw new Error('cannot assign empty deck');
    this.session.deck = deck;
};

SessionController.prototype.getExposition = function (callback) {
	this.getUsers(function (err, userList) {
		if (err)
			return callback(err);
			
		var exposition = {};
		for (var i = 0; i < userList.length; ++i) {
			var user = userList[i];
			if (!user.exposedCard)
				return callback(null, null);
			exposition[user.name] = user.exposedCard;
		}
		
		callback(null, exposition);
	});
};

exports.SessionController = SessionController;

}());