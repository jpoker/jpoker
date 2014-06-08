var assert = require('assert');
var FakeDB = require('../server/FakeDB.js').FakeDB;

describe('DB', function() {

    beforeEach(function() {
        db = new FakeDB();
    });

    it('should assign session ID when created', function() {
        var session = db.createSession();

        assert.notEqual(null, session.id);
    });

    it('should assign unique IDs when two sessions created', function() {
        var first = db.createSession(), second = db.createSession();

        assert.notEqual(first.id, second.id);
    });

    it('should return same session by id when created', function() {
        var created = db.createSession();

        var queried = db.getSessionByID(created.id);

        assert.strictEqual(created, queried);
    });

    it('should return null when session not found', function() {
        var queried = db.getSessionByID('non-existent-ID');

        assert.equal(null, queried);
    });

    it("should return session with specified scrum master's name when created", function() {
        var scrumMasterName = 'Scrum Master'

        var session = db.createSession(scrumMasterName);

        assert.equal(scrumMasterName, session.scrumMasterName);
    });

    it('should assign user ID when created', function() {
        var user = db.createUser();

        assert.notEqual(null, user.id);
    });

})