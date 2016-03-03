'use strict';
// Calling ORM
var sequelize = require('../lib/db');
var Sequelize = require('sequelize');

var State = require('../models/state');

var Week = sequelize.define('Week', {

  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  sys_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {

  tableName: 'weeks',
  timestamps: true,
  paranoid: true
});

Week.belongsTo(State);

module.exports = Week;
