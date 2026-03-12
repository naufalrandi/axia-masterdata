'use strict';
const iafCodes = require("../data/iaf-codes.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for(const iafCode of iafCodes) {
      iafCode.createdAt = new Date();
      iafCode.updatedAt = new Date();
      await queryInterface.bulkInsert('IafCodes', [iafCode]);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('IafCodes', null, {});
  }
};
