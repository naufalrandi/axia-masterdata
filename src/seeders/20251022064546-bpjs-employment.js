"use strict";

const bpjsData = require("../data/bpjs.json");
const employeeCompensationData = require("../data/employee-compensation.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Seed BPJS Employment data
      const bpjsEmploymentData = bpjsData.map((item) => ({
        shortName: item.short_name,
        name: item.name,
        percentageOfCompany: item.percentageOfCompany,
        percentageOfEmployee: item.percentageOfEmployee,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("BPJSemployments", bpjsEmploymentData, {
        transaction,
      });

      // Seed Employee Compensation data
      const employeeCompensationSeederData = employeeCompensationData.map(
        (item) => ({
          type: item.type,
          label: item.label,
          scheme: item.scheme,
          unit: item.unit,
          method: item.method,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      await queryInterface.bulkInsert(
        "EmployeeCompensations",
        employeeCompensationSeederData,
        {
          transaction,
        }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete("EmployeeCompensations", null, {
        transaction,
      });

      await queryInterface.bulkDelete("BPJSemployments", null, {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
