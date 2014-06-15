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
        db.disconnect(function () {
            assert.isFalse(db.connected());
            done();
        });
    });

    it('should not return error when session created', function (done) {
        db.createSession('scrum_master', function (err) {
            assert.notOk(err);
            done();
        });
    });

    it('should assign session ID when created', function (done) {
        db.createSession('scrum_master', function (err, session) {
            assert.ok(session.id);
            done();
        });
    });

    it('should assign unique IDs when two sessions created', function (done) {
        db.createSession('first', function (err, first) {
            assert.notOk(err);
            db.createSession('second', function (err, second) {
                assert.notEqual(first.id, second.id);
                done();
            });
        });
    });

    it('should return same session by id when created', function(done) {
        db.createSession('master', function (err, created) {
            db.getSessionByID(created.id, function (err, queried) {
                assert.strictEqual(created.id, queried.id);
                done();
            });
        });
    });

    it('should return error when session not found', function(done) {
        db.getSessionByID('non-existent-ID', function (err) {
            assert.ok(err);
            done();
        });
    });

    it('should not return error when session found', function (done) {
        db.createSession('master', function (err, created) {
            db.getSessionByID(created.id, function (err) {
                assert.notOk(err);
                done();
            });
        });
    });

    it("should return session with specified scrum master's name when created", function (done) {
        var scrumMasterName = 'Scrum Master'
        db.createSession(scrumMasterName, function (err, session) {
            assert.equal(scrumMasterName, session.scrumMasterName);
            done();            
        });
    });

    it('should not return error when user created', function (done) {
        db.createSession('master', function (err, session) {
            db.createUser('name', session.id, function (err) {
                assert.notOk(err);
                done();
            });
        });
    });

    it('should assign user ID when created', function(done) {
        db.createSession('master', function (err, session) {
            db.createUser('name', session.id, function (err, user) {
                assert.ok(user.id);
                done();
            });
        });
    });

    it('should assign unique IDs when two users created', function (done) {
        db.createSession('master', function (err, session) {
            db.createUser('first', session.id, function(err, first) {
                db.createUser('second', session.id, function(err, second){
                    assert.notEqual(first.id, second.id);
                    done();
                });
            });
        });
    });

    it('should have specified user name when created', function(done) {
        db.createSession('master', function(err, session) {
            var userName = 'Basil Pupkine';
            db.createUser(userName, session.id, function(err, user) {
                assert.equal(userName, user.name);
                done();
            });
        });
    });

    it('should return error when user not found', function (done) {
        db.createSession('master', function (err, session) {
            db.getUserByID('non-existent-user', session.id, function (err) {
                assert.ok(err);
                done();
            });
        });
    });

    it('should not return error when user found', function (done) {
        db.createSession('master', function (err, session) {
            db.createUser('user', session.id, function (err) {
                assert.notOk(err);
                done();
            });
        });
    });

    it('should return same user when found', function (done) {
        db.createSession('master', function (err, session) {
            db.createUser('user', session.id, function (err, created) {
                db.getUserByID(created.id, session.id, function (err, queried) {
                    assert.strictEqual(created.id, queried.id);
                    done();
                });
            });
        });
    });

    it('should return error when user is not in the session', function (done) {
        db.createSession('master', function (err, session) {
            db.createUser('user', session.id, function (err, created) {
                db.getUserByID(created.id, 'non-existent-session', function (err) {
                    assert.ok(err);
                    done();
                });
            });
        });
    });

    it('should return error when attempting to create user in non-existing session', function (done) {
        db.createSession('master', function (err, session) {
            db.createUser('user', 'non-existent-session', function (err, created) {
                assert.ok(err);
                done();
            });
        });
    });

    it('should return user list when users created', function (done) {
        db.createSession('master', function (err, session) {
            db.createUser('first', session.id, function (err, first) {
                db.createUser('second', session.id, function (err, second) {
                    db.getUserIDsBySessionID(session.id, function (err, userList) {
                        assert.includeMembers([first.id, second.id], userList);
                        done();
                    });
                });
            });
        });
    });

    /*
    it('should return empty user list when non-existing session', function() {
        var userList = db.getUserIDsBySessionID('non-existing-session');

        assert.lengthOf(userList, 0);
    })
*/
})