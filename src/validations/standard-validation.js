const Joi = require("joi");

const createStandardValidation = Joi.object({
  schemeTagId: Joi.string().required(),
  prefix: Joi.string().required(),
  standardNumber: Joi.number().required(),
  issueYear: Joi.number().required(),
  type: Joi.array().required(),
  title: Joi.string().required(),
  rate: Joi.number().required(),
  document: Joi.string().optional(),
  standardClauses: Joi.array()
    .items(
      Joi.object({
        standardId: Joi.string().uuid().required(),
        clauseNumber: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().optional().allow("", null),
      })
    )
    .min(1)
    .required(),
});

const updateStandardValidation = Joi.object({
  id: Joi.string().required(),
  schemeTagId: Joi.string().required(),
  prefix: Joi.string().required(),
  standardNumber: Joi.number().required(),
  issueYear: Joi.number().required(),
  type: Joi.array().required(),
  title: Joi.string().required(),
  rate: Joi.number().required(),
  document: Joi.string().optional(),
  standardClauses: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().optional().allow(null),
        standardId: Joi.string().uuid().required(),
        clauseNumber: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().optional().allow("", null),
      })
    )
    .min(1)
    .required(),
});

const updateStandardManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createStandardValidation,
  updateStandardValidation,
  updateStandardManyValidation,
};
