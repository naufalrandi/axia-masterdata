const Joi = require("joi");

const createProcessFunctionValidation = Joi.object({
  category: Joi.string().max(255).optional().allow(null, ''),
  name: Joi.string().max(255).required(),
});

const updateProcessFunctionValidation = Joi.object({
  id: Joi.number().positive().required(),
  category: Joi.string().max(255).optional().allow(null, ''),
  name: Joi.string().max(255).required(),
});

const updateProcessFunctionManyValidation = Joi.object({
  ids: Joi.array().items(Joi.number().positive()).required(),
});

module.exports = {
  createProcessFunctionValidation,
  updateProcessFunctionValidation,
  updateProcessFunctionManyValidation,
};