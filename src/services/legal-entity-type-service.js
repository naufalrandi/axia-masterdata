const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createLegalEntityTypeValidation,
  updateLegalEntityTypeValidation,
  updateLegalEntityTypeManyValidation,
} = require("../validations/legal-entity-type-validation");

const getData = async (id) => {
  const result = await model.LegalEntityType.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.LegalEntityType.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(
    ["nameId", "nameEn", "prefix", "suffix"],
    search
  );

  const result = await model.LegalEntityType.findAndCountAll({
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
  data = validate(createLegalEntityTypeValidation, data);

  const nameIdExists = await checkData({ nameId: data.nameId });
  if (nameIdExists)
    throw new ResponseError(400, "Legal entity type name ID already exists");

  const nameEnExists = await checkData({ nameEn: data.nameEn });
  if (nameEnExists)
    throw new ResponseError(400, "Legal entity type name EN already exists");

  return await model.LegalEntityType.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateLegalEntityTypeValidation, data);

  await getData(id);

  const nameIdExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    nameId: data.nameId,
  });

  if (nameIdExists)
    throw new ResponseError(400, "Legal entity type name ID already exists");

  const nameEnExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    nameEn: data.nameEn,
  });

  if (nameEnExists)
    throw new ResponseError(400, "Legal entity type name EN already exists");

  return await model.LegalEntityType.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.LegalEntityType.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateLegalEntityTypeManyValidation, data);
  return await model.LegalEntityType.destroy({
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
