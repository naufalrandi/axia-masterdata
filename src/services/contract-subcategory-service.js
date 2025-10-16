const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createContractSubcategoryValidation,
  updateContractSubcategoryValidation,
  updateContractSubcategoryManyValidation,
} = require("../validations/contract-subcategory-validation");

const getData = async (id) => {
  const result = await model.ContractSubcategory.findOne({
    where: { id },
    include: [
      {
        model: model.ContractCategory,
        as: "contractCategory",
      },
    ],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.ContractSubcategory.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["code", "name", "description"], search);

  const result = await model.ContractSubcategory.findAndCountAll({
    where: {
      ...fieldSearch,
    },
    include: [
      {
        model: model.ContractCategory,
        as: "contractCategory",
      },
    ],
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createContractSubcategoryValidation, data);

  // Validate contractCategoryId if provided
  if (data.contractCategoryId) {
    const categoryExists = await model.ContractCategory.findOne({
      where: { id: data.contractCategoryId },
    });
    if (!categoryExists) throw new ResponseError(400, "Contract category not found");
  }

  const nameExists = await checkData({ name: data.name });
  if (nameExists) throw new ResponseError(400, "Contract subcategory name already exists");

  const codeExists = await checkData({ code: data.code });
  if (codeExists) throw new ResponseError(400, "Code already exists");

  return await model.ContractSubcategory.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateContractSubcategoryValidation, data);

  await getData(id);

  // Validate contractCategoryId if provided
  if (data.contractCategoryId) {
    const categoryExists = await model.ContractCategory.findOne({
      where: { id: data.contractCategoryId },
    });
    if (!categoryExists) throw new ResponseError(400, "Contract category not found");
  }

  const nameExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
  });

  if (nameExists) throw new ResponseError(400, "Contract subcategory name already exists");

  const codeExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    code: data.code,
  });

  if (codeExists) throw new ResponseError(400, "Code already exists");

  return await model.ContractSubcategory.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.ContractSubcategory.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateContractSubcategoryManyValidation, data);
  return await model.ContractSubcategory.destroy({
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