const Joi = require("joi");

const createLanguageValidation = Joi.object({
  code: Joi.string().max(3).required(),
  name: Joi.string().max(100).required(),
});

const updateLanguageValidation = Joi.object({
  slug: Joi.string().required(),
  code: Joi.string().max(3).required(),
  name: Joi.string().max(100).required(),
});

const updateLanguageManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createLanguageValidation,
  updateLanguageValidation,
  updateLanguageManyValidation,
};
