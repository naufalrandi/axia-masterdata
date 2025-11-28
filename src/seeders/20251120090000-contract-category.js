"use strict";
const contractCategories = require("../data/contract-categories.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Insert Contract Categories
      const categoryRecords = contractCategories.map((c) => ({
        code: c.code,
        name: c.name,
        description: c.description || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("ContractCategories", categoryRecords, {
        transaction,
      });

      // Fetch inserted categories to get their IDs
      const [insertedCats] = await queryInterface.sequelize.query(
        `SELECT id, code FROM "ContractCategories";`,
        { transaction }
      );

      const categoryMap = Object.fromEntries(
        insertedCats.map((r) => [r.code, r.id])
      );

      // Prepare subcategories
      const subcategoryRecords = [];
      const variantRecords = [];

      for (const c of contractCategories) {
        const categoryId = categoryMap[c.code];
        if (!categoryId) continue;

        if (Array.isArray(c.subCategories)) {
          for (const sc of c.subCategories) {
            const tempId = `${c.code}::${sc.code}`; // temp key to map variants after insert
            subcategoryRecords.push({
              code: sc.code,
              name: sc.name,
              description: sc.description || null,
              contractCategoryId: categoryId,
              createdAt: new Date(),
              updatedAt: new Date(),
              _tempKey: tempId,
            });

            if (Array.isArray(sc.variants)) {
              for (const v of sc.variants) {
                variantRecords.push({
                  tempSubKey: tempId,
                  code: v.code,
                  name: v.name,
                  description: v.description || null,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                });
              }
            }
          }
        }
      }

      // Since we added a custom _tempKey field which doesn't exist in the table, remove it before insert
      const subcategoryInsert = subcategoryRecords.map((r) => {
        const copy = { ...r };
        delete copy._tempKey;
        return copy;
      });

      await queryInterface.bulkInsert(
        "ContractSubcategories",
        subcategoryInsert,
        { transaction }
      );

      // Fetch inserted subcategories to map back to temp keys
      const [insertedSubcats] = await queryInterface.sequelize.query(
        `SELECT id, code, "contractCategoryId" FROM "ContractSubcategories";`,
        { transaction }
      );

      // Build map from our temp key to real id
      const subcatMap = {};
      for (const r of subcategoryRecords) {
        const matched = insertedSubcats.find(
          (s) =>
            s.code === r.code &&
            Number(s.contractCategoryId) === Number(r.contractCategoryId)
        );
        if (matched) subcatMap[r._tempKey] = matched.id;
      }

      // Build variant insert records with real contractSubcategoryId
      const variantInsert = variantRecords
        .map((v) => {
          const subId = subcatMap[v.tempSubKey];
          if (!subId) return null;
          return {
            contractSubcategoryId: subId,
            code: v.code,
            name: v.name,
            description: v.description || null,
            createdAt: v.createdAt,
            updatedAt: v.updatedAt,
          };
        })
        .filter(Boolean);

      if (variantInsert.length > 0) {
        await queryInterface.bulkInsert("ContractVariants", variantInsert, {
          transaction,
        });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete in reverse order to respect foreign keys
    await queryInterface.bulkDelete("ContractVariants", null, {});
    await queryInterface.bulkDelete("ContractSubcategories", null, {});
    await queryInterface.bulkDelete("ContractCategories", null, {});
  },
};
