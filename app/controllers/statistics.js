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
