'use strict';
module.exports = (sequelize, DataType) => {

  var Weeks = sequelize.define('Weeks', {

    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    description: {
      type: DataType.STRING,
      allowNull: false
    }

  }, {

    classMethods: {
      associate: (models) => {

        Weeks.hasMany(models.Statistics);
        Weeks.hasMany(models.Prices);
      }
    },
    tableName: 'weeks',
    timestamps: true,
    paranoid: true
  });

  return Weeks;
};
