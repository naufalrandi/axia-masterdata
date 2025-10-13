const model = require("../models/index");
const { generateSlug, searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createLanguageValidation,
  updateLanguageValidation,
  updateLanguageManyValidation,
} = require("../validations/language-validation");

const getData = async (slug) => {
  const result = await model.Language.findOne({
    where: { slug },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.Language.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["code", "name"], search);

  const result = await model.Language.findAndCountAll({
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
  data = validate(createLanguageValidation, data);
  data.slug = generateSlug(data.name);

  const language = await checkData({ name: data.name });
  if (language) throw new ResponseError(400, "language already exists");
  return await model.Language.create(data);
};

const getOne = async (slug) => {
  return await getData(slug);
};

const update = async (slug, data) => {
  data.slug = slug;
  data = validate(updateLanguageValidation, data);
  data.slug = generateSlug(data.name);

  const language = await checkData({
    slug: {
      [Op.ne]: slug,
    },
    name: data.name,
  });

  if (language) throw new ResponseError(400, "language already exists");
  return await model.Language.update(data, { where: { slug } });
};

const destroy = async (slug) => {
  await getData(slug);
  return await model.Language.destroy({
    where: { slug },
  });
};

const destroyMany = async (data) => {
  data = validate(updateLanguageManyValidation, data);
  return await model.Language.destroy({
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
