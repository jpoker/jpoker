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

    it('should return same session by id when created', function() {
        var db = new FakeDB();
        var created = db.createSession();

        var queried = db.getSessionByID(created.id);

        assert.strictEqual(created, queried);
    });

    it('should return null when session not found', function() {
        var db = new FakeDB();

        var queried = db.getSessionByID('non-existent-ID');

        assert.equal(null, queried);
    });

    it("should return session with specified scrum master's name when created", function() {
        var scrumMasterName = 'Scrum Master'
        var db = new FakeDB();

        var session = db.createSession(scrumMasterName);

        assert.equal(scrumMasterName, session.scrumMasterName);
    });

})