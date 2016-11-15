'use strict';

var gulp = require('gulp');
var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('gulp-open');

var app = connect();


gulp.task('connectServer', function (next) {
    var staticServerPath = BUILD_FOLDER;
    if (release)
        staticServerPath = RELEASE_FOLDER;
    app.use(serveStatic(staticServerPath)).listen(process.env.PORT || config.ports.staticServer, next);
});

gulp.task('createWeb',['connectServer'], function () {
    gulp.src('')
        .pipe(open({uri: 'http://localhost:9000/'}));
});


module.exports = gulp.task('serve', ['connectServer', 'createWeb']);
