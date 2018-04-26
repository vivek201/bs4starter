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
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/zebra_accordion/dist/zebra_accordion.min.js',
        'node_modules/isotope-layout/dist/isotope.pkgd.min.js'
    ])
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
    return gulp.src(['node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/*'])
        .pipe(gulp.dest('src/webfonts'));
});

// Move fontAwesome css to src/css folder
gulp.task('fa', function () {
    return gulp.src([
        'node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css',
        'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
        'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
        'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-brands.css'
    ])
        .pipe(gulp.dest('src/css'));
});

// Move slick css & zebre-accordion css to src/css folder
gulp.task('slickcss', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick-theme.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/slick-carousel/slick/ajax-loader.gif',
        'node_modules/zebra_accordion/dist/zebra_accordion.min.css'
    ]).pipe(gulp.dest('src/css'))
        &&
    gulp.src([
        'node_modules/slick-carousel/slick/fonts/*',
    ]).pipe(gulp.dest('src/css/fonts'));
});

gulp.task('default', ['js', 'serve', 'fa', 'slickcss', 'fonts']);