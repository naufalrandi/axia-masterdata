const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createBPJSEmploymentValidation,
  updateBPJSEmploymentValidation,
  updateBPJSEmploymentManyValidation,
} = require("../validations/bpjs-employment-validation");

const getData = async (id) => {
  const result = await model.BPJSemployment.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.BPJSemployment.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["shortName", "name"], search);

  const result = await model.BPJSemployment.findAndCountAll({
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
  data = validate(createBPJSEmploymentValidation, data);

  const shortNameExists = await checkData({ shortName: data.shortName });
  if (shortNameExists)
    throw new ResponseError(400, "Short name already exists");

  const nameExists = await checkData({ name: data.name });
  if (nameExists) throw new ResponseError(400, "Name already exists");

  return await model.BPJSemployment.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateBPJSEmploymentValidation, data);

  await getData(id);

  const shortNameExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    shortName: data.shortName,
  });

  if (shortNameExists)
    throw new ResponseError(400, "Short name already exists");

  const nameExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    name: data.name,
  });

  if (nameExists) throw new ResponseError(400, "Name already exists");

  return await model.BPJSemployment.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.BPJSemployment.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateBPJSEmploymentManyValidation, data);
  return await model.BPJSemployment.destroy({
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
