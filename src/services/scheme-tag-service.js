const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createSchemeTagValidation,
  updateSchemeTagValidation,
  updateSchemeTagManyValidation,
} = require("../validations/scheme-tag-validation");

const getData = async (id) => {
  const result = await model.SchemeTag.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.SchemeTag.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["sortName", "name"], search);

  const result = await model.SchemeTag.findAndCountAll({
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
  data = validate(createSchemeTagValidation, data);
  const check = await checkData({ sortName: data.sortName });
  if (check) throw new ResponseError(400, "SchemeTag already exists");

  return await model.SchemeTag.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateSchemeTagValidation, data);

  const check = await checkData({
    sortName: data.sortName,
    id: {
      [Op.ne]: id,
    },
  });

  if (check) throw new ResponseError(400, "SchemeTag already exists");
  return await model.SchemeTag.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.SchemeTag.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateSchemeTagManyValidation, data);
  return await model.SchemeTag.destroy({
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
