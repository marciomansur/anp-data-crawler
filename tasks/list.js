'use strict';
/**
 * List all the tasks at the moment that they run
 */
import gulp from 'gulp';
import taskListing from 'gulp-task-listing';

gulp.task('list', taskListing);