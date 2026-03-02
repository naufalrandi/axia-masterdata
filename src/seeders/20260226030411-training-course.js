'use strict';
const { v4: uuidv4 } = require('uuid');
const trainingCourses = require('../data/training-courses.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const trainingCourseRows = [];
    const trainingCourseStandardRows = [];

    for (const item of trainingCourses) {
      const trainingCourseId = uuidv4();

      // pivot table insert
      if (item.standards && item.standards.length) {
        for (const standardNumber of item.standards) {
          const standardId = await queryInterface.rawSelect(
            'Standards',
            {
              where: { standardNumber },
            },
            ['id']
          );

          trainingCourseStandardRows.push({
            trainingCourseId,
            standardId,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }

      delete item.standards;
      trainingCourseRows.push({
        id: trainingCourseId,
        ...item,
        courseOutline: JSON.stringify(item.courseOutline), // JSONB fix
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert parent table dulu
    await queryInterface.bulkInsert("TrainingCourses", trainingCourseRows);

    // Lalu pivot table
    await queryInterface.bulkInsert(
      "TrainingCourseStandards",
      trainingCourseStandardRows
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TrainingCourseStandards", null, {});
    await queryInterface.bulkDelete("TrainingCourses", null, {});
  },
};
