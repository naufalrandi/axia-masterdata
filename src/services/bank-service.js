const model = require("../models/index");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createBankValidation,
  updateBankValidation,
  updateBankManyValidation,
} = require("../validations/bank-validation");
const { pagination, searchData } = require("../helpers/func");

const getData = async (id) => {
  const result = await model.Bank.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.Bank.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["code", "name"], search);

  const result = await model.Bank.findAndCountAll({
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
  data = validate(createBankValidation, data);
  data.active = true;

  const bank = await checkData({ code: data.code });
  if (bank) throw new ResponseError(400, "bank already exists");

  return await model.Bank.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateBankValidation, data);

  const bank = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
  });

  if (bank) throw new ResponseError(400, "bank already exists");
  return await model.Bank.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.Bank.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateBankManyValidation, data);
  return await model.Bank.destroy({
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
