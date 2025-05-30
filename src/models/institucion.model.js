const { Model, DataTypes } = require("sequelize");

const institucion_tabla = "institucion";

class institucion extends Model {
  static associate(models) {
    this.hasMany(models.funcionarios, {
      foreignKey: "id_institucion",
      as: "funcionarios",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: institucion_tabla,
      modelName: "institucion",
      timestamps: false,
    };
  }
}
//IP, SAR, ETC..
const  institucionSchema = {
  id_institucion: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  siglas: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  nombre_institucion: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
};

module.exports = { institucion,institucionSchema };
