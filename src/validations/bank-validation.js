const Joi = require("joi");

const createBankValidation = Joi.object({
  code: Joi.string().max(3).required(),
  name: Joi.string().max(100).required(),
});

const updateBankValidation = Joi.object({
  id: Joi.number().required(),
  code: Joi.string().max(5).required(),
  name: Joi.string().max(100).required(),
  active: Joi.boolean().required(),
});

const updateBankManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createBankValidation,
  updateBankValidation,
  updateBankManyValidation,
};
