'use strict';
const { fa } = require('zod/v4/locales');
/** @type {import('sequelize-cli').Migration} */


const { Enums } = require('../utils/common-utils')
const { AVAILABLE, BOOKED, RESERVED, CANCELLED, BLOCKED } = Enums.SeatStatus
const { ECONOMY, BUSINESS, FIRSTCLASS } = Enums.TravelClass

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Airplanes',
          key:'id'
        },
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      col: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      TravelClass: {
        type: Sequelize.ENUM,
        values: [ECONOMY, BUSINESS, FIRSTCLASS],
        defaultValue: ECONOMY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: [AVAILABLE, BOOKED, RESERVED, CANCELLED, BLOCKED],
        defaultValue: AVAILABLE,
        allowNull: false,
      },
      isWindowSeat: {
        type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('seats');
  }
};