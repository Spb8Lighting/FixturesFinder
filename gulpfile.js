const gulp = require('gulp')
	, $ = require('gulp-load-plugins')()
	, electron = require('electron-connect').server.create()
	, config = require('./config')
	, SourceFullEJS = 'views/**/*.ejs'
	, SourceEJS = ['views/template/*.ejs', 'views/index.ejs']
	, FolderEJS = 'public/html/*.html'
	, FolderCSS = 'public/css/*.css'
	, FolderIMG = 'public/img/**/*'
	, SourceFont = 'private/*.ttf'
	, SourceCSS = 'private/scss/css.scss'
	, SourceJS = 'private/js/*.js'
	, SourceIMG = 'private/img/**/*'

// Process IMG files to generate distribuable files
gulp.task('html', () => {
	return gulp.src(SourceEJS)
		.pipe($.ejs({ PageTitle: `Fixtures Finder/Search - v${config.Version}`, config: config }, {}, { ext: '.html' }))
		.pipe(gulp.dest('public/html'))
})
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
		/*.pipe($.uglifyes({
			mangle: false,
			ecma: 6
		}))*/
		.pipe(gulp.dest('public/js'))
})
// Process SCSS files to generate distribuable files
gulp.task('css', () => {
	return gulp.src(SourceCSS)
		.pipe($.sass({
			onError: console.error.bind(console, 'SASS Error')
		}))
		.pipe($.autoprefixer())
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
	gulp.watch(SourceFullEJS, ['html'], electron.reload)
	gulp.watch(SourceJS, ['js'], electron.reload)
	gulp.watch('private/scss/**/*', ['css'], electron.reload)
	gulp.watch(SourceIMG, ['img'], electron.reload)
})
// Default task when gulp command launched
gulp.task('default', ['html', 'font', 'css', 'js', 'img'], () => {
})
