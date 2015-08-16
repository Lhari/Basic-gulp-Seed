'use strict';

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

//
// PATHS
// -------------------------------------------------------------
var

projectname   = 'DecoGroupTpl',

// Default
CURRENT       = 'src/',
PROTOTYPE     = 'www/prototype/',
ASSETS        = 'assets/',

// Magento 
vendor        = 'vendor/kirchbergerknorr/magento/',
www           = 'www/',
mage_styles   = 'skin/frontend/'+ projectname +'/default/',


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
  gulp.src('src/assets/styles/**.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(prefix("last 1 version", "> 1%", "ie 9")
      .on('error', function (error) { console.warn(error.message); }))
    .pipe(gulp.dest('src/Frontend/css/'))
    .pipe(gulp.dest(vendor + mage_styles + 'css'))
    .pipe(gulp.dest(www + mage_styles + 'css'))
});

gulp.task('fonts', function() {
  var FILES = SOURCE + FONTS + '*.*';
  gulp.src(FILES)
    .pipe( gulp.dest('src/Frontend/fonts/'))
	.pipe(gulp.dest(vendor + mage_styles + 'fonts'))
	.pipe(gulp.dest(www + mage_styles + 'fonts'))
});

gulp.task('vendor', function() {
  var FILES = [
    BOWER + 'modernizr/modernizr.js',
    BOWER + 'respond/src/respond.js' ];
  gulp.src(FILES)
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest('src/Frontend/js'))
      .pipe(gulp.dest(vendor + mage_styles + 'js'))
	  .pipe(gulp.dest(www + mage_styles + 'js'))
});

gulp.task('public', function() {
  var FILES = SOURCE + PUBLIC + '**/*.*';
  gulp.src(FILES)
    .pipe( gulp.dest('src/Public/'))
    .pipe( gulp.dest(vendor))
    .pipe( gulp.dest(www));
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
    .pipe(gulp.dest('src/Frontend/js'))
    .pipe(gulp.dest(vendor + mage_styles + 'js'))
	.pipe(gulp.dest(www + mage_styles + 'js'))
});

gulp.task('template', function() {
	gulp.src('src/Template/**/*')
	.pipe(gulp.dest('www/app/design/frontend/DecoGroupTpl/'))
	.pipe(gulp.dest(vendor + 'app/design/frontend/DecoGroupTpl/'))
})

gulp.task('media', function() {
	gulp.src('src/media/**/*')
	.pipe(gulp.dest('www/media/'))
	.pipe(gulp.dest(vendor + 'media/'))
})

gulp.task('watch-only', function() {
	gulp.watch( 'src/Template/**/*.*', ['template'] );
	gulp.watch( 'src/assets/styles/**/*.scss', ['css'] );
	gulp.watch( 'src/assets/scripts/**/*.js', ['js'] );
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
    .pipe(gulp.dest(PROTOTYPE))
    .pipe(browserSync.reload({stream: true, once: true}) );
});

// Images
gulp.task('prototype-images', function() {
  var FILES = SOURCE + IMAGES + '*.*';
  gulp.src(FILES)
    .pipe( gulp.dest(PROTOTYPE + ASSETS + IMAGES) );
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

  gulp.watch(SOURCE + IMAGES + '*.*',['prototype-images']);

  gulp.watch(SOURCE + PUBLIC + '*.*',['prototype-public']);
});

gulp.task('prototype', ['prototype-fonts', 'prototype-js', 'prototype-public', 'prototype-vendor', 'prototype-css', 'jade', 'prototype-images', 'watch-prototype'])


gulp.task('watch', ['js', 'vendor', 'public', 'css', 'fonts', 'template', 'media', 'watch-only'])
gulp.task('default', ['js', 'vendor', 'public', 'css', 'fonts', 'template', 'media'])