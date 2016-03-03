'use strict';
// NPM Modules
// NOTE: Some modules cannot be used in es6 or outside the strict mode)
var request = require('request-promise');
var cheerio = require('cheerio');
var config  = require('config');
var _       = require('underscore');

// Getting first parameters
var stateCrawler = require('../plugins/state-crawler');

// Scrapping the 'Municipios' page, to get information about
module.exports = () => {

  return new Promise((resolve, reject) => {

    // Created a standard request, and to "eachs" to find data for
    // every fuel in every state
    stateCrawler()
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

        let states = [];
        let statistics = [];

        // First: Will pass in every state
        _.each(data.states, (state) =>{

          options.form.selEstado = state;

          var dataState = {};
          dataState.cities = [];
          dataState.state = state.substring( state.indexOf('*') + 1 );;

          _.each(data.fuels, (fuel) => {

            options.form.selCombustivel = fuel;

            // Make the request, with de options
            request(options)
              .then(($) => {

                // Will start to search after the fourth tr
                $('.table_padrao.scrollable_table > tr').each(function(){

                  if($(this).index() <= 3){

                    return;
                  }

                  // Create the statistics array
                  let stats = {
                    distribuitionPrice: {},
                    consumerPrice: {}
                  };

                  stats.name = $(this).children('td:nth-child(1)').text();
                  stats.fuel = fuel.substring( fuel.indexOf('*') + 1 );

                  // Consumer Price
                  stats.consumerPrice.averagePrice     = $(this).children('td:nth-child(3)').text();
                  stats.consumerPrice.standarDeviation = $(this).children('td:nth-child(4)').text();
                  stats.consumerPrice.minPrice         = $(this).children('td:nth-child(5)').text();
                  stats.consumerPrice.maxPrice         = $(this).children('td:nth-child(6)').text();
                  stats.consumerPrice.averageMargin    = $(this).children('td:nth-child(7)').text();

                  // Distribuition Price
                  stats.distribuitionPrice.averagePrice     = $(this).children('td:nth-child(8)').text();
                  stats.distribuitionPrice.standarDeviation = $(this).children('td:nth-child(9)').text();
                  stats.distribuitionPrice.minPrice         = $(this).children('td:nth-child(10)').text();
                  stats.distribuitionPrice.maxPrice         = $(this).children('td:nth-child(11)').text();

                  statistics.push(stats);

                });

                dataState.cities.push(statistics);

              })
              .catch((err) => {

                  reject(err);
                  console.log(`Error at crawling data: ${err}`);
              });
          });

          states.push(dataState);

          resolve(states);
        });

      })
      .catch((err) => {

          console.log(`Error at crawling data: ${err}`);
      });
  });
};