'use strict';
import db from '../lib/db';

const State = db.models.States;

// City class
export default class Statistic {


  findAllWeeks(req, res){

    db.models.Weeks
      .findAll({
        attributes: [
          'id',
          'description'
        ]
      })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  findAllStates(req, res) {

    State
      .findAll({
        attributes: [
          'initials',
          'name'
        ]
      })
      .then(data => {
        res.json(data);
      })
      .catch(err => {

        res.status(400).send(err);
      });
  }

  reportStatistics(req, res){

    db.models.Statistics
      .findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'deletedAt',
            'CityId',
            'FuelId',
            'WeekId'
          ]
        },
        include: [
          {
            model: db.models.Cities,
            include: {
              model: State,
              where: {
                initials: req.params.initials
              }
            }
          },
          {
            model: db.models.Weeks,
            where: {
              id: req.params.week_id
            }
          },
          {
            model: db.models.ConsumersPrices
          },
          {
            model: db.models.DistribuitionsPrices
          },
          {
            model: db.models.Fuels
          }
        ],
        offset: req.params.offset,
        limit: req.params.limit

      })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
}
