const Joi = require("joi");
const vehiculosSchema = Joi.object({
  placa: Joi.string().min(1).max(10).required(),
  modelo: Joi.string().min(1).max(20).required(),
  color: Joi.string().min(1).max(20).required(),
  marca: Joi.string().min(1).max(20).required(),
  idtipoVeh: Joi.number().integer().required()
});

module.exports = vehiculosSchema;
