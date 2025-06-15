'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Enums } = require('../utils/common-utils')
const { ECONOMY, BUSINESS, FIRSTCLASS } = Enums.TravelClass

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Class_Fares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'flights',
          key:'id'
        }
      },
      travelClass: {
        type: Sequelize.ENUM,
        values: [ ECONOMY, BUSINESS, FIRSTCLASS ],
        allowNull: false
      },
      farePrice: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'INR'
      },
      AllowedLuggage: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('Class_Fares');
  }
};


/// Fucked up with sequelize migrations

////trying to upddate the booking status enums in DB

20250613084855-create-class-fare.js
20250613084855-create-class-fare.js