/*
* Advanced gulp task manager
* Allows direct github pushing with messages
* Use --mode master and production to push to master and dev branch
* use --message 'message' to input commit message
*/

var	gulp 		= 		require('gulp'),
//	git			=		require('gulp-git'),
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

var isMaster = args.mode === 'master';
var isProduction = args.mode === 'production';
var message = args.message;

/*
* Set input and output from gulpfile
*/

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
		.pipe( gulpif( isMaster, minifycss( { keepBreaks: false } ) ) )
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
		.pipe( gulpif (isMaster, uglify() ) )
		.pipe( gulp.dest( output+'/js' ) )
})

// ----- Task handling javascript file for bottom-loading on a site

gulp.task('js-bottom', function() {
	gulp.src([
			bower+'/jquery/dist/jquery.js',
			bower+'/blazy/blazy.js',
			input+'/angular/*.js',
			input+'/js/*.js'
			])
		.pipe( changed( input+'/js/**' ) )
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

gulp.task('compile-bottom-js', ['angularControllers', 'js-bottom'], function() {
	gulp.src([
			output+'/js/all.bottom.precompile.js',
			output+'/js/controllers.js'
		])
	.pipe( concat( 'all.bottom.js' ) )
	.pipe( gulpif ( isMaster, uglify() ) )
	.pipe( gulp.dest( output+'/js') )
})

// ----- Bringing it all together!

gulp.task('js', function() {
	gulp.run('js-top');
	gulp.run('compile-bottom-js');
});

// ----- Task handling for compiling jade files for template generation
// TODO: Add load from correct includes file

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
	gulp.watch( input+'/js/**/*.js', ['js-bottom'] );
});

// ----- Pushes to development branch on github
/*
gulp.task('production', function() {
	return gulp.src('/')
		.pipe( git.checkout( 'dev', {args: '-b'} ) )
		.pipe( git.add() )
		.pipe( git.commit( message ) )
		.pipe( git.push() )
		.pipe( notify( 'Files pushed to dev branch of Github with the title: '+message ) )
});

// ----- Pushes to master branch on github

gulp.task('master', function() {
	return gulp.src('')
		.pipe( git.checkout( 'master', {args: '-b'} ) )
		.pipe( git.add() )
		.pipe( git.commit( message ) )
		.pipe( git.push() )
		.pipe( notify( 'Files pushed to master branch of Github with the title: '+message ) )
		.pipe( notify( 'Version number: 1.0.0' ) )
});
*/
// ----- Manages everything, run gulp, gulp --mode master/production --message 'message' for correct output

gulp.task('default', function() {
	gulp.src( input+'/**/*.*' )
	gulp.run('template');
	gulp.run('styles');
	gulp.run('js');

	/*
	if(isProduction) {
		gulp.run( 'production' )
	} else if(isMaster) {
		gulp.run( 'master' )
	} else {
	*/
	gulp.run( 'watch-only' )
	//}
});