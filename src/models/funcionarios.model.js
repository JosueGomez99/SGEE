const { Model, DataTypes } = require("sequelize");

const funcionarios_tabla = "funcionarios";

class funcionarios extends Model {
  static associate(models) {
    // Relación con vehiculos
    this.hasMany(models.vehiculo, {
      foreignKey: "id_Funcionario",
      as: "vehiculos",
    });
    // Relación con institucion
    this.belongsTo(models.institucion, {
      foreignKey: "id_institucion",
      as: "institucion",
    });
    this.belongsTo(models.estadofuncionario, {
      foreignKey: "id_estado",
      as: "estado",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: funcionarios_tabla,
      modelName: "funcionarios",
      timestamps: false,
    };
  }
}
// Nombre de pago o free
const funcionariosSchema = {
  id_funcionario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombres: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  apellidos: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  modalidad: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
  responsable_pago: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
  id_institucion: {
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
};

module.exports = { funcionarios, funcionariosSchema };
