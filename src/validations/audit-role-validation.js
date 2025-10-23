const Joi = require("joi");

const createAuditRoleValidation = Joi.object({
  name: Joi.string().max(100).required(),
});

const updateAuditRoleValidation = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().max(100).required(),
});

const updateAuditRoleManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createAuditRoleValidation,
  updateAuditRoleValidation,
  updateAuditRoleManyValidation,
};
