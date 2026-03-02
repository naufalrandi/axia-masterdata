'use strict';
const { v4: uuidv4 } = require("uuid");
const standards = require("../data/standards.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for(const standard of standards) {
      const schemeTagId = await queryInterface.rawSelect(
        'SchemeTags',
        {
          where: { sortName: standard.schemeTag },
        },
        ['id'] // atau cukup 'id'
      );

      standard.id = uuidv4();
      standard.schemeTagId = schemeTagId || null;
      standard.type = JSON.stringify(standard.type);
      standard.createdAt = new Date();
      standard.updatedAt = new Date();

      delete standard.schemeTag;
      await queryInterface.bulkInsert('Standards', [standard]);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Standards', null, {});
  }
};
