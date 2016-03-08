'use strict';

module.exports = (sequelize, DataType) => {

  let Prices = sequelize.define('Prices', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sellPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: false
    },
    buyPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: true
    },
    saleMode: {
      type: DataType.STRING(10),
      allowNull: true
    },
    provider: {
      type: DataType.STRING(20),
      allowNull: true
    },
    date: {
      type: DataType.DATE,
      allowNull: true
    }

  }, {

    classMethods: {
      associate: (models) => {

        Prices.belongsTo(models.Stations);
        Prices.belongsTo(models.Weeks);
      }
    },
    tableName: 'prices',
    timestamps: true,
    paranoid: true

  });

  return Prices;
};


