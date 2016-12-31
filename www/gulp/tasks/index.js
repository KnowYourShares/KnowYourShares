'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');

module.exports = gulp.task('index', function () {
  return gulp.src(config.paths.src.index)
    .pipe(replace('<!--scripts-->', '<script src="' + config.filenames.build.scripts + '"></script>'))
    .pipe(gulp.dest(config.paths.dest.build.index));
});
