const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile sass
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

// Move JS files to SRC
gulp.task('js', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

// Watch sass files & serve
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: './src'
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch(['src/*.html']).on('change', browserSync.reload);
});

// Move fontAwesome fonts folder to src folder
gulp.task('fonts', function () {
    return gulp.src(['node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('src/fonts'));
});

// Move fontAwesome css to src/css folder
gulp.task('fa', function () {
    return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
        .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);