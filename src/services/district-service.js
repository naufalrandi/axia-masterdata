const model = require("../models/index");
const {
  generateSlug,
  searchData,
  pagination,
  getIdModel,
} = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createDistrictValidation,
  updateDistrictValidation,
  updateDistrictManyValidation,
} = require("../validations/district-validation");

const getData = async (id) => {
  const result = await model.District.findOne({
    where: { id },
    include: ["city"],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.District.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search, cityId } = data;
  const fieldSearch = searchData(["name"], search);

  const result = await model.District.findAndCountAll({
    where: {
      ...fieldSearch,
      ...(cityId && {
        cityId,
      }),
    },
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createDistrictValidation, data);

  data.id = await getIdModel("District");
  data.slug = generateSlug(data.name);
  const check = await checkData({ name: data.name });
  if (check) throw new ResponseError(400, "District already exists");
  return await model.District.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateDistrictValidation, data);

  const check = await checkData({
    name: data.name,
    id: {
      [Op.ne]: id,
    },
  });

  data.slug = generateSlug(data.name);
  if (check) throw new ResponseError(400, "District already exists");
  return await model.District.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.District.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateDistrictManyValidation, data);
  return await model.District.destroy({
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
