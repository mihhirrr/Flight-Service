'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('seats', 'BookingId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'bookings',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('seats', 'BookingId');
  }
};
