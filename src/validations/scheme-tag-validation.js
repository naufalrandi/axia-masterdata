const Joi = require("joi");

const createSchemeTagValidation = Joi.object({
  sortName: Joi.string().required(),
  name: Joi.string().required(),
});

const updateSchemeTagValidation = Joi.object({
  id: Joi.string().required(),
  sortName: Joi.string().required(),
  name: Joi.string().required(),
});

const updateSchemeTagManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createSchemeTagValidation,
  updateSchemeTagValidation,
  updateSchemeTagManyValidation,
};
