const { models } = require("../libs/sequelize.js");
const {institucionSchema}= require("../schema/institucion.schema.js");

class institucionServices {
  constructor() {}

  async find() {
    const res = await models.institucion.findAll();
    if (res.length === 0) {
      throw new Error("No se encontraron institución");
    }
    return res;
  }
  async findOne(id) {
    const res = await models.institucion.findByPk(id);
    if(!res){
      throw new Error("No se encontró datos de institución");
    }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = institucionSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }
      const institucion = await models.institucion.create(value);
      return institucion;
    } catch (error) {
      console.error("Error al crear institución", error.message);
      throw error;
    }

  }
  async update(id, data) {

    try{
      const { error, value } = institucionSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const institucion = await this.findOne(id);
      if(!institucion){
        throw new Error("no encontrado");

      }
      await institucion.update(value);

      return institucion;
    }catch(error){
      throw error;
    }
    
  }
  async delete(id) {
    try {
      if(!id|| isNaN(id)){
        throw new Error("ID Inválido ")
      }
      const institucion = await this.findOne(id);
      if(!institucion){
        throw new Error("no encontrado");

      }
      await institucion.destroy();
      return {success:true,message:"Institución eliminada correctamente"}
    } catch (error) {
      throw error;
    }
    
   
  }
}
module.exports = institucionServices;
