'use strict';
const { v4: uuidv4 } = require("uuid");
const schemeTags = require("../data/scheme-tags.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const formated = schemeTags.map((item) => {
      return {
        id: uuidv4(),
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert("SchemeTags", formated );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SchemeTags", null, {});
  }
};
