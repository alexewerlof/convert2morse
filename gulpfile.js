//invlude gulp
var gulp = require('gulp');

//include plug-ins
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var jsonminify = require('gulp-jsonminify');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var size = require('gulp-size');


// Paths
var path = {
    build : './build/',
    release : './release/'
};

// minify images
gulp.task('minify-img', function () {
    "use strict";

    return gulp.src('./src/**/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest(path.build));
});

// minify javascripts
gulp.task('minify-js', function () {
    "use strict";

    return gulp.src(['./src/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(path.build));
});

// minify json
gulp.task('minify-json', function () {
    "use strict";

    return gulp.src(['./src/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest(path.build));
});

//clean up the build directory
gulp.task('clean', function () {
    "use strict";

    gulp.src('./build/', {read: false})
        .pipe(clean());

    gulp.src('./release/', {read: false})
        .pipe(clean());
});

//zip the build folder ready to upload to webstore
gulp.task('default', ['minify-img','minify-js','minify-json'], function () {
    "use strict";

    gulp.src(path.build + '**')
        .pipe(size())
        .pipe(zip('release.zip'))
        .pipe(gulp.dest(path.release));
});