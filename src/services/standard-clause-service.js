const model = require("../models/index");
const { searchData, pagination, getIdModel } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createManyValidation,
  updateValidation,
  deleteManyValidation,
} = require("../validations/standard-clause-validation");

const getData = async (id) => {
  const result = await model.StandardClause.findOne({
    where: { id },
    include: ["standard"],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.StandardClause.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search, standardId } = data;
  const fieldSearch = searchData(["clauseNumber", "title"], search);

  const result = await model.StandardClause.findAndCountAll({
    where: {
      ...fieldSearch,
      ...(standardId && {
        standardId,
      }),
    },
    include: ["standard"],
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const createMany = async (data) => {
  data = validate(createManyValidation, data);

  return await model.sequelize.transaction(async (transaction) => {
    for (const item of data.standardClauses) {
      const check = await checkData({
        clauseNumber: item.clauseNumber,
        standardId: item.standardId,
      });

      if (check) throw new ResponseError(400, "StandardClause already exists");
      await model.StandardClause.create(item, { transaction });
    }

    return "Created successfully";
  });
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateValidation, data);

  const check = await checkData({
    clauseNumber: data.clauseNumber,
    standardId: data.standardId,
    id: {
      [Op.ne]: id,
    },
  });

  if (check) throw new ResponseError(400, "StandardClause already exists");
  return await model.StandardClause.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.StandardClause.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(deleteManyValidation, data);
  return await model.StandardClause.destroy({
    where: {
      id: {
        [Op.in]: data.ids,
      },
    },
  });
};

module.exports = {
  getAll,
  createMany,
  getOne,
  update,
  destroy,
  destroyMany,
};
