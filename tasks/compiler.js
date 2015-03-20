'use strict';

var webpack = require('webpack'),
  notifier = require('node-notifier'),
  config = require('../webpack.config.js'),
  util = require('gulp-util');

  var reportTemplate = function(warning, file, line, id, reason) {
    return warning + ' \'' + util.colors.cyan(file) + ':' + util.colors.magenta(line) + '\' ' + id + ': ' + reason;
  };

  config.jshint = {
    reporter: function(errors) {
      errors.forEach(function(error) {
        var warning = util.colors.yellow('[JS Hint]');
        var message = function(error) {
          var cause = /\{(.*?)\}/.exec(error.raw);
          if(cause) {
            return error.raw.replace(cause[0], error[cause[1]]);
          } else {
            return error.raw;
          }
        };
        util.log(reportTemplate(warning, 'file', error.line, error.code, message(error)));
      });
    }
  };

  var compiler = webpack(config);

  compiler.plugin("done", function(stats) {
    if (stats.compilation.errors.length < 1) {
      var title = 'Webpack';
      var message = 'Bundled and hot reloaded ' + config.output.filename;
      util.log(
        util.colors.cyan('gulp-notify') + ': [' +
        util.colors.blue(title) + '] ' +
        util.colors.green(message)
      );
      notifier.notify({
        title: title,
        message: message,
        icon: __dirname + '/assets/javascript.png'
      });
    } else {
      var errorTitle = 'Webpack Error';
      var errorMessage = 'Bundling and hot reloading of ' + config.output.filename + ' failed';
      notifier.notify({
        title: errorTitle,
        message: errorMessage,
        icon: __dirname + '/assets/javascript-error.png',
        sound: 'Funk'
      });
    }
  });

  module.exports = compiler;
