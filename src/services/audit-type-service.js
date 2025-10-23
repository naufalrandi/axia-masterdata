const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createAuditTypeValidation,
  updateAuditTypeValidation,
  updateAuditTypeManyValidation,
} = require("../validations/audit-type-validation");

const getData = async (id) => {
  const result = await model.AuditType.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.AuditType.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["name"], search);

  const result = await model.AuditType.findAndCountAll({
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
  data = validate(createAuditTypeValidation, data);

  const nameExists = await checkData({ name: data.name });
  if (nameExists)
    throw new ResponseError(400, "Audit type name already exists");

  return await model.AuditType.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateAuditTypeValidation, data);

  await getData(id);

  const nameExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
  });

  if (nameExists)
    throw new ResponseError(400, "Audit type name already exists");

  return await model.AuditType.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.AuditType.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateAuditTypeManyValidation, data);
  return await model.AuditType.destroy({
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
