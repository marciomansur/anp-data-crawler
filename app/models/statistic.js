'use strict';
module.exports = (sequelize, DataType) => {

  var Statistics = sequelize.define('Statistics', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }

  }, {

    classMethods: {
      associate: (models) => {

        Statistics.belongsTo(models.Cities);
        Statistics.belongsTo(models.Fuels);
        Statistics.belongsTo(models.Weeks);
        Statistics.hasOne(models.DistribuitionsPrices);
        Statistics.hasOne(models.ConsumersPrices);
      }
    },
    tableName: 'statistics',
    timestamps: true,
    paranoid: true
  });

  return Statistics;
};
