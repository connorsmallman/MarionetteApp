var gulp = require('gulp');
var browserify = require('gulp-browserify');


gulp.task('browserify', function () {
  gulp.src('./app/assets/js/app.js')
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(gulp.dest('./app/public/js'));
});

gulp.task('watch', function () {
  gulp.watch('./app/assets/js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify', 'watch']);