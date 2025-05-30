const { models, Op } = require("../libs/sequelize.js");
const {asignacioninstitucionespacioschema,} = require("../schema/asignacioninstitucionespacio.schema.js");

class asignacioninstitucionespaciosServices {
  constructor() {}

  async find() {
    const res = await models.asignacionInstitucionEspacio.findAll();
    if (res.length === 0) {
      throw new Error("No se encontraron");
    }
    return res;
  }

  async findOne(id) {
    const res = await models.asignacionInstitucionEspacio.findByPk(id);
    if (!res) {
      throw new Error("No se encontró datos");
    }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = asignacioninstitucionespacioschema.validate(
        data,
        { stripUnknown: true }
      );
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const asignacion = await models.asignacionInstitucionEspacio.create(
        value
      );
      return asignacion;
    } catch (error) {
      console.error("Error al crear asignación", error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const { error, value } = asignacioninstitucionespacioschema.validate(
        data,
        { stripUnknown: true }
      );
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const espacio = await this.findOne(id);
      await espacio.update(value);
      return espacio;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }
      const espacio = await this.findOne(id);
      await espacio.destroy();
      return { success: true, message: "Eliminado correctamente" };
    } catch (error) {
      throw error;
    }
  }

  async asignarEspaciosAInstitucion(idInstitucion, espaciosAsignadosIds) {
  if (!Array.isArray(espaciosAsignadosIds)) {
    throw new Error("La lista de espacios debe ser un arreglo.");
  }

  const espaciosOcupados = await models.asignacionInstitucionEspacio.findAll({
    where: {
      id_espacio: espaciosAsignadosIds,
      id_institucion: { [Op.ne]: idInstitucion },
    },
  });

  if (espaciosOcupados.length > 0) {
    const idsOcupados = espaciosOcupados.map((e) => e.id_espacio);
    return {
      success: false,
      message: "Algunos espacios ya están asignados a otra institución.",
      espaciosOcupados: idsOcupados,
    };
  }
  await models.asignacionInstitucionEspacio.destroy({
    where: { id_institucion: idInstitucion },
  });


  const nuevasAsignaciones = espaciosAsignadosIds.map((idEspacio) => ({
    id_institucion: idInstitucion,
    id_espacio: idEspacio,
  }));

  await models.asignacionInstitucionEspacio.bulkCreate(nuevasAsignaciones);

  return { success: true, message: "Espacios asignados correctamente" };
}

}

module.exports = asignacioninstitucionespaciosServices;
