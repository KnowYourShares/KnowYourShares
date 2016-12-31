'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');

module.exports = gulp.task('images', function () {
  return gulp.src(config.paths.src.images)
    .pipe(gulp.dest(config.paths.dest.build.images));
});
