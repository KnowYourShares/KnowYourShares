'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var concatCss = require('gulp-concat-css');


module.exports = gulp.task('styles', function () {
    return gulp.src(config.paths.src.styles)
        .pipe(concatCss(config.paths.dest.build.styles));
});

