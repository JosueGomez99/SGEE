const express=require('express');
const route = express.Router();
const asignacioninstitucionespaciooController = require('../controllers/asignacioninstitucionespacio.controller');

route
    .get('/',asignacioninstitucionespaciooController.get)
    .get('/:id',asignacioninstitucionespaciooController.getById)
    .post('/',asignacioninstitucionespaciooController.create)
    .put('/:id',asignacioninstitucionespaciooController.update)
    .patch("/:id/asignarespacios",asignacioninstitucionespaciooController.asignarEspacios)
    .delete('/:id',asignacioninstitucionespaciooController._delete);

module.exports=route;