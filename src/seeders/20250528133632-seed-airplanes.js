'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert("airplanes", [
      { ModelNo: 'Airbus A320', Capacity: 180, EconomyCapacity: 135, BusinessClassCapacity: 27, FirstClassCapacity: 18, createdAt: now, updatedAt: now },
      { ModelNo: 'Airbus A330', Capacity: 277, EconomyCapacity: 208, BusinessClassCapacity: 42, FirstClassCapacity: 27, createdAt: now, updatedAt: now },
      { ModelNo: 'Airbus A350', Capacity: 325, EconomyCapacity: 228, BusinessClassCapacity: 65, FirstClassCapacity: 32, createdAt: now, updatedAt: now },
      { ModelNo: 'Airbus A380', Capacity: 853, EconomyCapacity: 597, BusinessClassCapacity: 171, FirstClassCapacity: 85, createdAt: now, updatedAt: now },
      { ModelNo: 'Boeing 737-800', Capacity: 160, EconomyCapacity: 128, BusinessClassCapacity: 24, FirstClassCapacity: 8, createdAt: now, updatedAt: now },
      { ModelNo: 'Boeing 747', Capacity: 416, EconomyCapacity: 291, BusinessClassCapacity: 83, FirstClassCapacity: 42, createdAt: now, updatedAt: now },
      { ModelNo: 'Boeing 777', Capacity: 396, EconomyCapacity: 277, BusinessClassCapacity: 79, FirstClassCapacity: 40, createdAt: now, updatedAt: now },
      { ModelNo: 'Boeing 787 Dreamliner', Capacity: 296, EconomyCapacity: 222, BusinessClassCapacity: 44, FirstClassCapacity: 30, createdAt: now, updatedAt: now },
      { ModelNo: 'Embraer E195', Capacity: 124, EconomyCapacity: 99, BusinessClassCapacity: 18, FirstClassCapacity: 6, createdAt: now, updatedAt: now },
      { ModelNo: 'Bombardier CRJ900', Capacity: 90, EconomyCapacity: 72, BusinessClassCapacity: 14, FirstClassCapacity: 4, createdAt: now, updatedAt: now },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("airplanes", null, {});
  }
};
