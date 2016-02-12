module.exports = function (config) {
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
    autoWatch: true,
    customLaunchers: {
      Chrome1: {
        base: 'Chrome',
        displayName: 'Chrome-1'
      },
      Chrome2: {
        base: 'Chrome',
        displayName: 'Chrome-2'
      }
    },
    browsers: ['Chrome1', 'Chrome2'],
    singleRun: false,
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-webpack',
      require('./index')
    ],
    peer: {
    }
  })
}
