'use strict';

module.exports = (sequelize, DataType) => {

  let ConsumersPrices = sequelize.define('ConsumersPrices', {

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
    },
    averageMargin: {
      type: DataType.DECIMAL(10, 3),
      allowNull: false
    }

  }, {

    classMethods: {
      associate: (models) => {

        ConsumersPrices.belongsTo(models.Statistics);
      }
    },
    tableName: 'consumerPrice',
    timestamps: true,
    paranoid: true

  });

  return ConsumersPrices;
};
