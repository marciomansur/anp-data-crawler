'use strict';
/**
 * Call all tasks and watch app files for changes, and then run the tasks again
 */
import gulp from 'gulp';

gulp.task('watch', () => {

    gulp.watch([`**/*.js`,`!node_modules/**`], ['lint']);
});