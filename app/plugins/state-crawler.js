'use strict';

var request = require('request');
var cheerio = require('cheerio');
var config  = require('config');

// Scraping the page method
module.exports = (callback) => {

    var json = {};

    // First request: get the states and week
    request
        (config.get("anp_urls.index"), (err, response, html) => {

            if(err)
                return callback(err, false);

            // load the html file as a jQuery DOM
            let $ = cheerio.load(html);

            // Get the data inside the form
            $("#frmAberto").filter(() => {

                var fuels = [];
                var states = [];

                json.week       = $('[name="cod_Semana"]').val();
                json.selWeek    = $('[name="selSemana"]').val();
                json.descWeek   = $('[name="desc_Semana"]').val();
                json.type       = $('[name="type"]').val();

                // Get all the fuels
                $('#selCombustivel option').each(() => {

                    fuels.push($(this).val());
                });

                // Get all the states
                $('#selEstado').each(() => {

                    states.push($(this).val());
                });

                callback(null, json);
            });
        });
};