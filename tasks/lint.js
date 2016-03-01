'use strict';
/**
 * Task 'Lint' is to validate patterns in javascript files, gulp, etc.
 * In the root of project, the file .eslintrc defines the patterns followed
 */
import gulp  from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', () => {

    gulp.src([`**/*.j`,`!node_modules/**`])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});