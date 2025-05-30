const express=require('express');
const route = express.Router();
const vehiculosController = require('../controllers/vehiculos.controller');
route
  .get('/',vehiculosController.get)
    .get('/:id',vehiculosController.getById)
    .post('/',vehiculosController.create)
    .put('/:id',vehiculosController.update)
    .delete('/:id',vehiculosController._delete);

module.exports=route;