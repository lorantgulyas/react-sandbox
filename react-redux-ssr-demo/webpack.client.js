const path = require('path');

module.exports = {
  // Root file of the CLIENT app - 
  // !NOT the src/index, that contains server related code, not necessary to bundle into
  entry: './src/client/client.js',

  // Where to put the generated bundle file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
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
