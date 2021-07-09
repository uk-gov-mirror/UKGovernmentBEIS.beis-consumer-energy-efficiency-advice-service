// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            // When developing / debugging, you will likely want to use 'Chrome' rather
            // than 'ChromeHeadless'.
            // You should add "--browsers Chrome" to your command-line arguments
            // (or you can change the setting below).
            //
            // If you do that, a new Chrome window should appear when you run the tests.
            // Use the Chrome devtools to debug your tests as necessary.
            // You can use that Chrome window to run a single test (rather than all), etc.
            //
            // For the CI server, we use a headless chrome, which is faster and more
            // up-to-date than PhantomJS:
            'ChromeHeadless'
        ],
        singleRun: false,
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
                    '--headless',
                    '--disable-gpu',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222'
                ]
            }
        },
        // These "proxies" fix 404s during the tests
        // See https://github.com/angular/angular-cli/issues/2803
        proxies: {
            '/dist/assets': '/base/src/assets',
        },
        browserNoActivityTimeout: 60000, //default 10000
        browserDisconnectTimeout: 10000, // default 2000
        browserDisconnectTolerance: 1, // default 0
        captureTimeout: 60000,
        files: [
            'src/assets/test/google-mock.js'
        ]
    });
};
