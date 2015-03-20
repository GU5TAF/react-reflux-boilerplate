'use strict';

var webpack = require('webpack'),
  compiler = require('./compiler');

module.exports = function(gulp, plugins, paths, opts) {
  return function(callback) {
    // run webpack
    compiler.run(function(err, stats) {
      if(err) throw new plugins.util.PluginError("webpack", err);
      plugins.util.log("[webpack]", stats.toString({
        colors: true,
        chunks: false,
        chunkModules: false
      }));
      callback();
    });
  };
};
