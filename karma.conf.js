module.exports = function (config) {
  var baseBrowser = process.env.TRAVIS ? 'Firefox' : 'Chrome'

  config.set({
    basePath: '',
    frameworks: ['mocha', 'peer'],
    files: [
      'test/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.js': ['webpack']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    customLaunchers: {
      Chrome1: {
        base: baseBrowser,
        displayName: 'Chrome-1'
      },
      Chrome2: {
        base: baseBrowser,
        displayName: 'Chrome-2'
      }
    },
    browsers: ['Chrome1', 'Chrome2'],
    singleRun: false,
    plugins: [
      // requiring these for easier debugging
      require('karma-mocha'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-webpack'),
      require('./index')
    ],
    peer: {
    },
    webpackMiddleware: {
      noInfo: true
    },
    browserNoActivityTimeout: 50000
  })
}
