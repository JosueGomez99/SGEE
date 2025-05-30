const { models } = require("../libs/sequelize.js");
const {tipoespacioSchema}= require("../schema/tipoespacio.schema.js");

class tipoespacioServices {
  constructor() {}

  async find() {
    const res = await models.TipoEspacio.findAll();
    if (res.length === 0) {
      throw new Error("No se encontraron tipo espacios");
    }
    return res;
  }
  async findOne(id) {
    const res = await models.TipoEspacio.findByPk(id);
    if(!res){
      throw new Error("No se encontró datos de tipo espacio");
    }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = tipoespacioSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }
      const espacio = await models.TipoEspacio.create(value);
      return espacio;
    } catch (error) {
      console.error("Error al crear espacio", error.message);
      throw error;
    }

  }
  async update(id, data) {

    try{
      const { error, value } = tipoespacioSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const espacio = await this.findOne(id);
      if(!espacio){
        throw new Error("no encontrado");

      }
      await espacio.update(value);

      return espacio;
    }catch(error){
      throw error;
    }
    
  }
  async delete(id) {
    try {
      if(!id|| isNaN(id)){
        throw new Error("ID Inválido ")
      }
      const servicio = await this.findOne(id);
      if(!servicio){
        throw new Error("no encontrado");

      }
      await servicio.destroy();
      return {success:true,message:"tipo espacio eliminado correctamente"}
    } catch (error) {
      throw error;
    }
    
   
  }
}
module.exports = tipoespacioServices;
