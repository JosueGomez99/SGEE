const express=require('express');
const route = express.Router();
const tipovehiculoController = require('../controllers/tipovehiculo.controller');

route
  .get('/',tipovehiculoController.get)
    .get('/:id',tipovehiculoController.getById)
    .post('/',tipovehiculoController.create)
    .put('/:id',tipovehiculoController.update)
    .delete('/:id',tipovehiculoController._delete);

module.exports=route;