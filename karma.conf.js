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
    browsers: ['Chrome'],
    singleRun: false,
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-webpack',
      require('./index')
    ]
  })
}
