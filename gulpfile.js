var postcss = require('gulp-postcss');
var fs = require('fs');
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var uncss = require('gulp-uncss');
var size = require('gulp-size');
var atImport = require("postcss-import");
var browserSync = require('browser-sync').create();

gulp.task('serve', ['css'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(['node_modules/tachyons/css/*.min.css', 'src/styles/*.css', '*.html' ], ['css']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('css', function () {
  return gulp.src('./src/styles/main.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss([ require('postcss-import'), require('cssnano'), require('autoprefixer') ]) )
    .pipe( uncss({ html: ['*.html'] }) )
    .pipe( size({gzip: false, showFiles: true, title:'css'}) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./dist/styles') )
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
