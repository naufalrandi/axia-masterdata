const Joi = require("joi");

const createEmployeeCompensationValidation = Joi.object({
  type: Joi.string().max(50).required(),
  label: Joi.string().max(100).required(),
  scheme: Joi.string().max(50).required(),
  unit: Joi.string().max(50).required(),
  method: Joi.string().max(50).required(),
});

const updateEmployeeCompensationValidation = Joi.object({
  id: Joi.number().required(),
  type: Joi.string().max(50).required(),
  label: Joi.string().max(100).required(),
  scheme: Joi.string().max(50).required(),
  unit: Joi.string().max(50).required(),
  method: Joi.string().max(50).required(),
});

const updateEmployeeCompensationManyValidation = Joi.object({
  ids: Joi.array().min(1).required(),
});

module.exports = {
  createEmployeeCompensationValidation,
  updateEmployeeCompensationValidation,
  updateEmployeeCompensationManyValidation,
};
