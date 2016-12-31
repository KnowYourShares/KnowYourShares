'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserifyShim = require('browserify-shim');
var $ = require('gulp-load-plugins')();

module.exports = gulp.task('watchify', function () {
    var bundler = browserify({
        // Required watchify args
        cache: {}, packageCache: {}, fullPaths: true,
        // Browserify Options
        entries: ['./src/modules/index.js'],
        debug: true
    });

    var bundle = function () {
        return bundler
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./build/'));
    };

    if (global.isWatching) {
        bundler = watchify(bundler);
        bundler.on('update', bundle);
    }

    return bundle();
});
