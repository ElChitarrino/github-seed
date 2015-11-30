var gulp = require('gulp');
var tslint = require('gulp-tslint');
var tsc = require('gulp-tsc');
var clean = require('gulp-clean');
var tscOptions = require('./src/tsconfig.json').compilerOptions;

gulp.task('tslint', function(){
      return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('compile', function(){
    gulp.src('dist')
        .pipe(clean());
    gulp.src(['src/**/*.ts'], { base: 'src' })
        .pipe(tsc(tscOptions))
        .pipe(gulp.dest('./dist'));
});
