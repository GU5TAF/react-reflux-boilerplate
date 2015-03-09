var webpack = require('webpack'),
  entry = './app/scripts/app.jsx',
  output = {
    path: __dirname,
    filename: 'app.js'
  };

module.exports = {
  debug: true,
  devtool: 'eval-source-map',
  entry: entry,
  output: output,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
      { test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'jsxhint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'jsx-loader']
      }
    ]
  },

};
