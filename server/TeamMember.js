<<<<<<< HEAD
var Exposition = require('./Card.js').Exposition;

function TeamMember(name) {
    this.name = name;
    this.exposition = new Exposition('', '', 'NotSet');
=======
"use strict";

function TeamMember(name) {
    this.name = name;
    this.exposedCard = null;
>>>>>>> 7a9d26ef7b2f9584119e5b7af689839b2e3f79db
}

exports.TeamMember = TeamMember;