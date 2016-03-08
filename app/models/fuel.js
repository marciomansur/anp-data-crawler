'use strict';
module.exports = (sequelize, DataType) => {

  var Fuels = sequelize.define('Fuels', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    description: {
      type: DataType.STRING,
      allowNull: false
    }

  }, {

    classMethods: {
      associate: (models) => {

        Fuels.hasMany(models.Stations);
        Fuels.hasMany(models.Statistics);
      }
    },
    tableName: 'fuels',
    timestamps: true,
    paranoid: true
  });

  return Fuels;
};
