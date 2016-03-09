'use strict';
import request from 'request-promise';
import cheerio from 'cheerio';
import config  from 'config';
import moment  from 'moment';

// Get models to store data
import db from '../lib/db';
import * as log from '../plugins/log-helper';
import {checkNumber} from '../plugins/number-helper';

export function scrape_stations(city, options, fuel) {

  options.url = config.get('anp_urls.stations');
  options.form.selMunicipio = city.request;
  options.form.cod_combustivel = fuel.id;

  //// Request options
  //var options = {
  //
  //  url: config.get('anp_urls.stations'),
  //  method: 'POST',
  //  headers: {
  //    'Host': 'www.anp.gov.br',
  //    'Connection': 'keep-alive',
  //    'Cache-Control': 'max-age=0',
  //    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  //    'Origin': 'http://www.anp.gov.br',
  //    'Upgrade-Insecure-Requests': '1',
  //    'Content-Type': 'application/x-www-form-urlencoded'
  //  },
  //  form: {
  //    'cod_Semana': data.week,
  //    'desc_Semana': data.descWeek,
  //    'tipo': data.type,
  //    'selMunicipio': city,
  //    'cod_combustivel': fuel_id
  //  },
  //  transform: function(body) {
  //    return cheerio.load(body);
  //  }
  //};
  o
  request(options)
      .then(($) => {

        console.log(options);

        $(".table_padrao > tr").each(function() {

          if($(this).index() >= 1){

            db.models.Stations.create({
              name: $(this).children('td:nth-child(1)').text(),
              address: $(this).children('td:nth-child(2)').text(),
              area: $(this).children('td:nth-child(3)').text(),
              flag: $(this).children('td:nth-child(4)').text(),
              CityId: city.id,
              FuelId: fuel.id
            })
            .then(stationData => {

              db.models.Prices.create({
                sellPrice: checkNumber($(this).children('td:nth-child(5)').text()),
                buyPrice: checkNumber($(this).children('td:nth-child(6)').text()),
                saleMode: $(this).children('td:nth-child(5)').text(),
                provider: $(this).children('td:nth-child(6)').text(),
                date: moment($(this).children('td:nth-child(7)').text()).format(),
                StationId: stationData.id
              })
              .then(success => {});

            })
            .catch(err => {
              log.error(err);
            });

          }

        });

      })
      .catch(err => {
        log.error(err);
      });

}
