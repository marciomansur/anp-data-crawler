/**
 *  Cron lib, it's used to call the services
 */
import cron from 'node-schedule';

import * as dataCrawler from '../plugins/data-crawler';

cron.scheduleJob('*/10 * * * *', () => {

  dataCrawler.scrape_state();

});

