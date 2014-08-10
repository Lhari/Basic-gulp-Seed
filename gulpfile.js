var	gulp 		= 		require('gulp'),
	git			=		require('gulp-git'),
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
	jade 		= 		require('gulp-jade');

var isMaster = args.type === 'master';
var isProduction = args.type === 'production';
var message = args.message;

var input = 'source';
var output = 'assets';

gulp.task('styles', function() {
	gulp.src( input+'/sass/**/*.scss' )
		.pipe( changed( input+'/sass/**' ) )
		.pipe( sass( { style: 'expanded' } ) )
		.pipe( prefix() )
		.pipe( gulpif( isMaster, minifycss( { keepBreaks: false } ) ) )
		.pipe( gulp.dest( output+'/css' ) )
});

gulp.task('js-top', function() {
	gulp.src([
			'bower_components/modernizr/modernizr.js',
			'bower_components/respond/src/respond.js'
			])
		.pipe( concat( 'all.top.js' ) )
		.pipe( gulpif (isMaster, uglify() ) )
		.pipe( gulp.dest( output+'/js' ) )
})

gulp.task('js-bottom', function() {
	gulp.src([
			'bower_components/jquery/jquery.js',
			'bower_components/blazy/blazy.js',
			'source/js/partials/*.js'
			])
		.pipe( changed( input+'/js/**' ) )
		.pipe( concat( 'all.bottom.js' ) )
		.pipe( gulpif ( isMaster, uglify() ) )
		.pipe( gulp.dest( output+'/js' ) )
});

gulp.task('template', function() {
 	gulp.src( input+'/template/*.jade' )
	 	.pipe( changed( input+'/template/**/*.jade' ) )
	 	.pipe( jade() )
	 	.pipe( gulp.dest( './' ) )
});

gulp.task('watch-only', function() {
	gulp.watch( input+'/template/*.jade', ['template'] );
	gulp.watch( input+'source/sass/**/*.scss', ['styles'] );
	gulp.watch( input+'/js/**/*.js', ['js-bottom'] );
});

gulp.task('production', function() {
	return gulp.src('')
		//.pipe( git.checkout( 'dev' ) )
		.pipe( git.add() )
		.pipe( git.commit( message ) )
		.pipe( git.push() )
		.pipe( notify( 'Files pushed to dev branch of Github with the title: '+message ) )
});

gulp.task('master', function() {
	return gulp.src('')
		//.pipe( git.checkout( 'master', {args: '-b'} ) )
		.pipe( git.add() )
		.pipe( git.commit( message ) )
		.pipe( git.push() )
		.pipe( notify( 'Files pushed to master branch of Github with the title: '+message ) )
		.pipe( notify( 'Version number: 1.0.0' ) )
});

gulp.task('default', function() {
	gulp.src( input+'/**/*.*' )
	gulp.run('template');
	gulp.run('styles');
	gulp.run('js-top');
	gulp.run('js-bottom');
	/*
	gulp.src('')
		.pipe( gulpif( isProduction, gulp.run( 'production' ) ) )
		.pipe( gulpif( isMaster, gulp.run( 'master' ) ) )
		.pipe( gulpif( !isMaster, gulpif( !isProduction, gulp.run( 'watch-only' ) ) ) )
		*/
});