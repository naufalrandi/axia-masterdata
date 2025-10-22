const Joi = require("joi");

const createBPJSEmploymentValidation = Joi.object({
  shortName: Joi.string().max(10).required(),
  name: Joi.string().max(100).required(),
  percentageOfCompany: Joi.number().min(0).max(100).required(),
  percentageOfEmployee: Joi.number().min(0).max(100).required(),
});

const updateBPJSEmploymentValidation = Joi.object({
  id: Joi.number().required(),
  shortName: Joi.string().max(10).required(),
  name: Joi.string().max(100).required(),
  percentageOfCompany: Joi.number().min(0).max(100).required(),
  percentageOfEmployee: Joi.number().min(0).max(100).required(),
});

const updateBPJSEmploymentManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createBPJSEmploymentValidation,
  updateBPJSEmploymentValidation,
  updateBPJSEmploymentManyValidation,
};
