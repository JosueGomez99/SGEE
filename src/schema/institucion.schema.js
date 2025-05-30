const Joi = require("joi");

const institucionSchema = Joi.object({
  // id_Sotano: Joi.number().integer().positive(),
  nombre: Joi.string().max(255).required(),
});

module.exports = { institucionSchema};
