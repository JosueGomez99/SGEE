const { models } = require("../libs/sequelize.js");
const {sotanosSchema}= require("../schema/sotanos.schema.js");

class sotanosServices {
  constructor() {}

  async find() {
    const res = await models.sotanos.findAll();
    if (res.length === 0) {
      throw new Error("No se encontraron sotanos");
    }
    return res;
  }
  async findOne(id) {
    const res = await models.sotanos.findByPk(id);
    if(!res){
      throw new Error("No se encontró datos de los sotanos");
    }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = sotanosSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }
      const sotanos = await models.sotanos.create(value);
      return sotanos;
    } catch (error) {
      console.error("Error al crear sotanos", error.message);
      throw error;
    }

  }
  async update(id, data) {

    try{
      const { error, value } = sotanosSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const sotanos = await this.findOne(id);
      if(!sotanos){
        throw new Error("no encontrado");

      }
      await sotanos.update(value);

      return sotanos;
    }catch(error){
      throw error;
    }
    
  }
  async delete(id) {
    try {
      if(!id|| isNaN(id)){
        throw new Error("ID Inválido ")
      }
      const sotanos = await this.findOne(id);
      if(!sotanos){
        throw new Error("no encontrado");

      }
      await sotanos.destroy();
      return {success:true,message:"sotano eliminado correctamente"}
    } catch (error) {
      throw error;
    }
    
   
  }
}
module.exports = sotanosServices;
