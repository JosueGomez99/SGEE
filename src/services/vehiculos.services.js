const { models } = require("../libs/sequelize");
const { vehiculosSchema } = require("../schema/vehiculos.schema");

class vehiculosServices {
  constructor() { }

  async find() {
    // Solo los campos válidos de la tabla
    const res = await models.vehiculo.findAll({
      attributes: [
        'id_vehiculo',
        'placa',
        'modelo',
        'color',
        'marca',
        'idtipoVeh'
      ]
    });
    return res;
  }
  async findOne(id) {
    const res = await models.vehiculo.findByPk(id);
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
      const vehiculo = await models.vehiculo.create(value);
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
      const vehiculo = await this.findOne(id);
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
    const vehiculo = await this.findOne(id);
    await vehiculo.destroy();
    return { message: "Vehiculo eliminado" };
  }
}

module.exports = vehiculosServices;
