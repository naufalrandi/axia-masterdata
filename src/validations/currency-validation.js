const Joi = require("joi");

const createCurrencyValidation = Joi.object({
  symbol: Joi.string().max(3).required(),
  code: Joi.string().max(5).required(),
  name: Joi.string().max(100).required(),
});

const updateCurrencyValidation = Joi.object({
  id: Joi.number().required(),
  symbol: Joi.string().max(3).required(),
  code: Joi.string().max(5).required(),
  name: Joi.string().max(100).required(),
});

const updateCurrencyManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createCurrencyValidation,
  updateCurrencyValidation,
  updateCurrencyManyValidation,
};
