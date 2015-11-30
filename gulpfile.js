var gulp = require('gulp');
var tslint = require('gulp-tslint');
var tsc = require('gulp-tsc');

gulp.task('tslint', function(){
      return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('copy', function () {
    return gulp.src(['./src/**/*.html', './src/**/*.ts'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile', function(){
    gulp.src(['src/**/*.ts'], { base: 'src' })
        .pipe(tsc(require('./src/tsconfig.json').compilerOptions))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['copy', 'compile']);
