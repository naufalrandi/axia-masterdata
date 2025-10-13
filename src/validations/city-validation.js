const Joi = require("joi");

const createCityValidation = Joi.object({
  name: Joi.string().max(100).required(),
  provinceId: Joi.number().required(),
  latlng: Joi.array().optional(),
});

const updateCityValidation = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().max(100).required(),
  provinceId: Joi.number().required(),
  latlng: Joi.array().optional(),
});

const updateCityManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createCityValidation,
  updateCityValidation,
  updateCityManyValidation,
};
