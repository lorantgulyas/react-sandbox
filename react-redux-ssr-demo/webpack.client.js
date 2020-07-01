const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
  // Root file of the CLIENT app - 
  // !NOT the src/index, that contains server related code, not necessary to bundle into
  entry: './src/client/client.js',

  // Where to put the generated bundle file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};

module.exports = merge(baseConfig, config);
