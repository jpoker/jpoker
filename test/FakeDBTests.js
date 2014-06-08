var assert = require('assert');
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('DB', function() {

    it('should assign session ID when created', function() {
        var db = new FakeDB();

        var session = db.createSession();

        assert.notEqual(null, session.id);
    });

})