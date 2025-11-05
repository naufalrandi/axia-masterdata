const model = require("../models/index");
const {
  searchData,
  pagination,
  generateTrainingCourseCode,
} = require("../helpers/func");
const { Op } = require("sequelize");
const { ResponseError } = require("../errors/response-error");
const validate = require("../validations/validation");
const {
  createTrainingCourseValidation,
  updateTrainingCourseValidation,
  updateTrainingCourseManyValidation,
} = require("../validations/training-course-validation");

const getData = async (id) => {
  const result = await model.TrainingCourse.findOne({
    where: { id },
    include: [
      {
        model: model.Standard,
        as: "standards",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: { attributes: [] },
      },
    ],
  });

  if (!result) throw new ResponseError(404, "Data not found");
  return result.dataValues;
};

const checkData = async (where) => {
  return await model.TrainingCourse.findOne({
    where,
  });
};

const getAll = async (data) => {
  const { page, limit, offset, orderby, sortBy, search } = data;
  const fieldSearch = searchData(
    ["courseTier", "courseGroup", "courseTitle"],
    search
  );

  const result = await model.TrainingCourse.findAndCountAll({
    where: {
      ...fieldSearch,
    },
    include: [
      {
        model: model.Standard,
        as: "standards",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: { attributes: [] },
      },
    ],
    limit,
    offset,
    order: [[sortBy, orderby]],
  });

  return pagination(result, page, limit);
};

const create = async (data) => {
  data = validate(createTrainingCourseValidation, data);

  const courseTitleExists = await checkData({ courseTitle: data.courseTitle });
  if (courseTitleExists)
    throw new ResponseError(400, "Training course title already exists");

  const { standards, ...courseData } = data;
  return await model.sequelize.transaction(async (transaction) => {
    const { runningNumber, code } = await generateTrainingCourseCode(
      transaction
    );

    courseData.code = code;
    courseData.runningNumber = runningNumber;
    const trainingCourse = await model.TrainingCourse.create(courseData, {
      transaction,
    });

    // Add standards if provided
    if (standards && standards.length > 0) {
      const standardsExists = await model.Standard.findAll({
        where: { id: { [Op.in]: standards.map((item) => item.id) } },
        transaction,
      });

      if (standards.length !== standardsExists.length) {
        throw new ResponseError(400, "Some standard IDs are invalid");
      }

      await trainingCourse.setStandards(
        standards.map((item) => item.id),
        { transaction }
      );
    }

    return "Training Course created successfully";
  });
};

const getOne = async (id) => {
  return await getData(id);
};

const update = async (id, data) => {
  data.id = id;
  data = validate(updateTrainingCourseValidation, data);

  await getData(id);
  const courseTitleExists = await checkData({
    id: {
      [Op.ne]: id,
    },
    courseTitle: data.courseTitle,
  });

  if (courseTitleExists)
    throw new ResponseError(400, "Training course title already exists");

  const { standards, ...courseData } = data;
  await model.TrainingCourse.update(courseData, { where: { id } });
  if (standards !== undefined) {
    const trainingCourse = await model.TrainingCourse.findByPk(id);
    if (standards && standards.length > 0) {
      const standardsExists = await model.Standard.findAll({
        where: { id: { [Op.in]: standards.map((item) => item.id) } },
      });

      if (standards.length !== standardsExists.length) {
        throw new ResponseError(400, "Some standard IDs are invalid");
      }

      await trainingCourse.setStandards(standards.map((item) => item.id));
    } else {
      await trainingCourse.setStandards([]);
    }
  }

  return await getData(id);
};

const destroy = async (id) => {
  await getData(id);

  // Remove associations first
  const trainingCourse = await model.TrainingCourse.findByPk(id);
  await trainingCourse.setStandards([]);

  return await model.TrainingCourse.destroy({
    where: { id },
  });
};

const destroyMany = async (data) => {
  data = validate(updateTrainingCourseManyValidation, data);

  // Remove all associations for the courses to be deleted
  for (const id of data.ids) {
    const trainingCourse = await model.TrainingCourse.findByPk(id);
    if (trainingCourse) {
      await trainingCourse.setStandards([]);
    }
  }

  return await model.TrainingCourse.destroy({
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
