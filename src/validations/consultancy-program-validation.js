const Joi = require("joi");

const createConsultancyProgramValidation = Joi.object({
  title: Joi.string().max(255).required(),
  activityDescription: Joi.string().optional().allow(null, ""),
  outputDescription: Joi.string().optional().allow(null, ""),
  axiaResponsibilities: Joi.string().optional().allow(null, ""),
  clientResponsibilities: Joi.string().optional().allow(null, ""),
  deliverables: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
      })
    )
    .optional(),
});

const updateConsultancyProgramValidation = Joi.object({
  id: Joi.number().positive().required(),
  title: Joi.string().max(255).required(),
  activityDescription: Joi.string().optional().allow(null, ""),
  outputDescription: Joi.string().optional().allow(null, ""),
  axiaResponsibilities: Joi.string().optional().allow(null, ""),
  clientResponsibilities: Joi.string().optional().allow(null, ""),
  deliverables: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().positive().optional(),
        title: Joi.string().required(),
      })
    )
    .optional(),
});

const updateConsultancyProgramManyValidation = Joi.object({
  ids: Joi.array().items(Joi.number().positive()).required(),
});

module.exports = {
  createConsultancyProgramValidation,
  updateConsultancyProgramValidation,
  updateConsultancyProgramManyValidation,
};
