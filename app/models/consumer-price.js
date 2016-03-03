'use strict';
// Calling ORM
var sequelize = require('../lib/db');
var Sequelize = require('sequelize');

var Statistic = require('../models/statistic');

var ConsumerPrice = sequelize.define('ConsumerPrice', {

  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  averagePrice: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false
  },
  standarDeviation: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false
  },
  minPrice: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false
  },
  maxPrice: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false
  },
  averageMargin: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false
  }

}, {

  tableName: 'consumerPrice',
  timestamps: true,
  paranoid: true

});

ConsumerPrice.belongsTo(Statistic);

module.exports = ConsumerPrice;
