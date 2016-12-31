'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connect = require('connect');
var runSequence = require('run-sequence');

module.exports = gulp.task('watch', function () {
    livereload.listen({
        port: config.ports.livereloadServer
    });

    gulp.watch(config.paths.src.scripts, function() {
      runSequence(
        'lint',
        ['watchify'],
        'reload');
    });
    gulp.watch(config.paths.src.templates, function() {
      runSequence(
        'templates',
        ['watchify'],
        'reload');
    });
    gulp.watch(config.paths.src.styles, function() {
      runSequence(
        'styles',
        ['watchify'],
        'reload');
    });
});

gulp.task('reload', function () {
    livereload.reload(BUILD_FOLDER + '/index.html');
});
