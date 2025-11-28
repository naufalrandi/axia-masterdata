const model = require("../models/index");
const { searchData, pagination } = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createConsultancyProgramValidation,
  updateConsultancyProgramValidation,
  updateConsultancyProgramManyValidation,
} = require("../validations/consultancy-program-validation");

const getData = async (id) => {
  const result = await model.ConsultancyProgram.findOne({
    where: { id },
    include: [
      {
        model: model.ConsultancyProgramDeliverable,
        as: "deliverables",
        attributes: ["id", "title"],
      },
    ],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.ConsultancyProgram.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(
    ["title", "activityDescription", "outputDescription"],
    search
  );

  const result = await model.ConsultancyProgram.findAndCountAll({
    where: {
      ...fieldSearch,
    },
    include: [
      {
        model: model.ConsultancyProgramDeliverable,
        as: "deliverables",
        attributes: ["id", "title"],
      },
    ],
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createConsultancyProgramValidation, data);
  const check = await checkData({ title: data.title });
  if (check)
    throw new ResponseError(400, "Consultancy program title already exists");

  const deliverables = data.deliverables || [];
  delete data.deliverables;

  const consultancyProgram = await model.ConsultancyProgram.create(data);

  if (deliverables.length > 0) {
    const deliverablesData = deliverables.map((d) => ({
      consultancyProgramId: consultancyProgram.id,
      title: d.title,
    }));
    await model.ConsultancyProgramDeliverable.bulkCreate(deliverablesData);
  }

  return await getData(consultancyProgram.id);
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateConsultancyProgramValidation, data);

  await getData(id);

  const check = await checkData({
    title: data.title,
    id: {
      [Op.ne]: id,
    },
  });

  if (check)
    throw new ResponseError(400, "Consultancy program title already exists");

  const deliverables = data.deliverables;
  delete data.deliverables;

  return await model.sequelize.transaction(async (transaction) => {
    await model.ConsultancyProgram.update(data, { where: { id }, transaction });
    if (deliverables !== undefined) {
      for (const deliverable of deliverables) {
        await model.ConsultancyProgramDeliverable.upsert(
          {
            id: deliverable.id,
            title: deliverable.title,
            consultancyProgramId: id,
          },
          { transaction }
        );
      }
    }
  });
};

const destroy = async (id) => {
  await getData(id);
  return await model.ConsultancyProgram.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateConsultancyProgramManyValidation, data);
  return await model.ConsultancyProgram.destroy({
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
