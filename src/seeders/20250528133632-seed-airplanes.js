'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("airplanes", [
      {
        ModelNo: "Airbus A320",
        Capacity: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo: "Airbus A330",
        Capacity: 277,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo: "Airbus A350",
        Capacity: 325,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo: "Airbus A380",
        Capacity: 853,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo: "Boeing 737-800",
        Capacity: 160,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo: "Boeing 747",
        Capacity: 416,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo: "Boeing 777",
        Capacity: 396,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo: "Boeing 787 Dreamliner",
        Capacity: 296,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo: "Embraer E195",
        Capacity: 124,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo: "Bombardier CRJ900",
        Capacity: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("airplanes", null, {});
  }
};
