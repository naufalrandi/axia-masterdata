const Joi = require("joi");

const createProvinceValidation = Joi.object({
  name: Joi.string().max(100).required(),
  countryId: Joi.number().required(),
  latlng: Joi.array().optional(),
});

const updateProvinceValidation = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().max(100).required(),
  countryId: Joi.number().required(),
  latlng: Joi.array().optional(),
});

const updateProvinceManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createProvinceValidation,
  updateProvinceValidation,
  updateProvinceManyValidation,
};
