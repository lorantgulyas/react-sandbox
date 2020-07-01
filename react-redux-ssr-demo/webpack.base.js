module.exports = {
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
