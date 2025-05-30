const { models } = require("../libs/sequelize");
const { vehiculosSchema } = require("../schema/vehiculos.schema");

class vehiculosServices {
  constructor() { }

  async find() {
    const res = await models.vehiculos.findAll();
    if(res.length === 0){
      throw new Error("No se encontraron vehículos")
    }
    return res;
  }
  async findOne(id) {
    const res = await models.vehiculos.findByPk(id);
    if (!res) {
      throw new Error("Vehiculo no encontrado");
  }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = vehiculosSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }
      const vehiculo = await models.vehiculos.create(value);
      return vehiculo;
    } catch (error) {
      console.error("Error al crear vehiculo", error.message);
    }

  }
  async update(id, data) {

    try{
      const { error, value } = vehiculosSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const vehiculos = await this.findOne(id);
      if(!vehiculos){
        throw new Error("vehiculo no encontrado");

      }
      await vehiculos.update(value);

      return vehiculos;
    }catch(error){
      throw error;
    }
    
  }
  async delete(id) {
    try {
      if(!id|| isNaN(id)){
        throw new Error("ID Inválido ")
      }
      const vehiculos = await this.findOne(id);
      if(!vehiculos){
        throw new Error("Vehiculo no encontrado");

      }
      await vehiculos.destroy();
      return {success:true,message:"Vehiculo eliminado correctamente"}
    } catch (error) {
      throw error;
    }
    
   
  }
}
module.exports = vehiculosServices;
