'use strict';
module.exports = (sequelize, DataType) => {

  let Stations = sequelize.define('Stations', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    address: {
      type: DataType.STRING,
      allowNull: false
    },
    area: {
      type: DataType.STRING,
      allowNull: false
    },
    flag: {
      type: DataType.STRING,
      allowNull: true
    }

  }, {

    classMethods: {
      associate: (models) => {

        Stations.hasMany(models.Prices);
        Stations.belongsTo(models.Cities);
        Stations.belongsTo(models.Fuels);
      }
    },
    tableName: 'stations',
    timestamps: true,
    paranoid: true
  });

  return Stations;
};

