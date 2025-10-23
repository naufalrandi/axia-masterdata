const Joi = require("joi");

const createAuditTypeValidation = Joi.object({
  name: Joi.string().max(100).required(),
});

const updateAuditTypeValidation = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().max(100).required(),
});

const updateAuditTypeManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createAuditTypeValidation,
  updateAuditTypeValidation,
  updateAuditTypeManyValidation,
};
