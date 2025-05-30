const Joi = require("joi");

const asignacionInstitucionespacioschema = Joi.object({
  // id_Sotano: Joi.number().integer().positive(),
   codigo: Joi.string().max(255).required(),
});

module.exports = { asignacionInstitucionespacioschema};
