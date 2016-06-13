var atImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var cssnano = require('cssnano');
var cssnext = require('postcss-cssnext');
var gulp = require('gulp');
var mqpacker = require('css-mqpacker');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var uncss = require('gulp-uncss');

gulp.task('css', function () {
  var processors = [
    atImport,
    cssnext(),
    autoprefixer({browsers: ['last 3 version']}),
    mqpacker
  ];
  var min = [
    cssnano
  ];
  return gulp.src('./src/*.css')
  .pipe(sourcemaps.init())
  .pipe(postcss(processors))
  .pipe(uncss({
    html: ['./*.html']
  }))
  .pipe(gulp.dest('css'))
  .pipe(size({gzip: false, showFiles: true, title:'css'}))
  .pipe(postcss(min))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest('css'))
  .pipe(size({gzip: false, showFiles: true, title:'minified'}))
  .pipe(sourcemaps.write('.'))
  .pipe(browserSync.stream());
});

// Initialize browser-sync which starts a static server also allows for
// browsers to reload on filesave
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/**
 * DEFAULT TASK
 */
gulp.task('default', ['css', 'bs-reload', 'browser-sync'], function(){
  gulp.start(['css', 'bs-reload']);
  gulp.watch(['src/*.css','*.html','*.php'], ['css']);
});