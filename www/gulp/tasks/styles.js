'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');


module.exports = gulp.task('styles', function () {
    return gulp.src([config.paths.src.styles, config.paths.src.depStyles])
      .pipe(concatCss(config.paths.dest.build.styles))
      .pipe(rename({suffix: '.css'}))
      .pipe(gulp.dest(BUILD_FOLDER));
});

