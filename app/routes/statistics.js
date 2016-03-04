'use strict';
var router = require('express').Router();

import Statistics from '../controllers/statistics';

let statistics = new Statistics();

router.get('/cities/:name', statistics.findCityData);
router.get('/state/:initials', statistics.findByState);


module.exports = router;
