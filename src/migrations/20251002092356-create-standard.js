"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Standards", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      schemeTagId: {
        type: Sequelize.UUID,
      },
      prefix: {
        type: Sequelize.STRING,
      },
      standardNumber: {
        type: Sequelize.INTEGER,
      },
      issueYear: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.JSONB,
      },
      title: {
        type: Sequelize.STRING,
      },
      rate: {
        type: Sequelize.BIGINT,
      },
      document: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Standards");
  },
};
