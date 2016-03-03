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
      allowNull: false
    },
    standarDeviation: {
      type: DataType.DECIMAL(10, 3),
      allowNull: false
    },
    minPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: false
    },
    maxPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: false
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
