'use strict';
const iafCodes = require("../data/iaf-codes.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for(const iafCode of iafCodes) {
      const [existing] = await queryInterface.sequelize.query(
        `SELECT id FROM "IafCodes" WHERE code = :code LIMIT 1`,
        {
          replacements: { code: iafCode.code },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      if (!existing) {
        iafCode.createdAt = new Date();
        iafCode.updatedAt = new Date();
        await queryInterface.bulkInsert('IafCodes', [iafCode]);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('IafCodes', null, {});
  }
};
