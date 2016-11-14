'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

module.exports = gulp.task('watch', function () {
    livereload.listen({
        port: config.ports.livereloadServer
    });
    gulp.watch(config.paths.src.livereload).on('change', function (file) {
        livereload.changed(file.path);
    });


    watch(config.paths.src.scripts, ['lint']);
    watch(config.paths.src.index, ['index']);
    watch([config.paths.src.templates, config.paths.src.templatesHTML], ['templates']);
    watch(config.paths.src.styles, ['styles']);
});
