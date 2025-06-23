'use strict';
const {
  Model
} = require('sequelize');

const { Enums } = require('../utils/common-utils')
const { AVAILABLE, BOOKED, RESERVED, CANCELLED, BLOCKED } = Enums.SeatStatus
const { ECONOMY, BUSINESS, FIRSTCLASS } = Enums.TravelClass

module.exports = (sequelize, DataTypes) => {
  class seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
        onDelete:'cascade', 
        onUpdate:'cascade'
      })
    }
  }
  seats.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TravelClass: {
      type: DataTypes.ENUM,
      values: [ECONOMY, BUSINESS, FIRSTCLASS],
      allowNull: false,
      defaultValue: ECONOMY
    },
    status: {
      type: DataTypes.ENUM,
      values: [AVAILABLE, BOOKED, RESERVED, CANCELLED, BLOCKED],
      allowNull: false,
      defaultValue: AVAILABLE
    },
    isWindowSeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    BookingID:{
      type: DataTypes.INTEGER,
      references:{
        model: 'bookings',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'seats',
  });
  return seats;
};