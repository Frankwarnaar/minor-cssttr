var babel       = require('gulp-babel'),
	browserSync = require('browser-sync'),
	gulp        = require('gulp'),
	gutil       = require('gulp-util'),
	less        = require('gulp-less'),
	plumber     = require('gulp-plumber'),
	watch       = require('gulp-watch');

/* ============================================================
	Main tasks
   ============================================================ */

gulp.task('default', ['watch', 'browser-sync']);

/* ============================================================
	Configuration
   ============================================================ */

var config = {
	assetsPath: 'assets',
	distPath: 'dist',
	debug: true
};

gulp.task('watch', ['watch:html', 'watch:js', 'watch:less']);

gulp.task('watch:less', ['less'], function () {
	return gulp.watch(config.assetsPath + '/styles/**/*.less', ['less']);
});

gulp.task('watch:js', ['js'], function () {
	return gulp.watch(config.assetsPath + '/js/*.js', ['js']);
});

gulp.task('watch:html', function () {
	return gulp.watch(['*.html', 'components/**.html']).on('change', browserSync.reload);
});

var handleError = function(err) {
	gutil.log(err);
	this.emit('end');
};

/* ============================================================
	Less
   ============================================================ */

gulp.task('less', function () {
	return gulp.src(config.assetsPath + '/styles/app.less')
		.pipe(plumber({
			errorHandler: handleError
		}))
		.pipe(less())
		.pipe(gulp.dest(config.distPath + '/css'))
		.pipe(browserSync.stream());
});

/* ============================================================
	Javascript
   ============================================================ */

gulp.task('js', function () {
	return gulp.src(config.assetsPath + '/js/app.js')
		.pipe(plumber({
			errorHandler: handleError
		}))
		.pipe(babel())
		.pipe(gulp.dest(config.distPath + '/js'))
		.pipe(browserSync.stream());
});

/* ============================================================
	Browser-sync
   ============================================================ */

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});
