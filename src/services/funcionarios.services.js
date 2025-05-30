const { models } = require("../libs/sequelize.js");
const {funcionariosSchema}= require("../schema/funcionarios.schema.js");

class funcionarioServices {
  constructor() {}

  async find() {
    const res = await models.funcionarios.findAll();
    // Devuelve el array aunque esté vacío
    return res;
  }
  async findOne(id) {
    const res = await models.funcionarios.findByPk(id);
    if(!res){
      throw new Error("No se encontró datos de funcionario");
    }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = funcionariosSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }
      const funcionario = await models.funcionario.create(value);
      return funcionario;
    } catch (error) {
      console.error("Error al crear funcionario", error.message);
      throw error;
    }

  }
  async update(id, data) {

    try{
      const { error, value } = funcionariosSchema.validate(data, { stripUnKnown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const funcionario = await this.findOne(id);
      if(!funcionario){
        throw new Error("no encontrado");

      }
      await funcionario.update(value);

      return funcionario;
    }catch(error){
      throw error;
    }
    
  }
  async delete(id) {
    try {
      if(!id|| isNaN(id)){
        throw new Error("ID Inválido ")
      }
      const funcionarios = await this.findOne(id);
      if(!funcionarios){
        throw new Error("no encontrado");

      }
      await funcionarios.destroy();
      return {success:true,message:"funcionario eliminado correctamente"}
    } catch (error) {
      throw error;
    }
    
   
  }
}
module.exports = funcionarioServices;
