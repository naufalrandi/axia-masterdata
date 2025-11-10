const Joi = require("joi");

const createManyValidation = Joi.object({
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

const updateValidation = Joi.object({
  id: Joi.number().positive().required(),
  standardId: Joi.string().uuid().required(),
  clauseNumber: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().optional().allow("", null),
});

const deleteManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createManyValidation,
  updateValidation,
  deleteManyValidation,
};
