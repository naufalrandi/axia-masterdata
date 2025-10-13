const Joi = require("joi");

const createDistrictValidation = Joi.object({
  name: Joi.string().max(100).required(),
  cityId: Joi.number().required(),
  latlng: Joi.array().optional(),
});

const updateDistrictValidation = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().max(100).required(),
  cityId: Joi.number().required(),
  latlng: Joi.array().optional(),
});

const updateDistrictManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createDistrictValidation,
  updateDistrictValidation,
  updateDistrictManyValidation,
};
