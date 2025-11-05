const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createConsultancyMethodValidation,
  updateConsultancyMethodValidation,
  updateConsultancyMethodManyValidation,
} = require("../validations/consultancy-method-validation");

const getData = async (id) => {
  const result = await model.ConsultancyMethod.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result;
};

const checkData = async (where) => {
  return await model.ConsultancyMethod.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["name", "description"], search);

  const result = await model.ConsultancyMethod.findAndCountAll({
    where: {
      ...fieldSearch,
    },
    limit,
    offset,
    attributes: {exclude: ['durations', 'updatedAt']},
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createConsultancyMethodValidation, data);

  const nameExists = await checkData({ name: data.name });
  if (nameExists)
    throw new ResponseError(400, "Consultancy method name already exists");

  return await model.ConsultancyMethod.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateConsultancyMethodValidation, data);

  await getData(id);

  const nameExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
  });

  if (nameExists)
    throw new ResponseError(400, "Consultancy method name already exists");

  return await model.ConsultancyMethod.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.ConsultancyMethod.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateConsultancyMethodManyValidation, data);
  return await model.ConsultancyMethod.destroy({
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