'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Airplanes', 'EconomyCapacity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Airplanes', 'BusinessClassCapacity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Airplanes', 'FirstClassCapacity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Airplanes', 'EconomyCapacity');
    await queryInterface.removeColumn('Airplanes', 'BusinessClassCapacity');
    await queryInterface.removeColumn('Airplanes', 'FirstClassCapacity');
  }
};
