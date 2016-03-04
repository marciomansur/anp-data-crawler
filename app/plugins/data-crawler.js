'use strict';
// NPM Modules
import request from 'request-promise';
import cheerio from 'cheerio';
import config  from 'config';
import _       from 'underscore';

// Getting first parameters
var dataRequester = require('../plugins/data-requester');

// Get models to store data
import db from '../lib/db';
import * as log from '../plugins/log-helper';

// Scrapping the 'Municipios' page, to get information about
export function scrape_state(){

    // Created a standard request, and to "eachs" to find data for
    // every fuel in every state
    dataRequester()
      .then((data) => {

        // Request options
        var options = {

          url: config.get('anp_urls.cities'),
          method: 'POST',
          headers: {
            'Host': 'www.anp.gov.br',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Origin': 'http://www.anp.gov.br',
            'Upgrade-Insecure-Requests': '1',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
          form: {
            'cod_Semana': data.week,
            'selSemana': data.selWeek,
            'desc_Semana': data.descWeek,
            'tipo': data.type
        },
          transform: function(body) {
            return cheerio.load(body);
          }
        };

        // First: Will pass in every state
        _.each(data.states, (state) =>{

          options.form.selEstado = state;

          // Save the state data
          db.models.States.create({
            name: state.substring( state.indexOf('*') + 1 ),
            initials: state.substring(0, state.indexOf('*')),
            week_id: data.week
          })
          .then(stateData => { // If saved state data, continue

            _.each(data.fuels, (fuel) => {

              options.form.selCombustivel = fuel;

              // Make the request to get the fuels page
              request(options)
                .then(($) => {

                  // Will start to search after the fourth tr
                  $('.table_padrao.scrollable_table > tr').each(function() {

                    // Get the data starting the fourth 'tr'
                    if($(this).index() <= 3)
                      return;

                    let request = $(this).children('td:nth-child(1)').find('a').attr('href');
                    let indexed = request.substring( request.indexOf(`'`) + 1 );

                    db.models.Cities.create({
                      name: $(this).children('td:nth-child(1)').text(),
                      request: indexed.slice(0, -3),
                      StateId: stateData.id
                    })
                    .then(cityData => {

                      db.models.Statistics.create({
                        type: fuel.substring( fuel.indexOf('*') + 1 ),
                        CityId: cityData.id
                      })
                      .then(statData => {

                        db.models.ConsurmersPrices.create({
                          averagePrice: $(this).children('td:nth-child(3)').text(),
                          standarDeviation: $(this).children('td:nth-child(4)').text(),
                          minPrice: $(this).children('td:nth-child(5)').text(),
                          maxPrice: $(this).children('td:nth-child(6)').text(),
                          averageMargin: $(this).children('td:nth-child(7)').text(),
                          StatisticId: statData.id
                        })
                        .then(consumerData => {

                          db.models.DistribuitionsPrices.create({
                            averagePrice: $(this).children('td:nth-child(8)').text(),
                            standarDeviation: $(this).children('td:nth-child(9)').text(),
                            minPrice: $(this).children('td:nth-child(10)').text(),
                            maxPrice: $(this).children('td:nth-child(11)').text(),
                            StatisticId: statData.id
                          })
                          .then(distribuitionData => {

                            log.success(`Crawled ${statData.type} from ${cityData.name} - ${stateData.initials}`);
                          });

                        });

                      })
                      .catch(err => {
                        log.error(err);
                      });

                    })
                    .catch(err => {
                      log.error(err);
                    });

                  });

                })
                .catch((err) => {

                  log.error(err);
                });
            });

          })
          .catch((err) =>{

            log.error(err);
          });

        });

      })
      .catch((err) => {

          log.error(err);
      });
};
