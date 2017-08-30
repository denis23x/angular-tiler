// 	Dependencies declaration

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	concat = require('gulp-concat'),
	strip = require('gulp-strip-comments'),
 	cleanCSS = require('gulp-clean-css');

	// 	Build task declaration
	// 	
	//  get-app

	var paths = {
		getApp:['js/MainApp.js']
	};	

	gulp.task('watcher',function(){
		gulp.watch(paths.getApp, ['get-app']);
	});

	/*===========================================
	=            Compress components            =
	===========================================*/
	
	var base = {
		getAngular:[
		'node_modules/jquery/dist/jquery.js',
		'node_modules/angular-ui-router/release/angular-ui-router.js'
		]
	};		

	gulp.task('compress-app', function (cb) {
		// pump ([gulp.src(base.getAngular),uglify(),gulp.dest('temp/js')],cb);
		pump ([gulp.src(base.getAngular),gulp.dest('temp/js')],cb);
	});

	gulp.task('get-app', ['compress-app'], function() {
		return gulp.src('temp/js/**')
			.pipe(concat('angular-components.min.js'))
			.pipe(gulp.dest('dist'));
	});