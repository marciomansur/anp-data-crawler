'use strict';
// NPM Modules
var request = require('request-promise');
var cheerio = require('cheerio');
var config  = require('config');
var _       = require('underscore');

// Getting first parameters
var stateCrawler = require('../app/plugins/state-crawler');

// Scrapping the 'Municipios' page, to get information about
module.exports = () => {

    return new Promise((resolve, reject) => {

        stateCrawler()
            .then((data) => {

                // Request options
                let options = {

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
                        'type': data.type
                    },
                    transform: function(body) {
                        return cheerio.load(body);
                    }
                };

                // Make the request, with de options
                request(options)
                    .then(($) => {

                    })
                    .catch((err) => {

                    });

            })
            .catch((err) => {

            });
    });
};