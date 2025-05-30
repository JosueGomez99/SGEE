const { Model, DataTypes } = require("sequelize");

const rol_tabla = "roles";

class rol extends Model {
  static associate(models) {
    // Relación con usuarios
    this.hasMany(models.usuario, {
      foreignKey: "id_rol",
      as: "usuarios",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: rol_tabla,
      modelName: "rol",
      timestamps: false,
    };
  }
}
//Administrador del Sistema, Administrador de Institución
const rolSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_rol: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
};

module.exports = { rol, rolSchema };
