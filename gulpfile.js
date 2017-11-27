var gulp = require('gulp');
var sass = require('gulp-sass');
var del  = require('del');
var rename = require('gulp-rename');
var liveReLoad = require('gulp-livereload');
var browserSync= require('browser-sync');

/** clean up css files **/
gulp.task('clean', () => {
  del(['public/css/index.css']); 
});

/** setup browser for reloading **/
gulp.task('browser-sync', () => {
  browserSync.init({
    proxy:"localhost:8080",
    browser:"google chrome",
    localOnly:true
  });
});

/** reload the browser **/
gulp.task('reload', () => {
  browserSync.reload();
});

/** watch anything change to reload **/
gulp.task('watch',['browser-sync'], () => {
  gulp.watch('./public/css/*.css',['reload']);
  gulp.watch('./views/*.handlebars',['reload']);
  gulp.watch('./views/**/*.handlebars',['reload']);
  gulp.watch('./routes/**/*.js',['reload']);
})

