'use strict';

(function () {

function Session(scrumMasterName) {
    this.scrumMasterName = scrumMasterName;
    this.teamMembers = [];
    this.deck = [];
};

Session.prototype.deckEmpty = function() {
    return this.deck.length == 0;
};

Session.prototype.setDeck = function (deck) {
    this.deck = deck;
};

Session.prototype.getCardByName = function (name) {
    //inefficient impl.
    for (var i = 0; i < this.deck.length; i++) {
        if (this.deck[i].name == name)
            return this.deck[i];
    }

    return null;
};

Session.prototype.updateExposition = function (user, card) {
    for (var i = 0; i < this.teamMembers.length; i++) {
        if (this.teamMembers[i] == user) {
            this.teamMembers[i].exposedCard = card;
            return;
        }
    }
}

Session.prototype.getExpositionName = function (user) {
    for (var i = 0; i < this.teamMembers.length; i++) {
        if (this.teamMembers[i] == user) {
            return this.teamMembers[i].exposedCard.getName();
        }
    }
}


exports.Session = Session;

}());