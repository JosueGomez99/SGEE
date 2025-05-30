const Joi = require("joi");
const tipovehiculoSchema = Joi.object({
 // tipoVeh: Joi.string().min(1).max(11).required()
});

module.exports = {
  tipovehiculoSchema
};
