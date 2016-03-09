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
import {checkNumber} from '../plugins/number-helper';
import {scrape_stations} from '../plugins/stations-crawler';

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

      // Verify if this week already has data
      db.models.Weeks.findById(data.week)
        .then(dataWeek => {

          if(_.isEmpty(dataWeek)){

            db.models.Weeks.create({
              id: data.week,
              description: data.descWeek
            })
            .then(newWeek => {

              // First: Will pass in every state
              _.each(data.states, (state) =>{

                options.form.selEstado = state;

                var stateData = {};

                // Save the state data
                db.models.States.create({
                    name: state.substring( state.indexOf('*') + 1 ),
                    initials: state.substring(0, state.indexOf('*')).toLowerCase(),
                  })
                  .then(data => { // If saved state data, continue
                    stateData = data;
                  })
                  .catch((err) =>{
                    log.error(err);
                  });

                // for each fuel, in each state, will get all the statistics
                _.each(data.fuels, (fuel) => {

                  options.form.selCombustivel = fuel;

                  // Make the request to get the fuels page
                  request(options)
                    .then(($) => {

                      db.models.Fuels.findOrCreate({
                        where: {
                          id: fuel.substring(0, fuel.indexOf('*'))
                        },
                        defaults: {
                          description: fuel.substring( fuel.indexOf('*') + 1 )
                        }
                      })
                      .spread(fuelData => {

                        // Will start to search after the fourth tr
                        $('.table_padrao.scrollable_table > tr').each(function() {

                          // Get the data starting the fourth 'tr'
                          if($(this).index() >= 3){

                            let request = $(this).children('td:nth-child(1)').find('a').attr('href');
                            let indexed = request.substring( request.indexOf(`'`) + 1 );
                            let city_request = indexed.slice(0, -3);

                            // Save the city data
                            db.models.Cities.findOrCreate({
                                where: {
                                  id: indexed.substring(0, indexed.indexOf('*'))
                                },
                                defaults: {
                                  name: $(this).children('td:nth-child(1)').text(),
                                  request: city_request,
                                  StateId: stateData.id
                                }
                              })
                              .spread(cityData => {

                                db.models.Statistics.create({
                                  CityId: cityData.id,
                                  FuelId: fuelData.id,
                                  WeekId: newWeek.id
                                })
                                .then(statisticData => {

                                  db.models.ConsumersPrices.create({
                                      averagePrice: checkNumber( $(this).children('td:nth-child(3)').text() ),
                                      standarDeviation: checkNumber( $(this).children('td:nth-child(4)').text() ),
                                      minPrice: checkNumber( $(this).children('td:nth-child(5)').text() ),
                                      maxPrice: checkNumber( $(this).children('td:nth-child(6)').text() ),
                                      averageMargin: checkNumber( $(this).children('td:nth-child(7)').text() ),
                                      StatisticId: statisticData.id
                                    })
                                    .then(data => {});

                                  db.models.DistribuitionsPrices.create({
                                      averagePrice: checkNumber( $(this).children('td:nth-child(8)').text() ),
                                      standarDeviation: checkNumber( $(this).children('td:nth-child(9)').text() ),
                                      minPrice: checkNumber( $(this).children('td:nth-child(10)').text() ),
                                      maxPrice: checkNumber( $(this).children('td:nth-child(11)').text() ),
                                      StatisticId: statisticData.id
                                    })
                                    .then(distribuitionData => {});

                                  // Call the stations crawler, to fill all the stations
                                  scrape_stations(cityData, options, fuelData);

                                  //log.success(`Crawled ${fuelData.description} from ${cityData.name} - ${stateData.initials}`);

                                })
                                .catch(err => {
                                  log.error(err);
                                });

                              });
                          }

                        });

                      });

                    })
                    .catch((err) => {

                      log.error(err);
                    });
                });

              });
            })
            .catch(err => {
              log.error(err);
            });
          }
          else
            log.success(`Weekly data already crawled!`);

        })
        .catch(err => {
          log.error(err);
        });



    })
    .catch((err) => {

        log.error(err);
    });
};
