'use strict';

module.exports = function(gulp, plugins, paths, opts) {
  return function() {
    var stream = gulp.src(paths.html.src)
      .pipe(plugins.plumber({errorHandler: plugins.htmlhint.reporter({
        title: 'HTML Error',
        message: '<%= error.message.charAt(0).toUpperCase() + error.message.substring(1) %>',
        icon: __dirname + '/assets/gulp-error.png',
        sound: 'Funk'
      })}))
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter(function(file) {
          file.htmlhint.messages.forEach(function(result) {
            var warning = plugins.util.colors.yellow('[HTML Hint]');

            plugins.util.log(opts.reportTemplate(warning, file.relative, result.error.line, result.error.rule.id, result.error.message));
          });
        }))
        .pipe(plugins.if(opts.env === 'prod', plugins.htmlmin({
          collapseWhitespace: true,
          conservativeCollapse: true
        })))
      .pipe(plugins.plumber.stop())
      .pipe(gulp.dest(paths.html.dest))
      .pipe(plugins.connect.reload())
      .pipe(plugins.notify({
        title: 'HTML',
        message: opts.env === 'prod' ? 'HTML minified and copied to ' + paths.html.dest : 'HTML copied to ' + paths.html.dest,
        icon: __dirname + '/assets/gulp.png'
      }));
    return stream;
  };
};
