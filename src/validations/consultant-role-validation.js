const Joi = require("joi");

const createConsultantRoleValidation = Joi.object({
  name: Joi.string().max(255).required(),
});

const updateConsultantRoleValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(255).required(),
});

const updateConsultantRoleManyValidation = Joi.object({
  ids: Joi.array().items(Joi.number().positive()).required(),
});

module.exports = {
  createConsultantRoleValidation,
  updateConsultantRoleValidation,
  updateConsultantRoleManyValidation,
};
