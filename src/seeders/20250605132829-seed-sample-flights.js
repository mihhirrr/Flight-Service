'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const flightsSeedData = [
      {
        flightNumber: 'AI506',
        airplaneId: 43,
        departureAirportCode: 'MUM',
        arrivalAirportCode: 'HYD',
        departureTime: '2025-06-19 08:15:00',
        arrivalTime: '2025-06-19 09:45:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flightNumber: '6E777',
        airplaneId: 44,
        departureAirportCode: 'MUM',
        arrivalAirportCode: 'HYD',
        departureTime: '2025-06-19 14:30:00',
        arrivalTime: '2025-06-19 15:55:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
      // BLR -> PNQ multiple flights
      {
        flightNumber: 'IX503',
        airplaneId: 45,
        departureAirportCode: 'BLR',
        arrivalAirportCode: 'PNQ',
        departureTime: '2025-06-14 09:30:00',
        arrivalTime: '2025-06-14 11:10:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flightNumber: 'IX504',
        airplaneId: 46,
        departureAirportCode: 'BLR',
        arrivalAirportCode: 'PNQ',
        departureTime: '2025-06-14 15:00:00',
        arrivalTime: '2025-06-14 16:40:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
      // MUM -> BLR multiple flights
      {
        flightNumber: 'AI203',
        airplaneId: 47,
        departureAirportCode: 'MUM',
        arrivalAirportCode: 'BLR',
        departureTime: '2025-06-10 12:30:00',
        arrivalTime: '2025-06-10 14:45:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flightNumber: 'AI204',
        airplaneId: 48,
        departureAirportCode: 'MUM',
        arrivalAirportCode: 'BLR',
        departureTime: '2025-06-10 18:00:00',
        arrivalTime: '2025-06-10 20:15:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
      // HYD -> CCU multiple flights
      {
        flightNumber: '6E412',
        airplaneId: 49,
        departureAirportCode: 'HYD',
        arrivalAirportCode: 'CCU',
        departureTime: '2025-06-11 16:30:00',
        arrivalTime: '2025-06-11 19:20:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flightNumber: '6E413',
        airplaneId: 50,
        departureAirportCode: 'HYD',
        arrivalAirportCode: 'CCU',
        departureTime: '2025-06-11 20:00:00',
        arrivalTime: '2025-06-11 22:50:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
      // PNQ -> HYD multiple flights
      {
        flightNumber: 'AI351',
        airplaneId: 51,
        departureAirportCode: 'PNQ',
        arrivalAirportCode: 'HYD',
        departureTime: '2025-06-15 18:00:00',
        arrivalTime: '2025-06-15 19:30:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flightNumber: 'AI352',
        airplaneId: 52,
        departureAirportCode: 'PNQ',
        arrivalAirportCode: 'HYD',
        departureTime: '2025-06-15 21:00:00',
        arrivalTime: '2025-06-15 22:30:00',
        boardingGate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    

    await queryInterface.bulkInsert("flights", flightsSeedData);
  },

  async down (queryInterface, Sequelize) {
    //drops flight table
        await queryInterface.bulkDelete("flights", null, {});
  }
};
