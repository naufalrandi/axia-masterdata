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

const getData = async (slug) => {
  const result = await model.Village.findOne({
    where: { slug },
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

const getOne = async (slug) => {
  return await getData(slug);
};

const update = async (slug, data) => {
  data.slug = slug;
  data = validate(updateVillageValidation, data);

  const check = await checkData({
    name: data.name,
    slug: {
      [Op.ne]: slug,
    },
  });

  data.slug = generateSlug(data.name);
  if (check) throw new ResponseError(400, "Village already exists");
  return await model.Village.update(data, { where: { slug } });
};

const destroy = async (slug) => {
  await getData(slug);
  return await model.Village.destroy({
    where: { slug },
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
