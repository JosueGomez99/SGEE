const Joi = require("joi");

const tipoespacioSchema = Joi.object({
  // id_sotano: Joi.number().integer().positive().required(),
  // codigo: Joi.string().max(10).required(),
  // numero: Joi.string().max(10).required(),
  // id_estado_espacio: Joi.number().integer().positive().required(),
  // id_tipo_espacio: Joi.number().integer().positive().required(),
});

module.exports = { tipoespacioSchema };
