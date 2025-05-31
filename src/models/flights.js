'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
        onDelete:'cascade', 
        onUpdate:'cascade'
      }),
      this.belongsTo(models.Airport,{
        foreignKey:'departureAirportCode',
        targetKey:'code',
        as: 'DepartureAirport',
        onDelete:'cascade', 
        onUpdate:'cascade'
      }),
      this.belongsTo(models.Airport,{
        foreignKey:'arrivalAirportCode',
        targetKey:'code',
        as: 'ArrivalAirport',
        onDelete:'cascade', 
        onUpdate:'cascade'
      })
    }
  }
  flights.init({
    flightNumber: {
      type:DataTypes.STRING,
      allowNull:false
    },
    airplaneId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    departureAirportCode: {
      type:DataTypes.STRING,
      allowNull:false
    },
    arrivalAirportCode: {
      type:DataTypes.STRING,
      allowNull:false
    },
    departureTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    arrivalTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    Fare: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    boardingGate: {
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'flights',
  });
  return flights;
};