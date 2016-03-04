'use strict';
import db from '../lib/db';

// City class
export default class Statistic {

  findCityData(req, res){

    db.models.Cities
      .findAll({
        attributes: {
          exclude: ['fuelSysId']
        },
        where: {
          name: req.params.name
        },
        include: [
          {
            model: db.models.ConsumersPrices
          },
          {
            model: db.models.DistribuitionsPrices
          }
        ]
      })
      .then(data => {
        res.json({
          success: true,
          status: 200,
          data: data
        });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  findByState(req, res){

    db.models.States
      .findAll({
        attributes: {
          exclude: ['weekId']
        },
        where: {
          initials: req.params.initials
        },
        include: [
          {
            model: db.models.Cities
          }
        ]
      })
      .then(data => {
        res.json({
          success: true,
          status: 200,
          data: data
        });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
}
