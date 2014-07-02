exports.config = {
  chromeDriver: '../../node_modules/protractor/selenium/chromedriver',
  chromeOnly: false,
  allScriptsTimeout: 11000,
  specs: ['*.js'],
  exclude: ['protractor.conf.js'],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://www.angularjs.org',
  onPrepare: function() {
    var ASSERTION_PROMISE, chai, chaiAsPromised;
    ASSERTION_PROMISE = 'should';
    chai = require('chai');
    chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    chai.should();
    Object.defineProperty(protractor.promise.Promise.prototype, ASSERTION_PROMISE, {
      get: Object.prototype.__lookupGetter__(ASSERTION_PROMISE),
      set: Object.prototype.__lookupSetter__(ASSERTION_PROMISE)
    });
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    reporter: 'list'
  }
};

