const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createConsultantRoleValidation,
  updateConsultantRoleValidation,
  updateConsultantRoleManyValidation,
} = require("../validations/consultant-role-validation");

const getData = async (id) => {
  const result = await model.ConsultantRole.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.ConsultantRole.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["name"], search);

  const result = await model.ConsultantRole.findAndCountAll({
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
  data = validate(createConsultantRoleValidation, data);

  const nameExists = await checkData({ name: data.name });
  if (nameExists)
    throw new ResponseError(400, "Consultant role name already exists");

  return await model.ConsultantRole.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateConsultantRoleValidation, data);

  await getData(id);

  const nameExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
  });

  if (nameExists)
    throw new ResponseError(400, "Consultant role name already exists");

  return await model.ConsultantRole.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.ConsultantRole.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateConsultantRoleManyValidation, data);
  return await model.ConsultantRole.destroy({
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
