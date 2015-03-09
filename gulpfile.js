'use strict';

var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')({camelize: true});
var argv    = require('yargs').argv;
var webpack = require('webpack');

var paths = {
  html: {
    src: ['./app/*.html'],
    dest: './dist'
  },
  scripts: {
    src: ['./app/scripts/**/*.js', './app/scripts/**/*.jsx'],
    dest: './dist/js'
  },
  styles: {
    src: ['./app/styles/**/*.scss'],
    dest: './dist/css'
  }
};

var opts = {
  env: argv.env || 'dev',
  port: 1337,
  webpackConfig: require('./webpack.config.js'),
  autoprefixerBrowsers: [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 6',
    'opera >= 23',
    'ios >= 6',
    'android >= 4.4',
    'bb >= 10'
  ],
  reportTemplate: function(warning, file, line, id, reason) {
    return warning + ' \'' + plugins.util.colors.cyan(file) + ':' + plugins.util.colors.magenta(line) + '\' ' + id + ': ' + reason;
  }
};

gulp.task('serve', require('./tasks/serve')(gulp, plugins, paths, opts));
gulp.task('html', require('./tasks/html')(gulp, plugins, paths, opts));
gulp.task('scripts', require('./tasks/scripts')(gulp, webpack, plugins, paths, opts));
gulp.task('styles', require('./tasks/styles')(gulp, plugins, paths, opts));

gulp.task('default', ['serve', 'html', 'scripts', 'styles'], function() {
  gulp.watch(paths.html.src, ['html']);
  gulp.watch(paths.scripts.src, ['scripts']);
  gulp.watch(paths.styles.src, ['styles']);
});
