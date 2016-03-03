'use strict';
module.exports = (sequelize, DataType) => {

  let Statistics = sequelize.define('Statistics', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: {
      type: DataType.STRING,
      allowNull: true
    }

  }, {

    classMethods: {
      associate: (models) => {

        Statistics.hasOne(models.DistribuitionsPrices);
        Statistics.hasOne(models.ConsumersPrices);
        Statistics.belongsTo(models.Cities);
      }
    },
    tableName: 'statistics',
    timestamps: true,
    paranoid: true

  });

  return Statistics;
};
