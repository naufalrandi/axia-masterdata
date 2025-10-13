const Joi = require("joi");

const createStandardValidation = Joi.object({
  schemeTagId: Joi.string().required(),
  prefix: Joi.string().required(),
  standardNumber: Joi.number().required(),
  issueYear: Joi.number().required(),
  type: Joi.array().required(),
  title: Joi.string().required(),
  rate: Joi.number().required(),
  document: Joi.string().optional(),
});

const updateStandardValidation = Joi.object({
  id: Joi.string().required(),
  schemeTagId: Joi.string().required(),
  prefix: Joi.string().required(),
  standardNumber: Joi.number().required(),
  issueYear: Joi.number().required(),
  type: Joi.array().required(),
  title: Joi.string().required(),
  rate: Joi.number().required(),
  document: Joi.string().optional(),
});

const updateStandardManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createStandardValidation,
  updateStandardValidation,
  updateStandardManyValidation,
};
