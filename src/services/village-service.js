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
  createVillageValidation,
  updateVillageValidation,
  updateVillageManyValidation,
} = require("../validations/village-validation");

const getData = async (id) => {
  const result = await model.Village.findOne({
    where: { id },
    include: ["district"],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.Village.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search, districtId } = data;
  const fieldSearch = searchData(["name"], search);

  const result = await model.Village.findAndCountAll({
    where: {
      ...fieldSearch,
      ...(districtId && {
        districtId,
      }),
    },
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createVillageValidation, data);

  data.id = await getIdModel("Village");
  data.slug = generateSlug(data.name);
  const check = await checkData({ name: data.name });
  if (check) throw new ResponseError(400, "Village already exists");
  return await model.Village.create(data);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateVillageValidation, data);

  const check = await checkData({
    name: data.name,
    id: {
      [Op.ne]: id,
    },
  });

  data.slug = generateSlug(data.name);
  if (check) throw new ResponseError(400, "Village already exists");
  return await model.Village.update(data, { where: { id } });
};

const destroy = async (id) => {
  await getData(id);
  return await model.Village.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateVillageManyValidation, data);
  return await model.Village.destroy({
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
