function Card(name, description) {
    this.name = name;
    this.description = description;
};

Card.prototype.setName = function (name) {
    this.name = name;
    return this;
};

Card.prototype.getName = function () {
    return this.name;
};

Card.prototype.setDescription = function (description) {
    this.description = description;
    return this;
};

Card.prototype.getDescription = function () {
    return this.description;
};

function Exposition(name, description, basic_state){
    this.setName(name);
    this.setDescription(description);
    this.state = basic_state;
};

Exposition.__proto__ = Card;

exports.Card = Card;
exports.Exposition = Exposition;

