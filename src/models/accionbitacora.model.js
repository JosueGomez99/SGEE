const { Model, DataTypes } = require("sequelize");

const acciones_bitacora_tabla = "acciones_bitacora";

class acciones_bitacora extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: acciones_bitacora_tabla,
      modelName: "acciones_bitacora",
      timestamps: false,
    };
  }
}

/*

acciones = {
    'MODIFICAR_USUARIO': 'Se modificó un usuario existente',
    'ELIMINAR_USUARIO': 'Se eliminó un usuario',
    'CREAR_EMPRESA': 'Se creó una nueva empresa',
    'MODIFICAR_EMPRESA': 'Se modificó una empresa existente',
    'ASIGNAR_ESPACIO_EMPRESA': 'Admin Sistema asignó espacio a empresa',
    'REGISTRAR_VEHICULO': 'Admin Empresa registró un vehículo',
    'MODIFICAR_VEHICULO': 'Admin Empresa modificó un vehículo',
    'ELIMINAR_VEHICULO': 'Admin Empresa eliminó un vehículo',
    'ASIGNAR_ESPACIO_EMPLEADO': 'Admin Empresa asignó espacio a empleado/vehículo',
    'LIBERAR_ESPACIO_EMPLEADO': 'Admin Empresa liberó espacio de empleado/vehículo',
    'REGISTRAR_FLOTA_GIRA': 'Admin Empresa registró vehículo de flota en gira',
    'FINALIZAR_FLOTA_GIRA': 'Admin Empresa finalizó gira de vehículo de flota',
}


*/
const acciones_bitacoraSchema = {
    id_accion: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_accion: {
    allowNull: false,
    type: DataTypes.STRING(11)
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
};

module.exports = { acciones_bitacora, acciones_bitacoraSchema };
