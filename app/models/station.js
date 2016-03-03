'use strict';
// Calling ORM
var sequelize = require('../lib/db');
var Sequelize = require('sequelize');

var Price = require('../models/price');
var City = require('../models/city');

var Station = sequelize.define('Station', {

  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  area: {
    type: Sequelize.STRING,
    allowNull: false
  },
  flag: {
    type: Sequelize.STRING,
    allowNull: true
  }

}, {

  tableName: 'stations',
  timestamps: true,
  paranoid: true
});

Station.hasMany(Price);
Station.belongsTo(City);

module.exports = Station;
