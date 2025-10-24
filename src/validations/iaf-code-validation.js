const Joi = require("joi");

const createIafCodeValidation = Joi.object({
  code: Joi.number().integer().required(),
  industryClassification: Joi.string().max(255).required(),
});

const updateIafCodeValidation = Joi.object({
  id: Joi.number().positive().required(),
  code: Joi.number().integer().required(),
  industryClassification: Joi.string().max(255).required(),
});

const updateIafCodeManyValidation = Joi.object({
  ids: Joi.array().items(Joi.number().positive()).required(),
});

module.exports = {
  createIafCodeValidation,
  updateIafCodeValidation,
  updateIafCodeManyValidation,
};
