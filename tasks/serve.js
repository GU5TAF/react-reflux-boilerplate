'use strict';

var WebpackDevServer = require('webpack-dev-server'),
  compiler = require('./compiler');

module.exports = function(gulp, plugins, paths, opts) {
  return function(callback) {
    new WebpackDevServer(compiler, {
      contentBase: './build',
      hot: true,
      publicPath: opts.webpackConfig.output.publicPath,
      // Unfortunately quiet swallows everything even error so it can't be used.
      quiet: false,
      // No info filters only initial compilation it seems.
      noInfo: true,
      // Remove console.log mess during watch.
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    }).listen(opts.port, 'localhost', function(err) {
      if(err) throw new plugins.util.PluginError('webpack-dev-server', err);

      var appName = opts.name;
      var serverUrl = 'http://localhost:' + opts.port;
      var dashChars = '+' + Array(32 + appName.length + serverUrl.length).join('-') + '+';

      plugins.util.log(dashChars);
      plugins.util.log('| Application \'' + plugins.util.colors.cyan(appName) +'\' is running at ' + plugins.util.colors.green(serverUrl) +' |');
      plugins.util.log(dashChars);

      callback();
    });
  };
};
