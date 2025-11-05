"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TrainingCourses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      runningNumber: {
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
      },
      courseTier: {
        type: Sequelize.STRING,
      },
      courseGroup: {
        type: Sequelize.STRING,
      },
      courseTitle: {
        type: Sequelize.STRING,
      },
      maxAttendance: {
        type: Sequelize.INTEGER,
      },
      courseDuration: {
        type: Sequelize.FLOAT,
      },
      rate: {
        type: Sequelize.BIGINT,
      },
      prerequisites: {
        type: Sequelize.JSONB,
      },
      courseOutline: {
        type: Sequelize.JSONB,
      },
      exam: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("TrainingCourses");
  },
};
