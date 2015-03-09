'use strict';

// TODO: Get HMR working so there's no need to reload
module.exports = function(gulp, webpack, plugins, paths, opts) {
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
  return function() {
    gulp.src(opts.webpackConfig.entry)
      .pipe(plugins.plumber({errorHandler: plugins.notify.onError({
        title: 'Scripts Error',
        message: '<%= error.message.charAt(0).toUpperCase() + error.message.substring(1) %>',
        icon: __dirname + '/assets/javascript-error.png',
        sound: 'Funk'
      })}))
        .pipe(plugins.webpack(opts.webpackConfig))
        .pipe(plugins.if(opts.env === 'prod', plugins.uglify()))
      .pipe(plugins.plumber.stop())
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(plugins.connect.reload())
      .pipe(plugins.notify({
        title: 'Scripts',
        message: opts.env === 'prod' ? 'Concatenated scripts to <%= file.relative %>' : 'Concatenated and minified scripts to <%= file.relative %>',
        icon: __dirname + '/assets/javascript.png'
      }));
  };
};
