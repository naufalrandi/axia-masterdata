const model = require("../models/index");
const {
  searchData,
  pagination,
  checkStatus,
} = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const { createValidation, updateValidation } = require("../validations/employment-level-validation");
const { asArray, HIERARCHY } = require("../enum/utils");

const getData = async (id) => {
  const result = await model.EmploymentLevel.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.EmploymentLevel.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(["name"], search);

  const result = await model.EmploymentLevel.findAndCountAll({
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
  data = validate(createValidation, data);
  checkStatus(asArray(HIERARCHY), data.hierarchy, "hierarchy");

  const check = await checkData({ name: data.name });
  if (check) throw new ResponseError(400, "Employment level already exists");
  return model.sequelize.transaction(async (transaction) => {
    await model.EmploymentLevel.update(
      { level: model.Sequelize.literal('"level" + 1') },
      {
        where: {
          level: {
            [Op.gte]: data.level,
          },
        },
        transaction,
      }
    );

    await model.EmploymentLevel.create(data, {transaction});
  })
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateValidation, data);
  checkStatus(asArray(HIERARCHY), data.hierarchy, "hierarchy");

  const check = await checkData({
    name: data.name,
    id: {
      [Op.ne]: id,
    },
  });

  if (check) throw new ResponseError(400, "Village already exists");
  const employmentLevel = await getData(id);
  return model.sequelize.transaction(async (transaction) => {
    if (data.level !== employmentLevel.level) {
      if (data.level > employmentLevel.level) {
        await model.EmploymentLevel.update(
          { level: model.Sequelize.literal('"level" - 1') },
          {
            where: {
              level: {
                [Op.gt]: employmentLevel.level,
                [Op.lte]: data.level,
              },
              id: {
                [Op.ne]: id, // jangan geser yang sedang di-update
              },
            },
            transaction,
          }
        );
      } else {
        await model.EmploymentLevel.update(
          { level: model.Sequelize.literal('"level" + 1') },
          {
            where: {
              level: {
                [Op.gte]: data.level,
                [Op.lt]: employmentLevel.level,
              },
              id: {
                [Op.ne]: id,
              },
            },
            transaction,
          }
        );
      }
    }
    
    await model.EmploymentLevel.update(data, { where: { id } });
  })
};

const destroy = async (id) => {
  await getData(id);
  return await model.EmploymentLevel.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateVillageManyValidation, data);
  return await model.EmploymentLevel.destroy({
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
