const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createProcessFunctionValidation,
  updateProcessFunctionValidation,
  updateProcessFunctionManyValidation,
} = require("../validations/process-function-validation");

const getData = async (id) => {
  const result = await model.ProcessFunction.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.ProcessFunction.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["category", "name"], search);

  const result = await model.ProcessFunction.findAndCountAll({
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
  data = validate(createProcessFunctionValidation, data);

  const nameExists = await checkData({ 
    name: data.name,
    category: data.category 
  });
  if (nameExists)
    throw new ResponseError(400, "Process function with this name and category already exists");

  return await model.ProcessFunction.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateProcessFunctionValidation, data);

  await getData(id);

  const nameExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
    category: data.category,
  });

  if (nameExists)
    throw new ResponseError(400, "Process function with this name and category already exists");

  return await model.ProcessFunction.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.ProcessFunction.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateProcessFunctionManyValidation, data);
  return await model.ProcessFunction.destroy({
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