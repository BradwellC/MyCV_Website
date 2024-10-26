const { dest, src, watch, series } = require('gulp');
const babel = require('gulp-babel');

const sass = require('gulp-sass')(require('sass'));

const cssMinfy = require('gulp-clean-css');

const concat = require('gulp-concat');
const rename = require('gulp-rename');

const jsMinfy = require('gulp-terser');


// CSS Gulp

function styles() {
  return src('Library/styles/**/*.{scss, sass}')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('public/css'))
    .pipe(cssMinfy())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('public/css'));
}

// JS Gulp

function scripts() {
  return src('Library/scripts/**/*.js')
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(concat('scripts.js'))
    .pipe(dest('public/js'))
    .pipe(jsMinfy())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('public/js'));
}

// Watch Gulp
function watchGulp() {
  watch('Library/scripts/**/*.js', series(scripts));
  watch('Library/styles/**/*.scss', series(styles));
}

exports.default = series(styles, scripts, watchGulp);
