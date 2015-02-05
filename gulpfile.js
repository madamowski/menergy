var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
  return gulp
    .src(['gulpfile.js', 'routes/*.js', 'models/*.js', 'controllers/*.js','public/javascripts/*.js','tests/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
 
gulp.task('tests', function() {
  return gulp
    .src('tests/*.js')
    .pipe(mocha());
});

gulp.task('default', ['lint', 'tests'], function() {
  gulp.watch(['routes/*.js', 'tests/*.js'], function() {
    gulp.run('lint', 'tests');
  });
});