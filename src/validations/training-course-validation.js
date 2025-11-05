const Joi = require("joi");

const createTrainingCourseValidation = Joi.object({
  courseTier: Joi.string().max(255).required(),
  courseGroup: Joi.string().max(255).required(),
  courseTitle: Joi.string().max(255).required(),
  maxAttendance: Joi.number().integer().positive().required(),
  courseDuration: Joi.number().positive().required(),
  rate: Joi.number().integer().positive().required(),
  prerequisites: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().uuid(),
      })
    )
    .optional()
    .allow(null),
  courseOutline: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
      })
    )
    .optional()
    .allow(null),
  exam: Joi.boolean().required(),
  standards: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().uuid().required(),
      })
    )
    .required()
    .min(1),
});

const updateTrainingCourseValidation = Joi.object({
  id: Joi.string().uuid().required(),
  courseTier: Joi.string().max(255).required(),
  courseGroup: Joi.string().max(255).required(),
  courseTitle: Joi.string().max(255).required(),
  maxAttendance: Joi.number().integer().positive().required(),
  courseDuration: Joi.number().positive().required(),
  rate: Joi.number().integer().positive().required(),
  prerequisites: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().uuid(),
      })
    )
    .optional()
    .allow(null),
  courseOutline: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
      })
    )
    .optional()
    .allow(null),
  exam: Joi.boolean().required(),
  standards: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().uuid().required(),
      })
    )
    .required()
    .min(1),
});

const updateTrainingCourseManyValidation = Joi.object({
  ids: Joi.array().items(Joi.string().uuid()).required(),
});

module.exports = {
  createTrainingCourseValidation,
  updateTrainingCourseValidation,
  updateTrainingCourseManyValidation,
};
