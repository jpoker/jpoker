var assert = require('chai').assert;
var MongoDB = require('../server/MongoDB.js').MongoDB;

describe('MongoDB', function() {

    var db = new MongoDB('test');

    before(function (done) {
        assert.isFalse(db.connected());
        db.connect(function () {
            assert.isTrue(db.connected());
            done();
        });
    });
    
    after(function (done) {
        db.disconnect(function (done) {
            assert.isFalse(db.connected());
            done();
        });
    });
/*
    it('should assign session ID when created', function (done) {
        db.createSession('scrum_master', function (err, session) {
            assert.isNotNull(session.id);
            done();
        });
    });
*//*
    it('test 123', function (done) {
        console.log('test-1');
        assert.isTrue(true);
        console.log('test-2');
    });

    it('should assign unique IDs when two sessions created', function (done) {
        db.createSession('first', function (err, first) {
            db.createSession('second', function (err, second) {
                assert.notEqual(first.id, second.id);
                done();
            });
        });
    });
/*
    it('should return same session by id when created', function() {
        var created = db.createSession();

        var queried = db.getSessionByID(created.id);

        assert.strictEqual(created, queried);
    });

    it('should return null when session not found', function() {
        var queried = db.getSessionByID('non-existent-ID');

        assert.isNull(queried);
    });

    it("should return session with specified scrum master's name when created", function() {
        var scrumMasterName = 'Scrum Master'

        var session = db.createSession(scrumMasterName);

        assert.equal(scrumMasterName, session.scrumMasterName);
    });

    it('should assign user ID when created', function() {
        var session = db.createSession();
        var user = db.createUser('name', session.id);

        assert.isNotNull(user.id);
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

        assert.isNull(user);
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

        assert.isNull(queried);
    });

    it('should return null when attempting to create user in non-existing session', function() {
        var session = db.createSession();
        var user = db.createUser('name', 'non-existent-session');

        assert.isNull(user);
    });

    it('should return user list when users created', function() {
        var session = db.createSession();
        var first = db.createUser('first', session.id), second = db.createUser('second', session.id);

        var user_list = db.getUserIDsBySessionID(session.id);

        assert.includeMembers([first.id, second.id], user_list);
    });

    it('should return empty user list when non-existing session', function() {
        var user_list = db.getUserIDsBySessionID('non-existing-session');

        assert.lengthOf(user_list, 0);
    })
*/
})