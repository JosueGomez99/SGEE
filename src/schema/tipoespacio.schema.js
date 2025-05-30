const Joi = require("joi");


const tipoespacioSchema = Joi.object({
  nombre_tipoespacio: Joi.string()
    .valid("Normal", "Discapacitado", "Motocicleta")
    .required(),
});

module.exports = { tipoespacioSchema };
