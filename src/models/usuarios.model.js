const { Model, DataTypes } = require("sequelize");

const usuario_tabla = "usuarios";

class usuario extends Model {
  static associate(models) {
    this.belongsTo(models.rol, {
      foreignKey: "id_rol",
      as: "rol",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: usuario_tabla,
      modelName: "usuario",
      timestamps: false,
    };
  }
}

const usuarioSchema = {
  id_usuario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_usuario: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  contrasena: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  id_rol: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: "roles",
      key: "id",
    },
  },
};

module.exports = { usuario, usuarioSchema };
