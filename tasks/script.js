'use strict';
/**
 *  Scripts tasks. ECMAScript 2015 transpiler
 */
import gulp   from 'gulp';
import babel  from 'gulp-babel';

gulp.task('scripts', () => {

  gulp.src([`**/*.j`,`!node_modules/**`])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});
