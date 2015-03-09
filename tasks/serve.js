'use strict';

module.exports = function(gulp, plugins, paths, opts) {
  return function() {
    plugins.connect.server({
      root: paths.html.dest,
      port: opts.port,
      livereload: true
    });
  };
};
