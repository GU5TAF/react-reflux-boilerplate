'use strict';

var webpack = require('webpack');

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
  return function(callback) {
    // run webpack
    webpack(opts.webpackConfig, function(err, stats) {
      if(err) throw new plugins.util.PluginError("webpack", err);
      plugins.util.log("[webpack]", stats.toString({
          // output options
      }));
      callback();
    });
  };
};
