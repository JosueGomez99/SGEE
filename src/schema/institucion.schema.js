const Joi = require("joi");

const institucionSchema = Joi.object({
  nombre_institucion: Joi.string().max(255).required(),
  siglas: Joi.string().max(50).required(),
});

module.exports = { institucionSchema};
