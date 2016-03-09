'use strict';

module.exports = (sequelize, DataType) => {

  let DistribuitionsPrices = sequelize.define('DistribuitionsPrices', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    averagePrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: true
    },
    standarDeviation: {
      type: DataType.DECIMAL(10, 3),
      allowNull: true
    },
    minPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: true
    },
    maxPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: true
    }

  }, {

    classMethods: {
      associate: (models) => {

        DistribuitionsPrices.belongsTo(models.Statistics);
      }
    },
    tableName: 'distribuitionPrice',
    timestamps: true,
    paranoid: true

  });

  return DistribuitionsPrices;
};
