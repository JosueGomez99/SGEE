const { sotanos, sotanosSchema } = require("../models/sotanos.model");
const {tipovehiculo,tipovehiculoSchema,} = require("../models/tipovehiculo.modelo");
const {estadoespacio,estadoespacioSchema,} = require("./estadoespacio.model");
const { TipoEspacio,tipoespacioSchema,} = require("../models/tipoespacio.model");
const {acciones_bitacora,acciones_bitacoraSchema,} = require("../models/accionbitacora.model");
const {institucion, institucionSchema,} = require("../models/institucion.model");
const {funcionarios,funcionariosSchema,} = require("../models/funcionarios.model");
const { vehiculos, vehiculoSchema } = require("./vehiculos.model");
const { espacio, espacioSchema } = require("./espacio.model");
const {asignacionInstitucionEspacio,asignacionInstitucionEspacioSchema,} = require("./asignacion_espacioinstitucion.model");
const {asignacionFuncionarioEspacio,asignacionFuncionarioEspacioSchema,} = require("./asignacion_funcionarioespacio.model");
const { estadofuncionario, estadofuncionarioSchema } = require('./estadofuncionario.model');
const { usuario, usuarioSchema } = require("../models/usuarios.model");
const { rol, rolSchema } = require("../models/rol.model");



function setupModels(sequelize) {
  // Inicializar todos los modelos primero
  sotanos.init(sotanosSchema, sotanos.config(sequelize));
  tipovehiculo.init(tipovehiculoSchema, tipovehiculo.config(sequelize));
  estadoespacio.init(estadoespacioSchema, estadoespacio.config(sequelize));
  TipoEspacio.init(tipoespacioSchema, TipoEspacio.config(sequelize));
  acciones_bitacora.init(acciones_bitacoraSchema, acciones_bitacora.config(sequelize));
  institucion.init( institucionSchema, institucion.config(sequelize));
  estadofuncionario.init(estadofuncionarioSchema, estadofuncionario.config(sequelize)); // MUEVE ESTO AQUÍ ARRIBA
  funcionarios.init(funcionariosSchema, funcionarios.config(sequelize));
  vehiculos.init(vehiculoSchema, vehiculos.config(sequelize));
  espacio.init(espacioSchema, espacio.config(sequelize));
  asignacionInstitucionEspacio.init(asignacionInstitucionEspacioSchema, asignacionInstitucionEspacio.config(sequelize));
  asignacionFuncionarioEspacio.init(asignacionFuncionarioEspacioSchema, asignacionFuncionarioEspacio.config(sequelize));
  usuario.init(usuarioSchema, usuario.config(sequelize));
  rol.init(rolSchema, rol.config(sequelize));

  // Asociar todos los modelos después
  tipovehiculo.associate(sequelize.models);
  institucion.associate(sequelize.models);
  vehiculos.associate(sequelize.models);
  funcionarios.associate(sequelize.models);
  sotanos.associate(sequelize.models);
  TipoEspacio.associate(sequelize.models);
  espacio.associate(sequelize.models);
  asignacionInstitucionEspacio.associate(sequelize.models);
  asignacionFuncionarioEspacio.associate(sequelize.models);
  estadofuncionario.associate?.(sequelize.models);
  usuario.associate(sequelize.models);
  rol.associate(sequelize.models);
}




module.exports = setupModels;
