'use strict';
var fs = require('fs');
var path = require('path');
var config    = require('config');
var Sequelize = require('sequelize'),

  sequelize = new Sequelize(

    config.get("db.name"),
    config.get("db.user"),
    config.get("db.password"), {

    host: config.get("db.host"),
    dialect: config.get("db.sgbd"),
    port: config.get("db.port"),
    logging: false
    });

  let db = {
    sequelize,
    Sequelize,
    models: {}
  };

  const dir = path.join(__dirname, '../models');

  // read all models and add them to "db" object and sequelize module
  fs.readdirSync(dir).forEach((file) => {

    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    db.models[model.name] = model;
  });

  Object.keys(db.models).forEach(key => {
    db.models[key].associate(db.models);
  });

module.exports = db;
