const model = require("../models/index");
const {
  generateSlug,
  searchData,
  pagination,
  getIdModel,
} = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createProvinceValidation,
  updateProvinceValidation,
  updateProvinceManyValidation,
} = require("../validations/province-validation");

const getData = async (slug) => {
  const result = await model.Province.findOne({
    where: { slug },
    include: ["country"],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.Province.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search, countryId } = data;
  const fieldSearch = searchData(["name"], search);

  const result = await model.Province.findAndCountAll({
    where: {
      ...fieldSearch,
      ...(countryId && {
        countryId,
      }),
    },
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createProvinceValidation, data);

  data.id = await getIdModel("Province");
  data.slug = generateSlug(data.name);
  const check = await checkData({ name: data.name });
  if (check) throw new ResponseError(400, "Province already exists");
  return await model.Province.create(data);
};

const getOne = async (slug) => {
  return await getData(slug);
};

const update = async (slug, data) => {
  data.slug = slug;
  data = validate(updateProvinceValidation, data);

  const check = await checkData({
    name: data.name,
    slug: {
      [Op.ne]: slug,
    },
  });

  data.slug = generateSlug(data.name);
  if (check) throw new ResponseError(400, "Province already exists");
  return await model.Province.update(data, { where: { slug } });
};

const destroy = async (slug) => {
  await getData(slug);
  return await model.Province.destroy({
    where: { slug },
  });
};

const destroyMany = async (data) => {
  data = validate(updateProvinceManyValidation, data);
  return await model.Province.destroy({
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
