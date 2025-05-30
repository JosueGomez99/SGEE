const { Model, DataTypes } = require("sequelize");

const estadofuncionario_tabla = "estadofuncionario";

class estadofuncionario extends Model {
  static associate(models) {
    this.hasMany(models.funcionarios, {
      foreignKey: "id_estado",
      as: "funcionarios",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: estadofuncionario_tabla,
      modelName: "estadofuncionario",
      timestamps: false,
    };
  }
}

/*
 Activo – Usuario con acceso completo al sistema.
 Inactivo – Usuario ya no quiere el servicio.
 Suspendido – Acceso temporalmente bloqueado por alguna razón (deuda, mal uso, etc.).
*/

const estadofuncionarioSchema = {
  id_estado: { // corregido aquí
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_estado: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
};

module.exports = { estadofuncionario, estadofuncionarioSchema };
