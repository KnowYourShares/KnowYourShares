'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserifyShim = require('browserify-shim');
var $ = require('gulp-load-plugins')();

module.exports = gulp.task('watchify', function () {

  var bundler = watchify(browserify(config.paths.src.modules), {
    basedir: './app/scripts', // (roots __dirname)
    debug: true
  });
  var bundle = function() {
    return bundler
        .bundle()
        // destination changes when `dist` is set to true
        .pipe(source(config.filenames.build.scripts))
        .pipe(gulp.dest(config.paths.dest.build.scripts));
  };
  // rebundle on change
  bundler.on('update', bundle);
  return bundle();

});
