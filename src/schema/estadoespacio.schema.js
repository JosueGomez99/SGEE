const Joi = require("joi");

const estadoespacioSchema = Joi.object({
 nombre_estado: Joi.string().max(30).required(),
});

module.exports = { estadoespacioSchema };
