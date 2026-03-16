const Joi = require("joi");

const createTrainingCourseValidation = Joi.object({
  courseTier: Joi.string().max(255).required(),
  courseGroup: Joi.string().max(255).required(),
  courseTitle: Joi.string().max(255).required(),
  maxAttendance: Joi.number().integer().positive().required(),
  courseDuration: Joi.number().positive().required(),
  rate: Joi.number().integer().required(),
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
      Joi.string().optional().allow(null),
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
    .optional()
    .allow(null),
});

const updateTrainingCourseValidation = Joi.object({
  id: Joi.string().uuid().required(),
  courseTier: Joi.string().max(255).required(),
  courseGroup: Joi.string().max(255).required(),
  courseTitle: Joi.string().max(255).required(),
  maxAttendance: Joi.number().integer().positive().required(),
  courseDuration: Joi.number().positive().required(),
  rate: Joi.number().integer().required(),
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
      Joi.string().optional().allow(null),
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
    .optional()
    .allow(null),
});

const updateTrainingCourseManyValidation = Joi.object({
  ids: Joi.array().items(Joi.string().uuid()).required(),
});

module.exports = {
  createTrainingCourseValidation,
  updateTrainingCourseValidation,
  updateTrainingCourseManyValidation,
};
