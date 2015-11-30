var gulp = require('gulp');
var tslint = require('gulp-tslint');
var tsc = require('gulp-tsc');

gulp.task('tslint', function(){
      return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('build', ['compile'], function () {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile', function(){
    gulp.src(['src/**/*.ts'])
        .pipe(tsc(require('./src/tsconfig.json').compilerOptions))
        .pipe(gulp.dest('./dist'));
});
