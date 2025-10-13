'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      { hierarchy: 'Executive', level: 1, name: 'Chief Executive' },
      { hierarchy: 'Executive', level: 2, name: 'Executive Officer' },
      { hierarchy: 'Directorate', level: 3, name: 'Senior Director' },
      { hierarchy: 'Directorate', level: 4, name: 'Director' },
      { hierarchy: 'Division', level: 5, name: 'Senior Division Manager' },
      { hierarchy: 'Division', level: 6, name: 'Division Manager' },
      { hierarchy: 'Department', level: 7, name: 'Senior Department Manager' },
      { hierarchy: 'Department', level: 8, name: 'Department Manager' },
      { hierarchy: 'Unit', level: 9, name: 'Unit Manager' },
      { hierarchy: 'Unit', level: 10, name: 'Unit Supervisor' },
      { hierarchy: 'Unit', level: 11, name: 'Officer/Associate' },
      { hierarchy: 'Unit', level: 12, name: 'Apprentice/Intern' },
    ].map(item => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('EmploymentLevels', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EmploymentLevels', null, {});
  }
};