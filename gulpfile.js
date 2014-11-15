/*
* Advanced gulp task manager
* Handles Angular, Javascript, jade and SCSS
* Please maintain the structural suggestions from within the package
* Use --mode min to create a minified version of your code
*/

var	gulp 		= 		require('gulp'),
	args		=		require('yargs').argv,
	gulpif 		=		require('gulp-if'),
	sass 		= 		require('gulp-sass'),
	minifycss 	= 		require('gulp-minify-css'),
	changed 	= 		require('gulp-changed'),
	watch 		= 		require('gulp-watch'),
	uglify 		= 		require('gulp-uglify'),
	concat		=		require('gulp-concat'),
	prefix 		= 		require('gulp-autoprefixer'),
	jade 		= 		require('gulp-jade'),
	rename 		= 		require("gulp-rename"),
	ignore 		= 		require('gulp-ignore'),
	ext 		= 		require('gulp-ext-replace');

var ismin = args.mode === 'min';

/*
* Set input and output from gulpfile
*/

var input = './source';
var output = './assets';

// ----- Task handling SCSS compile, depending on mode, file will either be minified or extended

gulp.task('styles', ['iconfont-converter'], function() {

	gulp.src( input+'/sass/**/*.scss' )

		.pipe( changed( input+'/sass/**' ) )
		.pipe( sass( { style: 'expanded' } ) )
		.pipe( prefix() )
		.pipe( gulpif( ismin, minifycss( { keepBreaks: false } ) ) )
		.pipe( gulp.dest( output+'/css' ) )
});

gulp.task('iconfont-converter', function() {
	gulp.src(input+'/sass/assets/fontello.css')
		.pipe(rename('_fontello.css'))
		.pipe(ext('.scss'))
		.pipe(gulp.dest(input+'/sass/assets/'))
})
// ----- Task handling creating two javascript files, one for top and one for bottom
// ----- Only force-loads should go in the top section of this to minimize load-time

gulp.task('js-top', function() {
	gulp.src([
			'bower_components/modernizr/modernizr.js',
			'bower_components/respond/src/respond.js'
			])
		.pipe( concat( 'all.top.js' ) )
		.pipe( gulpif (ismin, uglify() ) )
		.pipe( gulp.dest( output+'/js' ) )
})

gulp.task('js-bottom', function() {
	gulp.src([
			input+'/js/*.js'
			])
		.pipe( changed( input+'/js/**' ) )
		.pipe( concat( 'js.bottom.js' ) )
		.pipe( gulp.dest( input+'/temp/js' ) )
});

gulp.task('js-angular', ['js-bottom'], function() {
	gulp.src([
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/angular/angular.min.js',
		'bower_components/angular-route/angular-route.min.js',
		input+'/temp/js/*.js',
		input+'/angular/app.js',
		input+'/angular/config.js',
		input+'/angular/services.js',
		input+'/angular/controllers.js',
		input+'/temp/js/js.bottom.js'
	])
	.pipe( concat('all.bottom.js') )
	.pipe( gulpif ( ismin, uglify() ) )
	.pipe( gulp.dest(output+'/js') )
});

gulp.task('js',['js-top', 'js-angular'], function() {});

// ------ Handling the template design, including partials for Angular

gulp.task('partials', function() {
	gulp.src( input+'/template/partials/*.jade' )
		.pipe( jade() )
		.pipe( gulp.dest('./partials/') )
})

gulp.task('template', ['partials'],function() {
 	gulp.src( input+'/template/*.jade' )
	 	.pipe( changed( input+'/template/**/*.jade' ) )
	 	.pipe( jade() )
	 	.pipe( gulp.dest( './' ) )
});

// ----- Watch task to make sure scripts gets run on local development

gulp.task('watch-only', function() {
	gulp.watch( input+'/template/**/*.jade', ['template'] );
	gulp.watch( input+'/sass/**/*.scss', ['styles'] );
	gulp.watch( input+'/js/**/*.js', ['js'] );
	gulp.watch( input+'/angular/*.js', ['js']);
});

// ----- Manages everything, run gulp, gulp --mode min for minified

gulp.task('watch', ['default', 'watch-only'], function() {});
gulp.task('default',['template', 'styles', 'js'], function() {});