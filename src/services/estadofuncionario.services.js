const { models } = require("../libs/sequelize.js");

class estadoFuncionarioServices {
  async find() {
    return await models.estadofuncionario.findAll();
  }
  async findOne(id) {
    return await models.estadofuncionario.findByPk(id);
  }
  async create(data) {
    return await models.estadofuncionario.create(data);
  }
  async update(id, data) {
    const estado = await this.findOne(id);
    if (!estado) throw new Error("No encontrado");
    await estado.update(data);
    return estado;
  }
  async delete(id) {
    const estado = await this.findOne(id);
    if (!estado) throw new Error("No encontrado");
    await estado.destroy();
    return { success: true, message: "Eliminado correctamente" };
  }
}

module.exports = estadoFuncionarioServices;
