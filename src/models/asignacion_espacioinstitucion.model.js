const { Model, DataTypes } = require("sequelize");

const ASIGNACION_INSTITUCION_ESPACIO_TABLE = "asignacion_institucion_espacio";

class asignacionInstitucionEspacio extends Model {
  static associate(models) {
    this.belongsTo(models.institucion, {
      foreignKey: "id_institucion",
      as: "institucion",
    });

    this.belongsTo(models.espacio, {
      foreignKey: "id_espacio",
      as: "espacio",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNACION_INSTITUCION_ESPACIO_TABLE,
      modelName: "asignacionInstitucionEspacio",
      timestamps: true,
      createdAt: "fecha_asignacion",
      updatedAt: false,
    };
  }
}

const asignacionInstitucionEspacioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_institucion: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  id_espacio: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

module.exports = { asignacionInstitucionEspacio, asignacionInstitucionEspacioSchema };
