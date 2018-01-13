const gulp = 		require('gulp')
,	$ = 			require('gulp-load-plugins')()
,	FolderCSS = 	'public/css/*.css'
,	FolderIMG = 	'public/img/**/*'
,	SourceFont = 	'private/*.ttf'
,	SourceCSS = 	'private/scss/css.scss'
,	SourceJS = 		'private/js/*.js'
,	SourceIMG = 	'private/img/**/*'

// Process Other files to generate distribuable files
gulp.task('font', () => {
	return gulp.src(SourceFont)
		.pipe(gulp.dest('public/'))
})
// Process JS files to generate distribuable files
gulp.task('js', () => {
	return gulp.src(SourceJS)
	.pipe($.concatUtil('app.js'))
	.pipe($.concatUtil.footer('\n'))
	.pipe($.uglifyes({
		mangle: false,
		ecma: 6
	}))
	.pipe(gulp.dest('public/js'))
})
// Process SCSS files to generate distribuable files
gulp.task('css', () => {
	return gulp.src(SourceCSS)
		.pipe($.sass({
			onError: console.error.bind(console, 'SASS Error')
		}))
		.pipe($.autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe($.cleanCss())
		.pipe($.rename(path => {
			path.basename += '.min'
		}))
		.pipe(gulp.dest('public/css'))
})
// Process IMG files to generate distribuable files
gulp.task('img', () => {
	return gulp.src(SourceIMG)
    	.pipe($.image())
    	.pipe(gulp.dest('public/img'))
})
// On any modification of dist file, sent to update on browser
gulp.task('watch', () => {
	gulp.watch('private/scss/*.scss', ['css'])
	gulp.watch(SourceIMG, ['img'])
})
// Default task when gulp command launched
gulp.task('default', ['font', 'css', 'js', 'img'], () => {
})
