'use strict';
// Calling ORM
var sequelize = require('../lib/db');
var Sequelize = require('sequelize');

var State     = require('../models/state');
var Station   = require('../models/station');
var Statistic = require('../models/statistic');

var City = sequelize.define('City', {

  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }

}, {

  tableName: 'cities',
  timestamps: true,
  paranoid: true
});

// Associations
City.hasMany(Station);
City.belongsTo(State);
City.hasMany(Statistic);

module.exports = City;
