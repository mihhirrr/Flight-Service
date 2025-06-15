'use strict';
const {
  Model
} = require('sequelize');


const { Enums } = require('../utils/common-utils')
const { ECONOMY, BUSINESS, FIRSTCLASS } = Enums.TravelClass

module.exports = (sequelize, DataTypes) => {
  class Class_Fare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.flights,{
        foreignKey:'flightId',
        onDelete:'cascade', 
        onUpdate:'cascade'
      })
    }
  }
  Class_Fare.init({
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    travelClass: {
      type: DataTypes.ENUM,
      values: [ ECONOMY, BUSINESS, FIRSTCLASS ],
      allowNull: false
    },
    farePrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'INR'
    },
    AllowedLuggage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Class_Fare',
    indexes: [
      {
        unique: true,
        fields: ['flightId', 'travelClass'], 
        name: 'unique_flight_class_constraint'
      }
    ]
  });
  return Class_Fare;
};