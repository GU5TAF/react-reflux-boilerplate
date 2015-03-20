'use strict';

var del = require('del');

module.exports = function(gulp, plugins, paths, opts) {
  return function(callback) {
    var dirs = ['build'];

    del(dirs, function() {
      if (dirs.length < 2) {
        plugins.util.log(
          plugins.util.colors.cyan('clean') + ': ' +
          plugins.util.colors.red('\'' + dirs + '\' ' + 'directory has been deleted')
        );
      } else {
        plugins.util.log(
          plugins.util.colors.cyan('clean') + ': ' +
          plugins.util.colors.red('\'' + dirs + '\' ' + 'directories have been deleted')
        );
      }
      callback();
    });
  };
};
