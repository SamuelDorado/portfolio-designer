var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var uglifycss = require('gulp-uglifycss');
var cache = require('gulp-cache');

// Static server
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("*.html", ['copyHtml']);
    gulp.watch("js/*.js", ['scripts']);
    gulp.watch("css/*.css", ['css']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
    gulp.watch("css/*.css").on('change', browserSync.reload);
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/**/*')
        .pipe(gulp.dest('dist/js'));
});

// Concatenate & Minify CSS
gulp.task('css', function() {
    return gulp.src('css/*.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('assets', function() {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});


gulp.task('copyHtml', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['scripts', 'css', 'assets', 'copyHtml']);
gulp.task('default', ['scripts', 'css', 'assets', 'copyHtml', 'watch']);