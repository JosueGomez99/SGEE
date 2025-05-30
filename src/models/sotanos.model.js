const { Model, DataTypes } = require("sequelize");

const sotano_tabla = "sotanos";

class sotanos extends Model {
  static associate(models) {
    this.hasMany(models.espacio, {
      foreignKey: "id_sotano",
      as: "espacios",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: sotano_tabla,
      modelName: "sotanos",
      timestamps: false,
    };
  }


}

const sotanosSchema = {
  id_Sotano: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
};

module.exports = { sotanos, sotanosSchema };
