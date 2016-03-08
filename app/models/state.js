'use strict';
module.exports = (sequelize, DataType) => {

  let States = sequelize.define('States', {

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
    initials: {
      type: DataType.STRING(2),
      allowNull: false
    }

  }, {

    classMethods: {
      associate: (models) => {
        States.hasMany(models.Cities);
      }
    },
    tableName: 'states',
    timestamps: true,
    paranoid: true

  });

  return States;
};
