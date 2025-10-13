const Joi = require("joi");

const createValidation = Joi.object({
  hierarchy: Joi.string().required(),
  level: Joi.number().required(),
  name: Joi.string().required(),
});

const updateValidation = Joi.object({
  id: Joi.number().required(),
  hierarchy: Joi.string().required(),
  level: Joi.number().required(),
  name: Joi.string().required(),
});

const updateManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createValidation,
  updateValidation,
  updateManyValidation,
};
