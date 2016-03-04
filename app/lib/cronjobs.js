/**
 *  Cron lib, it's used to call the services
 */
import cron from 'node-schedule';

import * as dataCrawler from '../plugins/data-crawler';

cron.scheduleJob('* * * * * *', () => {

  dataCrawler.scrape_state();

});

