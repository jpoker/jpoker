var assert = require('assert');
var RootController = require('../server/RootController.js').RootController;

describe('RootController', function() {

    it('createSessionShouldThrowWhenScrumMasterNameIsEmpty', function() {
        assert.throws(function() {
            var controller = new RootController();
            controller.createSession("");
            }, Error);
    });

})