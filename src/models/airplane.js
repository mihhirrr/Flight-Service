"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.flights, {
        foreignKey:'airplaneId',
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      }),
      this.hasMany(models.seats, {
        foreignKey:'airplaneId',
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      }) 
    }
  }
  Airplane.init(
    {
      ModelNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    },
    {
      sequelize,
    }
  );
  return Airplane;
};
