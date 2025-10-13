const model = require("../models/index");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createCurrencyValidation,
  updateCurrencyValidation,
  updateCurrencyManyValidation,
} = require("../validations/currency-validation");
const { searchData, pagination } = require("../helpers/func");

const getData = async (id) => {
  const result = await model.Currency.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.Currency.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["code", "name"], search);

  const result = await model.Currency.findAndCountAll({
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
  data = validate(createCurrencyValidation, data);
  const currency = await checkData({ name: data.name });
  if (currency) throw new ResponseError(400, "currency already exists");
  return await model.Currency.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateCurrencyValidation, data);
  const currency = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
  });

  if (currency) throw new ResponseError(400, "currency already exists");
  return await model.Currency.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.Currency.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateCurrencyManyValidation, data);
  return await model.Currency.destroy({
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
