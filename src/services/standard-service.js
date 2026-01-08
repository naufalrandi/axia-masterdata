const model = require("../models/index");
const { searchData, pagination, syncDataHasMany } = require("../helpers/func");
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
  return await model.sequelize.transaction(async (transaction) => {
    const standard = await model.Standard.create(data, { transaction });
    for (const clause of data.standardClauses) {
      clause.standardId = standard.id;
      await model.StandardClause.create(clause, { transaction });
    }

    return standard;
  });
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateStandardValidation, data);

  await getSchemeTag(data.schemeTagId);
  return await model.sequelize.transaction(async (transaction) => {
    const standard = await getData(id);
    await standard.update(data, { transaction });

    // Update StandardClauses
    for (const clause of data.standardClauses) {
      if (clause.id) {
        await model.StandardClause.update(clause, { where: { id: clause.id } });
      } else {
        clause.standardId = id;
        const result = await model.StandardClause.create(clause, {
          transaction,
        });

        clause.id = result.id;
      }
    }

    // Sync StandardClauses
    await syncDataHasMany(
      {
        currentModel: model.StandardClause,
        where: { standardId: id },
        data: data.standardClauses,
      },
      transaction
    );

    return standard;
  });
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
