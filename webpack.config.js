const WebpackNotifierPlugin = require('webpack-notifier');
const webpack = require('webpack');
const path = require('path');
const absolute = (relPath) => path.join(__dirname, relPath);

const srcDir = './src';
const srcPath = './src/main.js';
const distDir = './www';
const distFilename = 'main.js'

// TODO: config
const config = {};

module.exports = {
  entry: srcPath,
  output: {
    path: distDir,
    filename: distFilename,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'components': absolute('./src/components'),
      'reducers': absolute('./src/reducers'),
      'actions': absolute('./src/actions'),
      'constants': absolute('./src/constants'),
      'lib': absolute('./src/lib')
    }
  },
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: /.\/src\//,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', {
          plugins: ['transform-object-rest-spread']
        }]
        //presets: ['react']
      }
    }]
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({__CONFIG__: JSON.stringify(config)})
  ]
};
