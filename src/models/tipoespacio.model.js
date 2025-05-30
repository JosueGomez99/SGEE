const { Model, DataTypes } = require("sequelize");

const tipoespacio_tabla = "tipoespacio";

class TipoEspacio extends Model {
  static associate(models) {
    this.hasMany(models.espacio, {
      foreignKey: "id_tipo_espacio",
      as: "espacios",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tipoespacio_tabla,
      modelName: "TipoEspacio",
      timestamps: false,
    };
  }
}

const tipoespacioSchema = {
  id_tipoespacio: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_tipoespacio: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
};

module.exports = { TipoEspacio, tipoespacioSchema };
