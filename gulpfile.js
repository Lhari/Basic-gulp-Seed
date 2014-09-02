/*
* Advanced gulp task manager
* Allows minifaction of files depending on argument
* Use --mode min to minify
*/

var	gulp 		= 		require('gulp'),
	args		=		require('yargs').argv,
	gulpif 		=		require('gulp-if'),
	sass 		= 		require('gulp-sass'),
	minifycss 	= 		require('gulp-minify-css'),
	run			=		require('gulp-run'),
	notify		=		require('gulp-notify'),
	rename 		= 		require('gulp-rename'),
	changed 	= 		require('gulp-changed'),
	watch 		= 		require('gulp-watch'),
	uglify 		= 		require('gulp-uglify'),
	concat		=		require('gulp-concat'),
	prefix 		= 		require('gulp-autoprefixer'),
	jade 		= 		require('gulp-jade'),
	rename 		= 		require("gulp-rename"),
	ignore 		= 		require('gulp-ignore'),
	annotate	=		require('gulp-ng-annotate'),
	ext 		= 		require('gulp-ext-replace');

// ----- Decide the minifaction name

var isMin = args.mode === 'min';

// ----- Set input and output from gulpfile

var input = 'source';
var output = 'assets';
var bower = 'bower_components';

// ----- Compiling fontello fonts to the correct placement

gulp.task('iconfont-converter', function() {
	gulp.src(input+'/sass/assets/fontello.css')
		.pipe(rename('_fontello.css'))
		.pipe(ext('.scss'))
		.pipe(gulp.dest(input+'/sass/assets/'))
})

// ----- Task handling SCSS compile, depending on mode, file will either be minified or extended

gulp.task('styles',['iconfont-converter'] , function() {
	gulp.src( input+'/sass/**/*.scss' )

		.pipe( changed( input+'/sass/**' ) )
		.pipe( sass( { style: 'expanded' } ) )
		.pipe( prefix() )
		.pipe( gulpif( isMin, minifycss( { keepBreaks: false } ) ) )
		.pipe( gulp.dest( output+'/css' ) )
});

// ----- Task handling javascript file for top-loading on a site

gulp.task('js-top', function() {
	gulp.src([
			bower+'/angular/angular.min.js',
			bower+'/modernizr/modernizr.js',
			bower+'/respond/src/respond.js'
			])
		.pipe( concat( 'all.top.js' ) )
		.pipe( annotate() )
		.pipe( uglify() )
		.pipe( gulp.dest( output+'/js' ) )
})

// ----- Precompile of bottom-js, for the site

gulp.task('js-bottom', function() {
	gulp.src([
			bower+'/jquery/dist/jquery.js',
			bower+'/blazy/blazy.js',
			bower+'/videojs/dist/video-js/video.js',
			bower+'/dash/lib/dash.js',
			input+'/angular/*.js',
			input+'/js/*.js'
			])
		.pipe( changed( input+'/js/**' ) )
		.pipe( gulpif ( isMin, uglify({mangle: false}) ) )
		.pipe( concat( 'all.bottom.precompile.js' ) )
		.pipe( gulp.dest( output+'/js' ) )
});

// ----- Specific angular compiler for minifying and fixing Angular to look right

gulp.task('angularControllers', function() {
	gulp.src('source/controllers/*.js')
	.pipe( changed( input+'/controllers/**' ) )
	.pipe( concat( 'controllers.js' ) )
	.pipe( annotate() )
	.pipe(gulp.dest( output+'/js' ))
})

// ----- Compiling Angular and js-bottom into 1 file for less requests

gulp.task('compile-bottom-js', ['js-bottom', 'angularControllers'], function() {
	gulp.src([
			output+'/js/all.bottom.precompile.js',
			output+'/js/controllers.js'
		])
	.pipe( concat( 'all.bottom.js' ) )
	.pipe( gulpif ( isMin, uglify({mangle: false}) ) )
	.pipe( gulp.dest( output+'/js') )
})

// ----- Bringing it all together!

gulp.task('js', ['js-top', 'compile-bottom-js'], function() {});

// ----- Task handling for compiling jade files for template generation

gulp.task('template', function() {
 	gulp.src( input+'/template/*.jade' )
	 	.pipe( changed( input+'/template/**/*.jade' ) )
	 	.pipe( jade() )
	 	.pipe( gulp.dest( './' ) )
});

// ----- Watch task to make sure scripts gets run on local development

gulp.task('watch-only', function() {
	gulp.watch( input+'/template/**/*.jade', ['template'] );
	gulp.watch( input+'/sass/**/*.scss', ['styles'] );
	gulp.watch( input+'/controllers/**/*.js', ['js'] );
	gulp.watch( input+'/js/**/*.js', ['js'] );
});

// ----- Manages everything, run gulp, gulp --mode min for minifed output

gulp.task('default', ['template', 'styles', 'js', 'watch-only'],function() {});
