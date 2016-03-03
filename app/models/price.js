'use strict';
// Calling ORM
var sequelize = require('../lib/db');
var Sequelize = require('sequelize');

var Station = require('../models/station');

var Price = sequelize.define('Price', {

  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  sellPrice: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false
  },
  buyPrice: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false
  },
  saleMode: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  provider: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: true
  }

}, {

  tableName: 'prices',
  timestamps: true,
  paranoid: true

});

Price.belongsTo(Station);

module.exports = Price;
