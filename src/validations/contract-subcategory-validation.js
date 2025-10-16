const Joi = require("joi");

const createContractSubcategoryValidation = Joi.object({
  code: Joi.string().max(50).required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().optional(),
  contractCategoryId: Joi.number().optional(),
});

const updateContractSubcategoryValidation = Joi.object({
  id: Joi.number().required(),
  code: Joi.string().max(50).required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().optional(),
  contractCategoryId: Joi.number().optional(),
});

const updateContractSubcategoryManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createContractSubcategoryValidation,
  updateContractSubcategoryValidation,
  updateContractSubcategoryManyValidation,
};