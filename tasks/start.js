'use strict';
/**
 * Initialize the node server environment
 */
import gulp  from 'gulp';
import nodemon from 'gulp-nodemon';

gulp.task('start', () => {

    nodemon({
        exec: "babel-node",
        script: "app.js"

    }).on('start');

});

