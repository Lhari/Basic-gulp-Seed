'use strict';

<<<<<<< HEAD
var
gulp        = require('gulp'),
concat      = require('gulp-concat'),
sass        = require('gulp-sass'),
uglify      = require('gulp-uglify'),
watch       = require('gulp-watch'),
prefix      = require('gulp-autoprefixer'),
jade        = require('gulp-jade'),
del         = require('del'),
server      = require('./server'),
watch		= require('gulp-watch'),
browserSync = require('browser-sync'),
=======
var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),
    prefix      = require('gulp-autoprefixer'),
    jade        = require('gulp-jade'),
    del         = require('del'),
    server      = require('./server'),
    watch 		  = require('gulp-watch'),
    browserSync = require('browser-sync');
>>>>>>> 28742b7b1d206affb998d7aabf565f83de5740f9

//
// PATHS
// -------------------------------------------------------------
<<<<<<< HEAD

=======
var
>>>>>>> 28742b7b1d206affb998d7aabf565f83de5740f9

projectname   = 'DecoGroupTpl',

// Default
<<<<<<< HEAD
CURRENT       = '',
PROTOTYPE     = '/prototype/',
=======
CURRENT       = 'src/',
PROTOTYPE     = 'www/prototype/',
>>>>>>> 28742b7b1d206affb998d7aabf565f83de5740f9
ASSETS        = 'assets/',

// Magento 
vendor        = 'vendor/kirchbergerknorr/magento/',
www           = 'www/',
mage_styles   = 'skin/frontend/'+ projectname +'/default/',

<<<<<<< HEAD
// Compiled

CONTENT = 'public_html/',
COMPILED =  CONTENT + 'compiled/',
=======
>>>>>>> 28742b7b1d206affb998d7aabf565f83de5740f9

SOURCE    = CURRENT + 'assets/',
BOWER     = 'bower_components/',

FONTS     = 'fonts/',
JS        = 'scripts/',
JADE      = 'jade/',
IMAGES    = 'images/',
STYLES    = 'styles/',
PUBLIC    = 'public/';

//
// TASKS
// -------------------------------------------------------------
gulp.task('css', function() {
<<<<<<< HEAD
  gulp.src(SOURCE + '/styles/**.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(prefix("last 1 version", "> 1%", "ie 9")
      .on('error', function (error) { console.warn(error.message); }))
    .pipe(gulp.dest(COMPILED + 'css'))
});

gulp.task('fonts', function() {
  var FILES = SOURCE + FONTS + '*.*';
  gulp.src(FILES)
    .pipe( gulp.dest(COMPILED + 'fonts'))
});

gulp.task('vendor', function() {
  var FILES = [
    BOWER + 'modernizr/modernizr.js',
    BOWER + 'respond/src/respond.js' ];
  gulp.src(FILES)
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest(COMPILED + 'js'))
});

gulp.task('public', function() {
  var FILES = SOURCE + PUBLIC + '**/*.*';
  gulp.src(FILES)
    .pipe( gulp.dest(CONTENT))
});

gulp.task('js', function() {
  var FILES = [ 
    BOWER + 'jquery/dist/jquery.js',
    BOWER + 'selectize/dist/js/standalone/selectize.js',
    BOWER + 'fitvids/jquery.fitvids.js',
    BOWER + 'jquery-validate/dist/jquery.validate.js',
    SOURCE + JS + 'globals/*.js', 
    SOURCE + JS + '*.js' 
  ];
  gulp.src(FILES)
    //.pipe(uglify()
          //.on('error', function (error) { console.warn(error.message); }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(COMPILED + 'js'))
});

gulp.task('template', function() {
})

gulp.task('media', function() {
	gulp.src(SOURCE + 'media/**/*')
	.pipe(gulp.dest(COMPILED + 'media'))
})

gulp.task('watch-only', function() {
	gulp.watch( COMPILED + 'Template/**/*.*', ['template'] );
	gulp.watch( COMPILED + 'assets/styles/**/*.scss', ['css'] );
	gulp.watch( COMPILED + 'assets/scripts/**/*.js', ['js'] );

});


// Prototype
// ----------------------------------

// Browsersync
gulp.task('browser-sync', function() {
  browserSync({ server: { baseDir: PROTOTYPE } });
});

// Jade
gulp.task('jade', function() {
  var FILES = CURRENT + 'jade/*.jade';
  var categories = require('./'+ CURRENT + ASSETS + 'data/categories.json');

  gulp.src(FILES)
    .pipe(jade({ 
      pretty: true, 
      locals: categories
    })
      .on('error', function (error) { console.warn(error.message); }))
    .pipe(gulp.dest(CONTENT))
    .pipe(browserSync.reload({stream: true, once: true}) );
});

// CSS
gulp.task('prototype-css', function() {
  gulp.src('src/assets/styles/**.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(prefix("last 1 version", "> 1%", "ie 9")
      .on('error', function (error) { console.warn(error.message); }))
    .pipe(gulp.dest(PROTOTYPE + ASSETS + STYLES))
});

// Public
gulp.task('prototype-public', function() {
  var FILES = SOURCE + PUBLIC + '**/*.*';
  gulp.src(FILES)
    .pipe( gulp.dest(PROTOTYPE));
});

// Fonts
gulp.task('prototype-fonts', function() {
  var FILES = SOURCE + FONTS + '*.*';
  gulp.src(FILES)
    .pipe( gulp.dest(PROTOTYPE + ASSETS + FONTS));
});

// Vendor
gulp.task('prototype-vendor', function() {
  var FILES = [
    BOWER + 'modernizr/modernizr.js',
    BOWER + 'respond/src/respond.js' ];
  gulp.src(FILES)
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest(PROTOTYPE + ASSETS + JS));
});

// JS
gulp.task('prototype-js', function() {
  var FILES = [ 
    BOWER + 'jquery/dist/jquery.js',
    BOWER + 'selectize/dist/js/standalone/selectize.js',
    BOWER + 'fitvids/jquery.fitvids.js',
    BOWER + 'jquery-validate/dist/jquery.validate.js',
    SOURCE + JS + 'globals/*.js',
    SOURCE + JS + '*.js' 
  ];
  gulp.src(FILES)
    //.pipe(uglify()
          //.on('error', function (error) { console.warn(error.message); }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(PROTOTYPE + ASSETS + JS))
    .pipe(browserSync.reload({stream: true, once: true}));
});

// Clean
gulp.task('clean', function(cb){
  del([PROTOTYPE], cb);
});

// Watch
gulp.task('watch-prototype', ['browser-sync'], function() {
  gulp.watch(SOURCE + STYLES + '**/*.scss',['prototype-css']);

  gulp.watch(CURRENT + '**/*.jade',['jade']);

  gulp.watch(SOURCE + JS + '**/*.js',['prototype-js']);


  gulp.watch(SOURCE + PUBLIC + '*.*',['prototype-public']);
});

gulp.task('prototype', ['prototype-fonts', 'prototype-js', 'prototype-public', 'prototype-vendor', 'prototype-css', 'jade', 'watch-prototype'])
gulp.task('watch', ['js', 'vendor', 'public', 'css', 'fonts', 'template', 'media', 'watch-only'])
gulp.task('default', ['js', 'vendor', 'public', 'css', 'fonts', 'template', 'media'])