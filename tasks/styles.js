'use strict';

module.exports = function(gulp, plugins, paths, opts) {
  return function() {
    var stream = gulp.src(paths.styles.src)
      .pipe(plugins.plumber({errorHandler: plugins.notify.onError({
        title: 'Styles Error',
        message: '<%= error.message.charAt(0).toUpperCase() + error.message.substring(1) %>',
        icon: __dirname + '/assets/sass-error.png',
        sound: 'Funk'
      })}))
      .pipe(plugins.sourcemaps.init())
        .pipe(plugins.scssLint({
          customReport: function (file) {
            if (!file.scsslint.success) {
              file.scsslint.issues.forEach(function(issue) {
                var warning = issue.severity === 'warning' ? plugins.util.colors.yellow('[Scss Lint]') : plugins.util.colors.red('[Scss Lint]');
                plugins.util.log(opts.reportTemplate(warning, file.relative, issue.line, issue.linter, issue.reason));
              });
            }
          }
        }))
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({browsers: opts.autoprefixerBrowsers}))
        .pipe(plugins.if(opts.env === 'prod', plugins.minifyCss()))
      .pipe(plugins.if(opts.env !== 'prod', plugins.sourcemaps.write()))
      .pipe(plugins.plumber.stop())
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(plugins.connect.reload())
      .pipe(plugins.notify({
        title: 'Styles',
        message: opts.env === 'prod' ? 'Compiled, autoprefixed and minified <%= file.relative %>' : 'Compiled and autoprefixed <%= file.relative %>',
        icon: __dirname + '/assets/sass.png'
      }));
    return stream;
  };
};
