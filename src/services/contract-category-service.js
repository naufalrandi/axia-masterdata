const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createContractCategoryValidation,
  updateContractCategoryValidation,
  updateContractCategoryManyValidation,
} = require("../validations/contract-category-validation");

const getData = async (id) => {
  const result = await model.ContractCategory.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.ContractCategory.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["code", "name", "description"], search);

  const result = await model.ContractCategory.findAndCountAll({
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
  data = validate(createContractCategoryValidation, data);

  const nameExists = await checkData({ name: data.name });
  if (nameExists) throw new ResponseError(400, "Contract category name already exists");

  const codeExists = await checkData({ code: data.code });
  if (codeExists) throw new ResponseError(400, "Code already exists");

  return await model.ContractCategory.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateContractCategoryValidation, data);

  await getData(id);

  const nameExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
  });

  if (nameExists) throw new ResponseError(400, "Contract category name already exists");

  const codeExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    code: data.code,
  });

  if (codeExists) throw new ResponseError(400, "Code already exists");

  return await model.ContractCategory.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.ContractCategory.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateContractCategoryManyValidation, data);
  return await model.ContractCategory.destroy({
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