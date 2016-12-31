'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var serveStatic = require('serve-static');
var open = require('gulp-open');

/*gulp.task('connectServer', function (next) {
    var staticServerPath = BUILD_FOLDER;
    app.use(serveStatic(staticServerPath)).listen(process.env.PORT || config.ports.staticServer, next);
});*/

gulp.task('connectDev', function () {
  connect.server({
    name: 'Dev App',
    root: BUILD_FOLDER,
    port: 9000,
    livereload: true
  });
});

gulp.task('htmlLive', function () {
  gulp.src(TMP_FOLDER)
    .pipe(connect.reload());
});

gulp.task('createWeb',['connectDev'], function () {
    gulp.src('')
        .pipe(open({uri: 'http://localhost:9000/'}));
});


module.exports = gulp.task('serve', ['connectDev', 'createWeb']);
