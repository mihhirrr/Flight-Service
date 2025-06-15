'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.removeColumn('flights', 'Fare')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('flights', 'Fare', {
        type: Sequelize.INTEGER,
        allowNull:false
    })
  }
};
