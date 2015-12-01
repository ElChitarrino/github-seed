var gulp = require('gulp');
var tslint = require('gulp-tslint');
var tsc = require('gulp-typescript');
var clean = require('gulp-clean');

gulp.task('tslint', function(){
      return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('compile', function(){

    // sourceRoot is not supported in this gulp tasks
    // apart from that this should resemble tsconfig.json
    var tscOptions = {
        "target": "ES5",
        "module": "commonjs",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false,
        "suppressImplicitAnyIndexErrors": true,
        "rootDir": "./src",
        "outDir": "./dist",
        "moduleResolution": "node"
    };

    gulp.src('./dist')
        .pipe(clean());

    var tsResult = gulp.src(['./typings/tsd.d.ts','./src/**/*.ts'])
        .pipe(tsc(tscOptions));

    return tsResult.js.pipe(gulp.dest('./dist'));
});
