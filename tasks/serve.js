'use strict';

var webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  notifier = require('node-notifier');

module.exports = function(gulp, plugins, paths, opts) {
  // Format errors returned by JsHint
  opts.webpackConfig.jshint = {
    reporter: function(errors) {
      errors.forEach(function(error) {
        var warning = plugins.util.colors.yellow('[JS Hint]');
        var message = function(error) {
          var cause = /\{(.*?)\}/.exec(error.raw);
          if(cause) {
            return error.raw.replace(cause[0], error[cause[1]]);
          } else {
            return error.raw;
          }
        };
        plugins.util.log(opts.reportTemplate(warning, 'file', error.line, error.code, message(error)));
      });
    }
  };

  var compiler = webpack(opts.webpackConfig);

  compiler.plugin("done", function(stats) {
    if (stats.compilation.errors.length < 1) {
      var title = 'Webpack';
      var message = 'Bundled and hot reloaded ' + opts.webpackConfig.output.filename;
      plugins.util.log(
        plugins.util.colors.cyan('gulp-notify') + ': [' +
        plugins.util.colors.blue(title) + '] ' +
        plugins.util.colors.green(message)
      );
      notifier.notify({
        title: title,
        message: message,
        icon: __dirname + '/assets/javascript.png'
      });
    } else {
      var errorTitle = 'Webpack';
      var errorMessage = 'Bundling and hot reloading of ' + opts.webpackConfig.output.filename + ' failed';
      notifier.notify({
        title: errorTitle,
        message: errorMessage,
        icon: __dirname + '/assets/javascript-error.png',
        sound: 'Funk'
      });
    }
  });

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

      var appName = plugins.util.colors.cyan(opts.name);
      var serverUrl = plugins.util.colors.green('http://localhost:' + opts.port);
      var dashChars = '+' + Array(12 + appName.length + serverUrl.length).join('-') + '+';

      plugins.util.log(dashChars);
      plugins.util.log('| Application \'' + appName +'\' is running at ' + serverUrl +' |');
      plugins.util.log(dashChars);

      // keep the server alive or continue?
      callback();
    });
  };
};
