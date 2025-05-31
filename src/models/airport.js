'use strict';
const {
  Model
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {

    static associate(models) {
      //  association 
      this.belongsTo(models.City, {
        foreignKey:'cityID',
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      }),
      this.hasMany(models.flights, {
        foreignKey:'departureAirportCode',
        sourceKey:'code',
        as: 'DepartureAirport',
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      }),
      this.hasMany(models.flights, {
        foreignKey:'arrivalAirportCode',
        sourceKey:'code',
        as: 'ArrivalAirport',
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      })
    }
  }
  Airport.init({
    Name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    code: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    Address: {
      type: DataTypes.STRING,
    },
    cityID: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};