const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createEmployeeCompensationValidation,
  updateEmployeeCompensationValidation,
  updateEmployeeCompensationManyValidation,
} = require("../validations/employee-compensation-validation");

const getData = async (id) => {
  const result = await model.EmployeeCompensation.findOne({
    where: { id },
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.EmployeeCompensation.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(
    ["type", "label", "scheme", "unit", "method"],
    search
  );

  const result = await model.EmployeeCompensation.findAndCountAll({
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
  data = validate(createEmployeeCompensationValidation, data);

  const labelExists = await checkData({ label: data.label });
  if (labelExists) throw new ResponseError(400, "Label already exists");

  return await model.EmployeeCompensation.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateEmployeeCompensationValidation, data);

  await getData(id);

  const labelExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    label: data.label,
  });

  if (labelExists) throw new ResponseError(400, "Label already exists");

  return await model.EmployeeCompensation.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.EmployeeCompensation.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateEmployeeCompensationManyValidation, data);
  return await model.EmployeeCompensation.destroy({
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
