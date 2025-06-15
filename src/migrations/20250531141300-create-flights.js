'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull:false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull:false, 
        references:{
          model:'Airplanes',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      departureAirportCode: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'Airports',
          key:'code'
        },
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      arrivalAirportCode: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'Airports',
          key:'code'
        },
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      boardingGate: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('flights');
  }
};