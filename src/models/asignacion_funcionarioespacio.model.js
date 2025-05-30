const { Model, DataTypes } = require("sequelize");

const ASIGNACION_FUNCIONARIO_ESPACIO_TABLE = "asignacion_funcionario_espacio";

class asignacionFuncionarioEspacio extends Model {
  static associate(models) {
    this.belongsTo(models.funcionarios, {
      foreignKey: "id_funcionario",
      as: "funcionario",
    });

    this.belongsTo(models.espacio, {
      foreignKey: "id_espacio",
      as: "espacio",
    });

    this.belongsTo(models.vehiculo, {
      foreignKey: "id_vehiculo",
      as: "vehiculo",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNACION_FUNCIONARIO_ESPACIO_TABLE,
      modelName: "asignacionFuncionarioEspacio",
      timestamps: true,
      createdAt: "fecha_asignacion",
      updatedAt: false,
    };
  }
}

const asignacionFuncionarioEspacioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_funcionario: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  id_espacio: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  /*
  Activo – Usuario con acceso completo al sistema.
  Inactivo – Usuario ya no quiere el servicio.
  Suspendido – Acceso temporalmente bloqueado por alguna razón (deuda, mal uso, etc.).
  */
  id_estado: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  id_vehiculo: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
};

module.exports = {
  asignacionFuncionarioEspacio,
  asignacionFuncionarioEspacioSchema,
};
