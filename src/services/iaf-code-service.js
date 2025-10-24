const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createIafCodeValidation,
  updateIafCodeValidation,
  updateIafCodeManyValidation,
} = require("../validations/iaf-code-validation");

const getData = async (id) => {
  const result = await model.IafCode.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.IafCode.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["industryClassification"], search);

  const result = await model.IafCode.findAndCountAll({
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
  data = validate(createIafCodeValidation, data);

  const codeExists = await checkData({ code: data.code });
  if (codeExists) throw new ResponseError(400, "IAF code already exists");

  return await model.IafCode.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateIafCodeValidation, data);

  await getData(id);

  const codeExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    code: data.code,
  });

  if (codeExists) throw new ResponseError(400, "IAF code already exists");

  return await model.IafCode.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.IafCode.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateIafCodeManyValidation, data);
  return await model.IafCode.destroy({
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
