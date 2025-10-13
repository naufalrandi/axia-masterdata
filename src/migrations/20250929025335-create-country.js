"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Countries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      cca2: {
        type: Sequelize.STRING,
      },
      cca3: {
        type: Sequelize.STRING,
      },
      capital: {
        type: Sequelize.JSONB,
      },
      region: {
        type: Sequelize.STRING,
      },
      subregion: {
        type: Sequelize.STRING,
      },
      latlng: {
        type: Sequelize.JSONB,
      },
      flag: {
        type: Sequelize.STRING,
      },
      nationalities: {
        type: Sequelize.JSONB,
      },
      callingCodes: {
        type: Sequelize.JSONB,
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
    await queryInterface.dropTable("Countries");
  },
};
