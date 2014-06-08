var assert = require('assert');
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('DB', function() {

    it('should assign session ID when created', function() {
        var db = new FakeDB();

        var session = db.createSession();

        assert.notEqual(null, session.id);
    });

    it('should assign unique IDs when two sessions created', function() {
        var db = new FakeDB();

        var first = db.createSession(), second = db.createSession();

        assert.notEqual(first.id, second.id);
    });


})