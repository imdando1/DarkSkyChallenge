// Karma configuration
// Generated on Sun Oct 02 2016 18:51:07 GMT-0700 (PDT)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../../bower_components/angular/angular.js',
            '../../bower_components/angular-mocks/angular-mocks.js',
            // '../../bower_components/angular-ui-router/release/angular-ui-router.min.js',
            // '../../bower_components/angular-resource/angular-resource.min.js',
            // '../../bower_components/angular-animate/angular-animate.min.js',
            // '../../bower_components/angular-touch/angular-touch.min.js',
            // '../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            // '../../bower_componetns/ngGeolocation/ngGeolocation.js',
            '../ngApp/app.js',
            // '../ngApp/config/app.config.js',
            // '../ngApp/config/app.route.js',
            // '../ngApp/services/weather.service.js',
            '../ngApp/controllers/home.controller.js',
            // '../ngApp/controllers/weather.controller.js'
            // '../ngApp/controllers/week.controller.js',
            // '../ngApp/components/weather.component.js',
            'units/*.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}