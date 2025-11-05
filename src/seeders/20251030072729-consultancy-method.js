'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      const consultancyMethods = [
        {
          name: 'Traditional Consultancy Service (TCS)',
          description: null,
          durations: JSON.stringify([
            { value: 6, unit: 'months' },
            { value: 12, unit: 'months' },
            { value: 18, unit: 'months' },
            { value: 24, unit: 'months' },
            { value: 30, unit: 'months' },
            { value: 36, unit: 'months' }
          ]),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Management Systems as a Service (MSaaS)',
          description: null,
          durations: JSON.stringify([
            { value: 3, unit: 'months' }
          ]),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];      

      await queryInterface.bulkInsert('ConsultancyMethods', consultancyMethods, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      await queryInterface.bulkDelete('ConsultancyMethods', {
        name: {
          [Sequelize.Op.in]: [
            'Traditional Consultancy Service (TCS)',
            'Management Systems as a Service (MSaaS)'
          ]
        }
      }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
