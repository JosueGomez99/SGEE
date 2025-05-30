const Joi = require("joi");
const vehiculosSchema = Joi.object({
 // tipoVeh: Joi.string().min(1).max(11).required()
});

module.exports = {
  vehiculosSchema
};
