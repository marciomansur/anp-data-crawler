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
    'scripts',
    'lint',
    'start',
    'watch'
]);

// Tasks preparing for deploy
gulp.task('prod', [
    'scripts',
    'lint',
    'start'
]);
