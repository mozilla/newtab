const webpack = require('./webpack.config');

module.exports = function (config) {
  config.set({
    singleRun: true,
    browsers: ['FirefoxNightly'],
    frameworks: ['mocha'],
    reporters: ['mocha'],
    files: [
      'tests/index.test.js'
    ],
    preprocessors: {
     'tests/**/*.test.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: webpack.resolve,
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react']
          }
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
