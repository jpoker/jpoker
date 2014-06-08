'use strict';

(function () {

var Exposition = require('./Card.js').Exposition;

function TeamMember(name) {
    this.name = name;
    this.exposedCard = null;//new Exposition('', '', 'basic_state');
};

TeamMember.prototype.getExposedCart = function () {
    return this.exposedCard;
};

exports.TeamMember = TeamMember;

}());