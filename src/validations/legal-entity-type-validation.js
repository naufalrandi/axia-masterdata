const Joi = require("joi");

const createLegalEntityTypeValidation = Joi.object({
  nameId: Joi.string().max(255).required(),
  nameEn: Joi.string().max(255).required(),
  prefix: Joi.string().max(255).optional().allow(null, ""),
  suffix: Joi.string().max(255).optional().allow(null, ""),
});

const updateLegalEntityTypeValidation = Joi.object({
  id: Joi.number().positive().required(),
  nameId: Joi.string().max(255).required(),
  nameEn: Joi.string().max(255).required(),
  prefix: Joi.string().max(255).optional().allow(null, ""),
  suffix: Joi.string().max(255).optional().allow(null, ""),
});

const updateLegalEntityTypeManyValidation = Joi.object({
  ids: Joi.array().items(Joi.number().positive()).required(),
});

module.exports = {
  createLegalEntityTypeValidation,
  updateLegalEntityTypeValidation,
  updateLegalEntityTypeManyValidation,
};
