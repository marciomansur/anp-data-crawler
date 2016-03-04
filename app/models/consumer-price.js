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
    },
    averageMargin: {
      type: DataType.DECIMAL(10, 3),
      allowNull: true
    }

  }, {

    classMethods: {
      associate: (models) => {

        ConsumersPrices.belongsTo(models.Cities);
      }
    },
    tableName: 'consumerPrice',
    timestamps: true,
    paranoid: true

  });

  return ConsumersPrices;
};
