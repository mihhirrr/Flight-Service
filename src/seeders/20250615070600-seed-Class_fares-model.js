'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    const Data = [
      { flightId: 10, travelClass: 'Economy', farePrice: 4500.00, currency: 'INR', AllowedLuggage: 15, createdAt: now, updatedAt: now },
      { flightId: 10, travelClass: 'Business', farePrice: 8200.00, currency: 'INR', AllowedLuggage: 25, createdAt: now, updatedAt: now },
      { flightId: 10, travelClass: 'First-class', farePrice: 12000.00, currency: 'INR', AllowedLuggage: 30, createdAt: now, updatedAt: now },

      { flightId: 11, travelClass: 'Economy', farePrice: 3900.00, currency: 'INR', AllowedLuggage: 15, createdAt: now, updatedAt: now },
      { flightId: 11, travelClass: 'Business', farePrice: 7100.00, currency: 'INR', AllowedLuggage: 25, createdAt: now, updatedAt: now },
      { flightId: 11, travelClass: 'First-class', farePrice: 10500.00, currency: 'INR', AllowedLuggage: 30, createdAt: now, updatedAt: now },

      { flightId: 12, travelClass: 'Economy', farePrice: 3500.00, currency: 'INR', AllowedLuggage: 15, createdAt: now, updatedAt: now },
      { flightId: 12, travelClass: 'Business', farePrice: 6700.00, currency: 'INR', AllowedLuggage: 25, createdAt: now, updatedAt: now },
      { flightId: 12, travelClass: 'First-class', farePrice: 9900.00, currency: 'INR', AllowedLuggage: 30, createdAt: now, updatedAt: now },

      { flightId: 13, travelClass: 'Economy', farePrice: 4100.00, currency: 'INR', AllowedLuggage: 15, createdAt: now, updatedAt: now },
      { flightId: 13, travelClass: 'Business', farePrice: 7600.00, currency: 'INR', AllowedLuggage: 25, createdAt: now, updatedAt: now },
      { flightId: 13, travelClass: 'First-class', farePrice: 11100.00, currency: 'INR', AllowedLuggage: 30, createdAt: now, updatedAt: now },

      { flightId: 14, travelClass: 'Economy', farePrice: 4300.00, currency: 'INR', AllowedLuggage: 15, createdAt: now, updatedAt: now },
      { flightId: 14, travelClass: 'Business', farePrice: 7900.00, currency: 'INR', AllowedLuggage: 25, createdAt: now, updatedAt: now },
      { flightId: 14, travelClass: 'First-class', farePrice: 11500.00, currency: 'INR', AllowedLuggage: 30, createdAt: now, updatedAt: now }
    ]
    
    return queryInterface.bulkInsert('class_fares', Data)
  },

  async down (queryInterface, Sequelize) {   
    return queryInterface.bulkDelete('class_fares', null, {} )
  }
};
