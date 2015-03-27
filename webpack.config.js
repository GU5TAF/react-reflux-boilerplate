var webpack = require('webpack'),
  pkg = require('./package.json'),
  entry = [
    'webpack-dev-server/client?http://localhost:1337',
    'webpack/hot/only-dev-server',
    './app/scripts/app'
  ],
  output = {
    path: __dirname + '/.tmp/js/',
    filename: 'app.' + pkg.version + '.js',
    publicPath: '/js/'
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
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
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
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      }
    ]
  }

};
