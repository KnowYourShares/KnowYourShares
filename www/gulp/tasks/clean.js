'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');

module.exports = gulp.task('clean', function () {
  return gulp.src(BUILD_FOLDER, {read: false})
    .pipe(clean());
});
