const Joi = require("joi");

const createConsultancyMethodValidation = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().optional().allow(null, ""),
  durations: Joi.array().items(
    Joi.object({
      value: Joi.number().positive().required(),
      unit: Joi.string().valid('days', 'weeks', 'months', 'years').required(),
    })
  ).optional().allow(null),
});

const updateConsultancyMethodValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(255).required(),
  description: Joi.string().optional().allow(null, ""),
  durations: Joi.array().items(
    Joi.object({
      value: Joi.number().positive().required(),
      unit: Joi.string().valid('days', 'weeks', 'months', 'years').required(),
    })
  ).optional().allow(null),
});

const updateConsultancyMethodManyValidation = Joi.object({
  ids: Joi.array().items(Joi.number().positive()).required(),
});

module.exports = {
  createConsultancyMethodValidation,
  updateConsultancyMethodValidation,
  updateConsultancyMethodManyValidation,
};