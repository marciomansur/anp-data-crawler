'use strict';
// Calling ORM
var sequelize = require('../lib/db');
var Sequelize = require('sequelize');

var Week = require('../models/week');
var City = require('../models/city');

var State = sequelize.define('State', {

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
  initials: {
    type: Sequelize.STRING(2),
    allowNull: false
  }

}, {

  tableName: 'states',
  timestamps: true,
  paranoid: true

});

State.hasMany(Week);
State.belongsTo(City);

module.exports = State;
