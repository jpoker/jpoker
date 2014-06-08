'use strict';

(function() {

function FakeDB() {
}

FakeDB.prototype.createSession = function() {
    return {id: 0};
}

exports.FakeDB = FakeDB;

}());