'use strict';
var router = require('express').Router();

import Statistics from '../controllers/statistics';

let statistics = new Statistics();


// Weeks and states routes
router.get('/states', statistics.findAllStates);
router.get('/weeks', statistics.findAllWeeks);
router.get('/reports/:initials/:week_id/:offset/:limit', statistics.reportStatistics);

module.exports = router;
