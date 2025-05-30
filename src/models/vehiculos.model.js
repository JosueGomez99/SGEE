const { Model, DataTypes } = require("sequelize");

const vehiculo_tabla = "vehiculos";

class vehiculos extends Model {
  static associate(models) {
    this.belongsTo(models.tipovehiculo, {
      foreignKey: "idtipoVeh",
      as: "tipoVehiculo",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: vehiculo_tabla,
      modelName: "vehiculo",
      timestamps: false,
    };
  }
}

const vehiculoSchema = {
  id_vehiculo: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  placa: {
    allowNull: false,
    type: DataTypes.STRING(10),
  },
  modelo: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
  marca: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
  idtipoVeh: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: "tipovehiculo",
      key: "idtipoVeh",
    },
  },
};

module.exports = { vehiculos, vehiculoSchema };
