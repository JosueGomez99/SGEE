const { models } = require("../libs/sequelize");
const { tipovehiculoSchema } = require("../schema/tipovehiculo.schema");

class tipovehiculoServices {
  constructor() { }

  async find() {
    const res = await models.tipovehiculo.findAll();
    if(res.length === 0){
      throw new Error("No se encontraron tipos de vehículos")
    }
    return res;
  }
  async findOne(id) {
    const res = await models.tipovehiculo.findByPk(id);
    if (!res) {
      throw new Error("Tipo Vehiculo no encontrado");
  }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = tipovehiculoSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }
      const tipovehiculo = await models.tipovehiculo.create(value);
      return tipovehiculo;
    } catch (error) {
      console.error("Error al crear tipo vehiculo", error.message);
    }

  }
  async update(id, data) {

    try{
      const { error, value } = tipovehiculoSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const tipovehiculo = await this.findOne(id);
      if(!tipovehiculo){
        throw new Error("tipo vehiculo no encontrado");

      }
      await tipovehiculo.update(value);

      return tipovehiculo;
    }catch(error){
      throw error;
    }
    
  }
  async delete(id) {
    try {
      if(!id|| isNaN(id)){
        throw new Error("ID Inválido ")
      }
      const tipovehiculo = await this.findOne(id);
      if(!tipovehiculo){
        throw new Error("tipo vehiculo no encontrado");

      }
      await tipovehiculo.destroy();
      return {success:true,message:"Tipo vehiculo eliminado correctamente"}
    } catch (error) {
      throw error;
    }
    
   
  }
}
module.exports = tipovehiculoServices;
