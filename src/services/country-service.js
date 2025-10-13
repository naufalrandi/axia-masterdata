const model = require("../models/index");
const { generateSlug, searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createCountryValidation,
  updateCountryValidation,
  updateCountryManyValidation,
} = require("../validations/country-validation");

const getData = async (slug) => {
  const result = await model.Country.findOne({
    where: { slug },
    include: [
      {
        model: model.Language,
        as: "languages",
        through: { attributes: [] },
      },
      {
        model: model.Currency,
        as: "currencies",
        through: { attributes: [] },
      },
    ],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.Country.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["name"], search);

  const result = await model.Country.findAndCountAll({
    where: {
      ...fieldSearch,
    },
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createCountryValidation, data);
  const languageIds = data.languages.map((item) => item.id);
  const currencyIds = data.currencies.map((item) => item.id);
  delete data.languages;
  delete data.currencies;

  data.slug = generateSlug(data.name);
  const check = await checkData({ name: data.name });
  if (check) throw new ResponseError(400, "country already exists");

  await model.sequelize.transaction(async (transaction) => {
    const country = await model.Country.create(data, { transaction });
    if (languageIds && languageIds.length > 0) {
      await country.setLanguages(languageIds, { transaction });
    }

    if (currencyIds && currencyIds.length > 0) {
      await country.setCurrencies(currencyIds, { transaction });
    }
  });

  return "Created successfully";
};

const getOne = async (slug) => {
  return await getData(slug);
};

const update = async (slug, data) => {
  data.slug = slug;
  data = validate(updateCountryValidation, data);
  const languageIds = data.languages.map((item) => item.id);
  const currencyIds = data.currencies.map((item) => item.id);
  delete data.languages;
  delete data.currencies;

  const country = await model.Country.findOne({ where: { slug: data.slug } });
  if (!country) throw new ResponseError(404, "Country not found");

  if (data.name && data.name !== country.name) {
    data.slug = generateSlug(data.name);

    const check = await checkData({
      name: data.name,
      id: { [Op.ne]: country.id },
    });
    if (check) throw new ResponseError(400, "Country name already exists");
  } else {
    delete data.slug;
  }

  await model.sequelize.transaction(async (transaction) => {
    await country.update(data, { transaction });
    if (languageIds !== undefined) {
      const ids = languageIds.length > 0 ? languageIds : [];
      await country.setLanguages(ids, { transaction });
    }

    if (currencyIds !== undefined) {
      const ids = currencyIds.length > 0 ? currencyIds : [];
      await country.setCurrencies(ids, { transaction });
    }
  });

  return "Updated successfully";
};

const destroy = async (slug) => {
  await getData(slug);
  return await model.Country.destroy({
    where: { slug },
  });
};

const destroyMany = async (data) => {
  data = validate(updateCountryManyValidation, data);
  return await model.Country.destroy({
    where: {
      id: {
        [Op.in]: data.ids,
      },
    },
  });
};

module.exports = {
  getAll,
  create,
  getOne,
  update,
  destroy,
  destroyMany,
};
