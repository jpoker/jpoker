var Exposition = require('./Card.js').Exposition;

function TeamMember(name) {
    this.name = name;
    this.exposition = new Exposition('', '', 'NotSet');
}

exports.TeamMember = TeamMember;