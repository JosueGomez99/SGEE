const { models } = require("../libs/sequelize.js");
const {estadoespacioSchema}= require("../schema/estadoespacio.schema.js");

class estadoespacioServices {
  constructor() {}

  async find() {
    const res = await models.estado_espacio.findAll();
    if (res.length === 0) {
      throw new Error("No se encontraron estados para los espacios");
    }
    return res;
  }
  async findOne(id) {
    const res = await models.estado_espacio.findByPk(id);
    if(!res){
      throw new Error("No se encontró datos de estado espacio");
    }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = estadoespacioSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }
      const estadoespacio = await models.estado_espacio.create(value);
      return estadoespacio;
    } catch (error) {
      console.error("Error al crear estado espacio", error.message);
      throw error;
    }

  }
  async update(id, data) {

    try{
      const { error, value } = estadoespacioSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const estadoespacio = await this.findOne(id);
      if(!estadoespacio){
        throw new Error("no encontrado");

      }
      await estadoespacio.update(value);

      return estadoespacio;
    }catch(error){
      throw error;
    }
    
  }
  async delete(id) {
    try {
      if(!id|| isNaN(id)){
        throw new Error("ID Inválido ")
      }
      const estadoespacio = await this.findOne(id);
      if(!estadoespacio){
        throw new Error("no encontrado");

      }
      await estadoespacio.destroy();
      return {success:true,message:"Estado espacio eliminado correctamente"}
    } catch (error) {
      throw error;
    }
    
   
  }
}
module.exports = estadoespacioServices;
