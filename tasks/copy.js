'use strict';

module.exports = function(gulp, plugins, src, dest) {
  return function() {
    gulp.src(src)
    .pipe(plugins.newer(dest))
    .pipe(gulp.dest(dest));
  };
};
