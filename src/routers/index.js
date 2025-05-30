const express = require("express");

const sotanosRouter = require("./sotanos.route");
const tipoVehiculoRouter = require("./tipovehiculo.route");
const VehiculoRouter = require("./vehiculos.route");
const institucionRouter = require("./institucion.route");
const espacioRouter = require("./espacio.route");
const tipoespacioRouter = require("./tipoespacio.route");
const funcionariosRouter = require("./funcionarios.route");
const estadoespacioRouter = require("./estadoespacio.route");
const asignacioninstitucionespacioRouter = require("./asignacioninstitucionespacio.route");



function routeApi(app) {
  const router = express.Router();
  app.use("/api/v2", router);
  router.use("/sotanos", sotanosRouter);
  router.use("/tipovehiculo", tipoVehiculoRouter);
  router.use("/vehiculos", VehiculoRouter);
  router.use("/institucion", institucionRouter);
  router.use("/espacios", espacioRouter);
  router.use("/tipoespacio", tipoespacioRouter);
   router.use("/funcionarios", funcionariosRouter);
   router.use("/estadoespacio", estadoespacioRouter);
    router.use("/asignacioninstitucion", asignacioninstitucionespacioRouter);

    /*
        Institucion.................
        Vehiculos
        Funcionarios
        AccionesBitacora
        AsignacionInstitucionEspacio
        AsignacionFuncionarioEspacio
        EstadoEspacio...............
        Espacio.....................
        TipoEspacio.................
        Sotanos.....................
        TipoVehiculo................
     */
}

module.exports = routeApi;
