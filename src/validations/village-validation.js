const Joi = require("joi");

const createVillageValidation = Joi.object({
  name: Joi.string().max(100).required(),
  districtId: Joi.number().required(),
  latlng: Joi.array().optional(),
});

const updateVillageValidation = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().max(100).required(),
  districtId: Joi.number().required(),
  latlng: Joi.array().optional(),
});

const updateVillageManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createVillageValidation,
  updateVillageValidation,
  updateVillageManyValidation,
};
