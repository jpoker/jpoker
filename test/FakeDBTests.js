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
        var session = db.createSession();
        var user = db.createUser('name', session.id);

        assert.notEqual(null, user.id);
    });

    it('should assign unique IDs when two users created', function() {
        var session = db.createSession();
        var first = db.createUser('name', session.id), second = db.createUser('name', session.id);

        assert.notEqual(first.id, second.id);
    });

    it('should have specified user name when created', function() {
        var session = db.createSession();
        var userName = 'Basil Pupkine';
        var user = db.createUser(userName, session.id);

        assert.equal(userName, user.name);
    });

    it('should return null when user not found', function() {
        var session = db.createSession();
        var user = db.getUserByID('non-existent-user', session.id);

        assert.equal(null, user);
    });

    it('should return same user when found', function() {
        var session = db.createSession();
        var created = db.createUser('name', session.id);

        var queried = db.getUserByID(created.id, session.id);

        assert.strictEqual(created, queried);
    });

    it('should return null when user is not in the session', function() {
        var session = db.createSession();
        var created = db.createUser('name', session.id);

        var queried = db.getUserByID(created.id, 'non-existent-session');

        assert.equal(null, queried);
    });

})