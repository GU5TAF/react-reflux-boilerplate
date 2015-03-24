'use strict';

module.exports = function(gulp, plugins, paths, opts) {
  return function() {
    var stream = gulp.src(paths.icons.src)
      .pipe(plugins.iconfont({
        fontName: opts.iconFontName,
        normalize: true,
        fontHeight: '1024',
        appendCodepoints: true
      }))
      .on('codepoints', function(codepoints, options) {
        gulp.src('app/icons/_icons.scss')
        .pipe(plugins.consolidate('lodash', {
          glyphs: codepoints,
          fontName: opts.iconFontName,
          fontPath: '../fonts/',
          className: 'icon'
        }))
        .pipe(gulp.dest(paths.icons.dest.scss));
      })
      .pipe(gulp.dest(paths.icons.dest.fonts));
    return stream;
  };
};
