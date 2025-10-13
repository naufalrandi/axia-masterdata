const Joi = require("joi");

const createCountryValidation = Joi.object({
  name: Joi.string().max(100).required(),
  cca2: Joi.string().max(2).required(),
  cca3: Joi.string().max(3).required(),
  capital: Joi.array().items(Joi.string()).optional(),
  region: Joi.string().optional(),
  subregion: Joi.string().optional(),
  latlng: Joi.array().optional(),
  flag: Joi.string().optional(),
  nationalities: Joi.array().items(Joi.string()).optional(),
  callingCodes: Joi.array().items(Joi.string()).optional(),
  languages: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
      })
    )
    .optional(),
  currencies: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
      })
    )
    .optional(),
});

const updateCountryValidation = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().max(100).required(),
  cca2: Joi.string().max(2).required(),
  cca3: Joi.string().max(3).required(),
  capital: Joi.array().items(Joi.string()).optional(),
  region: Joi.string().optional(),
  subregion: Joi.string().optional(),
  latlng: Joi.array().optional(),
  flag: Joi.string().optional(),
  nationalities: Joi.array().items(Joi.string()).optional(),
  callingCodes: Joi.array().items(Joi.string()).optional(),
  languages: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
      })
    )
    .optional(),
  currencies: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
      })
    )
    .optional(),
});

const updateCountryManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createCountryValidation,
  updateCountryValidation,
  updateCountryManyValidation,
};
