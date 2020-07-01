const path = require('path');

module.exports = {
  // Inform webpack that bundle is build for node.js and not for browser
  target: 'node',

  // Root file of the server app
  entry: './src/index.js',

  // Where to put the generated bundle file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // Run babel through every file to transpile code to es5
  module: {
    rules: [
      {
        // Do transpiling only on .js files
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0', // handle async code
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  }
};
