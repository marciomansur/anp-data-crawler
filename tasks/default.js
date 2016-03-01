'use strict';
/**
 * Call default tasks
 */
import gulp from 'gulp';

gulp.task('default', () => {

    gulp.start('dev');
});

// Tasks for development
gulp.task('dev', [
    'lint',
    'start',
    'watch'
]);

gulp.task('prod', [
    'lint',
    'start'
]);
