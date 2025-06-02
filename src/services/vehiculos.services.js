const { models } = require("../libs/sequelize");
const { vehiculosSchema } = require("../schema/vehiculos.schema");

class vehiculosServices {
  constructor() { }

  async find() {
    const res = await models.vehiculo.findAll(); // Cambiado a singular
    // Devuelve el array aunque esté vacío
    return res;
  }
  async findOne(id) {
    const res = await models.vehiculo.findByPk(id); // Cambiado a singular
    if (!res) {
      throw new Error("Vehiculo no encontrado");
  }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = vehiculosSchema.validate(data, { stripUnknown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }
      const vehiculo = await models.vehiculo.create(value); // Cambiado a singular
      return vehiculo;
    } catch (error) {
      console.error("Error al crear vehiculo", error.message);
      throw error;
    }

  }
  async update(id, data) {

    try{
      const { error, value } = vehiculosSchema.validate(data, { stripUnknown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const vehiculo = await this.findOne(id); // Cambiado a singular
      if(!vehiculo){
        throw new Error("vehiculo no encontrado");

      }
      await vehiculo.update(value);

      return vehiculo;
    }catch(error){
      throw error;
    }
    
  }
  async delete(id) {
    const vehiculo = await this.findOne(id); // Cambiado a singular
    await vehiculo.destroy();
    return { message: "Vehiculo eliminado" };
  }
}

module.exports = vehiculosServices;
