const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that bundle is build for node.js and not for browser
  target: 'node',

  // Root file of the server app
  entry: './src/index.js',

  // Where to put the generated bundle file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // not put libraries in the bundle what already existing the node_modules folder, on the server side only!
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
