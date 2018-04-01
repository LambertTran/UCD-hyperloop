const gulp = require('gulp');
const liveReLoad = require('gulp-livereload');
const browserSync= require('browser-sync');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

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

gulp.task('sass', function () {
  return gulp.src('./public/src/sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/src/css'));
});

gulp.task('babel', () => {
	gulp.src('./public/src/js/index.js')
		.pipe(babel({
			presets: ['babel-preset-env']
		}))
		.pipe(gulp.dest('./public/dist/js'));
});

/** watch anything change to reload **/
gulp.task('watch',['browser-sync'], () => {
  gulp.watch('./views/**/*.handlebars',['reload']);
  gulp.watch('./public/src/sass/*.scss',['sass','reload']);
  gulp.watch('./public/src/sass/**/*.scss',['sass','reload']);
  gulp.watch('./public/src/js/*.js',['babel','reload']);
  gulp.watch('./public/src/js/**/*.js',['babel','reload']);
  gulp.watch('./routes/**/*.js',['reload']);
})

