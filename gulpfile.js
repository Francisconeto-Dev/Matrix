const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');

function styles() {
  return gulp
    .src('./src/styles/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('./dist/css'));
}

function scripts() {
  return gulp
    .src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
}

function images() {
  return gulp
    .src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images'));
}

function audio() {
  return gulp
    .src('src/audio/*')
    .pipe(gulp.dest('dist/audio'));
}

function watch() {
  gulp.watch('src/styles/**/*.scss', gulp.parallel(styles));
  gulp.watch('src/scripts/**/*.js', gulp.parallel(scripts));
  gulp.watch('src/images/**/*', gulp.parallel(images));
  gulp.watch('src/audio/**/*', gulp.parallel(audio));
}

exports.default = gulp.parallel(
  styles,
  scripts,
  images,
  audio
);
exports.watch = watch;
