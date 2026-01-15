const Joi = require("joi");

const createContractCategoryValidation = Joi.object({
  code: Joi.string().max(50).required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().optional().allow("", null),
});

const updateContractCategoryValidation = Joi.object({
  id: Joi.number().required(),
  code: Joi.string().max(50).required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().optional().allow("", null),
});

const updateContractCategoryManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createContractCategoryValidation,
  updateContractCategoryValidation,
  updateContractCategoryManyValidation,
};
