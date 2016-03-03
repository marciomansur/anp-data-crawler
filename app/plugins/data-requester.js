'use strict';

var request = require('request-promise');
var cheerio = require('cheerio');
var config  = require('config');

// Scraping the Index page method
module.exports = () => {

  return new Promise((resolve, reject) => {

    var json = {};

    let options = {

        url: config.get('anp_urls.index'),
        transform: function(body) {
            return cheerio.load(body);
        }
    };

    // First request: get the states and week
    request
      (options)
        .then(($) => {

          // Get the data inside the form
          $("#frmAberto").filter(() => {

            var fuels = [];
            var states = [];

            json.week       = $('[name="cod_Semana"]').val();
            json.selWeek    = $('[name="selSemana"]').val();
            json.descWeek   = $('[name="desc_Semana"]').val();
            json.type       = $('[name="tipo"]').val();

            // Get all the fuels (code can't be es6)
            $('#selCombustivel option').each(function() {

                fuels.push($(this).val());
            });

            // Get all the states
            $('[name="selEstado"]>option').each(function() {

                states.push($(this).val());
            });

            json.fuels  = fuels;
            json.states = states;

            resolve(json);
          });
        })
        .catch((err) => {

            reject(err);
        });
  });

};
