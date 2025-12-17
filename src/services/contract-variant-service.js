const model = require("../models/index");
const {
  searchData,
  pagination,
  generateContractVariantCode,
} = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createContractVariantValidation,
  updateContractVariantValidation,
  updateContractVariantManyValidation,
} = require("../validations/contract-variant-validation");

const getData = async (id) => {
  const result = await model.ContractVariant.findOne({
    where: { id },
    include: [
      {
        model: model.ContractSubcategory,
        as: "contractSubcategory",
        include: [
          {
            model: model.ContractCategory,
            as: "contractCategory",
          },
        ],
      },
    ],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.ContractVariant.findOne({
    where,
  });
};

const getAll = async (data) => {
  const {
    page,
    limit,
    offset,
    orderby,
    sortBy,
    search,
    contractSubcategoryId,
  } = data;
  const fieldSearch = searchData(["name", "description"], search);

  const result = await model.ContractVariant.findAndCountAll({
    where: {
      ...fieldSearch,
      ...(contractSubcategoryId && { contractSubcategoryId }),
    },
    include: [
      {
        model: model.ContractSubcategory,
        as: "contractSubcategory",
        include: [
          {
            model: model.ContractCategory,
            as: "contractCategory",
          },
        ],
      },
    ],
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createContractVariantValidation, data);

  // Validate contractSubcategoryId if provided
  const subcategoryExists = await model.ContractSubcategory.findOne({
    where: { id: data.contractSubcategoryId },
  });
  if (!subcategoryExists)
    throw new ResponseError(400, "Contract subcategory not found");

  data.code = await generateContractVariantCode(data.contractSubcategoryId);
  return await model.ContractVariant.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateContractVariantValidation, data);

  await getData(id);

  // Validate contractSubcategoryId if provided
  if (data.contractSubcategoryId) {
    const subcategoryExists = await model.ContractSubcategory.findOne({
      where: { id: data.contractSubcategoryId },
    });
    if (!subcategoryExists)
      throw new ResponseError(400, "Contract subcategory not found");
  }

  const nameExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
  });

  if (nameExists)
    throw new ResponseError(400, "Contract variant name already exists");

  return await model.ContractVariant.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.ContractVariant.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateContractVariantManyValidation, data);
  return await model.ContractVariant.destroy({
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
