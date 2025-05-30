const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { models, sequelize } = require("../libs/sequelize.js");
const { espacioSchema } = require("../schema/espacio.schema.js");

class espacioServices {
  constructor() {
    if (!sequelize) throw new Error("Sequelize no está definido");
    this.sequelize = sequelize;
  }

  // async find() {
  //   const res = await models.espacio.findAll();
  //   if (res.length === 0) {
  //     throw new Error("No se encontraron espacios");
  //   }
  //   return res;
  // }

async find() {
  const res = await models.espacio.findAll({
    include: [
      {
        model: models.sotanos,
        as: 'sotano', 
        attributes: ['nombre']
      },
      {
        model: models.estado_espacio,
        as: 'estado_espacio', 
        attributes: ['nombre_estado']
      },
      {
        model: models.TipoEspacio,
        as: 'tipo_espacio',
        attributes: ['nombre_tipoespacio']
      }
    ]
  });

  if (res.length === 0) {
    throw new Error("No se encontraron espacios");
  }

  return res;
}

  async findOne(id) {
    const res = await models.espacio.findByPk(id);
    if (!res) {
      throw new Error("No se encontró datos de espacio");
    }
    return res;
  }

  async create(data) {
    try {
      const { error, value } = espacioSchema.validate(data, { stripUnknown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }
      const espacio = await models.espacio.create(value);
      return espacio;
    } catch (error) {
      console.error("Error al crear espacio", error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const { error, value } = espacioSchema.validate(data, { stripUnknown: true });
      if (error) {
        throw new Error(`Error de validación: ${error.details[0].message}`);
      }

      const espacio = await this.findOne(id);
      if (!espacio) {
        throw new Error("no encontrado");
      }
      await espacio.update(value);

      return espacio;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID Inválido ");
      }
      const espacio = await this.findOne(id);
      if (!espacio) {
        throw new Error("no encontrado");
      }
      await espacio.destroy();
      return { success: true, message: "Espacio eliminado correctamente" };
    } catch (error) {
      throw error;
    }
  }

  async ImportFromExcel(filePath) {
    if (!this.sequelize) {
      throw new Error("Sequelize no inicializado");
    }

    let transaction;

    try {
      transaction = await this.sequelize.transaction();

      const ultimoEspacio = await models.espacio.findOne({
        order: [['id_espacio', 'DESC']],
        transaction
      });
      let siguienteId = ultimoEspacio ? ultimoEspacio.id_espacio + 1 : 1;

      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const mapTipoEspacio = {
        normal: 1,
        motocicleta: 2,
        discapacitado: 3
      };

      const espaciosPreparados = [];

      for (const fila of data) {
        if (!fila.numero || !fila.sotano || !fila.Tipo) continue;

        const tipoNormalizado = fila.Tipo.toString().trim().toLowerCase();
        const idTipo = mapTipoEspacio[tipoNormalizado];
        if (!idTipo) continue;

        espaciosPreparados.push({
          id_espacio: siguienteId++,
          numero: fila.numero.toString(),
          id_sotano: parseInt(fila.sotano),
          id_tipo_espacio: idTipo,
          id_estado_espacio: 1
        });
      }

      if (espaciosPreparados.length === 0) throw new Error("Ninguna fila válida");

      const result = await models.espacio.bulkCreate(espaciosPreparados, {
        returning: true,
        transaction
      });

      const actualizaciones = result.map(e => {
        const codigo = `S${e.id_sotano}-${e.id_espacio}`;
        return models.espacio.update(
          { codigo },
          { where: { id_espacio: e.id_espacio }, transaction }
        );
      });

      await Promise.all(actualizaciones);

      await transaction.commit();
      fs.unlinkSync(filePath);

      return {
        success: true,
        insertados: result.length,
        detalles: result.map(e => ({
          id_espacio: e.id_espacio,
          numero: e.numero,
          codigo: `S${e.id_sotano}-${e.id_espacio}`
        }))
      };

    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error al importar desde Excel:", error.message);
      throw error;
    }
  }

  generateExcelTemplate() {
    const plantilla = [
      { numero: "Numero asignado al espacio", sotano: "Sotano asignado al espacio", Tipo: "tipo de espacio: Normal,Discapacitado,Motocicleta" },
    ];

    const ws = xlsx.utils.json_to_sheet(plantilla);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Espacios');

    const outputPath = path.join(__dirname, '../plantillas/plantilla_espacios.xlsx');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    xlsx.writeFile(wb, outputPath);

    return outputPath;
  }

  async findByFilters(query) {
  if (!query || typeof query !== "string" || query.trim() === "") {
    throw new Error("No se recibió texto para filtrar");
  }

  const res = await models.espacio.findAll({
    where: {
      numero: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("numero")),
        "LIKE",
        `%${query.toLowerCase()}%`
      )
    },
    include: [
      {
        model: models.sotanos,
        as: "sotano",
        attributes: ["nombre"]
      },
      {
        model: models.estado_espacio,
        as: "estado_espacio",
        attributes: ["nombre_estado"]
      },
      {
        model: models.TipoEspacio,
        as: "tipo_espacio",
        attributes: ["nombre_tipoespacio"]
      }
    ]
  });

  if (res.length === 0) {
    throw new Error("No se encontraron etiquetas con los filtros proporcionados");
  }

  return res;
}

}

module.exports = espacioServices;
