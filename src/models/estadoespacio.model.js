const { Model, DataTypes } = require("sequelize");

const estado_espacio_tabla = "estado_espacio";

class estadoespacio extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: estado_espacio_tabla,
      modelName: "estado_espacio",
      timestamps: false,
    };
  }
}

//'Disponible', 'Ocupado', 'Temp. libre (Temporalmente libre)'
const estadoespacioSchema = {
    id_estado_espacio: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_estado: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
};

module.exports = { estadoespacio, estadoespacioSchema };
