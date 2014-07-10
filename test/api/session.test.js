'use strict';

var assert = require('chai').assert;
var app = require('../../server/application.js')
var request = require('supertest');

describe('session api', function () {

    it('should create session on POST /sessions', function (done) {
        request(app)
            .post('/sessions/new/Vasya')
//            .send({name: 'Master'})
            .expect(200)
            .expect('session created! 1', done);
    });

});