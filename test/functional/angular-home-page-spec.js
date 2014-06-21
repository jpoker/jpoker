'use strict'

describe('angularjs homepage', function() {

    it.skip('should greet named user', function() {
        browser.get('/');
        element(By.model('yourName')).sendKeys('Julie');
        element(By.binding('yourName')).getText().should.become('Hello Jullie!');
    });

});

