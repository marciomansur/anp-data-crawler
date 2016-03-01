var request = require('request');
var fs      = require('fs');
var cheerio = require('cheerio');
var config  = require('config');

// Scraping the page method
exports.scrape = (callback) => {

    // First request: get the states and week
    request
        (config.get("anp_urls.index"), (err, response, html) => {

            if(err)
                return callback(err, false);

            var $ = cheerio.load(html);


        });

};