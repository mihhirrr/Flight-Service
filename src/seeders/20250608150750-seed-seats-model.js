'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("seats", require('../utils/common-utils').Seats);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("seats", null, {});
  }
};