const Joi = require("joi");

const createServiceValidation = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().optional().allow(null, ""),
});

const updateServiceValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(255).required(),
  description: Joi.string().optional().allow(null, ""),
});

const updateServiceManyValidation = Joi.object({
  ids: Joi.array().items(Joi.number().positive()).required(),
});

module.exports = {
  createServiceValidation,
  updateServiceValidation,
  updateServiceManyValidation,
};