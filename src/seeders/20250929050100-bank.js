"use strict";
const { banks } = require("../data/banks.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Seed Languages
      await queryInterface.bulkInsert(
        "Banks",
        banks.map((bank) => ({
          code: bank.code,
          name: bank.name,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Banks", null, {});
  },
};
