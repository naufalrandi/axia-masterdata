const model = require("../models/index");
const {
  generateSlug,
  searchData,
  pagination,
  getIdModel,
} = require("../helpers/func");
const { Op, where } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createCityValidation,
  updateCityValidation,
  updateCityManyValidation,
} = require("../validations/city-validation");

const getData = async (slug) => {
  const result = await model.City.findOne({
    where: { slug },
    include: ["province"],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.City.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search, provinceId } = data;
  const fieldSearch = searchData(["name"], search);

  const result = await model.City.findAndCountAll({
    where: {
      ...fieldSearch,
      ...(provinceId && {
        provinceId,
      }),
    },
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createCityValidation, data);

  data.id = await getIdModel("City");
  data.slug = generateSlug(data.name);
  const check = await checkData({ name: data.name });
  if (check) throw new ResponseError(400, "City already exists");
  return await model.City.create(data);
};

const getOne = async (slug) => {
  return await getData(slug);
};

const update = async (slug, data) => {
  data.slug = slug;
  data = validate(updateCityValidation, data);

  const check = await checkData({
    name: data.name,
    slug: {
      [Op.ne]: slug,
    },
  });

  data.slug = generateSlug(data.name);
  if (check) throw new ResponseError(400, "City already exists");
  return await model.City.update(data, { where: { slug } });
};

const destroy = async (slug) => {
  await getData(slug);
  return await model.City.destroy({
    where: { slug },
  });
};

const destroyMany = async (data) => {
  data = validate(updateCityManyValidation, data);
  return await model.City.destroy({
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
