const Joi = require("joi");

const sotanosSchema = Joi.object({
  // id_Sotano: Joi.number().integer().positive(),
 nombre: Joi.string().max(255).required(),
});

module.exports = { sotanosSchema };
