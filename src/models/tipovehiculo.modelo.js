const { Model, DataTypes } = require("sequelize");

const tipovehiculo_tabla = "tipovehiculo";

class tipovehiculo extends Model {
  static associate(models) {
    this.hasMany(models.vehiculo, {
      foreignKey: "idtipoVeh",
      as: "vehiculos",
    });
    this.hasMany(models.asignacionFuncionarioEspacio, {
  foreignKey: "id_vehiculo",
  as: "asignaciones",
});

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tipovehiculo_tabla,
      modelName: "tipovehiculo",
      timestamps: false,
    };
  }
}
//moto,automovil
const tipovehiculoSchema = {
  idtipoVeh: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoVeh: {
    allowNull: false,
    type: DataTypes.STRING(11),
  },
};

module.exports = { tipovehiculo, tipovehiculoSchema };
