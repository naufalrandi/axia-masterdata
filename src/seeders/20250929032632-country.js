"use strict";
const languages = require("../data/languages.json");
const currencies = require("../data/currencies.json");
const countries = require("../data/countries.json");
const { provinces } = require("../data/provinces.json");
const { cities } = require("../data/cities.json");
const { districts } = require("../data/districts.json");
const { villages } = require("../data/villages.json");
const { generateSlug } = require("../helpers/func");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Seed Languages
      await queryInterface.bulkInsert(
        "Languages",
        languages.map((lang) => ({
          code: lang.code,
          name: lang.language,
          slug: generateSlug(lang.language),
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        { transaction }
      );

      // Seed Currencies
      await queryInterface.bulkInsert(
        "Currencies",
        currencies.map((cur) => ({
          name: cur.currency_name,
          code: cur.iso_code,
          symbol: cur.symbol,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        { transaction }
      );

      // Seed Countries
      const countryRecords = countries.map((c) => ({
        name: c.name,
        slug: generateSlug(c.name),
        cca2: c.cca2,
        cca3: c.cca3,
        capital: JSON.stringify(c.capital),
        region: c.region,
        subregion: c.subregion,
        flag: c.flag,
        latlng: JSON.stringify(c.latlng),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("Countries", countryRecords, {
        transaction,
      });

      // Fetch inserted countries for relations
      const insertedCountries = await queryInterface.sequelize.query(
        `SELECT id, name FROM "Countries";`,
        { transaction }
      );

      const countryMap = Object.fromEntries(
        insertedCountries[0].map((c) => [c.name, c.id])
      );

      // Relate languages and currencies to countries
      for (const c of countries) {
        const countryId = countryMap[c.name];
        if (!countryId) continue;

        // Languages
        for (const lang of c.languages) {
          const [language] = await queryInterface.sequelize.query(
            `SELECT id FROM "Languages" WHERE name = :name LIMIT 1;`,
            { replacements: { name: lang }, transaction }
          );
          if (language[0]) {
            await queryInterface.bulkInsert(
              "CountryLanguages",
              [
                {
                  countryId,
                  languageId: language[0].id,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
              { transaction }
            );
          }
        }

        // Currencies
        for (const cur of c.currencies) {
          const [currency] = await queryInterface.sequelize.query(
            `SELECT id FROM "Currencies" WHERE name = :name LIMIT 1;`,
            { replacements: { name: cur.name }, transaction }
          );
          if (currency[0]) {
            await queryInterface.bulkInsert(
              "CountryCurrencies",
              [
                {
                  countryId,
                  currencyId: currency[0].id,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
              { transaction }
            );
          }
        }
      }

      const provinceRecords = provinces.map((p) => ({
        id: p.id,
        name: p.name,
        slug: generateSlug(p.name),
        countryId: p.country_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await queryInterface.bulkInsert("Provinces", provinceRecords, {
        transaction,
      });

      const cityRecords = cities.map((c) => ({
        id: c.id,
        name: c.name,
        slug: generateSlug(c.name),
        provinceId: c.province_id, // Asumsi nama field adalah provinceId
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await queryInterface.bulkInsert("Cities", cityRecords, { transaction });

      // 3c. Districts (memerlukan City ID)
      const districtRecords = districts.map((d) => ({
        id: d.id,
        name: d.name,
        slug: generateSlug(d.name),
        cityId: d.regency_id, // Asumsi nama field adalah cityId
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await queryInterface.bulkInsert("Districts", districtRecords, {
        transaction,
      });

      // 3d. Villages (memerlukan District ID)
      const villageRecords = villages.map((v) => ({
        id: v.id,
        name: v.name,
        slug: generateSlug(v.name),
        districtId: v.district_id, // Asumsi nama field adalah districtId
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await queryInterface.bulkInsert("Villages", villageRecords, {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Villages", null, {});
    await queryInterface.bulkDelete("Districts", null, {});
    await queryInterface.bulkDelete("Cities", null, {});
    await queryInterface.bulkDelete("Provinces", null, {});
    await queryInterface.bulkDelete("CountryCurrencies", null, {});
    await queryInterface.bulkDelete("CountryLanguages", null, {});
    await queryInterface.bulkDelete("Countries", null, {});
    await queryInterface.bulkDelete("Currencies", null, {});
    await queryInterface.bulkDelete("Languages", null, {});
  },
};
