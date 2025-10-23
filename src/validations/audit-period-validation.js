const Joi = require("joi");

const createAuditPeriodValidation = Joi.object({
  name: Joi.string().max(100).required(),
});

const updateAuditPeriodValidation = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().max(100).required(),
});

const updateAuditPeriodManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createAuditPeriodValidation,
  updateAuditPeriodValidation,
  updateAuditPeriodManyValidation,
};
