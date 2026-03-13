'use strict';
const { v4: uuidv4 } = require("uuid");
const newStandards = require("../data/new-standards.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const standard of newStandards) {
      // 1. Cek apakah standardNumber sudah ada di database
      const existingStandard = await queryInterface.rawSelect(
        'Standards',
        {
          where: { standardNumber: standard.standardNumber },
        },
        ['id']
      );

      // 2. Jika sudah ada, lewati (skip) ke data berikutnya
      if (existingStandard) {
        console.log(`Skipping: Standard ${standard.standardNumber} already exists.`);
        continue;
      }

      // 3. Ambil schemeTagId berdasarkan sortName
      const schemeTagId = await queryInterface.rawSelect(
        'SchemeTags',
        {
          where: { sortName: standard.schemeTag },
        },
        ['id']
      );

      // 4. Persiapkan data untuk insert
      const dataToInsert = {
        ...standard,
        id: uuidv4(),
        schemeTagId: schemeTagId || null,
        type: JSON.stringify(standard.type),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Hapus property yang tidak ada di kolom tabel
      delete dataToInsert.schemeTag;

      await queryInterface.bulkInsert('Standards', [dataToInsert]);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Standards', null, {});
  }
};
