'use strict';

module.exports = (sequelize, DataType) => {

  let Prices = sequelize.define('Prices', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: {
      type: DataType.STRING(50),
      allowNull: false
    },
    sellPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: false
    },
    buyPrice: {
      type: DataType.DECIMAL(10, 3),
      allowNull: false
    },
    saleMode: {
      type: DataType.STRING(10),
      allowNull: false
    },
    provider: {
      type: DataType.STRING(20),
      allowNull: false
    },
    date: {
      type: DataType.DATE,
      allowNull: true
    }

  }, {

    classMethods: {
      associate: (models) => {

        Prices.belongsTo(models.Stations);
      }
    },
    tableName: 'prices',
    timestamps: true,
    paranoid: true

  });

  return Prices;
};


