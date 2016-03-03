'use strict';
// Calling ORM
var sequelize = require('../lib/db');
var Sequelize = require('sequelize');

var DistribuitionPrice = require('../models/distribuition-price');
var ConsumerPrice       = require('../models/consumer-price');
var City               = require('../models/city');

var Statistics = sequelize.define('Statistics', {

  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true
  }

}, {

  tableName: 'statistics',
  timestamps: true,
  paranoid: true

});

Statistics.hasOne(DistribuitionPrice);
Statistics.hasOne(ConsumerPrice);
Statistics.belongsTo(City);

module.exports = Statistics;
