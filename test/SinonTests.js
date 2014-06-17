'use strict';

(function () {

//var assert = require('chai').assert;
var assert = require('assert');
var sinon = require('sinon');

function call_callback(callback) {
    callback(1);
}

function call_method(object) {
    object.method(1, 'hello');
}

describe('sinon', function () {

    it('test callback spy called with an argument', function () {
        var spy = sinon.spy();

        call_callback(spy);

        assert(spy.calledWith(1));
    });

    it('test spy method called with two arguments', function () {
        var object = sinon.spy();
        object.method = sinon.spy();

        call_method(object);

        assert(object.method.calledWith(1, 'hello'));
    });

    it('test mock method called with two arguments', function () {
        var object = {method: function () {}};
        var mock = sinon.mock(object);
        mock.expects('method').withArgs(1, 'hello');

        call_method(object);

        mock.verify();
    });

});

})();