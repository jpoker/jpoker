'use strict';

var expect = require('chai').expect;
var app = require('../../server/application.js');
var request = require('supertest');

describe('session api', function () {

    var sessionId;

    it('should create session', function (done) {
        request(app)
            .post('/api/sessions?name=Vasya')
//            .send({name: 'Master'})
            .expect(200)
            .end(function (err, res) {
                if (err)
                    done(err);

                expect(res.body).to.have.property('session');
                expect(res.body.session).to.have.property('id');
                sessionId = res.body.session.id;

                expect(res.body.joinURL).to.be.equal('/join?session=' + sessionId);

                done();
            });
    });

    it('should join session', function (done) {
        request(app)
            .post('/api/sessions/' + sessionId + '/users?name=Petya')
            .expect(200)
            .end(function (err, res) {
                if (err)
                    done(err);

                expect(res.body).to.have.property('user');
                expect(res.body.user).to.have.property('id');

                done();
            });
    });

});