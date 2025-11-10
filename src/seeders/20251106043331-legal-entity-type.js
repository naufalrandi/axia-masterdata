"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const legalEntityTypes = [
        {
          nameId: "Perseroan Terbatas",
          nameEn: "Private Limited Liability Company",
          prefix: "PT",
          suffix: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameId: "Perseroan Terbatas Terbuka",
          nameEn: "Publicly Listed Company",
          prefix: "PT",
          suffix: "Tbk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameId: "Commanditaire Vennootschap",
          nameEn: "Limited Partnership",
          prefix: "CV",
          suffix: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameId: "Firma",
          nameEn: "General Partnership",
          prefix: "Fa",
          suffix: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameId: "Perusahaan Umum",
          nameEn: "Public Corporation (State-Owned)",
          prefix: "Perum",
          suffix: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameId: "Persero",
          nameEn: "State-Owned Enterprise with Limited Liability",
          prefix: "Persero",
          suffix: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameId: "Usaha Dagang",
          nameEn: "Sole Proprietorship",
          prefix: "UD",
          suffix: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameId: "Yayasan",
          nameEn: "Foundation",
          prefix: "Yayasan",
          suffix: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await queryInterface.bulkInsert("LegalEntityTypes", legalEntityTypes, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        "LegalEntityTypes",
        {
          nameId: {
            [Sequelize.Op.in]: [
              "Perseroan Terbatas",
              "Perseroan Terbatas Terbuka",
              "Commanditaire Vennootschap",
              "Firma",
              "Perusahaan Umum",
              "Persero",
              "Usaha Dagang",
              "Yayasan",
            ],
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
