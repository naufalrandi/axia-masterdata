const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createStandardValidation,
  updateStandardValidation,
  updateStandardManyValidation,
} = require("../validations/standard-validation");

const getData = async (id) => {
  const result = await model.Standard.findOne({
    where: { id },
    include: [
      {
        model: model.SchemeTag,
        as: "schemeTag",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: model.StandardClause,
        as: "standardClauses",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result;
};

const getSchemeTag = async (id) => {
  const result = await model.SchemeTag.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "SchemeTag not found");
  return result.dataValues;
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["prefix", "title"], search);

  const result = await model.Standard.findAndCountAll({
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
  data = validate(createStandardValidation, data);

  await getSchemeTag(data.schemeTagId);
  return await model.Standard.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateStandardValidation, data);

  await getSchemeTag(data.schemeTagId);
  return await model.Standard.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.Standard.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateStandardManyValidation, data);
  return await model.Standard.destroy({
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
