const Joi = require("joi");

const createContractVariantValidation = Joi.object({
  contractSubcategoryId: Joi.number().optional(),
  name: Joi.string().max(100).required(),
  description: Joi.string().optional(),
});

const updateContractVariantValidation = Joi.object({
  id: Joi.number().required(),
  contractSubcategoryId: Joi.number().optional(),
  name: Joi.string().max(100).required(),
  description: Joi.string().optional(),
});

const updateContractVariantManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createContractVariantValidation,
  updateContractVariantValidation,
  updateContractVariantManyValidation,
};