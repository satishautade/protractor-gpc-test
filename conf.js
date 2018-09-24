exports.config = {
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/*spec.js'],
    // You must disable the Promise manager of WebdriverJS which will be deprecated
    //https://github.com/angular/protractor/blob/master/docs/control-flow.md
    SELENIUM_PROMISE_MANAGER: false,
    capabilities:{
        browserName: 'firefox'
    }
}