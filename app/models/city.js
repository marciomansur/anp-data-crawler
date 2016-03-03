'use strict';
module.exports = (sequelize, DataType) => {

  var Cities = sequelize.define('Cities', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    }

  }, {

    classMethods: {
      associate: (models) => {

        Cities.hasMany(models.Stations);
        Cities.belongsTo(models.States);
        Cities.hasMany(models.Statistics);
      }
    },
    tableName: 'cities',
    timestamps: true,
    paranoid: true
  });

  return Cities;
};
