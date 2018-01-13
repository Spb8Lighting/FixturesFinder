const gulp = 		require('gulp')
,	$ = 			require('gulp-load-plugins')()
,	FolderCSS = 	'src/dist/css/*.css'
,	FolderIMG = 	'src/dist/img/**/*'
,	SourceFont = 	'src/private/*.ttf'
,	SourceCSS = 	'src/private/scss/css.scss'
,	SourceIMG = 	'src/private/img/**/*'

// Process Other files to generate distribuable files
gulp.task('font', () => {
	return gulp.src(SourceFont)
		.pipe(gulp.dest('src/dist/'))
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
		.pipe(gulp.dest('src/dist/css'))
})
// Process IMG files to generate distribuable files
gulp.task('img', () => {
	return gulp.src(SourceIMG)
    	.pipe($.image())
    	.pipe(gulp.dest('src/dist/img'))
})
// On any modification of dist file, sent to update on browser
gulp.task('watch', () => {
	gulp.watch('src/private/scss/*.scss', ['css'])
	gulp.watch(SourceIMG, ['img'])
})
// Default task when gulp command launched
gulp.task('default', ['watch', 'font', 'css', 'img'], () => {
})
